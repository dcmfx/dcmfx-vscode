import * as vscode from "vscode";
import { Effect, pipe } from "effect";
import {
  gleamResultToEffect,
  openReadStream,
  readDicomJsonDataSet,
  writeDataToReadContext,
} from "./utils.mjs";
import * as p10_read from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_read.mjs";
import * as p10_pixel_data_frame_filter from "../../vendor/dcmfx/dcmfx_pixel_data/dcmfx_pixel_data/p10_pixel_data_frame_filter.mjs";
import * as dcmfx_pixel_data from "../../vendor/dcmfx/dcmfx_pixel_data/dcmfx_pixel_data.mjs";
import * as pixel_data_frame from "../../vendor/dcmfx/dcmfx_pixel_data/dcmfx_pixel_data/pixel_data_frame.mjs";
import * as p10_error from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_error.mjs";
import * as p10_token from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_token.mjs";
import * as data_error from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/data_error.mjs";
import * as data_set from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/data_set.mjs";
import * as transfer_syntax from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/transfer_syntax.mjs";
import * as gleam from "../../vendor/dcmfx/prelude.mjs";

/** VS Code command that extracts the frames of pixel data from a DICOM file. */
export function extractPixelData(): (uri: vscode.Uri) => Promise<void> {
  return async (uri: vscode.Uri) => {
    // Prompt the user for the output file prefix, which defaults to the name of
    // the input file with a period character appended
    const outputFilePrefix = await vscode.window.showInputBox({
      title: "Output file prefix",
      value: `${uri.fsPath}.`,
      prompt: "Enter the file prefix for the frames of pixel data",
    });

    if (outputFilePrefix === undefined) {
      return;
    }

    await Effect.runPromise(
      pipe(
        Effect.gen(() => {
          if (uri.path.toLowerCase().endsWith(".json")) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return doExtractDicomJsonPixelData(
              uri,
              uri.with({ path: outputFilePrefix }),
            );
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return doExtractDicomPixelData(
              uri,
              uri.with({ path: outputFilePrefix }),
            );
          }
        }),
        Effect.match({
          onSuccess: (frameCount) =>
            vscode.window.showInformationMessage(
              `Wrote files for ${frameCount} frames of pixel data`,
            ),
          onFailure: (errorLines) =>
            vscode.window.showErrorMessage(errorLines.join("\n")),
        }),
      ),
    );
  };
}

function* doExtractDicomPixelData(
  uri: vscode.Uri,
  outputFilePrefix: vscode.Uri,
) {
  const readStream = yield* openReadStream(uri);

  // Construct DICOM P10 read context with a max token size of 1 MiB to keep
  // the read context's memory usage low while extracting pixel data frames
  let readContext = p10_read.new_read_context();
  const maxTokenSize = 1024 * 1024;
  readContext = p10_read.with_config(
    readContext,
    new p10_read.P10ReadConfig(maxTokenSize, 0xfffffffe, 10_000, false),
  );

  let pixelDataFilter = p10_pixel_data_frame_filter.new$();

  let fileExtension = ".bin";
  let frameIndex = 0;
  let ended = false;

  while (!ended) {
    const readResult = p10_read.read_tokens(readContext);

    yield* Effect.matchEffect(gleamResultToEffect(readResult), {
      onSuccess: ([tokens, newReadContext]) =>
        Effect.gen(function* () {
          readContext = newReadContext;

          for (const token of tokens.toArray()) {
            // Update the file extension to use when a transfer syntax is
            // specified in the File Meta Information
            if (token instanceof p10_token.FileMetaInformation) {
              const ts = data_set.get_transfer_syntax(token.data_set);
              if (ts instanceof gleam.Ok) {
                fileExtension =
                  dcmfx_pixel_data.file_extension_for_transfer_syntax(
                    (ts as gleam.Ok<transfer_syntax.TransferSyntax, never>)[0],
                  );
              }
            }

            // Add the token to the pixel data filter, collecting any frames
            // that are now complete and can be written out to a file
            const [frames, newPixelDataFilter] = yield* pipe(
              gleamResultToEffect(
                p10_pixel_data_frame_filter.add_token(pixelDataFilter, token),
              ),
              Effect.mapError((e) => {
                if (e instanceof p10_pixel_data_frame_filter.P10Error) {
                  return p10_error.to_lines(e[0], "").toArray();
                } else {
                  return data_error.to_lines(e[0], "").toArray();
                }
              }),
            );

            pixelDataFilter = newPixelDataFilter;

            // Write extracted frames
            for (const frame of frames) {
              yield* writeFrameFile(
                frame,
                outputFilePrefix,
                frameIndex++,
                fileExtension,
              );
            }

            if (token instanceof p10_token.End) {
              ended = true;
            }
          }
        }),

      // On a DataRequired error attempt to read more data from the stream. All
      // other errors are fatal.
      onFailure: (error) =>
        Effect.gen(function* () {
          if (error instanceof p10_error.DataRequired) {
            readContext = yield* writeDataToReadContext(
              readStream,
              readContext,
            );
          } else {
            yield* Effect.fail(p10_error.to_lines(error, "").toArray());
          }
        }),
    });
  }

  return frameIndex;
}

function* doExtractDicomJsonPixelData(
  uri: vscode.Uri,
  outputFilePrefix: vscode.Uri,
) {
  const dataSet = yield* readDicomJsonDataSet(uri);
  const frames = yield* pipe(
    gleamResultToEffect(dcmfx_pixel_data.get_pixel_data_frames(dataSet)),
    Effect.mapError((e) => {
      if (e instanceof p10_pixel_data_frame_filter.P10Error) {
        return p10_error.to_lines(e[0], "").toArray();
      } else {
        return data_error.to_lines(e[0], "").toArray();
      }
    }),
  );

  const transferSyntax = yield* pipe(
    gleamResultToEffect(data_set.get_transfer_syntax(dataSet)),
    Effect.mapError((e) => data_error.to_lines(e, "").toArray()),
  );

  const fileExtension =
    dcmfx_pixel_data.file_extension_for_transfer_syntax(transferSyntax);

  let frameIndex = 0;

  for (const frame of frames) {
    yield* writeFrameFile(frame, outputFilePrefix, frameIndex++, fileExtension);
  }

  return frameIndex;
}

/** Writes a single frame of pixel data to a file. */
function* writeFrameFile(
  frame: pixel_data_frame.PixelDataFrame,
  outputFilePrefix: vscode.Uri,
  frameIndex: number,
  fileExtension: string,
) {
  const dst = outputFilePrefix.with({
    path: `${outputFilePrefix.path}${frameIndex}${fileExtension}`,
  });

  const frameData = pixel_data_frame.to_bytes(frame);

  yield* Effect.tryPromise({
    try: () => vscode.workspace.fs.writeFile(dst, frameData.buffer),
    catch: (e) => [`Error writing '${dst.toString()}': ${String(e)}`],
  });
}

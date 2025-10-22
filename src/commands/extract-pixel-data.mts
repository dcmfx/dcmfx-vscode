import { Effect, pipe } from "effect";
import * as vscode from "vscode";
import * as data_error from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/data_error.mjs";
import * as data_set from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/data_set.mjs";
import * as transfer_syntax from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/transfer_syntax.mjs";
import * as p10_error from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_error.mjs";
import * as p10_read from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_read.mjs";
import { P10ReadConfig$P10ReadConfig } from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_read_config.mjs";
import * as p10_token from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_token.mjs";
import * as dcmfx_pixel_data from "../../vendor/dcmfx/dcmfx_pixel_data/dcmfx_pixel_data.mjs";
import * as pixel_data_frame from "../../vendor/dcmfx/dcmfx_pixel_data/dcmfx_pixel_data/pixel_data_frame.mjs";
import * as p10_pixel_data_frame_transform from "../../vendor/dcmfx/dcmfx_pixel_data/dcmfx_pixel_data/transforms/p10_pixel_data_frame_transform.mjs";
import {
  P10PixelDataFrameTransformError$DataError$0,
  P10PixelDataFrameTransformError$P10Error$0,
  P10PixelDataFrameTransformError$isP10Error,
} from "../../vendor/dcmfx/dcmfx_pixel_data/dcmfx_pixel_data/transforms/p10_pixel_data_frame_transform.mjs";
import { Result$Ok$0, Result$isOk } from "../../vendor/dcmfx/prelude.mjs";
import {
  gleamListToArray,
  gleamResultToEffect,
  openReadStream,
  readDicomJsonDataSet,
  writeDataToReadContext,
} from "./utils.mjs";

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
  const maxTokenSize = 1024 * 1024;
  const readConfig = P10ReadConfig$P10ReadConfig(
    maxTokenSize,
    0xfffffffe,
    10_000,
    false,
    false,
    transfer_syntax.implicit_vr_little_endian,
  );
  let readContext = p10_read.new_read_context(readConfig);

  let pixelDataFrameTransform = p10_pixel_data_frame_transform.new$();

  let fileExtension = ".bin";
  let frameIndex = 0;
  let ended = false;

  while (!ended) {
    const readResult = p10_read.read_tokens(readContext);

    yield* Effect.matchEffect(gleamResultToEffect(readResult), {
      onSuccess: ([tokens, newReadContext]) =>
        Effect.gen(function* () {
          readContext = newReadContext;

          for (const token of gleamListToArray(tokens)) {
            // Update the file extension to use when a transfer syntax is
            // specified in the File Meta Information
            if (p10_token.P10Token$isFileMetaInformation(token)) {
              const ts = data_set.get_transfer_syntax(
                p10_token.P10Token$FileMetaInformation$data_set(token),
              );
              if (Result$isOk(ts)) {
                fileExtension =
                  dcmfx_pixel_data.file_extension_for_transfer_syntax(
                    Result$Ok$0(ts) as transfer_syntax.TransferSyntax,
                  );
              }
            }

            // Add the token to the pixel data frame transform, collecting any
            // frames that are now complete and can be written out to a file
            const [frames, newPixelDataFrameTransform] = yield* pipe(
              gleamResultToEffect(
                p10_pixel_data_frame_transform.add_token(
                  pixelDataFrameTransform,
                  token,
                ),
              ),
              Effect.mapError((e) => {
                if (P10PixelDataFrameTransformError$isP10Error(e)) {
                  const lines = p10_error.to_lines(
                    P10PixelDataFrameTransformError$P10Error$0(e),
                    "",
                  );

                  return gleamListToArray(lines);
                } else {
                  const lines = data_error.to_lines(
                    P10PixelDataFrameTransformError$DataError$0(e),
                    "",
                  );

                  return gleamListToArray(lines);
                }
              }),
            );

            pixelDataFrameTransform = newPixelDataFrameTransform;

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
            yield* Effect.fail(gleamListToArray(p10_error.to_lines(error, "")));
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
      if (P10PixelDataFrameTransformError$isP10Error(e)) {
        return gleamListToArray(
          p10_error.to_lines(P10PixelDataFrameTransformError$P10Error$0(e), ""),
        );
      } else {
        const lines = data_error.to_lines(
          P10PixelDataFrameTransformError$DataError$0(e),
          "",
        );

        return gleamListToArray(lines);
      }
    }),
  );

  const transferSyntax = yield* pipe(
    gleamResultToEffect(data_set.get_transfer_syntax(dataSet)),
    Effect.mapError((e) => gleamListToArray(data_error.to_lines(e, ""))),
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

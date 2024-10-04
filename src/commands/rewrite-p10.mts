import * as vscode from "vscode";
import { Effect, pipe } from "effect";
import * as dcmfx_p10 from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10.mjs";
import * as option from "../../vendor/dcmfx/gleam_stdlib/gleam/option.mjs";
import * as p10_error from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_error.mjs";
import { gleamResultToEffect, readDicomDataSet } from "./utils.mjs";

/**
 * VS Code command that rewrites a DICOM P10 file.
 *
 * Doing this may correct errors in the file and allow it to be read by other
 * DICOM software that is less forgiving of malformed DICOM P10 data. It will
 * also convert all text to UTF-8, and all defined length sequences and items to
 * undefined length sequences and items.
 */
export function rewriteP10(): (uri: vscode.Uri) => Promise<void> {
  return async (uri: vscode.Uri) => {
    let defaultValue = uri.fsPath;

    // Append a suffix to get the default output filename
    const suffix = ".rewrite.dcm";
    if (defaultValue.toLowerCase().endsWith(".dcm")) {
      defaultValue =
        defaultValue.substring(0, defaultValue.length - 4) + suffix;
    } else {
      defaultValue += suffix;
    }

    // Prompt the user for the output file name
    const path = await vscode.window.showInputBox({
      title: "Output DICOM file name",
      value: defaultValue,
      prompt: "Enter the name of the output DICOM file",
    });

    if (path === undefined) {
      return;
    }

    const dstUri = uri.with({ path });

    await Effect.runPromise(
      pipe(
        Effect.gen(() => doRewriteP10(uri, dstUri)),
        Effect.match({
          onSuccess: () =>
            vscode.window.showInformationMessage(
              `Wrote DICOM file: ${dstUri.toString()}`,
            ),
          onFailure: (errorLines) =>
            vscode.window.showErrorMessage(errorLines.join("\n")),
        }),
      ),
    );
  };
}

function* doRewriteP10(sourceUri: vscode.Uri, dstUri: vscode.Uri) {
  // Read input file
  const dataSet = yield* readDicomDataSet(sourceUri);

  // Write data set to in-memory P10 bytes
  const bitArray = yield* pipe(
    gleamResultToEffect(dcmfx_p10.write_bytes(dataSet, new option.None())),
    Effect.mapError((e) =>
      p10_error.to_lines(e, "writing output data").toArray(),
    ),
  );

  // Write output file
  yield* Effect.tryPromise({
    try: () => vscode.workspace.fs.writeFile(dstUri, bitArray.buffer),
    catch: (e) => [`Error writing '${dstUri.toString()}': ${String(e)}`],
  });
}

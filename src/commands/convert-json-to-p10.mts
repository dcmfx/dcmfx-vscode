import * as vscode from "vscode";
import { Effect, pipe } from "effect";
import * as gleam from "../../vendor/dcmfx/prelude.mjs";
import * as data_set from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/data_set.mjs";
import * as dcmfx_p10 from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10.mjs";
import * as option from "../../vendor/dcmfx/gleam_stdlib/gleam/option.mjs";
import * as p10_error from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_error.mjs";
import * as registry from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/registry.mjs";
import * as transfer_syntax from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/transfer_syntax.mjs";
import { gleamResultToEffect, readDicomJsonDataSet } from "./utils.mjs";

/**
 * VS Code command that converts a DICOM JSON file to a DICOM P10 file.
 */
export function convertJsonToP10(): (uri: vscode.Uri) => Promise<void> {
  return async (uri: vscode.Uri) => {
    // Prompt the user for the output file name
    const path = await vscode.window.showInputBox({
      title: "Output DICOM file name",
      value: uri.fsPath + ".dcm",
      prompt: "Enter the name of the output DICOM file",
    });

    if (path === undefined) {
      return;
    }

    const dstUri = uri.with({ path });

    await Effect.runPromise(
      pipe(
        Effect.gen(() => doConvertJsonToP10(uri, dstUri)),
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

function* doConvertJsonToP10(src: vscode.Uri, dst: vscode.Uri) {
  let dataSet = yield* readDicomJsonDataSet(src);

  // If no transfer syntax was specified in the DICOM JSON then default to
  // 'Explicit VR Little Endian'
  if (!data_set.has(dataSet, registry.transfer_syntax_uid.tag)) {
    dataSet = yield* pipe(
      gleamResultToEffect(
        data_set.insert_string_value(
          dataSet,
          registry.transfer_syntax_uid,
          gleam.List.fromArray([transfer_syntax.explicit_vr_little_endian.uid]),
        ),
      ),
      Effect.die,
    );
  }

  // Write data set to in-memory P10 bytes
  const bitArray = yield* pipe(
    gleamResultToEffect(dcmfx_p10.write_bytes(dataSet, new option.None())),
    Effect.mapError((e) =>
      p10_error.to_lines(e, "writing output data").toArray(),
    ),
  );

  // Write output file
  yield* Effect.tryPromise({
    try: () => vscode.workspace.fs.writeFile(dst, bitArray.buffer),
    catch: (e) => [`Error writing '${dst.toString()}': ${String(e)}`],
  });
}

import * as vscode from "vscode";
import { Effect, pipe } from "effect";
import type { Readable } from "stream";
import * as gleam from "../../vendor/dcmfx/prelude.mjs";
import { None } from "../../vendor/dcmfx/gleam_stdlib/gleam/option.mjs";
import * as data_error from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/data_error.mjs";
import * as data_element_tag from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as registry from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/registry.mjs";
import * as data_set from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/data_set.mjs";
import * as data_set_print from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/data_set_print.mjs";
import * as json_config from "../../vendor/dcmfx/dcmfx_json/dcmfx_json/json_config.mjs";
import * as p10_error from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_error.mjs";
import * as p10_json_transform from "../../vendor/dcmfx/dcmfx_json/dcmfx_json/transforms/p10_json_transform.mjs";
import * as p10_part from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_part.mjs";
import * as p10_print_transform from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/transforms/p10_print_transform.mjs";
import * as p10_read from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_read.mjs";
import * as value_representation from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/value_representation.mjs";
import * as value_multiplicity from "../../vendor/dcmfx/dcmfx_core/dcmfx_core/value_multiplicity.mjs";
import {
  gleamResultToEffect,
  gleamResultUnwrap,
  openReadStream,
  readDicomJsonDataSet,
  writeDataToReadContext,
} from "./utils.mjs";

export const DCMFX_SCHEME = "dcmfx";

/**
 * VS Code command that prints the content of a DICOM or DICOM JSON file, either
 * as human-readable text, or in the DICOM JSON Model.
 */
export function printDicomCommand(
  outputFormat: "dcmfx-print" | "json",
): (uri: vscode.Uri) => Promise<vscode.TextEditor> {
  return async (uri: vscode.Uri) => {
    const dcmfxUri = uri.with({
      scheme: DCMFX_SCHEME,
      path: uri.path + "." + outputFormat,
      query: new URLSearchParams({ scheme: uri.scheme }).toString(),
    });

    const doc = await vscode.workspace.openTextDocument(dcmfxUri);

    return vscode.window.showTextDocument(doc);
  };
}

export class DcmfxPrintContentProvider
  implements vscode.TextDocumentContentProvider
{
  public async provideTextDocumentContent(
    uri: vscode.Uri,
    token: vscode.CancellationToken,
  ): Promise<string> {
    const i = uri.fsPath.lastIndexOf(".");
    const outputFormat = uri.fsPath.slice(i + 1) as "dcmfx-print" | "json";
    const path = uri.fsPath.slice(0, i);

    const query = new URLSearchParams(uri.query);
    const scheme = query.get("scheme") as string;

    const inputFormat = path.toLowerCase().endsWith(".json")
      ? "dicom-json"
      : "dicom";

    let print: Effect.Effect<string, (string | string[])[]>;

    if (inputFormat === "dicom") {
      print = Effect.gen(function* () {
        const readStream = yield* openReadStream(uri.with({ scheme, path }));
        const output = yield* printDicom(readStream, outputFormat, token);

        return output;
      });
    } else {
      print = Effect.gen(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return printDicomJson(uri.with({ scheme, path }));
      });
    }

    const startAt = performance.now();

    return Effect.runPromise(
      pipe(
        print,
        Effect.match({
          onSuccess: (output) => {
            if (outputFormat === "dcmfx-print") {
              const processingTime = performance.now() - startAt;
              output += `\n\nProcessing time: ${processingTime.toFixed()} ms\n`;
            }

            return output;
          },
          onFailure: ([output, error]) =>
            `${output as string}\n\n\n${(error as string[]).map((line) => `[ERR] ${line}`).join("\n")}\n`,
        }),
      ),
    );
  }
}

/**
 * Returns the print options to use when displaying a DICOM data set.
 */
function getPrintOptions() {
  const styled = false;
  const maxWidth = 999;

  return new data_set_print.DataSetPrintOptions(styled, maxWidth);
}

/**
 * Reads DICOM JSON data from a URI and returns a human-readable representation
 * of it.
 */
function* printDicomJson(uri: vscode.Uri) {
  const dataSet = yield* readDicomJsonDataSet(uri);

  return data_set.to_lines(
    dataSet,
    getPrintOptions(),
    "",
    (lines, line) => lines + line + "\n",
  );
}

/**
 * Reads DICOM P10 data from a read stream and returns a human-readable
 * representation of it.
 */
function* printDicom(
  readStream: Readable,
  outputFormat: "dcmfx-print" | "json",
  token: vscode.CancellationToken,
) {
  // Construct DICOM P10 read context with a max part size of 256 KiB to keep
  // the read context's memory usage low while printing the DICOM
  let readContext = p10_read.new_read_context();
  const maxPartSize = 1024 * 1024;
  readContext = p10_read.with_config(
    readContext,
    new p10_read.P10ReadConfig(maxPartSize, 0xfffffffe, 10_000),
  );

  // Construct print transform to convert the stream of DICOM P10 parts into a
  // human-readable DICOM data set
  let p10PrintTransform = p10_print_transform.new$(getPrintOptions());

  // Construct print transform to convert the stream of DICOM P10 parts into a
  // human-readable DICOM data set
  const jsonConfig = new json_config.DicomJsonConfig(true);
  let p10JsonTransform = p10_json_transform.new$(jsonConfig);

  let output = "";
  let ended = false;

  while (!ended && !token.isCancellationRequested) {
    const readResult = p10_read.read_parts(readContext);

    yield* Effect.matchEffect(gleamResultToEffect(readResult), {
      // On success, pass all the read P10 parts through the active transform
      // and accumulate the output
      onSuccess: ([parts, newReadContext]) =>
        Effect.gen(function* () {
          readContext = newReadContext;

          for (const part of parts.toArray()) {
            if (outputFormat === "dcmfx-print") {
              const [newPrintTransform, s] = p10_print_transform.add_part(
                p10PrintTransform,
                part,
              );

              p10PrintTransform = newPrintTransform;
              output += s;
            } else if (outputFormat === "json") {
              const [newJsonTransform, s] = yield* pipe(
                gleamResultToEffect(
                  p10_json_transform.add_part(p10JsonTransform, part),
                ),
                Effect.mapError((e) =>
                  data_error.to_lines(e.data_error, "").toArray(),
                ),
              );

              p10JsonTransform = newJsonTransform;
              output += s;
            }

            if (part instanceof p10_part.End) {
              ended = true;
            }
          }

          return Effect.succeed(null);
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
            yield* Effect.fail([
              output,
              p10_error.to_lines(error, "").toArray(),
            ]);
          }
        }),
    });
  }

  if (!output.endsWith("\n")) {
    output += "\n";
  }

  if (token.isCancellationRequested) {
    output += "Operation cancelled\n";
  }

  return output;
}

/**
 * This hover provider adds some further context when hovering over data element
 * tags and VRs in the printed output. It also provides quick links to a
 * relevant Google search.
 */
export class DcmfxPrintHoverProvider implements vscode.HoverProvider {
  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken,
  ): vscode.Hover | undefined {
    const makeHover = (offset: number, length: number, content: string) =>
      new vscode.Hover(
        content,
        new vscode.Range(
          new vscode.Position(position.line, offset),
          new vscode.Position(position.line, offset + length),
        ),
      );

    // Check if the content of the hovered line has the expected structure
    const line = document.lineAt(position.line).text;
    const match = line.match(/(\s*)\(([0-9A-F]{4}),([0-9A-F]{4})\) ([A-Z]{2})/);
    if (match === null) {
      return undefined;
    }

    const indent = match[1].length;
    const group = match[2];
    const element = match[3];
    const vr = match[4];

    function getSearchLink(description: string, query: string) {
      return `[Search ${description} on Google](https://www.google.com/search?q=${query})`;
    }

    // Search prompt when hovering over the data element tag
    if (position.character >= indent && position.character < indent + 11) {
      const tag = new data_element_tag.DataElementTag(
        parseInt(group, 16),
        parseInt(element, 16),
      );

      let itemDetails = "Unrecognized data element";

      // Look up the tag in the registry
      const registryItem = registry.find(tag, new None());
      if (registryItem.isOk()) {
        const item = gleamResultUnwrap(registryItem);

        itemDetails =
          `### ${item.name}\n` +
          [
            `- Tag: ${group},${element}`,
            `- Multiplicity: ${value_multiplicity.to_string(
              item.multiplicity,
            )}`,
            `- Supported VRs: ${item.vrs
              .toArray()
              .map(value_representation.to_string)
              .join(", ")}`,
          ].join("\n");
      }

      const searchLink = getSearchLink(
        "DICOM tag",
        `DICOM+tag+(${group}%2C${element})`,
      );

      return makeHover(indent, 11, `${itemDetails}\n\n${searchLink}`);
    }

    // Search prompt when hovering over the VR
    const vrPos = indent + 12;
    if (position.character >= vrPos && position.character <= vrPos + 2) {
      // Convert to a full VR name
      const dcmfxVr = value_representation.from_bytes(
        new gleam.BitArray(
          new Uint8Array([vr.charCodeAt(0), vr.charCodeAt(1)]),
        ),
      );
      const vrName = value_representation.name(gleamResultUnwrap(dcmfxVr));

      const searchLink = getSearchLink("DICOM VR", `DICOM+VR+${vr}`);

      return makeHover(vrPos, 2, `VR: ${vrName}\n\n${searchLink}`);
    }

    return undefined;
  }
}

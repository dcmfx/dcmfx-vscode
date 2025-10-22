import { Effect, pipe } from "effect";
import { createReadStream } from "fs";
import { Readable } from "stream";
import * as vscode from "vscode";
import * as dcmfx_json from "../../vendor/dcmfx/dcmfx_json/dcmfx_json.mjs";
import * as json_error from "../../vendor/dcmfx/dcmfx_json/dcmfx_json/json_error.mjs";
import * as dcmfx_p10 from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10.mjs";
import * as p10_error from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_error.mjs";
import * as p10_read from "../../vendor/dcmfx/dcmfx_p10/dcmfx_p10/p10_read.mjs";
import {
  type BitArray,
  BitArray$BitArray,
  type List,
  List$Empty,
  List$isNonEmpty,
  List$NonEmpty,
  List$NonEmpty$first,
  List$NonEmpty$rest,
  type Result,
  Result$Error$0,
  Result$isOk,
  Result$Ok$0,
} from "../../vendor/dcmfx/prelude.mjs";

/**
 * Reads a VS Code URI into a `Uint8Array`.
 */
export function* readFileContent(uri: vscode.Uri) {
  const data = yield* Effect.tryPromise({
    try: () => vscode.workspace.fs.readFile(uri),
    catch: (e) => [`Error opening file '${uri.toString()}': ${String(e)}`],
  });

  return data;
}

/**
 * Reads a VS Code URI for a DICOM P10 file into an in-memory DICOM data set.
 */
export function* readDicomDataSet(uri: vscode.Uri) {
  const inputBytes = yield* readFileContent(uri);

  const dataSet = yield* gleamResultToEffect(
    dcmfx_p10.read_bytes(gleamBitArrayFromUint8Array(inputBytes)),
  ).pipe(
    Effect.mapError((e) => gleamListToArray(p10_error.to_lines(e[0], ""))),
  );

  return dataSet;
}

/**
 * Reads a VS Code URI for a DICOM JSON file into an in-memory DICOM data set.
 */
export function* readDicomJsonDataSet(uri: vscode.Uri) {
  const inputBytes = yield* readFileContent(uri);

  const inputString = yield* Effect.try({
    try: () => new TextDecoder("utf-8", { fatal: true }).decode(inputBytes),
    catch: () => ["The selected file is not valid UTF-8"],
  });

  const dataSet = yield* gleamResultToEffect(
    dcmfx_json.json_to_data_set(inputString),
  ).pipe(
    Effect.mapError((e) =>
      gleamListToArray(json_error.deserialize_error_to_lines(e, "")),
    ),
  );

  return dataSet;
}

/**
 * Creates a `Readable` for a VS Code URI.
 *
 * If the URI is a local file then a Node.js read stream is opened so that the
 * data can be streamed in without loading the entire file into memory. All
 * other sources are loaded into memory via the VS Code file system layer and
 * then wrapped in a `Readable`.
 */
export function* openReadStream(uri: vscode.Uri) {
  if (uri.scheme === "file") {
    const stream = yield* Effect.try({
      try: () =>
        createReadStream(uri.fsPath, { highWaterMark: 4 * 1024 * 1024 }),
      catch: (e) => [`Error opening '${uri.toString()}': ${String(e)}`],
    });

    return stream;
  }

  const data = yield* readFileContent(uri);

  return new Readable({
    read() {
      this.push(Buffer.from(data));
      this.push(null);
    },
  });
}

/**
 * Reads up to 1 MiB from the read stream and writes it into the P10 read
 * context.
 */
export function* writeDataToReadContext(
  readStream: Readable,
  readContext: p10_read.P10ReadContext$,
) {
  if (readStream.errored) {
    yield* Effect.fail([`Read stream error: ${readStream.errored.message}`]);
  }

  const data = readStream.read(1024 * 1024) as Buffer | null;

  let p10Bytes: Uint8Array;
  let dataComplete = false;

  if (data === null) {
    if (readStream.readableEnded) {
      p10Bytes = new Uint8Array();
      dataComplete = true;
    } else {
      // There's no data in the read stream so yield briefly to give the read
      // stream a chance to buffer more data
      yield* Effect.promise(
        async () => new Promise((resolve) => setTimeout(resolve, 0)),
      );

      return readContext;
    }
  } else {
    p10Bytes = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }

  // Write the P10 bytes to the read context
  const newReadContext = yield* pipe(
    gleamResultToEffect(
      p10_read.write_bytes(
        readContext,
        gleamBitArrayFromUint8Array(p10Bytes),
        dataComplete,
      ),
    ),
    Effect.mapError((e) => gleamListToArray(p10_error.to_lines(e, ""))),
  );

  return newReadContext;
}

/**
 * Converts a Gleam `Result<A, E>` to an `Effect<A, E, never>`.
 *
 * This bridges the gap between Gleam's Result type and the Effect.js library.
 */
export function gleamResultToEffect<T, E>(
  result: Result<T, E>,
): Effect.Effect<T, E> {
  if (Result$isOk(result)) {
    return Effect.succeed(Result$Ok$0(result) as T);
  } else {
    return Effect.fail(Result$Error$0(result) as E);
  }
}

/**
 * Unwraps a Gleam `Result<A, E>` to an `A`. Throws an exception if the passed
 * `Result` is not `Ok`.
 */
export function gleamResultUnwrap<T, E>(result: Result<T, E>): T {
  if (Result$isOk(result)) {
    return Result$Ok$0(result) as T;
  } else {
    throw Error("Failed to unwrap Gleam Error");
  }
}

/** Converts a Gleam List into a JavaScript array. */
export function gleamListToArray<T>(inputList: List<T>): T[] {
  const array: T[] = [];

  let list = inputList;
  while (List$isNonEmpty(list)) {
    array.push(List$NonEmpty$first(list) as T);
    list = List$NonEmpty$rest(list) as List<T>;
  }

  return array;
}

/** Converts a JavaScript array into a Gleam List. */
export function arrayToGleamList<T>(array: T[]): List<T> {
  let list: List<T> = List$Empty();

  for (let i = array.length - 1; i >= 0; i--) {
    list = List$NonEmpty(array[i], list);
  }

  return list;
}

/** Convert a JavaScript Uint8Array to a Gleam BitArray. */
export function gleamBitArrayFromUint8Array(buffer: Uint8Array): BitArray {
  const bitSize = buffer.byteLength * 8;

  return BitArray$BitArray(buffer, bitSize, 0);
}

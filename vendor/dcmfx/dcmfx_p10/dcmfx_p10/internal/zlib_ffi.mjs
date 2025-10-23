import { Deflate, Inflate, constants } from "./zlib/pako.esm.mjs";
import {
  BitArray$BitArray,
  Result$Error,
  Result$Ok,
} from "../../../prelude.mjs";
import { List$Empty, List$NonEmpty } from "../../gleam.mjs";
import {
  FlushCommand$isFinish,
  FlushCommand$isFull,
  FlushCommand$isSync,
  FlushCommand$isNone,
} from "./zlib/flush_command.mjs";
import {
  InflateResult$Continue,
  InflateResult$Finished,
} from "./zlib/inflate_result.mjs";

const Nil = undefined;

export function open() {
  return {};
}

/// A custom onEnd() callback that doesn't flatten the final result into a
/// single buffer.
function onEnd(status) {
  this.err = status;
  this.msg = this.strm.msg;
}

export function deflate_init(
  stream,
  level,
  _method,
  window_bits,
  mem_level,
  _strategy,
) {
  stream.deflate = new Deflate({
    level,
    method: constants.Z_DEFLATED,
    windowBits: window_bits,
    memLevel: mem_level,
    strategy: constants.Z_DEFAULT_STRATEGY,
  });

  stream.deflate.onEnd = onEnd;
}

export function inflate_init(stream, window_bits) {
  stream.inflate = new Inflate({
    windowBits: window_bits,
    chunkSize: 16 * 1024,
  });

  stream.inflate.onEnd = onEnd;
}

export function deflate(stream, data, flush) {
  let flush_mode = constants.Z_NO_FLUSH;

  if (FlushCommand$isFinish(flush)) {
    flush_mode = constants.Z_FINISH;
  } else if (FlushCommand$isFull(flush)) {
    flush_mode = constants.Z_FULL_FLUSH;
  } else if (FlushCommand$isNone(flush)) {
    flush_mode = constants.Z_NO_FLUSH;
  } else if (FlushCommand$isSync(flush)) {
    flush_mode = constants.Z_SYNC_FLUSH;
  } else {
    throw Error(`Invalid zlib flush command: ${flush}`);
  }

  let buffer = data.rawBuffer;
  if (data.bitOffset !== 0) {
    buffer = new Uint8Array(data.byteSize);
    for (let i = 0; i < data.byteSize; i++) {
      buffer[i] = data.byteAt(i);
    }
  }

  stream.deflate.push(buffer, flush_mode);

  const bitArrays = stream.deflate.chunks.map((chunk) =>
    BitArray$BitArray(chunk),
  );

  stream.deflate.chunks = [];

  let result = List$Empty();
  for (let i = bitArrays.length - 1; i >= 0; --i) {
    result = List$NonEmpty(bitArrays[i], result);
  }

  return result;
}

export function safe_inflate(stream, input_bytes) {
  // Bytes written after the inflate is complete are ignored. This matches the
  // behavior of Erlang's zlib module.
  if (!stream.inflate.ended) {
    if (input_bytes.bitSize % 8 !== 0) {
      return Result$Error(Nil);
    }

    if (input_bytes.byteSize > 0) {
      // This push() call fully deflates the provided input bytes, which means
      // it is not resilient to zlib inflate bombs. pako.js does not appear to
      // natively support a safe inflate, though it is likely possible to extend
      // it to do so if desired. This issue only exists on the JavaScript target
      // as Erlang's zlib module provides a true safe inflate function.

      if (input_bytes.bitOffset === 0) {
        if (!stream.inflate.push(input_bytes.rawBuffer)) {
          return Result$Error(Nil);
        }
      } else {
        const alignedArray = new Uint8Array();
        for (let i = 0; i < input_bytes.byteSize; i++) {
          alignedArray[i] = input_bytes.byteAt(i);
        }

        if (!stream.inflate.push(alignedArray)) {
          return Result$Error(Nil);
        }
      }
    }

    if (stream.inflate.err !== 0) {
      return Result$Error(Nil);
    }
  }

  const chunk = stream.inflate.chunks.shift() ?? new Uint8Array();
  const bitArray = BitArray$BitArray(chunk);

  if (
    chunk.length === 0 &&
    stream.inflate.chunks.length === 0 &&
    stream.inflate.ended
  ) {
    return Result$Ok(InflateResult$Finished(bitArray));
  } else {
    return Result$Ok(InflateResult$Continue(bitArray));
  }
}

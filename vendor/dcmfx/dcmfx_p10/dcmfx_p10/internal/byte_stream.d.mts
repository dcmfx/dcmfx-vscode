import type * as $deque from "../../../gleam_deque/gleam/deque.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $zlib from "../../dcmfx_p10/internal/zlib.d.mts";
import type * as _ from "../../gleam.d.mts";

declare class ByteStream extends _.CustomType {
  /** @deprecated */
  constructor(
    bytes_queue: $deque.Deque$<_.BitArray>,
    bytes_queue_size: number,
    bytes_read: number,
    max_read_size: number,
    is_writing_finished: boolean,
    zlib_stream: $option.Option$<$zlib.ZlibStream$>,
    zlib_inflate_complete: boolean
  );
  /** @deprecated */
  bytes_queue: $deque.Deque$<_.BitArray>;
  /** @deprecated */
  bytes_queue_size: number;
  /** @deprecated */
  bytes_read: number;
  /** @deprecated */
  max_read_size: number;
  /** @deprecated */
  is_writing_finished: boolean;
  /** @deprecated */
  zlib_stream: $option.Option$<$zlib.ZlibStream$>;
  /** @deprecated */
  zlib_inflate_complete: boolean;
}

export type ByteStream$ = ByteStream;

export class ReadOversized extends _.CustomType {}
export function ByteStreamError$ReadOversized(): ByteStreamError$;
export function ByteStreamError$isReadOversized(
  value: ByteStreamError$,
): boolean;

export class DataRequired extends _.CustomType {}
export function ByteStreamError$DataRequired(): ByteStreamError$;
export function ByteStreamError$isDataRequired(
  value: ByteStreamError$,
): boolean;

export class DataEnd extends _.CustomType {}
export function ByteStreamError$DataEnd(): ByteStreamError$;
export function ByteStreamError$isDataEnd(value: ByteStreamError$): boolean;

export class ZlibDataError extends _.CustomType {}
export function ByteStreamError$ZlibDataError(): ByteStreamError$;
export function ByteStreamError$isZlibDataError(
  value: ByteStreamError$,
): boolean;

export class WriteAfterCompletion extends _.CustomType {}
export function ByteStreamError$WriteAfterCompletion(): ByteStreamError$;
export function ByteStreamError$isWriteAfterCompletion(
  value: ByteStreamError$,
): boolean;

export type ByteStreamError$ = ReadOversized | DataRequired | DataEnd | ZlibDataError | WriteAfterCompletion;

export function new$(max_read_size: number): ByteStream$;

export function bytes_read(stream: ByteStream$): number;

export function is_fully_consumed(stream: ByteStream$): boolean;

export function peek(stream: ByteStream$, byte_count: number): _.Result<
  _.BitArray,
  ByteStreamError$
>;

export function write(stream: ByteStream$, data: _.BitArray, done: boolean): _.Result<
  ByteStream$,
  ByteStreamError$
>;

export function read(stream: ByteStream$, byte_count: number): _.Result<
  [_.BitArray, ByteStream$],
  ByteStreamError$
>;

export function start_zlib_inflate(stream: ByteStream$): _.Result<
  ByteStream$,
  ByteStreamError$
>;

import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $queue from "../../../gleam_stdlib/gleam/queue.d.mts";
import type * as $zlib from "../../dcmfx_p10/internal/zlib.d.mts";
import type * as _ from "../../gleam.d.mts";

declare class ByteStream extends _.CustomType {
  constructor(
    bytes_queue: $queue.Queue$<_.BitArray>,
    bytes_queue_size: number,
    bytes_read: number,
    max_read_size: number,
    is_writing_finished: boolean,
    zlib_stream: $option.Option$<$zlib.ZlibStream$>
  );
  
  bytes_queue: $queue.Queue$<_.BitArray>;
  bytes_queue_size: number;
  bytes_read: number;
  max_read_size: number;
  is_writing_finished: boolean;
  zlib_stream: $option.Option$<$zlib.ZlibStream$>;
}

export type ByteStream$ = ByteStream;

export class ReadOversized extends _.CustomType {}

export class DataRequired extends _.CustomType {}

export class DataEnd extends _.CustomType {}

export class ZlibDataError extends _.CustomType {}

export class WriteAfterCompletion extends _.CustomType {}

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

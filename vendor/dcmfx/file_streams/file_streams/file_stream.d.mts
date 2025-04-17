import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $file_open_mode from "../file_streams/file_open_mode.d.mts";
import type * as $file_stream_error from "../file_streams/file_stream_error.d.mts";
import type * as $raw_location from "../file_streams/internal/raw_location.d.mts";
import type * as $raw_read_result from "../file_streams/internal/raw_read_result.d.mts";
import type * as $raw_result from "../file_streams/internal/raw_result.d.mts";
import type * as $text_encoding from "../file_streams/text_encoding.d.mts";
import type * as _ from "../gleam.d.mts";

declare type IoDevice$ = unknown;

declare class FileStream extends _.CustomType {
  constructor(
    io_device: IoDevice$,
    encoding: $option.Option$<$text_encoding.TextEncoding$>
  );
  
  io_device: IoDevice$;
  encoding: $option.Option$<$text_encoding.TextEncoding$>;
}

export type FileStream$ = FileStream;

export class BeginningOfFile extends _.CustomType {
  constructor(offset: number);
  
  offset: number;
}

export class CurrentLocation extends _.CustomType {
  constructor(offset: number);
  
  offset: number;
}

export class EndOfFile extends _.CustomType {
  constructor(offset: number);
  
  offset: number;
}

export type FileStreamLocation$ = BeginningOfFile | CurrentLocation | EndOfFile;

export function open(
  filename: string,
  modes: _.List<$file_open_mode.FileOpenMode$>
): _.Result<FileStream$, $file_stream_error.FileStreamError$>;

export function open_read(filename: string): _.Result<
  FileStream$,
  $file_stream_error.FileStreamError$
>;

export function open_read_text(
  filename: string,
  encoding: $text_encoding.TextEncoding$
): _.Result<FileStream$, $file_stream_error.FileStreamError$>;

export function open_write(filename: string): _.Result<
  FileStream$,
  $file_stream_error.FileStreamError$
>;

export function open_write_text(
  filename: string,
  encoding: $text_encoding.TextEncoding$
): _.Result<FileStream$, $file_stream_error.FileStreamError$>;

export function close(stream: FileStream$): _.Result<
  undefined,
  $file_stream_error.FileStreamError$
>;

export function set_encoding(
  stream: FileStream$,
  encoding: $text_encoding.TextEncoding$
): _.Result<FileStream$, $file_stream_error.FileStreamError$>;

export function position(stream: FileStream$, location: FileStreamLocation$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function write_bytes(stream: FileStream$, bytes: _.BitArray): _.Result<
  undefined,
  $file_stream_error.FileStreamError$
>;

export function write_chars(stream: FileStream$, chars: string): _.Result<
  undefined,
  $file_stream_error.FileStreamError$
>;

export function sync(stream: FileStream$): _.Result<
  undefined,
  $file_stream_error.FileStreamError$
>;

export function read_bytes(stream: FileStream$, byte_count: number): _.Result<
  _.BitArray,
  $file_stream_error.FileStreamError$
>;

export function read_bytes_exact(stream: FileStream$, byte_count: number): _.Result<
  _.BitArray,
  $file_stream_error.FileStreamError$
>;

export function read_remaining_bytes(stream: FileStream$): _.Result<
  _.BitArray,
  $file_stream_error.FileStreamError$
>;

export function read_line(stream: FileStream$): _.Result<
  string,
  $file_stream_error.FileStreamError$
>;

export function read_chars(stream: FileStream$, count: number): _.Result<
  string,
  $file_stream_error.FileStreamError$
>;

export function read_int8(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_uint8(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_int16_le(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_int16_be(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_uint16_le(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_uint16_be(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_int32_le(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_int32_be(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_uint32_le(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_uint32_be(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_int64_le(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_int64_be(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_uint64_le(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_uint64_be(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_float32_le(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_float32_be(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_float64_le(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_float64_be(stream: FileStream$): _.Result<
  number,
  $file_stream_error.FileStreamError$
>;

export function read_list<BYRT>(
  stream: FileStream$,
  item_read_fn: (x0: FileStream$) => _.Result<
    BYRT,
    $file_stream_error.FileStreamError$
  >,
  item_count: number
): _.Result<_.List<BYRT>, $file_stream_error.FileStreamError$>;

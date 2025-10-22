/// <reference types="./file_open_mode.d.mts" />
import * as $text_encoding from "../file_streams/text_encoding.mjs";
import { CustomType as $CustomType } from "../gleam.mjs";

export class Append extends $CustomType {}
export const FileOpenMode$Append = () => new Append();
export const FileOpenMode$isAppend = (value) => value instanceof Append;

export class Binary extends $CustomType {}
export const FileOpenMode$Binary = () => new Binary();
export const FileOpenMode$isBinary = (value) => value instanceof Binary;

/**
 * Data in subsequent `file_stream.write_*` calls are buffered until at least
 * `size` bytes are buffered, or until the oldest buffered data is `delay`
 * milliseconds old. Then all buffered data is written in one operating
 * system call. The buffered data is also flushed before some other file
 * operations that are not `file_stream.write_*` calls.
 *
 * The purpose of this option is to increase performance by reducing the
 * number of operating system calls. Thus, `file_stream.write_*` calls must
 * be for sizes significantly less than `size`, and should not interspersed
 * by too many other file operations.
 *
 * When this option is used, the result of `file_stream.write_*` calls can
 * prematurely be reported as successful, and if a write error occurs, the
 * error is reported as the result of the next file operation, which is not
 * executed.
 *
 * For example, when `DelayedWrite` is used, after a number of
 * `file_stream.write_*` calls,
 * [`file_stream.close()`](./file_stream.html#close) can return
 * `Error(FileStreamError(Enospc)))` as there is not enough space on the
 * device for previously written data.
 * [`file_stream.close()`](./file_stream.html#close) must be called again, as
 * the file is still open.
 * 
 * This mode is ignored on the JavaScript target.
 */
export class DelayedWrite extends $CustomType {
  constructor(size, delay) {
    super();
    this.size = size;
    this.delay = delay;
  }
}
export const FileOpenMode$DelayedWrite = (size, delay) =>
  new DelayedWrite(size, delay);
export const FileOpenMode$isDelayedWrite = (value) =>
  value instanceof DelayedWrite;
export const FileOpenMode$DelayedWrite$size = (value) => value.size;
export const FileOpenMode$DelayedWrite$0 = (value) => value.size;
export const FileOpenMode$DelayedWrite$delay = (value) => value.delay;
export const FileOpenMode$DelayedWrite$1 = (value) => value.delay;

/**
 * Makes the file stream perform automatic translation of text to and from
 * the specified text encoding when using the
 * [`file_stream.read_line()`](./file_stream.html#read_line),
 * [`file_stream.read_chars()`](./file_stream.html#read_chars), and
 * [`file_stream.write_chars()`](./file_stream.html#write_chars) functions.
 *
 * If characters are written that can't be converted to the specified
 * encoding then an error occurs and the file is closed.
 *
 * This option is not allowed when `Raw` is specified.
 *
 * The text encoding of an open file stream can be changed with
 * [`file_stream.set_encoding()`](./file_stream.html#set_encoding) function.
 * 
 * This mode is not supported on the JavaScript target.
 */
export class Encoding extends $CustomType {
  constructor(encoding) {
    super();
    this.encoding = encoding;
  }
}
export const FileOpenMode$Encoding = (encoding) => new Encoding(encoding);
export const FileOpenMode$isEncoding = (value) => value instanceof Encoding;
export const FileOpenMode$Encoding$encoding = (value) => value.encoding;
export const FileOpenMode$Encoding$0 = (value) => value.encoding;

export class Exclusive extends $CustomType {}
export const FileOpenMode$Exclusive = () => new Exclusive();
export const FileOpenMode$isExclusive = (value) => value instanceof Exclusive;

export class Raw extends $CustomType {}
export const FileOpenMode$Raw = () => new Raw();
export const FileOpenMode$isRaw = (value) => value instanceof Raw;

export class Read extends $CustomType {}
export const FileOpenMode$Read = () => new Read();
export const FileOpenMode$isRead = (value) => value instanceof Read;

/**
 * Activates read data buffering. If `file_stream.read_*` calls are for
 * significantly less than `size` bytes, read operations to the operating
 * system are still performed for blocks of `size` bytes. The extra data is
 * buffered and returned in subsequent `file_stream.read_*` calls, giving a
 * performance gain as the number of operating system calls is reduced.
 *
 * If `file_stream.read_*` calls are for sizes not significantly less than
 * `size` bytes, or are greater than `size` bytes, no performance gain can be
 * expected.
 * 
 * This mode is ignored on the JavaScript target.
 */
export class ReadAhead extends $CustomType {
  constructor(size) {
    super();
    this.size = size;
  }
}
export const FileOpenMode$ReadAhead = (size) => new ReadAhead(size);
export const FileOpenMode$isReadAhead = (value) => value instanceof ReadAhead;
export const FileOpenMode$ReadAhead$size = (value) => value.size;
export const FileOpenMode$ReadAhead$0 = (value) => value.size;

export class Write extends $CustomType {}
export const FileOpenMode$Write = () => new Write();
export const FileOpenMode$isWrite = (value) => value instanceof Write;

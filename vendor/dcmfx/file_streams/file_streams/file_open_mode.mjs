/// <reference types="./file_open_mode.d.mts" />
import * as $text_encoding from "../file_streams/text_encoding.mjs";
import { CustomType as $CustomType } from "../gleam.mjs";

export class Append extends $CustomType {}

export class Binary extends $CustomType {}

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

export class Exclusive extends $CustomType {}

export class Raw extends $CustomType {}

export class Read extends $CustomType {}

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

export class Write extends $CustomType {}

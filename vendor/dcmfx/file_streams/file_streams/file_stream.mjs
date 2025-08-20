/// <reference types="./file_stream.d.mts" />
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../gleam_stdlib/gleam/bool.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $file_open_mode from "../file_streams/file_open_mode.mjs";
import * as $file_stream_error from "../file_streams/file_stream_error.mjs";
import * as $raw_location from "../file_streams/internal/raw_location.mjs";
import * as $raw_read_result from "../file_streams/internal/raw_read_result.mjs";
import * as $raw_result from "../file_streams/internal/raw_result.mjs";
import * as $text_encoding from "../file_streams/text_encoding.mjs";
import { Latin1 } from "../file_streams/text_encoding.mjs";
import {
  file_open as do_open,
  file_close,
  io_setopts,
  file_position,
  file_write,
  io_put_chars,
  file_sync,
  file_read,
  io_get_line,
  file_read_line,
  io_get_chars,
} from "../file_streams_ffi.mjs";
import {
  Ok,
  Error,
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
  bitArraySliceToFloat,
  bitArraySliceToInt,
} from "../gleam.mjs";

const FILEPATH = "src/file_streams/file_stream.gleam";

class FileStream extends $CustomType {
  constructor(io_device, encoding) {
    super();
    this.io_device = io_device;
    this.encoding = encoding;
  }
}

/**
 * A location relative to the beginning of the file, i.e. an absolute offset
 * in the file stream. The offset should not be negative.
 */
export class BeginningOfFile extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

/**
 * A location relative to the current position in the file stream. The offset
 * can be either positive or negative.
 */
export class CurrentLocation extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

/**
 * A location relative to the end of the file stream. The offset should not
 * be positive.
 */
export class EndOfFile extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

/**
 * Opens a new file stream that can read and/or write data from the specified
 * file. See [`FileOpenMode`](./file_open_mode.html#FileOpenMode) for all of
 * the available file modes.
 *
 * For simple cases of opening a file stream prefer one of the
 * [`open_read()`](#open_read), [`open_write()`](#open_write),
 * [`open_read_text()`](#open_read_text), or
 * [`open_write_text()`](#open_write_text) helper functions to avoid needing to
 * manually specify the file mode.
 *
 * Once the file stream is no longer needed it should be closed with
 * [`close()`](#close).
 */
export function open(filename, modes) {
  let _block;
  let _pipe = modes;
  _block = $list.contains(_pipe, new $file_open_mode.Raw());
  let is_raw = _block;
  let _block$1;
  let _pipe$1 = modes;
  let _pipe$2 = $list.find_map(
    _pipe$1,
    (m) => {
      if (m instanceof $file_open_mode.Encoding) {
        let e = m.encoding;
        return new Ok(e);
      } else {
        return new Error(undefined);
      }
    },
  );
  _block$1 = $option.from_result(_pipe$2);
  let encoding = _block$1;
  let _block$2;
  if (is_raw) {
    if (encoding instanceof Some) {
      _block$2 = new Error(new $file_stream_error.Enotsup());
    } else {
      _block$2 = new Ok(new None());
    }
  } else {
    _block$2 = new Ok(
      (() => {
        let _pipe$3 = encoding;
        return $option.or(_pipe$3, new Some(new $text_encoding.Latin1()));
      })(),
    );
  }
  let encoding$1 = _block$2;
  return $result.try$(
    encoding$1,
    (encoding) => {
      let _block$3;
      let $ = (() => {
        let _pipe$3 = modes;
        return $list.contains(_pipe$3, new $file_open_mode.Binary());
      })();
      if ($) {
        _block$3 = modes;
      } else {
        _block$3 = listPrepend(new $file_open_mode.Binary(), modes);
      }
      let mode = _block$3;
      return $result.try$(
        do_open(filename, mode),
        (io_device) => { return new Ok(new FileStream(io_device, encoding)); },
      );
    },
  );
}

/**
 * Opens a new file stream for reading from the specified file. Allows for
 * efficient reading of binary data and lines of UTF-8 text.
 *
 * The modes used are:
 *
 * - `Read`
 * - `ReadAhead(size: 64 * 1024)`
 * - `Raw`
 */
export function open_read(filename) {
  let modes = toList([
    new $file_open_mode.Read(),
    new $file_open_mode.ReadAhead(64 * 1024),
    new $file_open_mode.Raw(),
  ]);
  return open(filename, modes);
}

/**
 * Opens a new file stream for reading encoded text from a file. If only
 * reading of UTF-8 lines of text is needed then prefer
 * [`open_read()`](#open_read) as it is much faster due to using `Raw` mode.
 *
 * The modes used are:
 *
 * - `Read`
 * - `ReadAhead(size: 64 * 1024)`
 * - `Encoding(encoding)`
 *
 * The text encoding for a file stream can be changed with
 * [`set_encoding`](#set_encoding).
 *
 * This function is not supported on the JavaScript target.
 */
export function open_read_text(filename, encoding) {
  let modes = toList([
    new $file_open_mode.Read(),
    new $file_open_mode.ReadAhead(64 * 1024),
    new $file_open_mode.Encoding(encoding),
  ]);
  return open(filename, modes);
}

/**
 * Opens a new file stream for writing to a file. Allows for efficient writing
 * of binary data and UTF-8 text.
 *
 * The modes used are:
 *
 * - `Write`
 * - `DelayedWrite(size: 64 * 1024, delay: 2000)`
 * - `Raw`
 */
export function open_write(filename) {
  let modes = toList([
    new $file_open_mode.Write(),
    new $file_open_mode.DelayedWrite(64 * 1024, 2000),
    new $file_open_mode.Raw(),
  ]);
  return open(filename, modes);
}

/**
 * Opens a new file stream for writing encoded text to a file. If only writing
 * of UTF-8 text is needed then prefer [`open_write()`](#open_write) as it is
 * much faster due to using `Raw` mode.
 *
 * The modes used are:
 *
 * - `Write`
 * - `DelayedWrite(size: 64 * 1024, delay: 2000)`
 * - `Encoding(encoding)`
 *
 * The text encoding for a file stream can be changed with
 * [`set_encoding`](#set_encoding).
 *
 * This function is not supported on the JavaScript target.
 */
export function open_write_text(filename, encoding) {
  let modes = toList([
    new $file_open_mode.Write(),
    new $file_open_mode.DelayedWrite(64 * 1024, 2000),
    new $file_open_mode.Encoding(encoding),
  ]);
  return open(filename, modes);
}

/**
 * Closes an open file stream.
 */
export function close(stream) {
  let $ = file_close(stream.io_device);
  if ($ instanceof $raw_result.Ok) {
    return new Ok(undefined);
  } else {
    let e = $.error;
    return new Error(e);
  }
}

/**
 * Changes the text encoding of a file stream from what was configured when it
 * was opened. Returns a new [`FileStream`](#FileStream) that should be used
 * for subsequent calls.
 *
 * This function is not supported for file streams opened in `Raw` mode.
 *
 * This function is not supported on the JavaScript target.
 */
export function set_encoding(stream, encoding) {
  return $bool.guard(
    isEqual(stream.encoding, new None()),
    new Error(new $file_stream_error.Enotsup()),
    () => {
      let opts = toList([
        new $file_open_mode.Binary(),
        new $file_open_mode.Encoding(encoding),
      ]);
      let $ = io_setopts(stream.io_device, opts);
      if ($ instanceof $raw_result.Ok) {
        return new Ok(new FileStream(stream.io_device, new Some(encoding)));
      } else {
        let e = $.error;
        return new Error(e);
      }
    },
  );
}

/**
 * Sets the position of a file stream to the given location, where the location
 * can be relative to the beginning of the file, the end of the file, or the
 * current position in the file. On success, returns the current position in
 * the file stream as an absolute offset in bytes.
 *
 * If a file stream is opened in `Append` mode then data is always written at
 * the end of the file, regardless of the current file position.
 */
export function position(stream, location) {
  let _block;
  if (location instanceof BeginningOfFile) {
    let offset = location.offset;
    _block = new $raw_location.Bof(offset);
  } else if (location instanceof CurrentLocation) {
    let offset = location.offset;
    _block = new $raw_location.Cur(offset);
  } else {
    let offset = location.offset;
    _block = new $raw_location.Eof(offset);
  }
  let location$1 = _block;
  return file_position(stream.io_device, location$1);
}

/**
 * Writes raw bytes to a file stream.
 *
 * This function is supported when the file stream was opened in `Raw` mode or
 * it uses the default `Latin1` text encoding. If this is not the case then
 * use [`write_chars()`](#write_chars).
 */
export function write_bytes(stream, bytes) {
  return $bool.guard(
    (!isEqual(stream.encoding, new None())) && (!isEqual(
      stream.encoding,
      new Some(new Latin1())
    )),
    new Error(new $file_stream_error.Enotsup()),
    () => {
      return $bool.guard(
        ($bit_array.bit_size(bytes) % 8) !== 0,
        new Error(new $file_stream_error.Einval()),
        () => {
          let $ = file_write(stream.io_device, bytes);
          if ($ instanceof $raw_result.Ok) {
            return new Ok(undefined);
          } else {
            let e = $.error;
            return new Error(e);
          }
        },
      );
    },
  );
}

/**
 * Writes characters to a file stream. This will convert the characters to the
 * text encoding specified when the file stream was opened.
 *
 * For file streams opened in `Raw` mode, this function always writes UTF-8.
 *
 * This function is not supported on the JavaScript target.
 */
export function write_chars(stream, chars) {
  let $ = stream.encoding;
  if ($ instanceof Some) {
    return io_put_chars(stream.io_device, chars);
  } else {
    let _pipe = chars;
    let _pipe$1 = $bit_array.from_string(_pipe);
    return ((_capture) => { return write_bytes(stream, _capture); })(_pipe$1);
  }
}

/**
 * Syncs a file stream that was opened for writing. This ensures that any write
 * buffers kept by the operating system (not by the Erlang runtime system) are
 * written to disk.
 *
 * When a file stream is opened with delayed writes enabled to improve
 * performance, syncing can return an error related to flushing recently
 * written data to the underlying device.
 */
export function sync(stream) {
  let $ = file_sync(stream.io_device);
  if ($ instanceof $raw_result.Ok) {
    return new Ok(undefined);
  } else {
    let e = $.error;
    return new Error(e);
  }
}

/**
 * Reads bytes from a file stream. The returned number of bytes may be fewer
 * than the number that was requested if the end of the file stream was
 * reached.
 *
 * If the end of the file stream is encountered before any bytes can be read
 * then `Error(Eof)` is returned.
 *
 * This function is supported when the file stream was opened in `Raw` mode or
 * it uses the default `Latin1` text encoding. If this is not the case then
 * use [`read_chars()`](#read_chars) or [`read_line()`](#read_line).
 */
export function read_bytes(stream, byte_count) {
  return $bool.guard(
    (!isEqual(stream.encoding, new None())) && (!isEqual(
      stream.encoding,
      new Some(new Latin1())
    )),
    new Error(new $file_stream_error.Enotsup()),
    () => {
      let $ = file_read(stream.io_device, byte_count);
      if ($ instanceof $raw_read_result.Ok) {
        let bytes = $[0];
        return new Ok(bytes);
      } else if ($ instanceof $raw_read_result.Eof) {
        return new Error(new $file_stream_error.Eof());
      } else {
        let e = $.error;
        return new Error(e);
      }
    },
  );
}

/**
 * Reads the requested number of bytes from a file stream. If the requested
 * number of bytes can't be read prior to reaching the end of the file stream
 * then `Error(Eof)` is returned.
 *
 * This function is supported when the file stream was opened in `Raw` mode or
 * it uses the default `Latin1` text encoding. If this is not the case then use
 * [`read_chars()`](#read_chars) or [`read_line()`](#read_line) should be used
 * instead.
 */
export function read_bytes_exact(stream, byte_count) {
  let $ = read_bytes(stream, byte_count);
  if ($ instanceof Ok) {
    let bytes = $[0];
    let $1 = $bit_array.byte_size(bytes) === byte_count;
    if ($1) {
      return new Ok(bytes);
    } else {
      return new Error(new $file_stream_error.Eof());
    }
  } else {
    return $;
  }
}

function do_read_remaining_bytes(loop$stream, loop$acc) {
  while (true) {
    let stream = loop$stream;
    let acc = loop$acc;
    let $ = read_bytes(stream, 64 * 1024);
    if ($ instanceof Ok) {
      let bytes = $[0];
      loop$stream = stream;
      loop$acc = listPrepend(bytes, acc);
    } else {
      let $1 = $[0];
      if ($1 instanceof $file_stream_error.Eof) {
        let _pipe = acc;
        let _pipe$1 = $list.reverse(_pipe);
        let _pipe$2 = $bit_array.concat(_pipe$1);
        return new Ok(_pipe$2);
      } else {
        return $;
      }
    }
  }
}

/**
 * Reads all remaining bytes from a file stream. If no more data is available
 * in the file stream then this function will return an empty bit array. It
 * never returns `Error(Eof)`.
 *
 * This function is supported when the file stream was opened in `Raw` mode or
 * it uses the default `Latin1` text encoding. If this is not the case then use
 * [`read_chars()`](#read_chars) or [`read_line()`](#read_line) should be used
 * instead.
 */
export function read_remaining_bytes(stream) {
  return do_read_remaining_bytes(stream, toList([]));
}

/**
 * Reads the next line of text from a file stream. The returned string
 * will include the newline `\n` character. If the stream contains a Windows
 * newline `\r\n` then only the `\n` will be returned.
 *
 * This function always reads UTF-8 for file streams opened in `Raw` mode.
 * Otherwise, it uses the text encoding specified when the file was opened.
 *
 * This function is not supported on the JavaScript target.
 */
export function read_line(stream) {
  let $ = stream.encoding;
  if ($ instanceof Some) {
    let $1 = io_get_line(stream.io_device);
    if ($1 instanceof $raw_read_result.Ok) {
      let data = $1[0];
      return new Ok(data);
    } else if ($1 instanceof $raw_read_result.Eof) {
      return new Error(new $file_stream_error.Eof());
    } else {
      let e = $1.error;
      return new Error(e);
    }
  } else {
    let $1 = file_read_line(stream.io_device);
    if ($1 instanceof $raw_read_result.Ok) {
      let data = $1[0];
      let _pipe = data;
      let _pipe$1 = $bit_array.to_string(_pipe);
      return $result.replace_error(
        _pipe$1,
        new $file_stream_error.InvalidUnicode(),
      );
    } else if ($1 instanceof $raw_read_result.Eof) {
      return new Error(new $file_stream_error.Eof());
    } else {
      let e = $1.error;
      return new Error(e);
    }
  }
}

/**
 * Reads the next `count` characters from a file stream. The returned number of
 * characters may be fewer than the number that was requested if the end of the
 * stream is reached.
 *
 * This function is not supported for file streams opened in `Raw` mode. Use
 * the [`read_line()`](#read_line) function instead.
 *
 * This function is not supported on the JavaScript target.
 */
export function read_chars(stream, count) {
  let $ = stream.encoding;
  if ($ instanceof Some) {
    let $1 = io_get_chars(stream.io_device, count);
    if ($1 instanceof $raw_read_result.Ok) {
      let data = $1[0];
      return new Ok(data);
    } else if ($1 instanceof $raw_read_result.Eof) {
      return new Error(new $file_stream_error.Eof());
    } else {
      let e = $1.error;
      return new Error(e);
    }
  } else {
    return new Error(new $file_stream_error.Enotsup());
  }
}

/**
 * Reads an 8-bit signed integer from a file stream.
 */
export function read_int8(stream) {
  return $result.map(
    read_bytes_exact(stream, 1),
    (bits) => {
      let v;
      if (bits.bitSize === 8) {
        v = bitArraySliceToInt(bits, 0, 8, true, true);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          496,
          "read_int8",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 15855,
            end: 15893,
            pattern_start: 15866,
            pattern_end: 15886
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads an 8-bit unsigned integer from a file stream.
 */
export function read_uint8(stream) {
  return $result.map(
    read_bytes_exact(stream, 1),
    (bits) => {
      let v;
      if (bits.bitSize === 8) {
        v = bits.byteAt(0);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          505,
          "read_uint8",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 16090,
            end: 16130,
            pattern_start: 16101,
            pattern_end: 16123
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a little-endian 16-bit signed integer from a file stream.
 */
export function read_int16_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 2),
    (bits) => {
      let v;
      if (bits.bitSize === 16) {
        v = bitArraySliceToInt(bits, 0, 16, false, true);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          514,
          "read_int16_le",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 16342,
            end: 16388,
            pattern_start: 16353,
            pattern_end: 16381
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a big-endian 16-bit signed integer from a file stream.
 */
export function read_int16_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 2),
    (bits) => {
      let v;
      if (bits.bitSize === 16) {
        v = bitArraySliceToInt(bits, 0, 16, true, true);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          523,
          "read_int16_be",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 16597,
            end: 16640,
            pattern_start: 16608,
            pattern_end: 16633
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a little-endian 16-bit unsigned integer from a file stream.
 */
export function read_uint16_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 2),
    (bits) => {
      let v;
      if (bits.bitSize === 16) {
        v = bitArraySliceToInt(bits, 0, 16, false, false);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          532,
          "read_uint16_le",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 16855,
            end: 16903,
            pattern_start: 16866,
            pattern_end: 16896
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a big-endian 16-bit unsigned integer from a file stream.
 */
export function read_uint16_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 2),
    (bits) => {
      let v;
      if (bits.bitSize === 16) {
        v = bitArraySliceToInt(bits, 0, 16, true, false);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          541,
          "read_uint16_be",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 17115,
            end: 17160,
            pattern_start: 17126,
            pattern_end: 17153
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a little-endian 32-bit signed integer from a file stream.
 */
export function read_int32_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      let v;
      if (bits.bitSize === 32) {
        v = bitArraySliceToInt(bits, 0, 32, false, true);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          550,
          "read_int32_le",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 17372,
            end: 17418,
            pattern_start: 17383,
            pattern_end: 17411
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a big-endian 32-bit signed integer from a file stream.
 */
export function read_int32_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      let v;
      if (bits.bitSize === 32) {
        v = bitArraySliceToInt(bits, 0, 32, true, true);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          559,
          "read_int32_be",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 17627,
            end: 17670,
            pattern_start: 17638,
            pattern_end: 17663
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a little-endian 32-bit unsigned integer from a file stream.
 */
export function read_uint32_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      let v;
      if (bits.bitSize === 32) {
        v = bitArraySliceToInt(bits, 0, 32, false, false);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          568,
          "read_uint32_le",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 17885,
            end: 17933,
            pattern_start: 17896,
            pattern_end: 17926
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a big-endian 32-bit unsigned integer from a file stream.
 */
export function read_uint32_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      let v;
      if (bits.bitSize === 32) {
        v = bitArraySliceToInt(bits, 0, 32, true, false);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          577,
          "read_uint32_be",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 18145,
            end: 18190,
            pattern_start: 18156,
            pattern_end: 18183
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a little-endian 64-bit signed integer from a file stream.
 */
export function read_int64_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      let v;
      if (bits.bitSize === 64) {
        v = bitArraySliceToInt(bits, 0, 64, false, true);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          586,
          "read_int64_le",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 18402,
            end: 18448,
            pattern_start: 18413,
            pattern_end: 18441
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a big-endian 64-bit signed integer from a file stream.
 */
export function read_int64_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      let v;
      if (bits.bitSize === 64) {
        v = bitArraySliceToInt(bits, 0, 64, true, true);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          595,
          "read_int64_be",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 18657,
            end: 18700,
            pattern_start: 18668,
            pattern_end: 18693
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a little-endian 64-bit unsigned integer from a file stream.
 */
export function read_uint64_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      let v;
      if (bits.bitSize === 64) {
        v = bitArraySliceToInt(bits, 0, 64, false, false);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          604,
          "read_uint64_le",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 18915,
            end: 18963,
            pattern_start: 18926,
            pattern_end: 18956
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a big-endian 64-bit unsigned integer from a file stream.
 */
export function read_uint64_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      let v;
      if (bits.bitSize === 64) {
        v = bitArraySliceToInt(bits, 0, 64, true, false);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          613,
          "read_uint64_be",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 19175,
            end: 19220,
            pattern_start: 19186,
            pattern_end: 19213
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a little-endian 32-bit float from a file stream.
 */
export function read_float32_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      let v;
      if (
        bits.bitSize === 32 &&
        Number.isFinite(bitArraySliceToFloat(bits, 0, 32, false))
      ) {
        v = bitArraySliceToFloat(bits, 0, 32, false);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          622,
          "read_float32_le",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 19427,
            end: 19472,
            pattern_start: 19438,
            pattern_end: 19465
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a big-endian 32-bit float from a file stream.
 */
export function read_float32_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      let v;
      if (
        bits.bitSize === 32 &&
        Number.isFinite(bitArraySliceToFloat(bits, 0, 32, true))
      ) {
        v = bitArraySliceToFloat(bits, 0, 32, true);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          631,
          "read_float32_be",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 19676,
            end: 19718,
            pattern_start: 19687,
            pattern_end: 19711
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a little-endian 64-bit float from a file stream.
 */
export function read_float64_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      let v;
      if (
        bits.bitSize === 64 &&
        Number.isFinite(bitArraySliceToFloat(bits, 0, 64, false))
      ) {
        v = bitArraySliceToFloat(bits, 0, 64, false);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          640,
          "read_float64_le",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 19925,
            end: 19970,
            pattern_start: 19936,
            pattern_end: 19963
          }
        )
      }
      return v;
    },
  );
}

/**
 * Reads a big-endian 64-bit float from a file stream.
 */
export function read_float64_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      let v;
      if (
        bits.bitSize === 64 &&
        Number.isFinite(bitArraySliceToFloat(bits, 0, 64, true))
      ) {
        v = bitArraySliceToFloat(bits, 0, 64, true);
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "file_streams/file_stream",
          649,
          "read_float64_be",
          "Pattern match failed, no pattern matched the value.",
          {
            value: bits,
            start: 20174,
            end: 20216,
            pattern_start: 20185,
            pattern_end: 20209
          }
        )
      }
      return v;
    },
  );
}

function do_read_list(loop$stream, loop$item_read_fn, loop$item_count, loop$acc) {
  while (true) {
    let stream = loop$stream;
    let item_read_fn = loop$item_read_fn;
    let item_count = loop$item_count;
    let acc = loop$acc;
    if (item_count === 0) {
      return new Ok(acc);
    } else {
      let $ = item_read_fn(stream);
      if ($ instanceof Ok) {
        let item = $[0];
        loop$stream = stream;
        loop$item_read_fn = item_read_fn;
        loop$item_count = item_count - 1;
        loop$acc = listPrepend(item, acc);
      } else {
        return $;
      }
    }
  }
}

/**
 * Reads the specified type the requested number of times from a file stream,
 * e.g. two little-endian 32-bit integers, or four big-endian 64-bit floats,
 * and returns the values in a list.
 *
 * ## Examples
 *
 * ```gleam
 * read_list(stream, read_int32_le, 2)
 * |> Ok([1, 2])
 *
 * read_list(stream, read_float64_be, 4)
 * |> Ok([1.0, 2.0])
 * ```
 */
export function read_list(stream, item_read_fn, item_count) {
  let _pipe = do_read_list(stream, item_read_fn, item_count, toList([]));
  return $result.map(_pipe, $list.reverse);
}

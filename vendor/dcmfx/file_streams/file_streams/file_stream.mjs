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
  remainderInt,
  isEqual,
} from "../gleam.mjs";

class FileStream extends $CustomType {
  constructor(io_device, encoding) {
    super();
    this.io_device = io_device;
    this.encoding = encoding;
  }
}

export class BeginningOfFile extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

export class CurrentLocation extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

export class EndOfFile extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

export function open(filename, modes) {
  let is_raw = (() => {
    let _pipe = modes;
    return $list.contains(_pipe, new $file_open_mode.Raw());
  })();
  let encoding = (() => {
    let _pipe = modes;
    let _pipe$1 = $list.find_map(
      _pipe,
      (m) => {
        if (m instanceof $file_open_mode.Encoding) {
          let e = m.encoding;
          return new Ok(e);
        } else {
          return new Error(undefined);
        }
      },
    );
    return $option.from_result(_pipe$1);
  })();
  let encoding$1 = (() => {
    if (is_raw && encoding instanceof Some) {
      return new Error(new $file_stream_error.Enotsup());
    } else if (is_raw && encoding instanceof None) {
      return new Ok(new None());
    } else {
      return new Ok(
        (() => {
          let _pipe = encoding;
          return $option.or(_pipe, new Some(new $text_encoding.Latin1()));
        })(),
      );
    }
  })();
  return $result.try$(
    encoding$1,
    (encoding) => {
      let mode = (() => {
        let $ = (() => {
          let _pipe = modes;
          return $list.contains(_pipe, new $file_open_mode.Binary());
        })();
        if ($) {
          return modes;
        } else {
          return listPrepend(new $file_open_mode.Binary(), modes);
        }
      })();
      return $result.try$(
        do_open(filename, mode),
        (io_device) => { return new Ok(new FileStream(io_device, encoding)); },
      );
    },
  );
}

export function open_read(filename) {
  let modes = toList([
    new $file_open_mode.Read(),
    new $file_open_mode.ReadAhead(64 * 1024),
    new $file_open_mode.Raw(),
  ]);
  return open(filename, modes);
}

export function open_read_text(filename, encoding) {
  let modes = toList([
    new $file_open_mode.Read(),
    new $file_open_mode.ReadAhead(64 * 1024),
    new $file_open_mode.Encoding(encoding),
  ]);
  return open(filename, modes);
}

export function open_write(filename) {
  let modes = toList([
    new $file_open_mode.Write(),
    new $file_open_mode.DelayedWrite(64 * 1024, 2000),
    new $file_open_mode.Raw(),
  ]);
  return open(filename, modes);
}

export function open_write_text(filename, encoding) {
  let modes = toList([
    new $file_open_mode.Write(),
    new $file_open_mode.DelayedWrite(64 * 1024, 2000),
    new $file_open_mode.Encoding(encoding),
  ]);
  return open(filename, modes);
}

export function close(stream) {
  let $ = file_close(stream.io_device);
  if ($ instanceof $raw_result.Ok) {
    return new Ok(undefined);
  } else {
    let e = $.error;
    return new Error(e);
  }
}

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
        return new Ok(
          (() => {
            let _record = stream;
            return new FileStream(_record.io_device, new Some(encoding));
          })(),
        );
      } else {
        let e = $.error;
        return new Error(e);
      }
    },
  );
}

export function position(stream, location) {
  let location$1 = (() => {
    if (location instanceof BeginningOfFile) {
      let offset = location.offset;
      return new $raw_location.Bof(offset);
    } else if (location instanceof CurrentLocation) {
      let offset = location.offset;
      return new $raw_location.Cur(offset);
    } else {
      let offset = location.offset;
      return new $raw_location.Eof(offset);
    }
  })();
  return file_position(stream.io_device, location$1);
}

export function write_bytes(stream, bytes) {
  return $bool.guard(
    (!isEqual(stream.encoding, new None())) && (!isEqual(
      stream.encoding,
      new Some(new Latin1())
    )),
    new Error(new $file_stream_error.Enotsup()),
    () => {
      return $bool.guard(
        (remainderInt($bit_array.bit_size(bytes), 8)) !== 0,
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

export function write_chars(stream, chars) {
  let $ = stream.encoding;
  if ($ instanceof None) {
    let _pipe = chars;
    let _pipe$1 = $bit_array.from_string(_pipe);
    return ((_capture) => { return write_bytes(stream, _capture); })(_pipe$1);
  } else {
    return io_put_chars(stream.io_device, chars);
  }
}

export function sync(stream) {
  let $ = file_sync(stream.io_device);
  if ($ instanceof $raw_result.Ok) {
    return new Ok(undefined);
  } else {
    let e = $.error;
    return new Error(e);
  }
}

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

export function read_bytes_exact(stream, byte_count) {
  let $ = read_bytes(stream, byte_count);
  if ($.isOk()) {
    let bytes = $[0];
    let $1 = $bit_array.byte_size(bytes) === byte_count;
    if ($1) {
      return new Ok(bytes);
    } else {
      return new Error(new $file_stream_error.Eof());
    }
  } else {
    let error = $;
    return error;
  }
}

function do_read_remaining_bytes(loop$stream, loop$acc) {
  while (true) {
    let stream = loop$stream;
    let acc = loop$acc;
    let $ = read_bytes(stream, 64 * 1024);
    if ($.isOk()) {
      let bytes = $[0];
      loop$stream = stream;
      loop$acc = listPrepend(bytes, acc);
    } else if (!$.isOk() && $[0] instanceof $file_stream_error.Eof) {
      let _pipe = acc;
      let _pipe$1 = $list.reverse(_pipe);
      let _pipe$2 = $bit_array.concat(_pipe$1);
      return new Ok(_pipe$2);
    } else {
      let e = $[0];
      return new Error(e);
    }
  }
}

export function read_remaining_bytes(stream) {
  return do_read_remaining_bytes(stream, toList([]));
}

export function read_line(stream) {
  let $ = stream.encoding;
  if ($ instanceof None) {
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
  } else {
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
  }
}

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

export function read_int8(stream) {
  return $result.map(
    read_bytes_exact(stream, 1),
    (bits) => {
      if (!(bits.length == 1)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          496,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.intFromSlice(0, 1, true, true);
      return v;
    },
  );
}

export function read_uint8(stream) {
  return $result.map(
    read_bytes_exact(stream, 1),
    (bits) => {
      if (!(bits.length == 1)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          505,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.byteAt(0);
      return v;
    },
  );
}

export function read_int16_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 2),
    (bits) => {
      if (!(bits.length == 2)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          514,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.intFromSlice(0, 2, false, true);
      return v;
    },
  );
}

export function read_int16_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 2),
    (bits) => {
      if (!(bits.length == 2)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          523,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.intFromSlice(0, 2, true, true);
      return v;
    },
  );
}

export function read_uint16_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 2),
    (bits) => {
      if (!(bits.length == 2)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          532,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.intFromSlice(0, 2, false, false);
      return v;
    },
  );
}

export function read_uint16_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 2),
    (bits) => {
      if (!(bits.length == 2)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          541,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.intFromSlice(0, 2, true, false);
      return v;
    },
  );
}

export function read_int32_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      if (!(bits.length == 4)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          550,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.intFromSlice(0, 4, false, true);
      return v;
    },
  );
}

export function read_int32_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      if (!(bits.length == 4)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          559,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.intFromSlice(0, 4, true, true);
      return v;
    },
  );
}

export function read_uint32_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      if (!(bits.length == 4)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          568,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.intFromSlice(0, 4, false, false);
      return v;
    },
  );
}

export function read_uint32_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      if (!(bits.length == 4)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          577,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.intFromSlice(0, 4, true, false);
      return v;
    },
  );
}

export function read_int64_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      if (!(bits.length == 8)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          586,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.intFromSlice(0, 8, false, true);
      return v;
    },
  );
}

export function read_int64_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      if (!(bits.length == 8)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          595,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.intFromSlice(0, 8, true, true);
      return v;
    },
  );
}

export function read_uint64_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      if (!(bits.length == 8)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          604,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.intFromSlice(0, 8, false, false);
      return v;
    },
  );
}

export function read_uint64_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      if (!(bits.length == 8)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          613,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.intFromSlice(0, 8, true, false);
      return v;
    },
  );
}

export function read_float32_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      if (!(bits.length == 4)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          622,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.floatFromSlice(0, 4, false);
      return v;
    },
  );
}

export function read_float32_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      if (!(bits.length == 4)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          631,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.floatFromSlice(0, 4, true);
      return v;
    },
  );
}

export function read_float64_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      if (!(bits.length == 8)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          640,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.floatFromSlice(0, 8, false);
      return v;
    },
  );
}

export function read_float64_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      if (!(bits.length == 8)) {
        throw makeError(
          "let_assert",
          "file_streams/file_stream",
          649,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: bits }
        )
      }
      let v = bits.floatFromSlice(0, 8, true);
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
      if ($.isOk()) {
        let item = $[0];
        loop$stream = stream;
        loop$item_read_fn = item_read_fn;
        loop$item_count = item_count - 1;
        loop$acc = listPrepend(item, acc);
      } else {
        let e = $[0];
        return new Error(e);
      }
    }
  }
}

export function read_list(stream, item_read_fn, item_count) {
  let _pipe = do_read_list(stream, item_read_fn, item_count, toList([]));
  return $result.map(_pipe, $list.reverse);
}

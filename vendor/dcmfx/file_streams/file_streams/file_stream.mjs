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
  if ($ instanceof Some) {
    return io_put_chars(stream.io_device, chars);
  } else {
    let _pipe = chars;
    let _pipe$1 = $bit_array.from_string(_pipe);
    return ((_capture) => { return write_bytes(stream, _capture); })(_pipe$1);
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
  if ($ instanceof Ok) {
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
        let e = $1;
        return new Error(e);
      }
    }
  }
}

export function read_remaining_bytes(stream) {
  return do_read_remaining_bytes(stream, toList([]));
}

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
      if (bits.bitSize !== 8) {
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
      let v = bitArraySliceToInt(bits, 0, 8, true, true);
      return v;
    },
  );
}

export function read_uint8(stream) {
  return $result.map(
    read_bytes_exact(stream, 1),
    (bits) => {
      if (bits.bitSize !== 8) {
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
      let v = bits.byteAt(0);
      return v;
    },
  );
}

export function read_int16_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 2),
    (bits) => {
      if (bits.bitSize !== 16) {
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
      let v = bitArraySliceToInt(bits, 0, 16, false, true);
      return v;
    },
  );
}

export function read_int16_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 2),
    (bits) => {
      if (bits.bitSize !== 16) {
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
      let v = bitArraySliceToInt(bits, 0, 16, true, true);
      return v;
    },
  );
}

export function read_uint16_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 2),
    (bits) => {
      if (bits.bitSize !== 16) {
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
      let v = bitArraySliceToInt(bits, 0, 16, false, false);
      return v;
    },
  );
}

export function read_uint16_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 2),
    (bits) => {
      if (bits.bitSize !== 16) {
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
      let v = bitArraySliceToInt(bits, 0, 16, true, false);
      return v;
    },
  );
}

export function read_int32_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      if (bits.bitSize !== 32) {
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
      let v = bitArraySliceToInt(bits, 0, 32, false, true);
      return v;
    },
  );
}

export function read_int32_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      if (bits.bitSize !== 32) {
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
      let v = bitArraySliceToInt(bits, 0, 32, true, true);
      return v;
    },
  );
}

export function read_uint32_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      if (bits.bitSize !== 32) {
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
      let v = bitArraySliceToInt(bits, 0, 32, false, false);
      return v;
    },
  );
}

export function read_uint32_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      if (bits.bitSize !== 32) {
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
      let v = bitArraySliceToInt(bits, 0, 32, true, false);
      return v;
    },
  );
}

export function read_int64_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      if (bits.bitSize !== 64) {
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
      let v = bitArraySliceToInt(bits, 0, 64, false, true);
      return v;
    },
  );
}

export function read_int64_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      if (bits.bitSize !== 64) {
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
      let v = bitArraySliceToInt(bits, 0, 64, true, true);
      return v;
    },
  );
}

export function read_uint64_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      if (bits.bitSize !== 64) {
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
      let v = bitArraySliceToInt(bits, 0, 64, false, false);
      return v;
    },
  );
}

export function read_uint64_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      if (bits.bitSize !== 64) {
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
      let v = bitArraySliceToInt(bits, 0, 64, true, false);
      return v;
    },
  );
}

export function read_float32_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      if (
        bits.bitSize !== 32 ||
        !Number.isFinite(bitArraySliceToFloat(bits, 0, 32, false))
      ) {
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
      let v = bitArraySliceToFloat(bits, 0, 32, false);
      return v;
    },
  );
}

export function read_float32_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 4),
    (bits) => {
      if (
        bits.bitSize !== 32 ||
        !Number.isFinite(bitArraySliceToFloat(bits, 0, 32, true))
      ) {
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
      let v = bitArraySliceToFloat(bits, 0, 32, true);
      return v;
    },
  );
}

export function read_float64_le(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      if (
        bits.bitSize !== 64 ||
        !Number.isFinite(bitArraySliceToFloat(bits, 0, 64, false))
      ) {
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
      let v = bitArraySliceToFloat(bits, 0, 64, false);
      return v;
    },
  );
}

export function read_float64_be(stream) {
  return $result.map(
    read_bytes_exact(stream, 8),
    (bits) => {
      if (
        bits.bitSize !== 64 ||
        !Number.isFinite(bitArraySliceToFloat(bits, 0, 64, true))
      ) {
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
      let v = bitArraySliceToFloat(bits, 0, 64, true);
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

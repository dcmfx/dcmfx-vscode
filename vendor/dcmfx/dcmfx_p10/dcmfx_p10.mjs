/// <reference types="./dcmfx_p10.d.mts" />
import * as $data_set from "../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $data_set_path from "../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $file_stream from "../file_streams/file_streams/file_stream.mjs";
import * as $file_stream_error from "../file_streams/file_streams/file_stream_error.mjs";
import * as $bit_array from "../gleam_stdlib/gleam/bit_array.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $data_set_builder from "./dcmfx_p10/data_set_builder.mjs";
import * as $p10_error from "./dcmfx_p10/p10_error.mjs";
import * as $p10_read from "./dcmfx_p10/p10_read.mjs";
import * as $p10_token from "./dcmfx_p10/p10_token.mjs";
import * as $p10_write from "./dcmfx_p10/p10_write.mjs";
import {
  Ok,
  Error,
  toList,
  prepend as listPrepend,
  makeError,
  toBitArray,
  bitArraySlice,
} from "./gleam.mjs";

export function is_valid_bytes(bytes) {
  if (bytes.byteAt(128) === 68 &&
  bytes.byteAt(129) === 73 &&
  bytes.byteAt(130) === 67 &&
  bytes.byteAt(131) === 77 &&
  bytes.byteAt(132) === 2 &&
  bytes.byteAt(133) === 0 &&
  bytes.byteAt(134) === 0 &&
  bytes.byteAt(135) === 0 &&
  bytes.byteAt(136) === 85 &&
  bytes.byteAt(137) === 76 &&
  (bytes.bitSize >= 1104 && (bytes.bitSize - 1104) % 8 === 0)) {
    return true;
  } else {
    return false;
  }
}

export function is_valid_file(filename) {
  let _pipe = filename;
  let _pipe$1 = $file_stream.open_read(_pipe);
  let _pipe$2 = $result.map(
    _pipe$1,
    (stream) => {
      let bytes = $file_stream.read_bytes_exact(stream, 138);
      let $ = $file_stream.close(stream);
      
      if (bytes.isOk()) {
        let bytes$1 = bytes[0];
        return is_valid_bytes(bytes$1);
      } else {
        return false;
      }
    },
  );
  return $result.unwrap(_pipe$2, false);
}

export function read_tokens_from_stream(loop$stream, loop$context) {
  while (true) {
    let stream = loop$stream;
    let context = loop$context;
    let $ = $p10_read.read_tokens(context);
    if ($.isOk() && $[0][0].hasLength(0)) {
      let context$1 = $[0][1];
      loop$stream = stream;
      loop$context = context$1;
    } else if ($.isOk()) {
      let tokens = $[0][0];
      let context$1 = $[0][1];
      return new Ok([tokens, context$1]);
    } else if (!$.isOk() && $[0] instanceof $p10_error.DataRequired) {
      let $1 = $file_stream.read_bytes(stream, 64 * 1024);
      if ($1.isOk()) {
        let data = $1[0];
        let $2 = $p10_read.write_bytes(context, data, false);
        if ($2.isOk()) {
          let context$1 = $2[0];
          loop$stream = stream;
          loop$context = context$1;
        } else {
          let e = $2[0];
          return new Error(e);
        }
      } else if (!$1.isOk() && $1[0] instanceof $file_stream_error.Eof) {
        let $2 = $p10_read.write_bytes(context, toBitArray([]), true);
        if ($2.isOk()) {
          let context$1 = $2[0];
          loop$stream = stream;
          loop$context = context$1;
        } else {
          let e = $2[0];
          return new Error(e);
        }
      } else {
        let e = $1[0];
        return new Error(
          new $p10_error.FileStreamError("Reading from file stream", e),
        );
      }
    } else {
      let e = $[0];
      return new Error(e);
    }
  }
}

function do_read_stream(loop$stream, loop$context, loop$builder) {
  while (true) {
    let stream = loop$stream;
    let context = loop$context;
    let builder = loop$builder;
    let _block;
    let _pipe = read_tokens_from_stream(stream, context);
    _block = $result.map_error(_pipe, (e) => { return [e, builder]; });
    let tokens_and_context = _block;
    if (tokens_and_context.isOk()) {
      let tokens = tokens_and_context[0][0];
      let context$1 = tokens_and_context[0][1];
      let _block$1;
      let _pipe$1 = tokens;
      _block$1 = $list.try_fold(
        _pipe$1,
        builder,
        (builder, token) => {
          let _pipe$2 = $data_set_builder.add_token(builder, token);
          return $result.map_error(_pipe$2, (e) => { return [e, builder]; });
        },
      );
      let builder$1 = _block$1;
      if (builder$1.isOk()) {
        let builder$2 = builder$1[0];
        let $ = $data_set_builder.final_data_set(builder$2);
        if ($.isOk()) {
          let final_data_set = $[0];
          return new Ok(final_data_set);
        } else {
          loop$stream = stream;
          loop$context = context$1;
          loop$builder = builder$2;
        }
      } else {
        let e = builder$1[0];
        return new Error(e);
      }
    } else {
      let e = tokens_and_context[0];
      return new Error(e);
    }
  }
}

export function read_stream(stream) {
  let context = $p10_read.new_read_context();
  let builder = $data_set_builder.new$();
  return do_read_stream(stream, context, builder);
}

export function read_file_returning_builder_on_error(filename) {
  let _pipe = filename;
  let _pipe$1 = $file_stream.open_read(_pipe);
  let _pipe$2 = $result.map_error(
    _pipe$1,
    (e) => {
      return [
        new $p10_error.FileStreamError("Opening file", e),
        $data_set_builder.new$(),
      ];
    },
  );
  return $result.then$(_pipe$2, read_stream);
}

export function read_file(filename) {
  let _pipe = filename;
  let _pipe$1 = read_file_returning_builder_on_error(_pipe);
  return $result.map_error(_pipe$1, (e) => { return e[0]; });
}

function do_read_bytes(loop$context, loop$builder) {
  while (true) {
    let context = loop$context;
    let builder = loop$builder;
    let $ = $p10_read.read_tokens(context);
    if ($.isOk()) {
      let tokens = $[0][0];
      let context$1 = $[0][1];
      let _block;
      let _pipe = tokens;
      _block = $list.try_fold(
        _pipe,
        builder,
        (builder, token) => {
          return $data_set_builder.add_token(builder, token);
        },
      );
      let new_builder = _block;
      if (new_builder.isOk()) {
        let builder$1 = new_builder[0];
        let $1 = $data_set_builder.final_data_set(builder$1);
        if ($1.isOk()) {
          let final_data_set = $1[0];
          return new Ok(final_data_set);
        } else {
          loop$context = context$1;
          loop$builder = builder$1;
        }
      } else {
        let e = new_builder[0];
        return new Error([e, builder]);
      }
    } else {
      let e = $[0];
      return new Error([e, builder]);
    }
  }
}

export function read_bytes(bytes) {
  let _block;
  let _pipe = $p10_read.new_read_context();
  _block = $p10_read.write_bytes(_pipe, bytes, true);
  let $ = _block;
  if (!$.isOk()) {
    throw makeError(
      "let_assert",
      "dcmfx_p10",
      165,
      "read_bytes",
      "Pattern match failed, no pattern matched the value.",
      { value: $ }
    )
  }
  let context = $[0];
  let builder = $data_set_builder.new$();
  return do_read_bytes(context, builder);
}

export function write_stream(stream, data_set, config) {
  let bytes_callback = (_, p10_bytes) => {
    let _pipe = stream;
    let _pipe$1 = $file_stream.write_bytes(_pipe, p10_bytes);
    return $result.map_error(
      _pipe$1,
      (e) => {
        return new $p10_error.FileStreamError(
          "Writing DICOM P10 data to stream",
          e,
        );
      },
    );
  };
  let config$1 = $option.lazy_unwrap(config, $p10_write.default_config);
  return $p10_write.data_set_to_bytes(
    data_set,
    $data_set_path.new$(),
    undefined,
    bytes_callback,
    config$1,
  );
}

export function write_file(filename, data_set, config) {
  let _block;
  let _pipe = filename;
  let _pipe$1 = $file_stream.open_write(_pipe);
  _block = $result.map_error(
    _pipe$1,
    (e) => { return new $p10_error.FileStreamError("Creating write stream", e); },
  );
  let stream = _block;
  return $result.try$(
    stream,
    (stream) => {
      let write_result = write_stream(stream, data_set, config);
      let $ = $file_stream.close(stream);
      
      return write_result;
    },
  );
}

export function write_bytes(data_set, config) {
  let config$1 = $option.lazy_unwrap(config, $p10_write.default_config);
  let _pipe = $p10_write.data_set_to_bytes(
    data_set,
    $data_set_path.new$(),
    toList([]),
    (chunks, bytes) => { return new Ok(listPrepend(bytes, chunks)); },
    config$1,
  );
  return $result.map(
    _pipe,
    (chunks) => {
      let _pipe$1 = chunks;
      let _pipe$2 = $list.reverse(_pipe$1);
      return $bit_array.concat(_pipe$2);
    },
  );
}

export function write_tokens_to_stream(tokens, stream, context) {
  return $result.try$(
    $list.try_fold(
      tokens,
      context,
      (context, token) => { return $p10_write.write_token(context, token); },
    ),
    (context) => {
      let $ = $p10_write.read_bytes(context);
      let p10_bytes = $[0];
      let context$1 = $[1];
      return $result.try$(
        $list.try_fold(
          p10_bytes,
          undefined,
          (_, bytes) => {
            let _pipe = $file_stream.write_bytes(stream, bytes);
            return $result.map_error(
              _pipe,
              (e) => {
                return new $p10_error.FileStreamError("Writing to stdout", e);
              },
            );
          },
        ),
        (_) => {
          let $1 = $list.last(tokens);
          if ($1.isOk() && $1[0] instanceof $p10_token.End) {
            let _pipe = $file_stream.sync(stream);
            let _pipe$1 = $result.map_error(
              _pipe,
              (e) => {
                return new $p10_error.FileStreamError("Writing to stdout", e);
              },
            );
            return $result.replace(_pipe$1, [true, context$1]);
          } else {
            return new Ok([false, context$1]);
          }
        },
      );
    },
  );
}

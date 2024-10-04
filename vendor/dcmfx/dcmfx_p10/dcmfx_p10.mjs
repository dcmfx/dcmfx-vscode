/// <reference types="./dcmfx_p10.d.mts" />
import * as $data_set from "../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $bit_array from "../gleam_stdlib/gleam/bit_array.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $simplifile from "../simplifile/simplifile.mjs";
import * as $data_set_builder from "./dcmfx_p10/data_set_builder.mjs";
import * as $p10_error from "./dcmfx_p10/p10_error.mjs";
import * as $p10_read from "./dcmfx_p10/p10_read.mjs";
import * as $p10_write from "./dcmfx_p10/p10_write.mjs";
import { Ok, Error, toList, prepend as listPrepend, makeError, toBitArray } from "./gleam.mjs";

export function is_valid_bytes(bytes) {
  if (bytes.byteAt(128) === 0x44 &&
  bytes.byteAt(129) === 0x49 &&
  bytes.byteAt(130) === 0x43 &&
  bytes.byteAt(131) === 0x4D &&
  bytes.intFromSlice(132, 134, false, false) === 2 &&
  bytes.intFromSlice(134, 136, false, false) === 0 &&
  bytes.byteAt(136) === 0x55 &&
  bytes.byteAt(137) === 0x4C &&
  bytes.length >= 138) {
    return true;
  } else {
    return false;
  }
}

export function is_valid_file(filename) {
  let $ = $simplifile.read_bits(filename);
  if ($.isOk()) {
    let bytes = $[0];
    return is_valid_bytes(bytes);
  } else {
    return false;
  }
}

function do_read_bytes(loop$context, loop$builder) {
  while (true) {
    let context = loop$context;
    let builder = loop$builder;
    let $ = $p10_read.read_parts(context);
    if ($.isOk()) {
      let parts = $[0][0];
      let context$1 = $[0][1];
      let new_builder = (() => {
        let _pipe = parts;
        return $list.try_fold(
          _pipe,
          builder,
          (builder, part) => {
            return $data_set_builder.add_part(builder, part);
          },
        );
      })();
      if (new_builder.isOk()) {
        let builder$1 = new_builder[0];
        let $1 = $data_set_builder.is_complete(builder$1);
        if ($1) {
          let $2 = $data_set_builder.final_data_set(builder$1);
          if (!$2.isOk()) {
            throw makeError(
              "let_assert",
              "dcmfx_p10",
              217,
              "do_read_bytes",
              "Pattern match failed, no pattern matched the value.",
              { value: $2 }
            )
          }
          let data_set = $2[0];
          return new Ok(data_set);
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
  let $ = (() => {
    let _pipe = $p10_read.new_read_context();
    return $p10_read.write_bytes(_pipe, bytes, true);
  })();
  if (!$.isOk()) {
    throw makeError(
      "let_assert",
      "dcmfx_p10",
      188,
      "read_bytes",
      "Pattern match failed, no pattern matched the value.",
      { value: $ }
    )
  }
  let context = $[0];
  let builder = $data_set_builder.new$();
  return do_read_bytes(context, builder);
}

export function read_file_returning_builder_on_error(filename) {
  let $ = $simplifile.read_bits(filename);
  if ($.isOk()) {
    let bytes = $[0];
    return read_bytes(bytes);
  } else {
    let e = $[0];
    return new Error(
      [new $p10_error.FileError("Reading file", e), $data_set_builder.new$()],
    );
  }
}

export function read_file(filename) {
  let _pipe = filename;
  let _pipe$1 = read_file_returning_builder_on_error(_pipe);
  return $result.map_error(_pipe$1, (e) => { return e[0]; });
}

export function write_file(filename, data_set, config) {
  let initial_write_result = (() => {
    let $ = $simplifile.write_bits(filename, toBitArray([]));
    if ($.isOk() && !$[0]) {
      return new Ok(undefined);
    } else {
      let e = $[0];
      return new Error(new $p10_error.FileError("Writing file", e));
    }
  })();
  return $result.try$(
    initial_write_result,
    (_) => {
      let bytes_callback = (_, p10_bytes) => {
        let $ = $simplifile.append_bits(filename, p10_bytes);
        if ($.isOk() && !$[0]) {
          return new Ok(undefined);
        } else {
          let e = $[0];
          return new Error(new $p10_error.FileError("Writing file", e));
        }
      };
      let config$1 = $option.lazy_unwrap(config, $p10_write.default_config);
      return $p10_write.data_set_to_bytes(
        data_set,
        undefined,
        bytes_callback,
        config$1,
      );
    },
  );
}

export function write_bytes(data_set, config) {
  let config$1 = $option.lazy_unwrap(config, $p10_write.default_config);
  let _pipe = $p10_write.data_set_to_bytes(
    data_set,
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

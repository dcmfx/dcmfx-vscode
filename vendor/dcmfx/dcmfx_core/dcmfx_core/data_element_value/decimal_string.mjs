/// <reference types="./decimal_string.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $float from "../../../gleam_stdlib/gleam/float.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $data_error from "../../dcmfx_core/data_error.mjs";
import * as $bit_array_utils from "../../dcmfx_core/internal/bit_array_utils.mjs";
import * as $utils from "../../dcmfx_core/internal/utils.mjs";
import { float_to_shortest_string } from "./decimal_string_ffi.mjs";

export function from_bytes(bytes) {
  let decimal_string = (() => {
    let _pipe = bytes;
    let _pipe$1 = $bit_array.to_string(_pipe);
    return $result.replace_error(
      _pipe$1,
      $data_error.new_value_invalid("DecimalString is invalid UTF-8"),
    );
  })();
  return $result.try$(
    decimal_string,
    (decimal_string) => {
      let decimal_string$1 = $utils.trim_ascii(decimal_string, 0x0);
      let _pipe = decimal_string$1;
      let _pipe$1 = $string.split(_pipe, "\\");
      let _pipe$2 = $list.map(_pipe$1, $string.trim);
      let _pipe$3 = $list.filter(
        _pipe$2,
        (s) => { return !$string.is_empty(s); },
      );
      let _pipe$4 = $list.map(_pipe$3, $utils.smart_parse_float);
      let _pipe$5 = $result.all(_pipe$4);
      return $result.map_error(
        _pipe$5,
        (_) => {
          return $data_error.new_value_invalid(
            ("DecimalString is invalid: '" + decimal_string$1) + "'",
          );
        },
      );
    },
  );
}

export function to_bytes(values) {
  let values$1 = $list.map(
    values,
    (f) => {
      let value = float_to_shortest_string(f);
      let $ = $string.contains(value, "e");
      if ($) {
        return value;
      } else {
        let _pipe = value;
        let _pipe$1 = $utils.trim_ascii_end(_pipe, 0x30);
        let _pipe$2 = $utils.trim_ascii_end(_pipe$1, 0x2E);
        return $string.slice(_pipe$2, 0, 16);
      }
    },
  );
  let _pipe = values$1;
  let _pipe$1 = $string.join(_pipe, "\\");
  let _pipe$2 = $bit_array.from_string(_pipe$1);
  return $bit_array_utils.pad_to_even_length(_pipe$2, 0x20);
}

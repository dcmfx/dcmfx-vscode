/// <reference types="./integer_string.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $data_error from "../../dcmfx_core/data_error.mjs";
import * as $bit_array_utils from "../../dcmfx_core/internal/bit_array_utils.mjs";
import * as $utils from "../../dcmfx_core/internal/utils.mjs";
import { Ok, Error } from "../../gleam.mjs";

export function from_bytes(bytes) {
  let _block;
  let _pipe = bytes;
  let _pipe$1 = $bit_array.to_string(_pipe);
  _block = $result.replace_error(
    _pipe$1,
    $data_error.new_value_invalid("IntegerString is invalid UTF-8"),
  );
  let integer_string = _block;
  return $result.try$(
    integer_string,
    (integer_string) => {
      let integer_string$1 = $utils.trim_ascii(integer_string, 0x0);
      let _pipe$2 = integer_string$1;
      let _pipe$3 = $string.split(_pipe$2, "\\");
      let _pipe$4 = $list.map(_pipe$3, $string.trim);
      let _pipe$5 = $list.filter(
        _pipe$4,
        (s) => { return !$string.is_empty(s); },
      );
      let _pipe$6 = $list.map(_pipe$5, $int.parse);
      let _pipe$7 = $result.all(_pipe$6);
      return $result.map_error(
        _pipe$7,
        (_) => {
          return $data_error.new_value_invalid(
            ("IntegerString is invalid: '" + integer_string$1) + "'",
          );
        },
      );
    },
  );
}

export function to_bytes(values) {
  let is_valid = $list.all(
    values,
    (i) => { return (i >= -2_147_483_648) && (i <= 2_147_483_647); },
  );
  return $bool.guard(
    !is_valid,
    new Error(
      $data_error.new_value_invalid("IntegerString value is out of range"),
    ),
    () => {
      let _pipe = values;
      let _pipe$1 = $list.map(_pipe, $int.to_string);
      let _pipe$2 = $string.join(_pipe$1, "\\");
      let _pipe$3 = $bit_array.from_string(_pipe$2);
      let _pipe$4 = $bit_array_utils.pad_to_even_length(_pipe$3, 0x20);
      return new Ok(_pipe$4);
    },
  );
}

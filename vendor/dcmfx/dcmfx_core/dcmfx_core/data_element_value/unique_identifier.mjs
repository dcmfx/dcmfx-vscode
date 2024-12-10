/// <reference types="./unique_identifier.d.mts" />
import * as $regexp from "../../../gleam_regexp/gleam/regexp.mjs";
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $data_error from "../../dcmfx_core/data_error.mjs";
import * as $bit_array_utils from "../../dcmfx_core/internal/bit_array_utils.mjs";
import * as $utils from "../../dcmfx_core/internal/utils.mjs";
import { Ok, Error, toList, makeError } from "../../gleam.mjs";

export function is_valid(uid) {
  let length = $utils.string_fast_length(uid);
  return $bool.guard(
    (length === 0) || (length > 64),
    false,
    () => {
      let $ = $regexp.from_string("^(0|[1-9][0-9]*)(\\.(0|[1-9][0-9]*))*$");
      if (!$.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_core/data_element_value/unique_identifier",
          42,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: $ }
        )
      }
      let re = $[0];
      return $regexp.check(re, uid);
    },
  );
}

export function to_bytes(uids) {
  let _pipe = uids;
  let _pipe$1 = $list.map(
    _pipe,
    (uid) => {
      let $ = is_valid(uid);
      if ($) {
        return new Ok(uid);
      } else {
        return new Error(
          $data_error.new_value_invalid("UniqueIdentifier is invalid"),
        );
      }
    },
  );
  let _pipe$2 = $result.all(_pipe$1);
  let _pipe$3 = $result.map(
    _pipe$2,
    (_capture) => { return $string.join(_capture, "\\"); },
  );
  let _pipe$4 = $result.map(_pipe$3, $bit_array.from_string);
  return $result.map(
    _pipe$4,
    (_capture) => { return $bit_array_utils.pad_to_even_length(_capture, 0x0); },
  );
}

function random_character(offset, range) {
  let $ = $string.utf_codepoint(offset + $int.random(range));
  if (!$.isOk()) {
    throw makeError(
      "let_assert",
      "dcmfx_core/data_element_value/unique_identifier",
      80,
      "random_character",
      "Pattern match failed, no pattern matched the value.",
      { value: $ }
    )
  }
  let cp = $[0];
  return $string.from_utf_codepoints(toList([cp]));
}

function do_new(loop$uid, loop$remaining_digits) {
  while (true) {
    let uid = loop$uid;
    let remaining_digits = loop$remaining_digits;
    if (remaining_digits === 0) {
      return uid;
    } else {
      loop$uid = uid + random_character(48, 10);
      loop$remaining_digits = remaining_digits - 1;
    }
  }
}

export function new$(prefix) {
  let prefix_length = $utils.string_fast_length(prefix);
  return $bool.guard(
    (prefix_length > 60) || ((prefix_length > 0) && !is_valid(prefix)),
    new Error(undefined),
    () => {
      let uid = (() => {
        if (prefix_length === 0) {
          return "";
        } else {
          return prefix + ".";
        }
      })() + random_character(49, 9);
      let _pipe = do_new(uid, 64 - $utils.string_fast_length(uid));
      return new Ok(_pipe);
    },
  );
}

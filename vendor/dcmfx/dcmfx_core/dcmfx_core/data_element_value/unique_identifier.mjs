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

const FILEPATH = "src/dcmfx_core/data_element_value/unique_identifier.gleam";

/**
 * Returns whether the given string is a valid `UniqueIdentifier`. Valid UIDs
 * are 1-64 characters in length, and are made up of sequences of digits
 * separated by the period character. Leading zeros are not permitted in a
 * digit sequence unless the zero is the only digit in the sequence.
 */
export function is_valid(uid) {
  let length = $utils.string_fast_length(uid);
  return $bool.guard(
    (length === 0) || (length > 64),
    false,
    () => {
      let $ = $regexp.from_string("^(0|[1-9][0-9]*)(\\.(0|[1-9][0-9]*))*$");
      let re;
      if ($ instanceof Ok) {
        re = $[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_element_value/unique_identifier",
          42,
          "is_valid",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 1273,
            end: 1357,
            pattern_start: 1284,
            pattern_end: 1290
          }
        )
      }
      return $regexp.check(re, uid);
    },
  );
}

/**
 * Converts a list of UIDs into a `UniqueIdentifier` value.
 */
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
  let cp;
  if ($ instanceof Ok) {
    cp = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "dcmfx_core/data_element_value/unique_identifier",
      80,
      "random_character",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2266,
        end: 2334,
        pattern_start: 2277,
        pattern_end: 2283
      }
    )
  }
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

/**
 * Generates a new random UID with the given prefix. The new UID will have a
 * length of 64 characters. The maximum prefix length is 60, and if specified
 * it must end with a '.' character.
 */
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

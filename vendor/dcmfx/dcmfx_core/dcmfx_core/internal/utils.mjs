/// <reference types="./utils.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $float from "../../../gleam_stdlib/gleam/float.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import {
  utils__string_fast_length as string_fast_length,
  utils__pad_start as pad_start,
} from "../../dcmfx_core_ffi.mjs";
import { Ok, Error, toList, makeError } from "../../gleam.mjs";

export { pad_start, string_fast_length };

function do_trim_end_codepoints(loop$s, loop$length, loop$codepoints) {
  while (true) {
    let s = loop$s;
    let length = loop$length;
    let codepoints = loop$codepoints;
    if (length === 0) {
      return "";
    } else {
      let $ = $bit_array.slice(s, length - 1, 1);
      if (!$.isOk() || !($[0].length == 1)) {
        throw makeError(
          "let_assert",
          "dcmfx_core/internal/utils",
          86,
          "do_trim_end_codepoints",
          "Pattern match failed, no pattern matched the value.",
          { value: $ }
        )
      }
      let x = $[0].byteAt(0);
      let $1 = $list.contains(codepoints, x);
      if ($1) {
        loop$s = s;
        loop$length = length - 1;
        loop$codepoints = codepoints;
      } else {
        let $2 = $bit_array.slice(s, 0, length);
        if (!$2.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/internal/utils",
            91,
            "do_trim_end_codepoints",
            "Pattern match failed, no pattern matched the value.",
            { value: $2 }
          )
        }
        let s$1 = $2[0];
        let $3 = $bit_array.to_string(s$1);
        if (!$3.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/internal/utils",
            92,
            "do_trim_end_codepoints",
            "Pattern match failed, no pattern matched the value.",
            { value: $3 }
          )
        }
        let s$2 = $3[0];
        return s$2;
      }
    }
  }
}

export function trim_end_codepoints(s, codepoints) {
  let s$1 = $bit_array.from_string(s);
  let len = $bit_array.byte_size(s$1);
  return do_trim_end_codepoints(s$1, len, codepoints);
}

export function smart_parse_float(input) {
  let input$1 = trim_end_codepoints(input, toList([0x2E]));
  let _pipe = input$1;
  let _pipe$1 = $float.parse(_pipe);
  return $result.lazy_or(
    _pipe$1,
    () => { return $float.parse(input$1 + ".0"); },
  );
}

export function trim_end(s, chars) {
  let codepoints = (() => {
    let _pipe = chars;
    let _pipe$1 = $string.to_utf_codepoints(_pipe);
    return $list.map(_pipe$1, $string.utf_codepoint_to_int);
  })();
  return trim_end_codepoints(s, codepoints);
}

export function trim_end_whitespace(s) {
  return trim_end_codepoints(s, toList([0x0, 0x9, 0xA, 0xD, 0x20]));
}

function list_drop(loop$list, loop$n) {
  while (true) {
    let list = loop$list;
    let n = loop$n;
    let $ = n <= 0;
    if ($) {
      return list;
    } else {
      if (list.hasLength(0)) {
        return toList([]);
      } else {
        let xs = list.tail;
        loop$list = xs;
        loop$n = n - 1;
      }
    }
  }
}

export function list_at(list, index) {
  let $ = index >= 0;
  if ($) {
    let $1 = list_drop(list, index);
    if ($1.hasLength(0)) {
      return new Error(undefined);
    } else {
      let x = $1.head;
      return new Ok(x);
    }
  } else {
    return new Error(undefined);
  }
}

function do_inspect_bit_array(loop$input, loop$accumulator) {
  while (true) {
    let input = loop$input;
    let accumulator = loop$accumulator;
    if (input.length >= 1) {
      let x = input.byteAt(0);
      let rest = input.sliceAfter(1);
      let suffix = (() => {
        if (rest.length == 0) {
          return "";
        } else {
          return " ";
        }
      })();
      let accumulator$1 = (accumulator + (() => {
        let _pipe = x;
        let _pipe$1 = $int.to_base16(_pipe);
        return pad_start(_pipe$1, 2, "0");
      })()) + suffix;
      loop$input = rest;
      loop$accumulator = accumulator$1;
    } else {
      return accumulator;
    }
  }
}

export function inspect_bit_array(bits) {
  return do_inspect_bit_array(bits, "[") + "]";
}

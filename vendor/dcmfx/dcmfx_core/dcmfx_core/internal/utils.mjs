/// <reference types="./utils.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $float from "../../../gleam_stdlib/gleam/float.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import {
  utils__string_fast_length as string_fast_length,
  utils__pad_start as pad_start,
} from "../../dcmfx_core_ffi.mjs";
import { Ok, Error, toList, makeError } from "../../gleam.mjs";

export { pad_start, string_fast_length };

function do_trim_ascii_start(loop$s, loop$ascii_character) {
  while (true) {
    let s = loop$s;
    let ascii_character = loop$ascii_character;
    if (s.length >= 1) {
      let x = s.byteAt(0);
      let rest = s.sliceAfter(1);
      let $ = x === ascii_character;
      if ($) {
        loop$s = rest;
        loop$ascii_character = ascii_character;
      } else {
        let $1 = $bit_array.to_string(s);
        if (!$1.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/internal/utils",
            69,
            "do_trim_ascii_start",
            "Pattern match failed, no pattern matched the value.",
            { value: $1 }
          )
        }
        let s$1 = $1[0];
        return s$1;
      }
    } else {
      return "";
    }
  }
}

function trim_ascii_start(s, ascii_character) {
  let s$1 = $bit_array.from_string(s);
  return do_trim_ascii_start(s$1, ascii_character);
}

function do_trim_end_codepoints(loop$s, loop$length, loop$ascii_character) {
  while (true) {
    let s = loop$s;
    let length = loop$length;
    let ascii_character = loop$ascii_character;
    if (length === 0) {
      return "";
    } else {
      let $ = $bit_array.slice(s, length - 1, 1);
      if (!$.isOk() || !($[0].length == 1)) {
        throw makeError(
          "let_assert",
          "dcmfx_core/internal/utils",
          97,
          "do_trim_end_codepoints",
          "Pattern match failed, no pattern matched the value.",
          { value: $ }
        )
      }
      let x = $[0].byteAt(0);
      let $1 = x === ascii_character;
      if ($1) {
        loop$s = s;
        loop$length = length - 1;
        loop$ascii_character = ascii_character;
      } else {
        let $2 = $bit_array.slice(s, 0, length);
        if (!$2.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/internal/utils",
            102,
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
            103,
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

export function trim_ascii_end(s, ascii_character) {
  let s$1 = $bit_array.from_string(s);
  let len = $bit_array.byte_size(s$1);
  return do_trim_end_codepoints(s$1, len, ascii_character);
}

export function smart_parse_float(input) {
  let input$1 = trim_ascii_end(input, 0x2E);
  let _pipe = input$1;
  let _pipe$1 = $float.parse(_pipe);
  return $result.lazy_or(
    _pipe$1,
    () => { return $float.parse(input$1 + ".0"); },
  );
}

export function trim_ascii(s, ascii_character) {
  let _pipe = s;
  let _pipe$1 = trim_ascii_start(_pipe, ascii_character);
  return trim_ascii_end(_pipe$1, ascii_character);
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

function do_inspect_bit_array(loop$input, loop$acc) {
  while (true) {
    let input = loop$input;
    let acc = loop$acc;
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
      let acc$1 = (acc + (() => {
        let _pipe = x;
        let _pipe$1 = $int.to_base16(_pipe);
        return pad_start(_pipe$1, 2, "0");
      })()) + suffix;
      loop$input = rest;
      loop$acc = acc$1;
    } else {
      return acc;
    }
  }
}

export function inspect_bit_array(bits, max_length) {
  let byte_count = $int.min(max_length, $bit_array.byte_size(bits));
  let $ = $bit_array.slice(bits, 0, byte_count);
  if (!$.isOk()) {
    throw makeError(
      "let_assert",
      "dcmfx_core/internal/utils",
      145,
      "inspect_bit_array",
      "Pattern match failed, no pattern matched the value.",
      { value: $ }
    )
  }
  let bits$1 = $[0];
  let s = do_inspect_bit_array(bits$1, "[");
  let suffix = (() => {
    let $1 = byte_count === $bit_array.byte_size(bits$1);
    if ($1) {
      return "]";
    } else {
      return " ...]";
    }
  })();
  return s + suffix;
}

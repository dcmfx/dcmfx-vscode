/// <reference types="./lookup_table_16bit.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import { Ok, Error, makeError } from "../../gleam.mjs";

export function decode_next_codepoint(bytes, lookup_table) {
  if (bytes.length >= 1 && (bytes.byteAt(0) <= 0x20)) {
    let byte_0 = bytes.byteAt(0);
    let rest = bytes.sliceAfter(1);
    let $ = $string.utf_codepoint(byte_0);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_character_set/internal/lookup_table_16bit",
        19,
        "decode_next_codepoint",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let codepoint = $[0];
    return new Ok([codepoint, rest]);
  } else if (bytes.length >= 2 &&
  ((((bytes.byteAt(0) >= 0x21) && (bytes.byteAt(0) <= 0x7E)) && (bytes.byteAt(1) >= 0x21)) && (bytes.byteAt(1) <= 0x7E))) {
    let byte_0 = bytes.byteAt(0);
    let byte_1 = bytes.byteAt(1);
    let rest = bytes.sliceAfter(2);
    let index = (byte_0 - 0x21) * 0x5E + (byte_1 - 0x21);
    let $ = $bit_array.slice(lookup_table, index * 2, 2);
    if (!$.isOk() || !($[0].length == 2)) {
      throw makeError(
        "let_assert",
        "dcmfx_character_set/internal/lookup_table_16bit",
        29,
        "decode_next_codepoint",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let codepoint = $[0].intFromSlice(0, 2, true, false);
    let $1 = $string.utf_codepoint(codepoint);
    if (!$1.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_character_set/internal/lookup_table_16bit",
        31,
        "decode_next_codepoint",
        "Pattern match failed, no pattern matched the value.",
        { value: $1 }
      )
    }
    let codepoint$1 = $1[0];
    return new Ok([codepoint$1, rest]);
  } else if (bytes.length >= 1) {
    let rest = bytes.sliceAfter(1);
    let $ = $string.utf_codepoint(0xFFFD);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_character_set/internal/lookup_table_16bit",
        37,
        "decode_next_codepoint",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let codepoint = $[0];
    return new Ok([codepoint, rest]);
  } else {
    return new Error(undefined);
  }
}

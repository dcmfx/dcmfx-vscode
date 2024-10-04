/// <reference types="./lookup_table_8bit.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import { Ok, Error, makeError } from "../../gleam.mjs";

export function decode_next_codepoint(bytes, lookup_table) {
  if (bytes.length >= 1) {
    let byte_0 = bytes.byteAt(0);
    let rest = bytes.sliceAfter(1);
    let index = byte_0 * 2;
    let $ = $bit_array.slice(lookup_table, index, 2);
    if (!$.isOk() || !($[0].length == 2)) {
      throw makeError(
        "let_assert",
        "dcmfx_character_set/internal/lookup_table_8bit",
        18,
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
        "dcmfx_character_set/internal/lookup_table_8bit",
        19,
        "decode_next_codepoint",
        "Pattern match failed, no pattern matched the value.",
        { value: $1 }
      )
    }
    let codepoint$1 = $1[0];
    return new Ok([codepoint$1, rest]);
  } else {
    return new Error(undefined);
  }
}

/// <reference types="./lookup_table_16bit.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $utils from "../../dcmfx_character_set/internal/utils.mjs";
import { Ok, Error, makeError, bitArraySlice, bitArraySliceToInt } from "../../gleam.mjs";

export function decode_next_codepoint(bytes, lookup_table) {
  if ((bytes.bitSize >= 8 && (bytes.bitSize - 8) % 8 === 0) &&
  (bytes.byteAt(0) <= 0x20)) {
    let byte_0 = bytes.byteAt(0);
    let rest = bitArraySlice(bytes, 8);
    let codepoint_value = byte_0;
    return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
  } else if ((bytes.bitSize >= 16 && (bytes.bitSize - 16) % 8 === 0) &&
  ((((bytes.byteAt(0) >= 0x21) && (bytes.byteAt(0) <= 0x7E)) && (bytes.byteAt(1) >= 0x21)) && (bytes.byteAt(1) <= 0x7E))) {
    let byte_0 = bytes.byteAt(0);
    let byte_1 = bytes.byteAt(1);
    let rest = bitArraySlice(bytes, 16);
    let index = (byte_0 - 0x21) * 0x5E + (byte_1 - 0x21);
    let $ = $bit_array.slice(lookup_table, index * 2, 2);
    if (!$.isOk() || !($[0].bitSize == 16)) {
      throw makeError(
        "let_assert",
        "dcmfx_character_set/internal/lookup_table_16bit",
        30,
        "decode_next_codepoint",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let codepoint_value = bitArraySliceToInt($[0], 0, 16, true, false);
    return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
  } else if ((bytes.bitSize >= 8 && (bytes.bitSize - 8) % 8 === 0)) {
    let rest = bitArraySlice(bytes, 8);
    return new Ok([$utils.replacement_character(), rest]);
  } else {
    return new Error(undefined);
  }
}

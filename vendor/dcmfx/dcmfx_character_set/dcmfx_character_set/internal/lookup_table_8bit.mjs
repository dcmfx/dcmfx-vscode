/// <reference types="./lookup_table_8bit.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $utils from "../../dcmfx_character_set/internal/utils.mjs";
import { Ok, Error, makeError, bitArraySlice, bitArraySliceToInt } from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_character_set/internal/lookup_table_8bit.gleam";

export function decode_next_codepoint(bytes, lookup_table) {
  if (bytes.bitSize >= 8) {
    if ((bytes.bitSize - 8) % 8 === 0) {
      let byte_0 = bytes.byteAt(0);
      let rest = bitArraySlice(bytes, 8);
      let index = byte_0 * 2;
      let $ = $bit_array.slice(lookup_table, index, 2);
      if (!($ instanceof Ok) || $[0].bitSize !== 16) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_character_set/internal/lookup_table_8bit",
          18,
          "decode_next_codepoint",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 519,
            end: 606,
            pattern_start: 530,
            pattern_end: 556
          }
        )
      }
      let codepoint_value = bitArraySliceToInt($[0], 0, 16, true, false);
      return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
    } else {
      return new Error(undefined);
    }
  } else {
    return new Error(undefined);
  }
}

/// <reference types="./lookup_table_8bit.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $utils from "../../dcmfx_character_set/internal/utils.mjs";
import { Ok, Error, makeError, bitArraySlice, bitArraySliceToInt } from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_character_set/internal/lookup_table_8bit.gleam";

/**
 * Decodes the next codepoint from the given bytes using an 8-bit lookup table.
 * The lookup table must have exactly 256 16-bit codepoint values.
 *
 * This is used for all of the ISO 8859 encodings, as well as the JIS X 0201
 * encoding.
 */
export function decode_next_codepoint(bytes, lookup_table) {
  if (bytes.bitSize >= 8 && (bytes.bitSize - 8) % 8 === 0) {
    let byte_0 = bytes.byteAt(0);
    let rest = bitArraySlice(bytes, 8);
    let index = byte_0 * 2;
    let $ = $bit_array.slice(lookup_table, index, 2);
    let codepoint_value;
    if ($ instanceof Ok) {
      let $1 = $[0];
      if ($1.bitSize === 16) {
        codepoint_value = bitArraySliceToInt($1, 0, 16, true, false);
      } else {
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
    } else {
      throw makeError(
        "let_assert",
        FILEPATH,
        "dcmfx_character_set/internal/lookup_table_8bit",
        18,
        "decode_next_codepoint",
        "Pattern match failed, no pattern matched the value.",
        { value: $, start: 519, end: 606, pattern_start: 530, pattern_end: 556 }
      )
    }
    return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
  } else {
    return new Error(undefined);
  }
}

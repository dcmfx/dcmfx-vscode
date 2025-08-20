/// <reference types="./lookup_table_16bit.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $utils from "../../dcmfx_character_set/internal/utils.mjs";
import { Ok, Error, makeError, bitArraySlice, bitArraySliceToInt } from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_character_set/internal/lookup_table_16bit.gleam";

/**
 * Decodes the next codepoint from the given bytes using a 16-bit lookup table.
 * The lookup table must have exactly 8,836 (94 * 94) 16-bit codepoint values.
 *
 * Input bytes <= 0x20 are passed through unchanged. Input bytes 0x21 - 0x7E
 * with a following byte in this same range are mapped to codepoints using the
 * lookup table.
 *
 * This is used for the JIS X 0208 and JIS X 0212 encodings.
 */
export function decode_next_codepoint(bytes, lookup_table) {
  if (bytes.bitSize >= 8) {
    if ((bytes.bitSize - 8) % 8 === 0) {
      let byte_0 = bytes.byteAt(0);
      if (byte_0 <= 0x20) {
        let rest = bitArraySlice(bytes, 8);
        let codepoint_value = byte_0;
        return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
      } else if (bytes.bitSize >= 16 && (bytes.bitSize - 16) % 8 === 0) {
        let byte_0$1 = bytes.byteAt(0);
        let byte_1 = bytes.byteAt(1);
        if (
          (((byte_0$1 >= 0x21) && (byte_0$1 <= 0x7E)) && (byte_1 >= 0x21)) && (byte_1 <= 0x7E)
        ) {
          let rest = bitArraySlice(bytes, 16);
          let index = (byte_0$1 - 0x21) * 0x5E + (byte_1 - 0x21);
          let $ = $bit_array.slice(lookup_table, index * 2, 2);
          let codepoint_value;
          if ($ instanceof Ok) {
            let $1 = $[0];
            if ($1.bitSize === 16) {
              codepoint_value = bitArraySliceToInt($1, 0, 16, true, false);
            } else {
              throw makeError(
                "let_assert",
                FILEPATH,
                "dcmfx_character_set/internal/lookup_table_16bit",
                30,
                "decode_next_codepoint",
                "Pattern match failed, no pattern matched the value.",
                {
                  value: $,
                  start: 995,
                  end: 1086,
                  pattern_start: 1006,
                  pattern_end: 1032
                }
              )
            }
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "dcmfx_character_set/internal/lookup_table_16bit",
              30,
              "decode_next_codepoint",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $,
                start: 995,
                end: 1086,
                pattern_start: 1006,
                pattern_end: 1032
              }
            )
          }
          return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
        } else {
          let rest = bitArraySlice(bytes, 8);
          return new Ok([$utils.replacement_character(), rest]);
        }
      } else {
        let rest = bitArraySlice(bytes, 8);
        return new Ok([$utils.replacement_character(), rest]);
      }
    } else if (bytes.bitSize >= 16 && (bytes.bitSize - 16) % 8 === 0) {
      let byte_0 = bytes.byteAt(0);
      let byte_1 = bytes.byteAt(1);
      if (
        (((byte_0 >= 0x21) && (byte_0 <= 0x7E)) && (byte_1 >= 0x21)) && (byte_1 <= 0x7E)
      ) {
        let rest = bitArraySlice(bytes, 16);
        let index = (byte_0 - 0x21) * 0x5E + (byte_1 - 0x21);
        let $ = $bit_array.slice(lookup_table, index * 2, 2);
        let codepoint_value;
        if ($ instanceof Ok) {
          let $1 = $[0];
          if ($1.bitSize === 16) {
            codepoint_value = bitArraySliceToInt($1, 0, 16, true, false);
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "dcmfx_character_set/internal/lookup_table_16bit",
              30,
              "decode_next_codepoint",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $,
                start: 995,
                end: 1086,
                pattern_start: 1006,
                pattern_end: 1032
              }
            )
          }
        } else {
          throw makeError(
            "let_assert",
            FILEPATH,
            "dcmfx_character_set/internal/lookup_table_16bit",
            30,
            "decode_next_codepoint",
            "Pattern match failed, no pattern matched the value.",
            {
              value: $,
              start: 995,
              end: 1086,
              pattern_start: 1006,
              pattern_end: 1032
            }
          )
        }
        return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
      } else {
        return new Error(undefined);
      }
    } else {
      return new Error(undefined);
    }
  } else {
    return new Error(undefined);
  }
}

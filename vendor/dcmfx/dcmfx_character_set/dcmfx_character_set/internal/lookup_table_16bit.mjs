/// <reference types="./lookup_table_16bit.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $utils from "../../dcmfx_character_set/internal/utils.mjs";
import { Ok, Error, makeError, bitArraySlice, bitArraySliceToInt } from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_character_set/internal/lookup_table_16bit.gleam";

export function decode_next_codepoint(bytes, lookup_table) {
  if (bytes.bitSize >= 8) {
    if ((bytes.bitSize - 8) % 8 === 0) {
      let byte_0 = bytes.byteAt(0);
      if (byte_0 <= 0x20) {
        let rest = bitArraySlice(bytes, 8);
        let codepoint_value = byte_0;
        return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
      } else {
        if (bytes.bitSize >= 16) {
          if ((bytes.bitSize - 16) % 8 === 0) {
            let byte_0$1 = bytes.byteAt(0);
            let byte_1 = bytes.byteAt(1);
            if ((((byte_0$1 >= 0x21) && (byte_0$1 <= 0x7E)) && (byte_1 >= 0x21)) && (byte_1 <= 0x7E)) {
              let rest = bitArraySlice(bytes, 16);
              let index = (byte_0$1 - 0x21) * 0x5E + (byte_1 - 0x21);
              let $ = $bit_array.slice(lookup_table, index * 2, 2);
              if (!($ instanceof Ok) || $[0].bitSize !== 16) {
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
              let codepoint_value = bitArraySliceToInt($[0], 0, 16, true, false);
              return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
            } else {
              let rest = bitArraySlice(bytes, 8);
              return new Ok([$utils.replacement_character(), rest]);
            }
          } else {
            let rest = bitArraySlice(bytes, 8);
            return new Ok([$utils.replacement_character(), rest]);
          }
        } else {
          let rest = bitArraySlice(bytes, 8);
          return new Ok([$utils.replacement_character(), rest]);
        }
      }
    } else if (bytes.bitSize >= 16) {
      if ((bytes.bitSize - 16) % 8 === 0) {
        let byte_0 = bytes.byteAt(0);
        let byte_1 = bytes.byteAt(1);
        if ((((byte_0 >= 0x21) && (byte_0 <= 0x7E)) && (byte_1 >= 0x21)) && (byte_1 <= 0x7E)) {
          let rest = bitArraySlice(bytes, 16);
          let index = (byte_0 - 0x21) * 0x5E + (byte_1 - 0x21);
          let $ = $bit_array.slice(lookup_table, index * 2, 2);
          if (!($ instanceof Ok) || $[0].bitSize !== 16) {
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
          let codepoint_value = bitArraySliceToInt($[0], 0, 16, true, false);
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
  } else {
    return new Error(undefined);
  }
}

/// <reference types="./utf8.d.mts" />
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $utils from "../../dcmfx_character_set/internal/utils.mjs";
import { Ok, Error, bitArraySlice } from "../../gleam.mjs";

export function decode_next_codepoint(bytes) {
  if (bytes.bitSize >= 8) {
    if ((bytes.bitSize - 8) % 8 === 0) {
      let byte_0 = bytes.byteAt(0);
      if (byte_0 <= 0x7F) {
        let rest = bitArraySlice(bytes, 8);
        let codepoint_value = byte_0;
        return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
      } else if (bytes.bitSize >= 16) {
        if ((bytes.bitSize - 16) % 8 === 0) {
          let byte_0$1 = bytes.byteAt(0);
          let byte_1 = bytes.byteAt(1);
          if (
            (((byte_0$1 >= 0xC0) && (byte_0$1 <= 0xDF)) && (byte_1 >= 0x80)) && (byte_1 <= 0xBF)
          ) {
            let rest = bitArraySlice(bytes, 16);
            let codepoint_value = $int.bitwise_and(byte_0$1, 0x1F) * 64 + $int.bitwise_and(
              byte_1,
              0x3F,
            );
            return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
          } else if (bytes.bitSize >= 24) {
            if ((bytes.bitSize - 24) % 8 === 0) {
              let byte_0$2 = bytes.byteAt(0);
              let byte_1$1 = bytes.byteAt(1);
              let byte_2 = bytes.byteAt(2);
              if (
                (((((byte_0$2 >= 0xE0) && (byte_0$2 <= 0xEF)) && (byte_1$1 >= 0x80)) && (byte_1$1 <= 0xBF)) && (byte_2 >= 0x80)) && (byte_2 <= 0xBF)
              ) {
                let rest = bitArraySlice(bytes, 24);
                let codepoint_value = ($int.bitwise_and(byte_0$2, 0xF) * 4096 + $int.bitwise_and(
                  byte_1$1,
                  0x3F,
                ) * 64) + $int.bitwise_and(byte_2, 0x3F);
                return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
              } else if (bytes.bitSize >= 32 && (bytes.bitSize - 32) % 8 === 0) {
                let byte_0$3 = bytes.byteAt(0);
                let byte_1$2 = bytes.byteAt(1);
                let byte_2$1 = bytes.byteAt(2);
                let byte_3 = bytes.byteAt(3);
                if (
                  (((((((byte_0$3 >= 0xF0) && (byte_0$3 <= 0xF7)) && (byte_1$2 >= 0x80)) && (byte_1$2 <= 0xBF)) && (byte_2$1 >= 0x80)) && (byte_2$1 <= 0xBF)) && (byte_3 >= 0x80)) && (byte_3 <= 0xBF)
                ) {
                  let rest = bitArraySlice(bytes, 32);
                  let codepoint_value = (($int.bitwise_and(byte_0$3, 0x7) * 262_144 + $int.bitwise_and(
                    byte_1$2,
                    0x3F,
                  ) * 4096) + $int.bitwise_and(byte_2$1, 0x3F) * 64) + $int.bitwise_and(
                    byte_3,
                    0x3F,
                  );
                  return new Ok(
                    [$utils.int_to_codepoint(codepoint_value), rest],
                  );
                } else {
                  let rest = bitArraySlice(bytes, 8);
                  return new Ok([$utils.replacement_character(), rest]);
                }
              } else {
                let rest = bitArraySlice(bytes, 8);
                return new Ok([$utils.replacement_character(), rest]);
              }
            } else if (bytes.bitSize >= 32 && (bytes.bitSize - 32) % 8 === 0) {
              let byte_0$2 = bytes.byteAt(0);
              let byte_1$1 = bytes.byteAt(1);
              let byte_2 = bytes.byteAt(2);
              let byte_3 = bytes.byteAt(3);
              if (
                (((((((byte_0$2 >= 0xF0) && (byte_0$2 <= 0xF7)) && (byte_1$1 >= 0x80)) && (byte_1$1 <= 0xBF)) && (byte_2 >= 0x80)) && (byte_2 <= 0xBF)) && (byte_3 >= 0x80)) && (byte_3 <= 0xBF)
              ) {
                let rest = bitArraySlice(bytes, 32);
                let codepoint_value = (($int.bitwise_and(byte_0$2, 0x7) * 262_144 + $int.bitwise_and(
                  byte_1$1,
                  0x3F,
                ) * 4096) + $int.bitwise_and(byte_2, 0x3F) * 64) + $int.bitwise_and(
                  byte_3,
                  0x3F,
                );
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
        } else if (bytes.bitSize >= 24) {
          if ((bytes.bitSize - 24) % 8 === 0) {
            let byte_0$1 = bytes.byteAt(0);
            let byte_1 = bytes.byteAt(1);
            let byte_2 = bytes.byteAt(2);
            if (
              (((((byte_0$1 >= 0xE0) && (byte_0$1 <= 0xEF)) && (byte_1 >= 0x80)) && (byte_1 <= 0xBF)) && (byte_2 >= 0x80)) && (byte_2 <= 0xBF)
            ) {
              let rest = bitArraySlice(bytes, 24);
              let codepoint_value = ($int.bitwise_and(byte_0$1, 0xF) * 4096 + $int.bitwise_and(
                byte_1,
                0x3F,
              ) * 64) + $int.bitwise_and(byte_2, 0x3F);
              return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
            } else if (bytes.bitSize >= 32 && (bytes.bitSize - 32) % 8 === 0) {
              let byte_0$2 = bytes.byteAt(0);
              let byte_1$1 = bytes.byteAt(1);
              let byte_2$1 = bytes.byteAt(2);
              let byte_3 = bytes.byteAt(3);
              if (
                (((((((byte_0$2 >= 0xF0) && (byte_0$2 <= 0xF7)) && (byte_1$1 >= 0x80)) && (byte_1$1 <= 0xBF)) && (byte_2$1 >= 0x80)) && (byte_2$1 <= 0xBF)) && (byte_3 >= 0x80)) && (byte_3 <= 0xBF)
              ) {
                let rest = bitArraySlice(bytes, 32);
                let codepoint_value = (($int.bitwise_and(byte_0$2, 0x7) * 262_144 + $int.bitwise_and(
                  byte_1$1,
                  0x3F,
                ) * 4096) + $int.bitwise_and(byte_2$1, 0x3F) * 64) + $int.bitwise_and(
                  byte_3,
                  0x3F,
                );
                return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
              } else {
                let rest = bitArraySlice(bytes, 8);
                return new Ok([$utils.replacement_character(), rest]);
              }
            } else {
              let rest = bitArraySlice(bytes, 8);
              return new Ok([$utils.replacement_character(), rest]);
            }
          } else if (bytes.bitSize >= 32 && (bytes.bitSize - 32) % 8 === 0) {
            let byte_0$1 = bytes.byteAt(0);
            let byte_1 = bytes.byteAt(1);
            let byte_2 = bytes.byteAt(2);
            let byte_3 = bytes.byteAt(3);
            if (
              (((((((byte_0$1 >= 0xF0) && (byte_0$1 <= 0xF7)) && (byte_1 >= 0x80)) && (byte_1 <= 0xBF)) && (byte_2 >= 0x80)) && (byte_2 <= 0xBF)) && (byte_3 >= 0x80)) && (byte_3 <= 0xBF)
            ) {
              let rest = bitArraySlice(bytes, 32);
              let codepoint_value = (($int.bitwise_and(byte_0$1, 0x7) * 262_144 + $int.bitwise_and(
                byte_1,
                0x3F,
              ) * 4096) + $int.bitwise_and(byte_2, 0x3F) * 64) + $int.bitwise_and(
                byte_3,
                0x3F,
              );
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
      } else {
        let rest = bitArraySlice(bytes, 8);
        return new Ok([$utils.replacement_character(), rest]);
      }
    } else if (bytes.bitSize >= 16) {
      if ((bytes.bitSize - 16) % 8 === 0) {
        let byte_0 = bytes.byteAt(0);
        let byte_1 = bytes.byteAt(1);
        if (
          (((byte_0 >= 0xC0) && (byte_0 <= 0xDF)) && (byte_1 >= 0x80)) && (byte_1 <= 0xBF)
        ) {
          let rest = bitArraySlice(bytes, 16);
          let codepoint_value = $int.bitwise_and(byte_0, 0x1F) * 64 + $int.bitwise_and(
            byte_1,
            0x3F,
          );
          return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
        } else if (bytes.bitSize >= 24) {
          if ((bytes.bitSize - 24) % 8 === 0) {
            let byte_0$1 = bytes.byteAt(0);
            let byte_1$1 = bytes.byteAt(1);
            let byte_2 = bytes.byteAt(2);
            if (
              (((((byte_0$1 >= 0xE0) && (byte_0$1 <= 0xEF)) && (byte_1$1 >= 0x80)) && (byte_1$1 <= 0xBF)) && (byte_2 >= 0x80)) && (byte_2 <= 0xBF)
            ) {
              let rest = bitArraySlice(bytes, 24);
              let codepoint_value = ($int.bitwise_and(byte_0$1, 0xF) * 4096 + $int.bitwise_and(
                byte_1$1,
                0x3F,
              ) * 64) + $int.bitwise_and(byte_2, 0x3F);
              return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
            } else if (bytes.bitSize >= 32 && (bytes.bitSize - 32) % 8 === 0) {
              let byte_0$2 = bytes.byteAt(0);
              let byte_1$2 = bytes.byteAt(1);
              let byte_2$1 = bytes.byteAt(2);
              let byte_3 = bytes.byteAt(3);
              if (
                (((((((byte_0$2 >= 0xF0) && (byte_0$2 <= 0xF7)) && (byte_1$2 >= 0x80)) && (byte_1$2 <= 0xBF)) && (byte_2$1 >= 0x80)) && (byte_2$1 <= 0xBF)) && (byte_3 >= 0x80)) && (byte_3 <= 0xBF)
              ) {
                let rest = bitArraySlice(bytes, 32);
                let codepoint_value = (($int.bitwise_and(byte_0$2, 0x7) * 262_144 + $int.bitwise_and(
                  byte_1$2,
                  0x3F,
                ) * 4096) + $int.bitwise_and(byte_2$1, 0x3F) * 64) + $int.bitwise_and(
                  byte_3,
                  0x3F,
                );
                return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.bitSize >= 32 && (bytes.bitSize - 32) % 8 === 0) {
            let byte_0$1 = bytes.byteAt(0);
            let byte_1$1 = bytes.byteAt(1);
            let byte_2 = bytes.byteAt(2);
            let byte_3 = bytes.byteAt(3);
            if (
              (((((((byte_0$1 >= 0xF0) && (byte_0$1 <= 0xF7)) && (byte_1$1 >= 0x80)) && (byte_1$1 <= 0xBF)) && (byte_2 >= 0x80)) && (byte_2 <= 0xBF)) && (byte_3 >= 0x80)) && (byte_3 <= 0xBF)
            ) {
              let rest = bitArraySlice(bytes, 32);
              let codepoint_value = (($int.bitwise_and(byte_0$1, 0x7) * 262_144 + $int.bitwise_and(
                byte_1$1,
                0x3F,
              ) * 4096) + $int.bitwise_and(byte_2, 0x3F) * 64) + $int.bitwise_and(
                byte_3,
                0x3F,
              );
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
      } else if (bytes.bitSize >= 24) {
        if ((bytes.bitSize - 24) % 8 === 0) {
          let byte_0 = bytes.byteAt(0);
          let byte_1 = bytes.byteAt(1);
          let byte_2 = bytes.byteAt(2);
          if (
            (((((byte_0 >= 0xE0) && (byte_0 <= 0xEF)) && (byte_1 >= 0x80)) && (byte_1 <= 0xBF)) && (byte_2 >= 0x80)) && (byte_2 <= 0xBF)
          ) {
            let rest = bitArraySlice(bytes, 24);
            let codepoint_value = ($int.bitwise_and(byte_0, 0xF) * 4096 + $int.bitwise_and(
              byte_1,
              0x3F,
            ) * 64) + $int.bitwise_and(byte_2, 0x3F);
            return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
          } else if (bytes.bitSize >= 32 && (bytes.bitSize - 32) % 8 === 0) {
            let byte_0$1 = bytes.byteAt(0);
            let byte_1$1 = bytes.byteAt(1);
            let byte_2$1 = bytes.byteAt(2);
            let byte_3 = bytes.byteAt(3);
            if (
              (((((((byte_0$1 >= 0xF0) && (byte_0$1 <= 0xF7)) && (byte_1$1 >= 0x80)) && (byte_1$1 <= 0xBF)) && (byte_2$1 >= 0x80)) && (byte_2$1 <= 0xBF)) && (byte_3 >= 0x80)) && (byte_3 <= 0xBF)
            ) {
              let rest = bitArraySlice(bytes, 32);
              let codepoint_value = (($int.bitwise_and(byte_0$1, 0x7) * 262_144 + $int.bitwise_and(
                byte_1$1,
                0x3F,
              ) * 4096) + $int.bitwise_and(byte_2$1, 0x3F) * 64) + $int.bitwise_and(
                byte_3,
                0x3F,
              );
              return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.bitSize >= 32 && (bytes.bitSize - 32) % 8 === 0) {
          let byte_0 = bytes.byteAt(0);
          let byte_1 = bytes.byteAt(1);
          let byte_2 = bytes.byteAt(2);
          let byte_3 = bytes.byteAt(3);
          if (
            (((((((byte_0 >= 0xF0) && (byte_0 <= 0xF7)) && (byte_1 >= 0x80)) && (byte_1 <= 0xBF)) && (byte_2 >= 0x80)) && (byte_2 <= 0xBF)) && (byte_3 >= 0x80)) && (byte_3 <= 0xBF)
          ) {
            let rest = bitArraySlice(bytes, 32);
            let codepoint_value = (($int.bitwise_and(byte_0, 0x7) * 262_144 + $int.bitwise_and(
              byte_1,
              0x3F,
            ) * 4096) + $int.bitwise_and(byte_2, 0x3F) * 64) + $int.bitwise_and(
              byte_3,
              0x3F,
            );
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
  } else {
    return new Error(undefined);
  }
}

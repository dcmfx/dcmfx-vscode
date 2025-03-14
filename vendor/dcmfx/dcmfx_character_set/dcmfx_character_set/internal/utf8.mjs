/// <reference types="./utf8.d.mts" />
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $utils from "../../dcmfx_character_set/internal/utils.mjs";
import { Ok, Error, bitArraySlice } from "../../gleam.mjs";

export function decode_next_codepoint(bytes) {
  if ((bytes.bitSize >= 8 && (bytes.bitSize - 8) % 8 === 0) &&
  (bytes.byteAt(0) <= 0x7F)) {
    let b0 = bytes.byteAt(0);
    let rest = bitArraySlice(bytes, 8);
    let codepoint_value = b0;
    return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
  } else if ((bytes.bitSize >= 16 && (bytes.bitSize - 16) % 8 === 0) &&
  ((((bytes.byteAt(0) >= 0xC0) && (bytes.byteAt(0) <= 0xDF)) && (bytes.byteAt(1) >= 0x80)) && (bytes.byteAt(1) <= 0xBF))) {
    let b0 = bytes.byteAt(0);
    let b1 = bytes.byteAt(1);
    let rest = bitArraySlice(bytes, 16);
    let codepoint_value = $int.bitwise_and(b0, 0x1F) * 64 + $int.bitwise_and(
      b1,
      0x3F,
    );
    return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
  } else if ((bytes.bitSize >= 24 && (bytes.bitSize - 24) % 8 === 0) &&
  ((((((bytes.byteAt(0) >= 0xE0) && (bytes.byteAt(0) <= 0xEF)) && (bytes.byteAt(1) >= 0x80)) && (bytes.byteAt(1) <= 0xBF)) && (bytes.byteAt(2) >= 0x80)) && (bytes.byteAt(2) <= 0xBF))) {
    let b0 = bytes.byteAt(0);
    let b1 = bytes.byteAt(1);
    let b2 = bytes.byteAt(2);
    let rest = bitArraySlice(bytes, 24);
    let codepoint_value = ($int.bitwise_and(b0, 0xF) * 4096 + $int.bitwise_and(
      b1,
      0x3F,
    ) * 64) + $int.bitwise_and(b2, 0x3F);
    return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
  } else if ((bytes.bitSize >= 32 && (bytes.bitSize - 32) % 8 === 0) &&
  ((((((((bytes.byteAt(0) >= 0xF0) && (bytes.byteAt(0) <= 0xF7)) && (bytes.byteAt(1) >= 0x80)) && (bytes.byteAt(1) <= 0xBF)) && (bytes.byteAt(2) >= 0x80)) && (bytes.byteAt(2) <= 0xBF)) && (bytes.byteAt(3) >= 0x80)) && (bytes.byteAt(3) <= 0xBF))) {
    let b0 = bytes.byteAt(0);
    let b1 = bytes.byteAt(1);
    let b2 = bytes.byteAt(2);
    let b3 = bytes.byteAt(3);
    let rest = bitArraySlice(bytes, 32);
    let codepoint_value = (($int.bitwise_and(b0, 0x7) * 262_144 + $int.bitwise_and(
      b1,
      0x3F,
    ) * 4096) + $int.bitwise_and(b2, 0x3F) * 64) + $int.bitwise_and(b3, 0x3F);
    return new Ok([$utils.int_to_codepoint(codepoint_value), rest]);
  } else if ((bytes.bitSize >= 8 && (bytes.bitSize - 8) % 8 === 0)) {
    let rest = bitArraySlice(bytes, 8);
    return new Ok([$utils.replacement_character(), rest]);
  } else {
    return new Error(undefined);
  }
}

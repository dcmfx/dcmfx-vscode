/// <reference types="./utf8.d.mts" />
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import { Ok, Error, makeError } from "../../gleam.mjs";

export function decode_next_codepoint(bytes) {
  if (bytes.length >= 1 && (bytes.byteAt(0) <= 0x7F)) {
    let b0 = bytes.byteAt(0);
    let rest = bytes.sliceAfter(1);
    let $ = $string.utf_codepoint(b0);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_character_set/internal/utf8",
        35,
        "decode_next_codepoint",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let codepoint = $[0];
    return new Ok([codepoint, rest]);
  } else if (bytes.length >= 2 &&
  ((((bytes.byteAt(0) >= 0xC0) && (bytes.byteAt(0) <= 0xDF)) && (bytes.byteAt(1) >= 0x80)) && (bytes.byteAt(1) <= 0xBF))) {
    let b0 = bytes.byteAt(0);
    let b1 = bytes.byteAt(1);
    let rest = bytes.sliceAfter(2);
    let codepoint = $int.bitwise_and(b0, 0x1F) * 64 + $int.bitwise_and(b1, 0x3F);
    let $ = $string.utf_codepoint(codepoint);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_character_set/internal/utf8",
        45,
        "decode_next_codepoint",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let codepoint$1 = $[0];
    return new Ok([codepoint$1, rest]);
  } else if (bytes.length >= 3 &&
  ((((((bytes.byteAt(0) >= 0xE0) && (bytes.byteAt(0) <= 0xEF)) && (bytes.byteAt(1) >= 0x80)) && (bytes.byteAt(1) <= 0xBF)) && (bytes.byteAt(2) >= 0x80)) && (bytes.byteAt(2) <= 0xBF))) {
    let b0 = bytes.byteAt(0);
    let b1 = bytes.byteAt(1);
    let b2 = bytes.byteAt(2);
    let rest = bytes.sliceAfter(3);
    let codepoint = ($int.bitwise_and(b0, 0xF) * 4096 + $int.bitwise_and(
      b1,
      0x3F,
    ) * 64) + $int.bitwise_and(b2, 0x3F);
    let $ = $string.utf_codepoint(codepoint);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_character_set/internal/utf8",
        66,
        "decode_next_codepoint",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let codepoint$1 = $[0];
    return new Ok([codepoint$1, rest]);
  } else if (bytes.length >= 4 &&
  ((((((((bytes.byteAt(0) >= 0xF0) && (bytes.byteAt(0) <= 0xF7)) && (bytes.byteAt(1) >= 0x80)) && (bytes.byteAt(1) <= 0xBF)) && (bytes.byteAt(2) >= 0x80)) && (bytes.byteAt(2) <= 0xBF)) && (bytes.byteAt(3) >= 0x80)) && (bytes.byteAt(3) <= 0xBF))) {
    let b0 = bytes.byteAt(0);
    let b1 = bytes.byteAt(1);
    let b2 = bytes.byteAt(2);
    let b3 = bytes.byteAt(3);
    let rest = bytes.sliceAfter(4);
    let codepoint = (($int.bitwise_and(b0, 0x7) * 262_144 + $int.bitwise_and(
      b1,
      0x3F,
    ) * 4096) + $int.bitwise_and(b2, 0x3F) * 64) + $int.bitwise_and(b3, 0x3F);
    let $ = $string.utf_codepoint(codepoint);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_character_set/internal/utf8",
        91,
        "decode_next_codepoint",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let codepoint$1 = $[0];
    return new Ok([codepoint$1, rest]);
  } else if (bytes.length >= 1) {
    let rest = bytes.sliceAfter(1);
    let $ = $string.utf_codepoint(0xFFFD);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_character_set/internal/utf8",
        99,
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

/// <reference types="./utils.d.mts" />
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import { makeError } from "../../gleam.mjs";

export function replacement_character() {
  let $ = $string.utf_codepoint(0xFFFD);
  if (!$.isOk()) {
    throw makeError(
      "let_assert",
      "dcmfx_character_set/internal/utils",
      7,
      "replacement_character",
      "Pattern match failed, no pattern matched the value.",
      { value: $ }
    )
  }
  let codepoint = $[0];
  return codepoint;
}

export function int_to_codepoint(i) {
  let $ = $string.utf_codepoint(i);
  if ($.isOk()) {
    let codepoint = $[0];
    return codepoint;
  } else {
    return replacement_character();
  }
}

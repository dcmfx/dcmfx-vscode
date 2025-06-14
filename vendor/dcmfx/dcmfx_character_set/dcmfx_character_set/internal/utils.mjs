/// <reference types="./utils.d.mts" />
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import { Ok, makeError } from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_character_set/internal/utils.gleam";

export function replacement_character() {
  let $ = $string.utf_codepoint(0xFFFD);
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "dcmfx_character_set/internal/utils",
      7,
      "replacement_character",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 199, end: 254, pattern_start: 210, pattern_end: 223 }
    )
  }
  let codepoint = $[0];
  return codepoint;
}

export function int_to_codepoint(i) {
  let $ = $string.utf_codepoint(i);
  if ($ instanceof Ok) {
    let codepoint = $[0];
    return codepoint;
  } else {
    return replacement_character();
  }
}

/// <reference types="./utils.d.mts" />
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import { Ok, makeError } from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_character_set/internal/utils.gleam";

/**
 * Returns the codepoint for the replacement character '�' that is emitted when
 * invalid string data is encountered.
 */
export function replacement_character() {
  let $ = $string.utf_codepoint(0xFFFD);
  let codepoint;
  if ($ instanceof Ok) {
    codepoint = $[0];
  } else {
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
  return codepoint;
}

/**
 * Converts an integer codepoint value to a `UtfCodepoint`. The replacement
 * character '�' is returned if the integer is not a valid codepoint.
 */
export function int_to_codepoint(i) {
  let $ = $string.utf_codepoint(i);
  if ($ instanceof Ok) {
    let codepoint = $[0];
    return codepoint;
  } else {
    return replacement_character();
  }
}

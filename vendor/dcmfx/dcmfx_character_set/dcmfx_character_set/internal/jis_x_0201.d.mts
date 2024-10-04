import type * as _ from "../../gleam.d.mts";

export function decode_next_codepoint(bytes: _.BitArray): _.Result<
  [_.UtfCodepoint, _.BitArray],
  undefined
>;

export function decode_next_codepoint_allowing_backslash(bytes: _.BitArray): _.Result<
  [_.UtfCodepoint, _.BitArray],
  undefined
>;

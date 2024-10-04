import type * as _ from "../../gleam.d.mts";

export function decode_next_codepoint(
  bytes: _.BitArray,
  lookup_table: _.BitArray
): _.Result<[_.UtfCodepoint, _.BitArray], undefined>;

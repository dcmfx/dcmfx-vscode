/// <reference types="./dynamic.d.mts" />
import * as $dict from "../gleam/dict.mjs";
import {
  classify_dynamic as classify,
  identity as from,
  identity as bool,
  identity as string,
  identity as float,
  identity as int,
  identity as bit_array,
  identity as list,
  list_to_array as array,
  identity as cast,
} from "../gleam_stdlib.mjs";

export { array, bit_array, bool, classify, float, from, int, list, string };

/**
 * Create a dynamic value made an unordered series of keys and values, where
 * the keys are unique.
 *
 * On Erlang this will be a map, on JavaScript this wil be a Gleam dict object.
 */
export function properties(entries) {
  return cast($dict.from_list(entries));
}

/**
 * A dynamic value representing nothing.
 *
 * On Erlang this will be the atom `nil`, on JavaScript this wil be
 * `undefined`.
 */
export function nil() {
  return cast(undefined);
}

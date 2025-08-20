/// <reference types="./io.d.mts" />
import * as $string from "../gleam/string.mjs";
import {
  print,
  print_error,
  console_log as println,
  console_error as println_error,
  print_debug as do_debug_println,
} from "../gleam_stdlib.mjs";

export { print, print_error, println, println_error };

/**
 * Writes a value to standard error (stderr) yielding Gleam syntax.
 *
 * The value is returned after being printed so it can be used in pipelines.
 *
 * ## Example
 *
 * ```gleam
 * debug("Hi mum")
 * // -> "Hi mum"
 * // <<"Hi mum">>
 * ```
 *
 * ```gleam
 * debug(Ok(1))
 * // -> Ok(1)
 * // {ok, 1}
 * ```
 *
 * ```gleam
 * import gleam/list
 *
 * [1, 2]
 * |> list.map(fn(x) { x + 1 })
 * |> debug
 * |> list.map(fn(x) { x * 2 })
 * // -> [4, 6]
 * // [2, 3]
 * ```
 *
 * Note: At runtime Gleam doesn't have type information anymore. This combined
 * with some types having the same runtime representation results in it not
 * always being possible to correctly choose which Gleam syntax to show.
 */
export function debug(term) {
  let _pipe = term;
  let _pipe$1 = $string.inspect(_pipe);
  do_debug_println(_pipe$1)
  return term;
}

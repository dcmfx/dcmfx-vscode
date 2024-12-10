import type * as _ from "../gleam.d.mts";
import type * as $string_tree from "../gleam/string_tree.d.mts";

export type StringBuilder = $string_tree.StringTree$;

export function new$(): $string_tree.StringTree$;

export function prepend(builder: $string_tree.StringTree$, prefix: string): $string_tree.StringTree$;

export function append(builder: $string_tree.StringTree$, second: string): $string_tree.StringTree$;

export function prepend_builder(
  builder: $string_tree.StringTree$,
  prefix: $string_tree.StringTree$
): $string_tree.StringTree$;

export function append_builder(
  builder: $string_tree.StringTree$,
  suffix: $string_tree.StringTree$
): $string_tree.StringTree$;

export function from_strings(strings: _.List<string>): $string_tree.StringTree$;

export function concat(builders: _.List<$string_tree.StringTree$>): $string_tree.StringTree$;

export function from_string(string: string): $string_tree.StringTree$;

export function to_string(builder: $string_tree.StringTree$): string;

export function byte_size(builder: $string_tree.StringTree$): number;

export function join(builders: _.List<$string_tree.StringTree$>, sep: string): $string_tree.StringTree$;

export function lowercase(builder: $string_tree.StringTree$): $string_tree.StringTree$;

export function uppercase(builder: $string_tree.StringTree$): $string_tree.StringTree$;

export function reverse(builder: $string_tree.StringTree$): $string_tree.StringTree$;

export function split(iodata: $string_tree.StringTree$, pattern: string): _.List<
  $string_tree.StringTree$
>;

export function replace(
  builder: $string_tree.StringTree$,
  pattern: string,
  substitute: string
): $string_tree.StringTree$;

export function is_equal(
  a: $string_tree.StringTree$,
  b: $string_tree.StringTree$
): boolean;

export function is_empty(builder: $string_tree.StringTree$): boolean;

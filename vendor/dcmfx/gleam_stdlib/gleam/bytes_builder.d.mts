import type * as _ from "../gleam.d.mts";
import type * as $bytes_tree from "../gleam/bytes_tree.d.mts";
import type * as $string_tree from "../gleam/string_tree.d.mts";

export type BytesBuilder = $bytes_tree.BytesTree$;

export function new$(): $bytes_tree.BytesTree$;

export function prepend(second: $bytes_tree.BytesTree$, first: _.BitArray): $bytes_tree.BytesTree$;

export function append(first: $bytes_tree.BytesTree$, second: _.BitArray): $bytes_tree.BytesTree$;

export function prepend_builder(
  second: $bytes_tree.BytesTree$,
  first: $bytes_tree.BytesTree$
): $bytes_tree.BytesTree$;

export function append_builder(
  first: $bytes_tree.BytesTree$,
  second: $bytes_tree.BytesTree$
): $bytes_tree.BytesTree$;

export function prepend_string(second: $bytes_tree.BytesTree$, first: string): $bytes_tree.BytesTree$;

export function append_string(first: $bytes_tree.BytesTree$, second: string): $bytes_tree.BytesTree$;

export function concat(builders: _.List<$bytes_tree.BytesTree$>): $bytes_tree.BytesTree$;

export function concat_bit_arrays(bits: _.List<_.BitArray>): $bytes_tree.BytesTree$;

export function from_string(string: string): $bytes_tree.BytesTree$;

export function from_string_builder(builder: $string_tree.StringTree$): $bytes_tree.BytesTree$;

export function from_bit_array(bits: _.BitArray): $bytes_tree.BytesTree$;

export function to_bit_array(builder: $bytes_tree.BytesTree$): _.BitArray;

export function byte_size(builder: $bytes_tree.BytesTree$): number;

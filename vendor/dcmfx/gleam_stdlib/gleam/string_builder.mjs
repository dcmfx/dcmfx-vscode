/// <reference types="./string_builder.d.mts" />
import { toList, isEqual } from "../gleam.mjs";
import * as $string_tree from "../gleam/string_tree.mjs";
import { string_replace as replace } from "../gleam_stdlib.mjs";

export { replace };

export function new$() {
  return $string_tree.from_strings(toList([]));
}

export function prepend(builder, prefix) {
  return $string_tree.append_tree($string_tree.from_string(prefix), builder);
}

export function append(builder, second) {
  return $string_tree.append_tree(builder, $string_tree.from_string(second));
}

export function prepend_builder(builder, prefix) {
  return $string_tree.prepend_tree(builder, prefix);
}

export function append_builder(builder, suffix) {
  return $string_tree.append_tree(builder, suffix);
}

export function from_strings(strings) {
  return $string_tree.from_strings(strings);
}

export function concat(builders) {
  return $string_tree.concat(builders);
}

export function from_string(string) {
  return $string_tree.from_string(string);
}

export function to_string(builder) {
  return $string_tree.to_string(builder);
}

export function byte_size(builder) {
  return $string_tree.byte_size(builder);
}

export function join(builders, sep) {
  return $string_tree.join(builders, sep);
}

export function lowercase(builder) {
  return $string_tree.lowercase(builder);
}

export function uppercase(builder) {
  return $string_tree.uppercase(builder);
}

export function reverse(builder) {
  return $string_tree.reverse(builder);
}

export function split(iodata, pattern) {
  return $string_tree.split(iodata, pattern);
}

export function is_equal(a, b) {
  return isEqual(a, b);
}

export function is_empty(builder) {
  return isEqual($string_tree.from_string(""), builder);
}

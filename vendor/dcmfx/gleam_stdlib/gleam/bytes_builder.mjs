/// <reference types="./bytes_builder.d.mts" />
import { toList } from "../gleam.mjs";
import * as $bytes_tree from "../gleam/bytes_tree.mjs";
import * as $string_tree from "../gleam/string_tree.mjs";

export function new$() {
  return $bytes_tree.concat(toList([]));
}

export function prepend(second, first) {
  return $bytes_tree.append_tree($bytes_tree.from_bit_array(first), second);
}

export function append(first, second) {
  return $bytes_tree.append_tree(first, $bytes_tree.from_bit_array(second));
}

export function prepend_builder(second, first) {
  return $bytes_tree.append_tree(first, second);
}

export function append_builder(first, second) {
  return $bytes_tree.append_tree(first, second);
}

export function prepend_string(second, first) {
  return $bytes_tree.append_tree($bytes_tree.from_string(first), second);
}

export function append_string(first, second) {
  return $bytes_tree.append_tree(first, $bytes_tree.from_string(second));
}

export function concat(builders) {
  return $bytes_tree.concat(builders);
}

export function concat_bit_arrays(bits) {
  return $bytes_tree.concat_bit_arrays(bits);
}

export function from_string(string) {
  return $bytes_tree.from_string(string);
}

export function from_string_builder(builder) {
  return $bytes_tree.from_string_tree(builder);
}

export function from_bit_array(bits) {
  return $bytes_tree.from_bit_array(bits);
}

export function to_bit_array(builder) {
  return $bytes_tree.to_bit_array(builder);
}

export function byte_size(builder) {
  return $bytes_tree.byte_size(builder);
}

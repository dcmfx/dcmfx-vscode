/// <reference types="./data_element_tag.d.mts" />
import * as $bool from "../../gleam_stdlib/gleam/bool.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $utils from "../dcmfx_core/internal/utils.mjs";
import { Error, CustomType as $CustomType } from "../gleam.mjs";

export class DataElementTag extends $CustomType {
  constructor(group, element) {
    super();
    this.group = group;
    this.element = element;
  }
}

export function is_private(tag) {
  return $int.is_odd(tag.group);
}

export function is_private_creator(tag) {
  return ($int.is_odd(tag.group) && (tag.element >= 0x10)) && (tag.element <= 0xFF);
}

export function to_int(tag) {
  return tag.group * 65_536 + tag.element;
}

export function from_hex_string(tag) {
  return $bool.guard(
    $utils.string_fast_length(tag) !== 8,
    new Error(undefined),
    () => {
      let group = $string.slice(tag, 0, 4);
      let element = $string.slice(tag, 4, 4);
      return $result.try$(
        $int.base_parse(group, 16),
        (group) => {
          return $result.map(
            $int.base_parse(element, 16),
            (element) => { return new DataElementTag(group, element); },
          );
        },
      );
    },
  );
}

function uint16_to_string(value) {
  let _pipe = value;
  let _pipe$1 = $int.to_base16(_pipe);
  return $utils.pad_start(_pipe$1, 4, "0");
}

export function to_string(tag) {
  return ((("(" + uint16_to_string(tag.group)) + ",") + uint16_to_string(
    tag.element,
  )) + ")";
}

export function to_hex_string(tag) {
  return uint16_to_string(tag.group) + uint16_to_string(tag.element);
}

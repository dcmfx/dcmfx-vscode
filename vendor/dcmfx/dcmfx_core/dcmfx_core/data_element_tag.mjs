/// <reference types="./data_element_tag.d.mts" />
import * as $bool from "../../gleam_stdlib/gleam/bool.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
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

/**
 * Returns whether the tag is File Meta Information, which is determined by its 
 * group number equalling 2.
 */
export function is_file_meta_information(tag) {
  return tag.group === 2;
}

/**
 * Returns whether the tag is private, which is determined by its group number
 * being odd.
 */
export function is_private(tag) {
  return $int.is_odd(tag.group);
}

/**
 * Returns whether the tag is for a private creator, which is determined by its
 * group number being odd and its element being between 0x10 and 0xFF.
 *
 * Ref: PS3.5 7.8.1.
 */
export function is_private_creator(tag) {
  return ($int.is_odd(tag.group) && (tag.element >= 0x10)) && (tag.element <= 0xFF);
}

/**
 * Returns a copy of the tag with an updated group value.
 */
export function with_group(tag, group) {
  return new DataElementTag(group, tag.element);
}

/**
 * Returns a copy of the tag with an updated element value.
 */
export function with_element(tag, element) {
  return new DataElementTag(tag.group, element);
}

/**
 * Converts a tag to a single 32-bit integer where the group is in the high 16
 * bits and the element is in the low 16 bits.
 */
export function to_int(tag) {
  return tag.group * 65_536 + tag.element;
}

/**
 * Compares two data element tags.
 */
export function compare(lhs, rhs) {
  return $int.compare(to_int(lhs), to_int(rhs));
}

/**
 * Creates a data element tag from a hex string formatted as
 * `"$GROUP$ELEMENT"`, e.g.`"00080020"`.
 */
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

/**
 * Formats a 16-bit unsigned integer as a 4-digit hexadecimal string.
 * 
 * @ignore
 */
function uint16_to_string(value) {
  let _pipe = value;
  let _pipe$1 = $int.to_base16(_pipe);
  return $utils.pad_start(_pipe$1, 4, "0");
}

/**
 * Formats a data element tag as `"($GROUP,$ELEMENT)"`, e.g.`"(0008,002D)"`.
 */
export function to_string(tag) {
  return ((("(" + uint16_to_string(tag.group)) + ",") + uint16_to_string(
    tag.element,
  )) + ")";
}

/**
 * Formats a data element tag as `"$GROUP$ELEMENT"`, e.g.`"00080020"`.
 */
export function to_hex_string(tag) {
  return uint16_to_string(tag.group) + uint16_to_string(tag.element);
}

/**
 * A data element tag with a group and element set to zero.
 */
export const zero = /* @__PURE__ */ new DataElementTag(0, 0);

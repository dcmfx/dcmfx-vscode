/// <reference types="./attribute_tag.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $data_element_tag from "../../dcmfx_core/data_element_tag.mjs";
import { DataElementTag } from "../../dcmfx_core/data_element_tag.mjs";
import * as $data_error from "../../dcmfx_core/data_error.mjs";
import * as $bit_array_utils from "../../dcmfx_core/internal/bit_array_utils.mjs";
import { Ok, Error, makeError, toBitArray, sizedInt } from "../../gleam.mjs";

export function from_bytes(bytes) {
  let _pipe = bytes;
  let _pipe$1 = $bit_array_utils.to_uint32_list(_pipe);
  let _pipe$2 = $result.replace_error(
    _pipe$1,
    $data_error.new_value_invalid(
      "AttributeTag data length is not a multiple of 4",
    ),
  );
  return $result.map(
    _pipe$2,
    (_capture) => {
      return $list.map(
        _capture,
        (tag) => {
          let $ = toBitArray([sizedInt(tag, 32, false)]);
          if (!($.length == 4)) {
            throw makeError(
              "let_assert",
              "dcmfx_core/data_element_value/attribute_tag",
              19,
              "",
              "Pattern match failed, no pattern matched the value.",
              { value: $ }
            )
          }
          let group = $.intFromSlice(0, 2, false, false);
          let element = $.intFromSlice(2, 4, false, false);
          return new DataElementTag(group, element);
        },
      );
    },
  );
}

export function to_bytes(values) {
  let _pipe = values;
  let _pipe$1 = $list.map(
    _pipe,
    (tag) => {
      let is_valid = (((tag.group >= 0) && (tag.group <= 0xFFFF)) && (tag.element >= 0)) && (tag.element <= 0xFFFF);
      if (is_valid) {
        return new Ok(
          toBitArray([
            sizedInt(tag.group, 16, false),
            sizedInt(tag.element, 16, false),
          ]),
        );
      } else {
        return new Error(
          $data_error.new_value_invalid(
            "AttributeTag group or element are not in the range 0 - 0xFFFF",
          ),
        );
      }
    },
  );
  let _pipe$2 = $result.all(_pipe$1);
  return $result.map(_pipe$2, $bit_array.concat);
}
/// <reference types="./pixel_data_frame.d.mts" />
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import {
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
} from "../gleam.mjs";

class PixelDataFrame extends $CustomType {
  constructor(fragments, length) {
    super();
    this.fragments = fragments;
    this.length = length;
  }
}

export function new$() {
  return new PixelDataFrame(toList([]), 0);
}

export function push_fragment(frame, data) {
  return new PixelDataFrame(
    listPrepend(data, frame.fragments),
    frame.length + $bit_array.byte_size(data),
  );
}

export function length(frame) {
  return frame.length;
}

export function is_empty(frame) {
  return frame.length === 0;
}

export function fragments(frame) {
  let _pipe = frame.fragments;
  return $list.reverse(_pipe);
}

function do_drop_end_bytes(loop$frame, loop$target_length) {
  while (true) {
    let frame = loop$frame;
    let target_length = loop$target_length;
    let $ = frame.length > target_length;
    if ($) {
      let $1 = frame.fragments;
      if ($1.atLeastLength(1)) {
        let fragment = $1.head;
        let fragments$1 = $1.tail;
        let length$1 = frame.length - $bit_array.byte_size(fragment);
        let $2 = length$1 < target_length;
        if ($2) {
          let fragment_length = target_length - length$1;
          let $3 = $bit_array.slice(fragment, 0, fragment_length);
          if (!$3.isOk()) {
            throw makeError(
              "let_assert",
              "dcmfx_pixel_data/pixel_data_frame",
              75,
              "do_drop_end_bytes",
              "Pattern match failed, no pattern matched the value.",
              { value: $3 }
            )
          }
          let new_fragment = $3[0];
          return new PixelDataFrame(
            listPrepend(new_fragment, fragments$1),
            target_length,
          );
        } else {
          let _pipe = new PixelDataFrame(fragments$1, length$1);
          loop$frame = _pipe;
          loop$target_length = target_length;
        }
      } else {
        return frame;
      }
    } else {
      return frame;
    }
  }
}

export function drop_end_bytes(frame, count) {
  let target_length = $int.max(0, frame.length - count);
  return do_drop_end_bytes(frame, target_length);
}

export function to_bytes(frame) {
  let $ = frame.fragments;
  if ($.hasLength(1)) {
    let fragment = $.head;
    return fragment;
  } else {
    let fragments$1 = $;
    let _pipe = fragments$1;
    let _pipe$1 = $list.reverse(_pipe);
    return $bit_array.concat(_pipe$1);
  }
}

export function equals(frame, other) {
  return isEqual(to_bytes(frame), to_bytes(other));
}

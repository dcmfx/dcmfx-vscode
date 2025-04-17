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
  toBitArray,
  bitArraySlice,
} from "../gleam.mjs";

class PixelDataFrame extends $CustomType {
  constructor(frame_index, fragments, length, bit_offset) {
    super();
    this.frame_index = frame_index;
    this.fragments = fragments;
    this.length = length;
    this.bit_offset = bit_offset;
  }
}

export function new$(frame_index) {
  return new PixelDataFrame(frame_index, toList([]), 0, 0);
}

export function index(frame) {
  return frame.frame_index;
}

export function push_fragment(frame, data) {
  let _record = frame;
  return new PixelDataFrame(
    _record.frame_index,
    listPrepend(data, frame.fragments),
    frame.length + $bit_array.byte_size(data),
    _record.bit_offset,
  );
}

export function length(frame) {
  return frame.length;
}

export function length_in_bits(frame) {
  return $int.max(frame.length * 8 - frame.bit_offset, 0);
}

export function bit_offset(frame) {
  return frame.bit_offset;
}

export function set_bit_offset(frame, bit_offset) {
  let _record = frame;
  return new PixelDataFrame(
    _record.frame_index,
    _record.fragments,
    _record.length,
    bit_offset,
  );
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
              118,
              "do_drop_end_bytes",
              "Pattern match failed, no pattern matched the value.",
              { value: $3 }
            )
          }
          let new_fragment = $3[0];
          let _record = frame;
          return new PixelDataFrame(
            _record.frame_index,
            listPrepend(new_fragment, fragments$1),
            target_length,
            _record.bit_offset,
          );
        } else {
          let _block;
          let _record = frame;
          _block = new PixelDataFrame(
            _record.frame_index,
            fragments$1,
            length$1,
            _record.bit_offset,
          );
          let _pipe = _block;
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

function shift_low_bits_loop(loop$input, loop$acc, loop$bit_offset) {
  while (true) {
    let input = loop$input;
    let acc = loop$acc;
    let bit_offset = loop$bit_offset;
    if (input.bitSize >= 16) {
      let a = input.byteAt(0);
      let b = input.byteAt(1);
      let _block;
      let _pipe = $int.bitwise_shift_right(a, bit_offset);
      _block = $int.bitwise_or(
        _pipe,
        $int.bitwise_shift_left(b, 8 - bit_offset),
      );
      let byte = _block;
      if (!(input.bitSize >= 8)) {
        throw makeError(
          "let_assert",
          "dcmfx_pixel_data/pixel_data_frame",
          179,
          "shift_low_bits_loop",
          "Pattern match failed, no pattern matched the value.",
          { value: input }
        )
      }
      let input$1 = bitArraySlice(input, 8);
      loop$input = input$1;
      loop$acc = listPrepend(toBitArray([byte]), acc);
      loop$bit_offset = bit_offset;
    } else if (input.bitSize >= 8) {
      let a = input.byteAt(0);
      let byte = $int.bitwise_shift_right(a, bit_offset);
      return listPrepend(toBitArray([byte]), acc);
    } else {
      return acc;
    }
  }
}

function shift_low_bits(bytes, bit_offset) {
  let _pipe = bytes;
  let _pipe$1 = shift_low_bits_loop(_pipe, toList([]), bit_offset);
  let _pipe$2 = $list.reverse(_pipe$1);
  return $bit_array.concat(_pipe$2);
}

export function to_bytes(frame) {
  let _block;
  let $ = frame.fragments;
  if ($.hasLength(1)) {
    let fragment = $.head;
    _block = fragment;
  } else {
    let fragments$1 = $;
    let _pipe = fragments$1;
    let _pipe$1 = $list.reverse(_pipe);
    _block = $bit_array.concat(_pipe$1);
  }
  let bytes = _block;
  let $1 = frame.bit_offset;
  if ($1 === 0) {
    return bytes;
  } else {
    return shift_low_bits(bytes, frame.bit_offset);
  }
}

export function equals(frame, other) {
  return isEqual(to_bytes(frame), to_bytes(other));
}

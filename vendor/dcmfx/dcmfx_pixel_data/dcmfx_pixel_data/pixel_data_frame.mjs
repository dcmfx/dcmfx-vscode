/// <reference types="./pixel_data_frame.d.mts" />
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import {
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  divideInt,
  isEqual,
  toBitArray,
  bitArraySlice,
} from "../gleam.mjs";

class PixelDataFrame extends $CustomType {
  constructor(frame_index, chunks, length_in_bits, bit_offset) {
    super();
    this.frame_index = frame_index;
    this.chunks = chunks;
    this.length_in_bits = length_in_bits;
    this.bit_offset = bit_offset;
  }
}

export function new$() {
  return new PixelDataFrame(new None(), toList([]), 0, 0);
}

export function index(frame) {
  return frame.frame_index;
}

export function set_index(frame, index) {
  let _record = frame;
  return new PixelDataFrame(
    new Some(index),
    _record.chunks,
    _record.length_in_bits,
    _record.bit_offset,
  );
}

export function push_chunk(frame, data) {
  let _record = frame;
  return new PixelDataFrame(
    _record.frame_index,
    listPrepend(data, frame.chunks),
    frame.length_in_bits + $bit_array.bit_size(data),
    _record.bit_offset,
  );
}

export function length_in_bits(frame) {
  return $int.max(0, frame.length_in_bits - frame.bit_offset);
}

export function length(frame) {
  return divideInt((length_in_bits(frame) + 7), 8);
}

export function bit_offset(frame) {
  return frame.bit_offset;
}

export function set_bit_offset(frame, bit_offset) {
  let _record = frame;
  return new PixelDataFrame(
    _record.frame_index,
    _record.chunks,
    _record.length_in_bits,
    bit_offset,
  );
}

export function is_empty(frame) {
  return length_in_bits(frame) === 0;
}

export function chunks(frame) {
  let _pipe = frame.chunks;
  return $list.reverse(_pipe);
}

function do_drop_end_bytes(loop$frame, loop$target_length) {
  while (true) {
    let frame = loop$frame;
    let target_length = loop$target_length;
    let $ = length_in_bits(frame) > target_length;
    if ($) {
      let $1 = frame.chunks;
      if ($1.atLeastLength(1)) {
        let chunk = $1.head;
        let chunks$1 = $1.tail;
        let length_in_bits$1 = length_in_bits(frame) - $bit_array.bit_size(
          chunk,
        );
        let $2 = length_in_bits$1 < target_length;
        if ($2) {
          let chunk_length = target_length - length_in_bits$1;
          if (!(chunk.bitSize >= chunk_length)) {
            throw makeError(
              "let_assert",
              "dcmfx_pixel_data/pixel_data_frame",
              124,
              "do_drop_end_bytes",
              "Pattern match failed, no pattern matched the value.",
              { value: chunk }
            )
          }
          let new_chunk = bitArraySlice(chunk, 0, chunk_length);
          let _record = frame;
          return new PixelDataFrame(
            _record.frame_index,
            listPrepend(new_chunk, chunks$1),
            target_length,
            _record.bit_offset,
          );
        } else {
          let _block;
          let _record = frame;
          _block = new PixelDataFrame(
            _record.frame_index,
            chunks$1,
            length_in_bits$1,
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
  let target_length = $int.max(0, length_in_bits(frame) - count * 8);
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
          184,
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
  let $ = frame.chunks;
  if ($.hasLength(1)) {
    let chunk = $.head;
    _block = chunk;
  } else {
    let chunks$1 = $;
    let _pipe = chunks$1;
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

/// <reference types="./pixel_data_frame.d.mts" />
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import {
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
  toBitArray,
  bitArraySlice,
} from "../gleam.mjs";

const FILEPATH = "src/dcmfx_pixel_data/pixel_data_frame.gleam";

class PixelDataFrame extends $CustomType {
  constructor(frame_index, chunks, length_in_bits, bit_offset) {
    super();
    this.frame_index = frame_index;
    this.chunks = chunks;
    this.length_in_bits = length_in_bits;
    this.bit_offset = bit_offset;
  }
}

/**
 * Creates a new empty frame of pixel data.
 */
export function new$() {
  return new PixelDataFrame(new None(), toList([]), 0, 0);
}

/**
 * Returns the index of this frame, i.e. 0 for the first frame in its DICOM
 * data set, 1 for the second frame, etc. Returns `None` if the frame's index
 * hasn't been set.
 */
export function index(frame) {
  return frame.frame_index;
}

/**
 * Sets the index of this frame.
 */
export function set_index(frame, index) {
  return new PixelDataFrame(
    new Some(index),
    frame.chunks,
    frame.length_in_bits,
    frame.bit_offset,
  );
}

/**
 * Adds the next chunk of pixel data to this frame.
 */
export function push_chunk(frame, data) {
  return new PixelDataFrame(
    frame.frame_index,
    listPrepend(data, frame.chunks),
    frame.length_in_bits + $bit_array.bit_size(data),
    frame.bit_offset,
  );
}

/**
 * The size in bits of this frame of pixel data.
 */
export function length_in_bits(frame) {
  return $int.max(0, frame.length_in_bits - frame.bit_offset);
}

/**
 * The size in bytes of this frame of pixel data.
 */
export function length(frame) {
  return globalThis.Math.trunc((length_in_bits(frame) + 7) / 8);
}

/**
 * Returns the bit offset for this frame.
 *
 * The bit offset is only relevant to native multi-frame pixel data that has
 * a *'(0028,0010) Bits Allocated'* value of 1, where it specifies how many
 * high bits in this frame's first byte should be ignored when reading its
 * data. In all other cases it is zero and is unused.
 */
export function bit_offset(frame) {
  return frame.bit_offset;
}

/**
 * Sets this frame's pixel data bit offset. See `bit_offset()` for details.
 */
export function set_bit_offset(frame, bit_offset) {
  return new PixelDataFrame(
    frame.frame_index,
    frame.chunks,
    frame.length_in_bits,
    bit_offset,
  );
}

/**
 * Returns whether this frame of pixel data is empty.
 */
export function is_empty(frame) {
  return length_in_bits(frame) === 0;
}

/**
 * Returns the chunks of binary data that make up this frame of pixel data.
 */
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
      if ($1 instanceof $Empty) {
        return frame;
      } else {
        let chunk = $1.head;
        let chunks$1 = $1.tail;
        let length_in_bits$1 = length_in_bits(frame) - $bit_array.bit_size(
          chunk,
        );
        let $2 = length_in_bits$1 < target_length;
        if ($2) {
          let chunk_length = target_length - length_in_bits$1;
          let new_chunk;
          if (chunk_length >= 0 && chunk.bitSize >= chunk_length) {
            new_chunk = bitArraySlice(chunk, 0, chunk_length);
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "dcmfx_pixel_data/pixel_data_frame",
              124,
              "do_drop_end_bytes",
              "Pattern match failed, no pattern matched the value.",
              {
                value: chunk,
                start: 3568,
                end: 3632,
                pattern_start: 3579,
                pattern_end: 3624
              }
            )
          }
          return new PixelDataFrame(
            frame.frame_index,
            listPrepend(new_chunk, chunks$1),
            target_length,
            frame.bit_offset,
          );
        } else {
          let _pipe = new PixelDataFrame(
            frame.frame_index,
            chunks$1,
            length_in_bits$1,
            frame.bit_offset,
          );
          loop$frame = _pipe;
          loop$target_length = target_length;
        }
      }
    } else {
      return frame;
    }
  }
}

/**
 * Removes `count` bytes from the end of this frame of pixel data.
 * 
 * @ignore
 */
export function drop_end_bytes(frame, count) {
  let target_length = $int.max(0, length_in_bits(frame) - count * 8);
  return do_drop_end_bytes(frame, target_length);
}

function shift_low_bits_loop(loop$input, loop$acc, loop$bit_offset) {
  while (true) {
    let input = loop$input;
    let acc = loop$acc;
    let bit_offset = loop$bit_offset;
    if (input.bitSize >= 8) {
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
        let input$1;
        if (input.bitSize >= 8) {
          input$1 = bitArraySlice(input, 8);
        } else {
          throw makeError(
            "let_assert",
            FILEPATH,
            "dcmfx_pixel_data/pixel_data_frame",
            184,
            "shift_low_bits_loop",
            "Pattern match failed, no pattern matched the value.",
            {
              value: input,
              start: 5125,
              end: 5161,
              pattern_start: 5136,
              pattern_end: 5153
            }
          )
        }
        loop$input = input$1;
        loop$acc = listPrepend(toBitArray([byte]), acc);
        loop$bit_offset = bit_offset;
      } else {
        let a = input.byteAt(0);
        let byte = $int.bitwise_shift_right(a, bit_offset);
        return listPrepend(toBitArray([byte]), acc);
      }
    } else {
      return acc;
    }
  }
}

/**
 * Shifts the specified number of low bits out of the first byte, and moves
 * everything following it into place such that there are no unused leading
 * bytes.
 * 
 * @ignore
 */
function shift_low_bits(bytes, bit_offset) {
  let _pipe = bytes;
  let _pipe$1 = shift_low_bits_loop(_pipe, toList([]), bit_offset);
  let _pipe$2 = $list.reverse(_pipe$1);
  return $bit_array.concat(_pipe$2);
}

/**
 * Converts this frame of pixel data to a single contiguous bit array. This may
 * require copying the pixel data into a new contiguous buffer, so accessing
 * the individual chunks is preferred when possible.
 */
export function to_bytes(frame) {
  let _block;
  let $ = frame.chunks;
  if ($ instanceof $Empty) {
    let chunks$1 = $;
    let _pipe = chunks$1;
    let _pipe$1 = $list.reverse(_pipe);
    _block = $bit_array.concat(_pipe$1);
  } else {
    let $1 = $.tail;
    if ($1 instanceof $Empty) {
      let chunk = $.head;
      _block = chunk;
    } else {
      let chunks$1 = $;
      let _pipe = chunks$1;
      let _pipe$1 = $list.reverse(_pipe);
      _block = $bit_array.concat(_pipe$1);
    }
  }
  let bytes = _block;
  let $1 = frame.bit_offset;
  if ($1 === 0) {
    return bytes;
  } else {
    return shift_low_bits(bytes, frame.bit_offset);
  }
}

/**
 * Compares two frames of pixel data.
 */
export function equals(frame, other) {
  return isEqual(to_bytes(frame), to_bytes(other));
}

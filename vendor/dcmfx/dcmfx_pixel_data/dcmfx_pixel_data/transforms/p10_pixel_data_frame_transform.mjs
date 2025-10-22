/// <reference types="./p10_pixel_data_frame_transform.d.mts" />
import * as $bigi from "../../../bigi/bigi.mjs";
import * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $data_error from "../../../dcmfx_core/dcmfx_core/data_error.mjs";
import * as $data_set from "../../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $data_set_path from "../../../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $dictionary from "../../../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $bit_array_utils from "../../../dcmfx_core/dcmfx_core/internal/bit_array_utils.mjs";
import * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $p10_error from "../../../dcmfx_p10/dcmfx_p10/p10_error.mjs";
import * as $p10_token from "../../../dcmfx_p10/dcmfx_p10/p10_token.mjs";
import * as $p10_custom_type_transform from "../../../dcmfx_p10/dcmfx_p10/transforms/p10_custom_type_transform.mjs";
import * as $p10_filter_transform from "../../../dcmfx_p10/dcmfx_p10/transforms/p10_filter_transform.mjs";
import * as $deque from "../../../gleam_deque/gleam/deque.mjs";
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $pixel_data_frame from "../../dcmfx_pixel_data/pixel_data_frame.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  remainderInt,
  divideInt,
  isEqual,
  toBitArray,
  bitArraySlice,
  sizedInt,
} from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_pixel_data/transforms/p10_pixel_data_frame_transform.gleam";

class P10PixelDataFrameTransform extends $CustomType {
  constructor(is_encapsulated, details, pixel_data_filter, native_pixel_data_frame_size, pixel_data, pixel_data_write_offset, pixel_data_read_offset, offset_table, next_frame_index) {
    super();
    this.is_encapsulated = is_encapsulated;
    this.details = details;
    this.pixel_data_filter = pixel_data_filter;
    this.native_pixel_data_frame_size = native_pixel_data_frame_size;
    this.pixel_data = pixel_data;
    this.pixel_data_write_offset = pixel_data_write_offset;
    this.pixel_data_read_offset = pixel_data_read_offset;
    this.offset_table = offset_table;
    this.next_frame_index = next_frame_index;
  }
}

class PixelDataFrameTransformDetails extends $CustomType {
  constructor(number_of_frames, rows, columns, bits_allocated, extended_offset_table, extended_offset_table_lengths) {
    super();
    this.number_of_frames = number_of_frames;
    this.rows = rows;
    this.columns = columns;
    this.bits_allocated = bits_allocated;
    this.extended_offset_table = extended_offset_table;
    this.extended_offset_table_lengths = extended_offset_table_lengths;
  }
}

/**
 * An error that occurred when adding a P10 token. This can happen when the
 * stream of DICOM P10 tokens is invalid.
 */
export class P10Error extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const P10PixelDataFrameTransformError$P10Error = ($0) =>
  new P10Error($0);
export const P10PixelDataFrameTransformError$isP10Error = (value) =>
  value instanceof P10Error;
export const P10PixelDataFrameTransformError$P10Error$0 = (value) => value[0];

/**
 * An error that occurred when reading the data from the data elements in the
 * stream of DICOM P10 tokens.
 */
export class DataError extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const P10PixelDataFrameTransformError$DataError = ($0) =>
  new DataError($0);
export const P10PixelDataFrameTransformError$isDataError = (value) =>
  value instanceof DataError;
export const P10PixelDataFrameTransformError$DataError$0 = (value) => value[0];

function pixel_data_frame_transform_details_from_data_set(data_set) {
  let number_of_frames = $data_set.get_int_with_default(
    data_set,
    $dictionary.number_of_frames.tag,
    1,
  );
  return $result.try$(
    number_of_frames,
    (number_of_frames) => {
      let rows = $data_set.get_int(data_set, $dictionary.rows.tag);
      return $result.try$(
        rows,
        (rows) => {
          let columns = $data_set.get_int(data_set, $dictionary.columns.tag);
          return $result.try$(
            columns,
            (columns) => {
              let bits_allocated = $data_set.get_int(
                data_set,
                $dictionary.bits_allocated.tag,
              );
              return $result.try$(
                bits_allocated,
                (bits_allocated) => {
                  let _block;
                  let $ = $data_set.has(
                    data_set,
                    $dictionary.extended_offset_table.tag,
                  );
                  if ($) {
                    let _pipe = $data_set.get_value(
                      data_set,
                      $dictionary.extended_offset_table.tag,
                    );
                    _block = $result.map(
                      _pipe,
                      (var0) => { return new Some(var0); },
                    );
                  } else {
                    _block = new Ok(new None());
                  }
                  let extended_offset_table = _block;
                  return $result.try$(
                    extended_offset_table,
                    (extended_offset_table) => {
                      let _block$1;
                      let $1 = $data_set.has(
                        data_set,
                        $dictionary.extended_offset_table_lengths.tag,
                      );
                      if ($1) {
                        let _pipe = $data_set.get_value(
                          data_set,
                          $dictionary.extended_offset_table_lengths.tag,
                        );
                        _block$1 = $result.map(
                          _pipe,
                          (var0) => { return new Some(var0); },
                        );
                      } else {
                        _block$1 = new Ok(new None());
                      }
                      let extended_offset_table_lengths = _block$1;
                      return $result.try$(
                        extended_offset_table_lengths,
                        (extended_offset_table_lengths) => {
                          return new Ok(
                            new PixelDataFrameTransformDetails(
                              number_of_frames,
                              rows,
                              columns,
                              bits_allocated,
                              extended_offset_table,
                              extended_offset_table_lengths,
                            ),
                          );
                        },
                      );
                    },
                  );
                },
              );
            },
          );
        },
      );
    },
  );
}

/**
 * Creates a new P10 pixel data frame transform to extract frames of pixel data
 * from a stream of DICOM P10 tokens.
 */
export function new$() {
  let details = $p10_custom_type_transform.new$(
    toList([
      $dictionary.number_of_frames.tag,
      $dictionary.rows.tag,
      $dictionary.columns.tag,
      $dictionary.bits_allocated.tag,
      $dictionary.extended_offset_table.tag,
      $dictionary.extended_offset_table_lengths.tag,
    ]),
    pixel_data_frame_transform_details_from_data_set,
  );
  let pixel_data_filter = $p10_filter_transform.new$(
    (tag, _, _1, path) => {
      return (isEqual(tag, $dictionary.pixel_data.tag)) && $data_set_path.is_root(
        path,
      );
    },
  );
  return new P10PixelDataFrameTransform(
    false,
    details,
    pixel_data_filter,
    0,
    $deque.new$(),
    0,
    0,
    new None(),
    0,
  );
}

/**
 * Returns the value for *'(0028,0008) Number of Frames'* data element.
 * 
 * @ignore
 */
function get_number_of_frames(transform) {
  let $ = $p10_custom_type_transform.get_output(transform.details);
  if ($ instanceof Some) {
    let details = $[0];
    return details.number_of_frames;
  } else {
    return 1;
  }
}

function get_pending_native_frame(loop$transform, loop$frame) {
  while (true) {
    let transform = loop$transform;
    let frame = loop$frame;
    let frame_size = transform.native_pixel_data_frame_size;
    let frame_length = $pixel_data_frame.length_in_bits(frame);
    let $ = frame_length < frame_size;
    if ($) {
      let _block;
      let _pipe = transform.pixel_data;
      _block = $deque.pop_front(_pipe);
      let $1 = _block;
      let chunk;
      let chunk_offset;
      let pixel_data;
      if ($1 instanceof Ok) {
        pixel_data = $1[0][1];
        chunk = $1[0][0][0];
        chunk_offset = $1[0][0][1];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_pixel_data/transforms/p10_pixel_data_frame_transform",
          454,
          "get_pending_native_frame",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $1,
            start: 14611,
            end: 14718,
            pattern_start: 14622,
            pattern_end: 14666
          }
        )
      }
      let chunk_length = $bit_array.byte_size(chunk);
      let transform$1 = new P10PixelDataFrameTransform(
        transform.is_encapsulated,
        transform.details,
        transform.pixel_data_filter,
        transform.native_pixel_data_frame_size,
        pixel_data,
        transform.pixel_data_write_offset,
        transform.pixel_data_read_offset,
        transform.offset_table,
        transform.next_frame_index,
      );
      let $2 = (chunk_length * 8 - chunk_offset) <= (frame_size - frame_length);
      if ($2) {
        let fragment;
        if (chunk_offset >= 0 && chunk.bitSize >= chunk_offset) {
          fragment = bitArraySlice(chunk, chunk_offset);
        } else {
          throw makeError(
            "let_assert",
            FILEPATH,
            "dcmfx_pixel_data/transforms/p10_pixel_data_frame_transform",
            464,
            "get_pending_native_frame",
            "Pattern match failed, no pattern matched the value.",
            {
              value: chunk,
              start: 15053,
              end: 15111,
              pattern_start: 15064,
              pattern_end: 15103
            }
          )
        }
        let frame$1 = $pixel_data_frame.push_chunk(frame, fragment);
        let transform$2 = new P10PixelDataFrameTransform(
          transform$1.is_encapsulated,
          transform$1.details,
          transform$1.pixel_data_filter,
          transform$1.native_pixel_data_frame_size,
          pixel_data,
          transform$1.pixel_data_write_offset,
          (transform$1.pixel_data_read_offset + chunk_length * 8) - chunk_offset,
          transform$1.offset_table,
          transform$1.next_frame_index,
        );
        loop$transform = transform$2;
        loop$frame = frame$1;
      } else {
        let length_in_bits = frame_size - frame_length;
        let chunk_offset_in_bytes = globalThis.Math.trunc(chunk_offset / 8);
        let fragment_length_in_bytes = (globalThis.Math.trunc(
          ((chunk_offset + length_in_bits) + 7) / 8
        )) - chunk_offset_in_bytes;
        let fragment;
        if (
          chunk_offset_in_bytes * 8 >= 0 &&
          chunk.bitSize >= chunk_offset_in_bytes * 8 &&
          fragment_length_in_bytes * 8 >= 0 &&
          chunk.bitSize >= chunk_offset_in_bytes * 8 + fragment_length_in_bytes * 8
        ) {
          fragment = bitArraySlice(chunk, chunk_offset_in_bytes * 8, chunk_offset_in_bytes * 8 + fragment_length_in_bytes * 8);
        } else {
          throw makeError(
            "let_assert",
            FILEPATH,
            "dcmfx_pixel_data/transforms/p10_pixel_data_frame_transform",
            488,
            "get_pending_native_frame",
            "Pattern match failed, no pattern matched the value.",
            {
              value: chunk,
              start: 15910,
              end: 16072,
              pattern_start: 15921,
              pattern_end: 16064
            }
          )
        }
        let _block$1;
        let _pipe$1 = frame;
        _block$1 = $pixel_data_frame.push_chunk(_pipe$1, fragment);
        let frame$1 = _block$1;
        let _block$2;
        let _pipe$2 = transform$1.pixel_data;
        _block$2 = $deque.push_front(
          _pipe$2,
          [chunk, chunk_offset + length_in_bits, false],
        );
        let pixel_data$1 = _block$2;
        let transform$2 = new P10PixelDataFrameTransform(
          transform$1.is_encapsulated,
          transform$1.details,
          transform$1.pixel_data_filter,
          transform$1.native_pixel_data_frame_size,
          pixel_data$1,
          transform$1.pixel_data_write_offset,
          transform$1.pixel_data_read_offset + length_in_bits,
          transform$1.offset_table,
          transform$1.next_frame_index,
        );
        return [frame$1, transform$2];
      }
    } else {
      return [frame, transform];
    }
  }
}

/**
 * Consumes the native pixel data for as many frames as possible and returns
 * them.
 * 
 * @ignore
 */
function get_pending_native_frames(loop$transform, loop$frames) {
  while (true) {
    let transform = loop$transform;
    let frames = loop$frames;
    let $ = (transform.pixel_data_write_offset - transform.pixel_data_read_offset) < transform.native_pixel_data_frame_size;
    if ($) {
      return new Ok([$list.reverse(frames), transform]);
    } else {
      let frame_index = transform.next_frame_index;
      let transform$1 = new P10PixelDataFrameTransform(
        transform.is_encapsulated,
        transform.details,
        transform.pixel_data_filter,
        transform.native_pixel_data_frame_size,
        transform.pixel_data,
        transform.pixel_data_write_offset,
        transform.pixel_data_read_offset,
        transform.offset_table,
        frame_index + 1,
      );
      let _block;
      let _pipe = $pixel_data_frame.new$();
      let _pipe$1 = $pixel_data_frame.set_index(_pipe, frame_index);
      _block = $pixel_data_frame.set_bit_offset(
        _pipe$1,
        transform$1.pixel_data_read_offset % 8,
      );
      let frame = _block;
      let $1 = get_pending_native_frame(transform$1, frame);
      let frame$1;
      let transform$2;
      frame$1 = $1[0];
      transform$2 = $1[1];
      let $2 = $pixel_data_frame.index(frame$1);
      let frame_index$1;
      if ($2 instanceof Some) {
        frame_index$1 = $2[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_pixel_data/transforms/p10_pixel_data_frame_transform",
          434,
          "get_pending_native_frames",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $2,
            start: 14025,
            end: 14085,
            pattern_start: 14036,
            pattern_end: 14053
          }
        )
      }
      let _block$1;
      let $3 = frame_index$1 < get_number_of_frames(transform$2);
      if ($3) {
        _block$1 = listPrepend(frame$1, frames);
      } else {
        _block$1 = frames;
      }
      let frames$1 = _block$1;
      loop$transform = transform$2;
      loop$frames = frames$1;
    }
  }
}

function get_pending_encapsulated_frame(
  loop$transform,
  loop$frame,
  loop$next_offset
) {
  while (true) {
    let transform = loop$transform;
    let frame = loop$frame;
    let next_offset = loop$next_offset;
    let $ = transform.pixel_data_read_offset < next_offset;
    if ($) {
      let $1 = $deque.pop_front(transform.pixel_data);
      if ($1 instanceof Ok) {
        let pixel_data = $1[0][1];
        let chunk = $1[0][0][0];
        let is_pixel_data_item_header = $1[0][0][2];
        let _block;
        if (is_pixel_data_item_header) {
          _block = frame;
        } else {
          _block = $pixel_data_frame.push_chunk(frame, chunk);
        }
        let frame$1 = _block;
        let pixel_data_read_offset = transform.pixel_data_read_offset + $bit_array.byte_size(
          chunk,
        ) * 8;
        let transform$1 = new P10PixelDataFrameTransform(
          transform.is_encapsulated,
          transform.details,
          transform.pixel_data_filter,
          transform.native_pixel_data_frame_size,
          pixel_data,
          transform.pixel_data_write_offset,
          pixel_data_read_offset,
          transform.offset_table,
          transform.next_frame_index,
        );
        loop$transform = transform$1;
        loop$frame = frame$1;
        loop$next_offset = next_offset;
      } else {
        return [frame, transform];
      }
    } else {
      return [frame, transform];
    }
  }
}

function apply_length_to_frame(frame, frame_length) {
  let $ = $pixel_data_frame.length(frame);
  let len = $;
  if (len === frame_length) {
    return new Ok(frame);
  } else {
    let len$1 = $;
    if (len$1 > frame_length) {
      return new Ok(
        $pixel_data_frame.drop_end_bytes(frame, len$1 - frame_length),
      );
    } else {
      let _pipe = $data_error.new_value_invalid(
        ((("Extended Offset Table Length value '" + $int.to_string(frame_length)) + "' is invalid for frame of length '") + $int.to_string(
          $pixel_data_frame.length(frame),
        )) + "'",
      );
      return new Error(_pipe);
    }
  }
}

function get_pending_encapsulated_frames_using_offset_table(
  transform,
  offset_table,
  frames
) {
  if (offset_table instanceof $Empty) {
    return new Ok([$list.reverse(frames), transform]);
  } else {
    let $ = offset_table.tail;
    if ($ instanceof $Empty) {
      return new Ok([$list.reverse(frames), transform]);
    } else {
      let frame_length = offset_table.head[1];
      let offset = $.head[0];
      return $bool.guard(
        transform.pixel_data_write_offset < offset * 8,
        new Ok([frames, transform]),
        () => {
          let frame_index = transform.next_frame_index;
          let next_frame_index = frame_index + 1;
          let transform$1 = new P10PixelDataFrameTransform(
            transform.is_encapsulated,
            transform.details,
            transform.pixel_data_filter,
            transform.native_pixel_data_frame_size,
            transform.pixel_data,
            transform.pixel_data_write_offset,
            transform.pixel_data_read_offset,
            transform.offset_table,
            next_frame_index,
          );
          let _block;
          let _pipe = $pixel_data_frame.new$();
          _block = $pixel_data_frame.set_index(_pipe, frame_index);
          let frame = _block;
          let $1 = get_pending_encapsulated_frame(
            transform$1,
            frame,
            offset * 8,
          );
          let frame$1;
          let transform$2;
          frame$1 = $1[0];
          transform$2 = $1[1];
          let $2 = $list.rest(offset_table);
          let offset_table$1;
          if ($2 instanceof Ok) {
            offset_table$1 = $2[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "dcmfx_pixel_data/transforms/p10_pixel_data_frame_transform",
              625,
              "get_pending_encapsulated_frames_using_offset_table",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $2,
                start: 19922,
                end: 19975,
                pattern_start: 19933,
                pattern_end: 19949
              }
            )
          }
          let transform$3 = new P10PixelDataFrameTransform(
            transform$2.is_encapsulated,
            transform$2.details,
            transform$2.pixel_data_filter,
            transform$2.native_pixel_data_frame_size,
            transform$2.pixel_data,
            transform$2.pixel_data_write_offset,
            transform$2.pixel_data_read_offset,
            new Some(offset_table$1),
            transform$2.next_frame_index,
          );
          return $bool.guard(
            transform$3.pixel_data_read_offset !== offset * 8,
            new Error(
              $data_error.new_value_invalid(
                "Pixel data offset table is malformed",
              ),
            ),
            () => {
              let _block$1;
              if (frame_length instanceof Some) {
                let frame_length$1 = frame_length[0];
                _block$1 = apply_length_to_frame(frame$1, frame_length$1);
              } else {
                _block$1 = new Ok(frame$1);
              }
              let frame$2 = _block$1;
              return $result.try$(
                frame$2,
                (frame) => {
                  return get_pending_encapsulated_frames_using_offset_table(
                    transform$3,
                    offset_table$1,
                    listPrepend(frame, frames),
                  );
                },
              );
            },
          );
        },
      );
    }
  }
}

function is_list_sorted(loop$list) {
  while (true) {
    let list = loop$list;
    if (list instanceof $Empty) {
      return true;
    } else {
      let $ = list.tail;
      if ($ instanceof $Empty) {
        return true;
      } else {
        let a = list.head;
        let b = $.head;
        let rest = $.tail;
        let $1 = a <= b;
        if ($1) {
          loop$list = listPrepend(b, rest);
        } else {
          return $1;
        }
      }
    }
  }
}

function read_basic_offset_table(transform) {
  let _block;
  let _pipe = transform.pixel_data;
  let _pipe$1 = $deque.to_list(_pipe);
  let _pipe$2 = $list.filter_map(
    _pipe$1,
    (chunk) => {
      let $ = chunk[2];
      if ($) {
        return new Error(undefined);
      } else {
        return new Ok(chunk[0]);
      }
    },
  );
  _block = $bit_array.concat(_pipe$2);
  let offset_table_data = _block;
  return $bool.guard(
    isEqual(offset_table_data, toBitArray([])),
    new Ok(toList([])),
    () => {
      let _block$1;
      let _pipe$3 = $bit_array_utils.to_uint32_list(offset_table_data);
      _block$1 = $result.map_error(
        _pipe$3,
        (_) => {
          return $data_error.new_value_invalid(
            "Basic Offset Table length is not a multiple of 4",
          );
        },
      );
      let offsets = _block$1;
      return $result.try$(
        offsets,
        (offsets) => {
          return $bool.guard(
            !isEqual($list.first(offsets), new Ok(0)),
            new Error(
              $data_error.new_value_invalid(
                "Basic Offset Table first value must be zero",
              ),
            ),
            () => {
              return $bool.guard(
                !is_list_sorted(offsets),
                new Error(
                  $data_error.new_value_invalid(
                    "Basic Offset Table values are not sorted",
                  ),
                ),
                () => {
                  let _pipe$4 = offsets;
                  let _pipe$5 = $list.map(
                    _pipe$4,
                    (offset) => { return [offset, new None()]; },
                  );
                  return new Ok(_pipe$5);
                },
              );
            },
          );
        },
      );
    },
  );
}

function read_extended_offset_table(transform) {
  let $ = $p10_custom_type_transform.get_output(transform.details);
  if ($ instanceof Some) {
    let $1 = $[0].extended_offset_table;
    if ($1 instanceof Some) {
      let $2 = $[0].extended_offset_table_lengths;
      if ($2 instanceof Some) {
        let extended_offset_table = $1[0];
        let extended_offset_table_lengths = $2[0];
        let _block;
        let _pipe = extended_offset_table;
        let _pipe$1 = $data_element_value.vr_bytes(
          _pipe,
          toList([new $value_representation.OtherVeryLongString()]),
        );
        _block = $result.try$(
          _pipe$1,
          (bytes) => {
            let _pipe$2 = $bit_array_utils.to_uint64_list(bytes);
            return $result.replace_error(
              _pipe$2,
              $data_error.new_value_invalid(
                "Extended Offset Table has invalid size",
              ),
            );
          },
        );
        let extended_offset_table$1 = _block;
        return $result.try$(
          extended_offset_table$1,
          (extended_offset_table) => {
            let _block$1;
            let _pipe$2 = extended_offset_table_lengths;
            let _pipe$3 = $data_element_value.vr_bytes(
              _pipe$2,
              toList([new $value_representation.OtherVeryLongString()]),
            );
            _block$1 = $result.try$(
              _pipe$3,
              (bytes) => {
                let _pipe$4 = $bit_array_utils.to_uint64_list(bytes);
                return $result.replace_error(
                  _pipe$4,
                  $data_error.new_value_invalid(
                    "Extended Offset Table Lengths has invalid size",
                  ),
                );
              },
            );
            let extended_offset_table_lengths$1 = _block$1;
            return $result.try$(
              extended_offset_table_lengths$1,
              (extended_offset_table_lengths) => {
                let _block$2;
                let _pipe$4 = extended_offset_table;
                let _pipe$5 = $list.map(_pipe$4, $bigi.to_int);
                let _pipe$6 = $result.all(_pipe$5);
                _block$2 = $result.replace_error(
                  _pipe$6,
                  $data_error.new_value_invalid(
                    "Extended Offset Table has a value greater than 2^53 - 1",
                  ),
                );
                let extended_offset_table$1 = _block$2;
                return $result.try$(
                  extended_offset_table$1,
                  (extended_offset_table) => {
                    let _block$3;
                    let _pipe$7 = extended_offset_table_lengths;
                    let _pipe$8 = $list.map(_pipe$7, $bigi.to_int);
                    let _pipe$9 = $result.all(_pipe$8);
                    _block$3 = $result.replace_error(
                      _pipe$9,
                      $data_error.new_value_invalid(
                        "Extended Offset Table Lengths has a value greater than 2^53 - 1",
                      ),
                    );
                    let extended_offset_table_lengths$1 = _block$3;
                    return $result.try$(
                      extended_offset_table_lengths$1,
                      (extended_offset_table_lengths) => {
                        return $bool.guard(
                          $list.length(extended_offset_table) !== $list.length(
                            extended_offset_table_lengths,
                          ),
                          new Error(
                            $data_error.new_value_invalid(
                              "Extended Offset Table and Lengths don't have the same number of items",
                            ),
                          ),
                          () => {
                            return $bool.guard(
                              (() => {
                                let _pipe$10 = $list.first(
                                  extended_offset_table,
                                );
                                return $result.unwrap(_pipe$10, 0);
                              })() !== 0,
                              new Error(
                                $data_error.new_value_invalid(
                                  "Extended Offset Table first value must be zero",
                                ),
                              ),
                              () => {
                                return $bool.guard(
                                  !is_list_sorted(extended_offset_table),
                                  new Error(
                                    $data_error.new_value_invalid(
                                      "Extended Offset Table values are not sorted",
                                    ),
                                  ),
                                  () => {
                                    let _pipe$10 = $list.map2(
                                      extended_offset_table,
                                      extended_offset_table_lengths,
                                      (offset, length) => {
                                        return [offset, new Some(length)];
                                      },
                                    );
                                    let _pipe$11 = new Some(_pipe$10);
                                    return new Ok(_pipe$11);
                                  },
                                );
                              },
                            );
                          },
                        );
                      },
                    );
                  },
                );
              },
            );
          },
        );
      } else {
        return new Ok(new None());
      }
    } else {
      return new Ok(new None());
    }
  } else {
    return new Ok(new None());
  }
}

function read_offset_table(transform) {
  return $result.try$(
    read_basic_offset_table(transform),
    (basic_offset_table) => {
      return $result.try$(
        read_extended_offset_table(transform),
        (extended_offset_table) => {
          if (basic_offset_table instanceof $Empty) {
            let _pipe = extended_offset_table;
            let _pipe$1 = $option.unwrap(_pipe, toList([]));
            return new Ok(_pipe$1);
          } else {
            return $bool.guard(
              $option.is_some(extended_offset_table),
              new Error(
                $data_error.new_value_invalid(
                  "Extended Offset Table must be absent when there is a Basic Offset " + "Table",
                ),
              ),
              () => { return new Ok(basic_offset_table); },
            );
          }
        },
      );
    },
  );
}

/**
 * Consumes the encapsulated pixel data for as many frames as possible and
 * returns them.
 * 
 * @ignore
 */
function get_pending_encapsulated_frames(transform) {
  let $ = transform.offset_table;
  if ($ instanceof Some) {
    let offset_table = $[0];
    if (offset_table instanceof $Empty) {
      let number_of_frames = get_number_of_frames(transform);
      let $1 = number_of_frames > 1;
      if ($1) {
        let frame_index = transform.next_frame_index;
        let transform$1 = new P10PixelDataFrameTransform(
          transform.is_encapsulated,
          transform.details,
          transform.pixel_data_filter,
          transform.native_pixel_data_frame_size,
          transform.pixel_data,
          transform.pixel_data_write_offset,
          transform.pixel_data_read_offset,
          transform.offset_table,
          frame_index + 1,
        );
        let _block;
        let _pipe = $pixel_data_frame.new$();
        _block = $pixel_data_frame.set_index(_pipe, frame_index);
        let frame = _block;
        let _block$1;
        let _pipe$1 = transform$1.pixel_data;
        let _pipe$2 = $deque.to_list(_pipe$1);
        _block$1 = $list.fold(
          _pipe$2,
          frame,
          (frame, chunk) => {
            return $bool.guard(
              chunk[2],
              frame,
              () => { return $pixel_data_frame.push_chunk(frame, chunk[0]); },
            );
          },
        );
        let frame$1 = _block$1;
        let transform$2 = new P10PixelDataFrameTransform(
          transform$1.is_encapsulated,
          transform$1.details,
          transform$1.pixel_data_filter,
          transform$1.native_pixel_data_frame_size,
          $deque.new$(),
          transform$1.pixel_data_write_offset,
          transform$1.pixel_data_write_offset,
          transform$1.offset_table,
          transform$1.next_frame_index,
        );
        return new Ok([toList([frame$1]), transform$2]);
      } else {
        return new Ok([toList([]), transform]);
      }
    } else {
      let offset_table$1 = offset_table;
      return get_pending_encapsulated_frames_using_offset_table(
        transform,
        offset_table$1,
        toList([]),
      );
    }
  } else {
    return $result.try$(
      read_offset_table(transform),
      (offset_table) => {
        let transform$1 = new P10PixelDataFrameTransform(
          transform.is_encapsulated,
          transform.details,
          transform.pixel_data_filter,
          transform.native_pixel_data_frame_size,
          $deque.new$(),
          0,
          0,
          new Some(offset_table),
          transform.next_frame_index,
        );
        return new Ok([toList([]), transform$1]);
      },
    );
  }
}

function process_next_pixel_data_token(transform, token) {
  if (token instanceof $p10_token.DataElementHeader) {
    let length = token.length;
    let number_of_frames = get_number_of_frames(transform);
    let $ = number_of_frames > 0;
    if ($) {
      let $1 = $p10_custom_type_transform.get_output(transform.details);
      let details;
      if ($1 instanceof Some) {
        details = $1[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_pixel_data/transforms/p10_pixel_data_frame_transform",
          225,
          "process_next_pixel_data_token",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $1,
            start: 7421,
            end: 7515,
            pattern_start: 7432,
            pattern_end: 7445
          }
        )
      }
      let _block;
      let $2 = details.bits_allocated === 1;
      if ($2) {
        let pixel_count = details.rows * details.columns;
        let expected_length = globalThis.Math.trunc(
          (pixel_count * number_of_frames + 7) / 8
        );
        let $3 = length === expected_length;
        if ($3) {
          _block = new Ok(pixel_count);
        } else {
          _block = new Error(
            $data_error.new_value_invalid(
              ((("Bitmap pixel data has length " + $int.to_string(length)) + " bytes but ") + $int.to_string(
                expected_length,
              )) + " bytes were expected",
            ),
          );
        }
      } else {
        let $3 = remainderInt(length, number_of_frames);
        if ($3 === 0) {
          _block = new Ok((divideInt(length, number_of_frames)) * 8);
        } else {
          _block = new Error(
            $data_error.new_value_invalid(
              ((("Multi-frame pixel data of length " + $int.to_string(length)) + " bytes does not divide evenly into ") + $int.to_string(
                number_of_frames,
              )) + " frames",
            ),
          );
        }
      }
      let native_pixel_data_frame_size = _block;
      return $result.try$(
        native_pixel_data_frame_size,
        (native_pixel_data_frame_size) => {
          return new Ok(
            [
              toList([]),
              new P10PixelDataFrameTransform(
                false,
                transform.details,
                transform.pixel_data_filter,
                native_pixel_data_frame_size,
                transform.pixel_data,
                transform.pixel_data_write_offset,
                transform.pixel_data_read_offset,
                transform.offset_table,
                transform.next_frame_index,
              ),
            ],
          );
        },
      );
    } else {
      return new Ok([toList([]), transform]);
    }
  } else if (token instanceof $p10_token.DataElementValueBytes) {
    let data = token.data;
    let bytes_remaining = token.bytes_remaining;
    let _block;
    let _pipe = transform.pixel_data;
    _block = $deque.push_back(_pipe, [data, 0, false]);
    let pixel_data = _block;
    let pixel_data_write_offset = transform.pixel_data_write_offset + $bit_array.byte_size(
      data,
    ) * 8;
    let transform$1 = new P10PixelDataFrameTransform(
      transform.is_encapsulated,
      transform.details,
      transform.pixel_data_filter,
      transform.native_pixel_data_frame_size,
      pixel_data,
      pixel_data_write_offset,
      transform.pixel_data_read_offset,
      transform.offset_table,
      transform.next_frame_index,
    );
    let $ = transform$1.is_encapsulated;
    if ($) {
      if (bytes_remaining === 0) {
        return get_pending_encapsulated_frames(transform$1);
      } else {
        return new Ok([toList([]), transform$1]);
      }
    } else {
      let $1 = transform$1.native_pixel_data_frame_size > 0;
      if ($1) {
        return get_pending_native_frames(transform$1, toList([]));
      } else {
        return new Ok([toList([]), transform$1]);
      }
    }
  } else if (token instanceof $p10_token.SequenceStart) {
    let transform$1 = new P10PixelDataFrameTransform(
      true,
      transform.details,
      transform.pixel_data_filter,
      transform.native_pixel_data_frame_size,
      transform.pixel_data,
      transform.pixel_data_write_offset,
      transform.pixel_data_read_offset,
      transform.offset_table,
      transform.next_frame_index,
    );
    return new Ok([toList([]), transform$1]);
  } else if (token instanceof $p10_token.SequenceDelimiter) {
    let _block;
    let $ = (() => {
      let _pipe = transform.pixel_data;
      return $deque.is_empty(_pipe);
    })();
    if ($) {
      _block = new Ok(toList([]));
    } else {
      let frame_index = transform.next_frame_index;
      let transform$1 = new P10PixelDataFrameTransform(
        transform.is_encapsulated,
        transform.details,
        transform.pixel_data_filter,
        transform.native_pixel_data_frame_size,
        transform.pixel_data,
        transform.pixel_data_write_offset,
        transform.pixel_data_read_offset,
        transform.offset_table,
        frame_index + 1,
      );
      let _block$1;
      let _pipe = $pixel_data_frame.new$();
      _block$1 = $pixel_data_frame.set_index(_pipe, frame_index);
      let frame = _block$1;
      let _block$2;
      let _pipe$1 = transform$1.pixel_data;
      let _pipe$2 = $deque.to_list(_pipe$1);
      _block$2 = $list.fold(
        _pipe$2,
        frame,
        (frame, pixel_data) => {
          return $bool.guard(
            pixel_data[2],
            frame,
            () => {
              let offset = pixel_data[1];
              let $1 = pixel_data[0];
              let fragment;
              if (offset >= 0 && $1.bitSize >= offset) {
                fragment = bitArraySlice($1, offset);
              } else {
                throw makeError(
                  "let_assert",
                  FILEPATH,
                  "dcmfx_pixel_data/transforms/p10_pixel_data_frame_transform",
                  312,
                  "process_next_pixel_data_token",
                  "Pattern match failed, no pattern matched the value.",
                  {
                    value: $1,
                    start: 10271,
                    end: 10330,
                    pattern_start: 10282,
                    pattern_end: 10315
                  }
                )
              }
              return $pixel_data_frame.push_chunk(frame, fragment);
            },
          );
        },
      );
      let frame$1 = _block$2;
      let _block$3;
      let $1 = transform$1.offset_table;
      if ($1 instanceof Some) {
        let offset_table = $1[0];
        if (offset_table instanceof $Empty) {
          _block$3 = new Ok(frame$1);
        } else {
          let $2 = offset_table.head[1];
          if ($2 instanceof Some) {
            let frame_length = $2[0];
            _block$3 = apply_length_to_frame(frame$1, frame_length);
          } else {
            _block$3 = new Ok(frame$1);
          }
        }
      } else {
        _block$3 = new Ok(frame$1);
      }
      let frame$2 = _block$3;
      _block = $result.map(frame$2, (frame) => { return toList([frame]); });
    }
    let frames = _block;
    return $result.map(frames, (frames) => { return [frames, transform]; });
  } else if (token instanceof $p10_token.PixelDataItem) {
    let data = toBitArray([sizedInt(0, 64, true)]);
    let _block;
    let _pipe = transform.pixel_data;
    _block = $deque.push_back(_pipe, [data, 0, true]);
    let pixel_data = _block;
    let pixel_data_write_offset = transform.pixel_data_write_offset + $bit_array.bit_size(
      data,
    );
    let transform$1 = new P10PixelDataFrameTransform(
      transform.is_encapsulated,
      transform.details,
      transform.pixel_data_filter,
      transform.native_pixel_data_frame_size,
      pixel_data,
      pixel_data_write_offset,
      transform.pixel_data_read_offset,
      transform.offset_table,
      transform.next_frame_index,
    );
    return new Ok([toList([]), transform$1]);
  } else {
    return new Ok([toList([]), transform]);
  }
}

/**
 * Adds the next DICOM P10 token, returning any frames of pixel data that are
 * now available.
 */
export function add_token(transform, token) {
  let _block;
  let _pipe = $p10_custom_type_transform.add_token(transform.details, token);
  _block = $result.map_error(
    _pipe,
    (e) => {
      if (e instanceof $p10_custom_type_transform.P10Error) {
        let e$1 = e[0];
        return new P10Error(e$1);
      } else {
        let e$1 = e[0];
        return new DataError(e$1);
      }
    },
  );
  let details = _block;
  return $result.try$(
    details,
    (details) => {
      let transform$1 = new P10PixelDataFrameTransform(
        transform.is_encapsulated,
        details,
        transform.pixel_data_filter,
        transform.native_pixel_data_frame_size,
        transform.pixel_data,
        transform.pixel_data_write_offset,
        transform.pixel_data_read_offset,
        transform.offset_table,
        transform.next_frame_index,
      );
      return $bool.guard(
        $p10_token.is_header_token(token),
        new Ok([toList([]), transform$1]),
        () => {
          let _block$1;
          let _pipe$1 = $p10_filter_transform.add_token(
            transform$1.pixel_data_filter,
            token,
          );
          _block$1 = $result.map_error(
            _pipe$1,
            (var0) => { return new P10Error(var0); },
          );
          let add_token_result = _block$1;
          return $result.try$(
            add_token_result,
            (_use0) => {
              let is_pixel_data_token;
              let pixel_data_filter;
              is_pixel_data_token = _use0[0];
              pixel_data_filter = _use0[1];
              let transform$2 = new P10PixelDataFrameTransform(
                transform$1.is_encapsulated,
                transform$1.details,
                pixel_data_filter,
                transform$1.native_pixel_data_frame_size,
                transform$1.pixel_data,
                transform$1.pixel_data_write_offset,
                transform$1.pixel_data_read_offset,
                transform$1.offset_table,
                transform$1.next_frame_index,
              );
              return $bool.guard(
                !is_pixel_data_token,
                new Ok([toList([]), transform$2]),
                () => {
                  let _pipe$2 = process_next_pixel_data_token(
                    transform$2,
                    token,
                  );
                  return $result.map_error(
                    _pipe$2,
                    (var0) => { return new DataError(var0); },
                  );
                },
              );
            },
          );
        },
      );
    },
  );
}

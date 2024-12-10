/// <reference types="./bit_array_utils.d.mts" />
import * as $bigi from "../../../bigi/bigi.mjs";
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $ieee_float from "../../../ieee_float/ieee_float.mjs";
import {
  Ok,
  Error,
  toList,
  prepend as listPrepend,
  remainderInt,
  divideInt,
  toBitArray,
} from "../../gleam.mjs";

export function to_int16(bytes) {
  if (bytes.length == 2) {
    let value = bytes.intFromSlice(0, 2, false, true);
    return new Ok(value);
  } else {
    return new Error(undefined);
  }
}

export function to_uint16(bytes) {
  if (bytes.length == 2) {
    let value = bytes.intFromSlice(0, 2, false, false);
    return new Ok(value);
  } else {
    return new Error(undefined);
  }
}

export function to_int32(bytes) {
  if (bytes.length == 4) {
    let value = bytes.intFromSlice(0, 4, false, true);
    return new Ok(value);
  } else {
    return new Error(undefined);
  }
}

export function to_uint32(bytes) {
  if (bytes.length == 4) {
    let value = bytes.intFromSlice(0, 4, false, false);
    return new Ok(value);
  } else {
    return new Error(undefined);
  }
}

export function to_int64(bytes) {
  let $ = $bit_array.byte_size(bytes);
  if ($ === 8) {
    return $bigi.from_bytes(bytes, new $bigi.LittleEndian(), new $bigi.Signed());
  } else {
    return new Error(undefined);
  }
}

export function to_uint64(bytes) {
  let $ = $bit_array.byte_size(bytes);
  if ($ === 8) {
    return $bigi.from_bytes(
      bytes,
      new $bigi.LittleEndian(),
      new $bigi.Unsigned(),
    );
  } else {
    return new Error(undefined);
  }
}

export function to_float32(bytes) {
  return new Ok($ieee_float.from_bytes_32_le(bytes));
}

export function to_float64(bytes) {
  return new Ok($ieee_float.from_bytes_64_le(bytes));
}

function do_to_list(
  loop$bytes,
  loop$item_size,
  loop$read_item,
  loop$i,
  loop$item_count,
  loop$acc
) {
  while (true) {
    let bytes = loop$bytes;
    let item_size = loop$item_size;
    let read_item = loop$read_item;
    let i = loop$i;
    let item_count = loop$item_count;
    let acc = loop$acc;
    if (i === -1) {
      return new Ok(acc);
    } else {
      let item = (() => {
        let _pipe = bytes;
        let _pipe$1 = $bit_array.slice(_pipe, i * item_size, item_size);
        return $result.try$(_pipe$1, read_item);
      })();
      if (item.isOk()) {
        let item$1 = item[0];
        loop$bytes = bytes;
        loop$item_size = item_size;
        loop$read_item = read_item;
        loop$i = i - 1;
        loop$item_count = item_count;
        loop$acc = listPrepend(item$1, acc);
      } else {
        return new Error(undefined);
      }
    }
  }
}

function to_list(bytes, item_size, read_item) {
  let byte_count = $bit_array.byte_size(bytes);
  let $ = remainderInt(byte_count, item_size);
  if ($ === 0) {
    let item_count = divideInt(byte_count, item_size);
    return do_to_list(
      bytes,
      item_size,
      read_item,
      item_count - 1,
      item_count,
      toList([]),
    );
  } else {
    return new Error(undefined);
  }
}

export function to_int16_list(bytes) {
  return to_list(bytes, 2, to_int16);
}

export function to_uint16_list(bytes) {
  return to_list(bytes, 2, to_uint16);
}

export function to_int32_list(bytes) {
  return to_list(bytes, 4, to_int32);
}

export function to_uint32_list(bytes) {
  return to_list(bytes, 4, to_uint32);
}

export function to_int64_list(bytes) {
  return to_list(bytes, 8, to_int64);
}

export function to_uint64_list(bytes) {
  return to_list(bytes, 8, to_uint64);
}

export function to_float32_list(bytes) {
  return to_list(bytes, 4, to_float32);
}

export function to_float64_list(bytes) {
  return to_list(bytes, 8, to_float64);
}

export function pad_to_even_length(bytes, padding_byte) {
  let $ = $int.is_odd($bit_array.byte_size(bytes));
  if ($) {
    return $bit_array.concat(toList([bytes, toBitArray([padding_byte])]));
  } else {
    return bytes;
  }
}

function do_reverse_index(loop$bytes, loop$predicate, loop$index) {
  while (true) {
    let bytes = loop$bytes;
    let predicate = loop$predicate;
    let index = loop$index;
    let $ = $bit_array.slice(bytes, index, 1);
    if ($.isOk() && $[0].length == 1) {
      let final_byte = $[0].byteAt(0);
      let $1 = predicate(final_byte);
      if ($1) {
        return new Ok(index);
      } else {
        if (index === 0) {
          return new Error(undefined);
        } else {
          loop$bytes = bytes;
          loop$predicate = predicate;
          loop$index = index - 1;
        }
      }
    } else {
      return new Error(undefined);
    }
  }
}

export function reverse_index(bytes, predicate) {
  let index = $bit_array.byte_size(bytes) - 1;
  return do_reverse_index(bytes, predicate, index);
}

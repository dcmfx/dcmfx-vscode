/// <reference types="./data_element_value.d.mts" />
import * as $bigi from "../../bigi/bigi.mjs";
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../gleam_stdlib/gleam/bool.mjs";
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $ieee_float from "../../ieee_float/ieee_float.mjs";
import * as $code_strings from "../dcmfx_core/code_strings.mjs";
import * as $data_element_tag from "../dcmfx_core/data_element_tag.mjs";
import * as $age_string from "../dcmfx_core/data_element_value/age_string.mjs";
import * as $attribute_tag from "../dcmfx_core/data_element_value/attribute_tag.mjs";
import * as $date from "../dcmfx_core/data_element_value/date.mjs";
import * as $date_time from "../dcmfx_core/data_element_value/date_time.mjs";
import * as $decimal_string from "../dcmfx_core/data_element_value/decimal_string.mjs";
import * as $integer_string from "../dcmfx_core/data_element_value/integer_string.mjs";
import * as $person_name from "../dcmfx_core/data_element_value/person_name.mjs";
import * as $time from "../dcmfx_core/data_element_value/time.mjs";
import * as $unique_identifier from "../dcmfx_core/data_element_value/unique_identifier.mjs";
import * as $data_error from "../dcmfx_core/data_error.mjs";
import * as $dictionary from "../dcmfx_core/dictionary.mjs";
import * as $bit_array_utils from "../dcmfx_core/internal/bit_array_utils.mjs";
import * as $utils from "../dcmfx_core/internal/utils.mjs";
import * as $value_representation from "../dcmfx_core/value_representation.mjs";
import {
  Ok,
  Error,
  toList,
  CustomType as $CustomType,
  makeError,
  remainderInt,
  divideInt,
  toBitArray,
  sizedInt,
} from "../gleam.mjs";

class BinaryValue extends $CustomType {
  constructor(vr, bytes) {
    super();
    this.vr = vr;
    this.bytes = bytes;
  }
}

class LookupTableDescriptorValue extends $CustomType {
  constructor(vr, bytes) {
    super();
    this.vr = vr;
    this.bytes = bytes;
  }
}

class EncapsulatedPixelDataValue extends $CustomType {
  constructor(vr, items) {
    super();
    this.vr = vr;
    this.items = items;
  }
}

class SequenceValue extends $CustomType {
  constructor(items) {
    super();
    this.items = items;
  }
}

function validate_default_charset_bytes(loop$bytes) {
  while (true) {
    let bytes = loop$bytes;
    if (bytes.length >= 1 &&
    (((((((bytes.byteAt(0) !== 0x0) && (bytes.byteAt(0) !== 0x9)) && (bytes.byteAt(0) !== 0xA)) && (bytes.byteAt(0) !== 0xC)) && (bytes.byteAt(0) !== 0xD)) && (bytes.byteAt(0) !== 0x1B)) && ((bytes.byteAt(0) < 0x20) || (bytes.byteAt(0) > 0x7E)))) {
      let b = bytes.byteAt(0);
      return new Error(b);
    } else if (bytes.length >= 1) {
      let rest = bytes.sliceAfter(1);
      loop$bytes = rest;
    } else {
      return new Ok(undefined);
    }
  }
}

export function new_binary_unchecked(vr, bytes) {
  return new BinaryValue(vr, bytes);
}

export function new_lookup_table_descriptor_unchecked(vr, bytes) {
  return new LookupTableDescriptorValue(vr, bytes);
}

export function new_encapsulated_pixel_data_unchecked(vr, items) {
  return new EncapsulatedPixelDataValue(vr, items);
}

export function new_sequence(items) {
  return new SequenceValue(items);
}

export function value_representation(value) {
  if (value instanceof BinaryValue) {
    let vr = value.vr;
    return vr;
  } else if (value instanceof LookupTableDescriptorValue) {
    let vr = value.vr;
    return vr;
  } else if (value instanceof EncapsulatedPixelDataValue) {
    let vr = value.vr;
    return vr;
  } else {
    return new $value_representation.Sequence();
  }
}

export function new_age_string(value) {
  let _pipe = value;
  let _pipe$1 = $age_string.to_bytes(_pipe);
  return $result.map(
    _pipe$1,
    (_capture) => {
      return new_binary_unchecked(
        new $value_representation.AgeString(),
        _capture,
      );
    },
  );
}

export function new_date(value) {
  let _pipe = value;
  let _pipe$1 = $date.to_bytes(_pipe);
  return $result.map(
    _pipe$1,
    (_capture) => {
      return new_binary_unchecked(new $value_representation.Date(), _capture);
    },
  );
}

export function new_date_time(value) {
  let _pipe = value;
  let _pipe$1 = $date_time.to_bytes(_pipe);
  return $result.map(
    _pipe$1,
    (_capture) => {
      return new_binary_unchecked(
        new $value_representation.DateTime(),
        _capture,
      );
    },
  );
}

export function new_time(value) {
  let _pipe = value;
  let _pipe$1 = $time.to_bytes(_pipe);
  return $result.map(
    _pipe$1,
    (_capture) => {
      return new_binary_unchecked(new $value_representation.Time(), _capture);
    },
  );
}

export function bytes(value) {
  if (value instanceof BinaryValue) {
    let bytes$1 = value.bytes;
    return new Ok(bytes$1);
  } else if (value instanceof LookupTableDescriptorValue) {
    let bytes$1 = value.bytes;
    return new Ok(bytes$1);
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

export function encapsulated_pixel_data(value) {
  if (value instanceof EncapsulatedPixelDataValue) {
    let items = value.items;
    return new Ok(items);
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

export function sequence_items(value) {
  if (value instanceof SequenceValue) {
    let items = value.items;
    return new Ok(items);
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

export function total_byte_size(value) {
  let data_size = (() => {
    if (value instanceof BinaryValue) {
      let bytes$1 = value.bytes;
      return $bit_array.byte_size(bytes$1);
    } else if (value instanceof LookupTableDescriptorValue) {
      let bytes$1 = value.bytes;
      return $bit_array.byte_size(bytes$1);
    } else if (value instanceof EncapsulatedPixelDataValue) {
      let items = value.items;
      return $list.length(items) * 8 + $list.fold(
        items,
        0,
        (total, item) => { return total + $bit_array.byte_size(item); },
      );
    } else {
      let items = value.items;
      let _pipe = items;
      let _pipe$1 = $list.map(
        _pipe,
        (item) => {
          let _pipe$1 = item;
          return $dict.fold(
            _pipe$1,
            0,
            (total, _, value) => { return total + total_byte_size(value); },
          );
        },
      );
      return $int.sum(_pipe$1);
    }
  })();
  let fixed_size = 32;
  return data_size + fixed_size;
}

export function get_strings(value) {
  if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.CodeString) {
    let bytes$1 = value.bytes;
    let _pipe = bytes$1;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    let _pipe$3 = $result.map(
      _pipe$2,
      (_capture) => { return $string.split(_capture, "\\"); },
    );
    return $result.map(
      _pipe$3,
      (_capture) => {
        return $list.map(
          _capture,
          (_capture) => {
            return $utils.trim_end_codepoints(_capture, toList([0x0, 0x20]));
          },
        );
      },
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.UniqueIdentifier) {
    let bytes$1 = value.bytes;
    let _pipe = bytes$1;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    let _pipe$3 = $result.map(
      _pipe$2,
      (_capture) => { return $string.split(_capture, "\\"); },
    );
    return $result.map(
      _pipe$3,
      (_capture) => {
        return $list.map(
          _capture,
          (_capture) => {
            return $utils.trim_end_codepoints(_capture, toList([0x0, 0x20]));
          },
        );
      },
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.LongString) {
    let bytes$1 = value.bytes;
    let _pipe = bytes$1;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    let _pipe$3 = $result.map(
      _pipe$2,
      (_capture) => { return $string.split(_capture, "\\"); },
    );
    return $result.map(
      _pipe$3,
      (_capture) => {
        return $list.map(
          _capture,
          (_capture) => {
            return $utils.trim_end_codepoints(_capture, toList([0x0, 0x20]));
          },
        );
      },
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.ShortString) {
    let bytes$1 = value.bytes;
    let _pipe = bytes$1;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    let _pipe$3 = $result.map(
      _pipe$2,
      (_capture) => { return $string.split(_capture, "\\"); },
    );
    return $result.map(
      _pipe$3,
      (_capture) => {
        return $list.map(
          _capture,
          (_capture) => {
            return $utils.trim_end_codepoints(_capture, toList([0x0, 0x20]));
          },
        );
      },
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.UnlimitedCharacters) {
    let bytes$1 = value.bytes;
    let _pipe = bytes$1;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    let _pipe$3 = $result.map(
      _pipe$2,
      (_capture) => { return $string.split(_capture, "\\"); },
    );
    return $result.map(
      _pipe$3,
      (_capture) => {
        return $list.map(
          _capture,
          (_capture) => {
            return $utils.trim_end_codepoints(_capture, toList([0x0, 0x20]));
          },
        );
      },
    );
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

export function get_string(value) {
  if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.ApplicationEntity) {
    let bytes$1 = value.bytes;
    let _pipe = bytes$1;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    return $result.map(
      _pipe$2,
      (_capture) => {
        return $utils.trim_end_codepoints(_capture, toList([0x0, 0x20]));
      },
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.LongText) {
    let bytes$1 = value.bytes;
    let _pipe = bytes$1;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    return $result.map(
      _pipe$2,
      (_capture) => {
        return $utils.trim_end_codepoints(_capture, toList([0x0, 0x20]));
      },
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.ShortText) {
    let bytes$1 = value.bytes;
    let _pipe = bytes$1;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    return $result.map(
      _pipe$2,
      (_capture) => {
        return $utils.trim_end_codepoints(_capture, toList([0x0, 0x20]));
      },
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.UniversalResourceIdentifier) {
    let bytes$1 = value.bytes;
    let _pipe = bytes$1;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    return $result.map(
      _pipe$2,
      (_capture) => {
        return $utils.trim_end_codepoints(_capture, toList([0x0, 0x20]));
      },
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.UnlimitedText) {
    let bytes$1 = value.bytes;
    let _pipe = bytes$1;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    return $result.map(
      _pipe$2,
      (_capture) => {
        return $utils.trim_end_codepoints(_capture, toList([0x0, 0x20]));
      },
    );
  } else {
    return $result.try$(
      get_strings(value),
      (strings) => {
        if (strings.hasLength(1)) {
          let s = strings.head;
          return new Ok(s);
        } else {
          return new Error($data_error.new_multiplicity_mismatch());
        }
      },
    );
  }
}

export function get_ints(value) {
  if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.IntegerString) {
    let bytes$1 = value.bytes;
    return $integer_string.from_bytes(bytes$1);
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.SignedLong) {
    let bytes$1 = value.bytes;
    let _pipe = $bit_array_utils.to_int32_list(bytes$1);
    return $result.replace_error(
      _pipe,
      $data_error.new_value_invalid("Invalid Int32 list"),
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.SignedShort) {
    let bytes$1 = value.bytes;
    let _pipe = $bit_array_utils.to_int16_list(bytes$1);
    return $result.replace_error(
      _pipe,
      $data_error.new_value_invalid("Invalid Int16 list"),
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.UnsignedLong) {
    let bytes$1 = value.bytes;
    let _pipe = $bit_array_utils.to_uint32_list(bytes$1);
    return $result.replace_error(
      _pipe,
      $data_error.new_value_invalid("Invalid Uint32 list"),
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.UnsignedShort) {
    let bytes$1 = value.bytes;
    let _pipe = $bit_array_utils.to_uint16_list(bytes$1);
    return $result.replace_error(
      _pipe,
      $data_error.new_value_invalid("Invalid Uint16 list"),
    );
  } else if (value instanceof LookupTableDescriptorValue) {
    let vr = value.vr;
    let bytes$1 = value.bytes;
    if (vr instanceof $value_representation.SignedShort && bytes$1.length == 6) {
      let entry_count = bytes$1.intFromSlice(0, 2, false, false);
      let first_input_value = bytes$1.intFromSlice(2, 4, false, true);
      let bits_per_entry = bytes$1.intFromSlice(4, 6, false, false);
      return new Ok(toList([entry_count, first_input_value, bits_per_entry]));
    } else if (vr instanceof $value_representation.UnsignedShort &&
    bytes$1.length == 6) {
      let entry_count = bytes$1.intFromSlice(0, 2, false, false);
      let first_input_value = bytes$1.intFromSlice(2, 4, false, false);
      let bits_per_entry = bytes$1.intFromSlice(4, 6, false, false);
      return new Ok(toList([entry_count, first_input_value, bits_per_entry]));
    } else {
      return new Error(
        $data_error.new_value_invalid("Invalid lookup table descriptor"),
      );
    }
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

export function get_int(value) {
  return $result.try$(
    get_ints(value),
    (ints) => {
      if (ints.hasLength(1)) {
        let i = ints.head;
        return new Ok(i);
      } else {
        return new Error($data_error.new_multiplicity_mismatch());
      }
    },
  );
}

export function get_big_ints(value) {
  if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.SignedVeryLong) {
    let bytes$1 = value.bytes;
    let _pipe = $bit_array_utils.to_int64_list(bytes$1);
    return $result.replace_error(
      _pipe,
      $data_error.new_value_invalid("Invalid Int64 list"),
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.UnsignedVeryLong) {
    let bytes$1 = value.bytes;
    let _pipe = bytes$1;
    let _pipe$1 = $bit_array_utils.to_uint64_list(_pipe);
    return $result.replace_error(
      _pipe$1,
      $data_error.new_value_invalid("Invalid Uint64 list"),
    );
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

export function get_big_int(value) {
  return $result.try$(
    get_big_ints(value),
    (ints) => {
      if (ints.hasLength(1)) {
        let i = ints.head;
        return new Ok(i);
      } else {
        return new Error($data_error.new_multiplicity_mismatch());
      }
    },
  );
}

export function get_floats(value) {
  if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.DecimalString) {
    let bytes$1 = value.bytes;
    let _pipe = bytes$1;
    let _pipe$1 = $decimal_string.from_bytes(_pipe);
    return $result.map(
      _pipe$1,
      (_capture) => { return $list.map(_capture, $ieee_float.finite); },
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.FloatingPointDouble) {
    let bytes$1 = value.bytes;
    let _pipe = $bit_array_utils.to_float64_list(bytes$1);
    return $result.replace_error(
      _pipe,
      $data_error.new_value_invalid("Invalid Float64 list"),
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.OtherDoubleString) {
    let bytes$1 = value.bytes;
    let _pipe = $bit_array_utils.to_float64_list(bytes$1);
    return $result.replace_error(
      _pipe,
      $data_error.new_value_invalid("Invalid Float64 list"),
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.FloatingPointSingle) {
    let bytes$1 = value.bytes;
    let _pipe = $bit_array_utils.to_float32_list(bytes$1);
    return $result.replace_error(
      _pipe,
      $data_error.new_value_invalid("Invalid Float32 list"),
    );
  } else if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.OtherFloatString) {
    let bytes$1 = value.bytes;
    let _pipe = $bit_array_utils.to_float32_list(bytes$1);
    return $result.replace_error(
      _pipe,
      $data_error.new_value_invalid("Invalid Float32 list"),
    );
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

export function to_string(value, tag, output_width) {
  let output_list_max_size = divideInt((output_width + 2), 3);
  let vr_is_string = $value_representation.is_string(
    value_representation(value),
  );
  let _pipe = (() => {
    if (value instanceof BinaryValue && (vr_is_string)) {
      let vr = value.vr;
      let bytes$1 = value.bytes;
      let utf8 = (() => {
        let $ = $bit_array.to_string(bytes$1);
        if ($.isOk()) {
          let utf8 = $[0];
          return new Ok(utf8);
        } else {
          let _pipe = $bit_array_utils.reverse_index(
            bytes$1,
            (b) => { return $int.bitwise_and(b, 0b1100_0000) !== 0b1000_0000; },
          );
          let _pipe$1 = $result.try$(
            _pipe,
            (_capture) => { return $bit_array.slice(bytes$1, 0, _capture); },
          );
          return $result.try$(_pipe$1, $bit_array.to_string);
        }
      })();
      if (utf8.isOk()) {
        let value$1 = utf8[0];
        let formatted_value = (() => {
          if (vr instanceof $value_representation.AgeString) {
            let _pipe = value$1;
            let _pipe$1 = $bit_array.from_string(_pipe);
            let _pipe$2 = $age_string.from_bytes(_pipe$1);
            let _pipe$3 = $result.map(_pipe$2, $age_string.to_string);
            return $result.lazy_unwrap(
              _pipe$3,
              () => { return $string.inspect(value$1); },
            );
          } else if (vr instanceof $value_representation.ApplicationEntity) {
            let _pipe = value$1;
            let _pipe$1 = $utils.trim_end_codepoints(_pipe, toList([0x20]));
            return $string.inspect(_pipe$1);
          } else if (vr instanceof $value_representation.Date) {
            let _pipe = value$1;
            let _pipe$1 = $bit_array.from_string(_pipe);
            let _pipe$2 = $date.from_bytes(_pipe$1);
            let _pipe$3 = $result.map(_pipe$2, $date.to_iso8601);
            return $result.lazy_unwrap(
              _pipe$3,
              () => { return $string.inspect(value$1); },
            );
          } else if (vr instanceof $value_representation.DateTime) {
            let _pipe = value$1;
            let _pipe$1 = $bit_array.from_string(_pipe);
            let _pipe$2 = $date_time.from_bytes(_pipe$1);
            let _pipe$3 = $result.map(_pipe$2, $date_time.to_iso8601);
            return $result.lazy_unwrap(
              _pipe$3,
              () => { return $string.inspect(value$1); },
            );
          } else if (vr instanceof $value_representation.Time) {
            let _pipe = value$1;
            let _pipe$1 = $bit_array.from_string(_pipe);
            let _pipe$2 = $time.from_bytes(_pipe$1);
            let _pipe$3 = $result.map(_pipe$2, $time.to_iso8601);
            return $result.lazy_unwrap(
              _pipe$3,
              () => { return $string.inspect(value$1); },
            );
          } else if (vr instanceof $value_representation.CodeString) {
            let _pipe = value$1;
            let _pipe$1 = $string.split(_pipe, "\\");
            let _pipe$2 = $list.map(
              _pipe$1,
              (s) => {
                if (vr instanceof $value_representation.UniqueIdentifier) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x0]),
                  );
                  return $string.inspect(_pipe$3);
                } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x20]),
                  );
                  return $string.inspect(_pipe$3);
                } else {
                  let _pipe$2 = s;
                  let _pipe$3 = $string.trim(_pipe$2);
                  return $string.inspect(_pipe$3);
                }
              },
            );
            return $string.join(_pipe$2, ", ");
          } else if (vr instanceof $value_representation.DecimalString) {
            let _pipe = value$1;
            let _pipe$1 = $string.split(_pipe, "\\");
            let _pipe$2 = $list.map(
              _pipe$1,
              (s) => {
                if (vr instanceof $value_representation.UniqueIdentifier) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x0]),
                  );
                  return $string.inspect(_pipe$3);
                } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x20]),
                  );
                  return $string.inspect(_pipe$3);
                } else {
                  let _pipe$2 = s;
                  let _pipe$3 = $string.trim(_pipe$2);
                  return $string.inspect(_pipe$3);
                }
              },
            );
            return $string.join(_pipe$2, ", ");
          } else if (vr instanceof $value_representation.UniqueIdentifier) {
            let _pipe = value$1;
            let _pipe$1 = $string.split(_pipe, "\\");
            let _pipe$2 = $list.map(
              _pipe$1,
              (s) => {
                if (vr instanceof $value_representation.UniqueIdentifier) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x0]),
                  );
                  return $string.inspect(_pipe$3);
                } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x20]),
                  );
                  return $string.inspect(_pipe$3);
                } else {
                  let _pipe$2 = s;
                  let _pipe$3 = $string.trim(_pipe$2);
                  return $string.inspect(_pipe$3);
                }
              },
            );
            return $string.join(_pipe$2, ", ");
          } else if (vr instanceof $value_representation.IntegerString) {
            let _pipe = value$1;
            let _pipe$1 = $string.split(_pipe, "\\");
            let _pipe$2 = $list.map(
              _pipe$1,
              (s) => {
                if (vr instanceof $value_representation.UniqueIdentifier) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x0]),
                  );
                  return $string.inspect(_pipe$3);
                } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x20]),
                  );
                  return $string.inspect(_pipe$3);
                } else {
                  let _pipe$2 = s;
                  let _pipe$3 = $string.trim(_pipe$2);
                  return $string.inspect(_pipe$3);
                }
              },
            );
            return $string.join(_pipe$2, ", ");
          } else if (vr instanceof $value_representation.LongString) {
            let _pipe = value$1;
            let _pipe$1 = $string.split(_pipe, "\\");
            let _pipe$2 = $list.map(
              _pipe$1,
              (s) => {
                if (vr instanceof $value_representation.UniqueIdentifier) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x0]),
                  );
                  return $string.inspect(_pipe$3);
                } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x20]),
                  );
                  return $string.inspect(_pipe$3);
                } else {
                  let _pipe$2 = s;
                  let _pipe$3 = $string.trim(_pipe$2);
                  return $string.inspect(_pipe$3);
                }
              },
            );
            return $string.join(_pipe$2, ", ");
          } else if (vr instanceof $value_representation.ShortString) {
            let _pipe = value$1;
            let _pipe$1 = $string.split(_pipe, "\\");
            let _pipe$2 = $list.map(
              _pipe$1,
              (s) => {
                if (vr instanceof $value_representation.UniqueIdentifier) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x0]),
                  );
                  return $string.inspect(_pipe$3);
                } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x20]),
                  );
                  return $string.inspect(_pipe$3);
                } else {
                  let _pipe$2 = s;
                  let _pipe$3 = $string.trim(_pipe$2);
                  return $string.inspect(_pipe$3);
                }
              },
            );
            return $string.join(_pipe$2, ", ");
          } else if (vr instanceof $value_representation.UnlimitedCharacters) {
            let _pipe = value$1;
            let _pipe$1 = $string.split(_pipe, "\\");
            let _pipe$2 = $list.map(
              _pipe$1,
              (s) => {
                if (vr instanceof $value_representation.UniqueIdentifier) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x0]),
                  );
                  return $string.inspect(_pipe$3);
                } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                  let _pipe$2 = s;
                  let _pipe$3 = $utils.trim_end_codepoints(
                    _pipe$2,
                    toList([0x20]),
                  );
                  return $string.inspect(_pipe$3);
                } else {
                  let _pipe$2 = s;
                  let _pipe$3 = $string.trim(_pipe$2);
                  return $string.inspect(_pipe$3);
                }
              },
            );
            return $string.join(_pipe$2, ", ");
          } else {
            let _pipe = value$1;
            let _pipe$1 = $utils.trim_end_codepoints(_pipe, toList([0x20]));
            return $string.inspect(_pipe$1);
          }
        })();
        let suffix = (() => {
          if (vr instanceof $value_representation.UniqueIdentifier) {
            let $ = $dictionary.uid_name($utils.trim_end_whitespace(value$1));
            if ($.isOk()) {
              let uid_name = $[0];
              return new Some((" (" + uid_name) + ")");
            } else {
              return new None();
            }
          } else if (vr instanceof $value_representation.CodeString) {
            let $ = $code_strings.describe($string.trim(value$1), tag);
            if ($.isOk()) {
              let description = $[0];
              return new Some((" (" + description) + ")");
            } else {
              return new None();
            }
          } else {
            return new None();
          }
        })();
        return new Ok([formatted_value, suffix]);
      } else {
        return new Ok(["!! Invalid UTF-8 data", new None()]);
      }
    } else if (value instanceof LookupTableDescriptorValue) {
      let vr = value.vr;
      let bytes$1 = value.bytes;
      if (vr instanceof $value_representation.AttributeTag) {
        let $ = $attribute_tag.from_bytes(bytes$1);
        if ($.isOk()) {
          let tags = $[0];
          let s = (() => {
            let _pipe = tags;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $data_element_tag.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.FloatingPointDouble) {
        let $ = get_floats(value);
        if ($.isOk()) {
          let floats = $[0];
          let s = (() => {
            let _pipe = floats;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $ieee_float.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.FloatingPointSingle) {
        let $ = get_floats(value);
        if ($.isOk()) {
          let floats = $[0];
          let s = (() => {
            let _pipe = floats;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $ieee_float.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.OtherByteString) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.OtherDoubleString) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.OtherFloatString) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.OtherLongString) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.OtherVeryLongString) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.OtherWordString) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.Unknown) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.SignedLong) {
        let $ = get_ints(value);
        if ($.isOk()) {
          let ints = $[0];
          let s = (() => {
            let _pipe = ints;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $int.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.SignedShort) {
        let $ = get_ints(value);
        if ($.isOk()) {
          let ints = $[0];
          let s = (() => {
            let _pipe = ints;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $int.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.UnsignedLong) {
        let $ = get_ints(value);
        if ($.isOk()) {
          let ints = $[0];
          let s = (() => {
            let _pipe = ints;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $int.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.UnsignedShort) {
        let $ = get_ints(value);
        if ($.isOk()) {
          let ints = $[0];
          let s = (() => {
            let _pipe = ints;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $int.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.SignedVeryLong) {
        let $ = get_big_ints(value);
        if ($.isOk()) {
          let ints = $[0];
          let s = (() => {
            let _pipe = ints;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $bigi.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.UnsignedVeryLong) {
        let $ = get_big_ints(value);
        if ($.isOk()) {
          let ints = $[0];
          let s = (() => {
            let _pipe = ints;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $bigi.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else if (value instanceof BinaryValue) {
      let vr = value.vr;
      let bytes$1 = value.bytes;
      if (vr instanceof $value_representation.AttributeTag) {
        let $ = $attribute_tag.from_bytes(bytes$1);
        if ($.isOk()) {
          let tags = $[0];
          let s = (() => {
            let _pipe = tags;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $data_element_tag.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.FloatingPointDouble) {
        let $ = get_floats(value);
        if ($.isOk()) {
          let floats = $[0];
          let s = (() => {
            let _pipe = floats;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $ieee_float.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.FloatingPointSingle) {
        let $ = get_floats(value);
        if ($.isOk()) {
          let floats = $[0];
          let s = (() => {
            let _pipe = floats;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $ieee_float.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.OtherByteString) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.OtherDoubleString) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.OtherFloatString) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.OtherLongString) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.OtherVeryLongString) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.OtherWordString) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.Unknown) {
        let $ = $bit_array.slice(
          bytes$1,
          0,
          $int.min($bit_array.byte_size(bytes$1), output_list_max_size),
        );
        if (!$.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value",
            229,
            "to_string",
            "Pattern match failed, no pattern matched the value.",
            { value: $ }
          )
        }
        let bytes$2 = $[0];
        let s = $utils.inspect_bit_array(bytes$2);
        return new Ok([s, new None()]);
      } else if (vr instanceof $value_representation.SignedLong) {
        let $ = get_ints(value);
        if ($.isOk()) {
          let ints = $[0];
          let s = (() => {
            let _pipe = ints;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $int.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.SignedShort) {
        let $ = get_ints(value);
        if ($.isOk()) {
          let ints = $[0];
          let s = (() => {
            let _pipe = ints;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $int.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.UnsignedLong) {
        let $ = get_ints(value);
        if ($.isOk()) {
          let ints = $[0];
          let s = (() => {
            let _pipe = ints;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $int.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.UnsignedShort) {
        let $ = get_ints(value);
        if ($.isOk()) {
          let ints = $[0];
          let s = (() => {
            let _pipe = ints;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $int.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.SignedVeryLong) {
        let $ = get_big_ints(value);
        if ($.isOk()) {
          let ints = $[0];
          let s = (() => {
            let _pipe = ints;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $bigi.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else if (vr instanceof $value_representation.UnsignedVeryLong) {
        let $ = get_big_ints(value);
        if ($.isOk()) {
          let ints = $[0];
          let s = (() => {
            let _pipe = ints;
            let _pipe$1 = $list.take(_pipe, output_list_max_size);
            let _pipe$2 = $list.map(_pipe$1, $bigi.to_string);
            return $string.join(_pipe$2, ", ");
          })();
          return new Ok([s, new None()]);
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else if (value instanceof EncapsulatedPixelDataValue) {
      let items = value.items;
      let total_bytes = (() => {
        let _pipe = items;
        let _pipe$1 = $list.map(_pipe, $bit_array.byte_size);
        return $list.fold(_pipe$1, 0, $int.add);
      })();
      let size = $list.length(items);
      let s = (("Items: " + $int.to_string(size)) + ", bytes: ") + $int.to_string(
        total_bytes,
      );
      return new Ok([s, new None()]);
    } else {
      let items = value.items;
      let s = "Items: " + (() => {
        let _pipe = items;
        let _pipe$1 = $list.length(_pipe);
        return $int.to_string(_pipe$1);
      })();
      return new Ok([s, new None()]);
    }
  })();
  let _pipe$1 = $result.map(
    _pipe,
    (res) => {
      let s = res[0];
      let suffix = res[1];
      let suffix$1 = (() => {
        let _pipe$1 = suffix;
        return $option.unwrap(_pipe$1, "");
      })();
      let output_width$1 = $int.max(
        output_width - $utils.string_fast_length(suffix$1),
        10,
      );
      let $ = $utils.string_fast_length(s) > output_width$1;
      if ($) {
        return ($string.slice(s, 0, output_width$1 - 2) + " …") + suffix$1;
      } else {
        return s + suffix$1;
      }
    },
  );
  return $result.unwrap(_pipe$1, "<error converting to string>");
}

export function get_float(value) {
  return $result.try$(
    get_floats(value),
    (floats) => {
      if (floats.hasLength(1)) {
        let f = floats.head;
        return new Ok(f);
      } else {
        return new Error($data_error.new_multiplicity_mismatch());
      }
    },
  );
}

export function get_age(value) {
  if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.AgeString) {
    let bytes$1 = value.bytes;
    return $age_string.from_bytes(bytes$1);
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

export function get_attribute_tags(value) {
  if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.AttributeTag) {
    let bytes$1 = value.bytes;
    return $attribute_tag.from_bytes(bytes$1);
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

export function get_date(value) {
  if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.Date) {
    let bytes$1 = value.bytes;
    return $date.from_bytes(bytes$1);
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

export function get_date_time(value) {
  if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.DateTime) {
    let bytes$1 = value.bytes;
    return $date_time.from_bytes(bytes$1);
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

export function get_time(value) {
  if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.Time) {
    let bytes$1 = value.bytes;
    return $time.from_bytes(bytes$1);
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

export function get_person_names(value) {
  if (value instanceof BinaryValue &&
  value.vr instanceof $value_representation.PersonName) {
    let bytes$1 = value.bytes;
    return $person_name.from_bytes(bytes$1);
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

export function get_person_name(value) {
  return $result.try$(
    get_person_names(value),
    (person_names) => {
      if (person_names.hasLength(1)) {
        let n = person_names.head;
        return new Ok(n);
      } else {
        return new Error($data_error.new_multiplicity_mismatch());
      }
    },
  );
}

export function validate_length(value) {
  let value_length = (() => {
    let _pipe = bytes(value);
    let _pipe$1 = $result.unwrap(_pipe, toBitArray([]));
    return $bit_array.byte_size(_pipe$1);
  })();
  if (value instanceof LookupTableDescriptorValue) {
    let vr = value.vr;
    if (value_length === 6) {
      return new Ok(value);
    } else {
      return new Error(
        $data_error.new_value_length_invalid(
          vr,
          value_length,
          "Lookup table descriptor length must be exactly 6 bytes",
        ),
      );
    }
  } else if (value instanceof BinaryValue) {
    let vr = value.vr;
    let $ = $value_representation.length_requirements(vr);
    let bytes_max = $.bytes_max;
    let bytes_multiple_of = $.bytes_multiple_of;
    let bytes_multiple_of$1 = (() => {
      let _pipe = bytes_multiple_of;
      return $option.unwrap(_pipe, 2);
    })();
    let $1 = value_length > bytes_max;
    if ($1) {
      return new Error(
        $data_error.new_value_length_invalid(
          vr,
          value_length,
          ("Must not exceed " + $int.to_string(bytes_max)) + " bytes",
        ),
      );
    } else {
      let $2 = remainderInt(value_length, bytes_multiple_of$1);
      if ($2 === 0) {
        return new Ok(value);
      } else {
        return new Error(
          $data_error.new_value_length_invalid(
            vr,
            value_length,
            ("Must be a multiple of " + $int.to_string(bytes_multiple_of$1)) + " bytes",
          ),
        );
      }
    }
  } else if (value instanceof EncapsulatedPixelDataValue) {
    let vr = value.vr;
    let items = value.items;
    let _pipe = items;
    let _pipe$1 = $list.try_each(
      _pipe,
      (item) => {
        let item_length = $bit_array.byte_size(item);
        let $ = item_length > 0xFFFFFFFE;
        if ($) {
          return new Error(
            $data_error.new_value_length_invalid(
              vr,
              item_length,
              ("Must not exceed " + $int.to_string(0xFFFFFFFE)) + " bytes",
            ),
          );
        } else {
          let $1 = remainderInt(item_length, 2);
          if ($1 === 0) {
            return new Ok(value);
          } else {
            return new Error(
              $data_error.new_value_length_invalid(
                vr,
                item_length,
                "Must be a multiple of 2 bytes",
              ),
            );
          }
        }
      },
    );
    return $result.replace(_pipe$1, value);
  } else {
    return new Ok(value);
  }
}

export function new_binary(vr, bytes) {
  let vr_validation = (() => {
    if (vr instanceof $value_representation.Sequence) {
      return new Error(
        $data_error.new_value_invalid(
          ("Value representation '" + $value_representation.to_string(vr)) + "' is not valid for binary data",
        ),
      );
    } else {
      return new Ok(new BinaryValue(vr, bytes));
    }
  })();
  return $result.try$(
    vr_validation,
    (_) => {
      let string_validation = (() => {
        let $ = $value_representation.is_encoded_string(vr);
        if ($) {
          let $1 = $bit_array.is_utf8(bytes);
          if ($1) {
            return new Ok(undefined);
          } else {
            return new Error(
              $data_error.new_value_invalid(
                ("Bytes for '" + $value_representation.to_string(vr)) + "' are not valid UTF-8",
              ),
            );
          }
        } else {
          let $1 = $value_representation.is_string(vr);
          if ($1) {
            let $2 = validate_default_charset_bytes(bytes);
            if ($2.isOk() && !$2[0]) {
              return new Ok(undefined);
            } else {
              let invalid_byte = $2[0];
              let invalid_byte$1 = (() => {
                let _pipe = invalid_byte;
                let _pipe$1 = $int.to_base16(_pipe);
                return $utils.pad_start(_pipe$1, 2, "0");
              })();
              return new Error(
                $data_error.new_value_invalid(
                  (("Bytes for '" + $value_representation.to_string(vr)) + "' has disallowed byte: 0x") + invalid_byte$1,
                ),
              );
            }
          } else {
            return new Ok(undefined);
          }
        }
      })();
      return $result.try$(
        string_validation,
        (_) => {
          let value = new_binary_unchecked(vr, bytes);
          return validate_length(value);
        },
      );
    },
  );
}

export function new_lookup_table_descriptor(vr, bytes) {
  let vr_validation = (() => {
    if (vr instanceof $value_representation.SignedShort) {
      return new Ok(undefined);
    } else if (vr instanceof $value_representation.UnsignedShort) {
      return new Ok(undefined);
    } else {
      return new Error(
        $data_error.new_value_invalid(
          ("Value representation '" + $value_representation.to_string(vr)) + "' is not valid for lookup table descriptor data",
        ),
      );
    }
  })();
  return $result.try$(
    vr_validation,
    (_) => {
      let value = new_lookup_table_descriptor_unchecked(vr, bytes);
      return validate_length(value);
    },
  );
}

export function new_encapsulated_pixel_data(vr, items) {
  let vr_validation = (() => {
    if (vr instanceof $value_representation.OtherByteString) {
      return new Ok(undefined);
    } else if (vr instanceof $value_representation.OtherWordString) {
      return new Ok(undefined);
    } else {
      return new Error(
        $data_error.new_value_invalid(
          ("Value representation '" + $value_representation.to_string(vr)) + "' is not valid for encapsulated pixel data",
        ),
      );
    }
  })();
  return $result.try$(
    vr_validation,
    (_) => {
      let value = new_encapsulated_pixel_data_unchecked(vr, items);
      return validate_length(value);
    },
  );
}

export function new_attribute_tag(value) {
  let _pipe = value;
  let _pipe$1 = $attribute_tag.to_bytes(_pipe);
  return $result.try$(
    _pipe$1,
    (_capture) => {
      return new_binary(new $value_representation.AttributeTag(), _capture);
    },
  );
}

export function new_decimal_string(value) {
  let _pipe = value;
  let _pipe$1 = $decimal_string.to_bytes(_pipe);
  return ((_capture) => {
    return new_binary(new $value_representation.DecimalString(), _capture);
  })(_pipe$1);
}

export function new_floating_point_double(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(_pipe, $ieee_float.to_bytes_64_le);
  let _pipe$2 = $bit_array.concat(_pipe$1);
  return ((_capture) => {
    return new_binary(new $value_representation.FloatingPointDouble(), _capture);
  })(_pipe$2);
}

export function new_floating_point_single(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(_pipe, $ieee_float.to_bytes_32_le);
  let _pipe$2 = $bit_array.concat(_pipe$1);
  return ((_capture) => {
    return new_binary(new $value_representation.FloatingPointSingle(), _capture);
  })(_pipe$2);
}

export function new_integer_string(value) {
  let _pipe = value;
  let _pipe$1 = $integer_string.to_bytes(_pipe);
  return $result.try$(
    _pipe$1,
    (_capture) => {
      return new_binary(new $value_representation.IntegerString(), _capture);
    },
  );
}

export function new_long_text(value) {
  let _pipe = value;
  let _pipe$1 = $string.trim_end(_pipe);
  let _pipe$2 = $bit_array.from_string(_pipe$1);
  let _pipe$3 = ((_capture) => {
    return $value_representation.pad_bytes_to_even_length(
      new $value_representation.LongText(),
      _capture,
    );
  })(_pipe$2);
  return ((_capture) => {
    return new_binary(new $value_representation.LongText(), _capture);
  })(_pipe$3);
}

export function new_other_byte_string(value) {
  return new_binary(new $value_representation.OtherByteString(), value);
}

export function new_other_double_string(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(_pipe, $ieee_float.to_bytes_64_le);
  let _pipe$2 = $bit_array.concat(_pipe$1);
  return ((_capture) => {
    return new_binary(new $value_representation.OtherDoubleString(), _capture);
  })(_pipe$2);
}

export function new_other_float_string(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(_pipe, $ieee_float.to_bytes_32_le);
  let _pipe$2 = $bit_array.concat(_pipe$1);
  return ((_capture) => {
    return new_binary(new $value_representation.OtherFloatString(), _capture);
  })(_pipe$2);
}

export function new_other_long_string(value) {
  return new_binary(new $value_representation.OtherLongString(), value);
}

export function new_other_very_long_string(value) {
  return new_binary(new $value_representation.OtherVeryLongString(), value);
}

export function new_other_word_string(value) {
  return new_binary(new $value_representation.OtherWordString(), value);
}

export function new_person_name(value) {
  let _pipe = value;
  let _pipe$1 = $person_name.to_bytes(_pipe);
  return $result.try$(
    _pipe$1,
    (_capture) => {
      return new_binary(new $value_representation.PersonName(), _capture);
    },
  );
}

export function new_short_text(value) {
  let _pipe = value;
  let _pipe$1 = $string.trim_end(_pipe);
  let _pipe$2 = $bit_array.from_string(_pipe$1);
  let _pipe$3 = ((_capture) => {
    return $value_representation.pad_bytes_to_even_length(
      new $value_representation.ShortText(),
      _capture,
    );
  })(_pipe$2);
  return ((_capture) => {
    return new_binary(new $value_representation.ShortText(), _capture);
  })(_pipe$3);
}

export function new_signed_long(value) {
  let is_valid = $list.all(
    value,
    (i) => { return (i >= -1 * 0x80000000) && (i <= 0x7FFFFFFF); },
  );
  return $bool.guard(
    !is_valid,
    new Error(
      $data_error.new_value_invalid("Value out of range for SignedLong VR"),
    ),
    () => {
      let _pipe = value;
      let _pipe$1 = $list.map(
        _pipe,
        (x) => { return toBitArray([sizedInt(x, 32, false)]); },
      );
      let _pipe$2 = $bit_array.concat(_pipe$1);
      return ((_capture) => {
        return new_binary(new $value_representation.SignedLong(), _capture);
      })(_pipe$2);
    },
  );
}

export function new_signed_short(value) {
  let is_valid = $list.all(
    value,
    (i) => { return (i >= -1 * 0x8000) && (i <= 0x7FFF); },
  );
  return $bool.guard(
    !is_valid,
    new Error(
      $data_error.new_value_invalid("Value out of range for SignedShort VR"),
    ),
    () => {
      let _pipe = value;
      let _pipe$1 = $list.map(
        _pipe,
        (x) => { return toBitArray([sizedInt(x, 16, false)]); },
      );
      let _pipe$2 = $bit_array.concat(_pipe$1);
      return ((_capture) => {
        return new_binary(new $value_representation.SignedShort(), _capture);
      })(_pipe$2);
    },
  );
}

export function new_signed_very_long(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(
    _pipe,
    (_capture) => {
      return $bigi.to_bytes(
        _capture,
        new $bigi.LittleEndian(),
        new $bigi.Signed(),
        8,
      );
    },
  );
  let _pipe$2 = $result.all(_pipe$1);
  let _pipe$3 = $result.map_error(
    _pipe$2,
    (_) => {
      return $data_error.new_value_invalid(
        "Value out of range for SignedVeryLong VR",
      );
    },
  );
  let _pipe$4 = $result.map(_pipe$3, $bit_array.concat);
  return $result.try$(
    _pipe$4,
    (_capture) => {
      return new_binary(new $value_representation.SignedVeryLong(), _capture);
    },
  );
}

export function new_unique_identifier(value) {
  let _pipe = value;
  let _pipe$1 = $unique_identifier.to_bytes(_pipe);
  return $result.try$(
    _pipe$1,
    (_capture) => {
      return new_binary(new $value_representation.UniqueIdentifier(), _capture);
    },
  );
}

export function new_universal_resource_identifier(value) {
  let _pipe = value;
  let _pipe$1 = $string.trim_end(_pipe);
  let _pipe$2 = $bit_array.from_string(_pipe$1);
  let _pipe$3 = ((_capture) => {
    return $value_representation.pad_bytes_to_even_length(
      new $value_representation.UniversalResourceIdentifier(),
      _capture,
    );
  })(_pipe$2);
  return ((_capture) => {
    return new_binary(
      new $value_representation.UniversalResourceIdentifier(),
      _capture,
    );
  })(_pipe$3);
}

export function new_unknown(value) {
  return new_binary(new $value_representation.Unknown(), value);
}

export function new_unlimited_text(value) {
  let _pipe = value;
  let _pipe$1 = $string.trim_end(_pipe);
  let _pipe$2 = $bit_array.from_string(_pipe$1);
  let _pipe$3 = ((_capture) => {
    return $value_representation.pad_bytes_to_even_length(
      new $value_representation.UnlimitedText(),
      _capture,
    );
  })(_pipe$2);
  return ((_capture) => {
    return new_binary(new $value_representation.UnlimitedText(), _capture);
  })(_pipe$3);
}

export function new_unsigned_long(value) {
  let is_valid = $list.all(
    value,
    (i) => { return (i >= 0) && (i <= 0xFFFFFFFF); },
  );
  return $bool.guard(
    !is_valid,
    new Error(
      $data_error.new_value_invalid("Value out of range for UnsignedLong VR"),
    ),
    () => {
      let _pipe = value;
      let _pipe$1 = $list.map(
        _pipe,
        (x) => { return toBitArray([sizedInt(x, 32, false)]); },
      );
      let _pipe$2 = $bit_array.concat(_pipe$1);
      return ((_capture) => {
        return new_binary(new $value_representation.UnsignedLong(), _capture);
      })(_pipe$2);
    },
  );
}

export function new_unsigned_short(value) {
  let is_valid = $list.all(value, (i) => { return (i >= 0) && (i <= 0xFFFF); });
  return $bool.guard(
    !is_valid,
    new Error(
      $data_error.new_value_invalid("Value out of range for UnsignedShort VR"),
    ),
    () => {
      let _pipe = value;
      let _pipe$1 = $list.map(
        _pipe,
        (x) => { return toBitArray([sizedInt(x, 16, false)]); },
      );
      let _pipe$2 = $bit_array.concat(_pipe$1);
      return ((_capture) => {
        return new_binary(new $value_representation.UnsignedShort(), _capture);
      })(_pipe$2);
    },
  );
}

export function new_unsigned_very_long(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(
    _pipe,
    (_capture) => {
      return $bigi.to_bytes(
        _capture,
        new $bigi.LittleEndian(),
        new $bigi.Unsigned(),
        8,
      );
    },
  );
  let _pipe$2 = $result.all(_pipe$1);
  let _pipe$3 = $result.map_error(
    _pipe$2,
    (_) => {
      return $data_error.new_value_invalid(
        "Value out of range for UnsignedVeryLong VR",
      );
    },
  );
  let _pipe$4 = $result.map(_pipe$3, $bit_array.concat);
  return $result.try$(
    _pipe$4,
    (_capture) => {
      return new_binary(new $value_representation.UnsignedVeryLong(), _capture);
    },
  );
}

function new_string_list(vr, value) {
  let string_characters_max = $option.unwrap(
    $value_representation.length_requirements(vr).string_characters_max,
    0xFFFFFFFE,
  );
  let value_validation = $list.try_fold(
    value,
    undefined,
    (_, s) => {
      let $ = $string.length(s) > string_characters_max;
      if ($) {
        return new Error(
          $data_error.new_value_invalid(
            "String list item is longer than the max length of " + $int.to_string(
              string_characters_max,
            ),
          ),
        );
      } else {
        let $1 = $string.contains(s, "\\");
        if ($1) {
          return new Error(
            $data_error.new_value_invalid(
              "String list item contains backslashes",
            ),
          );
        } else {
          return new Ok(undefined);
        }
      }
    },
  );
  return $result.try$(
    value_validation,
    (_) => {
      let _pipe = value;
      let _pipe$1 = $string.join(_pipe, "\\");
      let _pipe$2 = $bit_array.from_string(_pipe$1);
      let _pipe$3 = ((_capture) => {
        return $value_representation.pad_bytes_to_even_length(vr, _capture);
      })(_pipe$2);
      return ((_capture) => { return new_binary(vr, _capture); })(_pipe$3);
    },
  );
}

export function new_application_entity(value) {
  let _pipe = toList([value]);
  let _pipe$1 = $list.map(_pipe, $string.trim);
  return ((_capture) => {
    return new_string_list(
      new $value_representation.ApplicationEntity(),
      _capture,
    );
  })(_pipe$1);
}

export function new_code_string(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(_pipe, $string.trim);
  return ((_capture) => {
    return new_string_list(new $value_representation.CodeString(), _capture);
  })(_pipe$1);
}

export function new_long_string(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(_pipe, $string.trim);
  return ((_capture) => {
    return new_string_list(new $value_representation.LongString(), _capture);
  })(_pipe$1);
}

export function new_short_string(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(_pipe, $string.trim);
  return ((_capture) => {
    return new_string_list(new $value_representation.ShortString(), _capture);
  })(_pipe$1);
}

export function new_unlimited_characters(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(_pipe, $string.trim_end);
  return ((_capture) => {
    return new_string_list(
      new $value_representation.UnlimitedCharacters(),
      _capture,
    );
  })(_pipe$1);
}
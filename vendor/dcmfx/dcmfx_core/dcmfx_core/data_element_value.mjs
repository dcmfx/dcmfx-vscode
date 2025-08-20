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
  Empty as $Empty,
  CustomType as $CustomType,
  remainderInt,
  toBitArray,
  bitArraySlice,
  bitArraySliceToInt,
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
    if (bytes.bitSize >= 8 && (bytes.bitSize - 8) % 8 === 0) {
      let b = bytes.byteAt(0);
      if (
        ((((((b !== 0x0) && (b !== 0x9)) && (b !== 0xA)) && (b !== 0xC)) && (b !== 0xD)) && (b !== 0x1B)) && ((b < 0x20) || (b > 0x7E))
      ) {
        return new Error(b);
      } else {
        let rest = bitArraySlice(bytes, 8);
        loop$bytes = rest;
      }
    } else {
      return new Ok(undefined);
    }
  }
}

/**
 * Constructs a new data element binary value similar to `new_binary`,
 * but does not validate `vr` or `bytes`.
 */
export function new_binary_unchecked(vr, bytes) {
  return new BinaryValue(vr, bytes);
}

/**
 * Constructs a new data element lookup table descriptor value similar to
 * `new_lookup_table_descriptor_value`, but does not validate `vr` or `bytes`.
 */
export function new_lookup_table_descriptor_unchecked(vr, bytes) {
  return new LookupTableDescriptorValue(vr, bytes);
}

/**
 * Constructs a new data element string value similar to
 * `new_encapsulated_pixel_data`, but does not validate `vr` or `items`.
 */
export function new_encapsulated_pixel_data_unchecked(vr, items) {
  return new EncapsulatedPixelDataValue(vr, items);
}

/**
 * Creates a new `Sequence` data element value.
 */
export function new_sequence(items) {
  return new SequenceValue(items);
}

/**
 * Returns the value representation for a data element value.
 */
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

/**
 * Creates a new `AgeString` data element value.
 */
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

/**
 * Creates a new `Date` data element value.
 */
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

/**
 * Creates a new `DateTime` data element value.
 */
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

/**
 * Creates a new `Time` data element value.
 */
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

/**
 * For data element values that hold binary data, returns that data.
 */
export function bytes(value) {
  if (value instanceof BinaryValue) {
    let bytes$1 = value.bytes;
    return new Ok(bytes$1);
  } else if (value instanceof LookupTableDescriptorValue) {
    let bytes$1 = value.bytes;
    return new Ok(bytes$1);
  } else if (value instanceof EncapsulatedPixelDataValue) {
    return new Error($data_error.new_value_not_present());
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * For data element values that hold binary data, returns that data if its
 * value representation is one of the specified allowed VRs.
 */
export function vr_bytes(value, allowed_vrs) {
  let $ = $list.contains(allowed_vrs, value_representation(value));
  if ($) {
    return bytes(value);
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * For data element values that hold encapsulated pixel data, returns a
 * reference to the encapsulated items.
 */
export function encapsulated_pixel_data(value) {
  if (value instanceof EncapsulatedPixelDataValue) {
    let items = value.items;
    return new Ok(items);
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * For data element values that hold a sequence, returns a reference to the
 * sequence's items.
 */
export function sequence_items(value) {
  if (value instanceof SequenceValue) {
    let items = value.items;
    return new Ok(items);
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * Returns the size in bytes of a data element value. This recurses through
 * sequences and also includes a fixed per-value overhead, so never returns
 * zero even for an empty data element value.
 */
export function total_byte_size(value) {
  let _block;
  if (value instanceof BinaryValue) {
    let bytes$1 = value.bytes;
    _block = $bit_array.byte_size(bytes$1);
  } else if (value instanceof LookupTableDescriptorValue) {
    let bytes$1 = value.bytes;
    _block = $bit_array.byte_size(bytes$1);
  } else if (value instanceof EncapsulatedPixelDataValue) {
    let items = value.items;
    _block = $list.length(items) * 8 + $list.fold(
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
    _block = $int.sum(_pipe$1);
  }
  let data_size = _block;
  let fixed_size = 32;
  return data_size + fixed_size;
}

/**
 * Returns the strings contained in a data element value. This is only
 * supported for value representations that allow multiplicity.
 */
export function get_strings(value) {
  if (value instanceof BinaryValue) {
    let $ = value.vr;
    if ($ instanceof $value_representation.CodeString) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
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
            (s) => {
              let $1 = value_representation(value);
              if ($1 instanceof $value_representation.CodeString) {
                let _pipe$4 = s;
                let _pipe$5 = $utils.trim_ascii_end(_pipe$4, 0x0);
                return $utils.trim_ascii(_pipe$5, 0x20);
              } else if ($1 instanceof $value_representation.UniqueIdentifier) {
                return $utils.trim_ascii_end(s, 0x0);
              } else if ($1 instanceof $value_representation.UnlimitedCharacters) {
                return $utils.trim_ascii_end(s, 0x20);
              } else {
                return $utils.trim_ascii(s, 0x20);
              }
            },
          );
        },
      );
    } else if ($ instanceof $value_representation.Date) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
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
            (s) => {
              let $1 = value_representation(value);
              if ($1 instanceof $value_representation.CodeString) {
                let _pipe$4 = s;
                let _pipe$5 = $utils.trim_ascii_end(_pipe$4, 0x0);
                return $utils.trim_ascii(_pipe$5, 0x20);
              } else if ($1 instanceof $value_representation.UniqueIdentifier) {
                return $utils.trim_ascii_end(s, 0x0);
              } else if ($1 instanceof $value_representation.UnlimitedCharacters) {
                return $utils.trim_ascii_end(s, 0x20);
              } else {
                return $utils.trim_ascii(s, 0x20);
              }
            },
          );
        },
      );
    } else if ($ instanceof $value_representation.DateTime) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
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
            (s) => {
              let $1 = value_representation(value);
              if ($1 instanceof $value_representation.CodeString) {
                let _pipe$4 = s;
                let _pipe$5 = $utils.trim_ascii_end(_pipe$4, 0x0);
                return $utils.trim_ascii(_pipe$5, 0x20);
              } else if ($1 instanceof $value_representation.UniqueIdentifier) {
                return $utils.trim_ascii_end(s, 0x0);
              } else if ($1 instanceof $value_representation.UnlimitedCharacters) {
                return $utils.trim_ascii_end(s, 0x20);
              } else {
                return $utils.trim_ascii(s, 0x20);
              }
            },
          );
        },
      );
    } else if ($ instanceof $value_representation.LongString) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
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
            (s) => {
              let $1 = value_representation(value);
              if ($1 instanceof $value_representation.CodeString) {
                let _pipe$4 = s;
                let _pipe$5 = $utils.trim_ascii_end(_pipe$4, 0x0);
                return $utils.trim_ascii(_pipe$5, 0x20);
              } else if ($1 instanceof $value_representation.UniqueIdentifier) {
                return $utils.trim_ascii_end(s, 0x0);
              } else if ($1 instanceof $value_representation.UnlimitedCharacters) {
                return $utils.trim_ascii_end(s, 0x20);
              } else {
                return $utils.trim_ascii(s, 0x20);
              }
            },
          );
        },
      );
    } else if ($ instanceof $value_representation.PersonName) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
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
            (s) => {
              let $1 = value_representation(value);
              if ($1 instanceof $value_representation.CodeString) {
                let _pipe$4 = s;
                let _pipe$5 = $utils.trim_ascii_end(_pipe$4, 0x0);
                return $utils.trim_ascii(_pipe$5, 0x20);
              } else if ($1 instanceof $value_representation.UniqueIdentifier) {
                return $utils.trim_ascii_end(s, 0x0);
              } else if ($1 instanceof $value_representation.UnlimitedCharacters) {
                return $utils.trim_ascii_end(s, 0x20);
              } else {
                return $utils.trim_ascii(s, 0x20);
              }
            },
          );
        },
      );
    } else if ($ instanceof $value_representation.ShortString) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
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
            (s) => {
              let $1 = value_representation(value);
              if ($1 instanceof $value_representation.CodeString) {
                let _pipe$4 = s;
                let _pipe$5 = $utils.trim_ascii_end(_pipe$4, 0x0);
                return $utils.trim_ascii(_pipe$5, 0x20);
              } else if ($1 instanceof $value_representation.UniqueIdentifier) {
                return $utils.trim_ascii_end(s, 0x0);
              } else if ($1 instanceof $value_representation.UnlimitedCharacters) {
                return $utils.trim_ascii_end(s, 0x20);
              } else {
                return $utils.trim_ascii(s, 0x20);
              }
            },
          );
        },
      );
    } else if ($ instanceof $value_representation.Time) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
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
            (s) => {
              let $1 = value_representation(value);
              if ($1 instanceof $value_representation.CodeString) {
                let _pipe$4 = s;
                let _pipe$5 = $utils.trim_ascii_end(_pipe$4, 0x0);
                return $utils.trim_ascii(_pipe$5, 0x20);
              } else if ($1 instanceof $value_representation.UniqueIdentifier) {
                return $utils.trim_ascii_end(s, 0x0);
              } else if ($1 instanceof $value_representation.UnlimitedCharacters) {
                return $utils.trim_ascii_end(s, 0x20);
              } else {
                return $utils.trim_ascii(s, 0x20);
              }
            },
          );
        },
      );
    } else if ($ instanceof $value_representation.UniqueIdentifier) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
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
            (s) => {
              let $1 = value_representation(value);
              if ($1 instanceof $value_representation.CodeString) {
                let _pipe$4 = s;
                let _pipe$5 = $utils.trim_ascii_end(_pipe$4, 0x0);
                return $utils.trim_ascii(_pipe$5, 0x20);
              } else if ($1 instanceof $value_representation.UniqueIdentifier) {
                return $utils.trim_ascii_end(s, 0x0);
              } else if ($1 instanceof $value_representation.UnlimitedCharacters) {
                return $utils.trim_ascii_end(s, 0x20);
              } else {
                return $utils.trim_ascii(s, 0x20);
              }
            },
          );
        },
      );
    } else if ($ instanceof $value_representation.UnlimitedCharacters) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
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
            (s) => {
              let $1 = value_representation(value);
              if ($1 instanceof $value_representation.CodeString) {
                let _pipe$4 = s;
                let _pipe$5 = $utils.trim_ascii_end(_pipe$4, 0x0);
                return $utils.trim_ascii(_pipe$5, 0x20);
              } else if ($1 instanceof $value_representation.UniqueIdentifier) {
                return $utils.trim_ascii_end(s, 0x0);
              } else if ($1 instanceof $value_representation.UnlimitedCharacters) {
                return $utils.trim_ascii_end(s, 0x20);
              } else {
                return $utils.trim_ascii(s, 0x20);
              }
            },
          );
        },
      );
    } else {
      return new Error($data_error.new_value_not_present());
    }
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * Returns the string contained in a data element value. This is only supported
 * for value representations that either don't allow multiplicity, or those
 * that do allow multiplicity but only one string is present in the value.
 */
export function get_string(value) {
  if (value instanceof BinaryValue) {
    let $ = value.vr;
    if ($ instanceof $value_representation.AgeString) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
        },
      );
      return $result.map(
        _pipe$2,
        (s) => {
          let $1 = value_representation(value);
          if ($1 instanceof $value_representation.ApplicationEntity) {
            return $utils.trim_ascii(s, 0x20);
          } else if (
            $1 instanceof $value_representation.UniversalResourceIdentifier
          ) {
            return $utils.trim_ascii(s, 0x20);
          } else {
            return $utils.trim_ascii_end(s, 0x20);
          }
        },
      );
    } else if ($ instanceof $value_representation.ApplicationEntity) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
        },
      );
      return $result.map(
        _pipe$2,
        (s) => {
          let $1 = value_representation(value);
          if ($1 instanceof $value_representation.ApplicationEntity) {
            return $utils.trim_ascii(s, 0x20);
          } else if (
            $1 instanceof $value_representation.UniversalResourceIdentifier
          ) {
            return $utils.trim_ascii(s, 0x20);
          } else {
            return $utils.trim_ascii_end(s, 0x20);
          }
        },
      );
    } else if ($ instanceof $value_representation.LongText) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
        },
      );
      return $result.map(
        _pipe$2,
        (s) => {
          let $1 = value_representation(value);
          if ($1 instanceof $value_representation.ApplicationEntity) {
            return $utils.trim_ascii(s, 0x20);
          } else if (
            $1 instanceof $value_representation.UniversalResourceIdentifier
          ) {
            return $utils.trim_ascii(s, 0x20);
          } else {
            return $utils.trim_ascii_end(s, 0x20);
          }
        },
      );
    } else if ($ instanceof $value_representation.ShortText) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
        },
      );
      return $result.map(
        _pipe$2,
        (s) => {
          let $1 = value_representation(value);
          if ($1 instanceof $value_representation.ApplicationEntity) {
            return $utils.trim_ascii(s, 0x20);
          } else if (
            $1 instanceof $value_representation.UniversalResourceIdentifier
          ) {
            return $utils.trim_ascii(s, 0x20);
          } else {
            return $utils.trim_ascii_end(s, 0x20);
          }
        },
      );
    } else if ($ instanceof $value_representation.UniversalResourceIdentifier) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
        },
      );
      return $result.map(
        _pipe$2,
        (s) => {
          let $1 = value_representation(value);
          if ($1 instanceof $value_representation.ApplicationEntity) {
            return $utils.trim_ascii(s, 0x20);
          } else if (
            $1 instanceof $value_representation.UniversalResourceIdentifier
          ) {
            return $utils.trim_ascii(s, 0x20);
          } else {
            return $utils.trim_ascii_end(s, 0x20);
          }
        },
      );
    } else if ($ instanceof $value_representation.UnlimitedText) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array.to_string(_pipe);
      let _pipe$2 = $result.map_error(
        _pipe$1,
        (_) => {
          return $data_error.new_value_invalid(
            "String bytes are not valid UTF-8",
          );
        },
      );
      return $result.map(
        _pipe$2,
        (s) => {
          let $1 = value_representation(value);
          if ($1 instanceof $value_representation.ApplicationEntity) {
            return $utils.trim_ascii(s, 0x20);
          } else if (
            $1 instanceof $value_representation.UniversalResourceIdentifier
          ) {
            return $utils.trim_ascii(s, 0x20);
          } else {
            return $utils.trim_ascii_end(s, 0x20);
          }
        },
      );
    } else {
      return $result.try$(
        get_strings(value),
        (strings) => {
          if (strings instanceof $Empty) {
            return new Error($data_error.new_multiplicity_mismatch());
          } else {
            let $1 = strings.tail;
            if ($1 instanceof $Empty) {
              let s = strings.head;
              return new Ok(s);
            } else {
              return new Error($data_error.new_multiplicity_mismatch());
            }
          }
        },
      );
    }
  } else {
    return $result.try$(
      get_strings(value),
      (strings) => {
        if (strings instanceof $Empty) {
          return new Error($data_error.new_multiplicity_mismatch());
        } else {
          let $ = strings.tail;
          if ($ instanceof $Empty) {
            let s = strings.head;
            return new Ok(s);
          } else {
            return new Error($data_error.new_multiplicity_mismatch());
          }
        }
      },
    );
  }
}

/**
 * Returns the three integers contained in a lookup table descriptor data
 * element value.
 */
export function get_lookup_table_descriptor(value) {
  if (value instanceof LookupTableDescriptorValue) {
    let vr = value.vr;
    let bytes$1 = value.bytes;
    if (bytes$1.bitSize >= 16 && bytes$1.bitSize >= 32 && bytes$1.bitSize === 48) {
      if (vr instanceof $value_representation.SignedShort) {
        let entry_count = bitArraySliceToInt(bytes$1, 0, 16, false, false);
        let first_input_value = bitArraySliceToInt(bytes$1, 16, 32, false, true);
        let bits_per_entry = bitArraySliceToInt(bytes$1, 32, 48, false, false);
        return new Ok([entry_count, first_input_value, bits_per_entry]);
      } else if (vr instanceof $value_representation.UnsignedShort) {
        let entry_count = bitArraySliceToInt(bytes$1, 0, 16, false, false);
        let first_input_value = bitArraySliceToInt(bytes$1, 16, 32, false, false);
        let bits_per_entry = bitArraySliceToInt(bytes$1, 32, 48, false, false);
        return new Ok([entry_count, first_input_value, bits_per_entry]);
      } else {
        return new Error(
          $data_error.new_value_invalid("Invalid lookup table descriptor"),
        );
      }
    } else {
      return new Error(
        $data_error.new_value_invalid("Invalid lookup table descriptor"),
      );
    }
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * Returns the integers contained in a data element value. This is only
 * supported for value representations that contain integer data.
 */
export function get_ints(value) {
  if (value instanceof BinaryValue) {
    let $ = value.vr;
    if ($ instanceof $value_representation.IntegerString) {
      let bytes$1 = value.bytes;
      return $integer_string.from_bytes(bytes$1);
    } else if ($ instanceof $value_representation.SignedLong) {
      let bytes$1 = value.bytes;
      let _pipe = $bit_array_utils.to_int32_list(bytes$1);
      return $result.replace_error(
        _pipe,
        $data_error.new_value_invalid("Invalid Int32 data"),
      );
    } else if ($ instanceof $value_representation.SignedShort) {
      let bytes$1 = value.bytes;
      let _pipe = $bit_array_utils.to_int16_list(bytes$1);
      return $result.replace_error(
        _pipe,
        $data_error.new_value_invalid("Invalid Int16 data"),
      );
    } else if ($ instanceof $value_representation.UnsignedLong) {
      let bytes$1 = value.bytes;
      let _pipe = $bit_array_utils.to_uint32_list(bytes$1);
      return $result.replace_error(
        _pipe,
        $data_error.new_value_invalid("Invalid Uint32 data"),
      );
    } else if ($ instanceof $value_representation.UnsignedShort) {
      let bytes$1 = value.bytes;
      let _pipe = $bit_array_utils.to_uint16_list(bytes$1);
      return $result.replace_error(
        _pipe,
        $data_error.new_value_invalid("Invalid Uint16 data"),
      );
    } else {
      return new Error($data_error.new_value_not_present());
    }
  } else if (value instanceof LookupTableDescriptorValue) {
    return $result.map(
      get_lookup_table_descriptor(value),
      (_use0) => {
        let entry_count;
        let first_input_value;
        let bits_per_entry;
        entry_count = _use0[0];
        first_input_value = _use0[1];
        bits_per_entry = _use0[2];
        return toList([entry_count, first_input_value, bits_per_entry]);
      },
    );
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * Returns the integer contained in a data element value. This is only
 * supported for value representations that contain integer data and when
 * exactly one integer is present.
 */
export function get_int(value) {
  return $result.try$(
    get_ints(value),
    (ints) => {
      if (ints instanceof $Empty) {
        return new Error($data_error.new_multiplicity_mismatch());
      } else {
        let $ = ints.tail;
        if ($ instanceof $Empty) {
          let i = ints.head;
          return new Ok(i);
        } else {
          return new Error($data_error.new_multiplicity_mismatch());
        }
      }
    },
  );
}

/**
 * Returns the big integers contained in a data element value. This is only
 * supported for value representations that contain big integer data.
 */
export function get_big_ints(value) {
  if (value instanceof BinaryValue) {
    let $ = value.vr;
    if ($ instanceof $value_representation.SignedVeryLong) {
      let bytes$1 = value.bytes;
      let _pipe = $bit_array_utils.to_int64_list(bytes$1);
      return $result.replace_error(
        _pipe,
        $data_error.new_value_invalid("Invalid Int64 data"),
      );
    } else if ($ instanceof $value_representation.UnsignedVeryLong) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $bit_array_utils.to_uint64_list(_pipe);
      return $result.replace_error(
        _pipe$1,
        $data_error.new_value_invalid("Invalid Uint64 data"),
      );
    } else {
      return new Error($data_error.new_value_not_present());
    }
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * Returns the big integer contained in a data element value. This is only
 * supported for value representations that contain big integer data and when
 * exactly one big integer is present.
 */
export function get_big_int(value) {
  return $result.try$(
    get_big_ints(value),
    (ints) => {
      if (ints instanceof $Empty) {
        return new Error($data_error.new_multiplicity_mismatch());
      } else {
        let $ = ints.tail;
        if ($ instanceof $Empty) {
          let i = ints.head;
          return new Ok(i);
        } else {
          return new Error($data_error.new_multiplicity_mismatch());
        }
      }
    },
  );
}

/**
 * Returns the floats contained in a data element value. This is only supported
 * for value representations containing floating point data.
 */
export function get_floats(value) {
  if (value instanceof BinaryValue) {
    let $ = value.vr;
    if ($ instanceof $value_representation.DecimalString) {
      let bytes$1 = value.bytes;
      let _pipe = bytes$1;
      let _pipe$1 = $decimal_string.from_bytes(_pipe);
      return $result.map(
        _pipe$1,
        (_capture) => { return $list.map(_capture, $ieee_float.finite); },
      );
    } else if ($ instanceof $value_representation.FloatingPointDouble) {
      let bytes$1 = value.bytes;
      let _pipe = $bit_array_utils.to_float64_list(bytes$1);
      return $result.replace_error(
        _pipe,
        $data_error.new_value_invalid("Invalid Float64 data"),
      );
    } else if ($ instanceof $value_representation.FloatingPointSingle) {
      let bytes$1 = value.bytes;
      let _pipe = $bit_array_utils.to_float32_list(bytes$1);
      return $result.replace_error(
        _pipe,
        $data_error.new_value_invalid("Invalid Float32 data"),
      );
    } else if ($ instanceof $value_representation.OtherDoubleString) {
      let bytes$1 = value.bytes;
      let _pipe = $bit_array_utils.to_float64_list(bytes$1);
      return $result.replace_error(
        _pipe,
        $data_error.new_value_invalid("Invalid Float64 data"),
      );
    } else if ($ instanceof $value_representation.OtherFloatString) {
      let bytes$1 = value.bytes;
      let _pipe = $bit_array_utils.to_float32_list(bytes$1);
      return $result.replace_error(
        _pipe,
        $data_error.new_value_invalid("Invalid Float32 data"),
      );
    } else {
      return new Error($data_error.new_value_not_present());
    }
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * Formats a data element value as a human-readable single line of text. Values
 * longer than the output width are truncated with a trailing ellipsis.
 */
export function to_string(value, tag, output_width) {
  let output_list_max_size = globalThis.Math.trunc((output_width + 2) / 3);
  let vr_is_string = $value_representation.is_string(
    value_representation(value),
  );
  let _block;
  if (value instanceof BinaryValue) {
    if (vr_is_string) {
      let vr = value.vr;
      let bytes$1 = value.bytes;
      let _block$1;
      let $ = $bit_array.to_string(bytes$1);
      if ($ instanceof Ok) {
        _block$1 = $;
      } else {
        let _pipe = $bit_array_utils.reverse_index(
          bytes$1,
          (b) => { return $int.bitwise_and(b, 0b1100_0000) !== 0b1000_0000; },
        );
        let _pipe$1 = $result.try$(
          _pipe,
          (_capture) => { return $bit_array.slice(bytes$1, 0, _capture); },
        );
        _block$1 = $result.try$(_pipe$1, $bit_array.to_string);
      }
      let utf8 = _block$1;
      if (utf8 instanceof Ok) {
        let value$1 = utf8[0];
        let _block$2;
        if (vr instanceof $value_representation.AgeString) {
          let _pipe = value$1;
          let _pipe$1 = $bit_array.from_string(_pipe);
          let _pipe$2 = $age_string.from_bytes(_pipe$1);
          let _pipe$3 = $result.map(_pipe$2, $age_string.to_string);
          _block$2 = $result.lazy_unwrap(
            _pipe$3,
            () => { return $string.inspect(value$1); },
          );
        } else if (vr instanceof $value_representation.ApplicationEntity) {
          let _pipe = value$1;
          let _pipe$1 = $utils.trim_ascii_end(_pipe, 0x20);
          _block$2 = $string.inspect(_pipe$1);
        } else if (vr instanceof $value_representation.CodeString) {
          let _pipe = value$1;
          let _pipe$1 = $string.split(_pipe, "\\");
          let _pipe$2 = $list.map(
            _pipe$1,
            (s) => {
              let _block$3;
              if (vr instanceof $value_representation.UniqueIdentifier) {
                _block$3 = $utils.trim_ascii_end(s, 0x0);
              } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                _block$3 = $utils.trim_ascii_end(s, 0x20);
              } else {
                _block$3 = $utils.trim_ascii(s, 0x20);
              }
              let _pipe$2 = _block$3;
              return $string.inspect(_pipe$2);
            },
          );
          _block$2 = $string.join(_pipe$2, ", ");
        } else if (vr instanceof $value_representation.Date) {
          let _pipe = value$1;
          let _pipe$1 = $bit_array.from_string(_pipe);
          let _pipe$2 = $date.from_bytes(_pipe$1);
          let _pipe$3 = $result.map(_pipe$2, $date.to_iso8601);
          _block$2 = $result.lazy_unwrap(
            _pipe$3,
            () => { return $string.inspect(value$1); },
          );
        } else if (vr instanceof $value_representation.DateTime) {
          let _pipe = value$1;
          let _pipe$1 = $bit_array.from_string(_pipe);
          let _pipe$2 = $date_time.from_bytes(_pipe$1);
          let _pipe$3 = $result.map(_pipe$2, $date_time.to_iso8601);
          _block$2 = $result.lazy_unwrap(
            _pipe$3,
            () => { return $string.inspect(value$1); },
          );
        } else if (vr instanceof $value_representation.DecimalString) {
          let _pipe = value$1;
          let _pipe$1 = $string.split(_pipe, "\\");
          let _pipe$2 = $list.map(
            _pipe$1,
            (s) => {
              let _block$3;
              if (vr instanceof $value_representation.UniqueIdentifier) {
                _block$3 = $utils.trim_ascii_end(s, 0x0);
              } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                _block$3 = $utils.trim_ascii_end(s, 0x20);
              } else {
                _block$3 = $utils.trim_ascii(s, 0x20);
              }
              let _pipe$2 = _block$3;
              return $string.inspect(_pipe$2);
            },
          );
          _block$2 = $string.join(_pipe$2, ", ");
        } else if (vr instanceof $value_representation.IntegerString) {
          let _pipe = value$1;
          let _pipe$1 = $string.split(_pipe, "\\");
          let _pipe$2 = $list.map(
            _pipe$1,
            (s) => {
              let _block$3;
              if (vr instanceof $value_representation.UniqueIdentifier) {
                _block$3 = $utils.trim_ascii_end(s, 0x0);
              } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                _block$3 = $utils.trim_ascii_end(s, 0x20);
              } else {
                _block$3 = $utils.trim_ascii(s, 0x20);
              }
              let _pipe$2 = _block$3;
              return $string.inspect(_pipe$2);
            },
          );
          _block$2 = $string.join(_pipe$2, ", ");
        } else if (vr instanceof $value_representation.LongString) {
          let _pipe = value$1;
          let _pipe$1 = $string.split(_pipe, "\\");
          let _pipe$2 = $list.map(
            _pipe$1,
            (s) => {
              let _block$3;
              if (vr instanceof $value_representation.UniqueIdentifier) {
                _block$3 = $utils.trim_ascii_end(s, 0x0);
              } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                _block$3 = $utils.trim_ascii_end(s, 0x20);
              } else {
                _block$3 = $utils.trim_ascii(s, 0x20);
              }
              let _pipe$2 = _block$3;
              return $string.inspect(_pipe$2);
            },
          );
          _block$2 = $string.join(_pipe$2, ", ");
        } else if (vr instanceof $value_representation.PersonName) {
          let _pipe = value$1;
          let _pipe$1 = $string.split(_pipe, "\\");
          let _pipe$2 = $list.map(
            _pipe$1,
            (s) => {
              let _block$3;
              if (vr instanceof $value_representation.UniqueIdentifier) {
                _block$3 = $utils.trim_ascii_end(s, 0x0);
              } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                _block$3 = $utils.trim_ascii_end(s, 0x20);
              } else {
                _block$3 = $utils.trim_ascii(s, 0x20);
              }
              let _pipe$2 = _block$3;
              return $string.inspect(_pipe$2);
            },
          );
          _block$2 = $string.join(_pipe$2, ", ");
        } else if (vr instanceof $value_representation.ShortString) {
          let _pipe = value$1;
          let _pipe$1 = $string.split(_pipe, "\\");
          let _pipe$2 = $list.map(
            _pipe$1,
            (s) => {
              let _block$3;
              if (vr instanceof $value_representation.UniqueIdentifier) {
                _block$3 = $utils.trim_ascii_end(s, 0x0);
              } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                _block$3 = $utils.trim_ascii_end(s, 0x20);
              } else {
                _block$3 = $utils.trim_ascii(s, 0x20);
              }
              let _pipe$2 = _block$3;
              return $string.inspect(_pipe$2);
            },
          );
          _block$2 = $string.join(_pipe$2, ", ");
        } else if (vr instanceof $value_representation.Time) {
          let _pipe = value$1;
          let _pipe$1 = $bit_array.from_string(_pipe);
          let _pipe$2 = $time.from_bytes(_pipe$1);
          let _pipe$3 = $result.map(_pipe$2, $time.to_iso8601);
          _block$2 = $result.lazy_unwrap(
            _pipe$3,
            () => { return $string.inspect(value$1); },
          );
        } else if (vr instanceof $value_representation.UniqueIdentifier) {
          let _pipe = value$1;
          let _pipe$1 = $string.split(_pipe, "\\");
          let _pipe$2 = $list.map(
            _pipe$1,
            (s) => {
              let _block$3;
              if (vr instanceof $value_representation.UniqueIdentifier) {
                _block$3 = $utils.trim_ascii_end(s, 0x0);
              } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                _block$3 = $utils.trim_ascii_end(s, 0x20);
              } else {
                _block$3 = $utils.trim_ascii(s, 0x20);
              }
              let _pipe$2 = _block$3;
              return $string.inspect(_pipe$2);
            },
          );
          _block$2 = $string.join(_pipe$2, ", ");
        } else if (vr instanceof $value_representation.UnlimitedCharacters) {
          let _pipe = value$1;
          let _pipe$1 = $string.split(_pipe, "\\");
          let _pipe$2 = $list.map(
            _pipe$1,
            (s) => {
              let _block$3;
              if (vr instanceof $value_representation.UniqueIdentifier) {
                _block$3 = $utils.trim_ascii_end(s, 0x0);
              } else if (vr instanceof $value_representation.UnlimitedCharacters) {
                _block$3 = $utils.trim_ascii_end(s, 0x20);
              } else {
                _block$3 = $utils.trim_ascii(s, 0x20);
              }
              let _pipe$2 = _block$3;
              return $string.inspect(_pipe$2);
            },
          );
          _block$2 = $string.join(_pipe$2, ", ");
        } else {
          let _pipe = value$1;
          let _pipe$1 = $utils.trim_ascii_end(_pipe, 0x20);
          _block$2 = $string.inspect(_pipe$1);
        }
        let formatted_value = _block$2;
        let _block$3;
        if (vr instanceof $value_representation.CodeString) {
          let $1 = $code_strings.describe($string.trim(value$1), tag);
          if ($1 instanceof Ok) {
            let description = $1[0];
            _block$3 = new Some((" (" + description) + ")");
          } else {
            _block$3 = new None();
          }
        } else if (vr instanceof $value_representation.UniqueIdentifier) {
          let $1 = $dictionary.uid_name($utils.trim_ascii_end(value$1, 0x0));
          if ($1 instanceof Ok) {
            let uid_name = $1[0];
            _block$3 = new Some((" (" + uid_name) + ")");
          } else {
            _block$3 = new None();
          }
        } else {
          _block$3 = new None();
        }
        let suffix = _block$3;
        _block = new Ok([formatted_value, suffix]);
      } else {
        _block = new Ok(["!! Invalid UTF-8 data", new None()]);
      }
    } else {
      let vr = value.vr;
      let bytes$1 = value.bytes;
      if (vr instanceof $value_representation.AttributeTag) {
        let $ = $attribute_tag.from_bytes(bytes$1);
        if ($ instanceof Ok) {
          let tags = $[0];
          let _block$1;
          let _pipe = tags;
          let _pipe$1 = $list.take(_pipe, output_list_max_size);
          let _pipe$2 = $list.map(_pipe$1, $data_element_tag.to_string);
          _block$1 = $string.join(_pipe$2, ", ");
          let s = _block$1;
          _block = new Ok([s, new None()]);
        } else {
          _block = new Error(undefined);
        }
      } else if (vr instanceof $value_representation.FloatingPointDouble) {
        let $ = get_floats(value);
        if ($ instanceof Ok) {
          let floats = $[0];
          let _block$1;
          let _pipe = floats;
          let _pipe$1 = $list.take(_pipe, output_list_max_size);
          let _pipe$2 = $list.map(_pipe$1, $ieee_float.to_string);
          _block$1 = $string.join(_pipe$2, ", ");
          let s = _block$1;
          _block = new Ok([s, new None()]);
        } else {
          _block = new Error(undefined);
        }
      } else if (vr instanceof $value_representation.FloatingPointSingle) {
        let $ = get_floats(value);
        if ($ instanceof Ok) {
          let floats = $[0];
          let _block$1;
          let _pipe = floats;
          let _pipe$1 = $list.take(_pipe, output_list_max_size);
          let _pipe$2 = $list.map(_pipe$1, $ieee_float.to_string);
          _block$1 = $string.join(_pipe$2, ", ");
          let s = _block$1;
          _block = new Ok([s, new None()]);
        } else {
          _block = new Error(undefined);
        }
      } else if (vr instanceof $value_representation.OtherByteString) {
        _block = new Ok(
          [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
        );
      } else if (vr instanceof $value_representation.OtherDoubleString) {
        _block = new Ok(
          [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
        );
      } else if (vr instanceof $value_representation.OtherFloatString) {
        _block = new Ok(
          [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
        );
      } else if (vr instanceof $value_representation.OtherLongString) {
        _block = new Ok(
          [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
        );
      } else if (vr instanceof $value_representation.OtherVeryLongString) {
        _block = new Ok(
          [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
        );
      } else if (vr instanceof $value_representation.OtherWordString) {
        _block = new Ok(
          [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
        );
      } else if (vr instanceof $value_representation.SignedLong) {
        let $ = get_ints(value);
        if ($ instanceof Ok) {
          let ints = $[0];
          let _block$1;
          let _pipe = ints;
          let _pipe$1 = $list.take(_pipe, output_list_max_size);
          let _pipe$2 = $list.map(_pipe$1, $int.to_string);
          _block$1 = $string.join(_pipe$2, ", ");
          let s = _block$1;
          _block = new Ok([s, new None()]);
        } else {
          _block = new Error(undefined);
        }
      } else if (vr instanceof $value_representation.SignedShort) {
        let $ = get_ints(value);
        if ($ instanceof Ok) {
          let ints = $[0];
          let _block$1;
          let _pipe = ints;
          let _pipe$1 = $list.take(_pipe, output_list_max_size);
          let _pipe$2 = $list.map(_pipe$1, $int.to_string);
          _block$1 = $string.join(_pipe$2, ", ");
          let s = _block$1;
          _block = new Ok([s, new None()]);
        } else {
          _block = new Error(undefined);
        }
      } else if (vr instanceof $value_representation.SignedVeryLong) {
        let $ = get_big_ints(value);
        if ($ instanceof Ok) {
          let ints = $[0];
          let _block$1;
          let _pipe = ints;
          let _pipe$1 = $list.take(_pipe, output_list_max_size);
          let _pipe$2 = $list.map(_pipe$1, $bigi.to_string);
          _block$1 = $string.join(_pipe$2, ", ");
          let s = _block$1;
          _block = new Ok([s, new None()]);
        } else {
          _block = new Error(undefined);
        }
      } else if (vr instanceof $value_representation.Unknown) {
        _block = new Ok(
          [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
        );
      } else if (vr instanceof $value_representation.UnsignedLong) {
        let $ = get_ints(value);
        if ($ instanceof Ok) {
          let ints = $[0];
          let _block$1;
          let _pipe = ints;
          let _pipe$1 = $list.take(_pipe, output_list_max_size);
          let _pipe$2 = $list.map(_pipe$1, $int.to_string);
          _block$1 = $string.join(_pipe$2, ", ");
          let s = _block$1;
          _block = new Ok([s, new None()]);
        } else {
          _block = new Error(undefined);
        }
      } else if (vr instanceof $value_representation.UnsignedShort) {
        let $ = get_ints(value);
        if ($ instanceof Ok) {
          let ints = $[0];
          let _block$1;
          let _pipe = ints;
          let _pipe$1 = $list.take(_pipe, output_list_max_size);
          let _pipe$2 = $list.map(_pipe$1, $int.to_string);
          _block$1 = $string.join(_pipe$2, ", ");
          let s = _block$1;
          _block = new Ok([s, new None()]);
        } else {
          _block = new Error(undefined);
        }
      } else if (vr instanceof $value_representation.UnsignedVeryLong) {
        let $ = get_big_ints(value);
        if ($ instanceof Ok) {
          let ints = $[0];
          let _block$1;
          let _pipe = ints;
          let _pipe$1 = $list.take(_pipe, output_list_max_size);
          let _pipe$2 = $list.map(_pipe$1, $bigi.to_string);
          _block$1 = $string.join(_pipe$2, ", ");
          let s = _block$1;
          _block = new Ok([s, new None()]);
        } else {
          _block = new Error(undefined);
        }
      } else {
        _block = new Error(undefined);
      }
    }
  } else if (value instanceof LookupTableDescriptorValue) {
    let vr = value.vr;
    let bytes$1 = value.bytes;
    if (vr instanceof $value_representation.AttributeTag) {
      let $ = $attribute_tag.from_bytes(bytes$1);
      if ($ instanceof Ok) {
        let tags = $[0];
        let _block$1;
        let _pipe = tags;
        let _pipe$1 = $list.take(_pipe, output_list_max_size);
        let _pipe$2 = $list.map(_pipe$1, $data_element_tag.to_string);
        _block$1 = $string.join(_pipe$2, ", ");
        let s = _block$1;
        _block = new Ok([s, new None()]);
      } else {
        _block = new Error(undefined);
      }
    } else if (vr instanceof $value_representation.FloatingPointDouble) {
      let $ = get_floats(value);
      if ($ instanceof Ok) {
        let floats = $[0];
        let _block$1;
        let _pipe = floats;
        let _pipe$1 = $list.take(_pipe, output_list_max_size);
        let _pipe$2 = $list.map(_pipe$1, $ieee_float.to_string);
        _block$1 = $string.join(_pipe$2, ", ");
        let s = _block$1;
        _block = new Ok([s, new None()]);
      } else {
        _block = new Error(undefined);
      }
    } else if (vr instanceof $value_representation.FloatingPointSingle) {
      let $ = get_floats(value);
      if ($ instanceof Ok) {
        let floats = $[0];
        let _block$1;
        let _pipe = floats;
        let _pipe$1 = $list.take(_pipe, output_list_max_size);
        let _pipe$2 = $list.map(_pipe$1, $ieee_float.to_string);
        _block$1 = $string.join(_pipe$2, ", ");
        let s = _block$1;
        _block = new Ok([s, new None()]);
      } else {
        _block = new Error(undefined);
      }
    } else if (vr instanceof $value_representation.OtherByteString) {
      _block = new Ok(
        [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
      );
    } else if (vr instanceof $value_representation.OtherDoubleString) {
      _block = new Ok(
        [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
      );
    } else if (vr instanceof $value_representation.OtherFloatString) {
      _block = new Ok(
        [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
      );
    } else if (vr instanceof $value_representation.OtherLongString) {
      _block = new Ok(
        [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
      );
    } else if (vr instanceof $value_representation.OtherVeryLongString) {
      _block = new Ok(
        [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
      );
    } else if (vr instanceof $value_representation.OtherWordString) {
      _block = new Ok(
        [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
      );
    } else if (vr instanceof $value_representation.SignedLong) {
      let $ = get_ints(value);
      if ($ instanceof Ok) {
        let ints = $[0];
        let _block$1;
        let _pipe = ints;
        let _pipe$1 = $list.take(_pipe, output_list_max_size);
        let _pipe$2 = $list.map(_pipe$1, $int.to_string);
        _block$1 = $string.join(_pipe$2, ", ");
        let s = _block$1;
        _block = new Ok([s, new None()]);
      } else {
        _block = new Error(undefined);
      }
    } else if (vr instanceof $value_representation.SignedShort) {
      let $ = get_ints(value);
      if ($ instanceof Ok) {
        let ints = $[0];
        let _block$1;
        let _pipe = ints;
        let _pipe$1 = $list.take(_pipe, output_list_max_size);
        let _pipe$2 = $list.map(_pipe$1, $int.to_string);
        _block$1 = $string.join(_pipe$2, ", ");
        let s = _block$1;
        _block = new Ok([s, new None()]);
      } else {
        _block = new Error(undefined);
      }
    } else if (vr instanceof $value_representation.SignedVeryLong) {
      let $ = get_big_ints(value);
      if ($ instanceof Ok) {
        let ints = $[0];
        let _block$1;
        let _pipe = ints;
        let _pipe$1 = $list.take(_pipe, output_list_max_size);
        let _pipe$2 = $list.map(_pipe$1, $bigi.to_string);
        _block$1 = $string.join(_pipe$2, ", ");
        let s = _block$1;
        _block = new Ok([s, new None()]);
      } else {
        _block = new Error(undefined);
      }
    } else if (vr instanceof $value_representation.Unknown) {
      _block = new Ok(
        [$utils.inspect_bit_array(bytes$1, output_list_max_size), new None()],
      );
    } else if (vr instanceof $value_representation.UnsignedLong) {
      let $ = get_ints(value);
      if ($ instanceof Ok) {
        let ints = $[0];
        let _block$1;
        let _pipe = ints;
        let _pipe$1 = $list.take(_pipe, output_list_max_size);
        let _pipe$2 = $list.map(_pipe$1, $int.to_string);
        _block$1 = $string.join(_pipe$2, ", ");
        let s = _block$1;
        _block = new Ok([s, new None()]);
      } else {
        _block = new Error(undefined);
      }
    } else if (vr instanceof $value_representation.UnsignedShort) {
      let $ = get_ints(value);
      if ($ instanceof Ok) {
        let ints = $[0];
        let _block$1;
        let _pipe = ints;
        let _pipe$1 = $list.take(_pipe, output_list_max_size);
        let _pipe$2 = $list.map(_pipe$1, $int.to_string);
        _block$1 = $string.join(_pipe$2, ", ");
        let s = _block$1;
        _block = new Ok([s, new None()]);
      } else {
        _block = new Error(undefined);
      }
    } else if (vr instanceof $value_representation.UnsignedVeryLong) {
      let $ = get_big_ints(value);
      if ($ instanceof Ok) {
        let ints = $[0];
        let _block$1;
        let _pipe = ints;
        let _pipe$1 = $list.take(_pipe, output_list_max_size);
        let _pipe$2 = $list.map(_pipe$1, $bigi.to_string);
        _block$1 = $string.join(_pipe$2, ", ");
        let s = _block$1;
        _block = new Ok([s, new None()]);
      } else {
        _block = new Error(undefined);
      }
    } else {
      _block = new Error(undefined);
    }
  } else if (value instanceof EncapsulatedPixelDataValue) {
    let items = value.items;
    let _block$1;
    let _pipe = items;
    let _pipe$1 = $list.map(_pipe, $bit_array.byte_size);
    _block$1 = $list.fold(_pipe$1, 0, $int.add);
    let total_bytes = _block$1;
    let size = $list.length(items);
    let s = (("Items: " + $int.to_string(size)) + ", bytes: ") + $int.to_string(
      total_bytes,
    );
    _block = new Ok([s, new None()]);
  } else {
    let items = value.items;
    let s = "Items: " + (() => {
      let _pipe = items;
      let _pipe$1 = $list.length(_pipe);
      return $int.to_string(_pipe$1);
    })();
    _block = new Ok([s, new None()]);
  }
  let _pipe = _block;
  let _pipe$1 = $result.map(
    _pipe,
    (res) => {
      let s;
      let suffix;
      s = res[0];
      suffix = res[1];
      let _block$1;
      let _pipe$1 = suffix;
      _block$1 = $option.unwrap(_pipe$1, "");
      let suffix$1 = _block$1;
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

/**
 * Returns the float contained in a data element value. This is only supported
 * for value representations that contain floating point data and when exactly
 * one float is present.
 */
export function get_float(value) {
  return $result.try$(
    get_floats(value),
    (floats) => {
      if (floats instanceof $Empty) {
        return new Error($data_error.new_multiplicity_mismatch());
      } else {
        let $ = floats.tail;
        if ($ instanceof $Empty) {
          let f = floats.head;
          return new Ok(f);
        } else {
          return new Error($data_error.new_multiplicity_mismatch());
        }
      }
    },
  );
}

/**
 * Returns the structured age contained in a data element value. This is only
 * supported for the `AgeString` value representation.
 */
export function get_age(value) {
  if (value instanceof BinaryValue) {
    let $ = value.vr;
    if ($ instanceof $value_representation.AgeString) {
      let bytes$1 = value.bytes;
      return $age_string.from_bytes(bytes$1);
    } else {
      return new Error($data_error.new_value_not_present());
    }
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * Returns the data element tags contained in a data element value. This is
 * only supported for the `AttributeTag` value representation.
 */
export function get_attribute_tags(value) {
  if (value instanceof BinaryValue) {
    let $ = value.vr;
    if ($ instanceof $value_representation.AttributeTag) {
      let bytes$1 = value.bytes;
      return $attribute_tag.from_bytes(bytes$1);
    } else {
      return new Error($data_error.new_value_not_present());
    }
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * Returns the structured date contained in a data element value. This is only
 * supported for the `Date` value representation.
 */
export function get_date(value) {
  if (value instanceof BinaryValue) {
    let $ = value.vr;
    if ($ instanceof $value_representation.Date) {
      let bytes$1 = value.bytes;
      return $date.from_bytes(bytes$1);
    } else {
      return new Error($data_error.new_value_not_present());
    }
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * Returns the structured date/time contained in a data element value. This is
 * only supported for the `DateTime` value representation.
 */
export function get_date_time(value) {
  if (value instanceof BinaryValue) {
    let $ = value.vr;
    if ($ instanceof $value_representation.DateTime) {
      let bytes$1 = value.bytes;
      return $date_time.from_bytes(bytes$1);
    } else {
      return new Error($data_error.new_value_not_present());
    }
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * Returns the structured time contained in a data element value. This is only
 * supported for the `Time` value representation.
 */
export function get_time(value) {
  if (value instanceof BinaryValue) {
    let $ = value.vr;
    if ($ instanceof $value_representation.Time) {
      let bytes$1 = value.bytes;
      return $time.from_bytes(bytes$1);
    } else {
      return new Error($data_error.new_value_not_present());
    }
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * Returns the structured person names contained in a data element value. This
 * is only supported for the `PersonName` value representation.
 */
export function get_person_names(value) {
  if (value instanceof BinaryValue) {
    let $ = value.vr;
    if ($ instanceof $value_representation.PersonName) {
      let bytes$1 = value.bytes;
      return $person_name.from_bytes(bytes$1);
    } else {
      return new Error($data_error.new_value_not_present());
    }
  } else {
    return new Error($data_error.new_value_not_present());
  }
}

/**
 * Returns the structured person name contained in a data element value. This
 * is only supported for the `PersonName` value representation when exactly one
 * person name is present.
 */
export function get_person_name(value) {
  return $result.try$(
    get_person_names(value),
    (person_names) => {
      if (person_names instanceof $Empty) {
        return new Error($data_error.new_multiplicity_mismatch());
      } else {
        let $ = person_names.tail;
        if ($ instanceof $Empty) {
          let n = person_names.head;
          return new Ok(n);
        } else {
          return new Error($data_error.new_multiplicity_mismatch());
        }
      }
    },
  );
}

/**
 * Checks that the number of bytes stored in a data element value is valid for
 * its value representation.
 */
export function validate_length(value) {
  let _block;
  let _pipe = bytes(value);
  let _pipe$1 = $result.unwrap(_pipe, toBitArray([]));
  _block = $bit_array.byte_size(_pipe$1);
  let value_length = _block;
  if (value instanceof BinaryValue) {
    let vr = value.vr;
    let $ = $value_representation.length_requirements(vr);
    let bytes_max;
    let bytes_multiple_of;
    bytes_max = $.bytes_max;
    bytes_multiple_of = $.bytes_multiple_of;
    let _block$1;
    let _pipe$2 = bytes_multiple_of;
    _block$1 = $option.unwrap(_pipe$2, 2);
    let bytes_multiple_of$1 = _block$1;
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
  } else if (value instanceof LookupTableDescriptorValue) {
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
  } else if (value instanceof EncapsulatedPixelDataValue) {
    let vr = value.vr;
    let items = value.items;
    let _pipe$2 = items;
    let _pipe$3 = $list.try_each(
      _pipe$2,
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
          let $1 = item_length % 2;
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
    return $result.replace(_pipe$3, value);
  } else {
    return new Ok(value);
  }
}

/**
 * Constructs a new data element binary value with the specified value
 * representation. The only VR that's not allowed is `Sequence`. The length
 * of `bytes` must not exceed the maximum allowed for the VR, and, where
 * applicable, must also be an exact multiple of the size of the contained data
 * type. E.g. for the `UnsignedLong` VR the length of `bytes` must be a
 * multiple of 4.
 *
 * When the VR is a string type, `bytes` must be UTF-8 encoded in order for the
 * value to be readable.
 */
export function new_binary(vr, bytes) {
  let _block;
  if (vr instanceof $value_representation.Sequence) {
    _block = new Error(
      $data_error.new_value_invalid(
        ("Value representation '" + $value_representation.to_string(vr)) + "' is not valid for binary data",
      ),
    );
  } else {
    _block = new Ok(new BinaryValue(vr, bytes));
  }
  let vr_validation = _block;
  return $result.try$(
    vr_validation,
    (_) => {
      let _block$1;
      let $ = $value_representation.is_encoded_string(vr);
      if ($) {
        let $1 = $bit_array.is_utf8(bytes);
        if ($1) {
          _block$1 = new Ok(undefined);
        } else {
          _block$1 = new Error(
            $data_error.new_value_invalid(
              ("Bytes for '" + $value_representation.to_string(vr)) + "' are not valid UTF-8",
            ),
          );
        }
      } else {
        let $1 = $value_representation.is_string(vr);
        if ($1) {
          let $2 = validate_default_charset_bytes(bytes);
          if ($2 instanceof Ok) {
            _block$1 = $2;
          } else {
            let invalid_byte = $2[0];
            let _block$2;
            let _pipe = invalid_byte;
            let _pipe$1 = $int.to_base16(_pipe);
            _block$2 = $utils.pad_start(_pipe$1, 2, "0");
            let invalid_byte$1 = _block$2;
            _block$1 = new Error(
              $data_error.new_value_invalid(
                (("Bytes for '" + $value_representation.to_string(vr)) + "' has disallowed byte: 0x") + invalid_byte$1,
              ),
            );
          }
        } else {
          _block$1 = new Ok(undefined);
        }
      }
      let string_validation = _block$1;
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

/**
 * Constructs a new data element lookup table descriptor value with the
 * specified `vr`, which must be one of the following:
 *
 * - `SignedShort`
 * - `UnsignedShort`
 *
 * The length of `bytes` must be exactly six.
 */
export function new_lookup_table_descriptor(vr, bytes) {
  let _block;
  if (vr instanceof $value_representation.SignedShort) {
    _block = new Ok(undefined);
  } else if (vr instanceof $value_representation.UnsignedShort) {
    _block = new Ok(undefined);
  } else {
    _block = new Error(
      $data_error.new_value_invalid(
        ("Value representation '" + $value_representation.to_string(vr)) + "' is not valid for lookup table descriptor data",
      ),
    );
  }
  let vr_validation = _block;
  return $result.try$(
    vr_validation,
    (_) => {
      let value = new_lookup_table_descriptor_unchecked(vr, bytes);
      return validate_length(value);
    },
  );
}

/**
 * Constructs a new data element encapsulated pixel data value with the
 * specified `vr`, which must be one of the following:
 *
 * - `OtherByteString`
 * - `OtherWordString`
 *
 * Although the DICOM standard states that only `OtherByteString` is valid for
 * encapsulated pixel data, in practice this is not always followed.
 *
 * `items` specifies the data of the encapsulated pixel data items, where the
 * first item is an optional basic offset table, and is followed by fragments
 * of pixel data. Each item must be of even length. Ref: PS3.5 A.4.
 */
export function new_encapsulated_pixel_data(vr, items) {
  let _block;
  if (vr instanceof $value_representation.OtherByteString) {
    _block = new Ok(undefined);
  } else if (vr instanceof $value_representation.OtherWordString) {
    _block = new Ok(undefined);
  } else {
    _block = new Error(
      $data_error.new_value_invalid(
        ("Value representation '" + $value_representation.to_string(vr)) + "' is not valid for encapsulated pixel data",
      ),
    );
  }
  let vr_validation = _block;
  return $result.try$(
    vr_validation,
    (_) => {
      let value = new_encapsulated_pixel_data_unchecked(vr, items);
      return validate_length(value);
    },
  );
}

/**
 * Creates a new `AttributeTag` data element value.
 */
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

/**
 * Creates a new `DecimalString` data element value.
 */
export function new_decimal_string(value) {
  let _pipe = value;
  let _pipe$1 = $decimal_string.to_bytes(_pipe);
  return ((_capture) => {
    return new_binary(new $value_representation.DecimalString(), _capture);
  })(_pipe$1);
}

/**
 * Creates a new `FloatingPointDouble` data element value.
 */
export function new_floating_point_double(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(_pipe, $ieee_float.to_bytes_64_le);
  let _pipe$2 = $bit_array.concat(_pipe$1);
  return ((_capture) => {
    return new_binary(new $value_representation.FloatingPointDouble(), _capture);
  })(_pipe$2);
}

/**
 * Creates a new `FloatingPointSingle` data element value.
 */
export function new_floating_point_single(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(_pipe, $ieee_float.to_bytes_32_le);
  let _pipe$2 = $bit_array.concat(_pipe$1);
  return ((_capture) => {
    return new_binary(new $value_representation.FloatingPointSingle(), _capture);
  })(_pipe$2);
}

/**
 * Creates a new `IntegerString` data element value.
 */
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

/**
 * Creates a new `LongText` data element value.
 */
export function new_long_text(value) {
  let _pipe = value;
  let _pipe$1 = $utils.trim_ascii_end(_pipe, 0x20);
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

/**
 * Creates a new `OtherByteString` data element value.
 */
export function new_other_byte_string(value) {
  return new_binary(new $value_representation.OtherByteString(), value);
}

/**
 * Creates a new `OtherDoubleString` data element value.
 */
export function new_other_double_string(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(_pipe, $ieee_float.to_bytes_64_le);
  let _pipe$2 = $bit_array.concat(_pipe$1);
  return ((_capture) => {
    return new_binary(new $value_representation.OtherDoubleString(), _capture);
  })(_pipe$2);
}

/**
 * Creates a new `OtherFloatString` data element value.
 */
export function new_other_float_string(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(_pipe, $ieee_float.to_bytes_32_le);
  let _pipe$2 = $bit_array.concat(_pipe$1);
  return ((_capture) => {
    return new_binary(new $value_representation.OtherFloatString(), _capture);
  })(_pipe$2);
}

/**
 * Creates a new `OtherLongString` data element value.
 */
export function new_other_long_string(value) {
  return new_binary(new $value_representation.OtherLongString(), value);
}

/**
 * Creates a new `OtherVeryLongString` data element value.
 */
export function new_other_very_long_string(value) {
  return new_binary(new $value_representation.OtherVeryLongString(), value);
}

/**
 * Creates a new `OtherWordString` data element value.
 */
export function new_other_word_string(value) {
  return new_binary(new $value_representation.OtherWordString(), value);
}

/**
 * Creates a new `PersonName` data element value.
 */
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

/**
 * Creates a new `ShortText` data element value.
 */
export function new_short_text(value) {
  let _pipe = value;
  let _pipe$1 = $utils.trim_ascii_end(_pipe, 0x20);
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

/**
 * Creates a new `SignedLong` data element value.
 */
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

/**
 * Creates a new `SignedShort` data element value.
 */
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

/**
 * Creates a new `SignedVeryLong` data element value.
 */
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

/**
 * Creates a new `UniqueIdentifier` data element value.
 */
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

/**
 * Creates a new `UniversalResourceIdentifier` data element value.
 */
export function new_universal_resource_identifier(value) {
  let _pipe = value;
  let _pipe$1 = $utils.trim_ascii(_pipe, 0x20);
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

/**
 * Creates a new `Unknown` data element value.
 */
export function new_unknown(value) {
  return new_binary(new $value_representation.Unknown(), value);
}

/**
 * Creates a new `UnlimitedText` data element value.
 */
export function new_unlimited_text(value) {
  let _pipe = value;
  let _pipe$1 = $utils.trim_ascii_end(_pipe, 0x20);
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

/**
 * Creates a new `UnsignedLong` data element value.
 */
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

/**
 * Creates a new `UnsignedShort` data element value.
 */
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

/**
 * Creates a new `UnsignedVeryLong` data element value.
 */
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

/**
 * Creates a data element containing a multi-valued string. This checks that
 * the individual values are valid and then combines them into final bytes.
 * 
 * @ignore
 */
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

/**
 * Creates a new `ApplicationEntity` data element value.
 */
export function new_application_entity(value) {
  let _pipe = toList([value]);
  let _pipe$1 = $list.map(
    _pipe,
    (_capture) => { return $utils.trim_ascii_end(_capture, 0x20); },
  );
  return ((_capture) => {
    return new_string_list(
      new $value_representation.ApplicationEntity(),
      _capture,
    );
  })(_pipe$1);
}

/**
 * Creates a new `CodeString` data element value.
 */
export function new_code_string(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(
    _pipe,
    (_capture) => { return $utils.trim_ascii(_capture, 0x20); },
  );
  return ((_capture) => {
    return new_string_list(new $value_representation.CodeString(), _capture);
  })(_pipe$1);
}

/**
 * Creates a new `LongString` data element value.
 */
export function new_long_string(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(
    _pipe,
    (_capture) => { return $utils.trim_ascii(_capture, 0x20); },
  );
  return ((_capture) => {
    return new_string_list(new $value_representation.LongString(), _capture);
  })(_pipe$1);
}

/**
 * Creates a new `ShortString` data element value.
 */
export function new_short_string(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(
    _pipe,
    (_capture) => { return $utils.trim_ascii(_capture, 0x20); },
  );
  return ((_capture) => {
    return new_string_list(new $value_representation.ShortString(), _capture);
  })(_pipe$1);
}

/**
 * Creates a new `UnlimitedCharacters` data element value.
 */
export function new_unlimited_characters(value) {
  let _pipe = value;
  let _pipe$1 = $list.map(
    _pipe,
    (_capture) => { return $utils.trim_ascii_end(_capture, 0x20); },
  );
  return ((_capture) => {
    return new_string_list(
      new $value_representation.UnlimitedCharacters(),
      _capture,
    );
  })(_pipe$1);
}

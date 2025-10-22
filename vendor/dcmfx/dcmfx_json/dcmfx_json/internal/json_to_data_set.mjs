/// <reference types="./json_to_data_set.d.mts" />
import * as $bigi from "../../../bigi/bigi.mjs";
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $decimal_string from "../../../dcmfx_core/dcmfx_core/data_element_value/decimal_string.mjs";
import * as $integer_string from "../../../dcmfx_core/dcmfx_core/data_element_value/integer_string.mjs";
import * as $data_set from "../../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $data_set_path from "../../../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $dictionary from "../../../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $bit_array_utils from "../../../dcmfx_core/dcmfx_core/internal/bit_array_utils.mjs";
import * as $utils from "../../../dcmfx_core/dcmfx_core/internal/utils.mjs";
import * as $transfer_syntax from "../../../dcmfx_core/dcmfx_core/transfer_syntax.mjs";
import * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $dict from "../../../gleam_stdlib/gleam/dict.mjs";
import * as $decode from "../../../gleam_stdlib/gleam/dynamic/decode.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $ieee_float from "../../../ieee_float/ieee_float.mjs";
import * as $json_error from "../../dcmfx_json/json_error.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
  toBitArray,
  bitArraySlice,
  bitArraySliceToInt,
  sizedInt,
} from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_json/internal/json_to_data_set.gleam";

class PersonNameVariants extends $CustomType {
  constructor(alphabetic, ideographic, phonetic) {
    super();
    this.alphabetic = alphabetic;
    this.ideographic = ideographic;
    this.phonetic = phonetic;
  }
}

/**
 * Reads a native value representation from a DICOM JSON "vr" property.
 * 
 * @ignore
 */
function read_dicom_json_vr(raw_value, path) {
  let _block;
  let _pipe = raw_value;
  let _pipe$1 = $dict.get(_pipe, "vr");
  _block = $result.replace_error(
    _pipe$1,
    new $json_error.JsonInvalid("Data element value has no VR", path),
  );
  let raw_vr = _block;
  return $result.try$(
    raw_vr,
    (raw_vr) => {
      let _block$1;
      let _pipe$2 = raw_vr;
      let _pipe$3 = $decode.run(_pipe$2, $decode.string);
      _block$1 = $result.replace_error(
        _pipe$3,
        new $json_error.JsonInvalid("VR is not a string", path),
      );
      let vr_string = _block$1;
      return $result.try$(
        vr_string,
        (vr_string) => {
          let _pipe$4 = vr_string;
          let _pipe$5 = $bit_array.from_string(_pipe$4);
          let _pipe$6 = $value_representation.from_bytes(_pipe$5);
          return $result.replace_error(
            _pipe$6,
            new $json_error.JsonInvalid("VR is invalid: " + vr_string, path),
          );
        },
      );
    },
  );
}

/**
 * Decodes JSON to an `IEEEFloat`. Because gleam_json on Erlang doesn't
 * natively support Infinity and NaN values, these are instead handled as
 * strings.
 * 
 * @ignore
 */
function decode_ieee_float() {
  return $decode.one_of(
    (() => {
      let _pipe = $decode.float;
      return $decode.map(_pipe, $ieee_float.finite);
    })(),
    toList([
      (() => {
        let _pipe = $decode.int;
        let _pipe$1 = $decode.map(_pipe, $int.to_float);
        return $decode.map(_pipe$1, $ieee_float.finite);
      })(),
      $decode.then$(
        $decode.string,
        (s) => {
          if (s === "Infinity") {
            return $decode.success($ieee_float.positive_infinity());
          } else if (s === "-Infinity") {
            return $decode.success($ieee_float.negative_infinity());
          } else if (s === "NaN") {
            return $decode.success($ieee_float.nan());
          } else {
            return $decode.failure($ieee_float.finite(0.0), "Number");
          }
        },
      ),
    ]),
  );
}

/**
 * Reads a data element value from a DICOM JSON person name.
 * 
 * @ignore
 */
function read_dicom_json_person_name_value(value, path) {
  let _block;
  let _pipe = value;
  let _pipe$1 = $decode.run(
    _pipe,
    $decode.list(
      $decode.optional_field(
        "Alphabetic",
        "",
        $decode.string,
        (alphabetic) => {
          return $decode.optional_field(
            "Ideographic",
            "",
            $decode.string,
            (ideographic) => {
              return $decode.optional_field(
                "Phonetic",
                "",
                $decode.string,
                (phonetic) => {
                  return $decode.success(
                    new PersonNameVariants(
                      new Some(alphabetic),
                      new Some(ideographic),
                      new Some(phonetic),
                    ),
                  );
                },
              );
            },
          );
        },
      ),
    ),
  );
  _block = $result.replace_error(
    _pipe$1,
    new $json_error.JsonInvalid("PersonName value is invalid", path),
  );
  let person_name_variants = _block;
  return $result.try$(
    person_name_variants,
    (person_name_variants) => {
      let _pipe$2 = person_name_variants;
      let _pipe$3 = $list.map(
        _pipe$2,
        (raw_person_name) => {
          let _pipe$3 = toList([
            $option.unwrap(raw_person_name.alphabetic, ""),
            $option.unwrap(raw_person_name.ideographic, ""),
            $option.unwrap(raw_person_name.phonetic, ""),
          ]);
          let _pipe$4 = $string.join(_pipe$3, "=");
          return $utils.trim_ascii_end(_pipe$4, 0x3D);
        },
      );
      let _pipe$4 = $string.join(_pipe$3, "\\");
      let _pipe$5 = $bit_array.from_string(_pipe$4);
      let _pipe$6 = $bit_array_utils.pad_to_even_length(_pipe$5, 0x20);
      let _pipe$7 = ((_capture) => {
        return $data_element_value.new_binary_unchecked(
          new $value_representation.PersonName(),
          _capture,
        );
      })(_pipe$6);
      return new Ok(_pipe$7);
    },
  );
}

/**
 * Reads an encapsulated pixel data value from raw bytes.
 * 
 * @ignore
 */
function read_encapsulated_pixel_data_items(bytes, vr, items) {
  if (bytes.bitSize >= 16) {
    if (
      bytes.byteAt(0) === 254 && bytes.byteAt(1) === 255 &&
      bytes.bitSize >= 32 &&
      bytes.byteAt(2) === 0 && bytes.byteAt(3) === 224 &&
      bytes.bitSize >= 64 &&
      (bytes.bitSize - 64) % 8 === 0
    ) {
      let length = bitArraySliceToInt(bytes, 32, 64, false, false);
      let rest = bitArraySlice(bytes, 64);
      return $result.try$(
        $bit_array.slice(rest, 0, length),
        (item) => {
          return $result.try$(
            $bit_array.slice(rest, length, $bit_array.byte_size(rest) - length),
            (rest) => {
              return read_encapsulated_pixel_data_items(
                rest,
                vr,
                listPrepend(item, items),
              );
            },
          );
        },
      );
    } else {
      return new Error(undefined);
    }
  } else if (bytes.bitSize === 0) {
    let _pipe = items;
    let _pipe$1 = $list.reverse(_pipe);
    let _pipe$2 = ((_capture) => {
      return $data_element_value.new_encapsulated_pixel_data_unchecked(
        vr,
        _capture,
      );
    })(_pipe$1);
    return new Ok(_pipe$2);
  } else {
    return new Error(undefined);
  }
}

/**
 * Reads a data element value from a DICOM JSON "InlineBinary" property.
 * 
 * @ignore
 */
function read_dicom_json_inline_binary_value(
  inline_binary,
  tag,
  vr,
  transfer_syntax,
  path
) {
  let _block;
  let _pipe = inline_binary;
  let _pipe$1 = $decode.run(_pipe, $decode.string);
  _block = $result.replace_error(
    _pipe$1,
    new $json_error.JsonInvalid("InlineBinary is not a string", path),
  );
  let inline_binary$1 = _block;
  return $result.try$(
    inline_binary$1,
    (inline_binary) => {
      let _block$1;
      let _pipe$2 = inline_binary;
      let _pipe$3 = $bit_array.base64_decode(_pipe$2);
      _block$1 = $result.replace_error(
        _pipe$3,
        new $json_error.JsonInvalid("InlineBinary is not a string", path),
      );
      let bytes = _block$1;
      return $result.try$(
        bytes,
        (bytes) => {
          let $ = (isEqual(tag, $dictionary.pixel_data.tag)) && (isEqual(
            $option.map(transfer_syntax, (ts) => { return ts.is_encapsulated; }),
            new Some(true)
          ));
          if ($) {
            let _pipe$4 = read_encapsulated_pixel_data_items(
              bytes,
              vr,
              toList([]),
            );
            return $result.replace_error(
              _pipe$4,
              new $json_error.JsonInvalid(
                "InlineBinary is not valid encapsulated pixel data",
                path,
              ),
            );
          } else {
            if (vr instanceof $value_representation.OtherByteString) {
              return new Ok($data_element_value.new_binary_unchecked(vr, bytes));
            } else if (vr instanceof $value_representation.OtherDoubleString) {
              return new Ok($data_element_value.new_binary_unchecked(vr, bytes));
            } else if (vr instanceof $value_representation.OtherFloatString) {
              return new Ok($data_element_value.new_binary_unchecked(vr, bytes));
            } else if (vr instanceof $value_representation.OtherLongString) {
              return new Ok($data_element_value.new_binary_unchecked(vr, bytes));
            } else if (vr instanceof $value_representation.OtherVeryLongString) {
              return new Ok($data_element_value.new_binary_unchecked(vr, bytes));
            } else if (vr instanceof $value_representation.OtherWordString) {
              return new Ok($data_element_value.new_binary_unchecked(vr, bytes));
            } else if (vr instanceof $value_representation.Unknown) {
              return new Ok($data_element_value.new_binary_unchecked(vr, bytes));
            } else {
              return new Error(
                new $json_error.JsonInvalid(
                  "InlineBinary for a VR that doesn't support it",
                  path,
                ),
              );
            }
          }
        },
      );
    },
  );
}

/**
 * Reads a data element value from a DICOM JSON "Value" property.
 * 
 * @ignore
 */
function read_dicom_json_primitive_value(tag, vr, value, path) {
  if (vr instanceof $value_representation.AgeString) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.ApplicationEntity) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.AttributeTag) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(_pipe, $decode.list($decode.string));
    _block = $result.replace_error(
      _pipe$1,
      new $json_error.JsonInvalid("AttributeTag value is invalid", path),
    );
    let tags = _block;
    return $result.try$(
      tags,
      (tags) => {
        let _block$1;
        let _pipe$2 = tags;
        let _pipe$3 = $list.map(
          _pipe$2,
          (tag) => {
            let _pipe$3 = tag;
            let _pipe$4 = $data_element_tag.from_hex_string(_pipe$3);
            return $result.map(
              _pipe$4,
              (tag) => {
                return toBitArray([
                  sizedInt(tag.group, 16, false),
                  sizedInt(tag.element, 16, false),
                ]);
              },
            );
          },
        );
        let _pipe$4 = $result.all(_pipe$3);
        _block$1 = $result.replace_error(
          _pipe$4,
          new $json_error.JsonInvalid("AttributeTag value is invalid", path),
        );
        let tags$1 = _block$1;
        return $result.try$(
          tags$1,
          (tags) => {
            let _pipe$5 = tags;
            let _pipe$6 = $bit_array.concat(_pipe$5);
            let _pipe$7 = ((_capture) => {
              return $data_element_value.new_binary_unchecked(vr, _capture);
            })(_pipe$6);
            return new Ok(_pipe$7);
          },
        );
      },
    );
  } else if (vr instanceof $value_representation.CodeString) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.Date) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.DateTime) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.DecimalString) {
    let _pipe = value;
    let _pipe$1 = $decode.run(_pipe, $decode.list($decode.dynamic));
    let _pipe$2 = $result.try$(
      _pipe$1,
      (lst) => {
        let _pipe$2 = $list.map(
          lst,
          (i) => {
            let $ = $decode.run(i, $decode.float);
            if ($ instanceof Ok) {
              return $;
            } else {
              let $1 = $decode.run(i, $decode.int);
              if ($1 instanceof Ok) {
                let i$1 = $1[0];
                return new Ok($int.to_float(i$1));
              } else {
                return $1;
              }
            }
          },
        );
        return $result.all(_pipe$2);
      },
    );
    let _pipe$3 = $result.replace_error(
      _pipe$2,
      new $json_error.JsonInvalid("DecimalString value is invalid", path),
    );
    let _pipe$4 = $result.map(_pipe$3, $decimal_string.to_bytes);
    return $result.map(
      _pipe$4,
      (_capture) => {
        return $data_element_value.new_binary_unchecked(vr, _capture);
      },
    );
  } else if (vr instanceof $value_representation.FloatingPointDouble) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(_pipe, $decode.list(decode_ieee_float()));
    _block = $result.replace_error(
      _pipe$1,
      new $json_error.JsonInvalid("FloatingPointDouble value is invalid", path),
    );
    let floats = _block;
    return $result.try$(
      floats,
      (floats) => {
        let _pipe$2 = floats;
        let _pipe$3 = $list.map(_pipe$2, $ieee_float.to_bytes_64_le);
        let _pipe$4 = $bit_array.concat(_pipe$3);
        let _pipe$5 = ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
        return new Ok(_pipe$5);
      },
    );
  } else if (vr instanceof $value_representation.FloatingPointSingle) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(_pipe, $decode.list(decode_ieee_float()));
    _block = $result.replace_error(
      _pipe$1,
      new $json_error.JsonInvalid("FloatingPointSingle value is invalid", path),
    );
    let floats = _block;
    return $result.try$(
      floats,
      (floats) => {
        let _pipe$2 = floats;
        let _pipe$3 = $list.map(_pipe$2, $ieee_float.to_bytes_32_le);
        let _pipe$4 = $bit_array.concat(_pipe$3);
        let _pipe$5 = ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
        return new Ok(_pipe$5);
      },
    );
  } else if (vr instanceof $value_representation.IntegerString) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(_pipe, $decode.list($decode.int));
    _block = $result.replace_error(
      _pipe$1,
      new $json_error.JsonInvalid("IntegerString value is invalid", path),
    );
    let ints = _block;
    return $result.try$(
      ints,
      (ints) => {
        let _block$1;
        let _pipe$2 = ints;
        let _pipe$3 = $integer_string.to_bytes(_pipe$2);
        _block$1 = $result.replace_error(
          _pipe$3,
          new $json_error.JsonInvalid("IntegerString value is invalid", path),
        );
        let bytes = _block$1;
        return $result.try$(
          bytes,
          (bytes) => {
            return new Ok($data_element_value.new_binary_unchecked(vr, bytes));
          },
        );
      },
    );
  } else if (vr instanceof $value_representation.LongString) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.LongText) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.PersonName) {
    return read_dicom_json_person_name_value(value, path);
  } else if (vr instanceof $value_representation.Sequence) {
    let _pipe = value;
    let _pipe$1 = $decode.run(_pipe, $decode.list($decode.dynamic));
    let _pipe$2 = $result.replace_error(
      _pipe$1,
      new $json_error.JsonInvalid("Sequence value is invalid", path),
    );
    let _pipe$3 = $result.map(
      _pipe$2,
      (_capture) => {
        return $list.map(
          _capture,
          (json) => {
            return convert_json_to_data_set(json, $data_set_path.new$());
          },
        );
      },
    );
    let _pipe$4 = $result.map(_pipe$3, $result.all);
    let _pipe$5 = $result.flatten(_pipe$4);
    return $result.map(_pipe$5, $data_element_value.new_sequence);
  } else if (vr instanceof $value_representation.ShortString) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.ShortText) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.SignedLong) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(_pipe, $decode.list($decode.int));
    _block = $result.replace_error(
      _pipe$1,
      new $json_error.JsonInvalid("SignedLong value is invalid", path),
    );
    let ints = _block;
    return $result.try$(
      ints,
      (ints) => {
        let is_valid = $list.all(
          ints,
          (i) => { return (i >= -1 * 0x80000000) && (i <= 0x7FFFFFFF); },
        );
        return $bool.guard(
          !is_valid,
          new Error(
            new $json_error.JsonInvalid(
              "SignedLong value is out of range",
              path,
            ),
          ),
          () => {
            let _pipe$2 = ints;
            let _pipe$3 = $list.map(
              _pipe$2,
              (x) => { return toBitArray([sizedInt(x, 32, false)]); },
            );
            let _pipe$4 = $bit_array.concat(_pipe$3);
            let _pipe$5 = ((_capture) => {
              return $data_element_value.new_binary_unchecked(vr, _capture);
            })(_pipe$4);
            return new Ok(_pipe$5);
          },
        );
      },
    );
  } else if (vr instanceof $value_representation.SignedShort) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(_pipe, $decode.list($decode.int));
    _block = $result.replace_error(
      _pipe$1,
      new $json_error.JsonInvalid("Short value is invalid", path),
    );
    let ints = _block;
    return $result.try$(
      ints,
      (ints) => {
        let $ = $dictionary.is_lut_descriptor_tag(tag);
        if ($) {
          if (ints instanceof $Empty) {
            let _block$1;
            if (vr instanceof $value_representation.SignedShort) {
              _block$1 = [-1 * 0x8000, 0x7FFF];
            } else {
              _block$1 = [0, 0xFFFF];
            }
            let $1 = _block$1;
            let min;
            let max;
            min = $1[0];
            max = $1[1];
            let is_valid = $list.all(
              ints,
              (i) => { return (i >= min) && (i <= max); },
            );
            return $bool.guard(
              !is_valid,
              new Error(
                new $json_error.JsonInvalid("Short value is out of range", path),
              ),
              () => {
                let _pipe$2 = ints;
                let _pipe$3 = $list.map(
                  _pipe$2,
                  (i) => { return toBitArray([sizedInt(i, 16, false)]); },
                );
                let _pipe$4 = $bit_array.concat(_pipe$3);
                let _pipe$5 = ((_capture) => {
                  return $data_element_value.new_binary_unchecked(vr, _capture);
                })(_pipe$4);
                return new Ok(_pipe$5);
              },
            );
          } else {
            let $1 = ints.tail;
            if ($1 instanceof $Empty) {
              let _block$1;
              if (vr instanceof $value_representation.SignedShort) {
                _block$1 = [-1 * 0x8000, 0x7FFF];
              } else {
                _block$1 = [0, 0xFFFF];
              }
              let $2 = _block$1;
              let min;
              let max;
              min = $2[0];
              max = $2[1];
              let is_valid = $list.all(
                ints,
                (i) => { return (i >= min) && (i <= max); },
              );
              return $bool.guard(
                !is_valid,
                new Error(
                  new $json_error.JsonInvalid(
                    "Short value is out of range",
                    path,
                  ),
                ),
                () => {
                  let _pipe$2 = ints;
                  let _pipe$3 = $list.map(
                    _pipe$2,
                    (i) => { return toBitArray([sizedInt(i, 16, false)]); },
                  );
                  let _pipe$4 = $bit_array.concat(_pipe$3);
                  let _pipe$5 = ((_capture) => {
                    return $data_element_value.new_binary_unchecked(
                      vr,
                      _capture,
                    );
                  })(_pipe$4);
                  return new Ok(_pipe$5);
                },
              );
            } else {
              let $2 = $1.tail;
              if ($2 instanceof $Empty) {
                let _block$1;
                if (vr instanceof $value_representation.SignedShort) {
                  _block$1 = [-1 * 0x8000, 0x7FFF];
                } else {
                  _block$1 = [0, 0xFFFF];
                }
                let $3 = _block$1;
                let min;
                let max;
                min = $3[0];
                max = $3[1];
                let is_valid = $list.all(
                  ints,
                  (i) => { return (i >= min) && (i <= max); },
                );
                return $bool.guard(
                  !is_valid,
                  new Error(
                    new $json_error.JsonInvalid(
                      "Short value is out of range",
                      path,
                    ),
                  ),
                  () => {
                    let _pipe$2 = ints;
                    let _pipe$3 = $list.map(
                      _pipe$2,
                      (i) => { return toBitArray([sizedInt(i, 16, false)]); },
                    );
                    let _pipe$4 = $bit_array.concat(_pipe$3);
                    let _pipe$5 = ((_capture) => {
                      return $data_element_value.new_binary_unchecked(
                        vr,
                        _capture,
                      );
                    })(_pipe$4);
                    return new Ok(_pipe$5);
                  },
                );
              } else {
                let $3 = $2.tail;
                if ($3 instanceof $Empty) {
                  let entry_count = ints.head;
                  let first_input_value = $1.head;
                  let bits_per_entry = $2.head;
                  let _pipe$2 = toBitArray([
                    sizedInt(entry_count, 16, false),
                    sizedInt(first_input_value, 16, false),
                    sizedInt(bits_per_entry, 16, false),
                  ]);
                  let _pipe$3 = ((_capture) => {
                    return $data_element_value.new_lookup_table_descriptor_unchecked(
                      vr,
                      _capture,
                    );
                  })(_pipe$2);
                  return new Ok(_pipe$3);
                } else {
                  let _block$1;
                  if (vr instanceof $value_representation.SignedShort) {
                    _block$1 = [-1 * 0x8000, 0x7FFF];
                  } else {
                    _block$1 = [0, 0xFFFF];
                  }
                  let $4 = _block$1;
                  let min;
                  let max;
                  min = $4[0];
                  max = $4[1];
                  let is_valid = $list.all(
                    ints,
                    (i) => { return (i >= min) && (i <= max); },
                  );
                  return $bool.guard(
                    !is_valid,
                    new Error(
                      new $json_error.JsonInvalid(
                        "Short value is out of range",
                        path,
                      ),
                    ),
                    () => {
                      let _pipe$2 = ints;
                      let _pipe$3 = $list.map(
                        _pipe$2,
                        (i) => { return toBitArray([sizedInt(i, 16, false)]); },
                      );
                      let _pipe$4 = $bit_array.concat(_pipe$3);
                      let _pipe$5 = ((_capture) => {
                        return $data_element_value.new_binary_unchecked(
                          vr,
                          _capture,
                        );
                      })(_pipe$4);
                      return new Ok(_pipe$5);
                    },
                  );
                }
              }
            }
          }
        } else {
          let _block$1;
          if (vr instanceof $value_representation.SignedShort) {
            _block$1 = [-1 * 0x8000, 0x7FFF];
          } else {
            _block$1 = [0, 0xFFFF];
          }
          let $1 = _block$1;
          let min;
          let max;
          min = $1[0];
          max = $1[1];
          let is_valid = $list.all(
            ints,
            (i) => { return (i >= min) && (i <= max); },
          );
          return $bool.guard(
            !is_valid,
            new Error(
              new $json_error.JsonInvalid("Short value is out of range", path),
            ),
            () => {
              let _pipe$2 = ints;
              let _pipe$3 = $list.map(
                _pipe$2,
                (i) => { return toBitArray([sizedInt(i, 16, false)]); },
              );
              let _pipe$4 = $bit_array.concat(_pipe$3);
              let _pipe$5 = ((_capture) => {
                return $data_element_value.new_binary_unchecked(vr, _capture);
              })(_pipe$4);
              return new Ok(_pipe$5);
            },
          );
        }
      },
    );
  } else if (vr instanceof $value_representation.SignedVeryLong) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(_pipe, $decode.list($decode.dynamic));
    _block = $result.replace_error(
      _pipe$1,
      new $json_error.JsonInvalid("Very long value is not a list", path),
    );
    let values = _block;
    return $result.try$(
      values,
      (values) => {
        let _block$1;
        let _pipe$2 = values;
        let _pipe$3 = $list.map(
          _pipe$2,
          (i) => {
            let $ = $decode.run(i, $decode.int);
            if ($ instanceof Ok) {
              let i$1 = $[0];
              return new Ok($bigi.from_int(i$1));
            } else {
              let $1 = $decode.run(i, $decode.string);
              if ($1 instanceof Ok) {
                let i$1 = $1[0];
                return $bigi.from_string(i$1);
              } else {
                return new Error(undefined);
              }
            }
          },
        );
        let _pipe$4 = $result.all(_pipe$3);
        _block$1 = $result.replace_error(
          _pipe$4,
          new $json_error.JsonInvalid("Very long value is invalid", path),
        );
        let big_ints = _block$1;
        return $result.try$(
          big_ints,
          (big_ints) => {
            let _block$2;
            if (vr instanceof $value_representation.SignedVeryLong) {
              _block$2 = new $bigi.Signed();
            } else {
              _block$2 = new $bigi.Unsigned();
            }
            let signedness = _block$2;
            let _pipe$5 = big_ints;
            let _pipe$6 = $list.map(
              _pipe$5,
              (_capture) => {
                return $bigi.to_bytes(
                  _capture,
                  new $bigi.LittleEndian(),
                  signedness,
                  8,
                );
              },
            );
            let _pipe$7 = $result.all(_pipe$6);
            let _pipe$8 = $result.map_error(
              _pipe$7,
              (_) => {
                return new $json_error.JsonInvalid(
                  "Very long value is out of range",
                  path,
                );
              },
            );
            let _pipe$9 = $result.map(_pipe$8, $bit_array.concat);
            return $result.map(
              _pipe$9,
              (_capture) => {
                return $data_element_value.new_binary_unchecked(vr, _capture);
              },
            );
          },
        );
      },
    );
  } else if (vr instanceof $value_representation.Time) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.UniqueIdentifier) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.UniversalResourceIdentifier) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.UnlimitedCharacters) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.UnlimitedText) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(
      _pipe,
      $decode.list($decode.optional($decode.string)),
    );
    _block = $result.map_error(
      _pipe$1,
      (_) => {
        return new $json_error.JsonInvalid("String value is invalid", path);
      },
    );
    let value$1 = _block;
    return $result.map(
      value$1,
      (value) => {
        let _pipe$2 = value;
        let _pipe$3 = $list.map(
          _pipe$2,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$4 = $string.join(_pipe$3, "\\");
        let _pipe$5 = $bit_array.from_string(_pipe$4);
        let _pipe$6 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$5);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$6);
      },
    );
  } else if (vr instanceof $value_representation.UnsignedLong) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(_pipe, $decode.list($decode.int));
    _block = $result.replace_error(
      _pipe$1,
      new $json_error.JsonInvalid("UnsignedLong value is invalid", path),
    );
    let ints = _block;
    return $result.try$(
      ints,
      (ints) => {
        let is_valid = $list.all(
          ints,
          (i) => { return (i >= 0) && (i <= 0xFFFFFFFF); },
        );
        return $bool.guard(
          !is_valid,
          new Error(
            new $json_error.JsonInvalid(
              "UnsignedLong value is out of range",
              path,
            ),
          ),
          () => {
            let _pipe$2 = ints;
            let _pipe$3 = $list.map(
              _pipe$2,
              (x) => { return toBitArray([sizedInt(x, 32, false)]); },
            );
            let _pipe$4 = $bit_array.concat(_pipe$3);
            let _pipe$5 = ((_capture) => {
              return $data_element_value.new_binary_unchecked(vr, _capture);
            })(_pipe$4);
            return new Ok(_pipe$5);
          },
        );
      },
    );
  } else if (vr instanceof $value_representation.UnsignedShort) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(_pipe, $decode.list($decode.int));
    _block = $result.replace_error(
      _pipe$1,
      new $json_error.JsonInvalid("Short value is invalid", path),
    );
    let ints = _block;
    return $result.try$(
      ints,
      (ints) => {
        let $ = $dictionary.is_lut_descriptor_tag(tag);
        if ($) {
          if (ints instanceof $Empty) {
            let _block$1;
            if (vr instanceof $value_representation.SignedShort) {
              _block$1 = [-1 * 0x8000, 0x7FFF];
            } else {
              _block$1 = [0, 0xFFFF];
            }
            let $1 = _block$1;
            let min;
            let max;
            min = $1[0];
            max = $1[1];
            let is_valid = $list.all(
              ints,
              (i) => { return (i >= min) && (i <= max); },
            );
            return $bool.guard(
              !is_valid,
              new Error(
                new $json_error.JsonInvalid("Short value is out of range", path),
              ),
              () => {
                let _pipe$2 = ints;
                let _pipe$3 = $list.map(
                  _pipe$2,
                  (i) => { return toBitArray([sizedInt(i, 16, false)]); },
                );
                let _pipe$4 = $bit_array.concat(_pipe$3);
                let _pipe$5 = ((_capture) => {
                  return $data_element_value.new_binary_unchecked(vr, _capture);
                })(_pipe$4);
                return new Ok(_pipe$5);
              },
            );
          } else {
            let $1 = ints.tail;
            if ($1 instanceof $Empty) {
              let _block$1;
              if (vr instanceof $value_representation.SignedShort) {
                _block$1 = [-1 * 0x8000, 0x7FFF];
              } else {
                _block$1 = [0, 0xFFFF];
              }
              let $2 = _block$1;
              let min;
              let max;
              min = $2[0];
              max = $2[1];
              let is_valid = $list.all(
                ints,
                (i) => { return (i >= min) && (i <= max); },
              );
              return $bool.guard(
                !is_valid,
                new Error(
                  new $json_error.JsonInvalid(
                    "Short value is out of range",
                    path,
                  ),
                ),
                () => {
                  let _pipe$2 = ints;
                  let _pipe$3 = $list.map(
                    _pipe$2,
                    (i) => { return toBitArray([sizedInt(i, 16, false)]); },
                  );
                  let _pipe$4 = $bit_array.concat(_pipe$3);
                  let _pipe$5 = ((_capture) => {
                    return $data_element_value.new_binary_unchecked(
                      vr,
                      _capture,
                    );
                  })(_pipe$4);
                  return new Ok(_pipe$5);
                },
              );
            } else {
              let $2 = $1.tail;
              if ($2 instanceof $Empty) {
                let _block$1;
                if (vr instanceof $value_representation.SignedShort) {
                  _block$1 = [-1 * 0x8000, 0x7FFF];
                } else {
                  _block$1 = [0, 0xFFFF];
                }
                let $3 = _block$1;
                let min;
                let max;
                min = $3[0];
                max = $3[1];
                let is_valid = $list.all(
                  ints,
                  (i) => { return (i >= min) && (i <= max); },
                );
                return $bool.guard(
                  !is_valid,
                  new Error(
                    new $json_error.JsonInvalid(
                      "Short value is out of range",
                      path,
                    ),
                  ),
                  () => {
                    let _pipe$2 = ints;
                    let _pipe$3 = $list.map(
                      _pipe$2,
                      (i) => { return toBitArray([sizedInt(i, 16, false)]); },
                    );
                    let _pipe$4 = $bit_array.concat(_pipe$3);
                    let _pipe$5 = ((_capture) => {
                      return $data_element_value.new_binary_unchecked(
                        vr,
                        _capture,
                      );
                    })(_pipe$4);
                    return new Ok(_pipe$5);
                  },
                );
              } else {
                let $3 = $2.tail;
                if ($3 instanceof $Empty) {
                  let entry_count = ints.head;
                  let first_input_value = $1.head;
                  let bits_per_entry = $2.head;
                  let _pipe$2 = toBitArray([
                    sizedInt(entry_count, 16, false),
                    sizedInt(first_input_value, 16, false),
                    sizedInt(bits_per_entry, 16, false),
                  ]);
                  let _pipe$3 = ((_capture) => {
                    return $data_element_value.new_lookup_table_descriptor_unchecked(
                      vr,
                      _capture,
                    );
                  })(_pipe$2);
                  return new Ok(_pipe$3);
                } else {
                  let _block$1;
                  if (vr instanceof $value_representation.SignedShort) {
                    _block$1 = [-1 * 0x8000, 0x7FFF];
                  } else {
                    _block$1 = [0, 0xFFFF];
                  }
                  let $4 = _block$1;
                  let min;
                  let max;
                  min = $4[0];
                  max = $4[1];
                  let is_valid = $list.all(
                    ints,
                    (i) => { return (i >= min) && (i <= max); },
                  );
                  return $bool.guard(
                    !is_valid,
                    new Error(
                      new $json_error.JsonInvalid(
                        "Short value is out of range",
                        path,
                      ),
                    ),
                    () => {
                      let _pipe$2 = ints;
                      let _pipe$3 = $list.map(
                        _pipe$2,
                        (i) => { return toBitArray([sizedInt(i, 16, false)]); },
                      );
                      let _pipe$4 = $bit_array.concat(_pipe$3);
                      let _pipe$5 = ((_capture) => {
                        return $data_element_value.new_binary_unchecked(
                          vr,
                          _capture,
                        );
                      })(_pipe$4);
                      return new Ok(_pipe$5);
                    },
                  );
                }
              }
            }
          }
        } else {
          let _block$1;
          if (vr instanceof $value_representation.SignedShort) {
            _block$1 = [-1 * 0x8000, 0x7FFF];
          } else {
            _block$1 = [0, 0xFFFF];
          }
          let $1 = _block$1;
          let min;
          let max;
          min = $1[0];
          max = $1[1];
          let is_valid = $list.all(
            ints,
            (i) => { return (i >= min) && (i <= max); },
          );
          return $bool.guard(
            !is_valid,
            new Error(
              new $json_error.JsonInvalid("Short value is out of range", path),
            ),
            () => {
              let _pipe$2 = ints;
              let _pipe$3 = $list.map(
                _pipe$2,
                (i) => { return toBitArray([sizedInt(i, 16, false)]); },
              );
              let _pipe$4 = $bit_array.concat(_pipe$3);
              let _pipe$5 = ((_capture) => {
                return $data_element_value.new_binary_unchecked(vr, _capture);
              })(_pipe$4);
              return new Ok(_pipe$5);
            },
          );
        }
      },
    );
  } else if (vr instanceof $value_representation.UnsignedVeryLong) {
    let _block;
    let _pipe = value;
    let _pipe$1 = $decode.run(_pipe, $decode.list($decode.dynamic));
    _block = $result.replace_error(
      _pipe$1,
      new $json_error.JsonInvalid("Very long value is not a list", path),
    );
    let values = _block;
    return $result.try$(
      values,
      (values) => {
        let _block$1;
        let _pipe$2 = values;
        let _pipe$3 = $list.map(
          _pipe$2,
          (i) => {
            let $ = $decode.run(i, $decode.int);
            if ($ instanceof Ok) {
              let i$1 = $[0];
              return new Ok($bigi.from_int(i$1));
            } else {
              let $1 = $decode.run(i, $decode.string);
              if ($1 instanceof Ok) {
                let i$1 = $1[0];
                return $bigi.from_string(i$1);
              } else {
                return new Error(undefined);
              }
            }
          },
        );
        let _pipe$4 = $result.all(_pipe$3);
        _block$1 = $result.replace_error(
          _pipe$4,
          new $json_error.JsonInvalid("Very long value is invalid", path),
        );
        let big_ints = _block$1;
        return $result.try$(
          big_ints,
          (big_ints) => {
            let _block$2;
            if (vr instanceof $value_representation.SignedVeryLong) {
              _block$2 = new $bigi.Signed();
            } else {
              _block$2 = new $bigi.Unsigned();
            }
            let signedness = _block$2;
            let _pipe$5 = big_ints;
            let _pipe$6 = $list.map(
              _pipe$5,
              (_capture) => {
                return $bigi.to_bytes(
                  _capture,
                  new $bigi.LittleEndian(),
                  signedness,
                  8,
                );
              },
            );
            let _pipe$7 = $result.all(_pipe$6);
            let _pipe$8 = $result.map_error(
              _pipe$7,
              (_) => {
                return new $json_error.JsonInvalid(
                  "Very long value is out of range",
                  path,
                );
              },
            );
            let _pipe$9 = $result.map(_pipe$8, $bit_array.concat);
            return $result.map(
              _pipe$9,
              (_capture) => {
                return $data_element_value.new_binary_unchecked(vr, _capture);
              },
            );
          },
        );
      },
    );
  } else {
    return new Error(
      new $json_error.JsonInvalid(
        ("Invalid 'Value' data element with VR '" + $value_representation.to_string(
          vr,
        )) + "'",
        path,
      ),
    );
  }
}

/**
 * Converts DICOM JSON into a data set. This is used to read the root data set
 * and also recursively when reading sequences.
 */
export function convert_json_to_data_set(in$, path) {
  let _block;
  let _pipe = in$;
  let _pipe$1 = $decode.run(
    _pipe,
    $decode.dict($decode.string, $decode.dynamic),
  );
  _block = $result.replace_error(
    _pipe$1,
    new $json_error.JsonInvalid("Data set is not an object", path),
  );
  let raw_dict = _block;
  return $result.try$(
    raw_dict,
    (raw_dict) => {
      let _pipe$2 = raw_dict;
      let _pipe$3 = $dict.fold(
        _pipe$2,
        new Ok([$data_set.new$(), new None()]),
        (context, raw_tag, raw_value) => {
          return $result.try$(
            context,
            (context) => {
              let data_set;
              let transfer_syntax;
              data_set = context[0];
              transfer_syntax = context[1];
              let _block$1;
              let _pipe$3 = raw_tag;
              let _pipe$4 = $data_element_tag.from_hex_string(_pipe$3);
              _block$1 = $result.replace_error(
                _pipe$4,
                new $json_error.JsonInvalid(
                  "Invalid data set tag: " + raw_tag,
                  path,
                ),
              );
              let tag = _block$1;
              return $result.try$(
                tag,
                (tag) => {
                  let $ = $data_set_path.add_data_element(path, tag);
                  let path$1;
                  if ($ instanceof Ok) {
                    path$1 = $[0];
                  } else {
                    throw makeError(
                      "let_assert",
                      FILEPATH,
                      "dcmfx_json/internal/json_to_data_set",
                      57,
                      "convert_json_to_data_set",
                      "Pattern match failed, no pattern matched the value.",
                      {
                        value: $,
                        start: 1800,
                        end: 1863,
                        pattern_start: 1811,
                        pattern_end: 1819
                      }
                    )
                  }
                  let value = convert_json_to_data_element(
                    raw_value,
                    tag,
                    transfer_syntax,
                    path$1,
                  );
                  return $result.map(
                    value,
                    (value) => {
                      let data_set$1 = $data_set.insert(data_set, tag, value);
                      let _block$2;
                      let $1 = isEqual(tag, $dictionary.transfer_syntax_uid.tag);
                      if ($1) {
                        let $2 = $data_set.get_transfer_syntax(data_set$1);
                        if ($2 instanceof Ok) {
                          let ts = $2[0];
                          _block$2 = new Some(ts);
                        } else {
                          _block$2 = new None();
                        }
                      } else {
                        _block$2 = transfer_syntax;
                      }
                      let transfer_syntax$1 = _block$2;
                      return [data_set$1, transfer_syntax$1];
                    },
                  );
                },
              );
            },
          );
        },
      );
      return $result.map(_pipe$3, (x) => { return x[0]; });
    },
  );
}

/**
 * Reads the value of a single item in DICOM JSON as a native data element
 * value.
 * 
 * @ignore
 */
function convert_json_to_data_element(in$, tag, transfer_syntax, path) {
  let _block;
  let _pipe = in$;
  let _pipe$1 = $decode.run(
    _pipe,
    $decode.dict($decode.string, $decode.dynamic),
  );
  _block = $result.replace_error(
    _pipe$1,
    new $json_error.JsonInvalid("Data element is not an object", path),
  );
  let raw_value = _block;
  return $result.try$(
    raw_value,
    (raw_value) => {
      return $result.try$(
        read_dicom_json_vr(raw_value, path),
        (vr) => {
          let $ = $dict.get(raw_value, "Value");
          if ($ instanceof Ok) {
            let value = $[0];
            return read_dicom_json_primitive_value(tag, vr, value, path);
          } else {
            let $1 = $dict.get(raw_value, "InlineBinary");
            if ($1 instanceof Ok) {
              let inline_binary = $1[0];
              return read_dicom_json_inline_binary_value(
                inline_binary,
                tag,
                vr,
                transfer_syntax,
                path,
              );
            } else {
              let $2 = $dict.get(raw_value, "BulkDataURI");
              if ($2 instanceof Ok) {
                return new Error(
                  new $json_error.JsonInvalid(
                    "DICOM JSON BulkDataURI values are not supported",
                    path,
                  ),
                );
              } else {
                let _block$1;
                if (vr instanceof $value_representation.Sequence) {
                  _block$1 = $data_element_value.new_sequence(toList([]));
                } else {
                  _block$1 = $data_element_value.new_binary_unchecked(
                    vr,
                    toBitArray([]),
                  );
                }
                let _pipe$2 = _block$1;
                return new Ok(_pipe$2);
              }
            }
          }
        },
      );
    },
  );
}

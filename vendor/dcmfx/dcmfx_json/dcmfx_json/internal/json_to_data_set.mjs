/// <reference types="./json_to_data_set.d.mts" />
import * as $bigi from "../../../bigi/bigi.mjs";
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $decimal_string from "../../../dcmfx_core/dcmfx_core/data_element_value/decimal_string.mjs";
import * as $integer_string from "../../../dcmfx_core/dcmfx_core/data_element_value/integer_string.mjs";
import * as $data_set from "../../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $data_set_path from "../../../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $bit_array_utils from "../../../dcmfx_core/dcmfx_core/internal/bit_array_utils.mjs";
import * as $utils from "../../../dcmfx_core/dcmfx_core/internal/utils.mjs";
import * as $registry from "../../../dcmfx_core/dcmfx_core/registry.mjs";
import * as $transfer_syntax from "../../../dcmfx_core/dcmfx_core/transfer_syntax.mjs";
import * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $dict from "../../../gleam_stdlib/gleam/dict.mjs";
import * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.mjs";
import { DecodeError } from "../../../gleam_stdlib/gleam/dynamic.mjs";
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
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
  toBitArray,
  sizedInt,
} from "../../gleam.mjs";

class PersonNameVariants extends $CustomType {
  constructor(alphabetic, ideographic, phonetic) {
    super();
    this.alphabetic = alphabetic;
    this.ideographic = ideographic;
    this.phonetic = phonetic;
  }
}

function read_dicom_json_vr(raw_value, path) {
  let raw_vr = (() => {
    let _pipe = raw_value;
    let _pipe$1 = $dict.get(_pipe, "vr");
    return $result.replace_error(
      _pipe$1,
      new $json_error.JsonInvalid("Data element value has no VR", path),
    );
  })();
  return $result.try$(
    raw_vr,
    (raw_vr) => {
      let vr_string = (() => {
        let _pipe = raw_vr;
        let _pipe$1 = $dynamic.string(_pipe);
        return $result.replace_error(
          _pipe$1,
          new $json_error.JsonInvalid("VR is not a string", path),
        );
      })();
      return $result.try$(
        vr_string,
        (vr_string) => {
          let _pipe = vr_string;
          let _pipe$1 = $bit_array.from_string(_pipe);
          let _pipe$2 = $value_representation.from_bytes(_pipe$1);
          return $result.replace_error(
            _pipe$2,
            new $json_error.JsonInvalid("VR is invalid: " + vr_string, path),
          );
        },
      );
    },
  );
}

function decode_ieee_float(f) {
  let $ = $dynamic.float(f);
  if ($.isOk()) {
    let f$1 = $[0];
    return new Ok($ieee_float.finite(f$1));
  } else {
    let $1 = $dynamic.int(f);
    if ($1.isOk()) {
      let f$1 = $1[0];
      return new Ok($ieee_float.finite($int.to_float(f$1)));
    } else {
      return $bool.guard(
        isEqual(f, $dynamic.from("Infinity")),
        new Ok($ieee_float.positive_infinity()),
        () => {
          return $bool.guard(
            isEqual(f, $dynamic.from("-Infinity")),
            new Ok($ieee_float.negative_infinity()),
            () => {
              return $bool.guard(
                isEqual(f, $dynamic.from("NaN")),
                new Ok($ieee_float.nan()),
                () => {
                  return new Error(
                    toList([new DecodeError("Number", "Unknown", toList([]))]),
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

function read_dicom_json_person_name_value(value, path) {
  let person_name_variants = (() => {
    let _pipe = $dynamic.list(
      $dynamic.decode3(
        (var0, var1, var2) => {
          return new PersonNameVariants(var0, var1, var2);
        },
        $dynamic.optional_field("Alphabetic", $dynamic.string),
        $dynamic.optional_field("Ideographic", $dynamic.string),
        $dynamic.optional_field("Phonetic", $dynamic.string),
      ),
    )(value);
    return $result.replace_error(
      _pipe,
      new $json_error.JsonInvalid("PersonName value is invalid", path),
    );
  })();
  return $result.try$(
    person_name_variants,
    (person_name_variants) => {
      let _pipe = person_name_variants;
      let _pipe$1 = $list.map(
        _pipe,
        (raw_person_name) => {
          let _pipe$1 = toList([
            $option.unwrap(raw_person_name.alphabetic, ""),
            $option.unwrap(raw_person_name.ideographic, ""),
            $option.unwrap(raw_person_name.phonetic, ""),
          ]);
          let _pipe$2 = $string.join(_pipe$1, "=");
          return $utils.trim_right(_pipe$2, "=");
        },
      );
      let _pipe$2 = $string.join(_pipe$1, "\\");
      let _pipe$3 = $bit_array.from_string(_pipe$2);
      let _pipe$4 = $bit_array_utils.pad_to_even_length(_pipe$3, 0x20);
      let _pipe$5 = ((_capture) => {
        return $data_element_value.new_binary_unchecked(
          new $value_representation.PersonName(),
          _capture,
        );
      })(_pipe$4);
      return new Ok(_pipe$5);
    },
  );
}

function read_encapsulated_pixel_data_items(bytes, vr, items) {
  if (bytes.intFromSlice(0, 2, false, false) === 0xFFFE &&
  bytes.intFromSlice(2, 4, false, false) === 0xE000 &&
  bytes.length >= 8) {
    let length = bytes.intFromSlice(4, 8, false, false);
    let rest = bytes.sliceAfter(8);
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
  } else if (bytes.length == 0) {
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

function read_dicom_json_inline_binary_value(
  inline_binary,
  tag,
  vr,
  transfer_syntax,
  path
) {
  let inline_binary$1 = (() => {
    let _pipe = inline_binary;
    let _pipe$1 = $dynamic.string(_pipe);
    return $result.replace_error(
      _pipe$1,
      new $json_error.JsonInvalid("InlineBinary is not a string", path),
    );
  })();
  return $result.try$(
    inline_binary$1,
    (inline_binary) => {
      let bytes = (() => {
        let _pipe = inline_binary;
        let _pipe$1 = $bit_array.base64_decode(_pipe);
        return $result.replace_error(
          _pipe$1,
          new $json_error.JsonInvalid("InlineBinary is not a string", path),
        );
      })();
      return $result.try$(
        bytes,
        (bytes) => {
          let $ = (isEqual(tag, $registry.pixel_data.tag)) && (isEqual(
            $option.map(transfer_syntax, (ts) => { return ts.is_encapsulated; }),
            new Some(true)
          ));
          if ($) {
            let _pipe = read_encapsulated_pixel_data_items(
              bytes,
              vr,
              toList([]),
            );
            return $result.replace_error(
              _pipe,
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

function read_dicom_json_primitive_value(tag, vr, value, path) {
  if (vr instanceof $value_representation.AgeString) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.ApplicationEntity) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.CodeString) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.Date) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.DateTime) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.LongString) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.LongText) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.ShortString) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.ShortText) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.Time) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.UnlimitedCharacters) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.UnlimitedText) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.UniqueIdentifier) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.UniversalResourceIdentifier) {
    let value$1 = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.optional($dynamic.string))(_pipe);
      return $result.map_error(
        _pipe$1,
        (_) => {
          return new $json_error.JsonInvalid("String value is invalid", path);
        },
      );
    })();
    return $result.map(
      value$1,
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (_capture) => { return $option.unwrap(_capture, ""); },
        );
        let _pipe$2 = $string.join(_pipe$1, "\\");
        let _pipe$3 = $bit_array.from_string(_pipe$2);
        let _pipe$4 = ((_capture) => {
          return $value_representation.pad_bytes_to_even_length(vr, _capture);
        })(_pipe$3);
        return ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$4);
      },
    );
  } else if (vr instanceof $value_representation.DecimalString) {
    let _pipe = value;
    let _pipe$1 = $dynamic.list($dynamic.dynamic)(_pipe);
    let _pipe$2 = $result.try$(
      _pipe$1,
      (lst) => {
        let _pipe$2 = $list.map(
          lst,
          (i) => {
            let $ = $dynamic.float(i);
            if ($.isOk()) {
              let i$1 = $[0];
              return new Ok(i$1);
            } else {
              let $1 = $dynamic.int(i);
              if ($1.isOk()) {
                let i$1 = $1[0];
                return new Ok($int.to_float(i$1));
              } else {
                let e = $1[0];
                return new Error(e);
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
  } else if (vr instanceof $value_representation.IntegerString) {
    let ints = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.int)(_pipe);
      return $result.replace_error(
        _pipe$1,
        new $json_error.JsonInvalid("IntegerString value is invalid", path),
      );
    })();
    return $result.try$(
      ints,
      (ints) => {
        let bytes = (() => {
          let _pipe = ints;
          let _pipe$1 = $integer_string.to_bytes(_pipe);
          return $result.replace_error(
            _pipe$1,
            new $json_error.JsonInvalid("IntegerString value is invalid", path),
          );
        })();
        return $result.try$(
          bytes,
          (bytes) => {
            return new Ok($data_element_value.new_binary_unchecked(vr, bytes));
          },
        );
      },
    );
  } else if (vr instanceof $value_representation.PersonName) {
    return read_dicom_json_person_name_value(value, path);
  } else if (vr instanceof $value_representation.SignedLong) {
    let ints = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.int)(_pipe);
      return $result.replace_error(
        _pipe$1,
        new $json_error.JsonInvalid("SignedLong value is invalid", path),
      );
    })();
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
            let _pipe = ints;
            let _pipe$1 = $list.map(
              _pipe,
              (x) => { return toBitArray([sizedInt(x, 32, false)]); },
            );
            let _pipe$2 = $bit_array.concat(_pipe$1);
            let _pipe$3 = ((_capture) => {
              return $data_element_value.new_binary_unchecked(vr, _capture);
            })(_pipe$2);
            return new Ok(_pipe$3);
          },
        );
      },
    );
  } else if (vr instanceof $value_representation.SignedShort) {
    let ints = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.int)(_pipe);
      return $result.replace_error(
        _pipe$1,
        new $json_error.JsonInvalid("Short value is invalid", path),
      );
    })();
    return $result.try$(
      ints,
      (ints) => {
        let $ = $registry.is_lut_descriptor_tag(tag);
        if ($ && ints.hasLength(3)) {
          let entry_count = ints.head;
          let first_input_value = ints.tail.head;
          let bits_per_entry = ints.tail.tail.head;
          let _pipe = toBitArray([
            sizedInt(entry_count, 16, false),
            sizedInt(first_input_value, 16, false),
            sizedInt(bits_per_entry, 16, false),
          ]);
          let _pipe$1 = ((_capture) => {
            return $data_element_value.new_lookup_table_descriptor_unchecked(
              vr,
              _capture,
            );
          })(_pipe);
          return new Ok(_pipe$1);
        } else {
          let $1 = (() => {
            if (vr instanceof $value_representation.SignedShort) {
              return [-1 * 0x8000, 0x7FFF];
            } else {
              return [0, 0xFFFF];
            }
          })();
          let min = $1[0];
          let max = $1[1];
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
              let _pipe = ints;
              let _pipe$1 = $list.map(
                _pipe,
                (i) => { return toBitArray([sizedInt(i, 16, false)]); },
              );
              let _pipe$2 = $bit_array.concat(_pipe$1);
              let _pipe$3 = ((_capture) => {
                return $data_element_value.new_binary_unchecked(vr, _capture);
              })(_pipe$2);
              return new Ok(_pipe$3);
            },
          );
        }
      },
    );
  } else if (vr instanceof $value_representation.UnsignedShort) {
    let ints = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.int)(_pipe);
      return $result.replace_error(
        _pipe$1,
        new $json_error.JsonInvalid("Short value is invalid", path),
      );
    })();
    return $result.try$(
      ints,
      (ints) => {
        let $ = $registry.is_lut_descriptor_tag(tag);
        if ($ && ints.hasLength(3)) {
          let entry_count = ints.head;
          let first_input_value = ints.tail.head;
          let bits_per_entry = ints.tail.tail.head;
          let _pipe = toBitArray([
            sizedInt(entry_count, 16, false),
            sizedInt(first_input_value, 16, false),
            sizedInt(bits_per_entry, 16, false),
          ]);
          let _pipe$1 = ((_capture) => {
            return $data_element_value.new_lookup_table_descriptor_unchecked(
              vr,
              _capture,
            );
          })(_pipe);
          return new Ok(_pipe$1);
        } else {
          let $1 = (() => {
            if (vr instanceof $value_representation.SignedShort) {
              return [-1 * 0x8000, 0x7FFF];
            } else {
              return [0, 0xFFFF];
            }
          })();
          let min = $1[0];
          let max = $1[1];
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
              let _pipe = ints;
              let _pipe$1 = $list.map(
                _pipe,
                (i) => { return toBitArray([sizedInt(i, 16, false)]); },
              );
              let _pipe$2 = $bit_array.concat(_pipe$1);
              let _pipe$3 = ((_capture) => {
                return $data_element_value.new_binary_unchecked(vr, _capture);
              })(_pipe$2);
              return new Ok(_pipe$3);
            },
          );
        }
      },
    );
  } else if (vr instanceof $value_representation.SignedVeryLong) {
    let values = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.dynamic)(_pipe);
      return $result.replace_error(
        _pipe$1,
        new $json_error.JsonInvalid("Very long value is not a list", path),
      );
    })();
    return $result.try$(
      values,
      (values) => {
        let big_ints = (() => {
          let _pipe = values;
          let _pipe$1 = $list.map(
            _pipe,
            (i) => {
              let $ = $dynamic.int(i);
              if ($.isOk()) {
                let i$1 = $[0];
                return new Ok($bigi.from_int(i$1));
              } else {
                let $1 = $dynamic.string(i);
                if ($1.isOk()) {
                  let i$1 = $1[0];
                  return $bigi.from_string(i$1);
                } else {
                  return new Error(undefined);
                }
              }
            },
          );
          let _pipe$2 = $result.all(_pipe$1);
          return $result.replace_error(
            _pipe$2,
            new $json_error.JsonInvalid("Very long value is invalid", path),
          );
        })();
        return $result.try$(
          big_ints,
          (big_ints) => {
            let signedness = (() => {
              if (vr instanceof $value_representation.SignedVeryLong) {
                return new $bigi.Signed();
              } else {
                return new $bigi.Unsigned();
              }
            })();
            let _pipe = big_ints;
            let _pipe$1 = $list.map(
              _pipe,
              (_capture) => {
                return $bigi.to_bytes(
                  _capture,
                  new $bigi.LittleEndian(),
                  signedness,
                  8,
                );
              },
            );
            let _pipe$2 = $result.all(_pipe$1);
            let _pipe$3 = $result.map_error(
              _pipe$2,
              (_) => {
                return new $json_error.JsonInvalid(
                  "Very long value is out of range",
                  path,
                );
              },
            );
            let _pipe$4 = $result.map(_pipe$3, $bit_array.concat);
            return $result.map(
              _pipe$4,
              (_capture) => {
                return $data_element_value.new_binary_unchecked(vr, _capture);
              },
            );
          },
        );
      },
    );
  } else if (vr instanceof $value_representation.UnsignedVeryLong) {
    let values = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.dynamic)(_pipe);
      return $result.replace_error(
        _pipe$1,
        new $json_error.JsonInvalid("Very long value is not a list", path),
      );
    })();
    return $result.try$(
      values,
      (values) => {
        let big_ints = (() => {
          let _pipe = values;
          let _pipe$1 = $list.map(
            _pipe,
            (i) => {
              let $ = $dynamic.int(i);
              if ($.isOk()) {
                let i$1 = $[0];
                return new Ok($bigi.from_int(i$1));
              } else {
                let $1 = $dynamic.string(i);
                if ($1.isOk()) {
                  let i$1 = $1[0];
                  return $bigi.from_string(i$1);
                } else {
                  return new Error(undefined);
                }
              }
            },
          );
          let _pipe$2 = $result.all(_pipe$1);
          return $result.replace_error(
            _pipe$2,
            new $json_error.JsonInvalid("Very long value is invalid", path),
          );
        })();
        return $result.try$(
          big_ints,
          (big_ints) => {
            let signedness = (() => {
              if (vr instanceof $value_representation.SignedVeryLong) {
                return new $bigi.Signed();
              } else {
                return new $bigi.Unsigned();
              }
            })();
            let _pipe = big_ints;
            let _pipe$1 = $list.map(
              _pipe,
              (_capture) => {
                return $bigi.to_bytes(
                  _capture,
                  new $bigi.LittleEndian(),
                  signedness,
                  8,
                );
              },
            );
            let _pipe$2 = $result.all(_pipe$1);
            let _pipe$3 = $result.map_error(
              _pipe$2,
              (_) => {
                return new $json_error.JsonInvalid(
                  "Very long value is out of range",
                  path,
                );
              },
            );
            let _pipe$4 = $result.map(_pipe$3, $bit_array.concat);
            return $result.map(
              _pipe$4,
              (_capture) => {
                return $data_element_value.new_binary_unchecked(vr, _capture);
              },
            );
          },
        );
      },
    );
  } else if (vr instanceof $value_representation.UnsignedLong) {
    let ints = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.int)(_pipe);
      return $result.replace_error(
        _pipe$1,
        new $json_error.JsonInvalid("UnsignedLong value is invalid", path),
      );
    })();
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
            let _pipe = ints;
            let _pipe$1 = $list.map(
              _pipe,
              (x) => { return toBitArray([sizedInt(x, 32, false)]); },
            );
            let _pipe$2 = $bit_array.concat(_pipe$1);
            let _pipe$3 = ((_capture) => {
              return $data_element_value.new_binary_unchecked(vr, _capture);
            })(_pipe$2);
            return new Ok(_pipe$3);
          },
        );
      },
    );
  } else if (vr instanceof $value_representation.FloatingPointDouble) {
    let floats = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list(decode_ieee_float)(_pipe);
      return $result.replace_error(
        _pipe$1,
        new $json_error.JsonInvalid(
          "FloatingPointDouble value is invalid",
          path,
        ),
      );
    })();
    return $result.try$(
      floats,
      (floats) => {
        let _pipe = floats;
        let _pipe$1 = $list.map(_pipe, $ieee_float.to_bytes_64_le);
        let _pipe$2 = $bit_array.concat(_pipe$1);
        let _pipe$3 = ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$2);
        return new Ok(_pipe$3);
      },
    );
  } else if (vr instanceof $value_representation.FloatingPointSingle) {
    let floats = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list(decode_ieee_float)(_pipe);
      return $result.replace_error(
        _pipe$1,
        new $json_error.JsonInvalid(
          "FloatingPointSingle value is invalid",
          path,
        ),
      );
    })();
    return $result.try$(
      floats,
      (floats) => {
        let _pipe = floats;
        let _pipe$1 = $list.map(_pipe, $ieee_float.to_bytes_32_le);
        let _pipe$2 = $bit_array.concat(_pipe$1);
        let _pipe$3 = ((_capture) => {
          return $data_element_value.new_binary_unchecked(vr, _capture);
        })(_pipe$2);
        return new Ok(_pipe$3);
      },
    );
  } else if (vr instanceof $value_representation.AttributeTag) {
    let tags = (() => {
      let _pipe = value;
      let _pipe$1 = $dynamic.list($dynamic.string)(_pipe);
      return $result.replace_error(
        _pipe$1,
        new $json_error.JsonInvalid("AttributeTag value is invalid", path),
      );
    })();
    return $result.try$(
      tags,
      (tags) => {
        let tags$1 = (() => {
          let _pipe = tags;
          let _pipe$1 = $list.map(
            _pipe,
            (tag) => {
              let _pipe$1 = tag;
              let _pipe$2 = $data_element_tag.from_hex_string(_pipe$1);
              return $result.map(
                _pipe$2,
                (tag) => {
                  return toBitArray([
                    sizedInt(tag.group, 16, false),
                    sizedInt(tag.element, 16, false),
                  ]);
                },
              );
            },
          );
          let _pipe$2 = $result.all(_pipe$1);
          return $result.replace_error(
            _pipe$2,
            new $json_error.JsonInvalid("AttributeTag value is invalid", path),
          );
        })();
        return $result.try$(
          tags$1,
          (tags) => {
            let _pipe = tags;
            let _pipe$1 = $bit_array.concat(_pipe);
            let _pipe$2 = ((_capture) => {
              return $data_element_value.new_binary_unchecked(vr, _capture);
            })(_pipe$1);
            return new Ok(_pipe$2);
          },
        );
      },
    );
  } else if (vr instanceof $value_representation.Sequence) {
    let _pipe = value;
    let _pipe$1 = $dynamic.list($dynamic.dynamic)(_pipe);
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

export function convert_json_to_data_set(in$, path) {
  let raw_dict = (() => {
    let _pipe = $dynamic.dict($dynamic.string, $dynamic.dynamic)(in$);
    return $result.replace_error(
      _pipe,
      new $json_error.JsonInvalid("Data set is not an object", path),
    );
  })();
  return $result.try$(
    raw_dict,
    (raw_dict) => {
      let _pipe = raw_dict;
      let _pipe$1 = $dict.fold(
        _pipe,
        new Ok([$data_set.new$(), new None()]),
        (context, raw_tag, raw_value) => {
          return $result.try$(
            context,
            (context) => {
              let data_set = context[0];
              let transfer_syntax = context[1];
              let tag = (() => {
                let _pipe$1 = raw_tag;
                let _pipe$2 = $data_element_tag.from_hex_string(_pipe$1);
                return $result.replace_error(
                  _pipe$2,
                  new $json_error.JsonInvalid(
                    "Invalid data set tag: " + raw_tag,
                    path,
                  ),
                );
              })();
              return $result.try$(
                tag,
                (tag) => {
                  let $ = $data_set_path.add_data_element(path, tag);
                  if (!$.isOk()) {
                    throw makeError(
                      "let_assert",
                      "dcmfx_json/internal/json_to_data_set",
                      56,
                      "",
                      "Pattern match failed, no pattern matched the value.",
                      { value: $ }
                    )
                  }
                  let path$1 = $[0];
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
                      let transfer_syntax$1 = (() => {
                        let $1 = isEqual(tag, $registry.transfer_syntax_uid.tag);
                        if ($1) {
                          let $2 = $data_set.get_transfer_syntax(data_set$1);
                          if ($2.isOk()) {
                            let ts = $2[0];
                            return new Some(ts);
                          } else {
                            return new None();
                          }
                        } else {
                          return transfer_syntax;
                        }
                      })();
                      return [data_set$1, transfer_syntax$1];
                    },
                  );
                },
              );
            },
          );
        },
      );
      return $result.map(_pipe$1, (x) => { return x[0]; });
    },
  );
}

function convert_json_to_data_element(in$, tag, transfer_syntax, path) {
  let raw_value = (() => {
    let _pipe = $dynamic.dict($dynamic.string, $dynamic.dynamic)(in$);
    return $result.replace_error(
      _pipe,
      new $json_error.JsonInvalid("Data element is not an object", path),
    );
  })();
  return $result.try$(
    raw_value,
    (raw_value) => {
      return $result.try$(
        read_dicom_json_vr(raw_value, path),
        (vr) => {
          let $ = $dict.get(raw_value, "Value");
          if ($.isOk()) {
            let value = $[0];
            return read_dicom_json_primitive_value(tag, vr, value, path);
          } else {
            let $1 = $dict.get(raw_value, "InlineBinary");
            if ($1.isOk()) {
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
              if ($2.isOk()) {
                return new Error(
                  new $json_error.JsonInvalid(
                    "DICOM JSON BulkDataURI values are not supported",
                    path,
                  ),
                );
              } else {
                let _pipe = (() => {
                  if (vr instanceof $value_representation.Sequence) {
                    return $data_element_value.new_sequence(toList([]));
                  } else {
                    return $data_element_value.new_binary_unchecked(
                      vr,
                      toBitArray([]),
                    );
                  }
                })();
                return new Ok(_pipe);
              }
            }
          }
        },
      );
    },
  );
}

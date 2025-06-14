/// <reference types="./p10_json_transform.d.mts" />
import * as $bigi from "../../../bigi/bigi.mjs";
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import { DataElementTag } from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $attribute_tag from "../../../dcmfx_core/dcmfx_core/data_element_value/attribute_tag.mjs";
import * as $data_error from "../../../dcmfx_core/dcmfx_core/data_error.mjs";
import * as $data_set from "../../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $data_set_path from "../../../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $dictionary from "../../../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $utils from "../../../dcmfx_core/dcmfx_core/internal/utils.mjs";
import * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $p10_error from "../../../dcmfx_p10/dcmfx_p10/p10_error.mjs";
import * as $p10_token from "../../../dcmfx_p10/dcmfx_p10/p10_token.mjs";
import * as $json from "../../../gleam_json/gleam/json.mjs";
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $float from "../../../gleam_stdlib/gleam/float.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $order from "../../../gleam_stdlib/gleam/order.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $ieee_float from "../../../ieee_float/ieee_float.mjs";
import * as $json_config from "../../dcmfx_json/json_config.mjs";
import * as $json_error from "../../dcmfx_json/json_error.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  divideInt,
  isEqual,
  toBitArray,
  sizedInt,
} from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_json/transforms/p10_json_transform.gleam";

export class P10JsonTransform extends $CustomType {
  constructor(config, insert_comma, current_data_element, ignore_data_element_value_bytes, in_encapsulated_pixel_data, pending_base64_input, data_set_path, sequence_item_counts) {
    super();
    this.config = config;
    this.insert_comma = insert_comma;
    this.current_data_element = current_data_element;
    this.ignore_data_element_value_bytes = ignore_data_element_value_bytes;
    this.in_encapsulated_pixel_data = in_encapsulated_pixel_data;
    this.pending_base64_input = pending_base64_input;
    this.data_set_path = data_set_path;
    this.sequence_item_counts = sequence_item_counts;
  }
}

export function new$(config) {
  return new P10JsonTransform(
    config,
    false,
    [new DataElementTag(0, 0), toList([])],
    false,
    false,
    toBitArray([]),
    $data_set_path.new$(),
    toList([]),
  );
}

function indent(transform, offset) {
  return $string.repeat(
    "  ",
    (1 + $data_set_path.sequence_item_count(transform.data_set_path) * 3) + offset,
  );
}

function begin(transform, file_meta_information) {
  let json = "{" + (() => {
    let $ = transform.config.pretty_print;
    if ($) {
      return "\n";
    } else {
      return "";
    }
  })();
  let _block;
  let $1 = transform.config.store_encapsulated_pixel_data;
  if ($1) {
    let transfer_syntax_uid = $data_set.get_string(
      file_meta_information,
      $dictionary.transfer_syntax_uid.tag,
    );
    if (transfer_syntax_uid instanceof Ok) {
      let transfer_syntax_uid$1 = transfer_syntax_uid[0];
      let _block$1;
      let _record = transform;
      _block$1 = new P10JsonTransform(
        _record.config,
        true,
        _record.current_data_element,
        _record.ignore_data_element_value_bytes,
        _record.in_encapsulated_pixel_data,
        _record.pending_base64_input,
        _record.data_set_path,
        _record.sequence_item_counts,
      );
      let transform$1 = _block$1;
      let _block$2;
      let $2 = transform$1.config.pretty_print;
      if ($2) {
        _block$2 = ("  \"00020010\": {\n    \"vr\": \"UI\",\n    \"Value\": [\n      \"" + transfer_syntax_uid$1) + "\"\n    ]\n  }";
      } else {
        _block$2 = ("\"00020010\":{\"vr\":\"UI\",\"Value\":[\"" + transfer_syntax_uid$1) + "\"]}";
      }
      let json$1 = _block$2;
      _block = [json$1, transform$1];
    } else {
      _block = ["", transform];
    }
  } else {
    _block = ["", transform];
  }
  let $ = _block;
  let transfer_syntax_json = $[0];
  let transform$1 = $[1];
  return [json + transfer_syntax_json, transform$1];
}

function write_data_element_header(transform, tag, vr, length) {
  return $bool.lazy_guard(
    (tag.element === 0) || (isEqual(tag, $dictionary.specific_character_set.tag)),
    () => {
      let _block;
      let _record = transform;
      _block = new P10JsonTransform(
        _record.config,
        _record.insert_comma,
        _record.current_data_element,
        true,
        _record.in_encapsulated_pixel_data,
        _record.pending_base64_input,
        _record.data_set_path,
        _record.sequence_item_counts,
      );
      let transform$1 = _block;
      return ["", transform$1];
    },
    () => {
      let _block;
      let $ = transform.insert_comma;
      if ($) {
        let $1 = transform.config.pretty_print;
        if ($1) {
          _block = ",\n";
        } else {
          _block = ",";
        }
      } else {
        _block = "";
      }
      let json = _block;
      let _block$1;
      let _record = transform;
      _block$1 = new P10JsonTransform(
        _record.config,
        true,
        [tag, toList([])],
        _record.ignore_data_element_value_bytes,
        _record.in_encapsulated_pixel_data,
        _record.pending_base64_input,
        _record.data_set_path,
        _record.sequence_item_counts,
      );
      let transform$1 = _block$1;
      let json$1 = json + (() => {
        let $1 = transform$1.config.pretty_print;
        if ($1) {
          return ((((((indent(transform$1, 0) + "\"") + $data_element_tag.to_hex_string(
            tag,
          )) + "\": {\n") + indent(transform$1, 1)) + "\"vr\": \"") + $value_representation.to_string(
            vr,
          )) + "\"";
        } else {
          return ((("\"" + $data_element_tag.to_hex_string(tag)) + "\":{\"vr\":\"") + $value_representation.to_string(
            vr,
          )) + "\"";
        }
      })();
      return $bool.lazy_guard(
        length === 0,
        () => {
          let json$2 = json$1 + (() => {
            let $1 = transform$1.config.pretty_print;
            if ($1) {
              return ("\n" + indent(transform$1, 0)) + "}";
            } else {
              return "}";
            }
          })();
          let _block$2;
          let _record$1 = transform$1;
          _block$2 = new P10JsonTransform(
            _record$1.config,
            _record$1.insert_comma,
            _record$1.current_data_element,
            true,
            _record$1.in_encapsulated_pixel_data,
            _record$1.pending_base64_input,
            _record$1.data_set_path,
            _record$1.sequence_item_counts,
          );
          let transform$2 = _block$2;
          return [json$2, transform$2];
        },
        () => {
          let json$2 = json$1 + (() => {
            if (vr instanceof $value_representation.OtherByteString) {
              let $1 = transform$1.config.pretty_print;
              if ($1) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else if (vr instanceof $value_representation.OtherDoubleString) {
              let $1 = transform$1.config.pretty_print;
              if ($1) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else if (vr instanceof $value_representation.OtherFloatString) {
              let $1 = transform$1.config.pretty_print;
              if ($1) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else if (vr instanceof $value_representation.OtherLongString) {
              let $1 = transform$1.config.pretty_print;
              if ($1) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else if (vr instanceof $value_representation.OtherVeryLongString) {
              let $1 = transform$1.config.pretty_print;
              if ($1) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else if (vr instanceof $value_representation.OtherWordString) {
              let $1 = transform$1.config.pretty_print;
              if ($1) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else if (vr instanceof $value_representation.Unknown) {
              let $1 = transform$1.config.pretty_print;
              if ($1) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else {
              let $1 = transform$1.config.pretty_print;
              if ($1) {
                return (",\n" + indent(transform$1, 1)) + "\"Value\": [\n";
              } else {
                return ",\"Value\":[";
              }
            }
          })();
          return [json$2, transform$1];
        },
      );
    },
  );
}

function write_sequence_start(transform, tag, vr) {
  let _block;
  let $ = transform.insert_comma;
  if ($) {
    let $1 = transform.config.pretty_print;
    if ($1) {
      _block = ",\n";
    } else {
      _block = ",";
    }
  } else {
    _block = "";
  }
  let json = _block;
  let _block$1;
  let _record = transform;
  _block$1 = new P10JsonTransform(
    _record.config,
    true,
    _record.current_data_element,
    _record.ignore_data_element_value_bytes,
    _record.in_encapsulated_pixel_data,
    _record.pending_base64_input,
    _record.data_set_path,
    _record.sequence_item_counts,
  );
  let transform$1 = _block$1;
  if (vr instanceof $value_representation.Sequence) {
    let _block$2;
    let _record$1 = transform$1;
    _block$2 = new P10JsonTransform(
      _record$1.config,
      false,
      _record$1.current_data_element,
      _record$1.ignore_data_element_value_bytes,
      _record$1.in_encapsulated_pixel_data,
      _record$1.pending_base64_input,
      _record$1.data_set_path,
      _record$1.sequence_item_counts,
    );
    let transform$2 = _block$2;
    let json$1 = json + (() => {
      let $1 = transform$2.config.pretty_print;
      if ($1) {
        return ((((((indent(transform$2, 0) + "\"") + $data_element_tag.to_hex_string(
          tag,
        )) + "\": {\n") + indent(transform$2, 1)) + "\"vr\": \"SQ\",\n") + indent(
          transform$2,
          1,
        )) + "\"Value\": [";
      } else {
        return ("\"" + $data_element_tag.to_hex_string(tag)) + "\":{\"vr\":\"SQ\",\"Value\":[";
      }
    })();
    return new Ok([json$1, transform$2]);
  } else {
    return $bool.lazy_guard(
      !transform$1.config.store_encapsulated_pixel_data,
      () => {
        return new Error(
          new $json_error.DataError(
            (() => {
              let _pipe = $data_error.new_value_invalid(
                "DICOM JSON does not support encapsulated pixel data, consider " + "enabling this extension in the config",
              );
              return $data_error.with_path(_pipe, transform$1.data_set_path);
            })(),
          ),
        );
      },
      () => {
        let _block$2;
        let _record$1 = transform$1;
        _block$2 = new P10JsonTransform(
          _record$1.config,
          _record$1.insert_comma,
          _record$1.current_data_element,
          _record$1.ignore_data_element_value_bytes,
          true,
          _record$1.pending_base64_input,
          _record$1.data_set_path,
          _record$1.sequence_item_counts,
        );
        let transform$2 = _block$2;
        let json$1 = json + (() => {
          let $1 = transform$2.config.pretty_print;
          if ($1) {
            return ((((((((indent(transform$2, 0) + "\"") + $data_element_tag.to_hex_string(
              tag,
            )) + "\": {\n") + indent(transform$2, 1)) + "\"vr\": \"") + $value_representation.to_string(
              vr,
            )) + "\",\n") + indent(transform$2, 1)) + "\"InlineBinary\": \"";
          } else {
            return ((("\"" + $data_element_tag.to_hex_string(tag)) + "\":{\"vr\":\"") + $value_representation.to_string(
              vr,
            )) + "\",\"InlineBinary\":\"";
          }
        })();
        return new Ok([json$1, transform$2]);
      },
    );
  }
}

function write_sequence_item_start(transform) {
  let _block;
  let $ = transform.insert_comma;
  if ($) {
    _block = ",";
  } else {
    _block = "";
  }
  let json = _block;
  let _block$1;
  let _record = transform;
  _block$1 = new P10JsonTransform(
    _record.config,
    false,
    _record.current_data_element,
    _record.ignore_data_element_value_bytes,
    _record.in_encapsulated_pixel_data,
    _record.pending_base64_input,
    _record.data_set_path,
    _record.sequence_item_counts,
  );
  let transform$1 = _block$1;
  let json$1 = json + (() => {
    let $1 = transform$1.config.pretty_print;
    if ($1) {
      return ("\n" + indent(transform$1, -1)) + "{\n";
    } else {
      return "{";
    }
  })();
  return [json$1, transform$1];
}

function write_sequence_item_end(transform) {
  let _block;
  let _record = transform;
  _block = new P10JsonTransform(
    _record.config,
    true,
    _record.current_data_element,
    _record.ignore_data_element_value_bytes,
    _record.in_encapsulated_pixel_data,
    _record.pending_base64_input,
    _record.data_set_path,
    _record.sequence_item_counts,
  );
  let transform$1 = _block;
  let _block$1;
  let $ = transform$1.config.pretty_print;
  if ($) {
    _block$1 = ("\n" + indent(transform$1, -1)) + "}";
  } else {
    _block$1 = "}";
  }
  let json = _block$1;
  return [json, transform$1];
}

function end(transform) {
  let _block;
  let $ = transform.config.pretty_print;
  if ($) {
    _block = "\n}\n";
  } else {
    _block = "}";
  }
  let json = _block;
  return json;
}

function write_base64(transform, input, finish) {
  let input_size = $bit_array.byte_size(input);
  return $bool.lazy_guard(
    (($bit_array.byte_size(transform.pending_base64_input) + input_size) < 3) && !finish,
    () => {
      let _block;
      let _record = transform;
      _block = new P10JsonTransform(
        _record.config,
        _record.insert_comma,
        _record.current_data_element,
        _record.ignore_data_element_value_bytes,
        _record.in_encapsulated_pixel_data,
        toBitArray([transform.pending_base64_input, input]),
        _record.data_set_path,
        _record.sequence_item_counts,
      );
      let transform$1 = _block;
      return ["", transform$1];
    },
    () => {
      let _block;
      if (finish) {
        _block = input_size;
      } else {
        _block = (divideInt(
          ($bit_array.byte_size(transform.pending_base64_input) + input_size),
          3
        )) * 3 - $bit_array.byte_size(transform.pending_base64_input);
      }
      let input_bytes_consumed = _block;
      let $ = $bit_array.slice(input, 0, input_bytes_consumed);
      if (!($ instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_json/transforms/p10_json_transform",
          706,
          "write_base64",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 20554,
            end: 20631,
            pattern_start: 20565,
            pattern_end: 20581
          }
        )
      }
      let base64_input = $[0];
      let json = $bit_array.base64_encode(
        toBitArray([transform.pending_base64_input, base64_input]),
        finish,
      );
      let _block$1;
      let _record = transform;
      _block$1 = new P10JsonTransform(
        _record.config,
        _record.insert_comma,
        _record.current_data_element,
        _record.ignore_data_element_value_bytes,
        _record.in_encapsulated_pixel_data,
        (() => {
          let $1 = $bit_array.slice(
            input,
            input_bytes_consumed,
            input_size - input_bytes_consumed,
          );
          if ($1 instanceof Ok) {
            let bytes = $1[0];
            return bytes;
          } else {
            return toBitArray([]);
          }
        })(),
        _record.data_set_path,
        _record.sequence_item_counts,
      );
      let transform$1 = _block$1;
      return [json, transform$1];
    },
  );
}

function write_sequence_end(transform) {
  let $ = transform.in_encapsulated_pixel_data;
  if ($) {
    let _block;
    let _record = transform;
    _block = new P10JsonTransform(
      _record.config,
      _record.insert_comma,
      _record.current_data_element,
      _record.ignore_data_element_value_bytes,
      false,
      _record.pending_base64_input,
      _record.data_set_path,
      _record.sequence_item_counts,
    );
    let transform$1 = _block;
    let $1 = write_base64(transform$1, toBitArray([]), true);
    let json = $1[0];
    let transform$2 = $1[1];
    let json$1 = json + (() => {
      let $2 = transform$2.config.pretty_print;
      if ($2) {
        return ("\"\n" + indent(transform$2, 0)) + "}";
      } else {
        return "\"}";
      }
    })();
    return [json$1, transform$2];
  } else {
    let _block;
    let _record = transform;
    _block = new P10JsonTransform(
      _record.config,
      true,
      _record.current_data_element,
      _record.ignore_data_element_value_bytes,
      _record.in_encapsulated_pixel_data,
      _record.pending_base64_input,
      _record.data_set_path,
      _record.sequence_item_counts,
    );
    let transform$1 = _block;
    let _block$1;
    let $1 = transform$1.config.pretty_print;
    if ($1) {
      _block$1 = ((("\n" + indent(transform$1, 1)) + "]\n") + indent(
        transform$1,
        0,
      )) + "}";
    } else {
      _block$1 = "]}";
    }
    let json = _block$1;
    return [json, transform$1];
  }
}

function write_encapsulated_pixel_data_item(transform, length) {
  return $bool.lazy_guard(
    !transform.config.store_encapsulated_pixel_data,
    () => {
      return new Error(
        new $json_error.DataError(
          (() => {
            let _pipe = $data_error.new_value_invalid(
              "DICOM JSON does not support encapsulated pixel data, consider " + "enabling this extension in the config",
            );
            return $data_error.with_path(_pipe, transform.data_set_path);
          })(),
        ),
      );
    },
    () => {
      let bytes = toBitArray([254, 255, 0, 224, sizedInt(length, 32, false)]);
      return new Ok(write_base64(transform, bytes, false));
    },
  );
}

function prepare_json_string(value) {
  let $ = value === "";
  if ($) {
    return "null";
  } else {
    return $json.to_string($json.string(value));
  }
}

function encode_ieee_float(f) {
  let $ = $ieee_float.to_finite(f);
  if ($ instanceof Ok) {
    let f$1 = $[0];
    return $float.to_string(f$1);
  } else {
    return $bool.guard(
      isEqual(f, $ieee_float.positive_infinity()),
      "\"Infinity\"",
      () => {
        return $bool.guard(
          isEqual(f, $ieee_float.negative_infinity()),
          "\"-Infinity\"",
          () => { return "\"NaN\""; },
        );
      },
    );
  }
}

function convert_binary_value_to_json(value, bytes, transform) {
  let $ = $data_element_value.value_representation(value);
  if ($ instanceof $value_representation.AgeString) {
    let _pipe = bytes;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    let _pipe$3 = $result.map(
      _pipe$2,
      (_capture) => { return $utils.trim_ascii_end(_capture, 0x20); },
    );
    let _pipe$4 = $result.map(_pipe$3, prepare_json_string);
    return $result.map(_pipe$4, (s) => { return toList([s]); });
  } else if ($ instanceof $value_representation.ApplicationEntity) {
    return $result.try$(
      $data_element_value.get_string(value),
      (value) => {
        let _pipe = value;
        let _pipe$1 = prepare_json_string(_pipe);
        let _pipe$2 = ((s) => { return toList([s]); })(_pipe$1);
        return new Ok(_pipe$2);
      },
    );
  } else if ($ instanceof $value_representation.AttributeTag) {
    return $result.try$(
      $attribute_tag.from_bytes(bytes),
      (tags) => {
        let _pipe = tags;
        let _pipe$1 = $list.map(
          _pipe,
          (tag) => {
            return ("\"" + $data_element_tag.to_hex_string(tag)) + "\"";
          },
        );
        return new Ok(_pipe$1);
      },
    );
  } else if ($ instanceof $value_representation.CodeString) {
    return $result.try$(
      $data_element_value.get_strings(value),
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(_pipe, prepare_json_string);
        return new Ok(_pipe$1);
      },
    );
  } else if ($ instanceof $value_representation.Date) {
    let _pipe = bytes;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    let _pipe$3 = $result.map(
      _pipe$2,
      (_capture) => { return $utils.trim_ascii_end(_capture, 0x20); },
    );
    let _pipe$4 = $result.map(_pipe$3, prepare_json_string);
    return $result.map(_pipe$4, (s) => { return toList([s]); });
  } else if ($ instanceof $value_representation.DateTime) {
    let _pipe = bytes;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    let _pipe$3 = $result.map(
      _pipe$2,
      (_capture) => { return $utils.trim_ascii_end(_capture, 0x20); },
    );
    let _pipe$4 = $result.map(_pipe$3, prepare_json_string);
    return $result.map(_pipe$4, (s) => { return toList([s]); });
  } else if ($ instanceof $value_representation.DecimalString) {
    return $result.try$(
      $data_element_value.get_floats(value),
      (value) => { return new Ok($list.map(value, encode_ieee_float)); },
    );
  } else if ($ instanceof $value_representation.FloatingPointDouble) {
    return $result.try$(
      $data_element_value.get_floats(value),
      (value) => { return new Ok($list.map(value, encode_ieee_float)); },
    );
  } else if ($ instanceof $value_representation.FloatingPointSingle) {
    return $result.try$(
      $data_element_value.get_floats(value),
      (value) => { return new Ok($list.map(value, encode_ieee_float)); },
    );
  } else if ($ instanceof $value_representation.IntegerString) {
    let _pipe = value;
    let _pipe$1 = $data_element_value.get_ints(_pipe);
    return $result.map(
      _pipe$1,
      (_capture) => { return $list.map(_capture, $int.to_string); },
    );
  } else if ($ instanceof $value_representation.LongString) {
    return $result.try$(
      $data_element_value.get_strings(value),
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(_pipe, prepare_json_string);
        return new Ok(_pipe$1);
      },
    );
  } else if ($ instanceof $value_representation.LongText) {
    return $result.try$(
      $data_element_value.get_string(value),
      (value) => {
        let _pipe = value;
        let _pipe$1 = prepare_json_string(_pipe);
        let _pipe$2 = ((s) => { return toList([s]); })(_pipe$1);
        return new Ok(_pipe$2);
      },
    );
  } else if ($ instanceof $value_representation.PersonName) {
    let _block;
    let _pipe = $bit_array.to_string(bytes);
    _block = $result.replace_error(
      _pipe,
      $data_error.new_value_invalid("PersonName is invalid UTF-8"),
    );
    let s = _block;
    return $result.try$(
      s,
      (s) => {
        let _pipe$1 = s;
        let _pipe$2 = $string.split(_pipe$1, "\\");
        let _pipe$3 = $list.map(
          _pipe$2,
          (raw_name) => {
            let _block$1;
            let _pipe$3 = raw_name;
            let _pipe$4 = $string.split(_pipe$3, "=");
            let _pipe$5 = $list.map(
              _pipe$4,
              (_capture) => { return $utils.trim_ascii_end(_capture, 0x20); },
            );
            _block$1 = $list.index_map(_pipe$5, (s, i) => { return [i, s]; });
            let component_groups = _block$1;
            return $bool.guard(
              $list.length(component_groups) > 3,
              new Error(
                $data_error.new_value_invalid(
                  "PersonName has too many component groups: " + $int.to_string(
                    $list.length(component_groups),
                  ),
                ),
              ),
              () => {
                let _block$2;
                let _pipe$6 = component_groups;
                _block$2 = $list.filter(
                  _pipe$6,
                  (x) => { return !$string.is_empty(x[1]); },
                );
                let component_groups$1 = _block$2;
                let _block$3;
                let $1 = transform.config.pretty_print;
                if ($1) {
                  _block$3 = indent(transform, -1) + "{\n";
                } else {
                  _block$3 = "{";
                }
                let result = _block$3;
                let _block$4;
                let _pipe$7 = component_groups$1;
                _block$4 = $list.index_fold(
                  _pipe$7,
                  result,
                  (result, x, i) => {
                    let _block$5;
                    let $2 = x[0];
                    if ($2 === 0) {
                      _block$5 = "Alphabetic";
                    } else if ($2 === 1) {
                      _block$5 = "Ideographic";
                    } else {
                      _block$5 = "Phonetic";
                    }
                    let name = _block$5;
                    let value$1 = $json.to_string($json.string(x[1]));
                    return (result + (() => {
                      let $3 = transform.config.pretty_print;
                      if ($3) {
                        return (((indent(transform, 3) + "\"") + name) + "\": ") + value$1;
                      } else {
                        return (("\"" + name) + "\":") + value$1;
                      }
                    })()) + (() => {
                      let $3 = i === ($list.length(component_groups$1) - 1);
                      if ($3) {
                        return "";
                      } else {
                        let $4 = transform.config.pretty_print;
                        if ($4) {
                          return ",\n";
                        } else {
                          return ",";
                        }
                      }
                    })();
                  },
                );
                let result$1 = _block$4;
                let result$2 = (() => {
                  let $2 = transform.config.pretty_print;
                  if ($2) {
                    return (result$1 + "\n") + indent(transform, 2);
                  } else {
                    return result$1;
                  }
                })() + "}";
                return new Ok(result$2);
              },
            );
          },
        );
        return $result.all(_pipe$3);
      },
    );
  } else if ($ instanceof $value_representation.ShortString) {
    return $result.try$(
      $data_element_value.get_strings(value),
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(_pipe, prepare_json_string);
        return new Ok(_pipe$1);
      },
    );
  } else if ($ instanceof $value_representation.ShortText) {
    return $result.try$(
      $data_element_value.get_string(value),
      (value) => {
        let _pipe = value;
        let _pipe$1 = prepare_json_string(_pipe);
        let _pipe$2 = ((s) => { return toList([s]); })(_pipe$1);
        return new Ok(_pipe$2);
      },
    );
  } else if ($ instanceof $value_representation.SignedLong) {
    let _pipe = value;
    let _pipe$1 = $data_element_value.get_ints(_pipe);
    return $result.map(
      _pipe$1,
      (_capture) => { return $list.map(_capture, $int.to_string); },
    );
  } else if ($ instanceof $value_representation.SignedShort) {
    let _pipe = value;
    let _pipe$1 = $data_element_value.get_ints(_pipe);
    return $result.map(
      _pipe$1,
      (_capture) => { return $list.map(_capture, $int.to_string); },
    );
  } else if ($ instanceof $value_representation.SignedVeryLong) {
    return $result.try$(
      $data_element_value.get_big_ints(value),
      (value) => {
        let $1 = $bigi.from_string("-9007199254740991");
        if (!($1 instanceof Ok)) {
          throw makeError(
            "let_assert",
            FILEPATH,
            "dcmfx_json/transforms/p10_json_transform",
            849,
            "convert_binary_value_to_json",
            "Pattern match failed, no pattern matched the value.",
            {
              value: $1,
              start: 24803,
              end: 24874,
              pattern_start: 24814,
              pattern_end: 24834
            }
          )
        }
        let min_safe_integer = $1[0];
        let $2 = $bigi.from_string("9007199254740991");
        if (!($2 instanceof Ok)) {
          throw makeError(
            "let_assert",
            FILEPATH,
            "dcmfx_json/transforms/p10_json_transform",
            850,
            "convert_binary_value_to_json",
            "Pattern match failed, no pattern matched the value.",
            {
              value: $2,
              start: 24881,
              end: 24951,
              pattern_start: 24892,
              pattern_end: 24912
            }
          )
        }
        let max_safe_integer = $2[0];
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (i) => {
            let $3 = (!isEqual(
              $bigi.compare(i, min_safe_integer),
              new $order.Lt()
            )) && (!isEqual($bigi.compare(i, max_safe_integer), new $order.Gt()));
            if ($3) {
              let $4 = $bigi.to_int(i);
              if (!($4 instanceof Ok)) {
                throw makeError(
                  "let_assert",
                  FILEPATH,
                  "dcmfx_json/transforms/p10_json_transform",
                  859,
                  "convert_binary_value_to_json",
                  "Pattern match failed, no pattern matched the value.",
                  {
                    value: $4,
                    start: 25161,
                    end: 25194,
                    pattern_start: 25172,
                    pattern_end: 25177
                  }
                )
              }
              let i$1 = $4[0];
              return $int.to_string(i$1);
            } else {
              return ("\"" + $bigi.to_string(i)) + "\"";
            }
          },
        );
        return new Ok(_pipe$1);
      },
    );
  } else if ($ instanceof $value_representation.Time) {
    let _pipe = bytes;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map_error(
      _pipe$1,
      (_) => {
        return $data_error.new_value_invalid("String bytes are not valid UTF-8");
      },
    );
    let _pipe$3 = $result.map(
      _pipe$2,
      (_capture) => { return $utils.trim_ascii_end(_capture, 0x20); },
    );
    let _pipe$4 = $result.map(_pipe$3, prepare_json_string);
    return $result.map(_pipe$4, (s) => { return toList([s]); });
  } else if ($ instanceof $value_representation.UniqueIdentifier) {
    return $result.try$(
      $data_element_value.get_strings(value),
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(_pipe, prepare_json_string);
        return new Ok(_pipe$1);
      },
    );
  } else if ($ instanceof $value_representation.UniversalResourceIdentifier) {
    return $result.try$(
      $data_element_value.get_string(value),
      (value) => {
        let _pipe = value;
        let _pipe$1 = prepare_json_string(_pipe);
        let _pipe$2 = ((s) => { return toList([s]); })(_pipe$1);
        return new Ok(_pipe$2);
      },
    );
  } else if ($ instanceof $value_representation.UnlimitedCharacters) {
    return $result.try$(
      $data_element_value.get_strings(value),
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(_pipe, prepare_json_string);
        return new Ok(_pipe$1);
      },
    );
  } else if ($ instanceof $value_representation.UnlimitedText) {
    return $result.try$(
      $data_element_value.get_string(value),
      (value) => {
        let _pipe = value;
        let _pipe$1 = prepare_json_string(_pipe);
        let _pipe$2 = ((s) => { return toList([s]); })(_pipe$1);
        return new Ok(_pipe$2);
      },
    );
  } else if ($ instanceof $value_representation.UnsignedLong) {
    let _pipe = value;
    let _pipe$1 = $data_element_value.get_ints(_pipe);
    return $result.map(
      _pipe$1,
      (_capture) => { return $list.map(_capture, $int.to_string); },
    );
  } else if ($ instanceof $value_representation.UnsignedShort) {
    let _pipe = value;
    let _pipe$1 = $data_element_value.get_ints(_pipe);
    return $result.map(
      _pipe$1,
      (_capture) => { return $list.map(_capture, $int.to_string); },
    );
  } else if ($ instanceof $value_representation.UnsignedVeryLong) {
    return $result.try$(
      $data_element_value.get_big_ints(value),
      (value) => {
        let $1 = $bigi.from_string("-9007199254740991");
        if (!($1 instanceof Ok)) {
          throw makeError(
            "let_assert",
            FILEPATH,
            "dcmfx_json/transforms/p10_json_transform",
            849,
            "convert_binary_value_to_json",
            "Pattern match failed, no pattern matched the value.",
            {
              value: $1,
              start: 24803,
              end: 24874,
              pattern_start: 24814,
              pattern_end: 24834
            }
          )
        }
        let min_safe_integer = $1[0];
        let $2 = $bigi.from_string("9007199254740991");
        if (!($2 instanceof Ok)) {
          throw makeError(
            "let_assert",
            FILEPATH,
            "dcmfx_json/transforms/p10_json_transform",
            850,
            "convert_binary_value_to_json",
            "Pattern match failed, no pattern matched the value.",
            {
              value: $2,
              start: 24881,
              end: 24951,
              pattern_start: 24892,
              pattern_end: 24912
            }
          )
        }
        let max_safe_integer = $2[0];
        let _pipe = value;
        let _pipe$1 = $list.map(
          _pipe,
          (i) => {
            let $3 = (!isEqual(
              $bigi.compare(i, min_safe_integer),
              new $order.Lt()
            )) && (!isEqual($bigi.compare(i, max_safe_integer), new $order.Gt()));
            if ($3) {
              let $4 = $bigi.to_int(i);
              if (!($4 instanceof Ok)) {
                throw makeError(
                  "let_assert",
                  FILEPATH,
                  "dcmfx_json/transforms/p10_json_transform",
                  859,
                  "convert_binary_value_to_json",
                  "Pattern match failed, no pattern matched the value.",
                  {
                    value: $4,
                    start: 25161,
                    end: 25194,
                    pattern_start: 25172,
                    pattern_end: 25177
                  }
                )
              }
              let i$1 = $4[0];
              return $int.to_string(i$1);
            } else {
              return ("\"" + $bigi.to_string(i)) + "\"";
            }
          },
        );
        return new Ok(_pipe$1);
      },
    );
  } else {
    return new Error(
      $data_error.new_value_invalid("Data element value not valid for its VR"),
    );
  }
}

function write_data_element_value_bytes(transform, vr, data, bytes_remaining) {
  return $bool.lazy_guard(
    transform.ignore_data_element_value_bytes,
    () => {
      let _block;
      let _record = transform;
      _block = new P10JsonTransform(
        _record.config,
        _record.insert_comma,
        _record.current_data_element,
        false,
        _record.in_encapsulated_pixel_data,
        _record.pending_base64_input,
        _record.data_set_path,
        _record.sequence_item_counts,
      );
      let transform$1 = _block;
      return new Ok(["", transform$1]);
    },
    () => {
      let is_inline_binary = ((((((isEqual(
        vr,
        new $value_representation.OtherByteString()
      )) || (isEqual(vr, new $value_representation.OtherDoubleString()))) || (isEqual(
        vr,
        new $value_representation.OtherFloatString()
      ))) || (isEqual(vr, new $value_representation.OtherLongString()))) || (isEqual(
        vr,
        new $value_representation.OtherVeryLongString()
      ))) || (isEqual(vr, new $value_representation.OtherWordString()))) || (isEqual(
        vr,
        new $value_representation.Unknown()
      ));
      return $bool.lazy_guard(
        is_inline_binary,
        () => {
          let $ = write_base64(
            transform,
            data,
            (bytes_remaining === 0) && !transform.in_encapsulated_pixel_data,
          );
          let json = $[0];
          let transform$1 = $[1];
          let json$1 = json + (() => {
            let $1 = (bytes_remaining === 0) && !transform$1.in_encapsulated_pixel_data;
            if ($1) {
              let $2 = transform$1.config.pretty_print;
              if ($2) {
                return ("\"\n" + indent(transform$1, 0)) + "}";
              } else {
                return "\"}";
              }
            } else {
              return "";
            }
          })();
          return new Ok([json$1, transform$1]);
        },
        () => {
          return $bool.guard(
            ($bit_array.byte_size(data) === 0) && (bytes_remaining === 0),
            new Ok(["", transform]),
            () => {
              let _block;
              let _record = transform;
              _block = new P10JsonTransform(
                _record.config,
                _record.insert_comma,
                [
                  transform.current_data_element[0],
                  listPrepend(data, transform.current_data_element[1]),
                ],
                _record.ignore_data_element_value_bytes,
                _record.in_encapsulated_pixel_data,
                _record.pending_base64_input,
                _record.data_set_path,
                _record.sequence_item_counts,
              );
              let transform$1 = _block;
              return $bool.guard(
                bytes_remaining > 0,
                new Ok(["", transform$1]),
                () => {
                  let bytes = $bit_array.concat(
                    transform$1.current_data_element[1],
                  );
                  let value = $data_element_value.new_binary_unchecked(
                    vr,
                    bytes,
                  );
                  let _block$1;
                  let _pipe = convert_binary_value_to_json(
                    value,
                    bytes,
                    transform$1,
                  );
                  _block$1 = $result.map_error(
                    _pipe,
                    (e) => {
                      return new $json_error.DataError(
                        $data_error.with_path(e, transform$1.data_set_path),
                      );
                    },
                  );
                  let json_values = _block$1;
                  return $result.map(
                    json_values,
                    (json_values) => {
                      let _block$2;
                      let $ = transform$1.config.pretty_print;
                      if ($) {
                        _block$2 = (((((indent(transform$1, 2) + $string.join(
                          json_values,
                          ",\n" + indent(transform$1, 2),
                        )) + "\n") + indent(transform$1, 1)) + "]\n") + indent(
                          transform$1,
                          0,
                        )) + "}";
                      } else {
                        _block$2 = $string.join(json_values, ",") + "]}";
                      }
                      let json = _block$2;
                      return [json, transform$1];
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

export function add_token(transform, token) {
  let token_stream_invalid_error = (_) => {
    let _pipe = new $p10_error.TokenStreamInvalid(
      "Adding token to JSON transform",
      "The transform was not able to write this token",
      token,
    );
    return new $json_error.P10Error(_pipe);
  };
  if (token instanceof $p10_token.FilePreambleAndDICMPrefix) {
    return new Ok(["", transform]);
  } else if (token instanceof $p10_token.FileMetaInformation) {
    let data_set = token.data_set;
    return new Ok(begin(transform, data_set));
  } else if (token instanceof $p10_token.DataElementHeader) {
    let tag = token.tag;
    let vr = token.vr;
    let length = token.length;
    let $ = write_data_element_header(transform, tag, vr, length);
    let json = $[0];
    let transform$1 = $[1];
    return $result.map(
      (() => {
        let _pipe = $data_set_path.add_data_element(
          transform$1.data_set_path,
          tag,
        );
        return $result.map_error(_pipe, token_stream_invalid_error);
      })(),
      (path) => {
        let _block;
        let _record = transform$1;
        _block = new P10JsonTransform(
          _record.config,
          _record.insert_comma,
          _record.current_data_element,
          _record.ignore_data_element_value_bytes,
          _record.in_encapsulated_pixel_data,
          _record.pending_base64_input,
          path,
          _record.sequence_item_counts,
        );
        let transform$2 = _block;
        return [json, transform$2];
      },
    );
  } else if (token instanceof $p10_token.DataElementValueBytes) {
    let vr = token.vr;
    let data = token.data;
    let bytes_remaining = token.bytes_remaining;
    return $result.try$(
      write_data_element_value_bytes(transform, vr, data, bytes_remaining),
      (_use0) => {
        let json = _use0[0];
        let transform$1 = _use0[1];
        let _block;
        if (bytes_remaining === 0) {
          let _pipe = $data_set_path.pop(transform$1.data_set_path);
          let _pipe$1 = $result.map_error(_pipe, token_stream_invalid_error);
          _block = $result.map(
            _pipe$1,
            (path) => {
              let _record = transform$1;
              return new P10JsonTransform(
                _record.config,
                _record.insert_comma,
                _record.current_data_element,
                _record.ignore_data_element_value_bytes,
                _record.in_encapsulated_pixel_data,
                _record.pending_base64_input,
                path,
                _record.sequence_item_counts,
              );
            },
          );
        } else {
          _block = new Ok(transform$1);
        }
        let transform$2 = _block;
        return $result.map(
          transform$2,
          (transform) => { return [json, transform]; },
        );
      },
    );
  } else if (token instanceof $p10_token.SequenceStart) {
    let tag = token.tag;
    let vr = token.vr;
    return $result.try$(
      write_sequence_start(transform, tag, vr),
      (_use0) => {
        let json = _use0[0];
        let transform$1 = _use0[1];
        let _block;
        let _pipe = $data_set_path.add_data_element(
          transform$1.data_set_path,
          tag,
        );
        _block = $result.map_error(_pipe, token_stream_invalid_error);
        let path = _block;
        return $result.map(
          path,
          (path) => {
            let _block$1;
            let _record = transform$1;
            _block$1 = new P10JsonTransform(
              _record.config,
              _record.insert_comma,
              _record.current_data_element,
              _record.ignore_data_element_value_bytes,
              _record.in_encapsulated_pixel_data,
              _record.pending_base64_input,
              path,
              listPrepend(0, transform$1.sequence_item_counts),
            );
            let transform$2 = _block$1;
            return [json, transform$2];
          },
        );
      },
    );
  } else if (token instanceof $p10_token.SequenceDelimiter) {
    let $ = write_sequence_end(transform);
    let json = $[0];
    let transform$1 = $[1];
    let _block;
    let _pipe = $data_set_path.pop(transform$1.data_set_path);
    _block = $result.map_error(_pipe, token_stream_invalid_error);
    let path = _block;
    return $result.try$(
      path,
      (path) => {
        let _block$1;
        let _pipe$1 = $list.rest(transform$1.sequence_item_counts);
        _block$1 = $result.unwrap(_pipe$1, toList([]));
        let sequence_item_counts = _block$1;
        let _block$2;
        let _record = transform$1;
        _block$2 = new P10JsonTransform(
          _record.config,
          _record.insert_comma,
          _record.current_data_element,
          _record.ignore_data_element_value_bytes,
          _record.in_encapsulated_pixel_data,
          _record.pending_base64_input,
          path,
          sequence_item_counts,
        );
        let transform$2 = _block$2;
        return new Ok([json, transform$2]);
      },
    );
  } else if (token instanceof $p10_token.SequenceItemStart) {
    let _block;
    let $ = transform.sequence_item_counts;
    if ($ instanceof $Empty) {
      _block = new Ok([transform.data_set_path, transform.sequence_item_counts]);
    } else {
      let count = $.head;
      let rest = $.tail;
      let _pipe = transform.data_set_path;
      let _pipe$1 = $data_set_path.add_sequence_item(_pipe, count);
      let _pipe$2 = $result.map_error(_pipe$1, token_stream_invalid_error);
      _block = $result.map(
        _pipe$2,
        (path) => { return [path, listPrepend(count + 1, rest)]; },
      );
    }
    let path_and_item_counts = _block;
    return $result.map(
      path_and_item_counts,
      (_use0) => {
        let path = _use0[0];
        let sequence_item_counts = _use0[1];
        let _block$1;
        let _record = transform;
        _block$1 = new P10JsonTransform(
          _record.config,
          _record.insert_comma,
          _record.current_data_element,
          _record.ignore_data_element_value_bytes,
          _record.in_encapsulated_pixel_data,
          _record.pending_base64_input,
          path,
          sequence_item_counts,
        );
        let transform$1 = _block$1;
        return write_sequence_item_start(transform$1);
      },
    );
  } else if (token instanceof $p10_token.SequenceItemDelimiter) {
    let $ = write_sequence_item_end(transform);
    let json = $[0];
    let transform$1 = $[1];
    let _block;
    let _pipe = $data_set_path.pop(transform$1.data_set_path);
    _block = $result.map_error(_pipe, token_stream_invalid_error);
    let path = _block;
    return $result.try$(
      path,
      (path) => {
        let _block$1;
        let _record = transform$1;
        _block$1 = new P10JsonTransform(
          _record.config,
          _record.insert_comma,
          _record.current_data_element,
          _record.ignore_data_element_value_bytes,
          _record.in_encapsulated_pixel_data,
          _record.pending_base64_input,
          path,
          _record.sequence_item_counts,
        );
        let transform$2 = _block$1;
        return new Ok([json, transform$2]);
      },
    );
  } else if (token instanceof $p10_token.PixelDataItem) {
    let length = token.length;
    let _block;
    let $ = transform.sequence_item_counts;
    if ($ instanceof $Empty) {
      _block = new Ok([transform.data_set_path, transform.sequence_item_counts]);
    } else {
      let count = $.head;
      let rest = $.tail;
      let _pipe = transform.data_set_path;
      let _pipe$1 = $data_set_path.add_sequence_item(_pipe, count);
      let _pipe$2 = $result.map_error(_pipe$1, token_stream_invalid_error);
      _block = $result.map(
        _pipe$2,
        (path) => { return [path, listPrepend(count + 1, rest)]; },
      );
    }
    let path_and_item_counts = _block;
    return $result.try$(
      path_and_item_counts,
      (_use0) => {
        let path = _use0[0];
        let sequence_item_counts = _use0[1];
        let _block$1;
        let _record = transform;
        _block$1 = new P10JsonTransform(
          _record.config,
          _record.insert_comma,
          _record.current_data_element,
          _record.ignore_data_element_value_bytes,
          _record.in_encapsulated_pixel_data,
          _record.pending_base64_input,
          path,
          sequence_item_counts,
        );
        let transform$1 = _block$1;
        return write_encapsulated_pixel_data_item(transform$1, length);
      },
    );
  } else {
    return new Ok([end(transform), transform]);
  }
}

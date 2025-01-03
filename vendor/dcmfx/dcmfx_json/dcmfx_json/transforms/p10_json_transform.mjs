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
import * as $p10_part from "../../../dcmfx_p10/dcmfx_p10/p10_part.mjs";
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
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  divideInt,
  isEqual,
  toBitArray,
  sizedInt,
} from "../../gleam.mjs";

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
  let $ = (() => {
    let $1 = transform.config.store_encapsulated_pixel_data;
    if ($1) {
      let transfer_syntax_uid = $data_set.get_string(
        file_meta_information,
        $dictionary.transfer_syntax_uid.tag,
      );
      if (transfer_syntax_uid.isOk()) {
        let transfer_syntax_uid$1 = transfer_syntax_uid[0];
        let transform$1 = transform.withFields({ insert_comma: true });
        let json$1 = (() => {
          let $2 = transform$1.config.pretty_print;
          if ($2) {
            return ("  \"00020010\": {\n    \"vr\": \"UI\",\n    \"Value\": [\n      \"" + transfer_syntax_uid$1) + "\"\n    ]\n  }";
          } else {
            return ("\"00020010\":{\"vr\":\"UI\",\"Value\":[\"" + transfer_syntax_uid$1) + "\"]}";
          }
        })();
        return [transform$1, json$1];
      } else {
        return [transform, ""];
      }
    } else {
      return [transform, ""];
    }
  })();
  let transform$1 = $[0];
  let transfer_syntax_json = $[1];
  return [transform$1, json + transfer_syntax_json];
}

function write_data_element_header(transform, tag, vr, length) {
  return $bool.lazy_guard(
    (tag.element === 0) || (isEqual(tag, $dictionary.specific_character_set.tag)),
    () => {
      let transform$1 = transform.withFields({
        ignore_data_element_value_bytes: true
      });
      return [transform$1, ""];
    },
    () => {
      let json = (() => {
        let $ = transform.insert_comma;
        if ($) {
          let $1 = transform.config.pretty_print;
          if ($1) {
            return ",\n";
          } else {
            return ",";
          }
        } else {
          return "";
        }
      })();
      let transform$1 = transform.withFields({
        insert_comma: true,
        current_data_element: [tag, toList([])]
      });
      let json$1 = json + (() => {
        let $ = transform$1.config.pretty_print;
        if ($) {
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
            let $ = transform$1.config.pretty_print;
            if ($) {
              return ("\n" + indent(transform$1, 0)) + "}";
            } else {
              return "}";
            }
          })();
          let transform$2 = transform$1.withFields({
            ignore_data_element_value_bytes: true
          });
          return [transform$2, json$2];
        },
        () => {
          let json$2 = json$1 + (() => {
            if (vr instanceof $value_representation.OtherByteString) {
              let $ = transform$1.config.pretty_print;
              if ($) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else if (vr instanceof $value_representation.OtherDoubleString) {
              let $ = transform$1.config.pretty_print;
              if ($) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else if (vr instanceof $value_representation.OtherFloatString) {
              let $ = transform$1.config.pretty_print;
              if ($) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else if (vr instanceof $value_representation.OtherLongString) {
              let $ = transform$1.config.pretty_print;
              if ($) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else if (vr instanceof $value_representation.OtherVeryLongString) {
              let $ = transform$1.config.pretty_print;
              if ($) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else if (vr instanceof $value_representation.OtherWordString) {
              let $ = transform$1.config.pretty_print;
              if ($) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else if (vr instanceof $value_representation.Unknown) {
              let $ = transform$1.config.pretty_print;
              if ($) {
                return (",\n" + indent(transform$1, 1)) + "\"InlineBinary\": \"";
              } else {
                return ",\"InlineBinary\":\"";
              }
            } else {
              let $ = transform$1.config.pretty_print;
              if ($) {
                return (",\n" + indent(transform$1, 1)) + "\"Value\": [\n";
              } else {
                return ",\"Value\":[";
              }
            }
          })();
          return [transform$1, json$2];
        },
      );
    },
  );
}

function write_sequence_start(transform, tag, vr) {
  let json = (() => {
    let $ = transform.insert_comma;
    if ($) {
      let $1 = transform.config.pretty_print;
      if ($1) {
        return ",\n";
      } else {
        return ",";
      }
    } else {
      return "";
    }
  })();
  let transform$1 = transform.withFields({ insert_comma: true });
  if (vr instanceof $value_representation.Sequence) {
    let transform$2 = transform$1.withFields({ insert_comma: false });
    let json$1 = json + (() => {
      let $ = transform$2.config.pretty_print;
      if ($) {
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
    return new Ok([transform$2, json$1]);
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
        let transform$2 = transform$1.withFields({
          in_encapsulated_pixel_data: true
        });
        let json$1 = json + (() => {
          let $ = transform$2.config.pretty_print;
          if ($) {
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
        return new Ok([transform$2, json$1]);
      },
    );
  }
}

function write_sequence_item_start(transform) {
  let json = (() => {
    let $ = transform.insert_comma;
    if ($) {
      return ",";
    } else {
      return "";
    }
  })();
  let transform$1 = transform.withFields({ insert_comma: false });
  let json$1 = json + (() => {
    let $ = transform$1.config.pretty_print;
    if ($) {
      return ("\n" + indent(transform$1, -1)) + "{\n";
    } else {
      return "{";
    }
  })();
  return [transform$1, json$1];
}

function write_sequence_item_end(transform) {
  let transform$1 = transform.withFields({ insert_comma: true });
  let json = (() => {
    let $ = transform$1.config.pretty_print;
    if ($) {
      return ("\n" + indent(transform$1, -1)) + "}";
    } else {
      return "}";
    }
  })();
  return [transform$1, json];
}

function end(transform) {
  let json = (() => {
    let $ = transform.config.pretty_print;
    if ($) {
      return "\n}\n";
    } else {
      return "}";
    }
  })();
  return json;
}

function write_base64(transform, input, finish) {
  let input_size = $bit_array.byte_size(input);
  return $bool.lazy_guard(
    (($bit_array.byte_size(transform.pending_base64_input) + input_size) < 3) && !finish,
    () => {
      let transform$1 = transform.withFields({
        pending_base64_input: toBitArray([
          transform.pending_base64_input.buffer,
          input.buffer,
        ])
      });
      return [transform$1, ""];
    },
    () => {
      let input_bytes_consumed = (() => {
        if (finish) {
          return input_size;
        } else {
          return (divideInt(
            ($bit_array.byte_size(transform.pending_base64_input) + input_size),
            3
          )) * 3 - $bit_array.byte_size(transform.pending_base64_input);
        }
      })();
      let $ = $bit_array.slice(input, 0, input_bytes_consumed);
      if (!$.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_json/transforms/p10_json_transform",
          708,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: $ }
        )
      }
      let base64_input = $[0];
      let json = $bit_array.base64_encode(
        toBitArray([transform.pending_base64_input.buffer, base64_input.buffer]),
        finish,
      );
      let transform$1 = transform.withFields({
        pending_base64_input: (() => {
          let $1 = $bit_array.slice(
            input,
            input_bytes_consumed,
            input_size - input_bytes_consumed,
          );
          if ($1.isOk()) {
            let bytes = $1[0];
            return bytes;
          } else {
            return toBitArray([]);
          }
        })()
      });
      return [transform$1, json];
    },
  );
}

function write_sequence_end(transform) {
  let $ = transform.in_encapsulated_pixel_data;
  if ($) {
    let transform$1 = transform.withFields({ in_encapsulated_pixel_data: false });
    let $1 = write_base64(transform$1, toBitArray([]), true);
    let transform$2 = $1[0];
    let json = $1[1];
    let json$1 = json + (() => {
      let $2 = transform$2.config.pretty_print;
      if ($2) {
        return ("\"\n" + indent(transform$2, 0)) + "}";
      } else {
        return "\"}";
      }
    })();
    return [transform$2, json$1];
  } else {
    let transform$1 = transform.withFields({ insert_comma: true });
    let json = (() => {
      let $1 = transform$1.config.pretty_print;
      if ($1) {
        return ((("\n" + indent(transform$1, 1)) + "]\n") + indent(
          transform$1,
          0,
        )) + "}";
      } else {
        return "]}";
      }
    })();
    return [transform$1, json];
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
      let bytes = toBitArray([
        0xFE,
        0xFF,
        0x0,
        0xE0,
        sizedInt(length, 32, false),
      ]);
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
  if ($.isOk()) {
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
  if ($ instanceof $value_representation.AttributeTag) {
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
  } else if ($ instanceof $value_representation.PersonName) {
    let s = (() => {
      let _pipe = $bit_array.to_string(bytes);
      return $result.replace_error(
        _pipe,
        $data_error.new_value_invalid("PersonName is invalid UTF-8"),
      );
    })();
    return $result.try$(
      s,
      (s) => {
        let _pipe = s;
        let _pipe$1 = $string.split(_pipe, "\\");
        let _pipe$2 = $list.map(
          _pipe$1,
          (raw_name) => {
            let component_groups = (() => {
              let _pipe$2 = raw_name;
              let _pipe$3 = $string.split(_pipe$2, "=");
              let _pipe$4 = $list.map(
                _pipe$3,
                (_capture) => { return $utils.trim_ascii_end(_capture, 0x20); },
              );
              return $list.index_map(_pipe$4, (s, i) => { return [i, s]; });
            })();
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
                let component_groups$1 = (() => {
                  let _pipe$2 = component_groups;
                  return $list.filter(
                    _pipe$2,
                    (x) => { return !$string.is_empty(x[1]); },
                  );
                })();
                let result = (() => {
                  let $1 = transform.config.pretty_print;
                  if ($1) {
                    return indent(transform, -1) + "{\n";
                  } else {
                    return "{";
                  }
                })();
                let result$1 = (() => {
                  let _pipe$2 = component_groups$1;
                  return $list.index_fold(
                    _pipe$2,
                    result,
                    (result, x, i) => {
                      let name = (() => {
                        let $1 = x[0];
                        if ($1 === 0) {
                          return "Alphabetic";
                        } else if ($1 === 1) {
                          return "Ideographic";
                        } else {
                          return "Phonetic";
                        }
                      })();
                      let value$1 = $json.to_string($json.string(x[1]));
                      return (result + (() => {
                        let $1 = transform.config.pretty_print;
                        if ($1) {
                          return (((indent(transform, 3) + "\"") + name) + "\": ") + value$1;
                        } else {
                          return (("\"" + name) + "\":") + value$1;
                        }
                      })()) + (() => {
                        let $1 = i === ($list.length(component_groups$1) - 1);
                        if ($1) {
                          return "";
                        } else {
                          let $2 = transform.config.pretty_print;
                          if ($2) {
                            return ",\n";
                          } else {
                            return ",";
                          }
                        }
                      })();
                    },
                  );
                })();
                let result$2 = (() => {
                  let $1 = transform.config.pretty_print;
                  if ($1) {
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
        return $result.all(_pipe$2);
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
  } else if ($ instanceof $value_representation.IntegerString) {
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
        if (!$1.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_json/transforms/p10_json_transform",
            851,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: $1 }
          )
        }
        let min_safe_integer = $1[0];
        let $2 = $bigi.from_string("9007199254740991");
        if (!$2.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_json/transforms/p10_json_transform",
            852,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: $2 }
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
              if (!$4.isOk()) {
                throw makeError(
                  "let_assert",
                  "dcmfx_json/transforms/p10_json_transform",
                  861,
                  "",
                  "Pattern match failed, no pattern matched the value.",
                  { value: $4 }
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
  } else if ($ instanceof $value_representation.UnsignedVeryLong) {
    return $result.try$(
      $data_element_value.get_big_ints(value),
      (value) => {
        let $1 = $bigi.from_string("-9007199254740991");
        if (!$1.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_json/transforms/p10_json_transform",
            851,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: $1 }
          )
        }
        let min_safe_integer = $1[0];
        let $2 = $bigi.from_string("9007199254740991");
        if (!$2.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_json/transforms/p10_json_transform",
            852,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: $2 }
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
              if (!$4.isOk()) {
                throw makeError(
                  "let_assert",
                  "dcmfx_json/transforms/p10_json_transform",
                  861,
                  "",
                  "Pattern match failed, no pattern matched the value.",
                  { value: $4 }
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
  } else if ($ instanceof $value_representation.AgeString) {
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
  } else if ($ instanceof $value_representation.CodeString) {
    return $result.try$(
      $data_element_value.get_strings(value),
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(_pipe, prepare_json_string);
        return new Ok(_pipe$1);
      },
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
  } else if ($ instanceof $value_representation.ShortString) {
    return $result.try$(
      $data_element_value.get_strings(value),
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(_pipe, prepare_json_string);
        return new Ok(_pipe$1);
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
  } else if ($ instanceof $value_representation.UniqueIdentifier) {
    return $result.try$(
      $data_element_value.get_strings(value),
      (value) => {
        let _pipe = value;
        let _pipe$1 = $list.map(_pipe, prepare_json_string);
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
      let transform$1 = transform.withFields({
        ignore_data_element_value_bytes: false
      });
      return new Ok([transform$1, ""]);
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
          let transform$1 = $[0];
          let json = $[1];
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
          return new Ok([transform$1, json$1]);
        },
        () => {
          return $bool.guard(
            ($bit_array.byte_size(data) === 0) && (bytes_remaining === 0),
            new Ok([transform, ""]),
            () => {
              let transform$1 = transform.withFields({
                current_data_element: [
                  transform.current_data_element[0],
                  listPrepend(data, transform.current_data_element[1]),
                ]
              });
              return $bool.guard(
                bytes_remaining > 0,
                new Ok([transform$1, ""]),
                () => {
                  let bytes = $bit_array.concat(
                    transform$1.current_data_element[1],
                  );
                  let value = $data_element_value.new_binary_unchecked(
                    vr,
                    bytes,
                  );
                  let json_values = (() => {
                    let _pipe = convert_binary_value_to_json(
                      value,
                      bytes,
                      transform$1,
                    );
                    return $result.map_error(
                      _pipe,
                      (e) => {
                        return new $json_error.DataError(
                          $data_error.with_path(e, transform$1.data_set_path),
                        );
                      },
                    );
                  })();
                  return $result.map(
                    json_values,
                    (json_values) => {
                      let json = (() => {
                        let $ = transform$1.config.pretty_print;
                        if ($) {
                          return (((((indent(transform$1, 2) + $string.join(
                            json_values,
                            ",\n" + indent(transform$1, 2),
                          )) + "\n") + indent(transform$1, 1)) + "]\n") + indent(
                            transform$1,
                            0,
                          )) + "}";
                        } else {
                          return $string.join(json_values, ",") + "]}";
                        }
                      })();
                      return [transform$1, json];
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

export function add_part(transform, part) {
  let part_stream_invalid_error = (_) => {
    let _pipe = new $p10_error.PartStreamInvalid(
      "Adding part to JSON transform",
      "The transform was not able to write this part",
      part,
    );
    return new $json_error.P10Error(_pipe);
  };
  if (part instanceof $p10_part.FilePreambleAndDICMPrefix) {
    return new Ok([transform, ""]);
  } else if (part instanceof $p10_part.FileMetaInformation) {
    let data_set = part.data_set;
    return new Ok(begin(transform, data_set));
  } else if (part instanceof $p10_part.DataElementHeader) {
    let tag = part.tag;
    let vr = part.vr;
    let length = part.length;
    let $ = write_data_element_header(transform, tag, vr, length);
    let transform$1 = $[0];
    let json = $[1];
    return $result.map(
      (() => {
        let _pipe = $data_set_path.add_data_element(
          transform$1.data_set_path,
          tag,
        );
        return $result.map_error(_pipe, part_stream_invalid_error);
      })(),
      (path) => {
        let transform$2 = transform$1.withFields({ data_set_path: path });
        return [transform$2, json];
      },
    );
  } else if (part instanceof $p10_part.DataElementValueBytes) {
    let vr = part.vr;
    let data = part.data;
    let bytes_remaining = part.bytes_remaining;
    return $result.try$(
      write_data_element_value_bytes(transform, vr, data, bytes_remaining),
      (_use0) => {
        let transform$1 = _use0[0];
        let json = _use0[1];
        let transform$2 = (() => {
          if (bytes_remaining === 0) {
            let _pipe = $data_set_path.pop(transform$1.data_set_path);
            let _pipe$1 = $result.map_error(_pipe, part_stream_invalid_error);
            return $result.map(
              _pipe$1,
              (path) => {
                return transform$1.withFields({ data_set_path: path });
              },
            );
          } else {
            return new Ok(transform$1);
          }
        })();
        return $result.map(
          transform$2,
          (transform) => { return [transform, json]; },
        );
      },
    );
  } else if (part instanceof $p10_part.SequenceStart) {
    let tag = part.tag;
    let vr = part.vr;
    return $result.try$(
      write_sequence_start(transform, tag, vr),
      (_use0) => {
        let transform$1 = _use0[0];
        let json = _use0[1];
        let path = (() => {
          let _pipe = $data_set_path.add_data_element(
            transform$1.data_set_path,
            tag,
          );
          return $result.map_error(_pipe, part_stream_invalid_error);
        })();
        return $result.map(
          path,
          (path) => {
            let transform$2 = transform$1.withFields({
              data_set_path: path,
              sequence_item_counts: listPrepend(
                0,
                transform$1.sequence_item_counts,
              )
            });
            return [transform$2, json];
          },
        );
      },
    );
  } else if (part instanceof $p10_part.SequenceDelimiter) {
    let $ = write_sequence_end(transform);
    let transform$1 = $[0];
    let json = $[1];
    let path = (() => {
      let _pipe = $data_set_path.pop(transform$1.data_set_path);
      return $result.map_error(_pipe, part_stream_invalid_error);
    })();
    return $result.try$(
      path,
      (path) => {
        let sequence_item_counts = (() => {
          let _pipe = $list.rest(transform$1.sequence_item_counts);
          return $result.unwrap(_pipe, toList([]));
        })();
        let transform$2 = transform$1.withFields({
          data_set_path: path,
          sequence_item_counts: sequence_item_counts
        });
        return new Ok([transform$2, json]);
      },
    );
  } else if (part instanceof $p10_part.SequenceItemStart) {
    let path_and_item_counts = (() => {
      let $ = transform.sequence_item_counts;
      if ($.atLeastLength(1)) {
        let count = $.head;
        let rest = $.tail;
        let _pipe = transform.data_set_path;
        let _pipe$1 = $data_set_path.add_sequence_item(_pipe, count);
        let _pipe$2 = $result.map_error(_pipe$1, part_stream_invalid_error);
        return $result.map(
          _pipe$2,
          (path) => { return [path, listPrepend(count + 1, rest)]; },
        );
      } else {
        return new Ok([transform.data_set_path, transform.sequence_item_counts]);
      }
    })();
    return $result.map(
      path_and_item_counts,
      (_use0) => {
        let path = _use0[0];
        let sequence_item_counts = _use0[1];
        let transform$1 = transform.withFields({
          data_set_path: path,
          sequence_item_counts: sequence_item_counts
        });
        return write_sequence_item_start(transform$1);
      },
    );
  } else if (part instanceof $p10_part.SequenceItemDelimiter) {
    let $ = write_sequence_item_end(transform);
    let transform$1 = $[0];
    let json = $[1];
    let path = (() => {
      let _pipe = $data_set_path.pop(transform$1.data_set_path);
      return $result.map_error(_pipe, part_stream_invalid_error);
    })();
    return $result.try$(
      path,
      (path) => {
        let transform$2 = transform$1.withFields({ data_set_path: path });
        return new Ok([transform$2, json]);
      },
    );
  } else if (part instanceof $p10_part.PixelDataItem) {
    let length = part.length;
    let path_and_item_counts = (() => {
      let $ = transform.sequence_item_counts;
      if ($.atLeastLength(1)) {
        let count = $.head;
        let rest = $.tail;
        let _pipe = transform.data_set_path;
        let _pipe$1 = $data_set_path.add_sequence_item(_pipe, count);
        let _pipe$2 = $result.map_error(_pipe$1, part_stream_invalid_error);
        return $result.map(
          _pipe$2,
          (path) => { return [path, listPrepend(count + 1, rest)]; },
        );
      } else {
        return new Ok([transform.data_set_path, transform.sequence_item_counts]);
      }
    })();
    return $result.try$(
      path_and_item_counts,
      (_use0) => {
        let path = _use0[0];
        let sequence_item_counts = _use0[1];
        let transform$1 = transform.withFields({
          data_set_path: path,
          sequence_item_counts: sequence_item_counts
        });
        return write_encapsulated_pixel_data_item(transform$1, length);
      },
    );
  } else {
    return new Ok([transform, end(transform)]);
  }
}

/// <reference types="./p10_write.d.mts" />
import * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $data_error from "../../dcmfx_core/dcmfx_core/data_error.mjs";
import * as $data_set from "../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $dictionary from "../../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $transfer_syntax from "../../dcmfx_core/dcmfx_core/transfer_syntax.mjs";
import { BigEndian, LittleEndian } from "../../dcmfx_core/dcmfx_core/transfer_syntax.mjs";
import * as $value_representation from "../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../gleam_stdlib/gleam/bool.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $pair from "../../gleam_stdlib/gleam/pair.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $data_element_header from "../dcmfx_p10/internal/data_element_header.mjs";
import { DataElementHeader } from "../dcmfx_p10/internal/data_element_header.mjs";
import * as $p10_location from "../dcmfx_p10/internal/p10_location.mjs";
import * as $value_length from "../dcmfx_p10/internal/value_length.mjs";
import * as $zlib from "../dcmfx_p10/internal/zlib.mjs";
import * as $flush_command from "../dcmfx_p10/internal/zlib/flush_command.mjs";
import * as $p10_error from "../dcmfx_p10/p10_error.mjs";
import * as $p10_token from "../dcmfx_p10/p10_token.mjs";
import * as $p10_filter_transform from "../dcmfx_p10/transforms/p10_filter_transform.mjs";
import * as $p10_insert_transform from "../dcmfx_p10/transforms/p10_insert_transform.mjs";
import * as $uids from "../dcmfx_p10/uids.mjs";
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
  stringBits,
} from "../gleam.mjs";

export class P10WriteConfig extends $CustomType {
  constructor(implementation_class_uid, implementation_version_name, zlib_compression_level) {
    super();
    this.implementation_class_uid = implementation_class_uid;
    this.implementation_version_name = implementation_version_name;
    this.zlib_compression_level = zlib_compression_level;
  }
}

class P10WriteContext extends $CustomType {
  constructor(config, p10_bytes, p10_total_byte_count, is_ended, transfer_syntax, zlib_stream, location, path) {
    super();
    this.config = config;
    this.p10_bytes = p10_bytes;
    this.p10_total_byte_count = p10_total_byte_count;
    this.is_ended = is_ended;
    this.transfer_syntax = transfer_syntax;
    this.zlib_stream = zlib_stream;
    this.location = location;
    this.path = path;
  }
}

export function default_config() {
  return new P10WriteConfig(
    $uids.dcmfx_implementation_class_uid,
    $uids.dcmfx_implementation_version_name,
    6,
  );
}

export function new_write_context() {
  return new P10WriteContext(
    default_config(),
    toList([]),
    0,
    false,
    $transfer_syntax.implicit_vr_little_endian,
    new None(),
    $p10_location.new$(),
    $data_set_path.new$(),
  );
}

export function with_config(context, config) {
  let _block;
  let _record = config;
  _block = new P10WriteConfig(
    _record.implementation_class_uid,
    _record.implementation_version_name,
    $int.clamp(config.zlib_compression_level, 0, 9),
  );
  let config$1 = _block;
  let _record$1 = context;
  return new P10WriteContext(
    config$1,
    _record$1.p10_bytes,
    _record$1.p10_total_byte_count,
    _record$1.is_ended,
    _record$1.transfer_syntax,
    _record$1.zlib_stream,
    _record$1.location,
    _record$1.path,
  );
}

export function read_bytes(context) {
  let p10_bytes = $list.reverse(context.p10_bytes);
  return [
    p10_bytes,
    (() => {
      let _record = context;
      return new P10WriteContext(
        _record.config,
        toList([]),
        _record.p10_total_byte_count,
        _record.is_ended,
        _record.transfer_syntax,
        _record.zlib_stream,
        _record.location,
        _record.path,
      );
    })(),
  ];
}

export function data_element_header_to_bytes(header, endianness, context) {
  let length = $value_length.to_int(header.length);
  return $bool.guard(
    length < 0,
    new Error(
      new $p10_error.DataInvalid(
        "Serializing data element header",
        "Length is negative",
        context.path,
        context.p10_total_byte_count,
      ),
    ),
    () => {
      let _block;
      if (endianness instanceof LittleEndian) {
        _block = toBitArray([
          sizedInt(header.tag.group, 16, false),
          sizedInt(header.tag.element, 16, false),
        ]);
      } else {
        _block = toBitArray([
          sizedInt(header.tag.group, 16, true),
          sizedInt(header.tag.element, 16, true),
        ]);
      }
      let tag_bytes = _block;
      let $ = header.vr;
      if ($ instanceof None) {
        if (endianness instanceof LittleEndian) {
          return new Ok(toBitArray([tag_bytes, sizedInt(length, 32, false)]));
        } else {
          return new Ok(toBitArray([tag_bytes, sizedInt(length, 32, true)]));
        }
      } else {
        let vr = $[0];
        let length$1 = $value_length.to_int(header.length);
        let _block$1;
        let $1 = $data_element_header.value_length_size(vr);
        if ($1 instanceof $data_element_header.ValueLengthU16) {
          let $2 = length$1 > 0xFFFF;
          if ($2) {
            let _pipe = new $p10_error.DataInvalid(
              "Serializing data element header",
              ("Length " + $int.to_string(length$1)) + " exceeds the maximum of 2^16 - 1 bytes",
              context.path,
              context.p10_total_byte_count,
            );
            _block$1 = new Error(_pipe);
          } else {
            if (endianness instanceof LittleEndian) {
              _block$1 = new Ok(toBitArray([sizedInt(length$1, 16, false)]));
            } else {
              _block$1 = new Ok(toBitArray([sizedInt(length$1, 16, true)]));
            }
          }
        } else {
          let $2 = length$1 > 0xFFFFFFFF;
          if ($2) {
            let _pipe = new $p10_error.DataInvalid(
              "Serializing data element header",
              ("Length " + $int.to_string(length$1)) + " exceeds the maximum of 0xFFFFFFFF",
              context.path,
              context.p10_total_byte_count,
            );
            _block$1 = new Error(_pipe);
          } else {
            if (endianness instanceof LittleEndian) {
              _block$1 = new Ok(
                toBitArray([0, 0, sizedInt(length$1, 32, false)]),
              );
            } else {
              _block$1 = new Ok(
                toBitArray([0, 0, sizedInt(length$1, 32, true)]),
              );
            }
          }
        }
        let length_bytes = _block$1;
        return $result.try$(
          length_bytes,
          (length_bytes) => {
            return new Ok(
              toBitArray([
                tag_bytes,
                stringBits($value_representation.to_string(vr)),
                length_bytes,
              ]),
            );
          },
        );
      }
    },
  );
}

export function data_set_to_tokens(data_set, callback_context, token_callback) {
  let remove_fmi_transform = $p10_filter_transform.new$(
    (tag, _, _1, _2) => { return tag.group !== 2; },
  );
  let _block;
  let _pipe = $data_set.new$();
  _block = $data_set.insert_string_value(
    _pipe,
    $dictionary.specific_character_set,
    toList(["ISO_IR 192"]),
  );
  let $ = _block;
  if (!$.isOk()) {
    throw makeError(
      "let_assert",
      "dcmfx_p10/p10_write",
      636,
      "data_set_to_tokens",
      "Pattern match failed, no pattern matched the value.",
      { value: $ }
    )
  }
  let data_elements_to_insert = $[0];
  let insert_specific_character_set_transform = $p10_insert_transform.new$(
    data_elements_to_insert,
  );
  let process_token = (context, token) => {
    let $1 = $p10_filter_transform.add_token(context[1], token);
    if (!$1.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_p10/p10_write",
        653,
        "",
        "Pattern match failed, no pattern matched the value.",
        { value: $1 }
      )
    }
    let filter_result = $1[0][0];
    let filter_transform = $1[0][1];
    if (!filter_result) {
      return new Ok([context[0], filter_transform, context[2]]);
    } else {
      let $2 = $p10_insert_transform.add_token(context[2], token);
      if (!$2.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_p10/p10_write",
          660,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: $2 }
        )
      }
      let tokens = $2[0][0];
      let insert_transform = $2[0][1];
      return $result.try$(
        $list.try_fold(tokens, context[0], token_callback),
        (callback_context) => {
          return new Ok([callback_context, filter_transform, insert_transform]);
        },
      );
    }
  };
  let context = [
    callback_context,
    remove_fmi_transform,
    insert_specific_character_set_transform,
  ];
  let _block$1;
  let _pipe$1 = $list.repeat(toBitArray([0]), 128);
  let _pipe$2 = $bit_array.concat(_pipe$1);
  _block$1 = new $p10_token.FilePreambleAndDICMPrefix(_pipe$2);
  let preamble_token = _block$1;
  return $result.try$(
    process_token(context, preamble_token),
    (context) => {
      let _block$2;
      let _pipe$3 = data_set;
      let _pipe$4 = $data_set.file_meta_information(_pipe$3);
      _block$2 = new $p10_token.FileMetaInformation(_pipe$4);
      let fmi_token = _block$2;
      return $result.try$(
        process_token(context, fmi_token),
        (context) => {
          return $result.try$(
            $p10_token.data_elements_to_tokens(data_set, context, process_token),
            (context) => {
              return $result.map(
                process_token(context, new $p10_token.End()),
                (context) => { return context[0]; },
              );
            },
          );
        },
      );
    },
  );
}

function prepare_file_meta_information_token_data_set(
  file_meta_information,
  implementation_class_uid,
  implementation_version_name
) {
  let $ = $data_element_value.new_other_byte_string(toBitArray([0, 1]));
  if (!$.isOk()) {
    throw makeError(
      "let_assert",
      "dcmfx_p10/p10_write",
      741,
      "prepare_file_meta_information_token_data_set",
      "Pattern match failed, no pattern matched the value.",
      { value: $ }
    )
  }
  let file_meta_information_version = $[0];
  let _pipe = file_meta_information;
  let _pipe$1 = $data_set.insert(
    _pipe,
    $dictionary.file_meta_information_version.tag,
    file_meta_information_version,
  );
  let _pipe$2 = $data_set.insert_string_value(
    _pipe$1,
    $dictionary.implementation_class_uid,
    toList([implementation_class_uid]),
  );
  return $result.try$(
    _pipe$2,
    (_capture) => {
      return $data_set.insert_string_value(
        _capture,
        $dictionary.implementation_version_name,
        toList([implementation_version_name]),
      );
    },
  );
}

function token_to_bytes(token, context) {
  let transfer_syntax = context.transfer_syntax;
  if (token instanceof $p10_token.FilePreambleAndDICMPrefix) {
    let preamble = token.preamble;
    let preamble_length = $bit_array.byte_size(preamble);
    if (preamble_length === 128) {
      return new Ok(
        $bit_array.append(preamble, toBitArray([stringBits("DICM")])),
      );
    } else {
      return new Error(
        new $p10_error.DataInvalid(
          "Serializing File Preamble",
          ("Preamble data must be 128 bytes in length but " + $int.to_string(
            preamble_length,
          )) + " bytes were supplied",
          context.path,
          context.p10_total_byte_count,
        ),
      );
    }
  } else if (token instanceof $p10_token.FileMetaInformation) {
    let file_meta_information = token.data_set;
    let _block;
    let _pipe = file_meta_information;
    let _pipe$1 = prepare_file_meta_information_token_data_set(
      _pipe,
      context.config.implementation_class_uid,
      context.config.implementation_version_name,
    );
    _block = $result.map_error(
      _pipe$1,
      (e) => {
        return new $p10_error.DataInvalid(
          "Serializing File Meta Information",
          $data_error.details(e),
          (() => {
            let _pipe$2 = $data_error.path(e);
            return $option.unwrap(_pipe$2, $data_set_path.new$());
          })(),
          context.p10_total_byte_count,
        );
      },
    );
    let file_meta_information$1 = _block;
    return $result.try$(
      file_meta_information$1,
      (file_meta_information) => {
        let _block$1;
        let _pipe$2 = file_meta_information;
        let _pipe$3 = $data_set.map(
          _pipe$2,
          (tag, value) => {
            let vr = $data_element_value.value_representation(value);
            let _block$2;
            let _pipe$3 = value;
            let _pipe$4 = $data_element_value.bytes(_pipe$3);
            _block$2 = $result.replace_error(
              _pipe$4,
              new $p10_error.DataInvalid(
                "Serializing File Meta Information",
                ((("Tag '" + $data_element_tag.to_string(tag)) + "' with value representation '") + $value_representation.to_string(
                  vr,
                )) + "' is not allowed in File Meta Information",
                context.path,
                context.p10_total_byte_count,
              ),
            );
            let value_bytes = _block$2;
            return $result.try$(
              value_bytes,
              (value_bytes) => {
                let value_length = $bit_array.byte_size(value_bytes);
                let _block$3;
                let _pipe$5 = new DataElementHeader(
                  tag,
                  new Some(vr),
                  $value_length.new$(value_length),
                );
                _block$3 = data_element_header_to_bytes(
                  _pipe$5,
                  new LittleEndian(),
                  context,
                );
                let header_bytes = _block$3;
                return $result.try$(
                  header_bytes,
                  (header_bytes) => {
                    return new Ok($bit_array.append(header_bytes, value_bytes));
                  },
                );
              },
            );
          },
        );
        let _pipe$4 = $result.all(_pipe$3);
        _block$1 = $result.map(_pipe$4, $bit_array.concat);
        let fmi_bytes = _block$1;
        return $result.map(
          fmi_bytes,
          (fmi_bytes) => {
            let fmi_length = $bit_array.byte_size(fmi_bytes);
            let fmi_length_bytes = toBitArray([
              2, 0,
              0, 0,
              stringBits("UL"),
              4, 0,
              sizedInt(fmi_length, 32, false),
            ]);
            return $bit_array.concat(toList([fmi_length_bytes, fmi_bytes]));
          },
        );
      },
    );
  } else if (token instanceof $p10_token.DataElementHeader) {
    let tag = token.tag;
    let vr = token.vr;
    let length = token.length;
    let _block;
    let $ = transfer_syntax.vr_serialization;
    if ($ instanceof $transfer_syntax.VrExplicit) {
      _block = new Some(vr);
    } else {
      _block = new None();
    }
    let vr$1 = _block;
    let _pipe = new DataElementHeader(tag, vr$1, $value_length.new$(length));
    return data_element_header_to_bytes(
      _pipe,
      transfer_syntax.endianness,
      context,
    );
  } else if (token instanceof $p10_token.DataElementValueBytes) {
    let tag = token.tag;
    let vr = token.vr;
    let data = token.data;
    let _block;
    let $ = transfer_syntax.endianness;
    if ($ instanceof LittleEndian) {
      _block = data;
    } else {
      _block = $p10_location.swap_endianness(context.location, tag, vr, data);
    }
    let _pipe = _block;
    return new Ok(_pipe);
  } else if (token instanceof $p10_token.SequenceStart) {
    let tag = token.tag;
    let vr = token.vr;
    let _block;
    let $ = transfer_syntax.vr_serialization;
    if ($ instanceof $transfer_syntax.VrExplicit) {
      _block = new Some(vr);
    } else {
      _block = new None();
    }
    let vr$1 = _block;
    let _pipe = new DataElementHeader(tag, vr$1, new $value_length.Undefined());
    return data_element_header_to_bytes(
      _pipe,
      transfer_syntax.endianness,
      context,
    );
  } else if (token instanceof $p10_token.SequenceDelimiter) {
    let _pipe = new DataElementHeader(
      $dictionary.sequence_delimitation_item.tag,
      new None(),
      $value_length.zero,
    );
    return data_element_header_to_bytes(
      _pipe,
      transfer_syntax.endianness,
      context,
    );
  } else if (token instanceof $p10_token.SequenceItemStart) {
    let _pipe = new DataElementHeader(
      $dictionary.item.tag,
      new None(),
      new $value_length.Undefined(),
    );
    return data_element_header_to_bytes(
      _pipe,
      transfer_syntax.endianness,
      context,
    );
  } else if (token instanceof $p10_token.SequenceItemDelimiter) {
    let _pipe = new DataElementHeader(
      $dictionary.item_delimitation_item.tag,
      new None(),
      $value_length.zero,
    );
    return data_element_header_to_bytes(
      _pipe,
      transfer_syntax.endianness,
      context,
    );
  } else if (token instanceof $p10_token.PixelDataItem) {
    let length = token.length;
    let _pipe = new DataElementHeader(
      $dictionary.item.tag,
      new None(),
      $value_length.new$(length),
    );
    return data_element_header_to_bytes(
      _pipe,
      transfer_syntax.endianness,
      context,
    );
  } else {
    return new Ok(toBitArray([]));
  }
}

export function write_token(context, token) {
  return $bool.guard(
    context.is_ended,
    new Error(
      new $p10_error.TokenStreamInvalid(
        "Writing DICOM P10 token",
        "Received a further DICOM P10 token after the write was " + "completed",
        token,
      ),
    ),
    () => {
      if (token instanceof $p10_token.FileMetaInformation) {
        let file_meta_information = token.data_set;
        let _block;
        let _pipe = file_meta_information;
        let _pipe$1 = $data_set.get_string(
          _pipe,
          $dictionary.transfer_syntax_uid.tag,
        );
        _block = $result.unwrap(
          _pipe$1,
          $transfer_syntax.implicit_vr_little_endian.uid,
        );
        let transfer_syntax_uid = _block;
        let _block$1;
        let _pipe$2 = transfer_syntax_uid;
        let _pipe$3 = $transfer_syntax.from_uid(_pipe$2);
        _block$1 = $result.map_error(
          _pipe$3,
          (_) => {
            return new $p10_error.TransferSyntaxNotSupported(
              transfer_syntax_uid,
            );
          },
        );
        let new_transfer_syntax = _block$1;
        return $result.try$(
          new_transfer_syntax,
          (new_transfer_syntax) => {
            let _block$2;
            let $ = new_transfer_syntax.is_deflated;
            if ($) {
              let stream = $zlib.open();
              $zlib.deflate_init(
                stream,
                context.config.zlib_compression_level,
                new $zlib.Deflated(),
                -15,
                8,
                new $zlib.Default(),
              );
              _block$2 = new Some(stream);
            } else {
              _block$2 = new None();
            }
            let zlib_stream = _block$2;
            let _block$3;
            let _record = context;
            _block$3 = new P10WriteContext(
              _record.config,
              _record.p10_bytes,
              _record.p10_total_byte_count,
              _record.is_ended,
              new_transfer_syntax,
              zlib_stream,
              _record.location,
              _record.path,
            );
            let new_context = _block$3;
            return $result.map(
              token_to_bytes(token, new_context),
              (token_bytes) => {
                let _record$1 = new_context;
                return new P10WriteContext(
                  _record$1.config,
                  listPrepend(token_bytes, new_context.p10_bytes),
                  context.p10_total_byte_count + $bit_array.byte_size(
                    token_bytes,
                  ),
                  _record$1.is_ended,
                  _record$1.transfer_syntax,
                  _record$1.zlib_stream,
                  _record$1.location,
                  _record$1.path,
                );
              },
            );
          },
        );
      } else if (token instanceof $p10_token.End) {
        let $ = context.zlib_stream;
        if ($ instanceof Some) {
          let zlib_stream = $[0];
          let _block;
          let _pipe = zlib_stream;
          let _pipe$1 = $zlib.deflate(
            _pipe,
            toBitArray([]),
            new $flush_command.Finish(),
          );
          _block = $bit_array.concat(_pipe$1);
          let data = _block;
          let _block$1;
          let _record = context;
          _block$1 = new P10WriteContext(
            _record.config,
            listPrepend(data, context.p10_bytes),
            context.p10_total_byte_count + $bit_array.byte_size(data),
            true,
            _record.transfer_syntax,
            new None(),
            _record.location,
            _record.path,
          );
          let _pipe$2 = _block$1;
          return new Ok(_pipe$2);
        } else {
          return new Ok(
            (() => {
              let _record = context;
              return new P10WriteContext(
                _record.config,
                _record.p10_bytes,
                _record.p10_total_byte_count,
                true,
                _record.transfer_syntax,
                _record.zlib_stream,
                _record.location,
                _record.path,
              );
            })(),
          );
        }
      } else {
        let map_to_p10_token_stream_error = (_capture) => {
          return $result.map_error(
            _capture,
            (details) => {
              return new $p10_error.TokenStreamInvalid(
                "Writing token to context",
                details,
                token,
              );
            },
          );
        };
        let _block$1;
        if (token instanceof $p10_token.DataElementHeader) {
          let tag = token.tag;
          let path = $data_set_path.add_data_element(context.path, tag);
          _block$1 = $result.try$(
            path,
            (path) => {
              return new Ok(
                (() => {
                  let _record = context;
                  return new P10WriteContext(
                    _record.config,
                    _record.p10_bytes,
                    _record.p10_total_byte_count,
                    _record.is_ended,
                    _record.transfer_syntax,
                    _record.zlib_stream,
                    _record.location,
                    path,
                  );
                })(),
              );
            },
          );
        } else if (token instanceof $p10_token.SequenceStart) {
          let tag = token.tag;
          let _block$2;
          let _pipe = context.location;
          _block$2 = $p10_location.add_sequence(_pipe, tag, false, new None());
          let location = _block$2;
          _block$1 = $result.try$(
            location,
            (location) => {
              let path = $data_set_path.add_data_element(context.path, tag);
              return $result.try$(
                path,
                (path) => {
                  return new Ok(
                    (() => {
                      let _record = context;
                      return new P10WriteContext(
                        _record.config,
                        _record.p10_bytes,
                        _record.p10_total_byte_count,
                        _record.is_ended,
                        _record.transfer_syntax,
                        _record.zlib_stream,
                        location,
                        path,
                      );
                    })(),
                  );
                },
              );
            },
          );
        } else if (token instanceof $p10_token.SequenceItemStart) {
          let _block$2;
          let _pipe = context.location;
          _block$2 = $p10_location.add_item(
            _pipe,
            new None(),
            new $value_length.Undefined(),
          );
          let location = _block$2;
          _block$1 = $result.try$(
            location,
            (_use0) => {
              let item_index = _use0[0];
              let location$1 = _use0[1];
              let path = $data_set_path.add_sequence_item(
                context.path,
                item_index,
              );
              return $result.try$(
                path,
                (path) => {
                  return new Ok(
                    (() => {
                      let _record = context;
                      return new P10WriteContext(
                        _record.config,
                        _record.p10_bytes,
                        _record.p10_total_byte_count,
                        _record.is_ended,
                        _record.transfer_syntax,
                        _record.zlib_stream,
                        location$1,
                        path,
                      );
                    })(),
                  );
                },
              );
            },
          );
        } else if (token instanceof $p10_token.PixelDataItem) {
          let _block$2;
          let _pipe = context.location;
          _block$2 = $p10_location.add_item(
            _pipe,
            new None(),
            new $value_length.Undefined(),
          );
          let location = _block$2;
          _block$1 = $result.try$(
            location,
            (_use0) => {
              let item_index = _use0[0];
              let location$1 = _use0[1];
              let path = $data_set_path.add_sequence_item(
                context.path,
                item_index,
              );
              return $result.try$(
                path,
                (path) => {
                  return new Ok(
                    (() => {
                      let _record = context;
                      return new P10WriteContext(
                        _record.config,
                        _record.p10_bytes,
                        _record.p10_total_byte_count,
                        _record.is_ended,
                        _record.transfer_syntax,
                        _record.zlib_stream,
                        location$1,
                        path,
                      );
                    })(),
                  );
                },
              );
            },
          );
        } else {
          _block$1 = new Ok(context);
        }
        let _block;
        let _pipe = _block$1;
        _block = map_to_p10_token_stream_error(_pipe);
        let context$1 = _block;
        return $result.try$(
          context$1,
          (context) => {
            return $result.try$(
              token_to_bytes(token, context),
              (token_bytes) => {
                let _block$2;
                if (token instanceof $p10_token.DataElementValueBytes &&
                token.bytes_remaining === 0) {
                  let tag = token.tag;
                  let vr = token.vr;
                  let data = token.data;
                  let is_pixel_or_waveform_data = (isEqual(
                    tag,
                    $dictionary.bits_allocated.tag
                  )) || (isEqual(tag, $dictionary.waveform_bits_allocated.tag));
                  let _block$3;
                  if (is_pixel_or_waveform_data) {
                    let _pipe$1 = $p10_location.add_clarifying_data_element(
                      context.location,
                      tag,
                      vr,
                      data,
                    );
                    _block$3 = $result.map(_pipe$1, $pair.second);
                  } else {
                    _block$3 = new Ok(context.location);
                  }
                  let location = _block$3;
                  _block$2 = $result.try$(
                    location,
                    (location) => { let _block$4;
                      {
                        let _block$5;
                        let $ = isEqual(tag, $dictionary.item.tag);
                        if ($) {
                          _block$5 = $p10_location.end_item(location);
                        } else {
                          _block$5 = new Ok(location);
                        }
                        let location$1 = _block$5;
                        _block$4 = $result.try$(
                          location$1,
                          (location) => {
                            let path = $data_set_path.pop(context.path);
                            return $result.try$(
                              path,
                              (path) => {
                                return new Ok(
                                  (() => {
                                    let _record = context;
                                    return new P10WriteContext(
                                      _record.config,
                                      _record.p10_bytes,
                                      _record.p10_total_byte_count,
                                      _record.is_ended,
                                      _record.transfer_syntax,
                                      _record.zlib_stream,
                                      location,
                                      path,
                                    );
                                  })(),
                                );
                              },
                            );
                          },
                        );
                      }
                      let _pipe$1 = _block$4;
                      return map_to_p10_token_stream_error(_pipe$1); },
                  );
                } else if (token instanceof $p10_token.SequenceItemDelimiter) {
                  let _block$3;
                  {
                    let location = $p10_location.end_item(context.location);
                    _block$3 = $result.try$(
                      location,
                      (location) => {
                        let path = $data_set_path.pop(context.path);
                        return $result.try$(
                          path,
                          (path) => {
                            return new Ok(
                              (() => {
                                let _record = context;
                                return new P10WriteContext(
                                  _record.config,
                                  _record.p10_bytes,
                                  _record.p10_total_byte_count,
                                  _record.is_ended,
                                  _record.transfer_syntax,
                                  _record.zlib_stream,
                                  location,
                                  path,
                                );
                              })(),
                            );
                          },
                        );
                      },
                    );
                  }
                  let _pipe$1 = _block$3;
                  _block$2 = map_to_p10_token_stream_error(_pipe$1);
                } else if (token instanceof $p10_token.SequenceDelimiter) {
                  let _block$3;
                  {
                    let location = $p10_location.end_sequence(context.location);
                    _block$3 = $result.try$(
                      location,
                      (_use0) => {
                        let location$1 = _use0[1];
                        let path = $data_set_path.pop(context.path);
                        return $result.try$(
                          path,
                          (path) => {
                            return new Ok(
                              (() => {
                                let _record = context;
                                return new P10WriteContext(
                                  _record.config,
                                  _record.p10_bytes,
                                  _record.p10_total_byte_count,
                                  _record.is_ended,
                                  _record.transfer_syntax,
                                  _record.zlib_stream,
                                  location$1,
                                  path,
                                );
                              })(),
                            );
                          },
                        );
                      },
                    );
                  }
                  let _pipe$1 = _block$3;
                  _block$2 = map_to_p10_token_stream_error(_pipe$1);
                } else {
                  _block$2 = new Ok(context);
                }
                let context$1 = _block$2;
                return $result.map(
                  context$1,
                  (context) => {
                    let $ = context.zlib_stream;
                    if ($ instanceof Some) {
                      let zlib_stream = $[0];
                      let _block$3;
                      let _pipe$1 = zlib_stream;
                      let _pipe$2 = $zlib.deflate(
                        _pipe$1,
                        token_bytes,
                        new $flush_command.None(),
                      );
                      _block$3 = $bit_array.concat(_pipe$2);
                      let data = _block$3;
                      let _record = context;
                      return new P10WriteContext(
                        _record.config,
                        listPrepend(data, context.p10_bytes),
                        context.p10_total_byte_count + $bit_array.byte_size(
                          data,
                        ),
                        _record.is_ended,
                        _record.transfer_syntax,
                        _record.zlib_stream,
                        _record.location,
                        _record.path,
                      );
                    } else {
                      let _record = context;
                      return new P10WriteContext(
                        _record.config,
                        listPrepend(token_bytes, context.p10_bytes),
                        context.p10_total_byte_count + $bit_array.byte_size(
                          token_bytes,
                        ),
                        _record.is_ended,
                        _record.transfer_syntax,
                        _record.zlib_stream,
                        _record.location,
                        _record.path,
                      );
                    }
                  },
                );
              },
            );
          },
        );
      }
    },
  );
}

export function data_set_to_bytes(data_set, context, bytes_callback, config) {
  let _block;
  let _pipe = new_write_context();
  _block = with_config(_pipe, config);
  let write_context = _block;
  let process_token = (context, token) => {
    let context$1 = context[0];
    let write_context$1 = context[1];
    return $result.try$(
      write_token(write_context$1, token),
      (write_context) => {
        let $ = read_bytes(write_context);
        let bytes = $[0];
        let write_context$1 = $[1];
        return $result.map(
          $list.try_fold(bytes, context$1, bytes_callback),
          (context) => { return [context, write_context$1]; },
        );
      },
    );
  };
  let _pipe$1 = data_set_to_tokens(
    data_set,
    [context, write_context],
    process_token,
  );
  return $result.map(_pipe$1, (x) => { return x[0]; });
}

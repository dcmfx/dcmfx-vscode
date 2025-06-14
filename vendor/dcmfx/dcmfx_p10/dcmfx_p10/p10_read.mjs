/// <reference types="./p10_read.d.mts" />
import * as $dcmfx_character_set from "../../dcmfx_character_set/dcmfx_character_set.mjs";
import * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import { DataElementTag } from "../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
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
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $byte_stream from "../dcmfx_p10/internal/byte_stream.mjs";
import * as $data_element_header from "../dcmfx_p10/internal/data_element_header.mjs";
import { DataElementHeader } from "../dcmfx_p10/internal/data_element_header.mjs";
import * as $p10_location from "../dcmfx_p10/internal/p10_location.mjs";
import * as $value_length from "../dcmfx_p10/internal/value_length.mjs";
import * as $p10_error from "../dcmfx_p10/p10_error.mjs";
import * as $p10_token from "../dcmfx_p10/p10_token.mjs";
import {
  Ok,
  Error,
  toList,
  CustomType as $CustomType,
  makeError,
  divideInt,
  isEqual,
  toBitArray,
  bitArraySlice,
  bitArraySliceToInt,
  sizedInt,
} from "../gleam.mjs";

const FILEPATH = "src/dcmfx_p10/p10_read.gleam";

export class P10ReadConfig extends $CustomType {
  constructor(max_token_size, max_string_size, max_sequence_depth, require_ordered_data_elements) {
    super();
    this.max_token_size = max_token_size;
    this.max_string_size = max_string_size;
    this.max_sequence_depth = max_sequence_depth;
    this.require_ordered_data_elements = require_ordered_data_elements;
  }
}

class P10ReadContext extends $CustomType {
  constructor(config, stream, next_action, transfer_syntax, path, location) {
    super();
    this.config = config;
    this.stream = stream;
    this.next_action = next_action;
    this.transfer_syntax = transfer_syntax;
    this.path = path;
    this.location = location;
  }
}

class ReadFilePreambleAndDICMPrefix extends $CustomType {}

class ReadFileMetaInformation extends $CustomType {
  constructor(starts_at) {
    super();
    this.starts_at = starts_at;
  }
}

class ReadDataElementHeader extends $CustomType {}

class ReadDataElementValueBytes extends $CustomType {
  constructor(tag, vr, length, bytes_remaining, emit_tokens) {
    super();
    this.tag = tag;
    this.vr = vr;
    this.length = length;
    this.bytes_remaining = bytes_remaining;
    this.emit_tokens = emit_tokens;
  }
}

class ReadPixelDataItem extends $CustomType {
  constructor(vr) {
    super();
    this.vr = vr;
  }
}

export function default_config() {
  return new P10ReadConfig(0xFFFFFFFE, 0xFFFFFFFE, 10_000, true);
}

export function with_config(context, config) {
  let max_token_size = (divideInt(config.max_token_size, 8)) * 8;
  let max_string_size = $int.max(config.max_string_size, max_token_size);
  let max_sequence_depth = $int.max(0, config.max_sequence_depth);
  let max_read_size = $int.max(config.max_string_size, config.max_token_size);
  let _block;
  let _record = config;
  _block = new P10ReadConfig(
    max_token_size,
    max_string_size,
    max_sequence_depth,
    _record.require_ordered_data_elements,
  );
  let config$1 = _block;
  let _record$1 = context;
  return new P10ReadContext(
    config$1,
    $byte_stream.new$(max_read_size),
    _record$1.next_action,
    _record$1.transfer_syntax,
    _record$1.path,
    _record$1.location,
  );
}

export function set_fallback_transfer_syntax(context, transfer_syntax) {
  let _record = context;
  return new P10ReadContext(
    _record.config,
    _record.stream,
    _record.next_action,
    transfer_syntax,
    _record.path,
    _record.location,
  );
}

export function transfer_syntax(context) {
  return context.transfer_syntax;
}

export function new_read_context() {
  return new P10ReadContext(
    default_config(),
    $byte_stream.new$(0xFFFFFFFE),
    new ReadFilePreambleAndDICMPrefix(),
    $transfer_syntax.implicit_vr_little_endian,
    $data_set_path.new$(),
    $p10_location.new$(),
  );
}

function next_delimiter_token(context) {
  let bytes_read = $byte_stream.bytes_read(context.stream);
  let $ = $p10_location.next_delimiter_token(context.location, bytes_read);
  if ($ instanceof Ok) {
    let token = $[0][0];
    let new_location = $[0][1];
    let _block;
    if (token instanceof $p10_token.SequenceDelimiter) {
      let $1 = $data_set_path.pop(context.path);
      if (!($1 instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_p10/p10_read",
          341,
          "next_delimiter_token",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $1,
            start: 12167,
            end: 12220,
            pattern_start: 12178,
            pattern_end: 12186
          }
        )
      }
      let path = $1[0];
      _block = path;
    } else if (token instanceof $p10_token.SequenceItemDelimiter) {
      let $1 = $data_set_path.pop(context.path);
      if (!($1 instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_p10/p10_read",
          341,
          "next_delimiter_token",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $1,
            start: 12167,
            end: 12220,
            pattern_start: 12178,
            pattern_end: 12186
          }
        )
      }
      let path = $1[0];
      _block = path;
    } else {
      _block = context.path;
    }
    let new_path = _block;
    let _block$1;
    let _record = context;
    _block$1 = new P10ReadContext(
      _record.config,
      _record.stream,
      _record.next_action,
      _record.transfer_syntax,
      new_path,
      new_location,
    );
    let new_context = _block$1;
    return [toList([token]), new_context];
  } else {
    return [toList([]), context];
  }
}

function check_data_element_ordering(context, header) {
  let _block;
  let $ = context.config.require_ordered_data_elements;
  if ($) {
    let _pipe = $p10_location.check_data_element_ordering(
      context.location,
      header.tag,
    );
    _block = $result.map_error(
      _pipe,
      (_) => {
        return new $p10_error.DataInvalid(
          "Reading data element header",
          ("Data element '" + $data_element_header.to_string(header)) + "' is not in ascending order",
          context.path,
          $byte_stream.bytes_read(context.stream),
        );
      },
    );
  } else {
    _block = new Ok(context.location);
  }
  let new_location = _block;
  return $result.map(
    new_location,
    (new_location) => {
      let _record = context;
      return new P10ReadContext(
        _record.config,
        _record.stream,
        _record.next_action,
        _record.transfer_syntax,
        _record.path,
        new_location,
      );
    },
  );
}

function active_transfer_syntax(context) {
  let $ = $p10_location.is_implicit_vr_forced(context.location);
  if ($) {
    return $transfer_syntax.implicit_vr_little_endian;
  } else {
    return context.transfer_syntax;
  }
}

function is_materialized_value_required(context, tag, vr) {
  return $bool.guard(
    $p10_location.is_clarifying_data_element(tag),
    true,
    () => {
      return $bool.guard(
        $value_representation.is_encoded_string(vr),
        !$p10_location.is_specific_character_set_utf8_compatible(
          context.location,
        ),
        () => {
          return $bool.guard(
            $value_representation.is_string(vr),
            true,
            () => { return false; },
          );
        },
      );
    },
  );
}

function process_materialized_data_element(context, tag, vr, value_bytes) {
  let _block;
  let $ = $value_representation.is_string(vr);
  if ($) {
    let $1 = $value_representation.is_encoded_string(vr) && !$data_element_tag.is_private_creator(
      tag,
    );
    if ($1) {
      _block = $p10_location.decode_string_bytes(
        context.location,
        vr,
        value_bytes,
      );
    } else {
      _block = $dcmfx_character_set.sanitize_default_charset_bytes(value_bytes);
    }
  } else {
    _block = value_bytes;
  }
  let value_bytes$1 = _block;
  return $p10_location.add_clarifying_data_element(
    context.location,
    tag,
    vr,
    value_bytes$1,
  );
}

function map_byte_stream_error(context, error, when) {
  let offset = $byte_stream.bytes_read(context.stream);
  if (error instanceof $byte_stream.ReadOversized) {
    return new $p10_error.OtherError(
      "Maximum read size exceeded",
      "Internal logic error",
    );
  } else if (error instanceof $byte_stream.DataRequired) {
    return new $p10_error.DataRequired(when);
  } else if (error instanceof $byte_stream.DataEnd) {
    return new $p10_error.DataEndedUnexpectedly(when, context.path, offset);
  } else if (error instanceof $byte_stream.ZlibDataError) {
    return new $p10_error.DataInvalid(
      when,
      "Zlib data is invalid",
      context.path,
      offset,
    );
  } else {
    return new $p10_error.WriteAfterCompletion();
  }
}

export function write_bytes(context, bytes, done) {
  let $ = $byte_stream.write(context.stream, bytes, done);
  if ($ instanceof Ok) {
    let stream = $[0];
    return new Ok(
      (() => {
        let _record = context;
        return new P10ReadContext(
          _record.config,
          stream,
          _record.next_action,
          _record.transfer_syntax,
          _record.path,
          _record.location,
        );
      })(),
    );
  } else {
    let e = $[0];
    return new Error(
      map_byte_stream_error(
        context,
        e,
        "Writing data to DICOM P10 read context",
      ),
    );
  }
}

function read_file_preamble_and_dicm_prefix_token(context) {
  let _block;
  let $ = $byte_stream.peek(context.stream, 132);
  if ($ instanceof Ok) {
    let data = $[0];
    if (data.bitSize >= 1024) {
      if (data.bitSize === 1056) {
        if (data.byteAt(128) === 68 &&
          data.byteAt(129) === 73 &&
          data.byteAt(130) === 67 &&
          data.byteAt(131) === 77) {
          let preamble = bitArraySlice(data, 0, 1024);
          let $1 = $byte_stream.read(context.stream, 132);
          if (!($1 instanceof Ok)) {
            throw makeError(
              "let_assert",
              FILEPATH,
              "dcmfx_p10/p10_read",
              369,
              "read_file_preamble_and_dicm_prefix_token",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $1,
                start: 13039,
                end: 13104,
                pattern_start: 13050,
                pattern_end: 13064
              }
            )
          }
          let new_stream = $1[0];
          _block = new Ok([preamble, new_stream[1]]);
        } else {
          _block = new Ok(
            [toBitArray([sizedInt(0, 1024, true)]), context.stream],
          );
        }
      } else {
        _block = new Ok([toBitArray([sizedInt(0, 1024, true)]), context.stream]);
      }
    } else {
      _block = new Ok([toBitArray([sizedInt(0, 1024, true)]), context.stream]);
    }
  } else {
    let $1 = $[0];
    if ($1 instanceof $byte_stream.DataEnd) {
      _block = new Ok([toBitArray([sizedInt(0, 1024, true)]), context.stream]);
    } else {
      let e = $1;
      _block = new Error(
        map_byte_stream_error(context, e, "Reading file header"),
      );
    }
  }
  let preamble_and_stream = _block;
  return $result.try$(
    preamble_and_stream,
    (_use0) => {
      let preamble = _use0[0];
      let new_stream = _use0[1];
      let token = new $p10_token.FilePreambleAndDICMPrefix(preamble);
      let _block$1;
      let _record = context;
      _block$1 = new P10ReadContext(
        _record.config,
        new_stream,
        new ReadFileMetaInformation($byte_stream.bytes_read(new_stream)),
        _record.transfer_syntax,
        _record.path,
        _record.location,
      );
      let new_context = _block$1;
      return new Ok([toList([token]), new_context]);
    },
  );
}

function read_file_meta_information_data_set(
  context,
  starts_at,
  ends_at,
  fmi_data_set
) {
  let _block;
  if (ends_at instanceof Some) {
    let ends_at$1 = ends_at[0];
    _block = $byte_stream.bytes_read(context.stream) >= ends_at$1;
  } else {
    _block = false;
  }
  let is_ended = _block;
  return $bool.guard(
    is_ended,
    new Ok([fmi_data_set, context]),
    () => {
      let _block$1;
      let _pipe = $byte_stream.peek(context.stream, 8);
      _block$1 = $result.map_error(
        _pipe,
        (e) => {
          return map_byte_stream_error(
            context,
            e,
            "Reading File Meta Information",
          );
        },
      );
      let data = _block$1;
      return $result.try$(
        data,
        (data) => {
          if (data.bitSize < 48 || (data.bitSize - 48) % 8 !== 0) {
            throw makeError(
              "let_assert",
              FILEPATH,
              "dcmfx_p10/p10_read",
              484,
              "read_file_meta_information_data_set",
              "Pattern match failed, no pattern matched the value.",
              {
                value: data,
                start: 16703,
                end: 16833,
                pattern_start: 16714,
                pattern_end: 16826
              }
            )
          }
          let group = bitArraySliceToInt(data, 0, 16, false, false);
          let element = bitArraySliceToInt(data, 16, 32, false, false);
          let vr_byte_0 = data.byteAt(4);
          let vr_byte_1 = data.byteAt(5);
          let tag = new DataElementTag(group, element);
          return $bool.guard(
            (tag.group !== 0x2) && (isEqual(ends_at, new None())),
            new Ok([fmi_data_set, context]),
            () => {
              return $bool.lazy_guard(
                (tag.group !== 0x2) && (!isEqual(ends_at, new None())),
                () => {
                  return new Error(
                    new $p10_error.DataInvalid(
                      "Reading File Meta Information",
                      "Data element in File Meta Information does not have the group " + "0x0002",
                      $data_set_path.new_with_data_element(tag),
                      $byte_stream.bytes_read(context.stream),
                    ),
                  );
                },
                () => {
                  let _block$2;
                  let _pipe$1 = toBitArray([vr_byte_0, vr_byte_1]);
                  let _pipe$2 = $value_representation.from_bytes(_pipe$1);
                  _block$2 = $result.map_error(
                    _pipe$2,
                    (_) => {
                      return new $p10_error.DataInvalid(
                        "Reading File Meta Information",
                        "Data element has invalid VR",
                        $data_set_path.new_with_data_element(tag),
                        $byte_stream.bytes_read(context.stream),
                      );
                    },
                  );
                  let vr = _block$2;
                  return $result.try$(
                    vr,
                    (vr) => {
                      return $bool.lazy_guard(
                        isEqual(vr, new $value_representation.Sequence()),
                        () => {
                          return new Error(
                            new $p10_error.DataInvalid(
                              "Reading File Meta Information",
                              "Data element in File Meta Information is a sequence",
                              $data_set_path.new_with_data_element(tag),
                              $byte_stream.bytes_read(context.stream),
                            ),
                          );
                        },
                        () => {
                          let _block$3;
                          let $ = $data_element_header.value_length_size(vr);
                          if ($ instanceof $data_element_header.ValueLengthU16) {
                            if (data.bitSize !== 64) {
                              throw makeError(
                                "let_assert",
                                FILEPATH,
                                "dcmfx_p10/p10_read",
                                542,
                                "read_file_meta_information_data_set",
                                "Pattern match failed, no pattern matched the value.",
                                {
                                  value: data,
                                  start: 18771,
                                  end: 18824,
                                  pattern_start: 18782,
                                  pattern_end: 18817
                                }
                              )
                            }
                            let length = bitArraySliceToInt(data, 48, 64, false, false);
                            _block$3 = new Ok([8, length]);
                          } else {
                            let $1 = $byte_stream.peek(context.stream, 12);
                            if ($1 instanceof Ok) {
                              let data$1 = $1[0];
                              if (data$1.bitSize !== 96) {
                                throw makeError(
                                  "let_assert",
                                  FILEPATH,
                                  "dcmfx_p10/p10_read",
                                  550,
                                  "read_file_meta_information_data_set",
                                  "Pattern match failed, no pattern matched the value.",
                                  {
                                    value: data$1,
                                    start: 19036,
                                    end: 19089,
                                    pattern_start: 19047,
                                    pattern_end: 19082
                                  }
                                )
                              }
                              let length = bitArraySliceToInt(data$1, 64, 96, false, false);
                              _block$3 = new Ok([12, length]);
                            } else {
                              let e = $1[0];
                              _block$3 = new Error(
                                map_byte_stream_error(
                                  context,
                                  e,
                                  "Reading File Meta Information",
                                ),
                              );
                            }
                          }
                          let value_result = _block$3;
                          return $result.try$(
                            value_result,
                            (_use0) => {
                              let value_offset = _use0[0];
                              let value_length = _use0[1];
                              let data_element_size = value_offset + value_length;
                              return $bool.lazy_guard(
                                ($data_set.total_byte_size(fmi_data_set) + data_element_size) > context.config.max_token_size,
                                () => {
                                  return new Error(
                                    new $p10_error.MaximumExceeded(
                                      ("File Meta Information exceeds the max token size of " + $int.to_string(
                                        context.config.max_token_size,
                                      )) + " bytes",
                                      $data_set_path.new_with_data_element(tag),
                                      $byte_stream.bytes_read(context.stream),
                                    ),
                                  );
                                },
                                () => {
                                  let _block$4;
                                  let _pipe$3 = context.stream;
                                  let _pipe$4 = $byte_stream.read(
                                    _pipe$3,
                                    data_element_size,
                                  );
                                  _block$4 = $result.map_error(
                                    _pipe$4,
                                    (e) => {
                                      return map_byte_stream_error(
                                        context,
                                        e,
                                        "Reading File Meta Information data element value",
                                      );
                                    },
                                  );
                                  let read_result = _block$4;
                                  return $result.try$(
                                    read_result,
                                    (_use0) => {
                                      let data$1 = _use0[0];
                                      let new_stream = _use0[1];
                                      let $1 = $bit_array.slice(
                                        data$1,
                                        value_offset,
                                        value_length,
                                      );
                                      if (!($1 instanceof Ok)) {
                                        throw makeError(
                                          "let_assert",
                                          FILEPATH,
                                          "dcmfx_p10/p10_read",
                                          594,
                                          "read_file_meta_information_data_set",
                                          "Pattern match failed, no pattern matched the value.",
                                          {
                                            value: $1,
                                            start: 20339,
                                            end: 20417,
                                            pattern_start: 20350,
                                            pattern_end: 20365
                                          }
                                        )
                                      }
                                      let value_bytes = $1[0];
                                      let value = $data_element_value.new_binary_unchecked(
                                        vr,
                                        value_bytes,
                                      );
                                      let _block$5;
                                      let $2 = isEqual(
                                        tag,
                                        $dictionary.file_meta_information_group_length.tag
                                      );
                                      if ($2) {
                                        let $3 = $data_set.is_empty(
                                          fmi_data_set,
                                        );
                                        if ($3) {
                                          if (ends_at instanceof None) {
                                            let $4 = $data_element_value.get_int(
                                              value,
                                            );
                                            if ($4 instanceof Ok) {
                                              let i = $4[0];
                                              if (i >= 0) {
                                                _block$5 = new Ok(
                                                  new Some((starts_at + 12) + i),
                                                );
                                              } else {
                                                let i$1 = $4[0];
                                                _block$5 = new Error(
                                                  new $p10_error.DataInvalid(
                                                    "Reading File Meta Information",
                                                    "Group length is invalid: " + $int.to_string(
                                                      i$1,
                                                    ),
                                                    $data_set_path.new_with_data_element(
                                                      tag,
                                                    ),
                                                    $byte_stream.bytes_read(
                                                      context.stream,
                                                    ),
                                                  ),
                                                );
                                              }
                                            } else {
                                              let e = $4[0];
                                              _block$5 = new Error(
                                                new $p10_error.DataInvalid(
                                                  "Reading File Meta Information",
                                                  "Group length is invalid: " + $data_error.to_string(
                                                    e,
                                                  ),
                                                  $data_set_path.new_with_data_element(
                                                    tag,
                                                  ),
                                                  $byte_stream.bytes_read(
                                                    context.stream,
                                                  ),
                                                ),
                                              );
                                            }
                                          } else {
                                            _block$5 = new Ok(ends_at);
                                          }
                                        } else {
                                          _block$5 = new Ok(ends_at);
                                        }
                                      } else {
                                        _block$5 = new Ok(ends_at);
                                      }
                                      let ends_at$1 = _block$5;
                                      return $result.try$(
                                        ends_at$1,
                                        (ends_at) => {
                                          let _block$6;
                                          let $3 = isEqual(
                                            tag,
                                            $dictionary.transfer_syntax_uid.tag
                                          );
                                          if ($3) {
                                            let $4 = $data_element_value.get_string(
                                              value,
                                            );
                                            if ($4 instanceof Ok) {
                                              let uid = $4[0];
                                              let _pipe$5 = uid;
                                              let _pipe$6 = $transfer_syntax.from_uid(
                                                _pipe$5,
                                              );
                                              _block$6 = $result.map_error(
                                                _pipe$6,
                                                (_) => {
                                                  return new $p10_error.TransferSyntaxNotSupported(
                                                    uid,
                                                  );
                                                },
                                              );
                                            } else {
                                              let e = $4[0];
                                              if (e instanceof $data_error.TagNotPresent) {
                                                _block$6 = new Ok(
                                                  context.transfer_syntax,
                                                );
                                              } else {
                                                _block$6 = new Error(
                                                  new $p10_error.DataInvalid(
                                                    "Reading File Meta Information",
                                                    $data_error.to_string(e),
                                                    $data_set_path.new_with_data_element(
                                                      $dictionary.transfer_syntax_uid.tag,
                                                    ),
                                                    $byte_stream.bytes_read(
                                                      context.stream,
                                                    ),
                                                  ),
                                                );
                                              }
                                            }
                                          } else {
                                            _block$6 = new Ok(
                                              context.transfer_syntax,
                                            );
                                          }
                                          let transfer_syntax$1 = _block$6;
                                          return $result.try$(
                                            transfer_syntax$1,
                                            (transfer_syntax) => {
                                              let _block$7;
                                              let $4 = isEqual(
                                                tag,
                                                $dictionary.file_meta_information_group_length.tag
                                              );
                                              if ($4) {
                                                _block$7 = fmi_data_set;
                                              } else {
                                                _block$7 = $data_set.insert(
                                                  fmi_data_set,
                                                  tag,
                                                  value,
                                                );
                                              }
                                              let fmi_data_set$1 = _block$7;
                                              let _block$8;
                                              let _record = context;
                                              _block$8 = new P10ReadContext(
                                                _record.config,
                                                new_stream,
                                                _record.next_action,
                                                transfer_syntax,
                                                _record.path,
                                                _record.location,
                                              );
                                              let new_context = _block$8;
                                              return read_file_meta_information_data_set(
                                                new_context,
                                                starts_at,
                                                ends_at,
                                                fmi_data_set$1,
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

function read_file_meta_information_token(context, starts_at) {
  return $result.try$(
    read_file_meta_information_data_set(
      context,
      starts_at,
      new None(),
      $data_set.new$(),
    ),
    (_use0) => {
      let fmi_data_set = _use0[0];
      let new_context = _use0[1];
      let _block;
      let $ = new_context.transfer_syntax.is_deflated;
      if ($) {
        let $1 = $byte_stream.start_zlib_inflate(new_context.stream);
        if ($1 instanceof Ok) {
          let stream = $1[0];
          _block = new Ok(stream);
        } else {
          _block = new Error(
            new $p10_error.DataInvalid(
              "Starting zlib decompression for deflated transfer syntax",
              "Zlib data is invalid",
              $data_set_path.new$(),
              $byte_stream.bytes_read(context.stream),
            ),
          );
        }
      } else {
        _block = new Ok(new_context.stream);
      }
      let new_stream = _block;
      return $result.map(
        new_stream,
        (new_stream) => {
          let _block$1;
          let $1 = isEqual(
            new_context.transfer_syntax,
            $transfer_syntax.implicit_vr_little_endian
          );
          if ($1) {
            _block$1 = fmi_data_set;
          } else {
            let $2 = $data_set.insert_string_value(
              fmi_data_set,
              $dictionary.transfer_syntax_uid,
              toList([new_context.transfer_syntax.uid]),
            );
            if (!($2 instanceof Ok)) {
              throw makeError(
                "let_assert",
                FILEPATH,
                "dcmfx_p10/p10_read",
                441,
                "read_file_meta_information_token",
                "Pattern match failed, no pattern matched the value.",
                {
                  value: $2,
                  start: 15525,
                  end: 15713,
                  pattern_start: 15536,
                  pattern_end: 15552
                }
              )
            }
            let fmi_data_set$1 = $2[0];
            _block$1 = fmi_data_set$1;
          }
          let fmi_data_set$1 = _block$1;
          let _block$2;
          let _record = new_context;
          _block$2 = new P10ReadContext(
            _record.config,
            new_stream,
            new ReadDataElementHeader(),
            _record.transfer_syntax,
            _record.path,
            _record.location,
          );
          let new_context$1 = _block$2;
          return [fmi_data_set$1, new_context$1];
        },
      );
    },
  );
}

function read_implicit_vr_and_length(context, tag) {
  let $ = $byte_stream.read(context.stream, 8);
  if ($ instanceof Ok) {
    let data = $[0][0];
    let new_stream = $[0][1];
    let _block;
    let $1 = active_transfer_syntax(context).endianness;
    if ($1 instanceof $transfer_syntax.LittleEndian) {
      if (data.bitSize !== 64) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_p10/p10_read",
          1126,
          "read_implicit_vr_and_length",
          "Pattern match failed, no pattern matched the value.",
          {
            value: data,
            start: 38288,
            end: 38352,
            pattern_start: 38299,
            pattern_end: 38345
          }
        )
      }
      let value_length = bitArraySliceToInt(data, 32, 64, false, false);
      _block = value_length;
    } else {
      if (data.bitSize !== 64) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_p10/p10_read",
          1130,
          "read_implicit_vr_and_length",
          "Pattern match failed, no pattern matched the value.",
          {
            value: data,
            start: 38435,
            end: 38496,
            pattern_start: 38446,
            pattern_end: 38489
          }
        )
      }
      let value_length = bitArraySliceToInt(data, 32, 64, true, false);
      _block = value_length;
    }
    let value_length = _block;
    let _block$1;
    let $2 = ((isEqual(tag, $dictionary.item.tag)) || (isEqual(
      tag,
      $dictionary.item_delimitation_item.tag
    ))) || (isEqual(tag, $dictionary.sequence_delimitation_item.tag));
    if ($2) {
      _block$1 = new None();
    } else {
      _block$1 = new Some(new $value_representation.Unknown());
    }
    let vr = _block$1;
    let header = new DataElementHeader(
      tag,
      vr,
      $value_length.new$(value_length),
    );
    return new Ok([header, new_stream]);
  } else {
    let e = $[0];
    return new Error(
      map_byte_stream_error(context, e, "Reading data element header"),
    );
  }
}

function read_explicit_vr_and_length(context, tag) {
  let _block;
  let $ = $byte_stream.peek(context.stream, 6);
  if ($ instanceof Ok) {
    let data = $[0];
    if (data.bitSize !== 48) {
      throw makeError(
        "let_assert",
        FILEPATH,
        "dcmfx_p10/p10_read",
        1167,
        "read_explicit_vr_and_length",
        "Pattern match failed, no pattern matched the value.",
        {
          value: data,
          start: 39598,
          end: 39647,
          pattern_start: 39609,
          pattern_end: 39640
        }
      )
    }
    let vr_bytes = bitArraySlice(data, 32, 48);
    let $1 = $value_representation.from_bytes(vr_bytes);
    if ($1 instanceof Ok) {
      let vr = $1[0];
      _block = new Ok(vr);
    } else {
      if (vr_bytes.bitSize >= 8) {
        if (vr_bytes.byteAt(0) === 32) {
          if (vr_bytes.bitSize === 16) {
            if (vr_bytes.byteAt(1) === 32) {
              _block = new Ok(new $value_representation.Unknown());
            } else {
              _block = new Error(
                new $p10_error.DataInvalid(
                  "Reading data element VR",
                  ((("Unrecognized VR " + $bit_array.inspect(vr_bytes)) + " for tag '") + $dictionary.tag_with_name(
                    tag,
                    new None(),
                  )) + "'",
                  context.path,
                  $byte_stream.bytes_read(context.stream),
                ),
              );
            }
          } else {
            _block = new Error(
              new $p10_error.DataInvalid(
                "Reading data element VR",
                ((("Unrecognized VR " + $bit_array.inspect(vr_bytes)) + " for tag '") + $dictionary.tag_with_name(
                  tag,
                  new None(),
                )) + "'",
                context.path,
                $byte_stream.bytes_read(context.stream),
              ),
            );
          }
        } else {
          _block = new Error(
            new $p10_error.DataInvalid(
              "Reading data element VR",
              ((("Unrecognized VR " + $bit_array.inspect(vr_bytes)) + " for tag '") + $dictionary.tag_with_name(
                tag,
                new None(),
              )) + "'",
              context.path,
              $byte_stream.bytes_read(context.stream),
            ),
          );
        }
      } else {
        _block = new Error(
          new $p10_error.DataInvalid(
            "Reading data element VR",
            ((("Unrecognized VR " + $bit_array.inspect(vr_bytes)) + " for tag '") + $dictionary.tag_with_name(
              tag,
              new None(),
            )) + "'",
            context.path,
            $byte_stream.bytes_read(context.stream),
          ),
        );
      }
    }
  } else {
    let e = $[0];
    _block = new Error(
      map_byte_stream_error(
        context,
        e,
        "Reading explicit VR data element header",
      ),
    );
  }
  let vr = _block;
  return $result.try$(
    vr,
    (vr) => {
      let _block$1;
      let $1 = $data_element_header.value_length_size(vr);
      if ($1 instanceof $data_element_header.ValueLengthU16) {
        _block$1 = 8;
      } else {
        _block$1 = 12;
      }
      let header_size = _block$1;
      let $2 = $byte_stream.read(context.stream, header_size);
      if ($2 instanceof Ok) {
        let data = $2[0][0];
        let new_stream = $2[0][1];
        let _block$2;
        if (header_size === 12) {
          let $3 = active_transfer_syntax(context).endianness;
          if ($3 instanceof $transfer_syntax.LittleEndian) {
            if (data.bitSize !== 96) {
              throw makeError(
                "let_assert",
                FILEPATH,
                "dcmfx_p10/p10_read",
                1218,
                "read_explicit_vr_and_length",
                "Pattern match failed, no pattern matched the value.",
                {
                  value: data,
                  start: 41325,
                  end: 41383,
                  pattern_start: 41336,
                  pattern_end: 41376
                }
              )
            }
            let length = bitArraySliceToInt(data, 64, 96, false, false);
            _block$2 = length;
          } else {
            if (data.bitSize !== 96) {
              throw makeError(
                "let_assert",
                FILEPATH,
                "dcmfx_p10/p10_read",
                1222,
                "read_explicit_vr_and_length",
                "Pattern match failed, no pattern matched the value.",
                {
                  value: data,
                  start: 41476,
                  end: 41531,
                  pattern_start: 41487,
                  pattern_end: 41524
                }
              )
            }
            let length = bitArraySliceToInt(data, 64, 96, true, false);
            _block$2 = length;
          }
        } else {
          let $3 = active_transfer_syntax(context).endianness;
          if ($3 instanceof $transfer_syntax.LittleEndian) {
            if (data.bitSize !== 64) {
              throw makeError(
                "let_assert",
                FILEPATH,
                "dcmfx_p10/p10_read",
                1229,
                "read_explicit_vr_and_length",
                "Pattern match failed, no pattern matched the value.",
                {
                  value: data,
                  start: 41712,
                  end: 41770,
                  pattern_start: 41723,
                  pattern_end: 41763
                }
              )
            }
            let length = bitArraySliceToInt(data, 48, 64, false, false);
            _block$2 = length;
          } else {
            if (data.bitSize !== 64) {
              throw makeError(
                "let_assert",
                FILEPATH,
                "dcmfx_p10/p10_read",
                1233,
                "read_explicit_vr_and_length",
                "Pattern match failed, no pattern matched the value.",
                {
                  value: data,
                  start: 41863,
                  end: 41918,
                  pattern_start: 41874,
                  pattern_end: 41911
                }
              )
            }
            let length = bitArraySliceToInt(data, 48, 64, true, false);
            _block$2 = length;
          }
        }
        let length = _block$2;
        let header = new DataElementHeader(
          tag,
          new Some(vr),
          $value_length.new$(length),
        );
        return new Ok([header, new_stream]);
      } else {
        let e = $2[0];
        return new Error(
          map_byte_stream_error(
            context,
            e,
            "Reading explicit VR data element header",
          ),
        );
      }
    },
  );
}

function read_data_element_header(context) {
  let transfer_syntax$1 = active_transfer_syntax(context);
  let _block;
  let $ = $byte_stream.peek(context.stream, 4);
  if ($ instanceof Ok) {
    let data = $[0];
    let _block$1;
    let $2 = transfer_syntax$1.endianness;
    if ($2 instanceof $transfer_syntax.LittleEndian) {
      if (data.bitSize !== 32) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_p10/p10_read",
          1015,
          "read_data_element_header",
          "Pattern match failed, no pattern matched the value.",
          {
            value: data,
            start: 34481,
            end: 34567,
            pattern_start: 34492,
            pattern_end: 34548
          }
        )
      }
      let group = bitArraySliceToInt(data, 0, 16, false, false);
      let element = bitArraySliceToInt(data, 16, 32, false, false);
      _block$1 = [group, element];
    } else {
      if (data.bitSize !== 32) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_p10/p10_read",
          1020,
          "read_data_element_header",
          "Pattern match failed, no pattern matched the value.",
          {
            value: data,
            start: 34655,
            end: 34723,
            pattern_start: 34666,
            pattern_end: 34716
          }
        )
      }
      let group = bitArraySliceToInt(data, 0, 16, true, false);
      let element = bitArraySliceToInt(data, 16, 32, true, false);
      _block$1 = [group, element];
    }
    let $1 = _block$1;
    let group = $1[0];
    let element = $1[1];
    _block = new Ok(new DataElementTag(group, element));
  } else {
    let e = $[0];
    _block = new Error(
      map_byte_stream_error(context, e, "Reading data element header"),
    );
  }
  let tag = _block;
  return $result.try$(
    tag,
    (tag) => {
      let _block$1;
      let $1 = ((isEqual(tag, $dictionary.item.tag)) || (isEqual(
        tag,
        $dictionary.item_delimitation_item.tag
      ))) || (isEqual(tag, $dictionary.sequence_delimitation_item.tag));
      if ($1) {
        _block$1 = new $transfer_syntax.VrImplicit();
      } else {
        _block$1 = transfer_syntax$1.vr_serialization;
      }
      let vr_serialization = _block$1;
      let _block$2;
      let $2 = tag.group;
      let $3 = $data_set_path.is_root(context.path);
      let $4 = context.next_action;
      if ($2 === 0x2) {
        if ($4 instanceof ReadFileMetaInformation) {
          _block$2 = false;
        } else if ($3) {
          _block$2 = true;
        } else {
          _block$2 = false;
        }
      } else {
        _block$2 = false;
      }
      let is_invalid_data_element = _block$2;
      return $bool.guard(
        is_invalid_data_element,
        new Error(
          new $p10_error.DataInvalid(
            "Reading data element header",
            ("File Meta Information data element '" + $data_element_tag.to_string(
              tag,
            )) + "' found in the main data set",
            context.path,
            $byte_stream.bytes_read(context.stream),
          ),
        ),
        () => {
          if (vr_serialization instanceof $transfer_syntax.VrImplicit) {
            return read_implicit_vr_and_length(context, tag);
          } else {
            return read_explicit_vr_and_length(context, tag);
          }
        },
      );
    },
  );
}

function read_data_element_header_token(context) {
  return $result.try$(
    read_data_element_header(context),
    (_use0) => {
      let header = _use0[0];
      let new_stream = _use0[1];
      let _block;
      let $ = header.vr;
      if ($ instanceof Some) {
        let $1 = $[0];
        if ($1 instanceof $value_representation.Unknown) {
          let _pipe = $p10_location.infer_vr_for_tag(
            context.location,
            header.tag,
          );
          let _pipe$1 = $result.map(_pipe, (var0) => { return new Some(var0); });
          _block = $result.map_error(
            _pipe$1,
            (missing_tag) => {
              return new $p10_error.DataInvalid(
                ("Inferring VR for data element '" + $dictionary.tag_with_name(
                  header.tag,
                  new None(),
                )) + "'",
                ("The value for the '" + $dictionary.tag_with_name(
                  missing_tag,
                  new None(),
                )) + "' data element is missing or invalid",
                context.path,
                $byte_stream.bytes_read(context.stream),
              );
            },
          );
        } else {
          let vr = $;
          _block = new Ok(vr);
        }
      } else {
        let vr = $;
        _block = new Ok(vr);
      }
      let vr = _block;
      return $result.try$(
        vr,
        (vr) => {
          let $1 = header.tag;
          let $2 = header.length;
          if (vr instanceof Some) {
            let $3 = vr[0];
            if ($3 instanceof $value_representation.OtherByteString) {
              if ($2 instanceof $value_length.Defined) {
                let tag = $1;
                let vr$1 = $3;
                let length = $2.length;
                return $result.try$(
                  check_data_element_ordering(context, header),
                  (context) => {
                    let materialized_value_required = is_materialized_value_required(
                      context,
                      header.tag,
                      vr$1,
                    );
                    let _block$1;
                    let $4 = materialized_value_required && (length > context.config.max_string_size);
                    if ($4) {
                      _block$1 = new Error(
                        new $p10_error.MaximumExceeded(
                          ((((((("Value for '" + $dictionary.tag_with_name(
                            header.tag,
                            new None(),
                          )) + "' with VR ") + $value_representation.to_string(
                            vr$1,
                          )) + " and length ") + $int.to_string(length)) + " bytes exceeds the maximum allowed string size of ") + $int.to_string(
                            context.config.max_string_size,
                          )) + " bytes",
                          context.path,
                          $byte_stream.bytes_read(context.stream),
                        ),
                      );
                    } else {
                      _block$1 = new Ok(undefined);
                    }
                    let max_size_check_result = _block$1;
                    return $result.try$(
                      max_size_check_result,
                      (_) => {
                        let _block$2;
                        let _pipe = $data_set_path.add_data_element(
                          context.path,
                          tag,
                        );
                        _block$2 = $result.map_error(
                          _pipe,
                          (_) => {
                            return new $p10_error.DataInvalid(
                              "Reading data element header",
                              ("Data element '" + $data_element_header.to_string(
                                header,
                              )) + "' is not valid for the current path",
                              context.path,
                              $byte_stream.bytes_read(context.stream),
                            );
                          },
                        );
                        let new_path = _block$2;
                        return $result.try$(
                          new_path,
                          (new_path) => {
                            let emit_tokens = (!isEqual(
                              header.tag,
                              $dictionary.data_set_trailing_padding.tag
                            )) && (header.tag.element !== 0x0);
                            let _block$3;
                            let $5 = emit_tokens && !materialized_value_required;
                            if ($5) {
                              _block$3 = toList([
                                new $p10_token.DataElementHeader(
                                  header.tag,
                                  vr$1,
                                  length,
                                  new_path,
                                ),
                              ]);
                            } else {
                              _block$3 = toList([]);
                            }
                            let tokens = _block$3;
                            let next_action = new ReadDataElementValueBytes(
                              header.tag,
                              vr$1,
                              length,
                              length,
                              emit_tokens,
                            );
                            let _block$4;
                            let _record = context;
                            _block$4 = new P10ReadContext(
                              _record.config,
                              new_stream,
                              next_action,
                              _record.transfer_syntax,
                              new_path,
                              _record.location,
                            );
                            let new_context = _block$4;
                            return new Ok([tokens, new_context]);
                          },
                        );
                      },
                    );
                  },
                );
              } else {
                let tag = $1;
                if (isEqual(tag, $dictionary.pixel_data.tag)) {
                  return $result.try$(
                    check_data_element_ordering(context, header),
                    (context) => {
                      let vr$1 = vr[0];
                      let _block$1;
                      let _pipe = $p10_location.add_sequence(
                        context.location,
                        tag,
                        false,
                        new None(),
                      );
                      _block$1 = $result.map_error(
                        _pipe,
                        (details) => {
                          return new $p10_error.DataInvalid(
                            "Reading data element header",
                            details,
                            context.path,
                            $byte_stream.bytes_read(context.stream),
                          );
                        },
                      );
                      let new_location = _block$1;
                      return $result.try$(
                        new_location,
                        (new_location) => {
                          let $4 = $data_set_path.add_data_element(
                            context.path,
                            tag,
                          );
                          if (!($4 instanceof Ok)) {
                            throw makeError(
                              "let_assert",
                              FILEPATH,
                              "dcmfx_p10/p10_read",
                              830,
                              "read_data_element_header_token",
                              "Pattern match failed, no pattern matched the value.",
                              {
                                value: $4,
                                start: 28276,
                                end: 28359,
                                pattern_start: 28287,
                                pattern_end: 28299
                              }
                            )
                          }
                          let new_path = $4[0];
                          let token = new $p10_token.SequenceStart(
                            tag,
                            vr$1,
                            new_path,
                          );
                          let _block$2;
                          let _record = context;
                          _block$2 = new P10ReadContext(
                            _record.config,
                            new_stream,
                            new ReadPixelDataItem(vr$1),
                            _record.transfer_syntax,
                            new_path,
                            new_location,
                          );
                          let new_context = _block$2;
                          return new Ok([toList([token]), new_context]);
                        },
                      );
                    },
                  );
                } else {
                  return new Error(
                    new $p10_error.DataInvalid(
                      "Reading data element header",
                      ("Invalid data element '" + $data_element_header.to_string(
                        header,
                      )) + "'",
                      context.path,
                      $byte_stream.bytes_read(context.stream),
                    ),
                  );
                }
              }
            } else if ($3 instanceof $value_representation.OtherWordString) {
              if ($2 instanceof $value_length.Defined) {
                let tag = $1;
                let vr$1 = $3;
                let length = $2.length;
                return $result.try$(
                  check_data_element_ordering(context, header),
                  (context) => {
                    let materialized_value_required = is_materialized_value_required(
                      context,
                      header.tag,
                      vr$1,
                    );
                    let _block$1;
                    let $4 = materialized_value_required && (length > context.config.max_string_size);
                    if ($4) {
                      _block$1 = new Error(
                        new $p10_error.MaximumExceeded(
                          ((((((("Value for '" + $dictionary.tag_with_name(
                            header.tag,
                            new None(),
                          )) + "' with VR ") + $value_representation.to_string(
                            vr$1,
                          )) + " and length ") + $int.to_string(length)) + " bytes exceeds the maximum allowed string size of ") + $int.to_string(
                            context.config.max_string_size,
                          )) + " bytes",
                          context.path,
                          $byte_stream.bytes_read(context.stream),
                        ),
                      );
                    } else {
                      _block$1 = new Ok(undefined);
                    }
                    let max_size_check_result = _block$1;
                    return $result.try$(
                      max_size_check_result,
                      (_) => {
                        let _block$2;
                        let _pipe = $data_set_path.add_data_element(
                          context.path,
                          tag,
                        );
                        _block$2 = $result.map_error(
                          _pipe,
                          (_) => {
                            return new $p10_error.DataInvalid(
                              "Reading data element header",
                              ("Data element '" + $data_element_header.to_string(
                                header,
                              )) + "' is not valid for the current path",
                              context.path,
                              $byte_stream.bytes_read(context.stream),
                            );
                          },
                        );
                        let new_path = _block$2;
                        return $result.try$(
                          new_path,
                          (new_path) => {
                            let emit_tokens = (!isEqual(
                              header.tag,
                              $dictionary.data_set_trailing_padding.tag
                            )) && (header.tag.element !== 0x0);
                            let _block$3;
                            let $5 = emit_tokens && !materialized_value_required;
                            if ($5) {
                              _block$3 = toList([
                                new $p10_token.DataElementHeader(
                                  header.tag,
                                  vr$1,
                                  length,
                                  new_path,
                                ),
                              ]);
                            } else {
                              _block$3 = toList([]);
                            }
                            let tokens = _block$3;
                            let next_action = new ReadDataElementValueBytes(
                              header.tag,
                              vr$1,
                              length,
                              length,
                              emit_tokens,
                            );
                            let _block$4;
                            let _record = context;
                            _block$4 = new P10ReadContext(
                              _record.config,
                              new_stream,
                              next_action,
                              _record.transfer_syntax,
                              new_path,
                              _record.location,
                            );
                            let new_context = _block$4;
                            return new Ok([tokens, new_context]);
                          },
                        );
                      },
                    );
                  },
                );
              } else {
                let tag = $1;
                if (isEqual(tag, $dictionary.pixel_data.tag)) {
                  return $result.try$(
                    check_data_element_ordering(context, header),
                    (context) => {
                      let vr$1 = vr[0];
                      let _block$1;
                      let _pipe = $p10_location.add_sequence(
                        context.location,
                        tag,
                        false,
                        new None(),
                      );
                      _block$1 = $result.map_error(
                        _pipe,
                        (details) => {
                          return new $p10_error.DataInvalid(
                            "Reading data element header",
                            details,
                            context.path,
                            $byte_stream.bytes_read(context.stream),
                          );
                        },
                      );
                      let new_location = _block$1;
                      return $result.try$(
                        new_location,
                        (new_location) => {
                          let $4 = $data_set_path.add_data_element(
                            context.path,
                            tag,
                          );
                          if (!($4 instanceof Ok)) {
                            throw makeError(
                              "let_assert",
                              FILEPATH,
                              "dcmfx_p10/p10_read",
                              830,
                              "read_data_element_header_token",
                              "Pattern match failed, no pattern matched the value.",
                              {
                                value: $4,
                                start: 28276,
                                end: 28359,
                                pattern_start: 28287,
                                pattern_end: 28299
                              }
                            )
                          }
                          let new_path = $4[0];
                          let token = new $p10_token.SequenceStart(
                            tag,
                            vr$1,
                            new_path,
                          );
                          let _block$2;
                          let _record = context;
                          _block$2 = new P10ReadContext(
                            _record.config,
                            new_stream,
                            new ReadPixelDataItem(vr$1),
                            _record.transfer_syntax,
                            new_path,
                            new_location,
                          );
                          let new_context = _block$2;
                          return new Ok([toList([token]), new_context]);
                        },
                      );
                    },
                  );
                } else {
                  return new Error(
                    new $p10_error.DataInvalid(
                      "Reading data element header",
                      ("Invalid data element '" + $data_element_header.to_string(
                        header,
                      )) + "'",
                      context.path,
                      $byte_stream.bytes_read(context.stream),
                    ),
                  );
                }
              }
            } else if ($3 instanceof $value_representation.Sequence) {
              let tag = $1;
              return $result.try$(
                check_data_element_ordering(context, header),
                (context) => {
                  let _block$1;
                  let $4 = header.length;
                  if ($4 instanceof $value_length.Defined) {
                    let length = $4.length;
                    _block$1 = new Some(
                      $byte_stream.bytes_read(new_stream) + length,
                    );
                  } else {
                    _block$1 = new None();
                  }
                  let ends_at = _block$1;
                  let is_implicit_vr = isEqual(
                    header.vr,
                    new Some(new $value_representation.Unknown())
                  );
                  let _block$2;
                  let _pipe = $p10_location.add_sequence(
                    context.location,
                    tag,
                    is_implicit_vr,
                    ends_at,
                  );
                  _block$2 = $result.map_error(
                    _pipe,
                    (details) => {
                      return new $p10_error.DataInvalid(
                        "Reading data element header",
                        details,
                        context.path,
                        $byte_stream.bytes_read(context.stream),
                      );
                    },
                  );
                  let new_location = _block$2;
                  return $result.try$(
                    new_location,
                    (new_location) => {
                      let _block$3;
                      let $5 = (divideInt(
                        $data_set_path.length(context.path),
                        2
                      )) < context.config.max_sequence_depth;
                      if ($5) {
                        _block$3 = new Ok(undefined);
                      } else {
                        _block$3 = new Error(
                          new $p10_error.MaximumExceeded(
                            "Maximum allowed sequence depth reached",
                            context.path,
                            $byte_stream.bytes_read(context.stream),
                          ),
                        );
                      }
                      let sequence_depth_check = _block$3;
                      return $result.try$(
                        sequence_depth_check,
                        (_) => {
                          let $6 = $data_set_path.add_data_element(
                            context.path,
                            tag,
                          );
                          if (!($6 instanceof Ok)) {
                            throw makeError(
                              "let_assert",
                              FILEPATH,
                              "dcmfx_p10/p10_read",
                              754,
                              "read_data_element_header_token",
                              "Pattern match failed, no pattern matched the value.",
                              {
                                value: $6,
                                start: 25930,
                                end: 26013,
                                pattern_start: 25941,
                                pattern_end: 25953
                              }
                            )
                          }
                          let new_path = $6[0];
                          let token = new $p10_token.SequenceStart(
                            tag,
                            new $value_representation.Sequence(),
                            new_path,
                          );
                          let _block$4;
                          let _record = context;
                          _block$4 = new P10ReadContext(
                            _record.config,
                            new_stream,
                            _record.next_action,
                            _record.transfer_syntax,
                            new_path,
                            new_location,
                          );
                          let new_context = _block$4;
                          return new Ok([toList([token]), new_context]);
                        },
                      );
                    },
                  );
                },
              );
            } else if ($3 instanceof $value_representation.Unknown) {
              if ($2 instanceof $value_length.Defined) {
                let tag = $1;
                let vr$1 = $3;
                let length = $2.length;
                return $result.try$(
                  check_data_element_ordering(context, header),
                  (context) => {
                    let materialized_value_required = is_materialized_value_required(
                      context,
                      header.tag,
                      vr$1,
                    );
                    let _block$1;
                    let $4 = materialized_value_required && (length > context.config.max_string_size);
                    if ($4) {
                      _block$1 = new Error(
                        new $p10_error.MaximumExceeded(
                          ((((((("Value for '" + $dictionary.tag_with_name(
                            header.tag,
                            new None(),
                          )) + "' with VR ") + $value_representation.to_string(
                            vr$1,
                          )) + " and length ") + $int.to_string(length)) + " bytes exceeds the maximum allowed string size of ") + $int.to_string(
                            context.config.max_string_size,
                          )) + " bytes",
                          context.path,
                          $byte_stream.bytes_read(context.stream),
                        ),
                      );
                    } else {
                      _block$1 = new Ok(undefined);
                    }
                    let max_size_check_result = _block$1;
                    return $result.try$(
                      max_size_check_result,
                      (_) => {
                        let _block$2;
                        let _pipe = $data_set_path.add_data_element(
                          context.path,
                          tag,
                        );
                        _block$2 = $result.map_error(
                          _pipe,
                          (_) => {
                            return new $p10_error.DataInvalid(
                              "Reading data element header",
                              ("Data element '" + $data_element_header.to_string(
                                header,
                              )) + "' is not valid for the current path",
                              context.path,
                              $byte_stream.bytes_read(context.stream),
                            );
                          },
                        );
                        let new_path = _block$2;
                        return $result.try$(
                          new_path,
                          (new_path) => {
                            let emit_tokens = (!isEqual(
                              header.tag,
                              $dictionary.data_set_trailing_padding.tag
                            )) && (header.tag.element !== 0x0);
                            let _block$3;
                            let $5 = emit_tokens && !materialized_value_required;
                            if ($5) {
                              _block$3 = toList([
                                new $p10_token.DataElementHeader(
                                  header.tag,
                                  vr$1,
                                  length,
                                  new_path,
                                ),
                              ]);
                            } else {
                              _block$3 = toList([]);
                            }
                            let tokens = _block$3;
                            let next_action = new ReadDataElementValueBytes(
                              header.tag,
                              vr$1,
                              length,
                              length,
                              emit_tokens,
                            );
                            let _block$4;
                            let _record = context;
                            _block$4 = new P10ReadContext(
                              _record.config,
                              new_stream,
                              next_action,
                              _record.transfer_syntax,
                              new_path,
                              _record.location,
                            );
                            let new_context = _block$4;
                            return new Ok([tokens, new_context]);
                          },
                        );
                      },
                    );
                  },
                );
              } else {
                let tag = $1;
                return $result.try$(
                  check_data_element_ordering(context, header),
                  (context) => {
                    let _block$1;
                    let $4 = header.length;
                    if ($4 instanceof $value_length.Defined) {
                      let length = $4.length;
                      _block$1 = new Some(
                        $byte_stream.bytes_read(new_stream) + length,
                      );
                    } else {
                      _block$1 = new None();
                    }
                    let ends_at = _block$1;
                    let is_implicit_vr = isEqual(
                      header.vr,
                      new Some(new $value_representation.Unknown())
                    );
                    let _block$2;
                    let _pipe = $p10_location.add_sequence(
                      context.location,
                      tag,
                      is_implicit_vr,
                      ends_at,
                    );
                    _block$2 = $result.map_error(
                      _pipe,
                      (details) => {
                        return new $p10_error.DataInvalid(
                          "Reading data element header",
                          details,
                          context.path,
                          $byte_stream.bytes_read(context.stream),
                        );
                      },
                    );
                    let new_location = _block$2;
                    return $result.try$(
                      new_location,
                      (new_location) => {
                        let _block$3;
                        let $5 = (divideInt(
                          $data_set_path.length(context.path),
                          2
                        )) < context.config.max_sequence_depth;
                        if ($5) {
                          _block$3 = new Ok(undefined);
                        } else {
                          _block$3 = new Error(
                            new $p10_error.MaximumExceeded(
                              "Maximum allowed sequence depth reached",
                              context.path,
                              $byte_stream.bytes_read(context.stream),
                            ),
                          );
                        }
                        let sequence_depth_check = _block$3;
                        return $result.try$(
                          sequence_depth_check,
                          (_) => {
                            let $6 = $data_set_path.add_data_element(
                              context.path,
                              tag,
                            );
                            if (!($6 instanceof Ok)) {
                              throw makeError(
                                "let_assert",
                                FILEPATH,
                                "dcmfx_p10/p10_read",
                                754,
                                "read_data_element_header_token",
                                "Pattern match failed, no pattern matched the value.",
                                {
                                  value: $6,
                                  start: 25930,
                                  end: 26013,
                                  pattern_start: 25941,
                                  pattern_end: 25953
                                }
                              )
                            }
                            let new_path = $6[0];
                            let token = new $p10_token.SequenceStart(
                              tag,
                              new $value_representation.Sequence(),
                              new_path,
                            );
                            let _block$4;
                            let _record = context;
                            _block$4 = new P10ReadContext(
                              _record.config,
                              new_stream,
                              _record.next_action,
                              _record.transfer_syntax,
                              new_path,
                              new_location,
                            );
                            let new_context = _block$4;
                            return new Ok([toList([token]), new_context]);
                          },
                        );
                      },
                    );
                  },
                );
              }
            } else if ($2 instanceof $value_length.Defined) {
              let tag = $1;
              let vr$1 = $3;
              let length = $2.length;
              return $result.try$(
                check_data_element_ordering(context, header),
                (context) => {
                  let materialized_value_required = is_materialized_value_required(
                    context,
                    header.tag,
                    vr$1,
                  );
                  let _block$1;
                  let $4 = materialized_value_required && (length > context.config.max_string_size);
                  if ($4) {
                    _block$1 = new Error(
                      new $p10_error.MaximumExceeded(
                        ((((((("Value for '" + $dictionary.tag_with_name(
                          header.tag,
                          new None(),
                        )) + "' with VR ") + $value_representation.to_string(
                          vr$1,
                        )) + " and length ") + $int.to_string(length)) + " bytes exceeds the maximum allowed string size of ") + $int.to_string(
                          context.config.max_string_size,
                        )) + " bytes",
                        context.path,
                        $byte_stream.bytes_read(context.stream),
                      ),
                    );
                  } else {
                    _block$1 = new Ok(undefined);
                  }
                  let max_size_check_result = _block$1;
                  return $result.try$(
                    max_size_check_result,
                    (_) => {
                      let _block$2;
                      let _pipe = $data_set_path.add_data_element(
                        context.path,
                        tag,
                      );
                      _block$2 = $result.map_error(
                        _pipe,
                        (_) => {
                          return new $p10_error.DataInvalid(
                            "Reading data element header",
                            ("Data element '" + $data_element_header.to_string(
                              header,
                            )) + "' is not valid for the current path",
                            context.path,
                            $byte_stream.bytes_read(context.stream),
                          );
                        },
                      );
                      let new_path = _block$2;
                      return $result.try$(
                        new_path,
                        (new_path) => {
                          let emit_tokens = (!isEqual(
                            header.tag,
                            $dictionary.data_set_trailing_padding.tag
                          )) && (header.tag.element !== 0x0);
                          let _block$3;
                          let $5 = emit_tokens && !materialized_value_required;
                          if ($5) {
                            _block$3 = toList([
                              new $p10_token.DataElementHeader(
                                header.tag,
                                vr$1,
                                length,
                                new_path,
                              ),
                            ]);
                          } else {
                            _block$3 = toList([]);
                          }
                          let tokens = _block$3;
                          let next_action = new ReadDataElementValueBytes(
                            header.tag,
                            vr$1,
                            length,
                            length,
                            emit_tokens,
                          );
                          let _block$4;
                          let _record = context;
                          _block$4 = new P10ReadContext(
                            _record.config,
                            new_stream,
                            next_action,
                            _record.transfer_syntax,
                            new_path,
                            _record.location,
                          );
                          let new_context = _block$4;
                          return new Ok([tokens, new_context]);
                        },
                      );
                    },
                  );
                },
              );
            } else {
              return new Error(
                new $p10_error.DataInvalid(
                  "Reading data element header",
                  ("Invalid data element '" + $data_element_header.to_string(
                    header,
                  )) + "'",
                  context.path,
                  $byte_stream.bytes_read(context.stream),
                ),
              );
            }
          } else {
            let tag = $1;
            if (isEqual(tag, $dictionary.item.tag)) {
              let _block$1;
              let $3 = header.length;
              if ($3 instanceof $value_length.Defined) {
                let length = $3.length;
                _block$1 = new Some(
                  $byte_stream.bytes_read(new_stream) + length,
                );
              } else {
                _block$1 = new None();
              }
              let ends_at = _block$1;
              let _block$2;
              let _pipe = $p10_location.add_item(
                context.location,
                ends_at,
                header.length,
              );
              _block$2 = $result.map_error(
                _pipe,
                (details) => {
                  return new $p10_error.DataInvalid(
                    "Reading data element header",
                    details,
                    context.path,
                    $byte_stream.bytes_read(context.stream),
                  );
                },
              );
              let new_location = _block$2;
              return $result.try$(
                new_location,
                (_use0) => {
                  let index = _use0[0];
                  let new_location$1 = _use0[1];
                  let $4 = $data_set_path.add_sequence_item(context.path, index);
                  if (!($4 instanceof Ok)) {
                    throw makeError(
                      "let_assert",
                      FILEPATH,
                      "dcmfx_p10/p10_read",
                      792,
                      "read_data_element_header_token",
                      "Pattern match failed, no pattern matched the value.",
                      {
                        value: $4,
                        start: 27078,
                        end: 27164,
                        pattern_start: 27089,
                        pattern_end: 27101
                      }
                    )
                  }
                  let new_path = $4[0];
                  let _block$3;
                  let _record = context;
                  _block$3 = new P10ReadContext(
                    _record.config,
                    new_stream,
                    _record.next_action,
                    _record.transfer_syntax,
                    new_path,
                    new_location$1,
                  );
                  let new_context = _block$3;
                  let token = new $p10_token.SequenceItemStart(index);
                  return new Ok([toList([token]), new_context]);
                },
              );
            } else {
              if ($2 instanceof $value_length.Defined) {
                let $3 = $2.length;
                if ($3 === 0) {
                  let tag$1 = $1;
                  if (isEqual(tag$1, $dictionary.sequence_delimitation_item.tag)) {
                    let _block$1;
                    let $5 = $p10_location.end_sequence(context.location);
                    if ($5 instanceof Ok) {
                      let tag$2 = $5[0][0];
                      let new_location = $5[0][1];
                      let $6 = $data_set_path.pop(context.path);
                      if (!($6 instanceof Ok)) {
                        throw makeError(
                          "let_assert",
                          FILEPATH,
                          "dcmfx_p10/p10_read",
                          856,
                          "read_data_element_header_token",
                          "Pattern match failed, no pattern matched the value.",
                          {
                            value: $6,
                            start: 29058,
                            end: 29115,
                            pattern_start: 29069,
                            pattern_end: 29081
                          }
                        )
                      }
                      let new_path = $6[0];
                      _block$1 = [
                        toList([new $p10_token.SequenceDelimiter(tag$2)]),
                        new_path,
                        new_location,
                      ];
                    } else {
                      _block$1 = [toList([]), context.path, context.location];
                    }
                    let $4 = _block$1;
                    let tokens = $4[0];
                    let new_path = $4[1];
                    let new_location = $4[2];
                    let _block$2;
                    let _record = context;
                    _block$2 = new P10ReadContext(
                      _record.config,
                      new_stream,
                      _record.next_action,
                      _record.transfer_syntax,
                      new_path,
                      new_location,
                    );
                    let new_context = _block$2;
                    return new Ok([tokens, new_context]);
                  } else {
                    let tag$2 = $1;
                    if (isEqual(tag$2, $dictionary.item_delimitation_item.tag)) {
                      let token = new $p10_token.SequenceItemDelimiter();
                      let _block$1;
                      let _pipe = $p10_location.end_item(context.location);
                      _block$1 = $result.map_error(
                        _pipe,
                        (details) => {
                          return new $p10_error.DataInvalid(
                            "Reading data element header",
                            details,
                            context.path,
                            $byte_stream.bytes_read(context.stream),
                          );
                        },
                      );
                      let new_location = _block$1;
                      return $result.try$(
                        new_location,
                        (new_location) => {
                          let $4 = $data_set_path.pop(context.path);
                          if (!($4 instanceof Ok)) {
                            throw makeError(
                              "let_assert",
                              FILEPATH,
                              "dcmfx_p10/p10_read",
                              899,
                              "read_data_element_header_token",
                              "Pattern match failed, no pattern matched the value.",
                              {
                                value: $4,
                                start: 30443,
                                end: 30500,
                                pattern_start: 30454,
                                pattern_end: 30466
                              }
                            )
                          }
                          let new_path = $4[0];
                          let _block$2;
                          let _record = context;
                          _block$2 = new P10ReadContext(
                            _record.config,
                            new_stream,
                            _record.next_action,
                            _record.transfer_syntax,
                            new_path,
                            new_location,
                          );
                          let new_context = _block$2;
                          return new Ok([toList([token]), new_context]);
                        },
                      );
                    } else {
                      return new Error(
                        new $p10_error.DataInvalid(
                          "Reading data element header",
                          ("Invalid data element '" + $data_element_header.to_string(
                            header,
                          )) + "'",
                          context.path,
                          $byte_stream.bytes_read(context.stream),
                        ),
                      );
                    }
                  }
                } else {
                  return new Error(
                    new $p10_error.DataInvalid(
                      "Reading data element header",
                      ("Invalid data element '" + $data_element_header.to_string(
                        header,
                      )) + "'",
                      context.path,
                      $byte_stream.bytes_read(context.stream),
                    ),
                  );
                }
              } else {
                return new Error(
                  new $p10_error.DataInvalid(
                    "Reading data element header",
                    ("Invalid data element '" + $data_element_header.to_string(
                      header,
                    )) + "'",
                    context.path,
                    $byte_stream.bytes_read(context.stream),
                  ),
                );
              }
            }
          }
        },
      );
    },
  );
}

function read_data_element_value_bytes_token(
  context,
  tag,
  vr,
  value_length,
  bytes_remaining,
  emit_tokens
) {
  let materialized_value_required = is_materialized_value_required(
    context,
    tag,
    vr,
  );
  let _block;
  if (materialized_value_required) {
    _block = value_length;
  } else {
    _block = $int.min(bytes_remaining, context.config.max_token_size);
  }
  let bytes_to_read = _block;
  let $ = $byte_stream.read(context.stream, bytes_to_read);
  if ($ instanceof Ok) {
    let data = $[0][0];
    let new_stream = $[0][1];
    let _block$1;
    let $1 = active_transfer_syntax(context).endianness;
    if ($1 instanceof LittleEndian) {
      _block$1 = data;
    } else {
      _block$1 = $p10_location.swap_endianness(context.location, tag, vr, data);
    }
    let data$1 = _block$1;
    let bytes_remaining$1 = bytes_remaining - bytes_to_read;
    let _block$2;
    if (materialized_value_required) {
      _block$2 = process_materialized_data_element(context, tag, vr, data$1);
    } else {
      _block$2 = new Ok([data$1, context.location]);
    }
    let materialized_value_result = _block$2;
    return $result.try$(
      materialized_value_result,
      (_use0) => {
        let data$2 = _use0[0];
        let new_location = _use0[1];
        let _block$3;
        if (emit_tokens) {
          let value_bytes_token = new $p10_token.DataElementValueBytes(
            tag,
            vr,
            data$2,
            bytes_remaining$1,
          );
          if (materialized_value_required) {
            let length = $bit_array.byte_size(data$2);
            let _block$4;
            let _pipe = vr;
            let _pipe$1 = $data_element_header.value_length_size(_pipe);
            _block$4 = $data_element_header.value_length_size_max_length(
              _pipe$1,
            );
            let max_length = _block$4;
            let $2 = length <= max_length;
            if ($2) {
              _block$3 = new Ok(
                toList([
                  new $p10_token.DataElementHeader(
                    tag,
                    vr,
                    length,
                    context.path,
                  ),
                  value_bytes_token,
                ]),
              );
            } else {
              _block$3 = new Error(
                new $p10_error.DataInvalid(
                  "Reading data element value bytes",
                  ((("Length of " + $int.to_string(length)) + " bytes exceeds the maximum of ") + $int.to_string(
                    max_length,
                  )) + " bytes after conversion to UTF-8",
                  context.path,
                  $byte_stream.bytes_read(context.stream),
                ),
              );
            }
          } else {
            _block$3 = new Ok(toList([value_bytes_token]));
          }
        } else {
          _block$3 = new Ok(toList([]));
        }
        let tokens = _block$3;
        return $result.try$(
          tokens,
          (tokens) => {
            let _block$4;
            if (bytes_remaining$1 === 0) {
              let $2 = isEqual(tag, $dictionary.item.tag);
              if ($2) {
                _block$4 = new ReadPixelDataItem(vr);
              } else {
                _block$4 = new ReadDataElementHeader();
              }
            } else {
              _block$4 = new ReadDataElementValueBytes(
                tag,
                vr,
                value_length,
                bytes_remaining$1,
                emit_tokens,
              );
            }
            let next_action = _block$4;
            let _block$5;
            if (bytes_remaining$1 === 0) {
              let $2 = $data_set_path.pop(context.path);
              if (!($2 instanceof Ok)) {
                throw makeError(
                  "let_assert",
                  FILEPATH,
                  "dcmfx_p10/p10_read",
                  1354,
                  "read_data_element_value_bytes_token",
                  "Pattern match failed, no pattern matched the value.",
                  {
                    value: $2,
                    start: 45937,
                    end: 45990,
                    pattern_start: 45948,
                    pattern_end: 45956
                  }
                )
              }
              let path = $2[0];
              _block$5 = path;
            } else {
              _block$5 = context.path;
            }
            let new_path = _block$5;
            let _block$6;
            let _record = context;
            _block$6 = new P10ReadContext(
              _record.config,
              new_stream,
              next_action,
              _record.transfer_syntax,
              new_path,
              new_location,
            );
            let new_context = _block$6;
            return new Ok([tokens, new_context]);
          },
        );
      },
    );
  } else {
    let e = $[0];
    let when = (("Reading " + $int.to_string(bytes_to_read)) + " data element value bytes, VR: ") + $value_representation.to_string(
      vr,
    );
    return new Error(map_byte_stream_error(context, e, when));
  }
}

function read_pixel_data_item_token(context, vr) {
  let $ = read_data_element_header(context);
  if ($ instanceof Ok) {
    let header = $[0][0];
    let new_stream = $[0][1];
    let $1 = header.length;
    if ($1 instanceof $value_length.Defined) {
      let $2 = header.vr;
      if ($2 instanceof None) {
        let tag = header.tag;
        let length = $1.length;
        if ((isEqual(tag, $dictionary.item.tag)) && (length !== 0xFFFFFFFF)) {
          let next_action = new ReadDataElementValueBytes(
            $dictionary.item.tag,
            vr,
            length,
            length,
            true,
          );
          let _block;
          let _pipe = $p10_location.sequence_item_count(context.location);
          _block = $result.unwrap(_pipe, 1);
          let item_count = _block;
          let index = item_count - 1;
          let $3 = $data_set_path.add_sequence_item(context.path, index);
          if (!($3 instanceof Ok)) {
            throw makeError(
              "let_assert",
              FILEPATH,
              "dcmfx_p10/p10_read",
              1469,
              "read_pixel_data_item_token",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $3,
                start: 49493,
                end: 49583,
                pattern_start: 49504,
                pattern_end: 49516
              }
            )
          }
          let new_path = $3[0];
          let _block$1;
          let _record = context;
          _block$1 = new P10ReadContext(
            _record.config,
            new_stream,
            next_action,
            _record.transfer_syntax,
            new_path,
            _record.location,
          );
          let new_context = _block$1;
          let token = new $p10_token.PixelDataItem(index, length);
          return new Ok([toList([token]), new_context]);
        } else {
          let $3 = $1.length;
          if ($3 === 0) {
            let tag$1 = header.tag;
            if (isEqual(tag$1, $dictionary.sequence_delimitation_item.tag)) {
              let token = new $p10_token.SequenceDelimiter(
                $dictionary.pixel_data.tag,
              );
              let _block;
              let _pipe = $p10_location.end_sequence(context.location);
              _block = $result.map_error(
                _pipe,
                (details) => {
                  return new $p10_error.DataInvalid(
                    "Reading encapsulated pixel data item",
                    details,
                    context.path,
                    $byte_stream.bytes_read(context.stream),
                  );
                },
              );
              let new_location = _block;
              return $result.try$(
                new_location,
                (_use0) => {
                  let new_location$1 = _use0[1];
                  let $4 = $data_set_path.pop(context.path);
                  if (!($4 instanceof Ok)) {
                    throw makeError(
                      "let_assert",
                      FILEPATH,
                      "dcmfx_p10/p10_read",
                      1503,
                      "read_pixel_data_item_token",
                      "Pattern match failed, no pattern matched the value.",
                      {
                        value: $4,
                        start: 50568,
                        end: 50625,
                        pattern_start: 50579,
                        pattern_end: 50591
                      }
                    )
                  }
                  let new_path = $4[0];
                  let next_action = new ReadDataElementHeader();
                  let _block$1;
                  let _record = context;
                  _block$1 = new P10ReadContext(
                    _record.config,
                    new_stream,
                    next_action,
                    _record.transfer_syntax,
                    new_path,
                    new_location$1,
                  );
                  let new_context = _block$1;
                  return new Ok([toList([token]), new_context]);
                },
              );
            } else {
              return new Error(
                new $p10_error.DataInvalid(
                  "Reading encapsulated pixel data item",
                  ("Invalid data element '" + $data_element_header.to_string(
                    header,
                  )) + "'",
                  context.path,
                  $byte_stream.bytes_read(context.stream),
                ),
              );
            }
          } else {
            return new Error(
              new $p10_error.DataInvalid(
                "Reading encapsulated pixel data item",
                ("Invalid data element '" + $data_element_header.to_string(
                  header,
                )) + "'",
                context.path,
                $byte_stream.bytes_read(context.stream),
              ),
            );
          }
        }
      } else {
        return new Error(
          new $p10_error.DataInvalid(
            "Reading encapsulated pixel data item",
            ("Invalid data element '" + $data_element_header.to_string(header)) + "'",
            context.path,
            $byte_stream.bytes_read(context.stream),
          ),
        );
      }
    } else {
      return new Error(
        new $p10_error.DataInvalid(
          "Reading encapsulated pixel data item",
          ("Invalid data element '" + $data_element_header.to_string(header)) + "'",
          context.path,
          $byte_stream.bytes_read(context.stream),
        ),
      );
    }
  } else {
    let e = $[0];
    return new Error(e);
  }
}

export function read_tokens(context) {
  let $ = context.next_action;
  if ($ instanceof ReadFilePreambleAndDICMPrefix) {
    return read_file_preamble_and_dicm_prefix_token(context);
  } else if ($ instanceof ReadFileMetaInformation) {
    let starts_at = $.starts_at;
    return $result.map(
      read_file_meta_information_token(context, starts_at),
      (_use0) => {
        let fmi_data_set = _use0[0];
        let new_context = _use0[1];
        return [
          toList([new $p10_token.FileMetaInformation(fmi_data_set)]),
          new_context,
        ];
      },
    );
  } else if ($ instanceof ReadDataElementHeader) {
    let delimiter_token = next_delimiter_token(context);
    return $bool.guard(
      !isEqual(delimiter_token[0], toList([])),
      new Ok(delimiter_token),
      () => {
        let $1 = $byte_stream.is_fully_consumed(context.stream);
        if ($1) {
          let tokens = $p10_location.pending_delimiter_tokens(context.location);
          return new Ok([tokens, context]);
        } else {
          return read_data_element_header_token(context);
        }
      },
    );
  } else if ($ instanceof ReadDataElementValueBytes) {
    let tag = $.tag;
    let vr = $.vr;
    let value_length = $.length;
    let bytes_remaining = $.bytes_remaining;
    let emit_tokens = $.emit_tokens;
    return read_data_element_value_bytes_token(
      context,
      tag,
      vr,
      value_length,
      bytes_remaining,
      emit_tokens,
    );
  } else {
    let vr = $.vr;
    return read_pixel_data_item_token(context, vr);
  }
}

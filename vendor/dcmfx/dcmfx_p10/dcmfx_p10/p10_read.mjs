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
} from "../gleam.mjs";

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
  constructor(config, stream, next_action, transfer_syntax, path, location, sequence_depth) {
    super();
    this.config = config;
    this.stream = stream;
    this.next_action = next_action;
    this.transfer_syntax = transfer_syntax;
    this.path = path;
    this.location = location;
    this.sequence_depth = sequence_depth;
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
  let config$1 = (() => {
    let _record = config;
    return new P10ReadConfig(
      max_token_size,
      max_string_size,
      max_sequence_depth,
      _record.require_ordered_data_elements,
    );
  })();
  let _record = context;
  return new P10ReadContext(
    config$1,
    $byte_stream.new$(max_read_size),
    _record.next_action,
    _record.transfer_syntax,
    _record.path,
    _record.location,
    _record.sequence_depth,
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
    _record.sequence_depth,
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
    0,
  );
}

function next_delimiter_token(context) {
  let bytes_read = $byte_stream.bytes_read(context.stream);
  let $ = $p10_location.next_delimiter_token(context.location, bytes_read);
  if ($.isOk()) {
    let token = $[0][0];
    let new_location = $[0][1];
    let new_sequence_depth = (() => {
      if (token instanceof $p10_token.SequenceDelimiter) {
        return context.sequence_depth - 1;
      } else {
        return context.sequence_depth;
      }
    })();
    let new_path = (() => {
      if (token instanceof $p10_token.SequenceDelimiter) {
        let $1 = $data_set_path.pop(context.path);
        if (!$1.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_p10/p10_read",
            349,
            "next_delimiter_token",
            "Pattern match failed, no pattern matched the value.",
            { value: $1 }
          )
        }
        let path = $1[0];
        return path;
      } else if (token instanceof $p10_token.SequenceItemDelimiter) {
        let $1 = $data_set_path.pop(context.path);
        if (!$1.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_p10/p10_read",
            349,
            "next_delimiter_token",
            "Pattern match failed, no pattern matched the value.",
            { value: $1 }
          )
        }
        let path = $1[0];
        return path;
      } else {
        return context.path;
      }
    })();
    let new_context = (() => {
      let _record = context;
      return new P10ReadContext(
        _record.config,
        _record.stream,
        _record.next_action,
        _record.transfer_syntax,
        new_path,
        new_location,
        new_sequence_depth,
      );
    })();
    return [toList([token]), new_context];
  } else {
    return [toList([]), context];
  }
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
  let value_bytes$1 = (() => {
    let $ = $value_representation.is_string(vr);
    if ($) {
      let $1 = $value_representation.is_encoded_string(vr) && !$data_element_tag.is_private_creator(
        tag,
      );
      if ($1) {
        return $p10_location.decode_string_bytes(
          context.location,
          vr,
          value_bytes,
        );
      } else {
        return $dcmfx_character_set.sanitize_default_charset_bytes(value_bytes);
      }
    } else {
      return value_bytes;
    }
  })();
  return $p10_location.add_clarifying_data_element(
    context.location,
    tag,
    vr,
    value_bytes$1,
  );
}

function map_byte_stream_error(context, error, when) {
  let offset = $byte_stream.bytes_read(context.stream);
  if (error instanceof $byte_stream.DataRequired) {
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
  } else if (error instanceof $byte_stream.WriteAfterCompletion) {
    return new $p10_error.WriteAfterCompletion();
  } else {
    return new $p10_error.OtherError(
      "Maximum read size exceeded",
      "Internal logic error",
    );
  }
}

export function write_bytes(context, bytes, done) {
  let $ = $byte_stream.write(context.stream, bytes, done);
  if ($.isOk()) {
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
          _record.sequence_depth,
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
  let preamble_and_stream = (() => {
    let $ = $byte_stream.peek(context.stream, 132);
    if ($.isOk()) {
      let data = $[0];
      if (data.byteAt(128) === 0x44 &&
      data.byteAt(129) === 0x49 &&
      data.byteAt(130) === 0x43 &&
      data.byteAt(131) === 0x4D &&
      data.length == 132) {
        let preamble = data.binaryFromSlice(0, 128);
        let $1 = $byte_stream.read(context.stream, 132);
        if (!$1.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_p10/p10_read",
            382,
            "read_file_preamble_and_dicm_prefix_token",
            "Pattern match failed, no pattern matched the value.",
            { value: $1 }
          )
        }
        let new_stream = $1[0];
        return new Ok([preamble, new_stream[1]]);
      } else {
        return new Ok([toBitArray([0]), context.stream]);
      }
    } else if (!$.isOk() && $[0] instanceof $byte_stream.DataEnd) {
      return new Ok([toBitArray([0]), context.stream]);
    } else {
      let e = $[0];
      return new Error(map_byte_stream_error(context, e, "Reading file header"));
    }
  })();
  return $result.try$(
    preamble_and_stream,
    (_use0) => {
      let preamble = _use0[0];
      let new_stream = _use0[1];
      let token = new $p10_token.FilePreambleAndDICMPrefix(preamble);
      let new_context = (() => {
        let _record = context;
        return new P10ReadContext(
          _record.config,
          new_stream,
          new ReadFileMetaInformation($byte_stream.bytes_read(new_stream)),
          _record.transfer_syntax,
          _record.path,
          _record.location,
          _record.sequence_depth,
        );
      })();
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
  let is_ended = (() => {
    if (ends_at instanceof Some) {
      let ends_at$1 = ends_at[0];
      return $byte_stream.bytes_read(context.stream) >= ends_at$1;
    } else {
      return false;
    }
  })();
  return $bool.guard(
    is_ended,
    new Ok([fmi_data_set, context]),
    () => {
      let data = (() => {
        let _pipe = $byte_stream.peek(context.stream, 8);
        return $result.map_error(
          _pipe,
          (e) => {
            return map_byte_stream_error(
              context,
              e,
              "Reading File Meta Information",
            );
          },
        );
      })();
      return $result.try$(
        data,
        (data) => {
          if (!(data.length >= 6)) {
            throw makeError(
              "let_assert",
              "dcmfx_p10/p10_read",
              497,
              "",
              "Pattern match failed, no pattern matched the value.",
              { value: data }
            )
          }
          let group = data.intFromSlice(0, 2, false, false);
          let element = data.intFromSlice(2, 4, false, false);
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
                  let vr = (() => {
                    let _pipe = toBitArray([vr_byte_0, vr_byte_1]);
                    let _pipe$1 = $value_representation.from_bytes(_pipe);
                    return $result.map_error(
                      _pipe$1,
                      (_) => {
                        return new $p10_error.DataInvalid(
                          "Reading File Meta Information",
                          "Data element has invalid VR",
                          $data_set_path.new_with_data_element(tag),
                          $byte_stream.bytes_read(context.stream),
                        );
                      },
                    );
                  })();
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
                          let value_result = (() => {
                            let $ = $data_element_header.value_length_size(vr);
                            if ($ instanceof $data_element_header.ValueLengthU16) {
                              if (!(data.length == 8)) {
                                throw makeError(
                                  "let_assert",
                                  "dcmfx_p10/p10_read",
                                  555,
                                  "",
                                  "Pattern match failed, no pattern matched the value.",
                                  { value: data }
                                )
                              }
                              let length = data.intFromSlice(6, 8, false, false);
                              return new Ok([8, length]);
                            } else {
                              let $1 = $byte_stream.peek(context.stream, 12);
                              if ($1.isOk()) {
                                let data$1 = $1[0];
                                if (!(data$1.length == 12)) {
                                  throw makeError(
                                    "let_assert",
                                    "dcmfx_p10/p10_read",
                                    563,
                                    "",
                                    "Pattern match failed, no pattern matched the value.",
                                    { value: data$1 }
                                  )
                                }
                                let length = data$1.intFromSlice(8, 12, false, false);
                                return new Ok([12, length]);
                              } else {
                                let e = $1[0];
                                return new Error(
                                  map_byte_stream_error(
                                    context,
                                    e,
                                    "Reading File Meta Information",
                                  ),
                                );
                              }
                            }
                          })();
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
                                  let read_result = (() => {
                                    let _pipe = context.stream;
                                    let _pipe$1 = $byte_stream.read(
                                      _pipe,
                                      data_element_size,
                                    );
                                    return $result.map_error(
                                      _pipe$1,
                                      (e) => {
                                        return map_byte_stream_error(
                                          context,
                                          e,
                                          "Reading File Meta Information data element value",
                                        );
                                      },
                                    );
                                  })();
                                  return $result.try$(
                                    read_result,
                                    (_use0) => {
                                      let data$1 = _use0[0];
                                      let new_stream = _use0[1];
                                      let $ = $bit_array.slice(
                                        data$1,
                                        value_offset,
                                        value_length,
                                      );
                                      if (!$.isOk()) {
                                        throw makeError(
                                          "let_assert",
                                          "dcmfx_p10/p10_read",
                                          607,
                                          "",
                                          "Pattern match failed, no pattern matched the value.",
                                          { value: $ }
                                        )
                                      }
                                      let value_bytes = $[0];
                                      let value = $data_element_value.new_binary_unchecked(
                                        vr,
                                        value_bytes,
                                      );
                                      let ends_at$1 = (() => {
                                        let $1 = isEqual(
                                          tag,
                                          $dictionary.file_meta_information_group_length.tag
                                        );
                                        if ($1) {
                                          let $2 = $data_set.is_empty(
                                            fmi_data_set,
                                          );
                                          if (ends_at instanceof None && $2) {
                                            let $3 = $data_element_value.get_int(
                                              value,
                                            );
                                            if ($3.isOk() && ($3[0] >= 0)) {
                                              let i = $3[0];
                                              return new Ok(
                                                new Some((starts_at + 12) + i),
                                              );
                                            } else if ($3.isOk()) {
                                              let i = $3[0];
                                              return new Error(
                                                new $p10_error.DataInvalid(
                                                  "Reading File Meta Information",
                                                  "Group length is invalid: " + $int.to_string(
                                                    i,
                                                  ),
                                                  $data_set_path.new_with_data_element(
                                                    tag,
                                                  ),
                                                  $byte_stream.bytes_read(
                                                    context.stream,
                                                  ),
                                                ),
                                              );
                                            } else {
                                              let e = $3[0];
                                              return new Error(
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
                                            return new Ok(ends_at);
                                          }
                                        } else {
                                          return new Ok(ends_at);
                                        }
                                      })();
                                      return $result.try$(
                                        ends_at$1,
                                        (ends_at) => {
                                          let transfer_syntax$1 = (() => {
                                            let $1 = isEqual(
                                              tag,
                                              $dictionary.transfer_syntax_uid.tag
                                            );
                                            if ($1) {
                                              let $2 = $data_element_value.get_string(
                                                value,
                                              );
                                              if ($2.isOk()) {
                                                let uid = $2[0];
                                                let _pipe = uid;
                                                let _pipe$1 = $transfer_syntax.from_uid(
                                                  _pipe,
                                                );
                                                return $result.map_error(
                                                  _pipe$1,
                                                  (_) => {
                                                    return new $p10_error.TransferSyntaxNotSupported(
                                                      uid,
                                                    );
                                                  },
                                                );
                                              } else {
                                                let e = $2[0];
                                                let $3 = $data_error.is_tag_not_present(
                                                  e,
                                                );
                                                if ($3) {
                                                  return new Ok(
                                                    context.transfer_syntax,
                                                  );
                                                } else {
                                                  return new Error(
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
                                              return new Ok(
                                                context.transfer_syntax,
                                              );
                                            }
                                          })();
                                          return $result.try$(
                                            transfer_syntax$1,
                                            (transfer_syntax) => {
                                              let fmi_data_set$1 = (() => {
                                                let $1 = isEqual(
                                                  tag,
                                                  $dictionary.file_meta_information_group_length.tag
                                                );
                                                if ($1) {
                                                  return fmi_data_set;
                                                } else {
                                                  return $data_set.insert(
                                                    fmi_data_set,
                                                    tag,
                                                    value,
                                                  );
                                                }
                                              })();
                                              let new_context = (() => {
                                                let _record = context;
                                                return new P10ReadContext(
                                                  _record.config,
                                                  new_stream,
                                                  _record.next_action,
                                                  transfer_syntax,
                                                  _record.path,
                                                  _record.location,
                                                  _record.sequence_depth,
                                                );
                                              })();
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
      let new_stream = (() => {
        let $ = new_context.transfer_syntax.is_deflated;
        if ($) {
          let $1 = $byte_stream.start_zlib_inflate(new_context.stream);
          if ($1.isOk()) {
            let stream = $1[0];
            return new Ok(stream);
          } else {
            return new Error(
              new $p10_error.DataInvalid(
                "Starting zlib decompression for deflated transfer syntax",
                "Zlib data is invalid",
                $data_set_path.new$(),
                $byte_stream.bytes_read(context.stream),
              ),
            );
          }
        } else {
          return new Ok(new_context.stream);
        }
      })();
      return $result.map(
        new_stream,
        (new_stream) => {
          let fmi_data_set$1 = (() => {
            let $ = isEqual(
              new_context.transfer_syntax,
              $transfer_syntax.implicit_vr_little_endian
            );
            if ($) {
              return fmi_data_set;
            } else {
              let $1 = $data_set.insert_string_value(
                fmi_data_set,
                $dictionary.transfer_syntax_uid,
                toList([new_context.transfer_syntax.uid]),
              );
              if (!$1.isOk()) {
                throw makeError(
                  "let_assert",
                  "dcmfx_p10/p10_read",
                  454,
                  "",
                  "Pattern match failed, no pattern matched the value.",
                  { value: $1 }
                )
              }
              let fmi_data_set$1 = $1[0];
              return fmi_data_set$1;
            }
          })();
          let new_context$1 = (() => {
            let _record = new_context;
            return new P10ReadContext(
              _record.config,
              new_stream,
              new ReadDataElementHeader(),
              _record.transfer_syntax,
              _record.path,
              _record.location,
              _record.sequence_depth,
            );
          })();
          return [fmi_data_set$1, new_context$1];
        },
      );
    },
  );
}

function read_implicit_vr_and_length(context, tag) {
  let $ = $byte_stream.read(context.stream, 8);
  if ($.isOk()) {
    let data = $[0][0];
    let new_stream = $[0][1];
    let value_length = (() => {
      let $1 = active_transfer_syntax(context).endianness;
      if ($1 instanceof $transfer_syntax.LittleEndian) {
        if (!(data.length == 8)) {
          throw makeError(
            "let_assert",
            "dcmfx_p10/p10_read",
            1122,
            "read_implicit_vr_and_length",
            "Pattern match failed, no pattern matched the value.",
            { value: data }
          )
        }
        let value_length = data.intFromSlice(4, 8, false, false);
        return value_length;
      } else {
        if (!(data.length == 8)) {
          throw makeError(
            "let_assert",
            "dcmfx_p10/p10_read",
            1126,
            "read_implicit_vr_and_length",
            "Pattern match failed, no pattern matched the value.",
            { value: data }
          )
        }
        let value_length = data.intFromSlice(4, 8, true, false);
        return value_length;
      }
    })();
    let vr = (() => {
      let $1 = ((isEqual(tag, $dictionary.item.tag)) || (isEqual(
        tag,
        $dictionary.item_delimitation_item.tag
      ))) || (isEqual(tag, $dictionary.sequence_delimitation_item.tag));
      if ($1) {
        return new None();
      } else {
        return new Some(new $value_representation.Unknown());
      }
    })();
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
  let vr = (() => {
    let $ = $byte_stream.peek(context.stream, 6);
    if ($.isOk()) {
      let data = $[0];
      if (!(data.length == 6)) {
        throw makeError(
          "let_assert",
          "dcmfx_p10/p10_read",
          1163,
          "read_explicit_vr_and_length",
          "Pattern match failed, no pattern matched the value.",
          { value: data }
        )
      }
      let vr_bytes = data.binaryFromSlice(4, 6);
      let $1 = $value_representation.from_bytes(vr_bytes);
      if ($1.isOk()) {
        let vr = $1[0];
        return new Ok(vr);
      } else {
        if (vr_bytes.byteAt(0) === 32 &&
        vr_bytes.byteAt(1) === 32 &&
        vr_bytes.length == 2) {
          return new Ok(new $value_representation.Unknown());
        } else {
          return new Error(
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
      return new Error(
        map_byte_stream_error(
          context,
          e,
          "Reading explicit VR data element header",
        ),
      );
    }
  })();
  return $result.try$(
    vr,
    (vr) => {
      let header_size = (() => {
        let $ = $data_element_header.value_length_size(vr);
        if ($ instanceof $data_element_header.ValueLengthU16) {
          return 8;
        } else {
          return 12;
        }
      })();
      let $ = $byte_stream.read(context.stream, header_size);
      if ($.isOk()) {
        let data = $[0][0];
        let new_stream = $[0][1];
        let length = (() => {
          if (header_size === 12) {
            let $1 = active_transfer_syntax(context).endianness;
            if ($1 instanceof $transfer_syntax.LittleEndian) {
              if (!(data.length == 12)) {
                throw makeError(
                  "let_assert",
                  "dcmfx_p10/p10_read",
                  1214,
                  "",
                  "Pattern match failed, no pattern matched the value.",
                  { value: data }
                )
              }
              let length = data.intFromSlice(8, 12, false, false);
              return length;
            } else {
              if (!(data.length == 12)) {
                throw makeError(
                  "let_assert",
                  "dcmfx_p10/p10_read",
                  1218,
                  "",
                  "Pattern match failed, no pattern matched the value.",
                  { value: data }
                )
              }
              let length = data.intFromSlice(8, 12, true, false);
              return length;
            }
          } else {
            let $1 = active_transfer_syntax(context).endianness;
            if ($1 instanceof $transfer_syntax.LittleEndian) {
              if (!(data.length == 8)) {
                throw makeError(
                  "let_assert",
                  "dcmfx_p10/p10_read",
                  1225,
                  "",
                  "Pattern match failed, no pattern matched the value.",
                  { value: data }
                )
              }
              let length = data.intFromSlice(6, 8, false, false);
              return length;
            } else {
              if (!(data.length == 8)) {
                throw makeError(
                  "let_assert",
                  "dcmfx_p10/p10_read",
                  1229,
                  "",
                  "Pattern match failed, no pattern matched the value.",
                  { value: data }
                )
              }
              let length = data.intFromSlice(6, 8, true, false);
              return length;
            }
          }
        })();
        let header = new DataElementHeader(
          tag,
          new Some(vr),
          $value_length.new$(length),
        );
        return new Ok([header, new_stream]);
      } else {
        let e = $[0];
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
  let tag = (() => {
    let $ = $byte_stream.peek(context.stream, 4);
    if ($.isOk()) {
      let data = $[0];
      let $1 = (() => {
        let $2 = transfer_syntax$1.endianness;
        if ($2 instanceof $transfer_syntax.LittleEndian) {
          if (!(data.length == 4)) {
            throw makeError(
              "let_assert",
              "dcmfx_p10/p10_read",
              1047,
              "read_data_element_header",
              "Pattern match failed, no pattern matched the value.",
              { value: data }
            )
          }
          let group = data.intFromSlice(0, 2, false, false);
          let element = data.intFromSlice(2, 4, false, false);
          return [group, element];
        } else {
          if (!(data.length == 4)) {
            throw makeError(
              "let_assert",
              "dcmfx_p10/p10_read",
              1052,
              "read_data_element_header",
              "Pattern match failed, no pattern matched the value.",
              { value: data }
            )
          }
          let group = data.intFromSlice(0, 2, true, false);
          let element = data.intFromSlice(2, 4, true, false);
          return [group, element];
        }
      })();
      let group = $1[0];
      let element = $1[1];
      return new Ok(new DataElementTag(group, element));
    } else {
      let e = $[0];
      return new Error(
        map_byte_stream_error(context, e, "Reading data element header"),
      );
    }
  })();
  return $result.try$(
    tag,
    (tag) => {
      let vr_serialization = (() => {
        let $ = ((isEqual(tag, $dictionary.item.tag)) || (isEqual(
          tag,
          $dictionary.item_delimitation_item.tag
        ))) || (isEqual(tag, $dictionary.sequence_delimitation_item.tag));
        if ($) {
          return new $transfer_syntax.VrImplicit();
        } else {
          return transfer_syntax$1.vr_serialization;
        }
      })();
      let is_invalid_data_element = (() => {
        let $ = tag.group;
        let $1 = context.next_action;
        if ($ === 0x2 && $1 instanceof ReadFileMetaInformation) {
          return false;
        } else if ($ === 0x2) {
          return true;
        } else {
          return false;
        }
      })();
      return $bool.guard(
        is_invalid_data_element,
        new Error(
          new $p10_error.DataInvalid(
            "Reading data element header",
            "File Meta Information data element found in the main data set",
            context.path,
            $byte_stream.bytes_read(context.stream),
          ),
        ),
        () => {
          if (vr_serialization instanceof $transfer_syntax.VrExplicit) {
            return read_explicit_vr_and_length(context, tag);
          } else {
            return read_implicit_vr_and_length(context, tag);
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
      let vr = (() => {
        let $ = header.vr;
        if ($ instanceof Some && $[0] instanceof $value_representation.Unknown) {
          let _pipe = $p10_location.infer_vr_for_tag(
            context.location,
            header.tag,
          );
          let _pipe$1 = $result.map(_pipe, (var0) => { return new Some(var0); });
          return $result.map_error(
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
          return new Ok(vr);
        }
      })();
      return $result.try$(
        vr,
        (vr) => {
          let $ = header.tag;
          let $1 = header.length;
          if (vr instanceof Some &&
          vr[0] instanceof $value_representation.Sequence) {
            let tag = $;
            let token = new $p10_token.SequenceStart(
              tag,
              new $value_representation.Sequence(),
            );
            let ends_at = (() => {
              let $2 = header.length;
              if ($2 instanceof $value_length.Defined) {
                let length = $2.length;
                return new Some($byte_stream.bytes_read(new_stream) + length);
              } else {
                return new None();
              }
            })();
            let is_implicit_vr = isEqual(
              header.vr,
              new Some(new $value_representation.Unknown())
            );
            let new_location = (() => {
              let _pipe = $p10_location.add_sequence(
                context.location,
                tag,
                is_implicit_vr,
                ends_at,
              );
              return $result.map_error(
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
            })();
            return $result.try$(
              new_location,
              (new_location) => {
                let sequence_depth_check = (() => {
                  let $2 = context.sequence_depth < context.config.max_sequence_depth;
                  if ($2) {
                    return new Ok(undefined);
                  } else {
                    return new Error(
                      new $p10_error.MaximumExceeded(
                        "Maximum allowed sequence depth reached",
                        context.path,
                        $byte_stream.bytes_read(context.stream),
                      ),
                    );
                  }
                })();
                return $result.try$(
                  sequence_depth_check,
                  (_) => {
                    let $2 = $data_set_path.add_data_element(context.path, tag);
                    if (!$2.isOk()) {
                      throw makeError(
                        "let_assert",
                        "dcmfx_p10/p10_read",
                        766,
                        "",
                        "Pattern match failed, no pattern matched the value.",
                        { value: $2 }
                      )
                    }
                    let new_path = $2[0];
                    let new_context = (() => {
                      let _record = context;
                      return new P10ReadContext(
                        _record.config,
                        new_stream,
                        _record.next_action,
                        _record.transfer_syntax,
                        new_path,
                        new_location,
                        context.sequence_depth + 1,
                      );
                    })();
                    return new Ok([toList([token]), new_context]);
                  },
                );
              },
            );
          } else if (vr instanceof Some &&
          vr[0] instanceof $value_representation.Unknown &&
          $1 instanceof $value_length.Undefined) {
            let tag = $;
            let token = new $p10_token.SequenceStart(
              tag,
              new $value_representation.Sequence(),
            );
            let ends_at = (() => {
              let $2 = header.length;
              if ($2 instanceof $value_length.Defined) {
                let length = $2.length;
                return new Some($byte_stream.bytes_read(new_stream) + length);
              } else {
                return new None();
              }
            })();
            let is_implicit_vr = isEqual(
              header.vr,
              new Some(new $value_representation.Unknown())
            );
            let new_location = (() => {
              let _pipe = $p10_location.add_sequence(
                context.location,
                tag,
                is_implicit_vr,
                ends_at,
              );
              return $result.map_error(
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
            })();
            return $result.try$(
              new_location,
              (new_location) => {
                let sequence_depth_check = (() => {
                  let $2 = context.sequence_depth < context.config.max_sequence_depth;
                  if ($2) {
                    return new Ok(undefined);
                  } else {
                    return new Error(
                      new $p10_error.MaximumExceeded(
                        "Maximum allowed sequence depth reached",
                        context.path,
                        $byte_stream.bytes_read(context.stream),
                      ),
                    );
                  }
                })();
                return $result.try$(
                  sequence_depth_check,
                  (_) => {
                    let $2 = $data_set_path.add_data_element(context.path, tag);
                    if (!$2.isOk()) {
                      throw makeError(
                        "let_assert",
                        "dcmfx_p10/p10_read",
                        766,
                        "",
                        "Pattern match failed, no pattern matched the value.",
                        { value: $2 }
                      )
                    }
                    let new_path = $2[0];
                    let new_context = (() => {
                      let _record = context;
                      return new P10ReadContext(
                        _record.config,
                        new_stream,
                        _record.next_action,
                        _record.transfer_syntax,
                        new_path,
                        new_location,
                        context.sequence_depth + 1,
                      );
                    })();
                    return new Ok([toList([token]), new_context]);
                  },
                );
              },
            );
          } else if (vr instanceof None && (isEqual($, $dictionary.item.tag))) {
            let tag = $;
            let token = new $p10_token.SequenceItemStart();
            let ends_at = (() => {
              let $2 = header.length;
              if ($2 instanceof $value_length.Defined) {
                let length = $2.length;
                return new Some($byte_stream.bytes_read(new_stream) + length);
              } else {
                return new None();
              }
            })();
            let new_location = (() => {
              let _pipe = $p10_location.add_item(
                context.location,
                ends_at,
                header.length,
              );
              return $result.map_error(
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
            })();
            return $result.try$(
              new_location,
              (_use0) => {
                let item_count = _use0[0];
                let new_location$1 = _use0[1];
                let $2 = $data_set_path.add_sequence_item(
                  context.path,
                  item_count,
                );
                if (!$2.isOk()) {
                  throw makeError(
                    "let_assert",
                    "dcmfx_p10/p10_read",
                    804,
                    "",
                    "Pattern match failed, no pattern matched the value.",
                    { value: $2 }
                  )
                }
                let new_path = $2[0];
                let new_context = (() => {
                  let _record = context;
                  return new P10ReadContext(
                    _record.config,
                    new_stream,
                    _record.next_action,
                    _record.transfer_syntax,
                    new_path,
                    new_location$1,
                    _record.sequence_depth,
                  );
                })();
                return new Ok([toList([token]), new_context]);
              },
            );
          } else if (vr instanceof Some &&
          vr[0] instanceof $value_representation.OtherByteString &&
          $1 instanceof $value_length.Undefined &&
          (isEqual($, $dictionary.pixel_data.tag))) {
            let tag = $;
            let vr$1 = vr[0];
            let token = new $p10_token.SequenceStart(tag, vr$1);
            let new_location = (() => {
              let _pipe = $p10_location.add_sequence(
                context.location,
                tag,
                false,
                new None(),
              );
              return $result.map_error(
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
            })();
            return $result.try$(
              new_location,
              (new_location) => {
                let $2 = $data_set_path.add_data_element(context.path, tag);
                if (!$2.isOk()) {
                  throw makeError(
                    "let_assert",
                    "dcmfx_p10/p10_read",
                    839,
                    "",
                    "Pattern match failed, no pattern matched the value.",
                    { value: $2 }
                  )
                }
                let new_path = $2[0];
                let new_context = (() => {
                  let _record = context;
                  return new P10ReadContext(
                    _record.config,
                    new_stream,
                    new ReadPixelDataItem(vr$1),
                    _record.transfer_syntax,
                    new_path,
                    new_location,
                    _record.sequence_depth,
                  );
                })();
                return new Ok([toList([token]), new_context]);
              },
            );
          } else if (vr instanceof Some &&
          vr[0] instanceof $value_representation.OtherWordString &&
          $1 instanceof $value_length.Undefined &&
          (isEqual($, $dictionary.pixel_data.tag))) {
            let tag = $;
            let vr$1 = vr[0];
            let token = new $p10_token.SequenceStart(tag, vr$1);
            let new_location = (() => {
              let _pipe = $p10_location.add_sequence(
                context.location,
                tag,
                false,
                new None(),
              );
              return $result.map_error(
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
            })();
            return $result.try$(
              new_location,
              (new_location) => {
                let $2 = $data_set_path.add_data_element(context.path, tag);
                if (!$2.isOk()) {
                  throw makeError(
                    "let_assert",
                    "dcmfx_p10/p10_read",
                    839,
                    "",
                    "Pattern match failed, no pattern matched the value.",
                    { value: $2 }
                  )
                }
                let new_path = $2[0];
                let new_context = (() => {
                  let _record = context;
                  return new P10ReadContext(
                    _record.config,
                    new_stream,
                    new ReadPixelDataItem(vr$1),
                    _record.transfer_syntax,
                    new_path,
                    new_location,
                    _record.sequence_depth,
                  );
                })();
                return new Ok([toList([token]), new_context]);
              },
            );
          } else if (vr instanceof None &&
          $1 instanceof $value_length.Defined &&
          $1.length === 0 &&
          (isEqual($, $dictionary.sequence_delimitation_item.tag))) {
            let tag = $;
            let $2 = (() => {
              let $3 = $p10_location.end_sequence(context.location);
              if ($3.isOk()) {
                let tag$1 = $3[0][0];
                let new_location = $3[0][1];
                let $4 = $data_set_path.pop(context.path);
                if (!$4.isOk()) {
                  throw makeError(
                    "let_assert",
                    "dcmfx_p10/p10_read",
                    863,
                    "",
                    "Pattern match failed, no pattern matched the value.",
                    { value: $4 }
                  )
                }
                let new_path = $4[0];
                let new_sequence_depth = context.sequence_depth - 1;
                return [
                  toList([new $p10_token.SequenceDelimiter(tag$1)]),
                  new_path,
                  new_location,
                  new_sequence_depth,
                ];
              } else {
                return [
                  toList([]),
                  context.path,
                  context.location,
                  context.sequence_depth,
                ];
              }
            })();
            let tokens = $2[0];
            let new_path = $2[1];
            let new_location = $2[2];
            let new_sequence_depth = $2[3];
            let new_context = (() => {
              let _record = context;
              return new P10ReadContext(
                _record.config,
                new_stream,
                _record.next_action,
                _record.transfer_syntax,
                new_path,
                new_location,
                new_sequence_depth,
              );
            })();
            return new Ok([tokens, new_context]);
          } else if (vr instanceof None &&
          $1 instanceof $value_length.Defined &&
          $1.length === 0 &&
          (isEqual($, $dictionary.item_delimitation_item.tag))) {
            let tag = $;
            let token = new $p10_token.SequenceItemDelimiter();
            let new_location = (() => {
              let _pipe = $p10_location.end_item(context.location);
              return $result.map_error(
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
            })();
            return $result.try$(
              new_location,
              (new_location) => {
                let $2 = $data_set_path.pop(context.path);
                if (!$2.isOk()) {
                  throw makeError(
                    "let_assert",
                    "dcmfx_p10/p10_read",
                    918,
                    "",
                    "Pattern match failed, no pattern matched the value.",
                    { value: $2 }
                  )
                }
                let new_path = $2[0];
                let new_context = (() => {
                  let _record = context;
                  return new P10ReadContext(
                    _record.config,
                    new_stream,
                    _record.next_action,
                    _record.transfer_syntax,
                    new_path,
                    new_location,
                    _record.sequence_depth,
                  );
                })();
                return new Ok([toList([token]), new_context]);
              },
            );
          } else if (vr instanceof Some && $1 instanceof $value_length.Defined) {
            let tag = $;
            let vr$1 = vr[0];
            let length = $1.length;
            let materialized_value_required = is_materialized_value_required(
              context,
              header.tag,
              vr$1,
            );
            let max_size_check_result = (() => {
              let $2 = materialized_value_required && (length > context.config.max_string_size);
              if ($2) {
                return new Error(
                  new $p10_error.MaximumExceeded(
                    ((((((("Value for '" + $dictionary.tag_with_name(
                      header.tag,
                      new None(),
                    )) + "' with VR ") + $value_representation.to_string(vr$1)) + " and length ") + $int.to_string(
                      length,
                    )) + " bytes exceeds the maximum allowed string size of ") + $int.to_string(
                      context.config.max_string_size,
                    )) + " bytes",
                    context.path,
                    $byte_stream.bytes_read(context.stream),
                  ),
                );
              } else {
                return new Ok(undefined);
              }
            })();
            return $result.try$(
              max_size_check_result,
              (_) => {
                let emit_tokens = (!isEqual(
                  header.tag,
                  $dictionary.data_set_trailing_padding.tag
                )) && (header.tag.element !== 0x0);
                let tokens = (() => {
                  let $2 = emit_tokens && !materialized_value_required;
                  if ($2) {
                    return toList([
                      new $p10_token.DataElementHeader(header.tag, vr$1, length),
                    ]);
                  } else {
                    return toList([]);
                  }
                })();
                let next_action = new ReadDataElementValueBytes(
                  header.tag,
                  vr$1,
                  length,
                  length,
                  emit_tokens,
                );
                let new_location = (() => {
                  let _pipe = $p10_location.check_data_element_ordering(
                    context.location,
                    header.tag,
                  );
                  return $result.map_error(
                    _pipe,
                    (_) => {
                      return new $p10_error.DataInvalid(
                        "Reading data element header",
                        ("Data element '" + $data_element_header.to_string(
                          header,
                        )) + "' is not in ascending order",
                        context.path,
                        $byte_stream.bytes_read(context.stream),
                      );
                    },
                  );
                })();
                return $result.try$(
                  new_location,
                  (new_location) => {
                    let new_path = (() => {
                      let _pipe = $data_set_path.add_data_element(
                        context.path,
                        tag,
                      );
                      return $result.map_error(
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
                    })();
                    return $result.try$(
                      new_path,
                      (new_path) => {
                        let new_context = (() => {
                          let _record = context;
                          return new P10ReadContext(
                            _record.config,
                            new_stream,
                            next_action,
                            _record.transfer_syntax,
                            new_path,
                            new_location,
                            _record.sequence_depth,
                          );
                        })();
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
  let bytes_to_read = (() => {
    if (materialized_value_required) {
      return value_length;
    } else {
      return $int.min(bytes_remaining, context.config.max_token_size);
    }
  })();
  let $ = $byte_stream.read(context.stream, bytes_to_read);
  if ($.isOk()) {
    let data = $[0][0];
    let new_stream = $[0][1];
    let data$1 = (() => {
      let $1 = active_transfer_syntax(context).endianness;
      if ($1 instanceof LittleEndian) {
        return data;
      } else {
        return $p10_location.swap_endianness(context.location, tag, vr, data);
      }
    })();
    let bytes_remaining$1 = bytes_remaining - bytes_to_read;
    let materialized_value_result = (() => {
      if (materialized_value_required) {
        return process_materialized_data_element(context, tag, vr, data$1);
      } else {
        return new Ok([data$1, context.location]);
      }
    })();
    return $result.try$(
      materialized_value_result,
      (_use0) => {
        let data$2 = _use0[0];
        let new_location = _use0[1];
        let tokens = (() => {
          if (emit_tokens) {
            let value_bytes_token = new $p10_token.DataElementValueBytes(
              tag,
              vr,
              data$2,
              bytes_remaining$1,
            );
            if (materialized_value_required) {
              let length = $bit_array.byte_size(data$2);
              let max_length = (() => {
                let _pipe = vr;
                let _pipe$1 = $data_element_header.value_length_size(_pipe);
                return $data_element_header.value_length_size_max_length(
                  _pipe$1,
                );
              })();
              let $1 = length <= max_length;
              if ($1) {
                return new Ok(
                  toList([
                    new $p10_token.DataElementHeader(tag, vr, length),
                    value_bytes_token,
                  ]),
                );
              } else {
                return new Error(
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
              return new Ok(toList([value_bytes_token]));
            }
          } else {
            return new Ok(toList([]));
          }
        })();
        return $result.try$(
          tokens,
          (tokens) => {
            let next_action = (() => {
              if (bytes_remaining$1 === 0) {
                let $1 = isEqual(tag, $dictionary.item.tag);
                if ($1) {
                  return new ReadPixelDataItem(vr);
                } else {
                  return new ReadDataElementHeader();
                }
              } else {
                return new ReadDataElementValueBytes(
                  tag,
                  vr,
                  value_length,
                  bytes_remaining$1,
                  emit_tokens,
                );
              }
            })();
            let new_path = (() => {
              if (bytes_remaining$1 === 0) {
                let $1 = $data_set_path.pop(context.path);
                if (!$1.isOk()) {
                  throw makeError(
                    "let_assert",
                    "dcmfx_p10/p10_read",
                    1350,
                    "",
                    "Pattern match failed, no pattern matched the value.",
                    { value: $1 }
                  )
                }
                let path = $1[0];
                return path;
              } else {
                return context.path;
              }
            })();
            let new_context = (() => {
              let _record = context;
              return new P10ReadContext(
                _record.config,
                new_stream,
                next_action,
                _record.transfer_syntax,
                new_path,
                new_location,
                _record.sequence_depth,
              );
            })();
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
  if ($.isOk()) {
    let header = $[0][0];
    let new_stream = $[0][1];
    if (header instanceof DataElementHeader &&
    header.vr instanceof None &&
    header.length instanceof $value_length.Defined &&
    ((isEqual(header.tag, $dictionary.item.tag)) && (header.length.length !== 0xFFFFFFFF))) {
      let tag = header.tag;
      let length = header.length.length;
      let token = new $p10_token.PixelDataItem(length);
      let next_action = new ReadDataElementValueBytes(
        $dictionary.item.tag,
        vr,
        length,
        length,
        true,
      );
      let item_count = (() => {
        let _pipe = $p10_location.sequence_item_count(context.location);
        return $result.unwrap(_pipe, 1);
      })();
      let $1 = $data_set_path.add_sequence_item(context.path, item_count - 1);
      if (!$1.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_p10/p10_read",
          1466,
          "read_pixel_data_item_token",
          "Pattern match failed, no pattern matched the value.",
          { value: $1 }
        )
      }
      let new_path = $1[0];
      let new_context = (() => {
        let _record = context;
        return new P10ReadContext(
          _record.config,
          new_stream,
          next_action,
          _record.transfer_syntax,
          new_path,
          _record.location,
          _record.sequence_depth,
        );
      })();
      return new Ok([toList([token]), new_context]);
    } else if (header instanceof DataElementHeader &&
    header.vr instanceof None &&
    header.length instanceof $value_length.Defined &&
    header.length.length === 0 &&
    (isEqual(header.tag, $dictionary.sequence_delimitation_item.tag))) {
      let tag = header.tag;
      let token = new $p10_token.SequenceDelimiter($dictionary.pixel_data.tag);
      let new_location = (() => {
        let _pipe = $p10_location.end_sequence(context.location);
        return $result.map_error(
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
      })();
      return $result.try$(
        new_location,
        (_use0) => {
          let new_location$1 = _use0[1];
          let $1 = $data_set_path.pop(context.path);
          if (!$1.isOk()) {
            throw makeError(
              "let_assert",
              "dcmfx_p10/p10_read",
              1498,
              "",
              "Pattern match failed, no pattern matched the value.",
              { value: $1 }
            )
          }
          let new_path = $1[0];
          let next_action = new ReadDataElementHeader();
          let new_context = (() => {
            let _record = context;
            return new P10ReadContext(
              _record.config,
              new_stream,
              next_action,
              _record.transfer_syntax,
              new_path,
              new_location$1,
              _record.sequence_depth,
            );
          })();
          return new Ok([toList([token]), new_context]);
        },
      );
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

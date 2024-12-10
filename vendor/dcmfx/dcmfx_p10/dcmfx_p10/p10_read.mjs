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
import * as $p10_part from "../dcmfx_p10/p10_part.mjs";
import {
  Ok,
  Error,
  toList,
  CustomType as $CustomType,
  makeError,
  divideInt,
  isEqual,
  toBitArray,
  sizedInt,
} from "../gleam.mjs";

export class P10ReadConfig extends $CustomType {
  constructor(max_part_size, max_string_size, max_sequence_depth) {
    super();
    this.max_part_size = max_part_size;
    this.max_string_size = max_string_size;
    this.max_sequence_depth = max_sequence_depth;
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
  constructor(tag, vr, length, bytes_remaining, emit_parts) {
    super();
    this.tag = tag;
    this.vr = vr;
    this.length = length;
    this.bytes_remaining = bytes_remaining;
    this.emit_parts = emit_parts;
  }
}

class ReadPixelDataItem extends $CustomType {
  constructor(vr) {
    super();
    this.vr = vr;
  }
}

export function default_config() {
  return new P10ReadConfig(0xFFFFFFFE, 0xFFFFFFFE, 10_000);
}

export function with_config(context, config) {
  let max_part_size = (divideInt(config.max_part_size, 8)) * 8;
  let max_string_size = $int.max(config.max_string_size, max_part_size);
  let max_sequence_depth = $int.max(0, config.max_sequence_depth);
  let max_read_size = $int.max(config.max_string_size, config.max_part_size);
  let config$1 = new P10ReadConfig(
    max_part_size,
    max_string_size,
    max_sequence_depth,
  );
  return context.withFields({
    stream: $byte_stream.new$(max_read_size),
    config: config$1
  });
}

export function set_fallback_transfer_syntax(context, transfer_syntax) {
  return context.withFields({ transfer_syntax: transfer_syntax });
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

function next_delimiter_part(context) {
  let bytes_read = $byte_stream.bytes_read(context.stream);
  let $ = $p10_location.next_delimiter_part(context.location, bytes_read);
  if ($.isOk()) {
    let part = $[0][0];
    let new_location = $[0][1];
    let new_sequence_depth = (() => {
      if (part instanceof $p10_part.SequenceDelimiter) {
        return context.sequence_depth - 1;
      } else {
        return context.sequence_depth;
      }
    })();
    let new_path = (() => {
      if (part instanceof $p10_part.SequenceDelimiter) {
        let $1 = $data_set_path.pop(context.path);
        if (!$1.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_p10/p10_read",
            333,
            "next_delimiter_part",
            "Pattern match failed, no pattern matched the value.",
            { value: $1 }
          )
        }
        let path = $1[0];
        return path;
      } else if (part instanceof $p10_part.SequenceItemDelimiter) {
        let $1 = $data_set_path.pop(context.path);
        if (!$1.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_p10/p10_read",
            333,
            "next_delimiter_part",
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
    let new_context = context.withFields({
      path: new_path,
      location: new_location,
      sequence_depth: new_sequence_depth
    });
    return [toList([part]), new_context];
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
      return $value_representation.is_string(vr) && !($value_representation.is_encoded_string(
        vr,
      ) && $p10_location.is_specific_character_set_utf8_compatible(
        context.location,
      ));
    },
  );
}

function process_materialized_data_element(context, tag, vr, value_bytes) {
  let value_bytes$1 = (() => {
    let $ = $value_representation.is_string(vr);
    if ($) {
      let $1 = $value_representation.is_encoded_string(vr);
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
      new Some(context.path),
      new Some(offset),
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
    return new Ok(context.withFields({ stream: stream }));
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

function read_file_preamble_and_dicm_prefix_part(context) {
  let r = (() => {
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
            366,
            "read_file_preamble_and_dicm_prefix_part",
            "Pattern match failed, no pattern matched the value.",
            { value: $1 }
          )
        }
        let new_stream = $1[0];
        return new Ok([preamble, new_stream[1]]);
      } else {
        return new Ok([toBitArray([sizedInt(0, 8, true)]), context.stream]);
      }
    } else if (!$.isOk() && $[0] instanceof $byte_stream.DataEnd) {
      return new Ok([toBitArray([sizedInt(0, 8, true)]), context.stream]);
    } else {
      let e = $[0];
      return new Error(map_byte_stream_error(context, e, "Reading file header"));
    }
  })();
  return $result.try$(
    r,
    (_use0) => {
      let preamble = _use0[0];
      let new_stream = _use0[1];
      let part = new $p10_part.FilePreambleAndDICMPrefix(preamble);
      let new_context = context.withFields({
        stream: new_stream,
        next_action: new ReadFileMetaInformation(
          $byte_stream.bytes_read(new_stream),
        )
      });
      return new Ok([toList([part]), new_context]);
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
              481,
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
                      new Some($data_set_path.new_with_data_element(tag)),
                      new Some($byte_stream.bytes_read(context.stream)),
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
                          new Some($data_set_path.new_with_data_element(tag)),
                          new Some($byte_stream.bytes_read(context.stream)),
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
                              new Some(
                                $data_set_path.new_with_data_element(tag),
                              ),
                              new Some($byte_stream.bytes_read(context.stream)),
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
                                  539,
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
                                    547,
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
                                ($data_set.total_byte_size(fmi_data_set) + data_element_size) > context.config.max_part_size,
                                () => {
                                  return new Error(
                                    new $p10_error.MaximumExceeded(
                                      ("File Meta Information exceeds the max part size of " + $int.to_string(
                                        context.config.max_part_size,
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
                                          591,
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
                                            if ($3.isOk()) {
                                              let i = $3[0];
                                              return new Ok(
                                                new Some((starts_at + 12) + i),
                                              );
                                            } else {
                                              let e = $3[0];
                                              return new Error(
                                                new $p10_error.DataInvalid(
                                                  "Reading File Meta Information",
                                                  "Group length is invalid: " + $data_error.to_string(
                                                    e,
                                                  ),
                                                  new Some(
                                                    $data_set_path.new_with_data_element(
                                                      tag,
                                                    ),
                                                  ),
                                                  new Some(
                                                    $byte_stream.bytes_read(
                                                      context.stream,
                                                    ),
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
                                                      $data_error.path(e),
                                                      new Some(
                                                        $byte_stream.bytes_read(
                                                          context.stream,
                                                        ),
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
                                              let new_context = context.withFields({
                                                stream: new_stream,
                                                transfer_syntax: transfer_syntax
                                              });
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

function read_file_meta_information_part(context, starts_at) {
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
                new None(),
                new Some($byte_stream.bytes_read(context.stream)),
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
                  438,
                  "",
                  "Pattern match failed, no pattern matched the value.",
                  { value: $1 }
                )
              }
              let fmi_data_set$1 = $1[0];
              return fmi_data_set$1;
            }
          })();
          let new_context$1 = new_context.withFields({
            stream: new_stream,
            next_action: new ReadDataElementHeader()
          });
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
            1042,
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
            1046,
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
          1083,
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
        if (vr_bytes.byteAt(0) === 0x20 &&
        vr_bytes.byteAt(1) === 0x20 &&
        vr_bytes.length == 2) {
          return new Ok($p10_location.infer_vr_for_tag(context.location, tag));
        } else {
          return new Error(
            new $p10_error.DataInvalid(
              "Reading data element VR",
              ((("Unrecognized VR " + $bit_array.inspect(vr_bytes)) + " for tag '") + $dictionary.tag_with_name(
                tag,
                new None(),
              )) + "'",
              new Some(context.path),
              new Some($byte_stream.bytes_read(context.stream)),
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
                  1137,
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
                  1141,
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
                  1148,
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
                  1152,
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
              983,
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
              988,
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
      if (vr_serialization instanceof $transfer_syntax.VrExplicit) {
        return read_explicit_vr_and_length(context, tag);
      } else {
        return read_implicit_vr_and_length(context, tag);
      }
    },
  );
}

function read_data_element_header_part(context) {
  return $result.try$(
    read_data_element_header(context),
    (_use0) => {
      let header = _use0[0];
      let new_stream = _use0[1];
      let vr = (() => {
        let $ = header.vr;
        if ($ instanceof Some && $[0] instanceof $value_representation.Unknown) {
          return new Some(
            $p10_location.infer_vr_for_tag(context.location, header.tag),
          );
        } else {
          let vr = $;
          return vr;
        }
      })();
      let $ = header.tag;
      let $1 = header.length;
      if (vr instanceof Some && vr[0] instanceof $value_representation.Sequence) {
        let tag = $;
        let part = new $p10_part.SequenceStart(
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
                new Some(context.path),
                new Some($byte_stream.bytes_read(context.stream)),
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
                    727,
                    "",
                    "Pattern match failed, no pattern matched the value.",
                    { value: $2 }
                  )
                }
                let new_path = $2[0];
                let new_context = context.withFields({
                  stream: new_stream,
                  path: new_path,
                  location: new_location,
                  sequence_depth: context.sequence_depth + 1
                });
                return new Ok([toList([part]), new_context]);
              },
            );
          },
        );
      } else if (vr instanceof Some &&
      vr[0] instanceof $value_representation.Unknown &&
      $1 instanceof $value_length.Undefined) {
        let tag = $;
        let part = new $p10_part.SequenceStart(
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
                new Some(context.path),
                new Some($byte_stream.bytes_read(context.stream)),
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
                    727,
                    "",
                    "Pattern match failed, no pattern matched the value.",
                    { value: $2 }
                  )
                }
                let new_path = $2[0];
                let new_context = context.withFields({
                  stream: new_stream,
                  path: new_path,
                  location: new_location,
                  sequence_depth: context.sequence_depth + 1
                });
                return new Ok([toList([part]), new_context]);
              },
            );
          },
        );
      } else if (vr instanceof None && (isEqual($, $dictionary.item.tag))) {
        let tag = $;
        let part = new $p10_part.SequenceItemStart();
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
                new Some(context.path),
                new Some($byte_stream.bytes_read(context.stream)),
              );
            },
          );
        })();
        return $result.try$(
          new_location,
          (new_location) => {
            let item_count = (() => {
              let _pipe = $p10_location.sequence_item_count(new_location);
              return $result.unwrap(_pipe, 1);
            })();
            let $2 = $data_set_path.add_sequence_item(
              context.path,
              item_count - 1,
            );
            if (!$2.isOk()) {
              throw makeError(
                "let_assert",
                "dcmfx_p10/p10_read",
                767,
                "",
                "Pattern match failed, no pattern matched the value.",
                { value: $2 }
              )
            }
            let new_path = $2[0];
            let new_context = context.withFields({
              stream: new_stream,
              path: new_path,
              location: new_location
            });
            return new Ok([toList([part]), new_context]);
          },
        );
      } else if (vr instanceof Some &&
      vr[0] instanceof $value_representation.OtherByteString &&
      $1 instanceof $value_length.Undefined &&
      (isEqual($, $dictionary.pixel_data.tag))) {
        let tag = $;
        if (!(vr instanceof Some)) {
          throw makeError(
            "let_assert",
            "dcmfx_p10/p10_read",
            787,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: vr }
          )
        }
        let vr$1 = vr[0];
        let part = new $p10_part.SequenceStart(tag, vr$1);
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
                new Some(context.path),
                new Some($byte_stream.bytes_read(context.stream)),
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
                802,
                "",
                "Pattern match failed, no pattern matched the value.",
                { value: $2 }
              )
            }
            let new_path = $2[0];
            let new_context = context.withFields({
              stream: new_stream,
              next_action: new ReadPixelDataItem(vr$1),
              location: new_location,
              path: new_path
            });
            return new Ok([toList([part]), new_context]);
          },
        );
      } else if (vr instanceof Some &&
      vr[0] instanceof $value_representation.OtherWordString &&
      $1 instanceof $value_length.Undefined &&
      (isEqual($, $dictionary.pixel_data.tag))) {
        let tag = $;
        if (!(vr instanceof Some)) {
          throw makeError(
            "let_assert",
            "dcmfx_p10/p10_read",
            787,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: vr }
          )
        }
        let vr$1 = vr[0];
        let part = new $p10_part.SequenceStart(tag, vr$1);
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
                new Some(context.path),
                new Some($byte_stream.bytes_read(context.stream)),
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
                802,
                "",
                "Pattern match failed, no pattern matched the value.",
                { value: $2 }
              )
            }
            let new_path = $2[0];
            let new_context = context.withFields({
              stream: new_stream,
              next_action: new ReadPixelDataItem(vr$1),
              location: new_location,
              path: new_path
            });
            return new Ok([toList([part]), new_context]);
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
            let new_location = $3[0];
            let $4 = $data_set_path.pop(context.path);
            if (!$4.isOk()) {
              throw makeError(
                "let_assert",
                "dcmfx_p10/p10_read",
                826,
                "",
                "Pattern match failed, no pattern matched the value.",
                { value: $4 }
              )
            }
            let new_path = $4[0];
            let new_sequence_depth = context.sequence_depth - 1;
            return [
              toList([new $p10_part.SequenceDelimiter()]),
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
        let parts = $2[0];
        let new_path = $2[1];
        let new_location = $2[2];
        let new_sequence_depth = $2[3];
        let new_context = context.withFields({
          stream: new_stream,
          path: new_path,
          location: new_location,
          sequence_depth: new_sequence_depth
        });
        return new Ok([parts, new_context]);
      } else if (vr instanceof None &&
      $1 instanceof $value_length.Defined &&
      $1.length === 0 &&
      (isEqual($, $dictionary.item_delimitation_item.tag))) {
        let tag = $;
        let part = new $p10_part.SequenceItemDelimiter();
        let new_location = (() => {
          let _pipe = $p10_location.end_item(context.location);
          return $result.map_error(
            _pipe,
            (details) => {
              return new $p10_error.DataInvalid(
                "Reading data element header",
                details,
                new Some(context.path),
                new Some($byte_stream.bytes_read(context.stream)),
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
                881,
                "",
                "Pattern match failed, no pattern matched the value.",
                { value: $2 }
              )
            }
            let new_path = $2[0];
            let new_context = context.withFields({
              stream: new_stream,
              path: new_path,
              location: new_location
            });
            return new Ok([toList([part]), new_context]);
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
            let emit_parts = (!isEqual(
              header.tag,
              $dictionary.data_set_trailing_padding.tag
            )) && (header.tag.element !== 0x0);
            let parts = (() => {
              let $2 = emit_parts && !materialized_value_required;
              if ($2) {
                return toList([
                  new $p10_part.DataElementHeader(header.tag, vr$1, length),
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
              emit_parts,
            );
            let $2 = $data_set_path.add_data_element(context.path, tag);
            if (!$2.isOk()) {
              throw makeError(
                "let_assert",
                "dcmfx_p10/p10_read",
                945,
                "",
                "Pattern match failed, no pattern matched the value.",
                { value: $2 }
              )
            }
            let new_path = $2[0];
            let new_context = context.withFields({
              stream: new_stream,
              next_action: next_action,
              path: new_path
            });
            return new Ok([parts, new_context]);
          },
        );
      } else {
        return new Error(
          new $p10_error.DataInvalid(
            "Reading data element header",
            ("Invalid data element '" + $data_element_header.to_string(header)) + "'",
            new Some(context.path),
            new Some($byte_stream.bytes_read(context.stream)),
          ),
        );
      }
    },
  );
}

function read_data_element_value_bytes_part(
  context,
  tag,
  vr,
  value_length,
  bytes_remaining,
  emit_parts
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
      return $int.min(bytes_remaining, context.config.max_part_size);
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
        return $value_representation.swap_endianness(vr, data);
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
        let parts = (() => {
          if (emit_parts) {
            let value_bytes_part = new $p10_part.DataElementValueBytes(
              vr,
              data$2,
              bytes_remaining$1,
            );
            if (materialized_value_required) {
              return toList([
                new $p10_part.DataElementHeader(
                  tag,
                  vr,
                  $bit_array.byte_size(data$2),
                ),
                value_bytes_part,
              ]);
            } else {
              return toList([value_bytes_part]);
            }
          } else {
            return toList([]);
          }
        })();
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
              emit_parts,
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
                1249,
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
        let new_context = context.withFields({
          stream: new_stream,
          next_action: next_action,
          path: new_path,
          location: new_location
        });
        return new Ok([parts, new_context]);
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

function read_pixel_data_item_part(context, vr) {
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
      let part = new $p10_part.PixelDataItem(length);
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
          1355,
          "read_pixel_data_item_part",
          "Pattern match failed, no pattern matched the value.",
          { value: $1 }
        )
      }
      let new_path = $1[0];
      let new_context = context.withFields({
        stream: new_stream,
        next_action: next_action,
        path: new_path
      });
      return new Ok([toList([part]), new_context]);
    } else if (header instanceof DataElementHeader &&
    header.vr instanceof None &&
    header.length instanceof $value_length.Defined &&
    header.length.length === 0 &&
    (isEqual(header.tag, $dictionary.sequence_delimitation_item.tag))) {
      let tag = header.tag;
      let part = new $p10_part.SequenceDelimiter();
      let new_location = (() => {
        let _pipe = $p10_location.end_sequence(context.location);
        return $result.map_error(
          _pipe,
          (details) => {
            return new $p10_error.DataInvalid(
              "Reading encapsulated pixel data item",
              details,
              new Some(context.path),
              new Some($byte_stream.bytes_read(context.stream)),
            );
          },
        );
      })();
      return $result.try$(
        new_location,
        (new_location) => {
          let $1 = $data_set_path.pop(context.path);
          if (!$1.isOk()) {
            throw makeError(
              "let_assert",
              "dcmfx_p10/p10_read",
              1386,
              "",
              "Pattern match failed, no pattern matched the value.",
              { value: $1 }
            )
          }
          let new_path = $1[0];
          let next_action = new ReadDataElementHeader();
          let new_context = context.withFields({
            stream: new_stream,
            next_action: next_action,
            location: new_location,
            path: new_path
          });
          return new Ok([toList([part]), new_context]);
        },
      );
    } else {
      return new Error(
        new $p10_error.DataInvalid(
          "Reading encapsulated pixel data item",
          ("Invalid data element '" + $data_element_header.to_string(header)) + "'",
          new Some(context.path),
          new Some($byte_stream.bytes_read(context.stream)),
        ),
      );
    }
  } else {
    let e = $[0];
    return new Error(e);
  }
}

export function read_parts(context) {
  let $ = context.next_action;
  if ($ instanceof ReadFilePreambleAndDICMPrefix) {
    return read_file_preamble_and_dicm_prefix_part(context);
  } else if ($ instanceof ReadFileMetaInformation) {
    let starts_at = $.starts_at;
    return $result.map(
      read_file_meta_information_part(context, starts_at),
      (_use0) => {
        let fmi_data_set = _use0[0];
        let new_context = _use0[1];
        return [
          toList([new $p10_part.FileMetaInformation(fmi_data_set)]),
          new_context,
        ];
      },
    );
  } else if ($ instanceof ReadDataElementHeader) {
    let delimiter_part = next_delimiter_part(context);
    return $bool.guard(
      !isEqual(delimiter_part[0], toList([])),
      new Ok(delimiter_part),
      () => {
        let $1 = $byte_stream.is_fully_consumed(context.stream);
        if ($1) {
          let parts = $p10_location.pending_delimiter_parts(context.location);
          return new Ok([parts, context]);
        } else {
          return read_data_element_header_part(context);
        }
      },
    );
  } else if ($ instanceof ReadDataElementValueBytes) {
    let tag = $.tag;
    let vr = $.vr;
    let value_length = $.length;
    let bytes_remaining = $.bytes_remaining;
    let emit_parts = $.emit_parts;
    return read_data_element_value_bytes_part(
      context,
      tag,
      vr,
      value_length,
      bytes_remaining,
      emit_parts,
    );
  } else {
    let vr = $.vr;
    return read_pixel_data_item_part(context, vr);
  }
}

/// <reference types="./pixel_data_filter.d.mts" />
import * as $bigi from "../../bigi/bigi.mjs";
import * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $data_error from "../../dcmfx_core/dcmfx_core/data_error.mjs";
import * as $data_set from "../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $dictionary from "../../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $bit_array_utils from "../../dcmfx_core/dcmfx_core/internal/bit_array_utils.mjs";
import * as $value_representation from "../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $p10_error from "../../dcmfx_p10/dcmfx_p10/p10_error.mjs";
import * as $p10_token from "../../dcmfx_p10/dcmfx_p10/p10_token.mjs";
import * as $p10_custom_type_transform from "../../dcmfx_p10/dcmfx_p10/transforms/p10_custom_type_transform.mjs";
import * as $p10_filter_transform from "../../dcmfx_p10/dcmfx_p10/transforms/p10_filter_transform.mjs";
import * as $deque from "../../gleam_deque/gleam/deque.mjs";
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../gleam_stdlib/gleam/bool.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $pixel_data_frame from "../dcmfx_pixel_data/pixel_data_frame.mjs";
import {
  Ok,
  Error,
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  remainderInt,
  divideInt,
  isEqual,
  toBitArray,
} from "../gleam.mjs";

class PixelDataFilter extends $CustomType {
  constructor(is_encapsulated, details, pixel_data_filter, native_pixel_data_frame_size, pixel_data, pixel_data_write_offset, pixel_data_read_offset, offset_table, next_frame_index) {
    super();
    this.is_encapsulated = is_encapsulated;
    this.details = details;
    this.pixel_data_filter = pixel_data_filter;
    this.native_pixel_data_frame_size = native_pixel_data_frame_size;
    this.pixel_data = pixel_data;
    this.pixel_data_write_offset = pixel_data_write_offset;
    this.pixel_data_read_offset = pixel_data_read_offset;
    this.offset_table = offset_table;
    this.next_frame_index = next_frame_index;
  }
}

class PixelDataFilterDetails extends $CustomType {
  constructor(number_of_frames, extended_offset_table, extended_offset_table_lengths) {
    super();
    this.number_of_frames = number_of_frames;
    this.extended_offset_table = extended_offset_table;
    this.extended_offset_table_lengths = extended_offset_table_lengths;
  }
}

export class P10Error extends $CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
}

export class DataError extends $CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
}

function pixel_data_filter_details_from_data_set(data_set) {
  return new Ok(
    new PixelDataFilterDetails(
      $data_set.delete$(data_set, $dictionary.number_of_frames.tag)[0],
      $data_set.delete$(data_set, $dictionary.extended_offset_table.tag)[0],
      $data_set.delete$(data_set, $dictionary.extended_offset_table_lengths.tag)[0],
    ),
  );
}

export function new$() {
  let details = $p10_custom_type_transform.new$(
    toList([
      $dictionary.number_of_frames.tag,
      $dictionary.extended_offset_table.tag,
      $dictionary.extended_offset_table_lengths.tag,
    ]),
    pixel_data_filter_details_from_data_set,
  );
  let pixel_data_filter = $p10_filter_transform.new$(
    (tag, _, location) => {
      return (isEqual(tag, $dictionary.pixel_data.tag)) && (isEqual(
        location,
        toList([])
      ));
    },
  );
  return new PixelDataFilter(
    false,
    details,
    pixel_data_filter,
    0,
    $deque.new$(),
    0,
    0,
    new None(),
    0,
  );
}

function get_number_of_frames(filter) {
  let $ = $p10_custom_type_transform.get_output(filter.details);
  if ($ instanceof Some &&
  $[0] instanceof PixelDataFilterDetails &&
  $[0].number_of_frames instanceof Some) {
    let number_of_frames = $[0].number_of_frames[0];
    let number_of_frames$1 = (() => {
      let _pipe = $data_element_value.get_int(number_of_frames);
      return $result.map_error(_pipe, (var0) => { return new DataError(var0); });
    })();
    return $result.try$(
      number_of_frames$1,
      (number_of_frames) => {
        return $bool.guard(
          number_of_frames < 0,
          new Error(
            new DataError(
              $data_error.new_value_invalid(
                "Invalid number of frames value: " + $int.to_string(
                  number_of_frames,
                ),
              ),
            ),
          ),
          () => { return new Ok(number_of_frames); },
        );
      },
    );
  } else {
    return new Ok(1);
  }
}

function get_pending_native_frame(loop$filter, loop$frame) {
  while (true) {
    let filter = loop$filter;
    let frame = loop$frame;
    let frame_size = filter.native_pixel_data_frame_size;
    let frame_length = $pixel_data_frame.length(frame);
    let $ = $pixel_data_frame.length(frame) < frame_size;
    if ($) {
      let $1 = (() => {
        let _pipe = filter.pixel_data;
        return $deque.pop_front(_pipe);
      })();
      if (!$1.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_pixel_data/pixel_data_filter",
          346,
          "get_pending_native_frame",
          "Pattern match failed, no pattern matched the value.",
          { value: $1 }
        )
      }
      let chunk = $1[0][0];
      let pixel_data = $1[0][1];
      let chunk_length = $bit_array.byte_size(chunk);
      let filter$1 = (() => {
        let _record = filter;
        return new PixelDataFilter(
          _record.is_encapsulated,
          _record.details,
          _record.pixel_data_filter,
          _record.native_pixel_data_frame_size,
          pixel_data,
          _record.pixel_data_write_offset,
          _record.pixel_data_read_offset,
          _record.offset_table,
          _record.next_frame_index,
        );
      })();
      let $2 = chunk_length <= (frame_size - frame_length);
      if ($2) {
        let frame$1 = $pixel_data_frame.push_fragment(frame, chunk);
        let filter$2 = (() => {
          let _record = filter$1;
          return new PixelDataFilter(
            _record.is_encapsulated,
            _record.details,
            _record.pixel_data_filter,
            _record.native_pixel_data_frame_size,
            pixel_data,
            _record.pixel_data_write_offset,
            filter$1.pixel_data_read_offset + chunk_length,
            _record.offset_table,
            _record.next_frame_index,
          );
        })();
        loop$filter = filter$2;
        loop$frame = frame$1;
      } else {
        let length = frame_size - frame_length;
        let $3 = $bit_array.slice(chunk, 0, length);
        if (!$3.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_pixel_data/pixel_data_filter",
            374,
            "get_pending_native_frame",
            "Pattern match failed, no pattern matched the value.",
            { value: $3 }
          )
        }
        let fragment = $3[0];
        let frame$1 = (() => {
          let _pipe = frame;
          return $pixel_data_frame.push_fragment(_pipe, fragment);
        })();
        let $4 = $bit_array.slice(chunk, length, chunk_length - length);
        if (!$4.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_pixel_data/pixel_data_filter",
            379,
            "get_pending_native_frame",
            "Pattern match failed, no pattern matched the value.",
            { value: $4 }
          )
        }
        let chunk$1 = $4[0];
        let pixel_data$1 = (() => {
          let _pipe = filter$1.pixel_data;
          return $deque.push_front(_pipe, chunk$1);
        })();
        let filter$2 = (() => {
          let _record = filter$1;
          return new PixelDataFilter(
            _record.is_encapsulated,
            _record.details,
            _record.pixel_data_filter,
            _record.native_pixel_data_frame_size,
            pixel_data$1,
            _record.pixel_data_write_offset,
            filter$1.pixel_data_read_offset + length,
            _record.offset_table,
            _record.next_frame_index,
          );
        })();
        return [frame$1, filter$2];
      }
    } else {
      return [frame, filter];
    }
  }
}

function get_pending_native_frames(loop$filter, loop$frames) {
  while (true) {
    let filter = loop$filter;
    let frames = loop$frames;
    let $ = (filter.pixel_data_write_offset - filter.pixel_data_read_offset) < filter.native_pixel_data_frame_size;
    if ($) {
      return new Ok([$list.reverse(frames), filter]);
    } else {
      let frame_index = filter.next_frame_index;
      let filter$1 = (() => {
        let _record = filter;
        return new PixelDataFilter(
          _record.is_encapsulated,
          _record.details,
          _record.pixel_data_filter,
          _record.native_pixel_data_frame_size,
          _record.pixel_data,
          _record.pixel_data_write_offset,
          _record.pixel_data_read_offset,
          _record.offset_table,
          frame_index + 1,
        );
      })();
      let $1 = get_pending_native_frame(
        filter$1,
        $pixel_data_frame.new$(frame_index),
      );
      let frame = $1[0];
      let filter$2 = $1[1];
      loop$filter = filter$2;
      loop$frames = listPrepend(frame, frames);
    }
  }
}

function get_pending_encapsulated_frame(
  loop$filter,
  loop$frame,
  loop$next_offset
) {
  while (true) {
    let filter = loop$filter;
    let frame = loop$frame;
    let next_offset = loop$next_offset;
    let $ = filter.pixel_data_read_offset < next_offset;
    if ($) {
      let $1 = $deque.pop_front(filter.pixel_data);
      if ($1.isOk()) {
        let chunk = $1[0][0];
        let pixel_data = $1[0][1];
        let frame$1 = (() => {
          let _pipe = frame;
          return $pixel_data_frame.push_fragment(_pipe, chunk);
        })();
        let pixel_data_read_offset = (filter.pixel_data_read_offset + 8) + $bit_array.byte_size(
          chunk,
        );
        let filter$1 = (() => {
          let _record = filter;
          return new PixelDataFilter(
            _record.is_encapsulated,
            _record.details,
            _record.pixel_data_filter,
            _record.native_pixel_data_frame_size,
            pixel_data,
            _record.pixel_data_write_offset,
            pixel_data_read_offset,
            _record.offset_table,
            _record.next_frame_index,
          );
        })();
        loop$filter = filter$1;
        loop$frame = frame$1;
        loop$next_offset = next_offset;
      } else {
        return [frame, filter];
      }
    } else {
      return [frame, filter];
    }
  }
}

function apply_length_to_frame(frame, frame_length) {
  let $ = $pixel_data_frame.length(frame);
  if ($ === frame_length) {
    let len = $;
    return new Ok(frame);
  } else if ($ > frame_length) {
    let len = $;
    return new Ok($pixel_data_frame.drop_end_bytes(frame, len - frame_length));
  } else {
    let _pipe = $data_error.new_value_invalid(
      ((("Extended Offset Table Length value '" + $int.to_string(frame_length)) + "' is invalid for frame of length '") + $int.to_string(
        $pixel_data_frame.length(frame),
      )) + "'",
    );
    let _pipe$1 = new DataError(_pipe);
    return new Error(_pipe$1);
  }
}

function get_pending_encapsulated_frames_using_offset_table(
  filter,
  offset_table,
  frames
) {
  if (offset_table.atLeastLength(2)) {
    let frame_length = offset_table.head[1];
    let offset = offset_table.tail.head[0];
    return $bool.guard(
      filter.pixel_data_write_offset < offset,
      new Ok([frames, filter]),
      () => {
        let frame_index = filter.next_frame_index;
        let filter$1 = (() => {
          let _record = filter;
          return new PixelDataFilter(
            _record.is_encapsulated,
            _record.details,
            _record.pixel_data_filter,
            _record.native_pixel_data_frame_size,
            _record.pixel_data,
            _record.pixel_data_write_offset,
            _record.pixel_data_read_offset,
            _record.offset_table,
            frame_index + 1,
          );
        })();
        let $ = get_pending_encapsulated_frame(
          filter$1,
          $pixel_data_frame.new$(frame_index),
          offset,
        );
        let frame = $[0];
        let filter$2 = $[1];
        let $1 = $list.rest(offset_table);
        if (!$1.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_pixel_data/pixel_data_filter",
            493,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: $1 }
          )
        }
        let offset_table$1 = $1[0];
        let filter$3 = (() => {
          let _record = filter$2;
          return new PixelDataFilter(
            _record.is_encapsulated,
            _record.details,
            _record.pixel_data_filter,
            _record.native_pixel_data_frame_size,
            _record.pixel_data,
            _record.pixel_data_write_offset,
            _record.pixel_data_read_offset,
            new Some(offset_table$1),
            _record.next_frame_index,
          );
        })();
        return $bool.guard(
          filter$3.pixel_data_read_offset !== offset,
          new Error(
            new DataError(
              $data_error.new_value_invalid(
                "Pixel data offset table is malformed",
              ),
            ),
          ),
          () => {
            let frame$1 = (() => {
              if (frame_length instanceof Some) {
                let frame_length$1 = frame_length[0];
                return apply_length_to_frame(frame, frame_length$1);
              } else {
                return new Ok(frame);
              }
            })();
            return $result.try$(
              frame$1,
              (frame) => {
                return get_pending_encapsulated_frames_using_offset_table(
                  filter$3,
                  offset_table$1,
                  listPrepend(frame, frames),
                );
              },
            );
          },
        );
      },
    );
  } else {
    return new Ok([$list.reverse(frames), filter]);
  }
}

function is_list_sorted(loop$list) {
  while (true) {
    let list = loop$list;
    if (list.atLeastLength(2)) {
      let a = list.head;
      let b = list.tail.head;
      let rest = list.tail.tail;
      let $ = a <= b;
      if ($) {
        loop$list = listPrepend(b, rest);
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}

function read_basic_offset_table(filter) {
  let offset_table_data = (() => {
    let _pipe = filter.pixel_data;
    let _pipe$1 = $deque.to_list(_pipe);
    return $bit_array.concat(_pipe$1);
  })();
  return $bool.guard(
    isEqual(offset_table_data, toBitArray([])),
    new Ok(toList([])),
    () => {
      let offsets = (() => {
        let _pipe = $bit_array_utils.to_uint32_list(offset_table_data);
        return $result.map_error(
          _pipe,
          (_) => {
            return new DataError(
              $data_error.new_value_invalid(
                "Basic Offset Table length is not a multiple of 4",
              ),
            );
          },
        );
      })();
      return $result.try$(
        offsets,
        (offsets) => {
          return $bool.guard(
            !isEqual($list.first(offsets), new Ok(0)),
            new Error(
              new DataError(
                $data_error.new_value_invalid(
                  "Basic Offset Table first value must be zero",
                ),
              ),
            ),
            () => {
              return $bool.guard(
                !is_list_sorted(offsets),
                new Error(
                  new DataError(
                    $data_error.new_value_invalid(
                      "Basic Offset Table values are not sorted",
                    ),
                  ),
                ),
                () => {
                  let _pipe = offsets;
                  let _pipe$1 = $list.map(
                    _pipe,
                    (offset) => { return [offset, new None()]; },
                  );
                  return new Ok(_pipe$1);
                },
              );
            },
          );
        },
      );
    },
  );
}

function read_extended_offset_table(filter) {
  let $ = $p10_custom_type_transform.get_output(filter.details);
  if ($ instanceof Some &&
  $[0] instanceof PixelDataFilterDetails &&
  $[0].extended_offset_table instanceof Some &&
  $[0].extended_offset_table_lengths instanceof Some) {
    let extended_offset_table = $[0].extended_offset_table[0];
    let extended_offset_table_lengths = $[0].extended_offset_table_lengths[0];
    let extended_offset_table$1 = (() => {
      let _pipe = extended_offset_table;
      let _pipe$1 = $data_element_value.vr_bytes(
        _pipe,
        toList([new $value_representation.OtherVeryLongString()]),
      );
      let _pipe$2 = $result.then$(
        _pipe$1,
        (bytes) => {
          let _pipe$2 = $bit_array_utils.to_uint64_list(bytes);
          return $result.replace_error(
            _pipe$2,
            $data_error.new_value_invalid(
              "Extended Offset Table has invalid size",
            ),
          );
        },
      );
      return $result.map_error(
        _pipe$2,
        (var0) => { return new DataError(var0); },
      );
    })();
    return $result.try$(
      extended_offset_table$1,
      (extended_offset_table) => {
        let extended_offset_table$1 = (() => {
          let _pipe = extended_offset_table;
          let _pipe$1 = $list.map(_pipe, $bigi.to_int);
          let _pipe$2 = $result.all(_pipe$1);
          return $result.replace_error(
            _pipe$2,
            new DataError(
              $data_error.new_value_invalid(
                "Extended Offset Table has a value greater than 2^53 - 1",
              ),
            ),
          );
        })();
        return $result.try$(
          extended_offset_table$1,
          (extended_offset_table) => {
            let extended_offset_table_lengths$1 = (() => {
              let _pipe = extended_offset_table_lengths;
              let _pipe$1 = $data_element_value.vr_bytes(
                _pipe,
                toList([new $value_representation.OtherVeryLongString()]),
              );
              let _pipe$2 = $result.then$(
                _pipe$1,
                (bytes) => {
                  let _pipe$2 = $bit_array_utils.to_uint64_list(bytes);
                  return $result.replace_error(
                    _pipe$2,
                    $data_error.new_value_invalid(
                      "Extended Offset Table Lengths has invalid size",
                    ),
                  );
                },
              );
              return $result.map_error(
                _pipe$2,
                (var0) => { return new DataError(var0); },
              );
            })();
            return $result.try$(
              extended_offset_table_lengths$1,
              (extended_offset_table_lengths) => {
                let extended_offset_table_lengths$1 = (() => {
                  let _pipe = extended_offset_table_lengths;
                  let _pipe$1 = $list.map(_pipe, $bigi.to_int);
                  let _pipe$2 = $result.all(_pipe$1);
                  return $result.replace_error(
                    _pipe$2,
                    new DataError(
                      $data_error.new_value_invalid(
                        "Extended Offset Table Lengths has a value greater than 2^53 - 1",
                      ),
                    ),
                  );
                })();
                return $result.try$(
                  extended_offset_table_lengths$1,
                  (extended_offset_table_lengths) => {
                    return $bool.guard(
                      $list.length(extended_offset_table) !== $list.length(
                        extended_offset_table_lengths,
                      ),
                      new Error(
                        new DataError(
                          $data_error.new_value_invalid(
                            "Extended Offset Table and Lengths don't have the same number of items",
                          ),
                        ),
                      ),
                      () => {
                        return $bool.guard(
                          (() => {
                            let _pipe = $list.first(extended_offset_table);
                            return $result.unwrap(_pipe, 0);
                          })() !== 0,
                          new Error(
                            new DataError(
                              $data_error.new_value_invalid(
                                "Extended Offset Table first value must be zero",
                              ),
                            ),
                          ),
                          () => {
                            return $bool.guard(
                              !is_list_sorted(extended_offset_table),
                              new Error(
                                new DataError(
                                  $data_error.new_value_invalid(
                                    "Extended Offset Table values are not sorted",
                                  ),
                                ),
                              ),
                              () => {
                                let _pipe = $list.map2(
                                  extended_offset_table,
                                  extended_offset_table_lengths,
                                  (offset, length) => {
                                    return [offset, new Some(length)];
                                  },
                                );
                                let _pipe$1 = new Some(_pipe);
                                return new Ok(_pipe$1);
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
  } else {
    return new Ok(new None());
  }
}

function read_offset_table(filter) {
  return $result.try$(
    read_basic_offset_table(filter),
    (basic_offset_table) => {
      return $result.try$(
        read_extended_offset_table(filter),
        (extended_offset_table) => {
          if (basic_offset_table.hasLength(0)) {
            let _pipe = extended_offset_table;
            let _pipe$1 = $option.unwrap(_pipe, toList([]));
            return new Ok(_pipe$1);
          } else {
            return $bool.guard(
              $option.is_some(extended_offset_table),
              new Error(
                new DataError(
                  $data_error.new_value_invalid(
                    "Extended Offset Table must be absent when there is a Basic Offset " + "Table",
                  ),
                ),
              ),
              () => { return new Ok(basic_offset_table); },
            );
          }
        },
      );
    },
  );
}

function get_pending_encapsulated_frames(filter) {
  let $ = filter.offset_table;
  if ($ instanceof None) {
    return $result.try$(
      read_offset_table(filter),
      (offset_table) => {
        let filter$1 = (() => {
          let _record = filter;
          return new PixelDataFilter(
            _record.is_encapsulated,
            _record.details,
            _record.pixel_data_filter,
            _record.native_pixel_data_frame_size,
            $deque.new$(),
            0,
            0,
            new Some(offset_table),
            _record.next_frame_index,
          );
        })();
        return new Ok([toList([]), filter$1]);
      },
    );
  } else {
    let offset_table = $[0];
    if (offset_table.hasLength(0)) {
      return $result.map(
        get_number_of_frames(filter),
        (number_of_frames) => {
          let $1 = number_of_frames > 1;
          if ($1) {
            let frame_index = filter.next_frame_index;
            let filter$1 = (() => {
              let _record = filter;
              return new PixelDataFilter(
                _record.is_encapsulated,
                _record.details,
                _record.pixel_data_filter,
                _record.native_pixel_data_frame_size,
                _record.pixel_data,
                _record.pixel_data_write_offset,
                _record.pixel_data_read_offset,
                _record.offset_table,
                frame_index + 1,
              );
            })();
            let frame = (() => {
              let _pipe = filter$1.pixel_data;
              let _pipe$1 = $deque.to_list(_pipe);
              return $list.fold(
                _pipe$1,
                $pixel_data_frame.new$(frame_index),
                (frame, chunk) => {
                  return $pixel_data_frame.push_fragment(frame, chunk);
                },
              );
            })();
            let filter$2 = (() => {
              let _record = filter$1;
              return new PixelDataFilter(
                _record.is_encapsulated,
                _record.details,
                _record.pixel_data_filter,
                _record.native_pixel_data_frame_size,
                $deque.new$(),
                _record.pixel_data_write_offset,
                filter$1.pixel_data_write_offset,
                _record.offset_table,
                _record.next_frame_index,
              );
            })();
            return [toList([frame]), filter$2];
          } else {
            return [toList([]), filter];
          }
        },
      );
    } else {
      let offset_table$1 = offset_table;
      return get_pending_encapsulated_frames_using_offset_table(
        filter,
        offset_table$1,
        toList([]),
      );
    }
  }
}

function process_next_pixel_data_token(filter, token) {
  if (token instanceof $p10_token.DataElementHeader) {
    let length = token.length;
    return $result.try$(
      get_number_of_frames(filter),
      (number_of_frames) => {
        return $bool.guard(
          (number_of_frames !== 0) && ((remainderInt(length, number_of_frames)) !== 0),
          new Error(
            new DataError(
              $data_error.new_value_invalid(
                ((("Multi-frame pixel data of length " + $int.to_string(length)) + " bytes does not divide evenly into ") + $int.to_string(
                  number_of_frames,
                )) + " frames",
              ),
            ),
          ),
          () => {
            let native_pixel_data_frame_size = (() => {
              let $ = number_of_frames === 0;
              if ($) {
                return 0;
              } else {
                return divideInt(length, number_of_frames);
              }
            })();
            let filter$1 = (() => {
              let _record = filter;
              return new PixelDataFilter(
                false,
                _record.details,
                _record.pixel_data_filter,
                native_pixel_data_frame_size,
                _record.pixel_data,
                _record.pixel_data_write_offset,
                _record.pixel_data_read_offset,
                _record.offset_table,
                _record.next_frame_index,
              );
            })();
            return new Ok([toList([]), filter$1]);
          },
        );
      },
    );
  } else if (token instanceof $p10_token.SequenceStart) {
    let filter$1 = (() => {
      let _record = filter;
      return new PixelDataFilter(
        true,
        _record.details,
        _record.pixel_data_filter,
        _record.native_pixel_data_frame_size,
        _record.pixel_data,
        _record.pixel_data_write_offset,
        _record.pixel_data_read_offset,
        _record.offset_table,
        _record.next_frame_index,
      );
    })();
    return new Ok([toList([]), filter$1]);
  } else if (token instanceof $p10_token.SequenceDelimiter) {
    let frames = (() => {
      let $ = (() => {
        let _pipe = filter.pixel_data;
        return $deque.is_empty(_pipe);
      })();
      if ($) {
        return new Ok(toList([]));
      } else {
        let frame_index = filter.next_frame_index;
        let filter$1 = (() => {
          let _record = filter;
          return new PixelDataFilter(
            _record.is_encapsulated,
            _record.details,
            _record.pixel_data_filter,
            _record.native_pixel_data_frame_size,
            _record.pixel_data,
            _record.pixel_data_write_offset,
            _record.pixel_data_read_offset,
            _record.offset_table,
            frame_index + 1,
          );
        })();
        let frame = (() => {
          let _pipe = filter$1.pixel_data;
          let _pipe$1 = $deque.to_list(_pipe);
          return $list.fold(
            _pipe$1,
            $pixel_data_frame.new$(frame_index),
            $pixel_data_frame.push_fragment,
          );
        })();
        let frame$1 = (() => {
          let $1 = filter$1.offset_table;
          if ($1 instanceof Some) {
            let offset_table = $1[0];
            if (offset_table.atLeastLength(1) &&
            offset_table.head[1] instanceof Some) {
              let frame_length = offset_table.head[1][0];
              return apply_length_to_frame(frame, frame_length);
            } else {
              return new Ok(frame);
            }
          } else {
            return new Ok(frame);
          }
        })();
        return $result.map(frame$1, (frame) => { return toList([frame]); });
      }
    })();
    return $result.map(frames, (frames) => { return [frames, filter]; });
  } else if (token instanceof $p10_token.PixelDataItem) {
    let filter$1 = (() => {
      let _record = filter;
      return new PixelDataFilter(
        _record.is_encapsulated,
        _record.details,
        _record.pixel_data_filter,
        _record.native_pixel_data_frame_size,
        _record.pixel_data,
        filter.pixel_data_write_offset + 8,
        _record.pixel_data_read_offset,
        _record.offset_table,
        _record.next_frame_index,
      );
    })();
    return new Ok([toList([]), filter$1]);
  } else if (token instanceof $p10_token.DataElementValueBytes) {
    let data = token.data;
    let bytes_remaining = token.bytes_remaining;
    let pixel_data = (() => {
      let _pipe = filter.pixel_data;
      return $deque.push_back(_pipe, data);
    })();
    let pixel_data_write_offset = filter.pixel_data_write_offset + $bit_array.byte_size(
      data,
    );
    let filter$1 = (() => {
      let _record = filter;
      return new PixelDataFilter(
        _record.is_encapsulated,
        _record.details,
        _record.pixel_data_filter,
        _record.native_pixel_data_frame_size,
        pixel_data,
        pixel_data_write_offset,
        _record.pixel_data_read_offset,
        _record.offset_table,
        _record.next_frame_index,
      );
    })();
    let $ = filter$1.is_encapsulated;
    if ($) {
      if (bytes_remaining === 0) {
        return get_pending_encapsulated_frames(filter$1);
      } else {
        return new Ok([toList([]), filter$1]);
      }
    } else {
      let $1 = filter$1.native_pixel_data_frame_size > 0;
      if ($1) {
        return get_pending_native_frames(filter$1, toList([]));
      } else {
        return new Ok([toList([]), filter$1]);
      }
    }
  } else {
    return new Ok([toList([]), filter]);
  }
}

export function add_token(filter, token) {
  let details = (() => {
    let _pipe = $p10_custom_type_transform.add_token(filter.details, token);
    return $result.map_error(
      _pipe,
      (e) => {
        if (e instanceof $p10_custom_type_transform.DataError) {
          let e$1 = e[0];
          return new DataError(e$1);
        } else {
          let e$1 = e[0];
          return new P10Error(e$1);
        }
      },
    );
  })();
  return $result.try$(
    details,
    (details) => {
      let filter$1 = (() => {
        let _record = filter;
        return new PixelDataFilter(
          _record.is_encapsulated,
          details,
          _record.pixel_data_filter,
          _record.native_pixel_data_frame_size,
          _record.pixel_data,
          _record.pixel_data_write_offset,
          _record.pixel_data_read_offset,
          _record.offset_table,
          _record.next_frame_index,
        );
      })();
      return $bool.guard(
        $p10_token.is_header_token(token),
        new Ok([toList([]), filter$1]),
        () => {
          let $ = $p10_filter_transform.add_token(
            filter$1.pixel_data_filter,
            token,
          );
          let is_pixel_data_token = $[0];
          let pixel_data_filter = $[1];
          let filter$2 = (() => {
            let _record = filter$1;
            return new PixelDataFilter(
              _record.is_encapsulated,
              _record.details,
              pixel_data_filter,
              _record.native_pixel_data_frame_size,
              _record.pixel_data,
              _record.pixel_data_write_offset,
              _record.pixel_data_read_offset,
              _record.offset_table,
              _record.next_frame_index,
            );
          })();
          return $bool.guard(
            !is_pixel_data_token,
            new Ok([toList([]), filter$2]),
            () => { return process_next_pixel_data_token(filter$2, token); },
          );
        },
      );
    },
  );
}

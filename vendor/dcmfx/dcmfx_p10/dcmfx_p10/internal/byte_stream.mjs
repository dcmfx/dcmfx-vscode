/// <reference types="./byte_stream.d.mts" />
import * as $deque from "../../../gleam_deque/gleam/deque.mjs";
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $zlib from "../../dcmfx_p10/internal/zlib.mjs";
import * as $inflate_result from "../../dcmfx_p10/internal/zlib/inflate_result.mjs";
import {
  Ok,
  Error,
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
  toBitArray,
} from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_p10/internal/byte_stream.gleam";

class ByteStream extends $CustomType {
  constructor(bytes_queue, bytes_queue_size, bytes_read, max_read_size, is_writing_finished, zlib_stream, zlib_inflate_complete) {
    super();
    this.bytes_queue = bytes_queue;
    this.bytes_queue_size = bytes_queue_size;
    this.bytes_read = bytes_read;
    this.max_read_size = max_read_size;
    this.is_writing_finished = is_writing_finished;
    this.zlib_stream = zlib_stream;
    this.zlib_inflate_complete = zlib_inflate_complete;
  }
}

export class ReadOversized extends $CustomType {}

export class DataRequired extends $CustomType {}

export class DataEnd extends $CustomType {}

export class ZlibDataError extends $CustomType {}

export class WriteAfterCompletion extends $CustomType {}

/**
 * Creates a new empty byte stream with the given maximum read size.
 *
 * The max read size is a limit on the maximum number of bytes that can be read
 * or peeked in the byte stream in a single call, which helps to protect
 * against zlib bombs.
 */
export function new$(max_read_size) {
  return new ByteStream(
    $deque.new$(),
    0,
    0,
    max_read_size,
    false,
    new None(),
    false,
  );
}

/**
 * Returns the total number of bytes that have been successfully read out of
 * a byte stream.
 */
export function bytes_read(stream) {
  return stream.bytes_read;
}

/**
 * Returns whether the byte stream is fully consumed, i.e. no bytes are unread
 * and the end of the stream has been reached.
 */
export function is_fully_consumed(stream) {
  return ((stream.bytes_queue_size === 0) && stream.is_writing_finished) && ((isEqual(
    stream.zlib_stream,
    new None()
  )) || stream.zlib_inflate_complete);
}

function do_read(loop$bytes_queue, loop$byte_count, loop$acc) {
  while (true) {
    let bytes_queue = loop$bytes_queue;
    let byte_count = loop$byte_count;
    let acc = loop$acc;
    let $ = $deque.pop_front(bytes_queue);
    let queue_item;
    let bytes_queue$1;
    if ($ instanceof Ok) {
      queue_item = $[0][0];
      bytes_queue$1 = $[0][1];
    } else {
      throw makeError(
        "let_assert",
        FILEPATH,
        "dcmfx_p10/internal/byte_stream",
        184,
        "do_read",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $,
          start: 5533,
          end: 5605,
          pattern_start: 5544,
          pattern_end: 5574
        }
      )
    }
    let queue_item_size = $bit_array.byte_size(queue_item);
    let $1 = byte_count <= queue_item_size;
    if ($1) {
      let $2 = $bit_array.slice(queue_item, 0, byte_count);
      let read_bytes;
      if ($2 instanceof Ok) {
        read_bytes = $2[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_p10/internal/byte_stream",
          192,
          "do_read",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $2,
            start: 5906,
            end: 5976,
            pattern_start: 5917,
            pattern_end: 5931
          }
        )
      }
      let _block;
      let _pipe = listPrepend(read_bytes, acc);
      let _pipe$1 = $list.reverse(_pipe);
      _block = $bit_array.concat(_pipe$1);
      let final_bytes = _block;
      let unread_bytes_count = queue_item_size - byte_count;
      let _block$1;
      let $3 = unread_bytes_count === 0;
      if ($3) {
        _block$1 = bytes_queue$1;
      } else {
        let $4 = $bit_array.slice(queue_item, byte_count, unread_bytes_count);
        let unread_bytes;
        if ($4 instanceof Ok) {
          unread_bytes = $4[0];
        } else {
          throw makeError(
            "let_assert",
            FILEPATH,
            "dcmfx_p10/internal/byte_stream",
            205,
            "do_read",
            "Pattern match failed, no pattern matched the value.",
            {
              value: $4,
              start: 6369,
              end: 6470,
              pattern_start: 6380,
              pattern_end: 6396
            }
          )
        }
        _block$1 = $deque.push_front(bytes_queue$1, unread_bytes);
      }
      let bytes_queue$2 = _block$1;
      return [final_bytes, bytes_queue$2];
    } else {
      loop$bytes_queue = bytes_queue$1;
      loop$byte_count = byte_count - queue_item_size;
      loop$acc = listPrepend(queue_item, acc);
    }
  }
}

function do_peek(loop$bytes_queue, loop$byte_count, loop$acc) {
  while (true) {
    let bytes_queue = loop$bytes_queue;
    let byte_count = loop$byte_count;
    let acc = loop$acc;
    let $ = $deque.pop_front(bytes_queue);
    let queue_item;
    let bytes_queue$1;
    if ($ instanceof Ok) {
      queue_item = $[0][0];
      bytes_queue$1 = $[0][1];
    } else {
      throw makeError(
        "let_assert",
        FILEPATH,
        "dcmfx_p10/internal/byte_stream",
        248,
        "do_peek",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $,
          start: 7469,
          end: 7541,
          pattern_start: 7480,
          pattern_end: 7510
        }
      )
    }
    let queue_item_size = $bit_array.byte_size(queue_item);
    let $1 = byte_count <= queue_item_size;
    if ($1) {
      let $2 = $bit_array.slice(queue_item, 0, byte_count);
      let bytes;
      if ($2 instanceof Ok) {
        bytes = $2[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_p10/internal/byte_stream",
          256,
          "do_peek",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $2,
            start: 7842,
            end: 7907,
            pattern_start: 7853,
            pattern_end: 7862
          }
        )
      }
      let _pipe = listPrepend(bytes, acc);
      let _pipe$1 = $list.reverse(_pipe);
      return $bit_array.concat(_pipe$1);
    } else {
      loop$bytes_queue = bytes_queue$1;
      loop$byte_count = byte_count - queue_item_size;
      loop$acc = listPrepend(queue_item, acc);
    }
  }
}

/**
 * Peeks at the next bytes that will be read out of a byte stream without
 * actually consuming them.
 */
export function peek(stream, byte_count) {
  return $bool.guard(
    byte_count === 0,
    new Ok(toBitArray([])),
    () => {
      return $bool.guard(
        byte_count > stream.max_read_size,
        new Error(new ReadOversized()),
        () => {
          let $ = byte_count <= stream.bytes_queue_size;
          if ($) {
            return new Ok(do_peek(stream.bytes_queue, byte_count, toList([])));
          } else {
            let $1 = stream.is_writing_finished;
            if ($1) {
              return new Error(new DataEnd());
            } else {
              return new Error(new DataRequired());
            }
          }
        },
      );
    },
  );
}

/**
 * When zlib inflate is enabled, this function reads all pending inflated data
 * from the zlib stream, up to the max read size limit. This ensures the stream
 * is ready to service the next call to `read` or `peek`.
 *
 * Depending on what deflated data has been written, and the max read size of
 * the stream, this function may leave data in the zlib stream. This is
 * desirable in order to protect against zlib bombs, as it means the maximum
 * memory consumption of a byte stream is capped at its max read size.
 * 
 * @ignore
 */
function inflate_up_to_max_read_size(stream) {
  return $bool.guard(
    stream.bytes_queue_size >= stream.max_read_size,
    new Ok(stream),
    () => {
      let $ = stream.zlib_stream;
      if ($ instanceof Some) {
        let zlib_stream = $[0];
        let $1 = $zlib.safe_inflate(zlib_stream, toBitArray([]));
        if ($1 instanceof Ok) {
          let $2 = $1[0];
          if ($2 instanceof $inflate_result.Continue) {
            let bytes = $2[0];
            if (bytes.bitSize === 0) {
              return new Ok(stream);
            } else {
              let bytes$1 = bytes;
              let _pipe = new ByteStream(
                $deque.push_back(stream.bytes_queue, bytes$1),
                stream.bytes_queue_size + $bit_array.byte_size(bytes$1),
                stream.bytes_read,
                stream.max_read_size,
                stream.is_writing_finished,
                stream.zlib_stream,
                stream.zlib_inflate_complete,
              );
              return inflate_up_to_max_read_size(_pipe);
            }
          } else {
            let $3 = $2[0];
            if ($3.bitSize === 0 && stream.is_writing_finished) {
              return new Ok(
                new ByteStream(
                  stream.bytes_queue,
                  stream.bytes_queue_size,
                  stream.bytes_read,
                  stream.max_read_size,
                  stream.is_writing_finished,
                  stream.zlib_stream,
                  true,
                ),
              );
            } else {
              let bytes = $3;
              if (bytes.bitSize === 0) {
                return new Ok(stream);
              } else {
                let bytes$1 = bytes;
                let _pipe = new ByteStream(
                  $deque.push_back(stream.bytes_queue, bytes$1),
                  stream.bytes_queue_size + $bit_array.byte_size(bytes$1),
                  stream.bytes_read,
                  stream.max_read_size,
                  stream.is_writing_finished,
                  stream.zlib_stream,
                  stream.zlib_inflate_complete,
                );
                return inflate_up_to_max_read_size(_pipe);
              }
            }
          }
        } else {
          return new Error(new ZlibDataError());
        }
      } else {
        return new Ok(stream);
      }
    },
  );
}

/**
 * Writes bytes to a byte stream so they are available to be read by subsequent
 * calls to `read`. If `done` is true then this signals that no more bytes
 * will be written to the byte stream, and any further calls to `write` will
 * error.
 *
 * If the byte stream has zlib inflate enabled then the given bytes will be
 * passed through zlib inflate and the output made available to be read.
 */
export function write(stream, data, done) {
  return $bool.guard(
    stream.is_writing_finished,
    new Error(new WriteAfterCompletion()),
    () => {
      let _block;
      let $ = stream.zlib_stream;
      if ($ instanceof Some) {
        let zlib_stream = $[0];
        let $1 = stream.zlib_inflate_complete;
        if ($1) {
          _block = new Ok(toBitArray([]));
        } else {
          let $2 = $zlib.safe_inflate(zlib_stream, data);
          if ($2 instanceof Ok) {
            let $3 = $2[0];
            if ($3 instanceof $inflate_result.Continue) {
              let bytes = $3[0];
              _block = new Ok(bytes);
            } else {
              let bytes = $3[0];
              _block = new Ok(bytes);
            }
          } else {
            _block = new Error(new ZlibDataError());
          }
        }
      } else {
        _block = new Ok(data);
      }
      let new_bytes = _block;
      return $result.try$(
        new_bytes,
        (new_bytes) => {
          let _block$1;
          if (new_bytes.bitSize === 0) {
            _block$1 = stream.bytes_queue;
          } else {
            _block$1 = $deque.push_back(stream.bytes_queue, new_bytes);
          }
          let bytes_queue = _block$1;
          let bytes_queue_size = stream.bytes_queue_size + $bit_array.byte_size(
            new_bytes,
          );
          let stream$1 = new ByteStream(
            bytes_queue,
            bytes_queue_size,
            stream.bytes_read,
            stream.max_read_size,
            done,
            stream.zlib_stream,
            stream.zlib_inflate_complete,
          );
          return inflate_up_to_max_read_size(stream$1);
        },
      );
    },
  );
}

/**
 * Reads bytes out of a byte stream. On success, returns the read bytes and an
 * updated byte stream.
 */
export function read(stream, byte_count) {
  return $bool.guard(
    byte_count === 0,
    new Ok([toBitArray([]), stream]),
    () => {
      return $bool.guard(
        byte_count > stream.max_read_size,
        new Error(new ReadOversized()),
        () => {
          let $ = byte_count <= stream.bytes_queue_size;
          if ($) {
            let $1 = do_read(stream.bytes_queue, byte_count, toList([]));
            let bytes;
            let new_bytes_queue;
            bytes = $1[0];
            new_bytes_queue = $1[1];
            let new_stream = new ByteStream(
              new_bytes_queue,
              stream.bytes_queue_size - byte_count,
              stream.bytes_read + byte_count,
              stream.max_read_size,
              stream.is_writing_finished,
              stream.zlib_stream,
              stream.zlib_inflate_complete,
            );
            return $result.try$(
              inflate_up_to_max_read_size(new_stream),
              (new_stream) => { return new Ok([bytes, new_stream]); },
            );
          } else {
            let $1 = stream.is_writing_finished;
            if ($1) {
              return new Error(new DataEnd());
            } else {
              return new Error(new DataRequired());
            }
          }
        },
      );
    },
  );
}

/**
 * Converts an uncompressed byte stream to a zlib deflated stream. All
 * currently unread bytes, and all subsequently written bytes, will be passed
 * through streaming zlib decompression and the result made available to be
 * read out.
 *
 * This is used when reading DICOM P10 data that uses a deflated transfer
 * syntax.
 */
export function start_zlib_inflate(stream) {
  let zlib_stream = $zlib.open();
  let window_bits = -15;
  $zlib.inflate_init(zlib_stream, window_bits);
  let _block;
  let _pipe = stream.bytes_queue;
  let _pipe$1 = $deque.to_list(_pipe);
  _block = $bit_array.concat(_pipe$1);
  let available_bytes = _block;
  let is_writing_finished = stream.is_writing_finished;
  let stream$1 = new ByteStream(
    $deque.new$(),
    0,
    stream.bytes_read,
    stream.max_read_size,
    false,
    new Some(zlib_stream),
    stream.zlib_inflate_complete,
  );
  return write(stream$1, available_bytes, is_writing_finished);
}

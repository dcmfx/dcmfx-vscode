/// <reference types="./byte_stream.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $queue from "../../../gleam_stdlib/gleam/queue.mjs";
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

class ByteStream extends $CustomType {
  constructor(bytes_queue, bytes_queue_size, bytes_read, max_read_size, is_writing_finished, zlib_stream) {
    super();
    this.bytes_queue = bytes_queue;
    this.bytes_queue_size = bytes_queue_size;
    this.bytes_read = bytes_read;
    this.max_read_size = max_read_size;
    this.is_writing_finished = is_writing_finished;
    this.zlib_stream = zlib_stream;
  }
}

export class ReadOversized extends $CustomType {}

export class DataRequired extends $CustomType {}

export class DataEnd extends $CustomType {}

export class ZlibDataError extends $CustomType {}

export class WriteAfterCompletion extends $CustomType {}

export function new$(max_read_size) {
  return new ByteStream($queue.new$(), 0, 0, max_read_size, false, new None());
}

export function bytes_read(stream) {
  return stream.bytes_read;
}

export function is_fully_consumed(stream) {
  return ((stream.bytes_queue_size === 0) && stream.is_writing_finished) && (isEqual(
    stream.zlib_stream,
    new None()
  ));
}

function do_read(loop$bytes_queue, loop$byte_count, loop$acc) {
  while (true) {
    let bytes_queue = loop$bytes_queue;
    let byte_count = loop$byte_count;
    let acc = loop$acc;
    let $ = $queue.pop_front(bytes_queue);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_p10/internal/byte_stream",
        177,
        "do_read",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let queue_item = $[0][0];
    let bytes_queue$1 = $[0][1];
    let queue_item_size = $bit_array.byte_size(queue_item);
    let $1 = byte_count <= queue_item_size;
    if ($1) {
      let $2 = $bit_array.slice(queue_item, 0, byte_count);
      if (!$2.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_p10/internal/byte_stream",
          185,
          "do_read",
          "Pattern match failed, no pattern matched the value.",
          { value: $2 }
        )
      }
      let read_bytes = $2[0];
      let final_bytes = (() => {
        let _pipe = listPrepend(read_bytes, acc);
        let _pipe$1 = $list.reverse(_pipe);
        return $bit_array.concat(_pipe$1);
      })();
      let unread_bytes_count = queue_item_size - byte_count;
      let bytes_queue$2 = (() => {
        let $3 = unread_bytes_count === 0;
        if ($3) {
          return bytes_queue$1;
        } else {
          let $4 = $bit_array.slice(queue_item, byte_count, unread_bytes_count);
          if (!$4.isOk()) {
            throw makeError(
              "let_assert",
              "dcmfx_p10/internal/byte_stream",
              198,
              "do_read",
              "Pattern match failed, no pattern matched the value.",
              { value: $4 }
            )
          }
          let unread_bytes = $4[0];
          return $queue.push_front(bytes_queue$1, unread_bytes);
        }
      })();
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
    let $ = $queue.pop_front(bytes_queue);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_p10/internal/byte_stream",
        241,
        "do_peek",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let queue_item = $[0][0];
    let bytes_queue$1 = $[0][1];
    let queue_item_size = $bit_array.byte_size(queue_item);
    let $1 = byte_count <= queue_item_size;
    if ($1) {
      let $2 = $bit_array.slice(queue_item, 0, byte_count);
      if (!$2.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_p10/internal/byte_stream",
          249,
          "do_peek",
          "Pattern match failed, no pattern matched the value.",
          { value: $2 }
        )
      }
      let bytes = $2[0];
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

function inflate_up_to_max_read_size(stream) {
  return $bool.guard(
    stream.bytes_queue_size >= stream.max_read_size,
    new Ok(stream),
    () => {
      let $ = stream.zlib_stream;
      if ($ instanceof Some) {
        let zlib_stream = $[0];
        let $1 = $zlib.safe_inflate(zlib_stream, toBitArray([]));
        if ($1.isOk() &&
        $1[0] instanceof $inflate_result.Finished &&
        $1[0][0].length == 0 &&
        (stream.is_writing_finished)) {
          return new Ok(stream.withFields({ zlib_stream: new None() }));
        } else if ($1.isOk() && $1[0] instanceof $inflate_result.Continue) {
          let bytes = $1[0][0];
          if (bytes.length == 0) {
            return new Ok(stream);
          } else {
            let bytes$1 = bytes;
            let _pipe = stream.withFields({
              bytes_queue: $queue.push_back(stream.bytes_queue, bytes$1),
              bytes_queue_size: stream.bytes_queue_size + $bit_array.byte_size(
                bytes$1,
              )
            });
            return inflate_up_to_max_read_size(_pipe);
          }
        } else if ($1.isOk() && $1[0] instanceof $inflate_result.Finished) {
          let bytes = $1[0][0];
          if (bytes.length == 0) {
            return new Ok(stream);
          } else {
            let bytes$1 = bytes;
            let _pipe = stream.withFields({
              bytes_queue: $queue.push_back(stream.bytes_queue, bytes$1),
              bytes_queue_size: stream.bytes_queue_size + $bit_array.byte_size(
                bytes$1,
              )
            });
            return inflate_up_to_max_read_size(_pipe);
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

export function write(stream, data, done) {
  return $bool.guard(
    stream.is_writing_finished,
    new Error(new WriteAfterCompletion()),
    () => {
      let new_bytes = (() => {
        let $ = stream.zlib_stream;
        if ($ instanceof Some) {
          let zlib_stream = $[0];
          let $1 = $zlib.safe_inflate(zlib_stream, data);
          if ($1.isOk() && $1[0] instanceof $inflate_result.Continue) {
            let bytes = $1[0][0];
            return new Ok(bytes);
          } else if ($1.isOk() && $1[0] instanceof $inflate_result.Finished) {
            let bytes = $1[0][0];
            return new Ok(bytes);
          } else {
            return new Error(new ZlibDataError());
          }
        } else {
          return new Ok(data);
        }
      })();
      return $result.try$(
        new_bytes,
        (new_bytes) => {
          let bytes_queue = (() => {
            if (new_bytes.length == 0) {
              return stream.bytes_queue;
            } else {
              return $queue.push_back(stream.bytes_queue, new_bytes);
            }
          })();
          let bytes_queue_size = stream.bytes_queue_size + $bit_array.byte_size(
            new_bytes,
          );
          let stream$1 = stream.withFields({
            bytes_queue: bytes_queue,
            bytes_queue_size: bytes_queue_size,
            is_writing_finished: done
          });
          return inflate_up_to_max_read_size(stream$1);
        },
      );
    },
  );
}

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
            let bytes = $1[0];
            let new_bytes_queue = $1[1];
            let new_stream = stream.withFields({
              bytes_queue: new_bytes_queue,
              bytes_queue_size: stream.bytes_queue_size - byte_count,
              bytes_read: stream.bytes_read + byte_count
            });
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

export function start_zlib_inflate(stream) {
  let zlib_stream = $zlib.open();
  let window_bits = -15;
  $zlib.inflate_init(zlib_stream, window_bits);
  let available_bytes = (() => {
    let _pipe = stream.bytes_queue;
    let _pipe$1 = $queue.to_list(_pipe);
    return $bit_array.concat(_pipe$1);
  })();
  let is_writing_finished = stream.is_writing_finished;
  let stream$1 = stream.withFields({
    bytes_queue: $queue.new$(),
    bytes_queue_size: 0,
    is_writing_finished: false,
    zlib_stream: new Some(zlib_stream)
  });
  return write(stream$1, available_bytes, is_writing_finished);
}

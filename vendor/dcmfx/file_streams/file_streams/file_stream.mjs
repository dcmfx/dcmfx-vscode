/// <reference types="./file_stream.d.mts" />
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../gleam_stdlib/gleam/bool.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $file_open_mode from "../file_streams/file_open_mode.mjs";
import * as $file_stream_error from "../file_streams/file_stream_error.mjs";
import * as $raw_read_result from "../file_streams/internal/raw_read_result.mjs";
import * as $raw_result from "../file_streams/internal/raw_result.mjs";
import * as $text_encoding from "../file_streams/text_encoding.mjs";
import { Latin1 } from "../file_streams/text_encoding.mjs";
import { Ok, Error, toList, prepend as listPrepend, CustomType as $CustomType } from "../gleam.mjs";

class FileStream extends $CustomType {
  constructor(io_device, encoding) {
    super();
    this.io_device = io_device;
    this.encoding = encoding;
  }
}

export class BeginningOfFile extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

export class CurrentLocation extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

export class EndOfFile extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

class Bof extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

class Cur extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

class Eof extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

function do_read_list(loop$stream, loop$item_read_fn, loop$item_count, loop$acc) {
  while (true) {
    let stream = loop$stream;
    let item_read_fn = loop$item_read_fn;
    let item_count = loop$item_count;
    let acc = loop$acc;
    if (item_count === 0) {
      return new Ok(acc);
    } else {
      let $ = item_read_fn(stream);
      if ($.isOk()) {
        let item = $[0];
        loop$stream = stream;
        loop$item_read_fn = item_read_fn;
        loop$item_count = item_count - 1;
        loop$acc = listPrepend(item, acc);
      } else {
        let e = $[0];
        return new Error(e);
      }
    }
  }
}

export function read_list(stream, item_read_fn, item_count) {
  let _pipe = do_read_list(stream, item_read_fn, item_count, toList([]));
  return $result.map(_pipe, $list.reverse);
}

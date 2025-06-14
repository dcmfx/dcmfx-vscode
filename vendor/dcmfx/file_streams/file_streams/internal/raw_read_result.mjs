/// <reference types="./raw_read_result.d.mts" />
import * as $file_stream_error from "../../file_streams/file_stream_error.mjs";
import { CustomType as $CustomType } from "../../gleam.mjs";

export class Ok extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}

export class Eof extends $CustomType {}

export class Error extends $CustomType {
  constructor(error) {
    super();
    this.error = error;
  }
}

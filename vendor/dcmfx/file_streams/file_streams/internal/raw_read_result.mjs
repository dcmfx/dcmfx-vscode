/// <reference types="./raw_read_result.d.mts" />
import * as $file_stream_error from "../../file_streams/file_stream_error.mjs";
import { CustomType as $CustomType } from "../../gleam.mjs";

export class Ok extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const RawReadResult$Ok = ($0) => new Ok($0);
export const RawReadResult$isOk = (value) => value instanceof Ok;
export const RawReadResult$Ok$0 = (value) => value[0];

export class Eof extends $CustomType {}
export const RawReadResult$Eof = () => new Eof();
export const RawReadResult$isEof = (value) => value instanceof Eof;

export class Error extends $CustomType {
  constructor(error) {
    super();
    this.error = error;
  }
}
export const RawReadResult$Error = (error) => new Error(error);
export const RawReadResult$isError = (value) => value instanceof Error;
export const RawReadResult$Error$error = (value) => value.error;
export const RawReadResult$Error$0 = (value) => value.error;

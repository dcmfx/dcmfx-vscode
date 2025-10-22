/// <reference types="./raw_result.d.mts" />
import * as $file_stream_error from "../../file_streams/file_stream_error.mjs";
import { CustomType as $CustomType } from "../../gleam.mjs";

export class Ok extends $CustomType {}
export const RawResult$Ok = () => new Ok();
export const RawResult$isOk = (value) => value instanceof Ok;

export class Error extends $CustomType {
  constructor(error) {
    super();
    this.error = error;
  }
}
export const RawResult$Error = (error) => new Error(error);
export const RawResult$isError = (value) => value instanceof Error;
export const RawResult$Error$error = (value) => value.error;
export const RawResult$Error$0 = (value) => value.error;

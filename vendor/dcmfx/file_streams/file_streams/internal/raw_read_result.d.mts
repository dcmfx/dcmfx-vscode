import type * as $file_stream_error from "../../file_streams/file_stream_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class Ok<BZJH> extends _.CustomType {
  constructor(argument$0: BZJH);
  
  0: BZJH;
}

export class Eof extends _.CustomType {}

export class Error extends _.CustomType {
  constructor(error: $file_stream_error.FileStreamError$);
  
  error: $file_stream_error.FileStreamError$;
}

export type RawReadResult$<BZJH> = Ok<BZJH> | Eof | Error;

import type * as $file_stream_error from "../../file_streams/file_stream_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class Ok<BYMS> extends _.CustomType {
  constructor(argument$0: BYMS);
  
  0: BYMS;
}

export class Eof extends _.CustomType {}

export class Error extends _.CustomType {
  constructor(error: $file_stream_error.FileStreamError$);
  
  error: $file_stream_error.FileStreamError$;
}

export type RawReadResult$<BYMS> = Ok<BYMS> | Eof | Error;

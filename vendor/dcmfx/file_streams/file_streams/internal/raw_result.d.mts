import type * as $file_stream_error from "../../file_streams/file_stream_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class Ok extends _.CustomType {
  private __gleam__file_streams__internal__raw_result__Ok: never;
}

export class Error extends _.CustomType {
  private __gleam__file_streams__internal__raw_result__Error: never;

  constructor(error: $file_stream_error.FileStreamError$);
  
  error: $file_stream_error.FileStreamError$;
}

export type RawResult$ = Ok | Error;

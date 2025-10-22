import type * as $file_stream_error from "../../file_streams/file_stream_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class Ok extends _.CustomType {}
export function RawResult$Ok(): RawResult$;
export function RawResult$isOk(value: RawResult$): boolean;

export class Error extends _.CustomType {
  /** @deprecated */
  constructor(error: $file_stream_error.FileStreamError$);
  /** @deprecated */
  error: $file_stream_error.FileStreamError$;
}
export function RawResult$Error(
  error: $file_stream_error.FileStreamError$,
): RawResult$;
export function RawResult$isError(value: RawResult$): boolean;
export function RawResult$Error$0(value: RawResult$): $file_stream_error.FileStreamError$;
export function RawResult$Error$error(
  value: RawResult$,
): $file_stream_error.FileStreamError$;

export type RawResult$ = Ok | Error;

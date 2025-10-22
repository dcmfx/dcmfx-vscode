import type * as $file_stream_error from "../../file_streams/file_stream_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class Ok<BWLR> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: BWLR);
  /** @deprecated */
  0: BWLR;
}
export function RawReadResult$Ok<BWLR>($0: BWLR): RawReadResult$<BWLR>;
export function RawReadResult$isOk<BWLR>(value: RawReadResult$<BWLR>): boolean;
export function RawReadResult$Ok$0<BWLR>(value: RawReadResult$<BWLR>): BWLR;

export class Eof extends _.CustomType {}
export function RawReadResult$Eof<BWLR>(): RawReadResult$<BWLR>;
export function RawReadResult$isEof<BWLR>(value: RawReadResult$<BWLR>): boolean;

export class Error extends _.CustomType {
  /** @deprecated */
  constructor(error: $file_stream_error.FileStreamError$);
  /** @deprecated */
  error: $file_stream_error.FileStreamError$;
}
export function RawReadResult$Error<BWLR>(
  error: $file_stream_error.FileStreamError$,
): RawReadResult$<BWLR>;
export function RawReadResult$isError<BWLR>(
  value: RawReadResult$<BWLR>,
): boolean;
export function RawReadResult$Error$0<BWLR>(value: RawReadResult$<BWLR>): $file_stream_error.FileStreamError$;
export function RawReadResult$Error$error<BWLR>(
  value: RawReadResult$<BWLR>,
): $file_stream_error.FileStreamError$;

export type RawReadResult$<BWLR> = Ok<BWLR> | Eof | Error;

import type * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
import type * as $file_stream_error from "../../file_streams/file_streams/file_stream_error.d.mts";
import type * as $p10_token from "../dcmfx_p10/p10_token.d.mts";
import type * as _ from "../gleam.d.mts";

export class TransferSyntaxNotSupported extends _.CustomType {
  /** @deprecated */
  constructor(transfer_syntax_uid: string);
  /** @deprecated */
  transfer_syntax_uid: string;
}
export function P10Error$TransferSyntaxNotSupported(
  transfer_syntax_uid: string,
): P10Error$;
export function P10Error$isTransferSyntaxNotSupported(
  value: P10Error$,
): boolean;
export function P10Error$TransferSyntaxNotSupported$0(value: P10Error$): string;
export function P10Error$TransferSyntaxNotSupported$transfer_syntax_uid(value: P10Error$): string;

export class SpecificCharacterSetInvalid extends _.CustomType {
  /** @deprecated */
  constructor(specific_character_set: string, details: string);
  /** @deprecated */
  specific_character_set: string;
  /** @deprecated */
  details: string;
}
export function P10Error$SpecificCharacterSetInvalid(
  specific_character_set: string,
  details: string,
): P10Error$;
export function P10Error$isSpecificCharacterSetInvalid(
  value: P10Error$,
): boolean;
export function P10Error$SpecificCharacterSetInvalid$0(value: P10Error$): string;
export function P10Error$SpecificCharacterSetInvalid$specific_character_set(
  value: P10Error$,
): string;
export function P10Error$SpecificCharacterSetInvalid$1(value: P10Error$): string;
export function P10Error$SpecificCharacterSetInvalid$details(
  value: P10Error$,
): string;

export class DataRequired extends _.CustomType {
  /** @deprecated */
  constructor(when: string);
  /** @deprecated */
  when: string;
}
export function P10Error$DataRequired(when: string): P10Error$;
export function P10Error$isDataRequired(value: P10Error$): boolean;
export function P10Error$DataRequired$0(value: P10Error$): string;
export function P10Error$DataRequired$when(value: P10Error$): string;

export class DataEndedUnexpectedly extends _.CustomType {
  /** @deprecated */
  constructor(when: string, path: $data_set_path.DataSetPath$, offset: number);
  /** @deprecated */
  when: string;
  /** @deprecated */
  path: $data_set_path.DataSetPath$;
  /** @deprecated */
  offset: number;
}
export function P10Error$DataEndedUnexpectedly(
  when: string,
  path: $data_set_path.DataSetPath$,
  offset: number,
): P10Error$;
export function P10Error$isDataEndedUnexpectedly(value: P10Error$): boolean;
export function P10Error$DataEndedUnexpectedly$0(value: P10Error$): string;
export function P10Error$DataEndedUnexpectedly$when(value: P10Error$): string;
export function P10Error$DataEndedUnexpectedly$1(value: P10Error$): $data_set_path.DataSetPath$;
export function P10Error$DataEndedUnexpectedly$path(
  value: P10Error$,
): $data_set_path.DataSetPath$;
export function P10Error$DataEndedUnexpectedly$2(value: P10Error$): number;
export function P10Error$DataEndedUnexpectedly$offset(value: P10Error$): number;

export class DicmPrefixNotPresent extends _.CustomType {}
export function P10Error$DicmPrefixNotPresent(): P10Error$;
export function P10Error$isDicmPrefixNotPresent(value: P10Error$): boolean;

export class DataInvalid extends _.CustomType {
  /** @deprecated */
  constructor(
    when: string,
    details: string,
    path: $data_set_path.DataSetPath$,
    offset: number
  );
  /** @deprecated */
  when: string;
  /** @deprecated */
  details: string;
  /** @deprecated */
  path: $data_set_path.DataSetPath$;
  /** @deprecated */
  offset: number;
}
export function P10Error$DataInvalid(
  when: string,
  details: string,
  path: $data_set_path.DataSetPath$,
  offset: number,
): P10Error$;
export function P10Error$isDataInvalid(value: P10Error$): boolean;
export function P10Error$DataInvalid$0(value: P10Error$): string;
export function P10Error$DataInvalid$when(value: P10Error$): string;
export function P10Error$DataInvalid$1(value: P10Error$): string;
export function P10Error$DataInvalid$details(value: P10Error$): string;
export function P10Error$DataInvalid$2(value: P10Error$): $data_set_path.DataSetPath$;
export function P10Error$DataInvalid$path(
  value: P10Error$,
): $data_set_path.DataSetPath$;
export function P10Error$DataInvalid$3(value: P10Error$): number;
export function P10Error$DataInvalid$offset(value: P10Error$): number;

export class MaximumExceeded extends _.CustomType {
  /** @deprecated */
  constructor(
    details: string,
    path: $data_set_path.DataSetPath$,
    offset: number
  );
  /** @deprecated */
  details: string;
  /** @deprecated */
  path: $data_set_path.DataSetPath$;
  /** @deprecated */
  offset: number;
}
export function P10Error$MaximumExceeded(
  details: string,
  path: $data_set_path.DataSetPath$,
  offset: number,
): P10Error$;
export function P10Error$isMaximumExceeded(value: P10Error$): boolean;
export function P10Error$MaximumExceeded$0(value: P10Error$): string;
export function P10Error$MaximumExceeded$details(value: P10Error$): string;
export function P10Error$MaximumExceeded$1(value: P10Error$): $data_set_path.DataSetPath$;
export function P10Error$MaximumExceeded$path(
  value: P10Error$,
): $data_set_path.DataSetPath$;
export function P10Error$MaximumExceeded$2(value: P10Error$): number;
export function P10Error$MaximumExceeded$offset(value: P10Error$): number;

export class TokenStreamInvalid extends _.CustomType {
  /** @deprecated */
  constructor(when: string, details: string, token: $p10_token.P10Token$);
  /** @deprecated */
  when: string;
  /** @deprecated */
  details: string;
  /** @deprecated */
  token: $p10_token.P10Token$;
}
export function P10Error$TokenStreamInvalid(
  when: string,
  details: string,
  token: $p10_token.P10Token$,
): P10Error$;
export function P10Error$isTokenStreamInvalid(value: P10Error$): boolean;
export function P10Error$TokenStreamInvalid$0(value: P10Error$): string;
export function P10Error$TokenStreamInvalid$when(value: P10Error$): string;
export function P10Error$TokenStreamInvalid$1(value: P10Error$): string;
export function P10Error$TokenStreamInvalid$details(value: P10Error$): string;
export function P10Error$TokenStreamInvalid$2(value: P10Error$): $p10_token.P10Token$;
export function P10Error$TokenStreamInvalid$token(
  value: P10Error$,
): $p10_token.P10Token$;

export class WriteAfterCompletion extends _.CustomType {}
export function P10Error$WriteAfterCompletion(): P10Error$;
export function P10Error$isWriteAfterCompletion(value: P10Error$): boolean;

export class FileStreamError extends _.CustomType {
  /** @deprecated */
  constructor(when: string, error: $file_stream_error.FileStreamError$);
  /** @deprecated */
  when: string;
  /** @deprecated */
  error: $file_stream_error.FileStreamError$;
}
export function P10Error$FileStreamError(
  when: string,
  error: $file_stream_error.FileStreamError$,
): P10Error$;
export function P10Error$isFileStreamError(value: P10Error$): boolean;
export function P10Error$FileStreamError$0(value: P10Error$): string;
export function P10Error$FileStreamError$when(value: P10Error$): string;
export function P10Error$FileStreamError$1(value: P10Error$): $file_stream_error.FileStreamError$;
export function P10Error$FileStreamError$error(
  value: P10Error$,
): $file_stream_error.FileStreamError$;

export class OtherError extends _.CustomType {
  /** @deprecated */
  constructor(error_type: string, details: string);
  /** @deprecated */
  error_type: string;
  /** @deprecated */
  details: string;
}
export function P10Error$OtherError(
  error_type: string,
  details: string,
): P10Error$;
export function P10Error$isOtherError(value: P10Error$): boolean;
export function P10Error$OtherError$0(value: P10Error$): string;
export function P10Error$OtherError$error_type(value: P10Error$): string;
export function P10Error$OtherError$1(value: P10Error$): string;
export function P10Error$OtherError$details(value: P10Error$): string;

export type P10Error$ = TransferSyntaxNotSupported | SpecificCharacterSetInvalid | DataRequired | DataEndedUnexpectedly | DicmPrefixNotPresent | DataInvalid | MaximumExceeded | TokenStreamInvalid | WriteAfterCompletion | FileStreamError | OtherError;

export function name(error: P10Error$): string;

export function details(error: P10Error$): string;

export function to_lines(error: P10Error$, task_description: string): _.List<
  string
>;

export function print(error: P10Error$, task_description: string): undefined;

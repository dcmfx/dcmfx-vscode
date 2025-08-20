import type * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
import type * as $file_stream_error from "../../file_streams/file_streams/file_stream_error.d.mts";
import type * as $p10_token from "../dcmfx_p10/p10_token.d.mts";
import type * as _ from "../gleam.d.mts";

export class TransferSyntaxNotSupported extends _.CustomType {
  constructor(transfer_syntax_uid: string);
  
  transfer_syntax_uid: string;
}

export class SpecificCharacterSetInvalid extends _.CustomType {
  constructor(specific_character_set: string, details: string);
  
  specific_character_set: string;
  details: string;
}

export class DataRequired extends _.CustomType {
  constructor(when: string);
  
  when: string;
}

export class DataEndedUnexpectedly extends _.CustomType {
  constructor(when: string, path: $data_set_path.DataSetPath$, offset: number);
  
  when: string;
  path: $data_set_path.DataSetPath$;
  offset: number;
}

export class DicmPrefixNotPresent extends _.CustomType {}

export class DataInvalid extends _.CustomType {
  constructor(
    when: string,
    details: string,
    path: $data_set_path.DataSetPath$,
    offset: number
  );
  
  when: string;
  details: string;
  path: $data_set_path.DataSetPath$;
  offset: number;
}

export class MaximumExceeded extends _.CustomType {
  constructor(
    details: string,
    path: $data_set_path.DataSetPath$,
    offset: number
  );
  
  details: string;
  path: $data_set_path.DataSetPath$;
  offset: number;
}

export class TokenStreamInvalid extends _.CustomType {
  constructor(when: string, details: string, token: $p10_token.P10Token$);
  
  when: string;
  details: string;
  token: $p10_token.P10Token$;
}

export class WriteAfterCompletion extends _.CustomType {}

export class FileStreamError extends _.CustomType {
  constructor(when: string, error: $file_stream_error.FileStreamError$);
  
  when: string;
  error: $file_stream_error.FileStreamError$;
}

export class OtherError extends _.CustomType {
  constructor(error_type: string, details: string);
  
  error_type: string;
  details: string;
}

export type P10Error$ = TransferSyntaxNotSupported | SpecificCharacterSetInvalid | DataRequired | DataEndedUnexpectedly | DicmPrefixNotPresent | DataInvalid | MaximumExceeded | TokenStreamInvalid | WriteAfterCompletion | FileStreamError | OtherError;

export function name(error: P10Error$): string;

export function details(error: P10Error$): string;

export function to_lines(error: P10Error$, task_description: string): _.List<
  string
>;

export function print(error: P10Error$, task_description: string): undefined;

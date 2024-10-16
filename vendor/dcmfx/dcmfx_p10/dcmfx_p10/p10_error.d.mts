import type * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
import type * as $file_stream_error from "../../file_streams/file_streams/file_stream_error.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $simplifile from "../../simplifile/simplifile.d.mts";
import type * as $p10_part from "../dcmfx_p10/p10_part.d.mts";
import type * as _ from "../gleam.d.mts";

export class TransferSyntaxNotSupported extends _.CustomType {
  private __gleam__dcmfx_p10__p10_error__TransferSyntaxNotSupported: never;

  constructor(transfer_syntax_uid: string);
  
  transfer_syntax_uid: string;
}

export class SpecificCharacterSetInvalid extends _.CustomType {
  private __gleam__dcmfx_p10__p10_error__SpecificCharacterSetInvalid: never;

  constructor(specific_character_set: string, details: string);
  
  specific_character_set: string;
  details: string;
}

export class DataRequired extends _.CustomType {
  private __gleam__dcmfx_p10__p10_error__DataRequired: never;

  constructor(when: string);
  
  when: string;
}

export class DataEndedUnexpectedly extends _.CustomType {
  private __gleam__dcmfx_p10__p10_error__DataEndedUnexpectedly: never;

  constructor(when: string, path: $data_set_path.DataSetPath$, offset: number);
  
  when: string;
  path: $data_set_path.DataSetPath$;
  offset: number;
}

export class DataInvalid extends _.CustomType {
  private __gleam__dcmfx_p10__p10_error__DataInvalid: never;

  constructor(
    when: string,
    details: string,
    path: $option.Option$<$data_set_path.DataSetPath$>,
    offset: $option.Option$<number>
  );
  
  when: string;
  details: string;
  path: $option.Option$<$data_set_path.DataSetPath$>;
  offset: $option.Option$<number>;
}

export class MaximumExceeded extends _.CustomType {
  private __gleam__dcmfx_p10__p10_error__MaximumExceeded: never;

  constructor(
    details: string,
    path: $data_set_path.DataSetPath$,
    offset: number
  );
  
  details: string;
  path: $data_set_path.DataSetPath$;
  offset: number;
}

export class PartStreamInvalid extends _.CustomType {
  private __gleam__dcmfx_p10__p10_error__PartStreamInvalid: never;

  constructor(when: string, details: string, part: $p10_part.P10Part$);
  
  when: string;
  details: string;
  part: $p10_part.P10Part$;
}

export class WriteAfterCompletion extends _.CustomType {
  private __gleam__dcmfx_p10__p10_error__WriteAfterCompletion: never;
}

export class FileError extends _.CustomType {
  private __gleam__dcmfx_p10__p10_error__FileError: never;

  constructor(when: string, error: $simplifile.FileError$);
  
  when: string;
  error: $simplifile.FileError$;
}

export class FileStreamError extends _.CustomType {
  private __gleam__dcmfx_p10__p10_error__FileStreamError: never;

  constructor(when: string, error: $file_stream_error.FileStreamError$);
  
  when: string;
  error: $file_stream_error.FileStreamError$;
}

export class OtherError extends _.CustomType {
  private __gleam__dcmfx_p10__p10_error__OtherError: never;

  constructor(error_type: string, details: string);
  
  error_type: string;
  details: string;
}

export type P10Error$ = TransferSyntaxNotSupported | SpecificCharacterSetInvalid | DataRequired | DataEndedUnexpectedly | DataInvalid | MaximumExceeded | PartStreamInvalid | WriteAfterCompletion | FileError | FileStreamError | OtherError;

export function name(error: P10Error$): string;

export function to_lines(error: P10Error$, task_description: string): _.List<
  string
>;

export function print(error: P10Error$, task_description: string): undefined;

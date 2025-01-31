import type * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $value_representation from "../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as _ from "../gleam.d.mts";

export class FilePreambleAndDICMPrefix extends _.CustomType {
  constructor(preamble: _.BitArray);
  
  preamble: _.BitArray;
}

export class FileMetaInformation extends _.CustomType {
  constructor(
    data_set: $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  );
  
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >;
}

export class DataElementHeader extends _.CustomType {
  constructor(
    tag: $data_element_tag.DataElementTag$,
    vr: $value_representation.ValueRepresentation$,
    length: number
  );
  
  tag: $data_element_tag.DataElementTag$;
  vr: $value_representation.ValueRepresentation$;
  length: number;
}

export class DataElementValueBytes extends _.CustomType {
  constructor(
    vr: $value_representation.ValueRepresentation$,
    data: _.BitArray,
    bytes_remaining: number
  );
  
  vr: $value_representation.ValueRepresentation$;
  data: _.BitArray;
  bytes_remaining: number;
}

export class SequenceStart extends _.CustomType {
  constructor(
    tag: $data_element_tag.DataElementTag$,
    vr: $value_representation.ValueRepresentation$
  );
  
  tag: $data_element_tag.DataElementTag$;
  vr: $value_representation.ValueRepresentation$;
}

export class SequenceDelimiter extends _.CustomType {}

export class SequenceItemStart extends _.CustomType {}

export class SequenceItemDelimiter extends _.CustomType {}

export class PixelDataItem extends _.CustomType {
  constructor(length: number);
  
  length: number;
}

export class End extends _.CustomType {}

export type P10Token$ = FilePreambleAndDICMPrefix | FileMetaInformation | DataElementHeader | DataElementValueBytes | SequenceStart | SequenceDelimiter | SequenceItemStart | SequenceItemDelimiter | PixelDataItem | End;

export function to_string(token: P10Token$): string;

export function is_header_token(token: P10Token$): boolean;

export function data_element_to_tokens<BZFG, BZFH>(
  tag: $data_element_tag.DataElementTag$,
  value: $data_element_value.DataElementValue$,
  context: BZFG,
  token_callback: (x0: BZFG, x1: P10Token$) => _.Result<BZFG, BZFH>
): _.Result<BZFG, BZFH>;

export function data_elements_to_tokens<BZFA, BZFB>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  context: BZFA,
  token_callback: (x0: BZFA, x1: P10Token$) => _.Result<BZFA, BZFB>
): _.Result<BZFA, BZFB>;

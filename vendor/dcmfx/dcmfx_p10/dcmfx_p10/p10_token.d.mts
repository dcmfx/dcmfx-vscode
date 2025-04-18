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
    tag: $data_element_tag.DataElementTag$,
    vr: $value_representation.ValueRepresentation$,
    data: _.BitArray,
    bytes_remaining: number
  );
  
  tag: $data_element_tag.DataElementTag$;
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

export class SequenceDelimiter extends _.CustomType {
  constructor(tag: $data_element_tag.DataElementTag$);
  
  tag: $data_element_tag.DataElementTag$;
}

export class SequenceItemStart extends _.CustomType {
  constructor(index: number);
  
  index: number;
}

export class SequenceItemDelimiter extends _.CustomType {}

export class PixelDataItem extends _.CustomType {
  constructor(index: number, length: number);
  
  index: number;
  length: number;
}

export class End extends _.CustomType {}

export type P10Token$ = FilePreambleAndDICMPrefix | FileMetaInformation | DataElementHeader | DataElementValueBytes | SequenceStart | SequenceDelimiter | SequenceItemStart | SequenceItemDelimiter | PixelDataItem | End;

export function to_string(token: P10Token$): string;

export function is_header_token(token: P10Token$): boolean;

export function data_element_to_tokens<BZIB, BZIC>(
  tag: $data_element_tag.DataElementTag$,
  value: $data_element_value.DataElementValue$,
  context: BZIB,
  token_callback: (x0: BZIB, x1: P10Token$) => _.Result<BZIB, BZIC>
): _.Result<BZIB, BZIC>;

export function data_elements_to_tokens<BZHV, BZHW>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  context: BZHV,
  token_callback: (x0: BZHV, x1: P10Token$) => _.Result<BZHV, BZHW>
): _.Result<BZHV, BZHW>;

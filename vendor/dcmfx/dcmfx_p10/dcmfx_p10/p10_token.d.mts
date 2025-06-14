import type * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
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
    length: number,
    path: $data_set_path.DataSetPath$
  );
  
  tag: $data_element_tag.DataElementTag$;
  vr: $value_representation.ValueRepresentation$;
  length: number;
  path: $data_set_path.DataSetPath$;
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
    vr: $value_representation.ValueRepresentation$,
    path: $data_set_path.DataSetPath$
  );
  
  tag: $data_element_tag.DataElementTag$;
  vr: $value_representation.ValueRepresentation$;
  path: $data_set_path.DataSetPath$;
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

export function data_element_to_tokens<BXKR, BXKS>(
  tag: $data_element_tag.DataElementTag$,
  value: $data_element_value.DataElementValue$,
  path: $data_set_path.DataSetPath$,
  context: BXKR,
  token_callback: (x0: BXKR, x1: P10Token$) => _.Result<BXKR, BXKS>
): _.Result<BXKR, BXKS>;

export function data_elements_to_tokens<BXKL, BXKM>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  path: $data_set_path.DataSetPath$,
  context: BXKL,
  token_callback: (x0: BXKL, x1: P10Token$) => _.Result<BXKL, BXKM>
): _.Result<BXKL, BXKM>;

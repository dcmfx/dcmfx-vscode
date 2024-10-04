import type * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $value_representation from "../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as _ from "../gleam.d.mts";

export class FilePreambleAndDICMPrefix extends _.CustomType {
  private __gleam__dcmfx_p10__p10_part__FilePreambleAndDICMPrefix: never;

  constructor(preamble: _.BitArray);
  
  preamble: _.BitArray;
}

export class FileMetaInformation extends _.CustomType {
  private __gleam__dcmfx_p10__p10_part__FileMetaInformation: never;

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
  private __gleam__dcmfx_p10__p10_part__DataElementHeader: never;

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
  private __gleam__dcmfx_p10__p10_part__DataElementValueBytes: never;

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
  private __gleam__dcmfx_p10__p10_part__SequenceStart: never;

  constructor(
    tag: $data_element_tag.DataElementTag$,
    vr: $value_representation.ValueRepresentation$
  );
  
  tag: $data_element_tag.DataElementTag$;
  vr: $value_representation.ValueRepresentation$;
}

export class SequenceDelimiter extends _.CustomType {
  private __gleam__dcmfx_p10__p10_part__SequenceDelimiter: never;
}

export class SequenceItemStart extends _.CustomType {
  private __gleam__dcmfx_p10__p10_part__SequenceItemStart: never;
}

export class SequenceItemDelimiter extends _.CustomType {
  private __gleam__dcmfx_p10__p10_part__SequenceItemDelimiter: never;
}

export class PixelDataItem extends _.CustomType {
  private __gleam__dcmfx_p10__p10_part__PixelDataItem: never;

  constructor(length: number);
  
  length: number;
}

export class End extends _.CustomType {
  private __gleam__dcmfx_p10__p10_part__End: never;
}

export type P10Part$ = FilePreambleAndDICMPrefix | FileMetaInformation | DataElementHeader | DataElementValueBytes | SequenceStart | SequenceDelimiter | SequenceItemStart | SequenceItemDelimiter | PixelDataItem | End;

export function to_string(part: P10Part$): string;

export function data_element_to_parts<CAFT, CAFU>(
  tag: $data_element_tag.DataElementTag$,
  value: $data_element_value.DataElementValue$,
  context: CAFT,
  part_callback: (x0: CAFT, x1: P10Part$) => _.Result<CAFT, CAFU>
): _.Result<CAFT, CAFU>;

export function data_elements_to_parts<CAFN, CAFO>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  context: CAFN,
  part_callback: (x0: CAFN, x1: P10Part$) => _.Result<CAFN, CAFO>
): _.Result<CAFN, CAFO>;

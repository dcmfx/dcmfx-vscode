import type * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
import type * as $value_representation from "../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as _ from "../gleam.d.mts";

export class FilePreambleAndDICMPrefix extends _.CustomType {
  /** @deprecated */
  constructor(preamble: _.BitArray);
  /** @deprecated */
  preamble: _.BitArray;
}
export function P10Token$FilePreambleAndDICMPrefix(
  preamble: _.BitArray,
): P10Token$;
export function P10Token$isFilePreambleAndDICMPrefix(value: P10Token$): boolean;
export function P10Token$FilePreambleAndDICMPrefix$0(value: P10Token$): _.BitArray;
export function P10Token$FilePreambleAndDICMPrefix$preamble(
  value: P10Token$,
): _.BitArray;

export class FileMetaInformation extends _.CustomType {
  /** @deprecated */
  constructor(
    data_set: $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  );
  /** @deprecated */
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >;
}
export function P10Token$FileMetaInformation(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
): P10Token$;
export function P10Token$isFileMetaInformation(value: P10Token$): boolean;
export function P10Token$FileMetaInformation$0(value: P10Token$): $dict.Dict$<
  $data_element_tag.DataElementTag$,
  $data_element_value.DataElementValue$
>;
export function P10Token$FileMetaInformation$data_set(value: P10Token$): $dict.Dict$<
  $data_element_tag.DataElementTag$,
  $data_element_value.DataElementValue$
>;

export class DataElementHeader extends _.CustomType {
  /** @deprecated */
  constructor(
    tag: $data_element_tag.DataElementTag$,
    vr: $value_representation.ValueRepresentation$,
    length: number,
    path: $data_set_path.DataSetPath$
  );
  /** @deprecated */
  tag: $data_element_tag.DataElementTag$;
  /** @deprecated */
  vr: $value_representation.ValueRepresentation$;
  /** @deprecated */
  length: number;
  /** @deprecated */
  path: $data_set_path.DataSetPath$;
}
export function P10Token$DataElementHeader(
  tag: $data_element_tag.DataElementTag$,
  vr: $value_representation.ValueRepresentation$,
  length: number,
  path: $data_set_path.DataSetPath$,
): P10Token$;
export function P10Token$isDataElementHeader(value: P10Token$): boolean;
export function P10Token$DataElementHeader$0(value: P10Token$): $data_element_tag.DataElementTag$;
export function P10Token$DataElementHeader$tag(
  value: P10Token$,
): $data_element_tag.DataElementTag$;
export function P10Token$DataElementHeader$1(value: P10Token$): $value_representation.ValueRepresentation$;
export function P10Token$DataElementHeader$vr(
  value: P10Token$,
): $value_representation.ValueRepresentation$;
export function P10Token$DataElementHeader$2(value: P10Token$): number;
export function P10Token$DataElementHeader$length(value: P10Token$): number;
export function P10Token$DataElementHeader$3(value: P10Token$): $data_set_path.DataSetPath$;
export function P10Token$DataElementHeader$path(
  value: P10Token$,
): $data_set_path.DataSetPath$;

export class DataElementValueBytes extends _.CustomType {
  /** @deprecated */
  constructor(
    tag: $data_element_tag.DataElementTag$,
    vr: $value_representation.ValueRepresentation$,
    data: _.BitArray,
    bytes_remaining: number
  );
  /** @deprecated */
  tag: $data_element_tag.DataElementTag$;
  /** @deprecated */
  vr: $value_representation.ValueRepresentation$;
  /** @deprecated */
  data: _.BitArray;
  /** @deprecated */
  bytes_remaining: number;
}
export function P10Token$DataElementValueBytes(
  tag: $data_element_tag.DataElementTag$,
  vr: $value_representation.ValueRepresentation$,
  data: _.BitArray,
  bytes_remaining: number,
): P10Token$;
export function P10Token$isDataElementValueBytes(value: P10Token$): boolean;
export function P10Token$DataElementValueBytes$0(value: P10Token$): $data_element_tag.DataElementTag$;
export function P10Token$DataElementValueBytes$tag(
  value: P10Token$,
): $data_element_tag.DataElementTag$;
export function P10Token$DataElementValueBytes$1(value: P10Token$): $value_representation.ValueRepresentation$;
export function P10Token$DataElementValueBytes$vr(
  value: P10Token$,
): $value_representation.ValueRepresentation$;
export function P10Token$DataElementValueBytes$2(value: P10Token$): _.BitArray;
export function P10Token$DataElementValueBytes$data(value: P10Token$): _.BitArray;
export function P10Token$DataElementValueBytes$3(
  value: P10Token$,
): number;
export function P10Token$DataElementValueBytes$bytes_remaining(value: P10Token$): number;

export class SequenceStart extends _.CustomType {
  /** @deprecated */
  constructor(
    tag: $data_element_tag.DataElementTag$,
    vr: $value_representation.ValueRepresentation$,
    path: $data_set_path.DataSetPath$
  );
  /** @deprecated */
  tag: $data_element_tag.DataElementTag$;
  /** @deprecated */
  vr: $value_representation.ValueRepresentation$;
  /** @deprecated */
  path: $data_set_path.DataSetPath$;
}
export function P10Token$SequenceStart(
  tag: $data_element_tag.DataElementTag$,
  vr: $value_representation.ValueRepresentation$,
  path: $data_set_path.DataSetPath$,
): P10Token$;
export function P10Token$isSequenceStart(value: P10Token$): boolean;
export function P10Token$SequenceStart$0(value: P10Token$): $data_element_tag.DataElementTag$;
export function P10Token$SequenceStart$tag(
  value: P10Token$,
): $data_element_tag.DataElementTag$;
export function P10Token$SequenceStart$1(value: P10Token$): $value_representation.ValueRepresentation$;
export function P10Token$SequenceStart$vr(
  value: P10Token$,
): $value_representation.ValueRepresentation$;
export function P10Token$SequenceStart$2(value: P10Token$): $data_set_path.DataSetPath$;
export function P10Token$SequenceStart$path(
  value: P10Token$,
): $data_set_path.DataSetPath$;

export class SequenceDelimiter extends _.CustomType {
  /** @deprecated */
  constructor(tag: $data_element_tag.DataElementTag$);
  /** @deprecated */
  tag: $data_element_tag.DataElementTag$;
}
export function P10Token$SequenceDelimiter(
  tag: $data_element_tag.DataElementTag$,
): P10Token$;
export function P10Token$isSequenceDelimiter(value: P10Token$): boolean;
export function P10Token$SequenceDelimiter$0(value: P10Token$): $data_element_tag.DataElementTag$;
export function P10Token$SequenceDelimiter$tag(
  value: P10Token$,
): $data_element_tag.DataElementTag$;

export class SequenceItemStart extends _.CustomType {
  /** @deprecated */
  constructor(index: number);
  /** @deprecated */
  index: number;
}
export function P10Token$SequenceItemStart(index: number): P10Token$;
export function P10Token$isSequenceItemStart(value: P10Token$): boolean;
export function P10Token$SequenceItemStart$0(value: P10Token$): number;
export function P10Token$SequenceItemStart$index(value: P10Token$): number;

export class SequenceItemDelimiter extends _.CustomType {}
export function P10Token$SequenceItemDelimiter(): P10Token$;
export function P10Token$isSequenceItemDelimiter(value: P10Token$): boolean;

export class PixelDataItem extends _.CustomType {
  /** @deprecated */
  constructor(index: number, length: number);
  /** @deprecated */
  index: number;
  /** @deprecated */
  length: number;
}
export function P10Token$PixelDataItem(
  index: number,
  length: number,
): P10Token$;
export function P10Token$isPixelDataItem(value: P10Token$): boolean;
export function P10Token$PixelDataItem$0(value: P10Token$): number;
export function P10Token$PixelDataItem$index(value: P10Token$): number;
export function P10Token$PixelDataItem$1(value: P10Token$): number;
export function P10Token$PixelDataItem$length(value: P10Token$): number;

export class End extends _.CustomType {}
export function P10Token$End(): P10Token$;
export function P10Token$isEnd(value: P10Token$): boolean;

export type P10Token$ = FilePreambleAndDICMPrefix | FileMetaInformation | DataElementHeader | DataElementValueBytes | SequenceStart | SequenceDelimiter | SequenceItemStart | SequenceItemDelimiter | PixelDataItem | End;

export function to_string(token: P10Token$): string;

export function is_header_token(token: P10Token$): boolean;

export function data_element_to_tokens<BXEX, BXEY>(
  tag: $data_element_tag.DataElementTag$,
  value: $data_element_value.DataElementValue$,
  path: $data_set_path.DataSetPath$,
  context: BXEX,
  token_callback: (x0: BXEX, x1: P10Token$) => _.Result<BXEX, BXEY>
): _.Result<BXEX, BXEY>;

export function data_elements_to_tokens<BXER, BXES>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  path: $data_set_path.DataSetPath$,
  context: BXER,
  token_callback: (x0: BXER, x1: P10Token$) => _.Result<BXER, BXES>
): _.Result<BXER, BXES>;

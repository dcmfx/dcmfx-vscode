import type * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../../gleam.d.mts";

export class DataElementHeader extends _.CustomType {
  private __gleam__dcmfx_p10__internal__data_element_header__DataElementHeader: never;

  constructor(
    tag: $data_element_tag.DataElementTag$,
    vr: $option.Option$<$value_representation.ValueRepresentation$>,
    length: number
  );
  
  tag: $data_element_tag.DataElementTag$;
  vr: $option.Option$<$value_representation.ValueRepresentation$>;
  length: number;
}

export type DataElementHeader$ = DataElementHeader;

export class ValueLengthU16 extends _.CustomType {
  private __gleam__dcmfx_p10__internal__data_element_header__ValueLengthU16: never;
}

export class ValueLengthU32 extends _.CustomType {
  private __gleam__dcmfx_p10__internal__data_element_header__ValueLengthU32: never;
}

export type ValueLengthSize$ = ValueLengthU16 | ValueLengthU32;

export function to_string(header: DataElementHeader$): string;

export function value_length_size(
  vr: $value_representation.ValueRepresentation$
): ValueLengthSize$;

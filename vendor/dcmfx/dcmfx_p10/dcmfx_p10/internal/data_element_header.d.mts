import type * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $value_length from "../../dcmfx_p10/internal/value_length.d.mts";
import type * as _ from "../../gleam.d.mts";

export class DataElementHeader extends _.CustomType {
  /** @deprecated */
  constructor(
    tag: $data_element_tag.DataElementTag$,
    vr: $option.Option$<$value_representation.ValueRepresentation$>,
    length: $value_length.ValueLength$
  );
  /** @deprecated */
  tag: $data_element_tag.DataElementTag$;
  /** @deprecated */
  vr: $option.Option$<$value_representation.ValueRepresentation$>;
  /** @deprecated */
  length: $value_length.ValueLength$;
}
export function DataElementHeader$DataElementHeader(
  tag: $data_element_tag.DataElementTag$,
  vr: $option.Option$<$value_representation.ValueRepresentation$>,
  length: $value_length.ValueLength$,
): DataElementHeader$;
export function DataElementHeader$isDataElementHeader(
  value: DataElementHeader$,
): boolean;
export function DataElementHeader$DataElementHeader$0(value: DataElementHeader$): $data_element_tag.DataElementTag$;
export function DataElementHeader$DataElementHeader$tag(
  value: DataElementHeader$,
): $data_element_tag.DataElementTag$;
export function DataElementHeader$DataElementHeader$1(value: DataElementHeader$): $option.Option$<
  $value_representation.ValueRepresentation$
>;
export function DataElementHeader$DataElementHeader$vr(value: DataElementHeader$): $option.Option$<
  $value_representation.ValueRepresentation$
>;
export function DataElementHeader$DataElementHeader$2(value: DataElementHeader$): $value_length.ValueLength$;
export function DataElementHeader$DataElementHeader$length(
  value: DataElementHeader$,
): $value_length.ValueLength$;

export type DataElementHeader$ = DataElementHeader;

export class ValueLengthU16 extends _.CustomType {}
export function ValueLengthSize$ValueLengthU16(): ValueLengthSize$;
export function ValueLengthSize$isValueLengthU16(
  value: ValueLengthSize$,
): boolean;

export class ValueLengthU32 extends _.CustomType {}
export function ValueLengthSize$ValueLengthU32(): ValueLengthSize$;
export function ValueLengthSize$isValueLengthU32(
  value: ValueLengthSize$,
): boolean;

export type ValueLengthSize$ = ValueLengthU16 | ValueLengthU32;

export function to_string(header: DataElementHeader$): string;

export function value_length_size_max_length(size: ValueLengthSize$): number;

export function value_length_size(
  vr: $value_representation.ValueRepresentation$
): ValueLengthSize$;

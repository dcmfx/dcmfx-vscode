import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_error from "../../dcmfx_core/data_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class StructuredDate extends _.CustomType {
  private __gleam__dcmfx_core__data_element_value__date__StructuredDate: never;

  constructor(year: number, month: number, day: number);
  
  year: number;
  month: number;
  day: number;
}

export type StructuredDate$ = StructuredDate;

export function from_bytes(bytes: _.BitArray): _.Result<
  StructuredDate$,
  $data_error.DataError$
>;

export function components_to_string(
  year: number,
  month: $option.Option$<number>,
  day: $option.Option$<number>
): _.Result<string, $data_error.DataError$>;

export function to_bytes(value: StructuredDate$): _.Result<
  _.BitArray,
  $data_error.DataError$
>;

export function to_iso8601(date: StructuredDate$): string;

import type * as $data_error from "../../dcmfx_core/data_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class Days extends _.CustomType {
  private __gleam__dcmfx_core__data_element_value__age_string__Days: never;
}

export class Weeks extends _.CustomType {
  private __gleam__dcmfx_core__data_element_value__age_string__Weeks: never;
}

export class Months extends _.CustomType {
  private __gleam__dcmfx_core__data_element_value__age_string__Months: never;
}

export class Years extends _.CustomType {
  private __gleam__dcmfx_core__data_element_value__age_string__Years: never;
}

export type AgeUnit$ = Days | Weeks | Months | Years;

export class StructuredAge extends _.CustomType {
  private __gleam__dcmfx_core__data_element_value__age_string__StructuredAge: never;

  constructor(number: number, unit: AgeUnit$);
  
  number: number;
  unit: AgeUnit$;
}

export type StructuredAge$ = StructuredAge;

export function to_string(age: StructuredAge$): string;

export function from_bytes(bytes: _.BitArray): _.Result<
  StructuredAge$,
  $data_error.DataError$
>;

export function to_bytes(age: StructuredAge$): _.Result<
  _.BitArray,
  $data_error.DataError$
>;

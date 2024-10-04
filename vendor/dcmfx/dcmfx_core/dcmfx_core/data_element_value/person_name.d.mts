import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_error from "../../dcmfx_core/data_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class PersonNameComponents extends _.CustomType {
  private __gleam__dcmfx_core__data_element_value__person_name__PersonNameComponents: never;

  constructor(
    last_name: string,
    first_name: string,
    middle_name: string,
    prefix: string,
    suffix: string
  );
  
  last_name: string;
  first_name: string;
  middle_name: string;
  prefix: string;
  suffix: string;
}

export type PersonNameComponents$ = PersonNameComponents;

export class StructuredPersonName extends _.CustomType {
  private __gleam__dcmfx_core__data_element_value__person_name__StructuredPersonName: never;

  constructor(
    alphabetic: $option.Option$<PersonNameComponents$>,
    ideographic: $option.Option$<PersonNameComponents$>,
    phonetic: $option.Option$<PersonNameComponents$>
  );
  
  alphabetic: $option.Option$<PersonNameComponents$>;
  ideographic: $option.Option$<PersonNameComponents$>;
  phonetic: $option.Option$<PersonNameComponents$>;
}

export type StructuredPersonName$ = StructuredPersonName;

export function from_bytes(bytes: _.BitArray): _.Result<
  _.List<StructuredPersonName$>,
  $data_error.DataError$
>;

export function to_bytes(value: _.List<StructuredPersonName$>): _.Result<
  _.BitArray,
  $data_error.DataError$
>;

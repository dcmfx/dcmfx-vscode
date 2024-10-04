import type * as _ from "../gleam.d.mts";

export class SingleValue extends _.CustomType {
  private __gleam__dcmfx_character_set__string_type__SingleValue: never;
}

export class MultiValue extends _.CustomType {
  private __gleam__dcmfx_character_set__string_type__MultiValue: never;
}

export class PersonName extends _.CustomType {
  private __gleam__dcmfx_character_set__string_type__PersonName: never;
}

export type StringType$ = SingleValue | MultiValue | PersonName;

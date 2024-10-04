import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export class ValueMultiplicity extends _.CustomType {
  private __gleam__dcmfx_core__value_multiplicity__ValueMultiplicity: never;

  constructor(min: number, max: $option.Option$<number>);
  
  min: number;
  max: $option.Option$<number>;
}

export type ValueMultiplicity$ = ValueMultiplicity;

export function to_string(multiplicity: ValueMultiplicity$): string;

import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export class ValueMultiplicity extends _.CustomType {
  constructor(min: number, max: $option.Option$<number>);
  
  min: number;
  max: $option.Option$<number>;
}

export type ValueMultiplicity$ = ValueMultiplicity;

export function contains(multiplicity: ValueMultiplicity$, n: number): boolean;

export function to_string(multiplicity: ValueMultiplicity$): string;

import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export class ValueMultiplicity extends _.CustomType {
  /** @deprecated */
  constructor(min: number, max: $option.Option$<number>);
  /** @deprecated */
  min: number;
  /** @deprecated */
  max: $option.Option$<number>;
}
export function ValueMultiplicity$ValueMultiplicity(
  min: number,
  max: $option.Option$<number>,
): ValueMultiplicity$;
export function ValueMultiplicity$isValueMultiplicity(
  value: ValueMultiplicity$,
): boolean;
export function ValueMultiplicity$ValueMultiplicity$0(value: ValueMultiplicity$): number;
export function ValueMultiplicity$ValueMultiplicity$min(
  value: ValueMultiplicity$,
): number;
export function ValueMultiplicity$ValueMultiplicity$1(value: ValueMultiplicity$): $option.Option$<
  number
>;
export function ValueMultiplicity$ValueMultiplicity$max(value: ValueMultiplicity$): $option.Option$<
  number
>;

export type ValueMultiplicity$ = ValueMultiplicity;

export function contains(multiplicity: ValueMultiplicity$, n: number): boolean;

export function to_string(multiplicity: ValueMultiplicity$): string;

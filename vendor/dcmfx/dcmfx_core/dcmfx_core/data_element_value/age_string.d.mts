import type * as $data_error from "../../dcmfx_core/data_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class Days extends _.CustomType {}
export function AgeUnit$Days(): AgeUnit$;
export function AgeUnit$isDays(value: AgeUnit$): boolean;

export class Weeks extends _.CustomType {}
export function AgeUnit$Weeks(): AgeUnit$;
export function AgeUnit$isWeeks(value: AgeUnit$): boolean;

export class Months extends _.CustomType {}
export function AgeUnit$Months(): AgeUnit$;
export function AgeUnit$isMonths(value: AgeUnit$): boolean;

export class Years extends _.CustomType {}
export function AgeUnit$Years(): AgeUnit$;
export function AgeUnit$isYears(value: AgeUnit$): boolean;

export type AgeUnit$ = Days | Weeks | Months | Years;

export class StructuredAge extends _.CustomType {
  /** @deprecated */
  constructor(number: number, unit: AgeUnit$);
  /** @deprecated */
  number: number;
  /** @deprecated */
  unit: AgeUnit$;
}
export function StructuredAge$StructuredAge(
  number: number,
  unit: AgeUnit$,
): StructuredAge$;
export function StructuredAge$isStructuredAge(value: StructuredAge$): boolean;
export function StructuredAge$StructuredAge$0(value: StructuredAge$): number;
export function StructuredAge$StructuredAge$number(value: StructuredAge$): number;
export function StructuredAge$StructuredAge$1(
  value: StructuredAge$,
): AgeUnit$;
export function StructuredAge$StructuredAge$unit(value: StructuredAge$): AgeUnit$;

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

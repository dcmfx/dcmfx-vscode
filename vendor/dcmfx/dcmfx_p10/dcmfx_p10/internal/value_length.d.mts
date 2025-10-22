import type * as _ from "../../gleam.d.mts";

export class Defined extends _.CustomType {
  /** @deprecated */
  constructor(length: number);
  /** @deprecated */
  length: number;
}
export function ValueLength$Defined(length: number): ValueLength$;
export function ValueLength$isDefined(value: ValueLength$): boolean;
export function ValueLength$Defined$0(value: ValueLength$): number;
export function ValueLength$Defined$length(value: ValueLength$): number;

export class Undefined extends _.CustomType {}
export function ValueLength$Undefined(): ValueLength$;
export function ValueLength$isUndefined(value: ValueLength$): boolean;

export type ValueLength$ = Defined | Undefined;

export function new$(length: number): ValueLength$;

export function to_int(value_length: ValueLength$): number;

export function to_string(value_length: ValueLength$): string;

export const zero: ValueLength$;

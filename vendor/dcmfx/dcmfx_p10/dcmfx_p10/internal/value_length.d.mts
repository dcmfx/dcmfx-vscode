import type * as _ from "../../gleam.d.mts";

export class Defined extends _.CustomType {
  constructor(length: number);
  
  length: number;
}

export class Undefined extends _.CustomType {}

export type ValueLength$ = Defined | Undefined;

export function new$(length: number): ValueLength$;

export function to_int(value_length: ValueLength$): number;

export function to_string(value_length: ValueLength$): string;

export const zero: ValueLength$;

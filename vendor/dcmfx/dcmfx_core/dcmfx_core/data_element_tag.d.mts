import type * as _ from "../gleam.d.mts";

export class DataElementTag extends _.CustomType {
  constructor(group: number, element: number);
  
  group: number;
  element: number;
}

export type DataElementTag$ = DataElementTag;

export function is_private(tag: DataElementTag$): boolean;

export function is_private_creator(tag: DataElementTag$): boolean;

export function to_int(tag: DataElementTag$): number;

export function from_hex_string(tag: string): _.Result<
  DataElementTag$,
  undefined
>;

export function to_string(tag: DataElementTag$): string;

export function to_hex_string(tag: DataElementTag$): string;

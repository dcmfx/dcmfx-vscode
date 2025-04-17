import type * as $order from "../../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "../gleam.d.mts";

export class DataElementTag extends _.CustomType {
  constructor(group: number, element: number);
  
  group: number;
  element: number;
}

export type DataElementTag$ = DataElementTag;

export function is_private(tag: DataElementTag$): boolean;

export function is_private_creator(tag: DataElementTag$): boolean;

export function with_group(tag: DataElementTag$, group: number): DataElementTag$;

export function with_element(tag: DataElementTag$, element: number): DataElementTag$;

export function to_int(tag: DataElementTag$): number;

export function compare(lhs: DataElementTag$, rhs: DataElementTag$): $order.Order$;

export function from_hex_string(tag: string): _.Result<
  DataElementTag$,
  undefined
>;

export function to_string(tag: DataElementTag$): string;

export function to_hex_string(tag: DataElementTag$): string;

export const zero: DataElementTag$;

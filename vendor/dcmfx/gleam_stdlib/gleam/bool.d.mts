import type * as $order from "../gleam/order.d.mts";

export function and(a: boolean, b: boolean): boolean;

export function or(a: boolean, b: boolean): boolean;

export function negate(bool: boolean): boolean;

export function nor(a: boolean, b: boolean): boolean;

export function nand(a: boolean, b: boolean): boolean;

export function exclusive_or(a: boolean, b: boolean): boolean;

export function exclusive_nor(a: boolean, b: boolean): boolean;

export function compare(a: boolean, b: boolean): $order.Order$;

export function to_int(bool: boolean): number;

export function to_string(bool: boolean): string;

export function guard<BTW>(
  requirement: boolean,
  consequence: BTW,
  alternative: () => BTW
): BTW;

export function lazy_guard<BTX>(
  requirement: boolean,
  consequence: () => BTX,
  alternative: () => BTX
): BTX;

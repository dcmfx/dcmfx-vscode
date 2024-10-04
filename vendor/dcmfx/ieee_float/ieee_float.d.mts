import type * as $order from "../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "./gleam.d.mts";

declare class Finite extends _.CustomType {
  private __gleam__ieee_float__Finite: never;

  constructor(value: number);
  
  value: number;
}

declare class Infinite extends _.CustomType {
  private __gleam__ieee_float__Infinite: never;

  constructor(sign: Sign$);
  
  sign: Sign$;
}

declare class NaN extends _.CustomType {
  private __gleam__ieee_float__NaN: never;
}

export type IEEEFloat$ = Finite | Infinite | NaN;

declare class Positive extends _.CustomType {
  private __gleam__ieee_float__Positive: never;
}

declare class Negative extends _.CustomType {
  private __gleam__ieee_float__Negative: never;
}

declare type Sign$ = Positive | Negative;

export function finite(f: number): IEEEFloat$;

export function positive_infinity(): IEEEFloat$;

export function negative_infinity(): IEEEFloat$;

export function nan(): IEEEFloat$;

export function is_finite(f: IEEEFloat$): boolean;

export function is_nan(f: IEEEFloat$): boolean;

export function to_finite(f: IEEEFloat$): _.Result<number, undefined>;

export function to_string(f: IEEEFloat$): string;

export function parse(s: string): IEEEFloat$;

export function to_bytes_16_le(f: IEEEFloat$): _.BitArray;

export function from_bytes_16_le(bytes: _.BitArray): IEEEFloat$;

export function to_bytes_16_be(f: IEEEFloat$): _.BitArray;

export function from_bytes_16_be(bytes: _.BitArray): IEEEFloat$;

export function to_bytes_32_le(f: IEEEFloat$): _.BitArray;

export function from_bytes_32_le(bytes: _.BitArray): IEEEFloat$;

export function to_bytes_32_be(f: IEEEFloat$): _.BitArray;

export function from_bytes_32_be(bytes: _.BitArray): IEEEFloat$;

export function to_bytes_64_le(f: IEEEFloat$): _.BitArray;

export function from_bytes_64_le(bytes: _.BitArray): IEEEFloat$;

export function to_bytes_64_be(f: IEEEFloat$): _.BitArray;

export function from_bytes_64_be(bytes: _.BitArray): IEEEFloat$;

export function absolute_value(f: IEEEFloat$): IEEEFloat$;

export function add(a: IEEEFloat$, b: IEEEFloat$): IEEEFloat$;

export function ceiling(f: IEEEFloat$): IEEEFloat$;

export function compare(a: IEEEFloat$, b: IEEEFloat$): _.Result<
  $order.Order$,
  undefined
>;

export function divide(a: IEEEFloat$, b: IEEEFloat$): IEEEFloat$;

export function floor(f: IEEEFloat$): IEEEFloat$;

export function max(a: IEEEFloat$, b: IEEEFloat$): IEEEFloat$;

export function min(a: IEEEFloat$, b: IEEEFloat$): IEEEFloat$;

export function clamp(
  f: IEEEFloat$,
  min_bound: IEEEFloat$,
  max_bound: IEEEFloat$
): IEEEFloat$;

export function multiply(a: IEEEFloat$, b: IEEEFloat$): IEEEFloat$;

export function negate(f: IEEEFloat$): IEEEFloat$;

export function power(f: IEEEFloat$, exp: IEEEFloat$): IEEEFloat$;

export function random(): IEEEFloat$;

export function round(f: IEEEFloat$): _.Result<number, undefined>;

export function square_root(f: IEEEFloat$): IEEEFloat$;

export function subtract(a: IEEEFloat$, b: IEEEFloat$): IEEEFloat$;

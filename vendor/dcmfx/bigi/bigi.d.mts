import type * as $dynamic from "../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $order from "../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "./gleam.d.mts";

export type BigInt$ = unknown;

export class LittleEndian extends _.CustomType {}

export class BigEndian extends _.CustomType {}

export type Endianness$ = LittleEndian | BigEndian;

export class Signed extends _.CustomType {}

export class Unsigned extends _.CustomType {}

export type Signedness$ = Signed | Unsigned;

export function zero(): BigInt$;

export function from_int(int: number): BigInt$;

export function from_string(str: string): _.Result<BigInt$, undefined>;

export function from_bytes(
  bytes: _.BitArray,
  endianness: Endianness$,
  signedness: Signedness$
): _.Result<BigInt$, undefined>;

export function to_int(bigint: BigInt$): _.Result<number, undefined>;

export function to_string(bigint: BigInt$): string;

export function to_bytes(
  bigint: BigInt$,
  endianness: Endianness$,
  signedness: Signedness$,
  byte_count: number
): _.Result<_.BitArray, undefined>;

export function compare(a: BigInt$, b: BigInt$): $order.Order$;

export function absolute(bigint: BigInt$): BigInt$;

export function negate(bigint: BigInt$): BigInt$;

export function add(a: BigInt$, b: BigInt$): BigInt$;

export function subtract(a: BigInt$, b: BigInt$): BigInt$;

export function multiply(a: BigInt$, b: BigInt$): BigInt$;

export function divide(a: BigInt$, b: BigInt$): BigInt$;

export function divide_no_zero(a: BigInt$, b: BigInt$): _.Result<
  BigInt$,
  undefined
>;

export function remainder(a: BigInt$, b: BigInt$): BigInt$;

export function floor_divide(dividend: BigInt$, divisor: BigInt$): _.Result<
  BigInt$,
  undefined
>;

export function remainder_no_zero(a: BigInt$, b: BigInt$): _.Result<
  BigInt$,
  undefined
>;

export function modulo(a: BigInt$, b: BigInt$): BigInt$;

export function modulo_no_zero(a: BigInt$, b: BigInt$): _.Result<
  BigInt$,
  undefined
>;

export function power(a: BigInt$, b: BigInt$): _.Result<BigInt$, undefined>;

export function decode(dyn: $dynamic.Dynamic$): _.Result<
  BigInt$,
  _.List<$dynamic.DecodeError$>
>;

export function bitwise_and(a: BigInt$, b: BigInt$): BigInt$;

export function bitwise_exclusive_or(a: BigInt$, b: BigInt$): BigInt$;

export function bitwise_not(bigint: BigInt$): BigInt$;

export function bitwise_or(a: BigInt$, b: BigInt$): BigInt$;

export function bitwise_shift_left(bigint: BigInt$, amount: number): BigInt$;

export function bitwise_shift_right(bigint: BigInt$, amount: number): BigInt$;

export function is_odd(bigint: BigInt$): boolean;

export function max(a: BigInt$, b: BigInt$): BigInt$;

export function min(a: BigInt$, b: BigInt$): BigInt$;

export function clamp(bigint: BigInt$, min_bound: BigInt$, max_bound: BigInt$): BigInt$;

export function sum(bigints: _.List<BigInt$>): BigInt$;

export function product(bigints: _.List<BigInt$>): BigInt$;

export function undigits(digits: _.List<number>, base: number): _.Result<
  BigInt$,
  undefined
>;

export function digits(bigint: BigInt$): _.List<number>;

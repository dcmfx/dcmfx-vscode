import type * as $dynamic from "../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $order from "../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "./gleam.d.mts";

export type BigInt$ = {
  __gleam__bigi__BigInt: never;
};

export class LittleEndian extends _.CustomType {
  private __gleam__bigi__LittleEndian: never;
}

export class BigEndian extends _.CustomType {
  private __gleam__bigi__BigEndian: never;
}

export type Endianness$ = LittleEndian | BigEndian;

export class Signed extends _.CustomType {
  private __gleam__bigi__Signed: never;
}

export class Unsigned extends _.CustomType {
  private __gleam__bigi__Unsigned: never;
}

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

export function add(a: BigInt$, b: BigInt$): BigInt$;

export function subtract(a: BigInt$, b: BigInt$): BigInt$;

export function multiply(a: BigInt$, b: BigInt$): BigInt$;

export function divide(a: BigInt$, b: BigInt$): BigInt$;

export function divide_no_zero(a: BigInt$, b: BigInt$): _.Result<
  BigInt$,
  undefined
>;

export function remainder(a: BigInt$, b: BigInt$): BigInt$;

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

export function digits(bigint: BigInt$): _.List<number>;

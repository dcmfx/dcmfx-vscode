import type * as $bigi from "../../../bigi/bigi.d.mts";
import type * as $ieee_float from "../../../ieee_float/ieee_float.d.mts";
import type * as _ from "../../gleam.d.mts";

export function to_int16(bytes: _.BitArray): _.Result<number, undefined>;

export function to_uint16(bytes: _.BitArray): _.Result<number, undefined>;

export function to_int32(bytes: _.BitArray): _.Result<number, undefined>;

export function to_uint32(bytes: _.BitArray): _.Result<number, undefined>;

export function to_int64(bytes: _.BitArray): _.Result<$bigi.BigInt$, undefined>;

export function to_uint64(bytes: _.BitArray): _.Result<$bigi.BigInt$, undefined>;

export function to_float32(bytes: _.BitArray): _.Result<
  $ieee_float.IEEEFloat$,
  undefined
>;

export function to_float64(bytes: _.BitArray): _.Result<
  $ieee_float.IEEEFloat$,
  undefined
>;

export function to_int16_list(bytes: _.BitArray): _.Result<
  _.List<number>,
  undefined
>;

export function to_uint16_list(bytes: _.BitArray): _.Result<
  _.List<number>,
  undefined
>;

export function to_int32_list(bytes: _.BitArray): _.Result<
  _.List<number>,
  undefined
>;

export function to_uint32_list(bytes: _.BitArray): _.Result<
  _.List<number>,
  undefined
>;

export function to_int64_list(bytes: _.BitArray): _.Result<
  _.List<$bigi.BigInt$>,
  undefined
>;

export function to_uint64_list(bytes: _.BitArray): _.Result<
  _.List<$bigi.BigInt$>,
  undefined
>;

export function to_float32_list(bytes: _.BitArray): _.Result<
  _.List<$ieee_float.IEEEFloat$>,
  undefined
>;

export function to_float64_list(bytes: _.BitArray): _.Result<
  _.List<$ieee_float.IEEEFloat$>,
  undefined
>;

export function pad_to_even_length(bytes: _.BitArray, padding_byte: number): _.BitArray;

export function reverse_index(
  bytes: _.BitArray,
  predicate: (x0: number) => boolean
): _.Result<number, undefined>;

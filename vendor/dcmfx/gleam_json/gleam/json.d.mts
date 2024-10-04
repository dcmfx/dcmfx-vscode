import type * as $dynamic from "../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $string_builder from "../../gleam_stdlib/gleam/string_builder.d.mts";
import type * as _ from "../gleam.d.mts";

export type Json$ = {
  __gleam__gleam__json__Json: never;
};

export class UnexpectedEndOfInput extends _.CustomType {
  private __gleam__gleam__json__UnexpectedEndOfInput: never;
}

export class UnexpectedByte extends _.CustomType {
  private __gleam__gleam__json__UnexpectedByte: never;

  constructor(argument$0: string);
  
  0: string;
}

export class UnexpectedSequence extends _.CustomType {
  private __gleam__gleam__json__UnexpectedSequence: never;

  constructor(argument$0: string);
  
  0: string;
}

export class UnexpectedFormat extends _.CustomType {
  private __gleam__gleam__json__UnexpectedFormat: never;

  constructor(argument$0: _.List<$dynamic.DecodeError$>);
  
  0: _.List<$dynamic.DecodeError$>;
}

export type DecodeError$ = UnexpectedEndOfInput | UnexpectedByte | UnexpectedSequence | UnexpectedFormat;

export function decode<CCPJ>(
  json: string,
  decoder: (x0: $dynamic.Dynamic$) => _.Result<
    CCPJ,
    _.List<$dynamic.DecodeError$>
  >
): _.Result<CCPJ, DecodeError$>;

export function decode_bits<CCPT>(
  json: _.BitArray,
  decoder: (x0: $dynamic.Dynamic$) => _.Result<
    CCPT,
    _.List<$dynamic.DecodeError$>
  >
): _.Result<CCPT, DecodeError$>;

export function to_string(json: Json$): string;

export function to_string_builder(json: Json$): $string_builder.StringBuilder$;

export function string(input: string): Json$;

export function bool(input: boolean): Json$;

export function int(input: number): Json$;

export function float(input: number): Json$;

export function null$(): Json$;

export function nullable<CCPZ>(
  input: $option.Option$<CCPZ>,
  inner_type: (x0: CCPZ) => Json$
): Json$;

export function object(entries: _.List<[string, Json$]>): Json$;

export function preprocessed_array(from: _.List<Json$>): Json$;

export function array<CCQD>(
  entries: _.List<CCQD>,
  inner_type: (x0: CCQD) => Json$
): Json$;

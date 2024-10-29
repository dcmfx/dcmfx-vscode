import type * as $dynamic from "../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $string_builder from "../../gleam_stdlib/gleam/string_builder.d.mts";
import type * as _ from "../gleam.d.mts";

export type Json$ = unknown;

export class UnexpectedEndOfInput extends _.CustomType {}

export class UnexpectedByte extends _.CustomType {
  constructor(argument$0: string);
  
  0: string;
}

export class UnexpectedSequence extends _.CustomType {
  constructor(argument$0: string);
  
  0: string;
}

export class UnexpectedFormat extends _.CustomType {
  constructor(argument$0: _.List<$dynamic.DecodeError$>);
  
  0: _.List<$dynamic.DecodeError$>;
}

export type DecodeError$ = UnexpectedEndOfInput | UnexpectedByte | UnexpectedSequence | UnexpectedFormat;

export function decode<CCRG>(
  json: string,
  decoder: (x0: $dynamic.Dynamic$) => _.Result<
    CCRG,
    _.List<$dynamic.DecodeError$>
  >
): _.Result<CCRG, DecodeError$>;

export function decode_bits<CCRQ>(
  json: _.BitArray,
  decoder: (x0: $dynamic.Dynamic$) => _.Result<
    CCRQ,
    _.List<$dynamic.DecodeError$>
  >
): _.Result<CCRQ, DecodeError$>;

export function to_string(json: Json$): string;

export function to_string_builder(json: Json$): $string_builder.StringBuilder$;

export function string(input: string): Json$;

export function bool(input: boolean): Json$;

export function int(input: number): Json$;

export function float(input: number): Json$;

export function null$(): Json$;

export function nullable<CCRW>(
  input: $option.Option$<CCRW>,
  inner_type: (x0: CCRW) => Json$
): Json$;

export function object(entries: _.List<[string, Json$]>): Json$;

export function preprocessed_array(from: _.List<Json$>): Json$;

export function array<CCSA>(
  entries: _.List<CCSA>,
  inner_type: (x0: CCSA) => Json$
): Json$;

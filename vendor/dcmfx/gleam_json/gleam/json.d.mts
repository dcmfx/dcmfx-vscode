import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $dynamic from "../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $decode from "../../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $string_tree from "../../gleam_stdlib/gleam/string_tree.d.mts";
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

export class UnableToDecode extends _.CustomType {
  constructor(argument$0: _.List<$decode.DecodeError$>);
  
  0: _.List<$decode.DecodeError$>;
}

export type DecodeError$ = UnexpectedEndOfInput | UnexpectedByte | UnexpectedSequence | UnableToDecode;

export function parse<CAOO>(json: string, decoder: $decode.Decoder$<CAOO>): _.Result<
  CAOO,
  DecodeError$
>;

export function parse_bits<CAOY>(
  json: _.BitArray,
  decoder: $decode.Decoder$<CAOY>
): _.Result<CAOY, DecodeError$>;

export function to_string(json: Json$): string;

export function to_string_tree(json: Json$): $string_tree.StringTree$;

export function string(input: string): Json$;

export function bool(input: boolean): Json$;

export function int(input: number): Json$;

export function float(input: number): Json$;

export function null$(): Json$;

export function nullable<CAPE>(
  input: $option.Option$<CAPE>,
  inner_type: (x0: CAPE) => Json$
): Json$;

export function object(entries: _.List<[string, Json$]>): Json$;

export function preprocessed_array(from: _.List<Json$>): Json$;

export function array<CAPI>(
  entries: _.List<CAPI>,
  inner_type: (x0: CAPI) => Json$
): Json$;

export function dict<CAPM, CAPN>(
  dict: $dict.Dict$<CAPM, CAPN>,
  keys: (x0: CAPM) => string,
  values: (x0: CAPN) => Json$
): Json$;

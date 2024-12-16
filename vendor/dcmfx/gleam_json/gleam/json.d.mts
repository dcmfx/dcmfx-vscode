import type * as $dynamic from "../../gleam_stdlib/gleam/dynamic.d.mts";
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

export class UnexpectedFormat extends _.CustomType {
  constructor(argument$0: _.List<$dynamic.DecodeError$>);
  
  0: _.List<$dynamic.DecodeError$>;
}

export type DecodeError$ = UnexpectedEndOfInput | UnexpectedByte | UnexpectedSequence | UnexpectedFormat;

export function decode<CCSD>(
  json: string,
  decoder: (x0: $dynamic.Dynamic$) => _.Result<
    CCSD,
    _.List<$dynamic.DecodeError$>
  >
): _.Result<CCSD, DecodeError$>;

export function decode_bits<CCSN>(
  json: _.BitArray,
  decoder: (x0: $dynamic.Dynamic$) => _.Result<
    CCSN,
    _.List<$dynamic.DecodeError$>
  >
): _.Result<CCSN, DecodeError$>;

export function to_string(json: Json$): string;

export function to_string_tree(json: Json$): $string_tree.StringTree$;

export function to_string_builder(json: Json$): $string_tree.StringTree$;

export function string(input: string): Json$;

export function bool(input: boolean): Json$;

export function int(input: number): Json$;

export function float(input: number): Json$;

export function null$(): Json$;

export function nullable<CCST>(
  input: $option.Option$<CCST>,
  inner_type: (x0: CCST) => Json$
): Json$;

export function object(entries: _.List<[string, Json$]>): Json$;

export function preprocessed_array(from: _.List<Json$>): Json$;

export function array<CCSX>(
  entries: _.List<CCSX>,
  inner_type: (x0: CCSX) => Json$
): Json$;

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

export class UnexpectedFormat extends _.CustomType {
  constructor(argument$0: _.List<$dynamic.DecodeError$>);
  
  0: _.List<$dynamic.DecodeError$>;
}

export class UnableToDecode extends _.CustomType {
  constructor(argument$0: _.List<$decode.DecodeError$>);
  
  0: _.List<$decode.DecodeError$>;
}

export type DecodeError$ = UnexpectedEndOfInput | UnexpectedByte | UnexpectedSequence | UnexpectedFormat | UnableToDecode;

export function decode<CBYA>(
  json: string,
  decoder: (x0: $dynamic.Dynamic$) => _.Result<
    CBYA,
    _.List<$dynamic.DecodeError$>
  >
): _.Result<CBYA, DecodeError$>;

export function parse<CBYE>(json: string, decoder: $decode.Decoder$<CBYE>): _.Result<
  CBYE,
  DecodeError$
>;

export function decode_bits<CBYS>(
  json: _.BitArray,
  decoder: (x0: $dynamic.Dynamic$) => _.Result<
    CBYS,
    _.List<$dynamic.DecodeError$>
  >
): _.Result<CBYS, DecodeError$>;

export function parse_bits<CBYW>(
  json: _.BitArray,
  decoder: $decode.Decoder$<CBYW>
): _.Result<CBYW, DecodeError$>;

export function to_string(json: Json$): string;

export function to_string_tree(json: Json$): $string_tree.StringTree$;

export function to_string_builder(json: Json$): $string_tree.StringTree$;

export function string(input: string): Json$;

export function bool(input: boolean): Json$;

export function int(input: number): Json$;

export function float(input: number): Json$;

export function null$(): Json$;

export function nullable<CBZC>(
  input: $option.Option$<CBZC>,
  inner_type: (x0: CBZC) => Json$
): Json$;

export function object(entries: _.List<[string, Json$]>): Json$;

export function preprocessed_array(from: _.List<Json$>): Json$;

export function array<CBZG>(
  entries: _.List<CBZG>,
  inner_type: (x0: CBZG) => Json$
): Json$;

export function dict<CBZK, CBZL>(
  dict: $dict.Dict$<CBZK, CBZL>,
  keys: (x0: CBZK) => string,
  values: (x0: CBZL) => Json$
): Json$;

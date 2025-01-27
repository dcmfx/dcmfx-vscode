import type * as _ from "../../gleam.d.mts";
import type * as $dict from "../../gleam/dict.d.mts";
import type * as $dynamic from "../../gleam/dynamic.d.mts";
import type * as $option from "../../gleam/option.d.mts";

export class DecodeError extends _.CustomType {
  constructor(expected: string, found: string, path: _.List<string>);
  
  expected: string;
  found: string;
  path: _.List<string>;
}

export type DecodeError$ = DecodeError;

declare class Decoder<DNR> extends _.CustomType {
  constructor(function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>]);
  
  function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>];
}

export type Decoder$<DNR> = Decoder<DNR>;

export type Dynamic = $dynamic.Dynamic$;

export function run<DNZ>(data: $dynamic.Dynamic$, decoder: Decoder$<DNZ>): _.Result<
  DNZ,
  _.List<DecodeError$>
>;

export function success<DPA>(data: DPA): Decoder$<DPA>;

export function map<DRX, DRZ>(
  decoder: Decoder$<DRX>,
  transformer: (x0: DRX) => DRZ
): Decoder$<DRZ>;

export function map_errors<DSB>(
  decoder: Decoder$<DSB>,
  transformer: (x0: _.List<DecodeError$>) => _.List<DecodeError$>
): Decoder$<DSB>;

export function then$<DSJ, DSL>(
  decoder: Decoder$<DSJ>,
  next: (x0: DSJ) => Decoder$<DSL>
): Decoder$<DSL>;

export function one_of<DSO>(
  first: Decoder$<DSO>,
  alternatives: _.List<Decoder$<DSO>>
): Decoder$<DSO>;

export function recursive<DTE>(inner: () => Decoder$<DTE>): Decoder$<DTE>;

export function optional<DRT>(inner: Decoder$<DRT>): Decoder$<
  $option.Option$<DRT>
>;

export const dynamic: Decoder$<$dynamic.Dynamic$>;

export function decode_error(expected: string, found: $dynamic.Dynamic$): _.List<
  DecodeError$
>;

export function collapse_errors<DSG>(decoder: Decoder$<DSG>, name: string): Decoder$<
  DSG
>;

export function failure<DSY>(zero: DSY, expected: string): Decoder$<DSY>;

export function new_primitive_decoder<DTA>(
  name: string,
  decoding_function: (x0: $dynamic.Dynamic$) => _.Result<DTA, DTA>
): Decoder$<DTA>;

export const bool: Decoder$<boolean>;

export const int: Decoder$<number>;

export const float: Decoder$<number>;

export const bit_array: Decoder$<_.BitArray>;

export const string: Decoder$<string>;

export function dict<DQY, DRA>(key: Decoder$<DQY>, value: Decoder$<DRA>): Decoder$<
  $dict.Dict$<DQY, DRA>
>;

export function list<DQM>(inner: Decoder$<DQM>): Decoder$<_.List<DQM>>;

export function subfield<DNU, DNW>(
  field_path: _.List<any>,
  field_decoder: Decoder$<DNU>,
  next: (x0: DNU) => Decoder$<DNW>
): Decoder$<DNW>;

export function at<DOG>(path: _.List<any>, inner: Decoder$<DOG>): Decoder$<DOG>;

export function field<DPE, DPG>(
  field_name: any,
  field_decoder: Decoder$<DPE>,
  next: (x0: DPE) => Decoder$<DPG>
): Decoder$<DPG>;

export function optional_field<DPK, DPM>(
  key: any,
  default$: DPK,
  field_decoder: Decoder$<DPK>,
  next: (x0: DPK) => Decoder$<DPM>
): Decoder$<DPM>;

export function optionally_at<DPR>(
  path: _.List<any>,
  default$: DPR,
  inner: Decoder$<DPR>
): Decoder$<DPR>;

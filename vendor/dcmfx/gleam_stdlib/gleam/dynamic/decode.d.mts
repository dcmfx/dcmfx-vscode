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

declare class Decoder<DPU> extends _.CustomType {
  constructor(function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>]);
  
  function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>];
}

export type Decoder$<DPU> = Decoder<DPU>;

export type Dynamic = $dynamic.Dynamic$;

export function run<DQC>(data: $dynamic.Dynamic$, decoder: Decoder$<DQC>): _.Result<
  DQC,
  _.List<DecodeError$>
>;

export function success<DRD>(data: DRD): Decoder$<DRD>;

export function map<DTR, DTT>(
  decoder: Decoder$<DTR>,
  transformer: (x0: DTR) => DTT
): Decoder$<DTT>;

export function map_errors<DTV>(
  decoder: Decoder$<DTV>,
  transformer: (x0: _.List<DecodeError$>) => _.List<DecodeError$>
): Decoder$<DTV>;

export function then$<DUD, DUF>(
  decoder: Decoder$<DUD>,
  next: (x0: DUD) => Decoder$<DUF>
): Decoder$<DUF>;

export function one_of<DUI>(
  first: Decoder$<DUI>,
  alternatives: _.List<Decoder$<DUI>>
): Decoder$<DUI>;

export function recursive<DUY>(inner: () => Decoder$<DUY>): Decoder$<DUY>;

export const dynamic: Decoder$<$dynamic.Dynamic$>;

export function decode_error(expected: string, found: $dynamic.Dynamic$): _.List<
  DecodeError$
>;

export function optional<DTN>(inner: Decoder$<DTN>): Decoder$<
  $option.Option$<DTN>
>;

export function collapse_errors<DUA>(decoder: Decoder$<DUA>, name: string): Decoder$<
  DUA
>;

export function failure<DUS>(zero: DUS, expected: string): Decoder$<DUS>;

export function new_primitive_decoder<DUU>(
  name: string,
  decoding_function: (x0: $dynamic.Dynamic$) => _.Result<DUU, DUU>
): Decoder$<DUU>;

export function dict<DSS, DSU>(key: Decoder$<DSS>, value: Decoder$<DSU>): Decoder$<
  $dict.Dict$<DSS, DSU>
>;

export function list<DSG>(inner: Decoder$<DSG>): Decoder$<_.List<DSG>>;

export function subfield<DPX, DPZ>(
  field_path: _.List<any>,
  field_decoder: Decoder$<DPX>,
  next: (x0: DPX) => Decoder$<DPZ>
): Decoder$<DPZ>;

export function at<DQJ>(path: _.List<any>, inner: Decoder$<DQJ>): Decoder$<DQJ>;

export function field<DRH, DRJ>(
  field_name: any,
  field_decoder: Decoder$<DRH>,
  next: (x0: DRH) => Decoder$<DRJ>
): Decoder$<DRJ>;

export function optional_field<DRN, DRP>(
  key: any,
  default$: DRN,
  field_decoder: Decoder$<DRN>,
  next: (x0: DRN) => Decoder$<DRP>
): Decoder$<DRP>;

export function optionally_at<DRU>(
  path: _.List<any>,
  default$: DRU,
  inner: Decoder$<DRU>
): Decoder$<DRU>;

export const string: Decoder$<string>;

export const bool: Decoder$<boolean>;

export const int: Decoder$<number>;

export const float: Decoder$<number>;

export const bit_array: Decoder$<_.BitArray>;

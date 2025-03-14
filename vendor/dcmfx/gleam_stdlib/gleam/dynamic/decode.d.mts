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

declare class Decoder<DOZ> extends _.CustomType {
  constructor(function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>]);
  
  function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>];
}

export type Decoder$<DOZ> = Decoder<DOZ>;

export type Dynamic = $dynamic.Dynamic$;

export function run<DPH>(data: $dynamic.Dynamic$, decoder: Decoder$<DPH>): _.Result<
  DPH,
  _.List<DecodeError$>
>;

export function success<DQI>(data: DQI): Decoder$<DQI>;

export function map<DTF, DTH>(
  decoder: Decoder$<DTF>,
  transformer: (x0: DTF) => DTH
): Decoder$<DTH>;

export function map_errors<DTJ>(
  decoder: Decoder$<DTJ>,
  transformer: (x0: _.List<DecodeError$>) => _.List<DecodeError$>
): Decoder$<DTJ>;

export function then$<DTR, DTT>(
  decoder: Decoder$<DTR>,
  next: (x0: DTR) => Decoder$<DTT>
): Decoder$<DTT>;

export function one_of<DTW>(
  first: Decoder$<DTW>,
  alternatives: _.List<Decoder$<DTW>>
): Decoder$<DTW>;

export function recursive<DUM>(inner: () => Decoder$<DUM>): Decoder$<DUM>;

export function optional<DTB>(inner: Decoder$<DTB>): Decoder$<
  $option.Option$<DTB>
>;

export const dynamic: Decoder$<$dynamic.Dynamic$>;

export function decode_error(expected: string, found: $dynamic.Dynamic$): _.List<
  DecodeError$
>;

export function collapse_errors<DTO>(decoder: Decoder$<DTO>, name: string): Decoder$<
  DTO
>;

export function failure<DUG>(zero: DUG, expected: string): Decoder$<DUG>;

export function new_primitive_decoder<DUI>(
  name: string,
  decoding_function: (x0: $dynamic.Dynamic$) => _.Result<DUI, DUI>
): Decoder$<DUI>;

export const bool: Decoder$<boolean>;

export const int: Decoder$<number>;

export const float: Decoder$<number>;

export const bit_array: Decoder$<_.BitArray>;

export const string: Decoder$<string>;

export function dict<DSG, DSI>(key: Decoder$<DSG>, value: Decoder$<DSI>): Decoder$<
  $dict.Dict$<DSG, DSI>
>;

export function list<DRU>(inner: Decoder$<DRU>): Decoder$<_.List<DRU>>;

export function subfield<DPC, DPE>(
  field_path: _.List<any>,
  field_decoder: Decoder$<DPC>,
  next: (x0: DPC) => Decoder$<DPE>
): Decoder$<DPE>;

export function at<DPO>(path: _.List<any>, inner: Decoder$<DPO>): Decoder$<DPO>;

export function field<DQM, DQO>(
  field_name: any,
  field_decoder: Decoder$<DQM>,
  next: (x0: DQM) => Decoder$<DQO>
): Decoder$<DQO>;

export function optional_field<DQS, DQU>(
  key: any,
  default$: DQS,
  field_decoder: Decoder$<DQS>,
  next: (x0: DQS) => Decoder$<DQU>
): Decoder$<DQU>;

export function optionally_at<DQZ>(
  path: _.List<any>,
  default$: DQZ,
  inner: Decoder$<DQZ>
): Decoder$<DQZ>;

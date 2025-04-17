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

declare class Decoder<DOX> extends _.CustomType {
  constructor(function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>]);
  
  function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>];
}

export type Decoder$<DOX> = Decoder<DOX>;

export type Dynamic = $dynamic.Dynamic$;

export function run<DPF>(data: $dynamic.Dynamic$, decoder: Decoder$<DPF>): _.Result<
  DPF,
  _.List<DecodeError$>
>;

export function success<DQG>(data: DQG): Decoder$<DQG>;

export function map<DTD, DTF>(
  decoder: Decoder$<DTD>,
  transformer: (x0: DTD) => DTF
): Decoder$<DTF>;

export function map_errors<DTH>(
  decoder: Decoder$<DTH>,
  transformer: (x0: _.List<DecodeError$>) => _.List<DecodeError$>
): Decoder$<DTH>;

export function then$<DTP, DTR>(
  decoder: Decoder$<DTP>,
  next: (x0: DTP) => Decoder$<DTR>
): Decoder$<DTR>;

export function one_of<DTU>(
  first: Decoder$<DTU>,
  alternatives: _.List<Decoder$<DTU>>
): Decoder$<DTU>;

export function recursive<DUK>(inner: () => Decoder$<DUK>): Decoder$<DUK>;

export function optional<DSZ>(inner: Decoder$<DSZ>): Decoder$<
  $option.Option$<DSZ>
>;

export const dynamic: Decoder$<$dynamic.Dynamic$>;

export function decode_error(expected: string, found: $dynamic.Dynamic$): _.List<
  DecodeError$
>;

export function collapse_errors<DTM>(decoder: Decoder$<DTM>, name: string): Decoder$<
  DTM
>;

export function failure<DUE>(zero: DUE, expected: string): Decoder$<DUE>;

export function new_primitive_decoder<DUG>(
  name: string,
  decoding_function: (x0: $dynamic.Dynamic$) => _.Result<DUG, DUG>
): Decoder$<DUG>;

export const bool: Decoder$<boolean>;

export const int: Decoder$<number>;

export const float: Decoder$<number>;

export const bit_array: Decoder$<_.BitArray>;

export const string: Decoder$<string>;

export function dict<DSE, DSG>(key: Decoder$<DSE>, value: Decoder$<DSG>): Decoder$<
  $dict.Dict$<DSE, DSG>
>;

export function list<DRS>(inner: Decoder$<DRS>): Decoder$<_.List<DRS>>;

export function subfield<DPA, DPC>(
  field_path: _.List<any>,
  field_decoder: Decoder$<DPA>,
  next: (x0: DPA) => Decoder$<DPC>
): Decoder$<DPC>;

export function at<DPM>(path: _.List<any>, inner: Decoder$<DPM>): Decoder$<DPM>;

export function field<DQK, DQM>(
  field_name: any,
  field_decoder: Decoder$<DQK>,
  next: (x0: DQK) => Decoder$<DQM>
): Decoder$<DQM>;

export function optional_field<DQQ, DQS>(
  key: any,
  default$: DQQ,
  field_decoder: Decoder$<DQQ>,
  next: (x0: DQQ) => Decoder$<DQS>
): Decoder$<DQS>;

export function optionally_at<DQX>(
  path: _.List<any>,
  default$: DQX,
  inner: Decoder$<DQX>
): Decoder$<DQX>;

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

declare class Decoder<DQM> extends _.CustomType {
  constructor(function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>]);
  
  function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>];
}

export type Decoder$<DQM> = Decoder<DQM>;

export type Dynamic = $dynamic.Dynamic$;

export function run<DQU>(data: $dynamic.Dynamic$, decoder: Decoder$<DQU>): _.Result<
  DQU,
  _.List<DecodeError$>
>;

export function success<DRV>(data: DRV): Decoder$<DRV>;

export function map<DUJ, DUL>(
  decoder: Decoder$<DUJ>,
  transformer: (x0: DUJ) => DUL
): Decoder$<DUL>;

export function map_errors<DUN>(
  decoder: Decoder$<DUN>,
  transformer: (x0: _.List<DecodeError$>) => _.List<DecodeError$>
): Decoder$<DUN>;

export function then$<DUV, DUX>(
  decoder: Decoder$<DUV>,
  next: (x0: DUV) => Decoder$<DUX>
): Decoder$<DUX>;

export function one_of<DVA>(
  first: Decoder$<DVA>,
  alternatives: _.List<Decoder$<DVA>>
): Decoder$<DVA>;

export function recursive<DVQ>(inner: () => Decoder$<DVQ>): Decoder$<DVQ>;

export const dynamic: Decoder$<$dynamic.Dynamic$>;

export function decode_error(expected: string, found: $dynamic.Dynamic$): _.List<
  DecodeError$
>;

export function optional<DUF>(inner: Decoder$<DUF>): Decoder$<
  $option.Option$<DUF>
>;

export function collapse_errors<DUS>(decoder: Decoder$<DUS>, name: string): Decoder$<
  DUS
>;

export function failure<DVK>(zero: DVK, expected: string): Decoder$<DVK>;

export function new_primitive_decoder<DVM>(
  name: string,
  decoding_function: (x0: $dynamic.Dynamic$) => _.Result<DVM, DVM>
): Decoder$<DVM>;

export function dict<DTK, DTM>(key: Decoder$<DTK>, value: Decoder$<DTM>): Decoder$<
  $dict.Dict$<DTK, DTM>
>;

export function list<DSY>(inner: Decoder$<DSY>): Decoder$<_.List<DSY>>;

export function subfield<DQP, DQR>(
  field_path: _.List<any>,
  field_decoder: Decoder$<DQP>,
  next: (x0: DQP) => Decoder$<DQR>
): Decoder$<DQR>;

export function at<DRB>(path: _.List<any>, inner: Decoder$<DRB>): Decoder$<DRB>;

export function field<DRZ, DSB>(
  field_name: any,
  field_decoder: Decoder$<DRZ>,
  next: (x0: DRZ) => Decoder$<DSB>
): Decoder$<DSB>;

export function optional_field<DSF, DSH>(
  key: any,
  default$: DSF,
  field_decoder: Decoder$<DSF>,
  next: (x0: DSF) => Decoder$<DSH>
): Decoder$<DSH>;

export function optionally_at<DSM>(
  path: _.List<any>,
  default$: DSM,
  inner: Decoder$<DSM>
): Decoder$<DSM>;

export const string: Decoder$<string>;

export const bool: Decoder$<boolean>;

export const int: Decoder$<number>;

export const float: Decoder$<number>;

export const bit_array: Decoder$<_.BitArray>;

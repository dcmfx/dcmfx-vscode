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

declare class Decoder<BXJ> extends _.CustomType {
  constructor(function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>]);
  
  function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>];
}

export type Decoder$<BXJ> = Decoder<BXJ>;

export type Dynamic = $dynamic.Dynamic$;

export function run<BXR>(data: $dynamic.Dynamic$, decoder: Decoder$<BXR>): _.Result<
  BXR,
  _.List<DecodeError$>
>;

export function success<BYS>(data: BYS): Decoder$<BYS>;

export function map<CBP, CBR>(
  decoder: Decoder$<CBP>,
  transformer: (x0: CBP) => CBR
): Decoder$<CBR>;

export function map_errors<CBT>(
  decoder: Decoder$<CBT>,
  transformer: (x0: _.List<DecodeError$>) => _.List<DecodeError$>
): Decoder$<CBT>;

export function then$<CCB, CCD>(
  decoder: Decoder$<CCB>,
  next: (x0: CCB) => Decoder$<CCD>
): Decoder$<CCD>;

export function one_of<CCG>(
  first: Decoder$<CCG>,
  alternatives: _.List<Decoder$<CCG>>
): Decoder$<CCG>;

export function recursive<CCW>(inner: () => Decoder$<CCW>): Decoder$<CCW>;

export function optional<CBL>(inner: Decoder$<CBL>): Decoder$<
  $option.Option$<CBL>
>;

export const dynamic: Decoder$<$dynamic.Dynamic$>;

export function decode_error(expected: string, found: $dynamic.Dynamic$): _.List<
  DecodeError$
>;

export function collapse_errors<CBY>(decoder: Decoder$<CBY>, name: string): Decoder$<
  CBY
>;

export function failure<CCQ>(zero: CCQ, expected: string): Decoder$<CCQ>;

export function new_primitive_decoder<CCS>(
  name: string,
  decoding_function: (x0: $dynamic.Dynamic$) => _.Result<CCS, CCS>
): Decoder$<CCS>;

export const bool: Decoder$<boolean>;

export const int: Decoder$<number>;

export const float: Decoder$<number>;

export const bit_array: Decoder$<_.BitArray>;

export const string: Decoder$<string>;

export function dict<CAQ, CAS>(key: Decoder$<CAQ>, value: Decoder$<CAS>): Decoder$<
  $dict.Dict$<CAQ, CAS>
>;

export function list<CAE>(inner: Decoder$<CAE>): Decoder$<_.List<CAE>>;

export function subfield<BXM, BXO>(
  field_path: _.List<any>,
  field_decoder: Decoder$<BXM>,
  next: (x0: BXM) => Decoder$<BXO>
): Decoder$<BXO>;

export function at<BXY>(path: _.List<any>, inner: Decoder$<BXY>): Decoder$<BXY>;

export function field<BYW, BYY>(
  field_name: any,
  field_decoder: Decoder$<BYW>,
  next: (x0: BYW) => Decoder$<BYY>
): Decoder$<BYY>;

export function optional_field<BZC, BZE>(
  key: any,
  default$: BZC,
  field_decoder: Decoder$<BZC>,
  next: (x0: BZC) => Decoder$<BZE>
): Decoder$<BZE>;

export function optionally_at<BZJ>(
  path: _.List<any>,
  default$: BZJ,
  inner: Decoder$<BZJ>
): Decoder$<BZJ>;

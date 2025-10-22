import type * as _ from "../../gleam.d.mts";
import type * as $dict from "../../gleam/dict.d.mts";
import type * as $dynamic from "../../gleam/dynamic.d.mts";
import type * as $option from "../../gleam/option.d.mts";

export class DecodeError extends _.CustomType {
  /** @deprecated */
  constructor(expected: string, found: string, path: _.List<string>);
  /** @deprecated */
  expected: string;
  /** @deprecated */
  found: string;
  /** @deprecated */
  path: _.List<string>;
}
export function DecodeError$DecodeError(
  expected: string,
  found: string,
  path: _.List<string>,
): DecodeError$;
export function DecodeError$isDecodeError(value: DecodeError$): boolean;
export function DecodeError$DecodeError$0(value: DecodeError$): string;
export function DecodeError$DecodeError$expected(value: DecodeError$): string;
export function DecodeError$DecodeError$1(value: DecodeError$): string;
export function DecodeError$DecodeError$found(value: DecodeError$): string;
export function DecodeError$DecodeError$2(value: DecodeError$): _.List<string>;
export function DecodeError$DecodeError$path(value: DecodeError$): _.List<
  string
>;

export type DecodeError$ = DecodeError;

declare class Decoder<BUI> extends _.CustomType {
  /** @deprecated */
  constructor(function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>]);
  /** @deprecated */
  function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>];
}

export type Decoder$<BUI> = Decoder<BUI>;

export type Dynamic = $dynamic.Dynamic$;

export function run<BUQ>(data: $dynamic.Dynamic$, decoder: Decoder$<BUQ>): _.Result<
  BUQ,
  _.List<DecodeError$>
>;

export function success<BVR>(data: BVR): Decoder$<BVR>;

export function map<BYO, BYQ>(
  decoder: Decoder$<BYO>,
  transformer: (x0: BYO) => BYQ
): Decoder$<BYQ>;

export function map_errors<BYS>(
  decoder: Decoder$<BYS>,
  transformer: (x0: _.List<DecodeError$>) => _.List<DecodeError$>
): Decoder$<BYS>;

export function then$<BZA, BZC>(
  decoder: Decoder$<BZA>,
  next: (x0: BZA) => Decoder$<BZC>
): Decoder$<BZC>;

export function one_of<BZF>(
  first: Decoder$<BZF>,
  alternatives: _.List<Decoder$<BZF>>
): Decoder$<BZF>;

export function recursive<BZV>(inner: () => Decoder$<BZV>): Decoder$<BZV>;

export function optional<BYK>(inner: Decoder$<BYK>): Decoder$<
  $option.Option$<BYK>
>;

export const dynamic: Decoder$<$dynamic.Dynamic$>;

export function decode_error(expected: string, found: $dynamic.Dynamic$): _.List<
  DecodeError$
>;

export function collapse_errors<BYX>(decoder: Decoder$<BYX>, name: string): Decoder$<
  BYX
>;

export function failure<BZP>(zero: BZP, expected: string): Decoder$<BZP>;

export function new_primitive_decoder<BZR>(
  name: string,
  decoding_function: (x0: $dynamic.Dynamic$) => _.Result<BZR, BZR>
): Decoder$<BZR>;

export const bool: Decoder$<boolean>;

export const int: Decoder$<number>;

export const float: Decoder$<number>;

export const bit_array: Decoder$<_.BitArray>;

export const string: Decoder$<string>;

export function dict<BXP, BXR>(key: Decoder$<BXP>, value: Decoder$<BXR>): Decoder$<
  $dict.Dict$<BXP, BXR>
>;

export function list<BXD>(inner: Decoder$<BXD>): Decoder$<_.List<BXD>>;

export function subfield<BUL, BUN>(
  field_path: _.List<any>,
  field_decoder: Decoder$<BUL>,
  next: (x0: BUL) => Decoder$<BUN>
): Decoder$<BUN>;

export function at<BUX>(path: _.List<any>, inner: Decoder$<BUX>): Decoder$<BUX>;

export function field<BVV, BVX>(
  field_name: any,
  field_decoder: Decoder$<BVV>,
  next: (x0: BVV) => Decoder$<BVX>
): Decoder$<BVX>;

export function optional_field<BWB, BWD>(
  key: any,
  default$: BWB,
  field_decoder: Decoder$<BWB>,
  next: (x0: BWB) => Decoder$<BWD>
): Decoder$<BWD>;

export function optionally_at<BWI>(
  path: _.List<any>,
  default$: BWI,
  inner: Decoder$<BWI>
): Decoder$<BWI>;

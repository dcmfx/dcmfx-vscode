import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_error from "../../dcmfx_core/data_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class StructuredTime extends _.CustomType {
  /** @deprecated */
  constructor(
    hour: number,
    minute: $option.Option$<number>,
    second: $option.Option$<number>
  );
  /** @deprecated */
  hour: number;
  /** @deprecated */
  minute: $option.Option$<number>;
  /** @deprecated */
  second: $option.Option$<number>;
}
export function StructuredTime$StructuredTime(
  hour: number,
  minute: $option.Option$<number>,
  second: $option.Option$<number>,
): StructuredTime$;
export function StructuredTime$isStructuredTime(
  value: StructuredTime$,
): boolean;
export function StructuredTime$StructuredTime$0(value: StructuredTime$): number;
export function StructuredTime$StructuredTime$hour(value: StructuredTime$): number;
export function StructuredTime$StructuredTime$1(
  value: StructuredTime$,
): $option.Option$<number>;
export function StructuredTime$StructuredTime$minute(value: StructuredTime$): $option.Option$<
  number
>;
export function StructuredTime$StructuredTime$2(value: StructuredTime$): $option.Option$<
  number
>;
export function StructuredTime$StructuredTime$second(value: StructuredTime$): $option.Option$<
  number
>;

export type StructuredTime$ = StructuredTime;

export function from_bytes(bytes: _.BitArray): _.Result<
  StructuredTime$,
  $data_error.DataError$
>;

export function to_string(value: StructuredTime$): _.Result<
  string,
  $data_error.DataError$
>;

export function to_bytes(time: StructuredTime$): _.Result<
  _.BitArray,
  $data_error.DataError$
>;

export function to_iso8601(time: StructuredTime$): string;

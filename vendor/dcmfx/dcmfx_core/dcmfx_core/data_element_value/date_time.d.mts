import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_error from "../../dcmfx_core/data_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class StructuredDateTime extends _.CustomType {
  /** @deprecated */
  constructor(
    year: number,
    month: $option.Option$<number>,
    day: $option.Option$<number>,
    hour: $option.Option$<number>,
    minute: $option.Option$<number>,
    second: $option.Option$<number>,
    time_zone_offset: $option.Option$<number>
  );
  /** @deprecated */
  year: number;
  /** @deprecated */
  month: $option.Option$<number>;
  /** @deprecated */
  day: $option.Option$<number>;
  /** @deprecated */
  hour: $option.Option$<number>;
  /** @deprecated */
  minute: $option.Option$<number>;
  /** @deprecated */
  second: $option.Option$<number>;
  /** @deprecated */
  time_zone_offset: $option.Option$<number>;
}
export function StructuredDateTime$StructuredDateTime(
  year: number,
  month: $option.Option$<number>,
  day: $option.Option$<number>,
  hour: $option.Option$<number>,
  minute: $option.Option$<number>,
  second: $option.Option$<number>,
  time_zone_offset: $option.Option$<number>,
): StructuredDateTime$;
export function StructuredDateTime$isStructuredDateTime(
  value: StructuredDateTime$,
): boolean;
export function StructuredDateTime$StructuredDateTime$0(value: StructuredDateTime$): number;
export function StructuredDateTime$StructuredDateTime$year(
  value: StructuredDateTime$,
): number;
export function StructuredDateTime$StructuredDateTime$1(value: StructuredDateTime$): $option.Option$<
  number
>;
export function StructuredDateTime$StructuredDateTime$month(value: StructuredDateTime$): $option.Option$<
  number
>;
export function StructuredDateTime$StructuredDateTime$2(value: StructuredDateTime$): $option.Option$<
  number
>;
export function StructuredDateTime$StructuredDateTime$day(value: StructuredDateTime$): $option.Option$<
  number
>;
export function StructuredDateTime$StructuredDateTime$3(value: StructuredDateTime$): $option.Option$<
  number
>;
export function StructuredDateTime$StructuredDateTime$hour(value: StructuredDateTime$): $option.Option$<
  number
>;
export function StructuredDateTime$StructuredDateTime$4(value: StructuredDateTime$): $option.Option$<
  number
>;
export function StructuredDateTime$StructuredDateTime$minute(value: StructuredDateTime$): $option.Option$<
  number
>;
export function StructuredDateTime$StructuredDateTime$5(value: StructuredDateTime$): $option.Option$<
  number
>;
export function StructuredDateTime$StructuredDateTime$second(value: StructuredDateTime$): $option.Option$<
  number
>;
export function StructuredDateTime$StructuredDateTime$6(value: StructuredDateTime$): $option.Option$<
  number
>;
export function StructuredDateTime$StructuredDateTime$time_zone_offset(value: StructuredDateTime$): $option.Option$<
  number
>;

export type StructuredDateTime$ = StructuredDateTime;

export function from_bytes(bytes: _.BitArray): _.Result<
  StructuredDateTime$,
  $data_error.DataError$
>;

export function to_bytes(value: StructuredDateTime$): _.Result<
  _.BitArray,
  $data_error.DataError$
>;

export function to_iso8601(date_time: StructuredDateTime$): string;

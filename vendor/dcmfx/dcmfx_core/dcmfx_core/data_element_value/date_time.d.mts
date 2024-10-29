import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_error from "../../dcmfx_core/data_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class StructuredDateTime extends _.CustomType {
  constructor(
    year: number,
    month: $option.Option$<number>,
    day: $option.Option$<number>,
    hour: $option.Option$<number>,
    minute: $option.Option$<number>,
    second: $option.Option$<number>,
    time_zone_offset: $option.Option$<number>
  );
  
  year: number;
  month: $option.Option$<number>;
  day: $option.Option$<number>;
  hour: $option.Option$<number>;
  minute: $option.Option$<number>;
  second: $option.Option$<number>;
  time_zone_offset: $option.Option$<number>;
}

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

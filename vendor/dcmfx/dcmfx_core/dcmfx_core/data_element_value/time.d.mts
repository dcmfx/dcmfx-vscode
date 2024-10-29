import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_error from "../../dcmfx_core/data_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class StructuredTime extends _.CustomType {
  constructor(
    hour: number,
    minute: $option.Option$<number>,
    second: $option.Option$<number>
  );
  
  hour: number;
  minute: $option.Option$<number>;
  second: $option.Option$<number>;
}

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

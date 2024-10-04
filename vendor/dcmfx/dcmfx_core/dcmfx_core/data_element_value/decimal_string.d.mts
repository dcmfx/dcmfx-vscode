import type * as $data_error from "../../dcmfx_core/data_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export function from_bytes(bytes: _.BitArray): _.Result<
  _.List<number>,
  $data_error.DataError$
>;

export function to_bytes(values: _.List<number>): _.BitArray;

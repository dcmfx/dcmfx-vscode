import type * as $data_error from "../../dcmfx_core/data_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export function is_valid(uid: string): boolean;

export function to_bytes(uids: _.List<string>): _.Result<
  _.BitArray,
  $data_error.DataError$
>;

export function new$(prefix: string): _.Result<string, undefined>;

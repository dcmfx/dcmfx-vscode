import type * as $data_element_tag from "../../dcmfx_core/data_element_tag.d.mts";
import type * as $data_error from "../../dcmfx_core/data_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export function from_bytes(bytes: _.BitArray): _.Result<
  _.List<$data_element_tag.DataElementTag$>,
  $data_error.DataError$
>;

export function to_bytes(values: _.List<$data_element_tag.DataElementTag$>): _.Result<
  _.BitArray,
  $data_error.DataError$
>;

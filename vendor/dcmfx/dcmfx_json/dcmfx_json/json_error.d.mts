import type * as $data_error from "../../dcmfx_core/dcmfx_core/data_error.d.mts";
import type * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
import type * as _ from "../gleam.d.mts";

export class DataError extends _.CustomType {
  constructor(data_error: $data_error.DataError$);
  
  data_error: $data_error.DataError$;
}

export type JsonSerializeError$ = DataError;

export class JsonInvalid extends _.CustomType {
  constructor(details: string, path: $data_set_path.DataSetPath$);
  
  details: string;
  path: $data_set_path.DataSetPath$;
}

export type JsonDeserializeError$ = JsonInvalid;

export function serialize_error_to_lines(
  error: JsonSerializeError$,
  task_description: string
): _.List<string>;

export function deserialize_error_to_lines(
  error: JsonDeserializeError$,
  task_description: string
): _.List<string>;

export function print_serialize_error(
  error: JsonSerializeError$,
  task_description: string
): undefined;

export function print_deserialize_error(
  error: JsonDeserializeError$,
  task_description: string
): undefined;

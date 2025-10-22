import type * as $data_error from "../../dcmfx_core/dcmfx_core/data_error.d.mts";
import type * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
import type * as $p10_error from "../../dcmfx_p10/dcmfx_p10/p10_error.d.mts";
import type * as _ from "../gleam.d.mts";

export class DataError extends _.CustomType {
  /** @deprecated */
  constructor(data_error: $data_error.DataError$);
  /** @deprecated */
  data_error: $data_error.DataError$;
}
export function JsonSerializeError$DataError(
  data_error: $data_error.DataError$,
): JsonSerializeError$;
export function JsonSerializeError$isDataError(
  value: JsonSerializeError$,
): boolean;
export function JsonSerializeError$DataError$0(value: JsonSerializeError$): $data_error.DataError$;
export function JsonSerializeError$DataError$data_error(
  value: JsonSerializeError$,
): $data_error.DataError$;

export class P10Error extends _.CustomType {
  /** @deprecated */
  constructor(p10_error: $p10_error.P10Error$);
  /** @deprecated */
  p10_error: $p10_error.P10Error$;
}
export function JsonSerializeError$P10Error(
  p10_error: $p10_error.P10Error$,
): JsonSerializeError$;
export function JsonSerializeError$isP10Error(
  value: JsonSerializeError$,
): boolean;
export function JsonSerializeError$P10Error$0(value: JsonSerializeError$): $p10_error.P10Error$;
export function JsonSerializeError$P10Error$p10_error(
  value: JsonSerializeError$,
): $p10_error.P10Error$;

export type JsonSerializeError$ = DataError | P10Error;

export class JsonInvalid extends _.CustomType {
  /** @deprecated */
  constructor(details: string, path: $data_set_path.DataSetPath$);
  /** @deprecated */
  details: string;
  /** @deprecated */
  path: $data_set_path.DataSetPath$;
}
export function JsonDeserializeError$JsonInvalid(
  details: string,
  path: $data_set_path.DataSetPath$,
): JsonDeserializeError$;
export function JsonDeserializeError$isJsonInvalid(
  value: JsonDeserializeError$,
): boolean;
export function JsonDeserializeError$JsonInvalid$0(value: JsonDeserializeError$): string;
export function JsonDeserializeError$JsonInvalid$details(
  value: JsonDeserializeError$,
): string;
export function JsonDeserializeError$JsonInvalid$1(value: JsonDeserializeError$): $data_set_path.DataSetPath$;
export function JsonDeserializeError$JsonInvalid$path(
  value: JsonDeserializeError$,
): $data_set_path.DataSetPath$;

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

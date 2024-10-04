import type * as $data_element_tag from "../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $dict from "../gleam_stdlib/gleam/dict.d.mts";
import type * as $json_config from "./dcmfx_json/json_config.d.mts";
import type * as $json_error from "./dcmfx_json/json_error.d.mts";
import type * as _ from "./gleam.d.mts";

export function data_set_to_json(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  config: $json_config.DicomJsonConfig$
): _.Result<string, $json_error.JsonSerializeError$>;

export function json_to_data_set(data_set_json: string): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $json_error.JsonDeserializeError$
>;

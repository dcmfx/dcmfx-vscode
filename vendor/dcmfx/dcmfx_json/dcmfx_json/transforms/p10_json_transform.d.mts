import type * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $data_error from "../../../dcmfx_core/dcmfx_core/data_error.d.mts";
import type * as $data_set_path from "../../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
import type * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $p10_part from "../../../dcmfx_p10/dcmfx_p10/p10_part.d.mts";
import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $ieee_float from "../../../ieee_float/ieee_float.d.mts";
import type * as $json_config from "../../dcmfx_json/json_config.d.mts";
import type * as $json_error from "../../dcmfx_json/json_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class P10JsonTransform extends _.CustomType {
  private __gleam__dcmfx_json__transforms__p10_json_transform__P10JsonTransform: never;

  constructor(
    config: $json_config.DicomJsonConfig$,
    insert_comma: boolean,
    current_data_element: [
      $data_element_tag.DataElementTag$,
      _.List<_.BitArray>
    ],
    ignore_data_element_value_bytes: boolean,
    in_encapsulated_pixel_data: boolean,
    pending_base64_input: _.BitArray,
    data_set_path: $data_set_path.DataSetPath$,
    sequence_item_counts: _.List<number>
  );
  
  config: $json_config.DicomJsonConfig$;
  insert_comma: boolean;
  current_data_element: [$data_element_tag.DataElementTag$, _.List<_.BitArray>];
  ignore_data_element_value_bytes: boolean;
  in_encapsulated_pixel_data: boolean;
  pending_base64_input: _.BitArray;
  data_set_path: $data_set_path.DataSetPath$;
  sequence_item_counts: _.List<number>;
}

export type P10JsonTransform$ = P10JsonTransform;

export function new$(config: $json_config.DicomJsonConfig$): P10JsonTransform$;

export function add_part(transform: P10JsonTransform$, part: $p10_part.P10Part$): _.Result<
  [P10JsonTransform$, string],
  $json_error.JsonSerializeError$
>;

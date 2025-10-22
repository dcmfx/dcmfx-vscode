import type * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $data_error from "../../../dcmfx_core/dcmfx_core/data_error.d.mts";
import type * as $data_set_path from "../../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
import type * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $p10_token from "../../../dcmfx_p10/dcmfx_p10/p10_token.d.mts";
import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $ieee_float from "../../../ieee_float/ieee_float.d.mts";
import type * as $json_config from "../../dcmfx_json/json_config.d.mts";
import type * as $json_error from "../../dcmfx_json/json_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class P10JsonTransform extends _.CustomType {
  /** @deprecated */
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
  /** @deprecated */
  config: $json_config.DicomJsonConfig$;
  /** @deprecated */
  insert_comma: boolean;
  /** @deprecated */
  current_data_element: [$data_element_tag.DataElementTag$, _.List<_.BitArray>];
  /** @deprecated */
  ignore_data_element_value_bytes: boolean;
  /** @deprecated */
  in_encapsulated_pixel_data: boolean;
  /** @deprecated */
  pending_base64_input: _.BitArray;
  /** @deprecated */
  data_set_path: $data_set_path.DataSetPath$;
  /** @deprecated */
  sequence_item_counts: _.List<number>;
}
export function P10JsonTransform$P10JsonTransform(
  config: $json_config.DicomJsonConfig$,
  insert_comma: boolean,
  current_data_element: [$data_element_tag.DataElementTag$, _.List<_.BitArray>],
  ignore_data_element_value_bytes: boolean,
  in_encapsulated_pixel_data: boolean,
  pending_base64_input: _.BitArray,
  data_set_path: $data_set_path.DataSetPath$,
  sequence_item_counts: _.List<number>,
): P10JsonTransform$;
export function P10JsonTransform$isP10JsonTransform(
  value: P10JsonTransform$,
): boolean;
export function P10JsonTransform$P10JsonTransform$0(value: P10JsonTransform$): $json_config.DicomJsonConfig$;
export function P10JsonTransform$P10JsonTransform$config(
  value: P10JsonTransform$,
): $json_config.DicomJsonConfig$;
export function P10JsonTransform$P10JsonTransform$1(value: P10JsonTransform$): boolean;
export function P10JsonTransform$P10JsonTransform$insert_comma(
  value: P10JsonTransform$,
): boolean;
export function P10JsonTransform$P10JsonTransform$2(value: P10JsonTransform$): [
  $data_element_tag.DataElementTag$,
  _.List<_.BitArray>
];
export function P10JsonTransform$P10JsonTransform$current_data_element(value: P10JsonTransform$): [
  $data_element_tag.DataElementTag$,
  _.List<_.BitArray>
];
export function P10JsonTransform$P10JsonTransform$3(value: P10JsonTransform$): boolean;
export function P10JsonTransform$P10JsonTransform$ignore_data_element_value_bytes(
  value: P10JsonTransform$,
): boolean;
export function P10JsonTransform$P10JsonTransform$4(value: P10JsonTransform$): boolean;
export function P10JsonTransform$P10JsonTransform$in_encapsulated_pixel_data(
  value: P10JsonTransform$,
): boolean;
export function P10JsonTransform$P10JsonTransform$5(value: P10JsonTransform$): _.BitArray;
export function P10JsonTransform$P10JsonTransform$pending_base64_input(
  value: P10JsonTransform$,
): _.BitArray;
export function P10JsonTransform$P10JsonTransform$6(value: P10JsonTransform$): $data_set_path.DataSetPath$;
export function P10JsonTransform$P10JsonTransform$data_set_path(
  value: P10JsonTransform$,
): $data_set_path.DataSetPath$;
export function P10JsonTransform$P10JsonTransform$7(value: P10JsonTransform$): _.List<
  number
>;
export function P10JsonTransform$P10JsonTransform$sequence_item_counts(value: P10JsonTransform$): _.List<
  number
>;

export type P10JsonTransform$ = P10JsonTransform;

export function new$(config: $json_config.DicomJsonConfig$): P10JsonTransform$;

export function add_token(
  transform: P10JsonTransform$,
  token: $p10_token.P10Token$
): _.Result<[string, P10JsonTransform$], $json_error.JsonSerializeError$>;

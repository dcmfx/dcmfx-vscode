import type * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $data_set_path from "../../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
import type * as $transfer_syntax from "../../../dcmfx_core/dcmfx_core/transfer_syntax.d.mts";
import type * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $ieee_float from "../../../ieee_float/ieee_float.d.mts";
import type * as $json_error from "../../dcmfx_json/json_error.d.mts";
import type * as _ from "../../gleam.d.mts";

declare class PersonNameVariants extends _.CustomType {
  constructor(
    alphabetic: $option.Option$<string>,
    ideographic: $option.Option$<string>,
    phonetic: $option.Option$<string>
  );
  
  alphabetic: $option.Option$<string>;
  ideographic: $option.Option$<string>;
  phonetic: $option.Option$<string>;
}

declare type PersonNameVariants$ = PersonNameVariants;

export function convert_json_to_data_set(
  in$: $dynamic.Dynamic$,
  path: $data_set_path.DataSetPath$
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $json_error.JsonDeserializeError$
>;

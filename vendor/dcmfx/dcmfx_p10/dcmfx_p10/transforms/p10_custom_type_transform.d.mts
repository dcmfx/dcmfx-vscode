import type * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $data_error from "../../../dcmfx_core/dcmfx_core/data_error.d.mts";
import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_set_builder from "../../dcmfx_p10/data_set_builder.d.mts";
import type * as $p10_error from "../../dcmfx_p10/p10_error.d.mts";
import type * as $p10_token from "../../dcmfx_p10/p10_token.d.mts";
import type * as $p10_filter_transform from "../../dcmfx_p10/transforms/p10_filter_transform.d.mts";
import type * as _ from "../../gleam.d.mts";

declare class P10CustomTypeTransform<CCCI> extends _.CustomType {
  constructor(
    filter: $option.Option$<
      [
        $p10_filter_transform.P10FilterTransform$,
        $data_set_builder.DataSetBuilder$
      ]
    >,
    highest_tag: $data_element_tag.DataElementTag$,
    target_from_data_set: (
      x0: $dict.Dict$<
        $data_element_tag.DataElementTag$,
        $data_element_value.DataElementValue$
      >
    ) => _.Result<any, $data_error.DataError$>,
    target: $option.Option$<any>
  );
  
  filter: $option.Option$<
    [
      $p10_filter_transform.P10FilterTransform$,
      $data_set_builder.DataSetBuilder$
    ]
  >;
  highest_tag: $data_element_tag.DataElementTag$;
  target_from_data_set: (
    x0: $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  ) => _.Result<any, $data_error.DataError$>;
  target: $option.Option$<any>;
}

export type P10CustomTypeTransform$<CCCI> = P10CustomTypeTransform<CCCI>;

export class P10Error extends _.CustomType {
  constructor(argument$0: $p10_error.P10Error$);
  
  0: $p10_error.P10Error$;
}

export class DataError extends _.CustomType {
  constructor(argument$0: $data_error.DataError$);
  
  0: $data_error.DataError$;
}

export type P10CustomTypeTransformError$ = P10Error | DataError;

export function new$<CCCK>(
  tags: _.List<$data_element_tag.DataElementTag$>,
  target_from_data_set: (
    x0: $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  ) => _.Result<CCCK, $data_error.DataError$>
): P10CustomTypeTransform$<CCCK>;

export function add_token<CCCO>(
  transform: P10CustomTypeTransform$<CCCO>,
  token: $p10_token.P10Token$
): _.Result<P10CustomTypeTransform$<CCCO>, P10CustomTypeTransformError$>;

export function get_output<CCCT>(transform: P10CustomTypeTransform$<CCCT>): $option.Option$<
  CCCT
>;

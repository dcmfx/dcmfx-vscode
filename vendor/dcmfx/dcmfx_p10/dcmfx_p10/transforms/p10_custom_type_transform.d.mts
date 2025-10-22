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

declare class P10CustomTypeTransform<CADN> extends _.CustomType {
  /** @deprecated */
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
  /** @deprecated */
  filter: $option.Option$<
    [
      $p10_filter_transform.P10FilterTransform$,
      $data_set_builder.DataSetBuilder$
    ]
  >;
  /** @deprecated */
  highest_tag: $data_element_tag.DataElementTag$;
  /** @deprecated */
  target_from_data_set: (
    x0: $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  ) => _.Result<any, $data_error.DataError$>;
  /** @deprecated */
  target: $option.Option$<any>;
}

export type P10CustomTypeTransform$<CADN> = P10CustomTypeTransform<CADN>;

export class P10Error extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $p10_error.P10Error$);
  /** @deprecated */
  0: $p10_error.P10Error$;
}
export function P10CustomTypeTransformError$P10Error(
  $0: $p10_error.P10Error$,
): P10CustomTypeTransformError$;
export function P10CustomTypeTransformError$isP10Error(
  value: P10CustomTypeTransformError$,
): boolean;
export function P10CustomTypeTransformError$P10Error$0(value: P10CustomTypeTransformError$): $p10_error.P10Error$;

export class DataError extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $data_error.DataError$);
  /** @deprecated */
  0: $data_error.DataError$;
}
export function P10CustomTypeTransformError$DataError(
  $0: $data_error.DataError$,
): P10CustomTypeTransformError$;
export function P10CustomTypeTransformError$isDataError(
  value: P10CustomTypeTransformError$,
): boolean;
export function P10CustomTypeTransformError$DataError$0(value: P10CustomTypeTransformError$): $data_error.DataError$;

export type P10CustomTypeTransformError$ = P10Error | DataError;

export function new$<CADP>(
  tags: _.List<$data_element_tag.DataElementTag$>,
  target_from_data_set: (
    x0: $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  ) => _.Result<CADP, $data_error.DataError$>
): P10CustomTypeTransform$<CADP>;

export function add_token<CADT>(
  transform: P10CustomTypeTransform$<CADT>,
  token: $p10_token.P10Token$
): _.Result<P10CustomTypeTransform$<CADT>, P10CustomTypeTransformError$>;

export function get_output<CADY>(transform: P10CustomTypeTransform$<CADY>): $option.Option$<
  CADY
>;

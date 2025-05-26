import type * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_set_path from "../../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
import type * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $p10_error from "../../dcmfx_p10/p10_error.d.mts";
import type * as $p10_token from "../../dcmfx_p10/p10_token.d.mts";
import type * as _ from "../../gleam.d.mts";

declare class P10FilterTransform extends _.CustomType {
  constructor(
    predicate: (
      x0: $data_element_tag.DataElementTag$,
      x1: $value_representation.ValueRepresentation$,
      x2: $option.Option$<number>,
      x3: $data_set_path.DataSetPath$
    ) => boolean,
    path_filter_results: _.List<boolean>
  );
  
  predicate: (
    x0: $data_element_tag.DataElementTag$,
    x1: $value_representation.ValueRepresentation$,
    x2: $option.Option$<number>,
    x3: $data_set_path.DataSetPath$
  ) => boolean;
  path_filter_results: _.List<boolean>;
}

export type P10FilterTransform$ = P10FilterTransform;

export type PredicateFunction = (
  x0: $data_element_tag.DataElementTag$,
  x1: $value_representation.ValueRepresentation$,
  x2: $option.Option$<number>,
  x3: $data_set_path.DataSetPath$
) => boolean;

export function new$(
  predicate: (
    x0: $data_element_tag.DataElementTag$,
    x1: $value_representation.ValueRepresentation$,
    x2: $option.Option$<number>,
    x3: $data_set_path.DataSetPath$
  ) => boolean
): P10FilterTransform$;

export function is_at_root(transform: P10FilterTransform$): boolean;

export function add_token(
  transform: P10FilterTransform$,
  token: $p10_token.P10Token$
): _.Result<[boolean, P10FilterTransform$], $p10_error.P10Error$>;

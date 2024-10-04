import type * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $p10_part from "../../dcmfx_p10/p10_part.d.mts";
import type * as $p10_filter_transform from "../../dcmfx_p10/transforms/p10_filter_transform.d.mts";
import type * as _ from "../../gleam.d.mts";

declare class P10InsertTransform extends _.CustomType {
  private __gleam__dcmfx_p10__transforms__p10_insert_transform__P10InsertTransform: never;

  constructor(
    data_elements_to_insert: _.List<
      [$data_element_tag.DataElementTag$, $data_element_value.DataElementValue$]
    >,
    filter_transform: $p10_filter_transform.P10FilterTransform$
  );
  
  data_elements_to_insert: _.List<
    [$data_element_tag.DataElementTag$, $data_element_value.DataElementValue$]
  >;
  filter_transform: $p10_filter_transform.P10FilterTransform$;
}

export type P10InsertTransform$ = P10InsertTransform;

export function new$(
  data_elements_to_insert: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
): P10InsertTransform$;

export function add_part(context: P10InsertTransform$, part: $p10_part.P10Part$): [
  P10InsertTransform$,
  _.List<$p10_part.P10Part$>
];

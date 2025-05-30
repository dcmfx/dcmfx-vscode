import type * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $data_set_print from "../../../dcmfx_core/dcmfx_core/data_set_print.d.mts";
import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $p10_token from "../../dcmfx_p10/p10_token.d.mts";
import type * as _ from "../../gleam.d.mts";

declare class P10PrintTransform extends _.CustomType {
  constructor(
    print_options: $data_set_print.DataSetPrintOptions$,
    indent: number,
    current_data_element: $data_element_tag.DataElementTag$,
    ignore_data_element_value_bytes: boolean,
    value_max_width: number,
    private_creators: _.List<
      $dict.Dict$<
        $data_element_tag.DataElementTag$,
        $data_element_value.DataElementValue$
      >
    >,
    last_data_element_private_creator_tag: $option.Option$<
      $data_element_tag.DataElementTag$
    >
  );
  
  print_options: $data_set_print.DataSetPrintOptions$;
  indent: number;
  current_data_element: $data_element_tag.DataElementTag$;
  ignore_data_element_value_bytes: boolean;
  value_max_width: number;
  private_creators: _.List<
    $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  >;
  last_data_element_private_creator_tag: $option.Option$<
    $data_element_tag.DataElementTag$
  >;
}

export type P10PrintTransform$ = P10PrintTransform;

export function new$(print_options: $data_set_print.DataSetPrintOptions$): P10PrintTransform$;

export function add_token(
  transform: P10PrintTransform$,
  token: $p10_token.P10Token$
): [string, P10PrintTransform$];

import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_element_tag from "../dcmfx_core/data_element_tag.d.mts";
import type * as $value_representation from "../dcmfx_core/value_representation.d.mts";
import type * as _ from "../gleam.d.mts";

export class DataSetPrintOptions extends _.CustomType {
  private __gleam__dcmfx_core__data_set_print__DataSetPrintOptions: never;

  constructor(styled: boolean, max_width: number);
  
  styled: boolean;
  max_width: number;
}

export type DataSetPrintOptions$ = DataSetPrintOptions;

export function new_print_options(): DataSetPrintOptions$;

export function format_data_element_prefix(
  tag: $data_element_tag.DataElementTag$,
  tag_name: string,
  vr: $option.Option$<$value_representation.ValueRepresentation$>,
  length: $option.Option$<number>,
  indent: number,
  print_options: DataSetPrintOptions$
): [string, number];

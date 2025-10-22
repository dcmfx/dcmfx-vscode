import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_element_tag from "../dcmfx_core/data_element_tag.d.mts";
import type * as $value_representation from "../dcmfx_core/value_representation.d.mts";
import type * as _ from "../gleam.d.mts";

export class DataSetPrintOptions extends _.CustomType {
  /** @deprecated */
  constructor(styled: boolean, max_width: number);
  /** @deprecated */
  styled: boolean;
  /** @deprecated */
  max_width: number;
}
export function DataSetPrintOptions$DataSetPrintOptions(
  styled: boolean,
  max_width: number,
): DataSetPrintOptions$;
export function DataSetPrintOptions$isDataSetPrintOptions(
  value: DataSetPrintOptions$,
): boolean;
export function DataSetPrintOptions$DataSetPrintOptions$0(value: DataSetPrintOptions$): boolean;
export function DataSetPrintOptions$DataSetPrintOptions$styled(
  value: DataSetPrintOptions$,
): boolean;
export function DataSetPrintOptions$DataSetPrintOptions$1(value: DataSetPrintOptions$): number;
export function DataSetPrintOptions$DataSetPrintOptions$max_width(
  value: DataSetPrintOptions$,
): number;

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

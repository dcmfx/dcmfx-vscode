import type * as $data_element_tag from "../dcmfx_core/data_element_tag.d.mts";
import type * as _ from "../gleam.d.mts";

declare class DataSetPath extends _.CustomType {
  constructor(entries: _.List<DataSetPathEntry$>);
  
  entries: _.List<DataSetPathEntry$>;
}

export type DataSetPath$ = DataSetPath;

export class DataElement extends _.CustomType {
  constructor(tag: $data_element_tag.DataElementTag$);
  
  tag: $data_element_tag.DataElementTag$;
}

export class SequenceItem extends _.CustomType {
  constructor(index: number);
  
  index: number;
}

export type DataSetPathEntry$ = DataElement | SequenceItem;

export function new$(): DataSetPath$;

export function new_with_data_element(tag: $data_element_tag.DataElementTag$): DataSetPath$;

export function entries(path: DataSetPath$): _.List<DataSetPathEntry$>;

export function size(path: DataSetPath$): number;

export function is_empty(path: DataSetPath$): boolean;

export function sequence_item_count(path: DataSetPath$): number;

export function final_data_element(path: DataSetPath$): _.Result<
  $data_element_tag.DataElementTag$,
  undefined
>;

export function add_data_element(
  path: DataSetPath$,
  tag: $data_element_tag.DataElementTag$
): _.Result<DataSetPath$, string>;

export function add_sequence_item(path: DataSetPath$, index: number): _.Result<
  DataSetPath$,
  string
>;

export function pop(path: DataSetPath$): _.Result<DataSetPath$, undefined>;

export function from_string(s: string): _.Result<DataSetPath$, string>;

export function to_detailed_string(path: DataSetPath$): string;

export function to_string(path: DataSetPath$): string;

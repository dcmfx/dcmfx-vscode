import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_set_path from "../dcmfx_core/data_set_path.d.mts";
import type * as $value_representation from "../dcmfx_core/value_representation.d.mts";
import type * as _ from "../gleam.d.mts";

declare class TagNotPresent extends _.CustomType {
  constructor(path: $data_set_path.DataSetPath$);
  
  path: $data_set_path.DataSetPath$;
}

declare class ValueNotPresent extends _.CustomType {
  constructor(path: $option.Option$<$data_set_path.DataSetPath$>);
  
  path: $option.Option$<$data_set_path.DataSetPath$>;
}

declare class MultiplicityMismatch extends _.CustomType {
  constructor(path: $option.Option$<$data_set_path.DataSetPath$>);
  
  path: $option.Option$<$data_set_path.DataSetPath$>;
}

declare class ValueInvalid extends _.CustomType {
  constructor(
    details: string,
    path: $option.Option$<$data_set_path.DataSetPath$>
  );
  
  details: string;
  path: $option.Option$<$data_set_path.DataSetPath$>;
}

declare class ValueLengthInvalid extends _.CustomType {
  constructor(
    vr: $value_representation.ValueRepresentation$,
    length: number,
    details: string,
    path: $option.Option$<$data_set_path.DataSetPath$>
  );
  
  vr: $value_representation.ValueRepresentation$;
  length: number;
  details: string;
  path: $option.Option$<$data_set_path.DataSetPath$>;
}

declare class ValueUnsupported extends _.CustomType {
  constructor(
    details: string,
    path: $option.Option$<$data_set_path.DataSetPath$>
  );
  
  details: string;
  path: $option.Option$<$data_set_path.DataSetPath$>;
}

export type DataError$ = TagNotPresent | ValueNotPresent | MultiplicityMismatch | ValueInvalid | ValueLengthInvalid | ValueUnsupported;

export function to_string(error: DataError$): string;

export function new_tag_not_present(): DataError$;

export function new_value_not_present(): DataError$;

export function new_multiplicity_mismatch(): DataError$;

export function new_value_invalid(details: string): DataError$;

export function new_value_length_invalid(
  vr: $value_representation.ValueRepresentation$,
  length: number,
  details: string
): DataError$;

export function new_value_unsupported(details: string): DataError$;

export function path(error: DataError$): $option.Option$<
  $data_set_path.DataSetPath$
>;

export function is_tag_not_present(error: DataError$): boolean;

export function with_path(error: DataError$, path: $data_set_path.DataSetPath$): DataError$;

export function name(error: DataError$): string;

export function to_lines(error: DataError$, task_description: string): _.List<
  string
>;

export function print(error: DataError$, task_description: string): undefined;

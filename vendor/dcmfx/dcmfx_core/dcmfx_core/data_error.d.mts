import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_set_path from "../dcmfx_core/data_set_path.d.mts";
import type * as $value_representation from "../dcmfx_core/value_representation.d.mts";
import type * as _ from "../gleam.d.mts";

declare class TagNotPresent extends _.CustomType {
  private __gleam__dcmfx_core__data_error__TagNotPresent: never;

  constructor(path: $data_set_path.DataSetPath$);
  
  path: $data_set_path.DataSetPath$;
}

declare class ValueNotPresent extends _.CustomType {
  private __gleam__dcmfx_core__data_error__ValueNotPresent: never;

  constructor(path: $option.Option$<$data_set_path.DataSetPath$>);
  
  path: $option.Option$<$data_set_path.DataSetPath$>;
}

declare class MultiplicityMismatch extends _.CustomType {
  private __gleam__dcmfx_core__data_error__MultiplicityMismatch: never;

  constructor(path: $option.Option$<$data_set_path.DataSetPath$>);
  
  path: $option.Option$<$data_set_path.DataSetPath$>;
}

declare class ValueInvalid extends _.CustomType {
  private __gleam__dcmfx_core__data_error__ValueInvalid: never;

  constructor(
    details: string,
    path: $option.Option$<$data_set_path.DataSetPath$>
  );
  
  details: string;
  path: $option.Option$<$data_set_path.DataSetPath$>;
}

declare class ValueLengthInvalid extends _.CustomType {
  private __gleam__dcmfx_core__data_error__ValueLengthInvalid: never;

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

export type DataError$ = TagNotPresent | ValueNotPresent | MultiplicityMismatch | ValueInvalid | ValueLengthInvalid;

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

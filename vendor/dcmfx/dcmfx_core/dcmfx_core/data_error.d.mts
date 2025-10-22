import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_set_path from "../dcmfx_core/data_set_path.d.mts";
import type * as $value_representation from "../dcmfx_core/value_representation.d.mts";
import type * as _ from "../gleam.d.mts";

export class TagNotPresent extends _.CustomType {
  /** @deprecated */
  constructor(path: $data_set_path.DataSetPath$);
  /** @deprecated */
  path: $data_set_path.DataSetPath$;
}
export function DataError$TagNotPresent(
  path: $data_set_path.DataSetPath$,
): DataError$;
export function DataError$isTagNotPresent(value: DataError$): boolean;
export function DataError$TagNotPresent$0(value: DataError$): $data_set_path.DataSetPath$;
export function DataError$TagNotPresent$path(
  value: DataError$,
): $data_set_path.DataSetPath$;

export class ValueNotPresent extends _.CustomType {
  /** @deprecated */
  constructor(path: $option.Option$<$data_set_path.DataSetPath$>);
  /** @deprecated */
  path: $option.Option$<$data_set_path.DataSetPath$>;
}
export function DataError$ValueNotPresent(
  path: $option.Option$<$data_set_path.DataSetPath$>,
): DataError$;
export function DataError$isValueNotPresent(value: DataError$): boolean;
export function DataError$ValueNotPresent$0(value: DataError$): $option.Option$<
  $data_set_path.DataSetPath$
>;
export function DataError$ValueNotPresent$path(value: DataError$): $option.Option$<
  $data_set_path.DataSetPath$
>;

export class MultiplicityMismatch extends _.CustomType {
  /** @deprecated */
  constructor(path: $option.Option$<$data_set_path.DataSetPath$>);
  /** @deprecated */
  path: $option.Option$<$data_set_path.DataSetPath$>;
}
export function DataError$MultiplicityMismatch(
  path: $option.Option$<$data_set_path.DataSetPath$>,
): DataError$;
export function DataError$isMultiplicityMismatch(value: DataError$): boolean;
export function DataError$MultiplicityMismatch$0(value: DataError$): $option.Option$<
  $data_set_path.DataSetPath$
>;
export function DataError$MultiplicityMismatch$path(value: DataError$): $option.Option$<
  $data_set_path.DataSetPath$
>;

export class ValueInvalid extends _.CustomType {
  /** @deprecated */
  constructor(
    details: string,
    path: $option.Option$<$data_set_path.DataSetPath$>
  );
  /** @deprecated */
  details: string;
  /** @deprecated */
  path: $option.Option$<$data_set_path.DataSetPath$>;
}
export function DataError$ValueInvalid(
  details: string,
  path: $option.Option$<$data_set_path.DataSetPath$>,
): DataError$;
export function DataError$isValueInvalid(value: DataError$): boolean;
export function DataError$ValueInvalid$0(value: DataError$): string;
export function DataError$ValueInvalid$details(value: DataError$): string;
export function DataError$ValueInvalid$1(value: DataError$): $option.Option$<
  $data_set_path.DataSetPath$
>;
export function DataError$ValueInvalid$path(value: DataError$): $option.Option$<
  $data_set_path.DataSetPath$
>;

export class ValueLengthInvalid extends _.CustomType {
  /** @deprecated */
  constructor(
    vr: $value_representation.ValueRepresentation$,
    length: number,
    details: string,
    path: $option.Option$<$data_set_path.DataSetPath$>
  );
  /** @deprecated */
  vr: $value_representation.ValueRepresentation$;
  /** @deprecated */
  length: number;
  /** @deprecated */
  details: string;
  /** @deprecated */
  path: $option.Option$<$data_set_path.DataSetPath$>;
}
export function DataError$ValueLengthInvalid(
  vr: $value_representation.ValueRepresentation$,
  length: number,
  details: string,
  path: $option.Option$<$data_set_path.DataSetPath$>,
): DataError$;
export function DataError$isValueLengthInvalid(value: DataError$): boolean;
export function DataError$ValueLengthInvalid$0(value: DataError$): $value_representation.ValueRepresentation$;
export function DataError$ValueLengthInvalid$vr(
  value: DataError$,
): $value_representation.ValueRepresentation$;
export function DataError$ValueLengthInvalid$1(value: DataError$): number;
export function DataError$ValueLengthInvalid$length(value: DataError$): number;
export function DataError$ValueLengthInvalid$2(value: DataError$): string;
export function DataError$ValueLengthInvalid$details(value: DataError$): string;
export function DataError$ValueLengthInvalid$3(value: DataError$): $option.Option$<
  $data_set_path.DataSetPath$
>;
export function DataError$ValueLengthInvalid$path(value: DataError$): $option.Option$<
  $data_set_path.DataSetPath$
>;

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

export function with_path(error: DataError$, path: $data_set_path.DataSetPath$): DataError$;

export function name(error: DataError$): string;

export function details(error: DataError$): string;

export function to_lines(error: DataError$, task_description: string): _.List<
  string
>;

export function print(error: DataError$, task_description: string): undefined;

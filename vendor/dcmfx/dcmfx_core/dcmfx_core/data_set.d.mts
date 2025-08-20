import type * as $bigi from "../../bigi/bigi.d.mts";
import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $list from "../../gleam_stdlib/gleam/list.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $ieee_float from "../../ieee_float/ieee_float.d.mts";
import type * as $data_element_tag from "../dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../dcmfx_core/data_element_value.d.mts";
import type * as $age_string from "../dcmfx_core/data_element_value/age_string.d.mts";
import type * as $date from "../dcmfx_core/data_element_value/date.d.mts";
import type * as $date_time from "../dcmfx_core/data_element_value/date_time.d.mts";
import type * as $person_name from "../dcmfx_core/data_element_value/person_name.d.mts";
import type * as $time from "../dcmfx_core/data_element_value/time.d.mts";
import type * as $data_error from "../dcmfx_core/data_error.d.mts";
import type * as $data_set_path from "../dcmfx_core/data_set_path.d.mts";
import type * as $data_set_print from "../dcmfx_core/data_set_print.d.mts";
import type * as $dictionary from "../dcmfx_core/dictionary.d.mts";
import type * as $transfer_syntax from "../dcmfx_core/transfer_syntax.d.mts";
import type * as $value_representation from "../dcmfx_core/value_representation.d.mts";
import type * as _ from "../gleam.d.mts";

export class LookupResultDataElementValue extends _.CustomType {
  constructor(argument$0: $data_element_value.DataElementValue$);
  
  0: $data_element_value.DataElementValue$;
}

export class LookupResultDataSet extends _.CustomType {
  constructor(
    argument$0: $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  );
  
  0: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >;
}

export type DataSetLookupResult$ = LookupResultDataElementValue | LookupResultDataSet;

export type DataSet = $dict.Dict$<
  $data_element_tag.DataElementTag$,
  $data_element_value.DataElementValue$
>;

export function new$(): $dict.Dict$<
  $data_element_tag.DataElementTag$,
  $data_element_value.DataElementValue$
>;

export function size(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
): number;

export function is_empty(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
): boolean;

export function has(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): boolean;

export function insert(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$,
  value: $data_element_value.DataElementValue$
): $dict.Dict$<
  $data_element_tag.DataElementTag$,
  $data_element_value.DataElementValue$
>;

export function insert_binary_value(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$,
  vr: $value_representation.ValueRepresentation$,
  bytes: _.BitArray
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $data_error.DataError$
>;

export function merge(
  a: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  b: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
): $dict.Dict$<
  $data_element_tag.DataElementTag$,
  $data_element_value.DataElementValue$
>;

export function from_list(
  data_elements: _.List<
    [$data_element_tag.DataElementTag$, $data_element_value.DataElementValue$]
  >
): $dict.Dict$<
  $data_element_tag.DataElementTag$,
  $data_element_value.DataElementValue$
>;

export function delete$(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): [
  $option.Option$<$data_element_value.DataElementValue$>,
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
];

export function tags(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
): _.List<$data_element_tag.DataElementTag$>;

export function to_list(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
): _.List<
  [$data_element_tag.DataElementTag$, $data_element_value.DataElementValue$]
>;

export function map<BVQQ>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  callback: (
    x0: $data_element_tag.DataElementTag$,
    x1: $data_element_value.DataElementValue$
  ) => BVQQ
): _.List<BVQQ>;

export function map_values(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  callback: (
    x0: $data_element_tag.DataElementTag$,
    x1: $data_element_value.DataElementValue$
  ) => $data_element_value.DataElementValue$
): $dict.Dict$<
  $data_element_tag.DataElementTag$,
  $data_element_value.DataElementValue$
>;

export function filter(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  predicate: (
    x0: $data_element_tag.DataElementTag$,
    x1: $data_element_value.DataElementValue$
  ) => boolean
): $dict.Dict$<
  $data_element_tag.DataElementTag$,
  $data_element_value.DataElementValue$
>;

export function fold<BVQS>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  initial: BVQS,
  callback: (
    x0: BVQS,
    x1: $data_element_tag.DataElementTag$,
    x2: $data_element_value.DataElementValue$
  ) => BVQS
): BVQS;

export function try_fold<BVQT, BVQU>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  initial: BVQT,
  callback: (
    x0: BVQT,
    x1: $data_element_tag.DataElementTag$,
    x2: $data_element_value.DataElementValue$
  ) => _.Result<BVQT, BVQU>
): _.Result<BVQT, BVQU>;

export function fold_until<BVQZ>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  initial: BVQZ,
  callback: (
    x0: BVQZ,
    x1: $data_element_tag.DataElementTag$,
    x2: $data_element_value.DataElementValue$
  ) => $list.ContinueOrStop$<BVQZ>
): BVQZ;

export function partition(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  predicate: (x0: $data_element_tag.DataElementTag$) => boolean
): [
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
];

export function get_value(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<$data_element_value.DataElementValue$, $data_error.DataError$>;

export function get_value_at_path(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  path: $data_set_path.DataSetPath$
): _.Result<$data_element_value.DataElementValue$, $data_error.DataError$>;

export function get_data_set_at_path(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  path: $data_set_path.DataSetPath$
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $data_error.DataError$
>;

export function get_value_bytes(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<_.BitArray, $data_error.DataError$>;

export function get_value_vr_bytes(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$,
  allowed_vrs: _.List<$value_representation.ValueRepresentation$>
): _.Result<_.BitArray, $data_error.DataError$>;

export function get_string(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<string, $data_error.DataError$>;

export function file_meta_information(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
): $dict.Dict$<
  $data_element_tag.DataElementTag$,
  $data_element_value.DataElementValue$
>;

export function get_strings(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<_.List<string>, $data_error.DataError$>;

export function get_int(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<number, $data_error.DataError$>;

export function get_int_with_default(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$,
  default$: number
): _.Result<number, $data_error.DataError$>;

export function get_ints(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<_.List<number>, $data_error.DataError$>;

export function get_lookup_table_descriptor(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<[number, number, number], $data_error.DataError$>;

export function get_big_int(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<$bigi.BigInt$, $data_error.DataError$>;

export function get_big_ints(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<_.List<$bigi.BigInt$>, $data_error.DataError$>;

export function get_float(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<$ieee_float.IEEEFloat$, $data_error.DataError$>;

export function get_float_with_default(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$,
  default$: number
): _.Result<$ieee_float.IEEEFloat$, $data_error.DataError$>;

export function get_floats(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<_.List<$ieee_float.IEEEFloat$>, $data_error.DataError$>;

export function get_age(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<$age_string.StructuredAge$, $data_error.DataError$>;

export function get_attribute_tags(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<_.List<$data_element_tag.DataElementTag$>, $data_error.DataError$>;

export function get_date(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<$date.StructuredDate$, $data_error.DataError$>;

export function get_date_time(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<$date_time.StructuredDateTime$, $data_error.DataError$>;

export function get_time(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<$time.StructuredTime$, $data_error.DataError$>;

export function get_person_name(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<$person_name.StructuredPersonName$, $data_error.DataError$>;

export function get_person_names(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<_.List<$person_name.StructuredPersonName$>, $data_error.DataError$>;

export function get_sequence_items(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<
  _.List<
    $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  >,
  $data_error.DataError$
>;

export function get_transfer_syntax(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
): _.Result<$transfer_syntax.TransferSyntax$, $data_error.DataError$>;

export function total_byte_size(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
): number;

export function private_creator_for_tag(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): _.Result<string, undefined>;

export function tag_name(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): string;

export function to_lines<BVRB>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  print_options: $data_set_print.DataSetPrintOptions$,
  context: BVRB,
  callback: (x0: BVRB, x1: string) => BVRB
): BVRB;

export function print_with_options(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  print_options: $data_set_print.DataSetPrintOptions$
): undefined;

export function print(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
): undefined;

export function tag_with_name(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  tag: $data_element_tag.DataElementTag$
): string;

export function delete_private_elements(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
): $dict.Dict$<
  $data_element_tag.DataElementTag$,
  $data_element_value.DataElementValue$
>;

export function private_block(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  group: number,
  private_creator: string
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  string
>;

export function insert_age_string(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  item: $dictionary.Item$,
  value: $age_string.StructuredAge$
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $data_error.DataError$
>;

export function insert_attribute_tag_value(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  item: $dictionary.Item$,
  value: _.List<$data_element_tag.DataElementTag$>
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $data_error.DataError$
>;

export function insert_date_value(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  item: $dictionary.Item$,
  value: $date.StructuredDate$
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $data_error.DataError$
>;

export function insert_date_time_value(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  item: $dictionary.Item$,
  value: $date_time.StructuredDateTime$
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $data_error.DataError$
>;

export function insert_float_value(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  item: $dictionary.Item$,
  value: _.List<$ieee_float.IEEEFloat$>
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $data_error.DataError$
>;

export function insert_int_value(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  item: $dictionary.Item$,
  value: _.List<number>
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $data_error.DataError$
>;

export function insert_big_int_value(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  item: $dictionary.Item$,
  value: _.List<$bigi.BigInt$>
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $data_error.DataError$
>;

export function insert_person_name_value(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  item: $dictionary.Item$,
  value: _.List<$person_name.StructuredPersonName$>
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $data_error.DataError$
>;

export function insert_sequence(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  item: $dictionary.Item$,
  value: _.List<
    $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  >
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $data_error.DataError$
>;

export function insert_string_value(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  item: $dictionary.Item$,
  value: _.List<string>
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $data_error.DataError$
>;

export function insert_time_value(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  item: $dictionary.Item$,
  value: $time.StructuredTime$
): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $data_error.DataError$
>;

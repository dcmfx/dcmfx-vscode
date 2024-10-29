import type * as $bigi from "../../bigi/bigi.d.mts";
import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $ieee_float from "../../ieee_float/ieee_float.d.mts";
import type * as $data_element_tag from "../dcmfx_core/data_element_tag.d.mts";
import type * as $age_string from "../dcmfx_core/data_element_value/age_string.d.mts";
import type * as $date from "../dcmfx_core/data_element_value/date.d.mts";
import type * as $date_time from "../dcmfx_core/data_element_value/date_time.d.mts";
import type * as $person_name from "../dcmfx_core/data_element_value/person_name.d.mts";
import type * as $time from "../dcmfx_core/data_element_value/time.d.mts";
import type * as $data_error from "../dcmfx_core/data_error.d.mts";
import type * as $value_representation from "../dcmfx_core/value_representation.d.mts";
import type * as _ from "../gleam.d.mts";

declare class BinaryValue extends _.CustomType {
  constructor(vr: $value_representation.ValueRepresentation$, bytes: _.BitArray);
  
  vr: $value_representation.ValueRepresentation$;
  bytes: _.BitArray;
}

declare class LookupTableDescriptorValue extends _.CustomType {
  constructor(vr: $value_representation.ValueRepresentation$, bytes: _.BitArray);
  
  vr: $value_representation.ValueRepresentation$;
  bytes: _.BitArray;
}

declare class EncapsulatedPixelDataValue extends _.CustomType {
  constructor(
    vr: $value_representation.ValueRepresentation$,
    items: _.List<_.BitArray>
  );
  
  vr: $value_representation.ValueRepresentation$;
  items: _.List<_.BitArray>;
}

declare class SequenceValue extends _.CustomType {
  constructor(
    items: _.List<
      $dict.Dict$<$data_element_tag.DataElementTag$, DataElementValue$>
    >
  );
  
  items: _.List<
    $dict.Dict$<$data_element_tag.DataElementTag$, DataElementValue$>
  >;
}

export type DataElementValue$ = BinaryValue | LookupTableDescriptorValue | EncapsulatedPixelDataValue | SequenceValue;

export function new_binary_unchecked(
  vr: $value_representation.ValueRepresentation$,
  bytes: _.BitArray
): DataElementValue$;

export function new_lookup_table_descriptor_unchecked(
  vr: $value_representation.ValueRepresentation$,
  bytes: _.BitArray
): DataElementValue$;

export function new_encapsulated_pixel_data_unchecked(
  vr: $value_representation.ValueRepresentation$,
  items: _.List<_.BitArray>
): DataElementValue$;

export function new_sequence(
  items: _.List<
    $dict.Dict$<$data_element_tag.DataElementTag$, DataElementValue$>
  >
): DataElementValue$;

export function value_representation(value: DataElementValue$): $value_representation.ValueRepresentation$;

export function new_age_string(value: $age_string.StructuredAge$): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_date(value: $date.StructuredDate$): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_date_time(value: $date_time.StructuredDateTime$): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_time(value: $time.StructuredTime$): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function bytes(value: DataElementValue$): _.Result<
  _.BitArray,
  $data_error.DataError$
>;

export function encapsulated_pixel_data(value: DataElementValue$): _.Result<
  _.List<_.BitArray>,
  $data_error.DataError$
>;

export function sequence_items(value: DataElementValue$): _.Result<
  _.List<$dict.Dict$<$data_element_tag.DataElementTag$, DataElementValue$>>,
  $data_error.DataError$
>;

export function total_byte_size(value: DataElementValue$): number;

export function get_strings(value: DataElementValue$): _.Result<
  _.List<string>,
  $data_error.DataError$
>;

export function get_string(value: DataElementValue$): _.Result<
  string,
  $data_error.DataError$
>;

export function get_ints(value: DataElementValue$): _.Result<
  _.List<number>,
  $data_error.DataError$
>;

export function get_int(value: DataElementValue$): _.Result<
  number,
  $data_error.DataError$
>;

export function get_big_ints(value: DataElementValue$): _.Result<
  _.List<$bigi.BigInt$>,
  $data_error.DataError$
>;

export function get_big_int(value: DataElementValue$): _.Result<
  $bigi.BigInt$,
  $data_error.DataError$
>;

export function get_floats(value: DataElementValue$): _.Result<
  _.List<$ieee_float.IEEEFloat$>,
  $data_error.DataError$
>;

export function to_string(
  value: DataElementValue$,
  tag: $data_element_tag.DataElementTag$,
  output_width: number
): string;

export function get_float(value: DataElementValue$): _.Result<
  $ieee_float.IEEEFloat$,
  $data_error.DataError$
>;

export function get_age(value: DataElementValue$): _.Result<
  $age_string.StructuredAge$,
  $data_error.DataError$
>;

export function get_attribute_tags(value: DataElementValue$): _.Result<
  _.List<$data_element_tag.DataElementTag$>,
  $data_error.DataError$
>;

export function get_date(value: DataElementValue$): _.Result<
  $date.StructuredDate$,
  $data_error.DataError$
>;

export function get_date_time(value: DataElementValue$): _.Result<
  $date_time.StructuredDateTime$,
  $data_error.DataError$
>;

export function get_time(value: DataElementValue$): _.Result<
  $time.StructuredTime$,
  $data_error.DataError$
>;

export function get_person_names(value: DataElementValue$): _.Result<
  _.List<$person_name.StructuredPersonName$>,
  $data_error.DataError$
>;

export function get_person_name(value: DataElementValue$): _.Result<
  $person_name.StructuredPersonName$,
  $data_error.DataError$
>;

export function validate_length(value: DataElementValue$): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_binary(
  vr: $value_representation.ValueRepresentation$,
  bytes: _.BitArray
): _.Result<DataElementValue$, $data_error.DataError$>;

export function new_lookup_table_descriptor(
  vr: $value_representation.ValueRepresentation$,
  bytes: _.BitArray
): _.Result<DataElementValue$, $data_error.DataError$>;

export function new_encapsulated_pixel_data(
  vr: $value_representation.ValueRepresentation$,
  items: _.List<_.BitArray>
): _.Result<DataElementValue$, $data_error.DataError$>;

export function new_attribute_tag(
  value: _.List<$data_element_tag.DataElementTag$>
): _.Result<DataElementValue$, $data_error.DataError$>;

export function new_decimal_string(value: _.List<number>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_floating_point_double(value: _.List<$ieee_float.IEEEFloat$>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_floating_point_single(value: _.List<$ieee_float.IEEEFloat$>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_integer_string(value: _.List<number>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_long_text(value: string): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_other_byte_string(value: _.BitArray): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_other_double_string(value: _.List<$ieee_float.IEEEFloat$>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_other_float_string(value: _.List<$ieee_float.IEEEFloat$>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_other_long_string(value: _.BitArray): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_other_very_long_string(value: _.BitArray): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_other_word_string(value: _.BitArray): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_person_name(
  value: _.List<$person_name.StructuredPersonName$>
): _.Result<DataElementValue$, $data_error.DataError$>;

export function new_short_text(value: string): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_signed_long(value: _.List<number>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_signed_short(value: _.List<number>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_signed_very_long(value: _.List<$bigi.BigInt$>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_unique_identifier(value: _.List<string>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_universal_resource_identifier(value: string): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_unknown(value: _.BitArray): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_unlimited_text(value: string): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_unsigned_long(value: _.List<number>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_unsigned_short(value: _.List<number>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_unsigned_very_long(value: _.List<$bigi.BigInt$>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_application_entity(value: string): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_code_string(value: _.List<string>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_long_string(value: _.List<string>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_short_string(value: _.List<string>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

export function new_unlimited_characters(value: _.List<string>): _.Result<
  DataElementValue$,
  $data_error.DataError$
>;

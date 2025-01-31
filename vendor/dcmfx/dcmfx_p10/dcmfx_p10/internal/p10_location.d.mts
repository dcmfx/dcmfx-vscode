import type * as $dcmfx_character_set from "../../../dcmfx_character_set/dcmfx_character_set.d.mts";
import type * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $value_length from "../../dcmfx_p10/internal/value_length.d.mts";
import type * as $p10_error from "../../dcmfx_p10/p10_error.d.mts";
import type * as $p10_token from "../../dcmfx_p10/p10_token.d.mts";
import type * as _ from "../../gleam.d.mts";

declare class RootDataSet extends _.CustomType {
  constructor(
    clarifying_data_elements: ClarifyingDataElements$,
    last_data_element_tag: $data_element_tag.DataElementTag$
  );
  
  clarifying_data_elements: ClarifyingDataElements$;
  last_data_element_tag: $data_element_tag.DataElementTag$;
}

declare class Sequence extends _.CustomType {
  constructor(
    is_implicit_vr: boolean,
    ends_at: $option.Option$<number>,
    item_count: number
  );
  
  is_implicit_vr: boolean;
  ends_at: $option.Option$<number>;
  item_count: number;
}

declare class Item extends _.CustomType {
  constructor(
    clarifying_data_elements: ClarifyingDataElements$,
    last_data_element_tag: $data_element_tag.DataElementTag$,
    ends_at: $option.Option$<number>
  );
  
  clarifying_data_elements: ClarifyingDataElements$;
  last_data_element_tag: $data_element_tag.DataElementTag$;
  ends_at: $option.Option$<number>;
}

export type LocationEntry$ = RootDataSet | Sequence | Item;

declare class ClarifyingDataElements extends _.CustomType {
  constructor(
    specific_character_set: $dcmfx_character_set.SpecificCharacterSet$,
    bits_allocated: $option.Option$<number>,
    pixel_representation: $option.Option$<number>,
    waveform_bits_stored: $option.Option$<number>,
    waveform_bits_allocated: $option.Option$<number>,
    private_creators: $dict.Dict$<$data_element_tag.DataElementTag$, string>
  );
  
  specific_character_set: $dcmfx_character_set.SpecificCharacterSet$;
  bits_allocated: $option.Option$<number>;
  pixel_representation: $option.Option$<number>;
  waveform_bits_stored: $option.Option$<number>;
  waveform_bits_allocated: $option.Option$<number>;
  private_creators: $dict.Dict$<$data_element_tag.DataElementTag$, string>;
}

declare type ClarifyingDataElements$ = ClarifyingDataElements;

export type P10Location = _.List<LocationEntry$>;

export function is_clarifying_data_element(
  tag: $data_element_tag.DataElementTag$
): boolean;

export function new$(): _.List<LocationEntry$>;

export function check_data_element_ordering(
  location: _.List<LocationEntry$>,
  tag: $data_element_tag.DataElementTag$
): _.Result<_.List<LocationEntry$>, undefined>;

export function is_implicit_vr_forced(location: _.List<LocationEntry$>): boolean;

export function next_delimiter_token(
  location: _.List<LocationEntry$>,
  bytes_read: number
): _.Result<[$p10_token.P10Token$, _.List<LocationEntry$>], undefined>;

export function pending_delimiter_tokens(location: _.List<LocationEntry$>): _.List<
  $p10_token.P10Token$
>;

export function end_sequence(location: _.List<LocationEntry$>): _.Result<
  _.List<LocationEntry$>,
  string
>;

export function sequence_item_count(location: _.List<LocationEntry$>): _.Result<
  number,
  undefined
>;

export function end_item(location: _.List<LocationEntry$>): _.Result<
  _.List<LocationEntry$>,
  string
>;

export function add_sequence(
  location: _.List<LocationEntry$>,
  tag: $data_element_tag.DataElementTag$,
  is_implicit_vr: boolean,
  ends_at: $option.Option$<number>
): _.Result<_.List<LocationEntry$>, string>;

export function add_item(
  location: _.List<LocationEntry$>,
  ends_at: $option.Option$<number>,
  length: $value_length.ValueLength$
): _.Result<_.List<LocationEntry$>, string>;

export function add_clarifying_data_element(
  location: _.List<LocationEntry$>,
  tag: $data_element_tag.DataElementTag$,
  vr: $value_representation.ValueRepresentation$,
  value_bytes: _.BitArray
): _.Result<[_.BitArray, _.List<LocationEntry$>], $p10_error.P10Error$>;

export function is_specific_character_set_utf8_compatible(
  location: _.List<LocationEntry$>
): boolean;

export function decode_string_bytes(
  location: _.List<LocationEntry$>,
  vr: $value_representation.ValueRepresentation$,
  value_bytes: _.BitArray
): _.BitArray;

export function infer_vr_for_tag(
  location: _.List<LocationEntry$>,
  tag: $data_element_tag.DataElementTag$
): _.Result<
  $value_representation.ValueRepresentation$,
  $data_element_tag.DataElementTag$
>;

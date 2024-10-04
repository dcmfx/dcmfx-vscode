import type * as $dcmfx_character_set from "../../../dcmfx_character_set/dcmfx_character_set.d.mts";
import type * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $p10_error from "../../dcmfx_p10/p10_error.d.mts";
import type * as $p10_part from "../../dcmfx_p10/p10_part.d.mts";
import type * as _ from "../../gleam.d.mts";

declare class RootDataSet extends _.CustomType {
  private __gleam__dcmfx_p10__internal__p10_location__RootDataSet: never;

  constructor(clarifying_data_elements: ClarifyingDataElements$);
  
  clarifying_data_elements: ClarifyingDataElements$;
}

declare class Sequence extends _.CustomType {
  private __gleam__dcmfx_p10__internal__p10_location__Sequence: never;

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
  private __gleam__dcmfx_p10__internal__p10_location__Item: never;

  constructor(
    clarifying_data_elements: ClarifyingDataElements$,
    ends_at: $option.Option$<number>
  );
  
  clarifying_data_elements: ClarifyingDataElements$;
  ends_at: $option.Option$<number>;
}

export type LocationEntry$ = RootDataSet | Sequence | Item;

declare class ClarifyingDataElements extends _.CustomType {
  private __gleam__dcmfx_p10__internal__p10_location__ClarifyingDataElements: never;

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

export function is_implicit_vr_forced(location: _.List<LocationEntry$>): boolean;

export function next_delimiter_part(
  location: _.List<LocationEntry$>,
  bytes_read: number
): _.Result<[$p10_part.P10Part$, _.List<LocationEntry$>], undefined>;

export function pending_delimiter_parts(location: _.List<LocationEntry$>): _.List<
  $p10_part.P10Part$
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
  length: number
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
): $value_representation.ValueRepresentation$;

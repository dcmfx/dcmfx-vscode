import type * as $option from "../gleam_stdlib/gleam/option.d.mts";
import type * as $character_set from "./dcmfx_character_set/internal/character_set.d.mts";
import type * as $string_type from "./dcmfx_character_set/string_type.d.mts";
import type * as _ from "./gleam.d.mts";

declare class SpecificCharacterSet extends _.CustomType {
  private __gleam__dcmfx_character_set__SpecificCharacterSet: never;

  constructor(charsets: _.List<$character_set.CharacterSet$>);
  
  charsets: _.List<$character_set.CharacterSet$>;
}

export type SpecificCharacterSet$ = SpecificCharacterSet;

export function from_string(specific_character_set: string): _.Result<
  SpecificCharacterSet$,
  string
>;

export function is_utf8_compatible(
  specific_character_set: SpecificCharacterSet$
): boolean;

export function decode_bytes(
  specific_character_set: SpecificCharacterSet$,
  bytes: _.BitArray,
  string_type: $string_type.StringType$
): string;

export function sanitize_default_charset_bytes(bytes: _.BitArray): _.BitArray;

import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export class AgeString extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__AgeString: never;
}

export class ApplicationEntity extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__ApplicationEntity: never;
}

export class AttributeTag extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__AttributeTag: never;
}

export class CodeString extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__CodeString: never;
}

export class Date extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__Date: never;
}

export class DateTime extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__DateTime: never;
}

export class DecimalString extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__DecimalString: never;
}

export class FloatingPointDouble extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__FloatingPointDouble: never;
}

export class FloatingPointSingle extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__FloatingPointSingle: never;
}

export class IntegerString extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__IntegerString: never;
}

export class LongString extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__LongString: never;
}

export class LongText extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__LongText: never;
}

export class OtherByteString extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__OtherByteString: never;
}

export class OtherDoubleString extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__OtherDoubleString: never;
}

export class OtherFloatString extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__OtherFloatString: never;
}

export class OtherLongString extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__OtherLongString: never;
}

export class OtherVeryLongString extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__OtherVeryLongString: never;
}

export class OtherWordString extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__OtherWordString: never;
}

export class PersonName extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__PersonName: never;
}

export class Sequence extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__Sequence: never;
}

export class ShortString extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__ShortString: never;
}

export class ShortText extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__ShortText: never;
}

export class SignedLong extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__SignedLong: never;
}

export class SignedShort extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__SignedShort: never;
}

export class SignedVeryLong extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__SignedVeryLong: never;
}

export class Time extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__Time: never;
}

export class UniqueIdentifier extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__UniqueIdentifier: never;
}

export class UniversalResourceIdentifier extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__UniversalResourceIdentifier: never;
}

export class Unknown extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__Unknown: never;
}

export class UnlimitedCharacters extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__UnlimitedCharacters: never;
}

export class UnlimitedText extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__UnlimitedText: never;
}

export class UnsignedLong extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__UnsignedLong: never;
}

export class UnsignedShort extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__UnsignedShort: never;
}

export class UnsignedVeryLong extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__UnsignedVeryLong: never;
}

export type ValueRepresentation$ = AgeString | ApplicationEntity | AttributeTag | CodeString | Date | DateTime | DecimalString | FloatingPointDouble | FloatingPointSingle | IntegerString | LongString | LongText | OtherByteString | OtherDoubleString | OtherFloatString | OtherLongString | OtherVeryLongString | OtherWordString | PersonName | Sequence | ShortString | ShortText | SignedLong | SignedShort | SignedVeryLong | Time | UniqueIdentifier | UniversalResourceIdentifier | Unknown | UnlimitedCharacters | UnlimitedText | UnsignedLong | UnsignedShort | UnsignedVeryLong;

export class LengthRequirements extends _.CustomType {
  private __gleam__dcmfx_core__value_representation__LengthRequirements: never;

  constructor(
    bytes_max: number,
    bytes_multiple_of: $option.Option$<number>,
    string_characters_max: $option.Option$<number>
  );
  
  bytes_max: number;
  bytes_multiple_of: $option.Option$<number>;
  string_characters_max: $option.Option$<number>;
}

export type LengthRequirements$ = LengthRequirements;

export function to_string(vr: ValueRepresentation$): string;

export function from_bytes(bytes: _.BitArray): _.Result<
  ValueRepresentation$,
  undefined
>;

export function name(vr: ValueRepresentation$): string;

export function is_string(vr: ValueRepresentation$): boolean;

export function is_encoded_string(vr: ValueRepresentation$): boolean;

export function pad_bytes_to_even_length(
  vr: ValueRepresentation$,
  bytes: _.BitArray
): _.BitArray;

export function length_requirements(vr: ValueRepresentation$): LengthRequirements$;

export function swap_endianness(vr: ValueRepresentation$, bytes: _.BitArray): _.BitArray;

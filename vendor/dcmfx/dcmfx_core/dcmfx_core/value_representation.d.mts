import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export class AgeString extends _.CustomType {}

export class ApplicationEntity extends _.CustomType {}

export class AttributeTag extends _.CustomType {}

export class CodeString extends _.CustomType {}

export class Date extends _.CustomType {}

export class DateTime extends _.CustomType {}

export class DecimalString extends _.CustomType {}

export class FloatingPointDouble extends _.CustomType {}

export class FloatingPointSingle extends _.CustomType {}

export class IntegerString extends _.CustomType {}

export class LongString extends _.CustomType {}

export class LongText extends _.CustomType {}

export class OtherByteString extends _.CustomType {}

export class OtherDoubleString extends _.CustomType {}

export class OtherFloatString extends _.CustomType {}

export class OtherLongString extends _.CustomType {}

export class OtherVeryLongString extends _.CustomType {}

export class OtherWordString extends _.CustomType {}

export class PersonName extends _.CustomType {}

export class Sequence extends _.CustomType {}

export class ShortString extends _.CustomType {}

export class ShortText extends _.CustomType {}

export class SignedLong extends _.CustomType {}

export class SignedShort extends _.CustomType {}

export class SignedVeryLong extends _.CustomType {}

export class Time extends _.CustomType {}

export class UniqueIdentifier extends _.CustomType {}

export class UniversalResourceIdentifier extends _.CustomType {}

export class Unknown extends _.CustomType {}

export class UnlimitedCharacters extends _.CustomType {}

export class UnlimitedText extends _.CustomType {}

export class UnsignedLong extends _.CustomType {}

export class UnsignedShort extends _.CustomType {}

export class UnsignedVeryLong extends _.CustomType {}

export type ValueRepresentation$ = AgeString | ApplicationEntity | AttributeTag | CodeString | Date | DateTime | DecimalString | FloatingPointDouble | FloatingPointSingle | IntegerString | LongString | LongText | OtherByteString | OtherDoubleString | OtherFloatString | OtherLongString | OtherVeryLongString | OtherWordString | PersonName | Sequence | ShortString | ShortText | SignedLong | SignedShort | SignedVeryLong | Time | UniqueIdentifier | UniversalResourceIdentifier | Unknown | UnlimitedCharacters | UnlimitedText | UnsignedLong | UnsignedShort | UnsignedVeryLong;

export class LengthRequirements extends _.CustomType {
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

/// <reference types="./text_encoding.d.mts" />
import { CustomType as $CustomType } from "../gleam.mjs";

export class Unicode extends $CustomType {}
export const TextEncoding$Unicode = () => new Unicode();
export const TextEncoding$isUnicode = (value) => value instanceof Unicode;

export class Latin1 extends $CustomType {}
export const TextEncoding$Latin1 = () => new Latin1();
export const TextEncoding$isLatin1 = (value) => value instanceof Latin1;

/**
 * The Unicode UTF-16 text encoding, with the specified byte ordering.
 */
export class Utf16 extends $CustomType {
  constructor(endianness) {
    super();
    this.endianness = endianness;
  }
}
export const TextEncoding$Utf16 = (endianness) => new Utf16(endianness);
export const TextEncoding$isUtf16 = (value) => value instanceof Utf16;
export const TextEncoding$Utf16$endianness = (value) => value.endianness;
export const TextEncoding$Utf16$0 = (value) => value.endianness;

/**
 * The Unicode UTF-32 text encoding, with the specified byte ordering.
 */
export class Utf32 extends $CustomType {
  constructor(endianness) {
    super();
    this.endianness = endianness;
  }
}
export const TextEncoding$Utf32 = (endianness) => new Utf32(endianness);
export const TextEncoding$isUtf32 = (value) => value instanceof Utf32;
export const TextEncoding$Utf32$endianness = (value) => value.endianness;
export const TextEncoding$Utf32$0 = (value) => value.endianness;

export class Big extends $CustomType {}
export const Endianness$Big = () => new Big();
export const Endianness$isBig = (value) => value instanceof Big;

export class Little extends $CustomType {}
export const Endianness$Little = () => new Little();
export const Endianness$isLittle = (value) => value instanceof Little;

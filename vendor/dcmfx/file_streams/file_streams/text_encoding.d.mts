import type * as _ from "../gleam.d.mts";

export class Unicode extends _.CustomType {}
export function TextEncoding$Unicode(): TextEncoding$;
export function TextEncoding$isUnicode(value: TextEncoding$): boolean;

export class Latin1 extends _.CustomType {}
export function TextEncoding$Latin1(): TextEncoding$;
export function TextEncoding$isLatin1(value: TextEncoding$): boolean;

export class Utf16 extends _.CustomType {
  /** @deprecated */
  constructor(endianness: Endianness$);
  /** @deprecated */
  endianness: Endianness$;
}
export function TextEncoding$Utf16(endianness: Endianness$): TextEncoding$;
export function TextEncoding$isUtf16(value: TextEncoding$): boolean;
export function TextEncoding$Utf16$0(value: TextEncoding$): Endianness$;
export function TextEncoding$Utf16$endianness(value: TextEncoding$): Endianness$;

export class Utf32 extends _.CustomType {
  /** @deprecated */
  constructor(endianness: Endianness$);
  /** @deprecated */
  endianness: Endianness$;
}
export function TextEncoding$Utf32(endianness: Endianness$): TextEncoding$;
export function TextEncoding$isUtf32(value: TextEncoding$): boolean;
export function TextEncoding$Utf32$0(value: TextEncoding$): Endianness$;
export function TextEncoding$Utf32$endianness(value: TextEncoding$): Endianness$;

export type TextEncoding$ = Unicode | Latin1 | Utf16 | Utf32;

export class Big extends _.CustomType {}
export function Endianness$Big(): Endianness$;
export function Endianness$isBig(value: Endianness$): boolean;

export class Little extends _.CustomType {}
export function Endianness$Little(): Endianness$;
export function Endianness$isLittle(value: Endianness$): boolean;

export type Endianness$ = Big | Little;

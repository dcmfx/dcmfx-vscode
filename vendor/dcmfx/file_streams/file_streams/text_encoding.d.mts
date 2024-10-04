import type * as _ from "../gleam.d.mts";

export class Unicode extends _.CustomType {
  private __gleam__file_streams__text_encoding__Unicode: never;
}

export class Latin1 extends _.CustomType {
  private __gleam__file_streams__text_encoding__Latin1: never;
}

export class Utf16 extends _.CustomType {
  private __gleam__file_streams__text_encoding__Utf16: never;

  constructor(endianness: Endianness$);
  
  endianness: Endianness$;
}

export class Utf32 extends _.CustomType {
  private __gleam__file_streams__text_encoding__Utf32: never;

  constructor(endianness: Endianness$);
  
  endianness: Endianness$;
}

export type TextEncoding$ = Unicode | Latin1 | Utf16 | Utf32;

export class Big extends _.CustomType {
  private __gleam__file_streams__text_encoding__Big: never;
}

export class Little extends _.CustomType {
  private __gleam__file_streams__text_encoding__Little: never;
}

export type Endianness$ = Big | Little;

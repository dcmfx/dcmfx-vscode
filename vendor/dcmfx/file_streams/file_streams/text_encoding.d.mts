import type * as _ from "../gleam.d.mts";

export class Unicode extends _.CustomType {}

export class Latin1 extends _.CustomType {}

export class Utf16 extends _.CustomType {
  constructor(endianness: Endianness$);
  
  endianness: Endianness$;
}

export class Utf32 extends _.CustomType {
  constructor(endianness: Endianness$);
  
  endianness: Endianness$;
}

export type TextEncoding$ = Unicode | Latin1 | Utf16 | Utf32;

export class Big extends _.CustomType {}

export class Little extends _.CustomType {}

export type Endianness$ = Big | Little;

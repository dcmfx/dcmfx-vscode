/// <reference types="./text_encoding.d.mts" />
import { CustomType as $CustomType } from "../gleam.mjs";

export class Unicode extends $CustomType {}

export class Latin1 extends $CustomType {}

/**
 * The Unicode UTF-16 text encoding, with the specified byte ordering.
 */
export class Utf16 extends $CustomType {
  constructor(endianness) {
    super();
    this.endianness = endianness;
  }
}

/**
 * The Unicode UTF-32 text encoding, with the specified byte ordering.
 */
export class Utf32 extends $CustomType {
  constructor(endianness) {
    super();
    this.endianness = endianness;
  }
}

export class Big extends $CustomType {}

export class Little extends $CustomType {}

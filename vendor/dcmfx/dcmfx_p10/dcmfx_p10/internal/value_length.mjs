/// <reference types="./value_length.d.mts" />
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import { CustomType as $CustomType } from "../../gleam.mjs";

export class Defined extends $CustomType {
  constructor(length) {
    super();
    this.length = length;
  }
}
export const ValueLength$Defined = (length) => new Defined(length);
export const ValueLength$isDefined = (value) => value instanceof Defined;
export const ValueLength$Defined$length = (value) => value.length;
export const ValueLength$Defined$0 = (value) => value.length;

export class Undefined extends $CustomType {}
export const ValueLength$Undefined = () => new Undefined();
export const ValueLength$isUndefined = (value) => value instanceof Undefined;

/**
 * Constructs a new value length from the given `u32` value. `0xFFFFFFFF` is an
 * undefined length, all other values are a defined length.
 */
export function new$(length) {
  if (length === 0xFFFFFFFF) {
    return new Undefined();
  } else {
    return new Defined(length);
  }
}

/**
 * Convert a value length to an `Int`. An undefined length is `0xFFFFFFFF`
 * and all defined lengths are just the contained length value.
 */
export function to_int(value_length) {
  if (value_length instanceof Defined) {
    let length = value_length.length;
    return length;
  } else {
    return 0xFFFFFFFF;
  }
}

/**
 * Converts a value length to a string, e.g. "10 bytes", or "UNDEFINED".
 */
export function to_string(value_length) {
  if (value_length instanceof Defined) {
    let length = value_length.length;
    return $int.to_string(length) + " bytes";
  } else {
    return "UNDEFINED";
  }
}

export const zero = /* @__PURE__ */ new Defined(0);

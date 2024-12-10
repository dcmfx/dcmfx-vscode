/// <reference types="./value_length.d.mts" />
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import { CustomType as $CustomType } from "../../gleam.mjs";

export class Defined extends $CustomType {
  constructor(length) {
    super();
    this.length = length;
  }
}

export class Undefined extends $CustomType {}

export function new$(length) {
  if (length === 0xFFFFFFFF) {
    return new Undefined();
  } else {
    return new Defined(length);
  }
}

export function to_int(value_length) {
  if (value_length instanceof Defined) {
    let length = value_length.length;
    return length;
  } else {
    return 0xFFFFFFFF;
  }
}

export function to_string(value_length) {
  if (value_length instanceof Defined) {
    let length = value_length.length;
    return $int.to_string(length) + " bytes";
  } else {
    return "UNDEFINED";
  }
}

export const zero = /* @__PURE__ */ new Defined(0);

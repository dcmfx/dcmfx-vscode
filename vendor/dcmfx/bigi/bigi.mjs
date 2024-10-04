/// <reference types="./bigi.d.mts" />
import * as $dynamic from "../gleam_stdlib/gleam/dynamic.mjs";
import * as $order from "../gleam_stdlib/gleam/order.mjs";
import {
  zero,
  from as from_int,
  from_string,
  from_bytes,
  to as to_int,
  to_string,
  to_bytes,
  compare,
  absolute,
  add,
  subtract,
  multiply,
  divide,
  divide_no_zero,
  remainder,
  remainder_no_zero,
  modulo,
  modulo_no_zero,
  power,
  decode,
} from "./bigi_ffi.mjs";
import { toList, prepend as listPrepend, CustomType as $CustomType, makeError } from "./gleam.mjs";

export {
  absolute,
  add,
  compare,
  decode,
  divide,
  divide_no_zero,
  from_bytes,
  from_int,
  from_string,
  modulo,
  modulo_no_zero,
  multiply,
  power,
  remainder,
  remainder_no_zero,
  subtract,
  to_bytes,
  to_int,
  to_string,
  zero,
};

export class LittleEndian extends $CustomType {}

export class BigEndian extends $CustomType {}

export class Signed extends $CustomType {}

export class Unsigned extends $CustomType {}

function get_digit(loop$bigint, loop$digits, loop$divisor) {
  while (true) {
    let bigint = loop$bigint;
    let digits = loop$digits;
    let divisor = loop$divisor;
    let $ = compare(bigint, divisor);
    if ($ instanceof $order.Lt) {
      let $1 = to_int(bigint);
      if (!$1.isOk()) {
        throw makeError(
          "let_assert",
          "bigi",
          191,
          "get_digit",
          "Pattern match failed, no pattern matched the value.",
          { value: $1 }
        )
      }
      let digit = $1[0];
      return listPrepend(digit, digits);
    } else {
      let $1 = (() => {
        let _pipe = remainder(bigint, divisor);
        return to_int(_pipe);
      })();
      if (!$1.isOk()) {
        throw makeError(
          "let_assert",
          "bigi",
          195,
          "get_digit",
          "Pattern match failed, no pattern matched the value.",
          { value: $1 }
        )
      }
      let digit = $1[0];
      let digits$1 = listPrepend(digit, digits);
      loop$bigint = divide(bigint, divisor);
      loop$digits = digits$1;
      loop$divisor = divisor;
    }
  }
}

export function digits(bigint) {
  let divisor = from_int(10);
  return get_digit(bigint, toList([]), divisor);
}

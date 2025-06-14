/// <reference types="./bigi.d.mts" />
import * as $dynamic from "../gleam_stdlib/gleam/dynamic.mjs";
import * as $decode from "../gleam_stdlib/gleam/dynamic/decode.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
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
  negate,
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
  bitwise_and,
  bitwise_exclusive_or,
  bitwise_not,
  bitwise_or,
  bitwise_shift_left,
  bitwise_shift_right,
} from "./bigi_ffi.mjs";
import {
  Ok,
  Error,
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
} from "./gleam.mjs";

export {
  absolute,
  add,
  bitwise_and,
  bitwise_exclusive_or,
  bitwise_not,
  bitwise_or,
  bitwise_shift_left,
  bitwise_shift_right,
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
  negate,
  power,
  remainder,
  remainder_no_zero,
  subtract,
  to_bytes,
  to_int,
  to_string,
  zero,
};

const FILEPATH = "src/bigi.gleam";

export class LittleEndian extends $CustomType {}

export class BigEndian extends $CustomType {}

export class Signed extends $CustomType {}

export class Unsigned extends $CustomType {}

export function floor_divide(dividend, divisor) {
  let z = zero();
  let $ = isEqual(divisor, z);
  if ($) {
    return new Error(undefined);
  } else {
    let $1 = compare(multiply(dividend, divisor), z);
    if ($1 instanceof $order.Lt) {
      let $2 = !isEqual(remainder(dividend, divisor), z);
      if ($2) {
        return new Ok(subtract(divide(dividend, divisor), from_int(1)));
      } else {
        return new Ok(divide(dividend, divisor));
      }
    } else {
      return new Ok(divide(dividend, divisor));
    }
  }
}

export function is_odd(bigint) {
  return !isEqual(remainder(bigint, from_int(2)), zero());
}

export function max(a, b) {
  let $ = compare(a, b);
  if ($ instanceof $order.Lt) {
    return b;
  } else {
    return a;
  }
}

export function min(a, b) {
  let $ = compare(a, b);
  if ($ instanceof $order.Lt) {
    return a;
  } else {
    return b;
  }
}

export function clamp(bigint, min_bound, max_bound) {
  let _pipe = bigint;
  let _pipe$1 = min(_pipe, max_bound);
  return max(_pipe$1, min_bound);
}

export function sum(bigints) {
  return $list.fold(bigints, zero(), add);
}

export function product(bigints) {
  return $list.fold(bigints, from_int(1), multiply);
}

export function undigits(digits, base) {
  let $ = base < 2;
  if ($) {
    return new Error(undefined);
  } else {
    let base$1 = from_int(base);
    return $list.try_fold(
      digits,
      zero(),
      (acc, digit) => {
        let digit$1 = from_int(digit);
        let $1 = compare(digit$1, base$1);
        if ($1 instanceof $order.Eq) {
          return new Error(undefined);
        } else if ($1 instanceof $order.Gt) {
          return new Error(undefined);
        } else {
          return new Ok(add(multiply(acc, base$1), digit$1));
        }
      },
    );
  }
}

function get_digit(loop$bigint, loop$digits, loop$divisor) {
  while (true) {
    let bigint = loop$bigint;
    let digits = loop$digits;
    let divisor = loop$divisor;
    let $ = compare(bigint, divisor);
    if ($ instanceof $order.Lt) {
      let $1 = to_int(bigint);
      if (!($1 instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "bigi",
          315,
          "get_digit",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $1,
            start: 10904,
            end: 10941,
            pattern_start: 10915,
            pattern_end: 10924
          }
        )
      }
      let digit = $1[0];
      return listPrepend(digit, digits);
    } else {
      let _block;
      let _pipe = remainder(bigint, divisor);
      _block = to_int(_pipe);
      let $1 = _block;
      if (!($1 instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "bigi",
          319,
          "get_digit",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $1,
            start: 10989,
            end: 11066,
            pattern_start: 11000,
            pattern_end: 11009
          }
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

/// <reference types="./ieee_float.d.mts" />
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $order from "../gleam_stdlib/gleam/order.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import { CustomType as $CustomType } from "./gleam.mjs";
import {
  finite,
  positive_infinity,
  negative_infinity,
  nan,
  is_finite,
  is_nan,
  to_finite,
  to_string,
  parse,
  to_bytes_16_le,
  from_bytes_16_le,
  to_bytes_16_be,
  from_bytes_16_be,
  to_bytes_32_le,
  from_bytes_32_le,
  to_bytes_32_be,
  from_bytes_32_be,
  to_bytes_64_le,
  from_bytes_64_le,
  to_bytes_64_be,
  from_bytes_64_be,
  rescue_bad_arith,
  absolute_value,
  add,
  ceiling,
  compare,
  divide,
  floor,
  max,
  min,
  multiply,
  negate,
  power,
  random,
  round,
  square_root,
  subtract,
} from "./ieee_float_ffi.mjs";

export {
  absolute_value,
  add,
  ceiling,
  compare,
  divide,
  finite,
  floor,
  from_bytes_16_be,
  from_bytes_16_le,
  from_bytes_32_be,
  from_bytes_32_le,
  from_bytes_64_be,
  from_bytes_64_le,
  is_finite,
  is_nan,
  max,
  min,
  multiply,
  nan,
  negate,
  negative_infinity,
  parse,
  positive_infinity,
  power,
  random,
  round,
  square_root,
  subtract,
  to_bytes_16_be,
  to_bytes_16_le,
  to_bytes_32_be,
  to_bytes_32_le,
  to_bytes_64_be,
  to_bytes_64_le,
  to_finite,
  to_string,
};

class Finite extends $CustomType {
  constructor(value) {
    super();
    this.value = value;
  }
}

class Infinite extends $CustomType {
  constructor(sign) {
    super();
    this.sign = sign;
  }
}

class NaN extends $CustomType {}

class Positive extends $CustomType {}

class Negative extends $CustomType {}

export function clamp(f, min_bound, max_bound) {
  let _pipe = f;
  let _pipe$1 = min(_pipe, max_bound);
  return max(_pipe$1, min_bound);
}

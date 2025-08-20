/// <reference types="./value_multiplicity.d.mts" />
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import { CustomType as $CustomType, isEqual } from "../gleam.mjs";

export class ValueMultiplicity extends $CustomType {
  constructor(min, max) {
    super();
    this.min = min;
    this.max = max;
  }
}

/**
 * Returns whether the given value lies in the range specified by this value
 * multiplicity.
 */
export function contains(multiplicity, n) {
  return (n >= multiplicity.min) && (n <= $option.unwrap(
    multiplicity.max,
    0xFFFFFFFF,
  ));
}

/**
 * Returns a value multiplicity as a human-readable string, e.g. "1-3", or
 * "2-n".
 */
export function to_string(multiplicity) {
  let $ = (multiplicity.min === 1) && (isEqual(multiplicity.max, new Some(1)));
  if ($) {
    return "1";
  } else {
    return ($int.to_string(multiplicity.min) + "-") + (() => {
      let $1 = multiplicity.max;
      if ($1 instanceof Some) {
        let max = $1[0];
        return $int.to_string(max);
      } else {
        return "n";
      }
    })();
  }
}

/// <reference types="./age_string.d.mts" />
import * as $regexp from "../../../gleam_regexp/gleam/regexp.mjs";
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $data_error from "../../dcmfx_core/data_error.mjs";
import * as $bit_array_utils from "../../dcmfx_core/internal/bit_array_utils.mjs";
import * as $utils from "../../dcmfx_core/internal/utils.mjs";
import { Ok, Error, Empty as $Empty, CustomType as $CustomType, makeError } from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_core/data_element_value/age_string.gleam";

export class Days extends $CustomType {}
export const AgeUnit$Days = () => new Days();
export const AgeUnit$isDays = (value) => value instanceof Days;

export class Weeks extends $CustomType {}
export const AgeUnit$Weeks = () => new Weeks();
export const AgeUnit$isWeeks = (value) => value instanceof Weeks;

export class Months extends $CustomType {}
export const AgeUnit$Months = () => new Months();
export const AgeUnit$isMonths = (value) => value instanceof Months;

export class Years extends $CustomType {}
export const AgeUnit$Years = () => new Years();
export const AgeUnit$isYears = (value) => value instanceof Years;

export class StructuredAge extends $CustomType {
  constructor(number, unit) {
    super();
    this.number = number;
    this.unit = unit;
  }
}
export const StructuredAge$StructuredAge = (number, unit) =>
  new StructuredAge(number, unit);
export const StructuredAge$isStructuredAge = (value) =>
  value instanceof StructuredAge;
export const StructuredAge$StructuredAge$number = (value) => value.number;
export const StructuredAge$StructuredAge$0 = (value) => value.number;
export const StructuredAge$StructuredAge$unit = (value) => value.unit;
export const StructuredAge$StructuredAge$1 = (value) => value.unit;

/**
 * Formats a structured age as a human-readable string.
 */
export function to_string(age) {
  let _block;
  let $ = age.unit;
  if ($ instanceof Days) {
    _block = "day";
  } else if ($ instanceof Weeks) {
    _block = "week";
  } else if ($ instanceof Months) {
    _block = "month";
  } else {
    _block = "year";
  }
  let unit = _block;
  let _block$1;
  let $1 = age.number;
  if ($1 === 1) {
    _block$1 = "";
  } else {
    _block$1 = "s";
  }
  let plural = _block$1;
  return (($int.to_string(age.number) + " ") + unit) + plural;
}

/**
 * Converts an `AgeString` value into a structured age.
 */
export function from_bytes(bytes) {
  let _block;
  let _pipe = bytes;
  let _pipe$1 = $bit_array.to_string(_pipe);
  _block = $result.replace_error(
    _pipe$1,
    $data_error.new_value_invalid("AgeString is invalid UTF-8"),
  );
  let age_string = _block;
  return $result.try$(
    age_string,
    (age_string) => {
      let _block$1;
      let _pipe$2 = age_string;
      let _pipe$3 = $utils.trim_ascii(_pipe$2, 0x0);
      _block$1 = $string.trim(_pipe$3);
      let age_string$1 = _block$1;
      let $ = $regexp.from_string("^(\\d\\d\\d)([DWMY])$");
      let re;
      if ($ instanceof Ok) {
        re = $[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_element_value/age_string",
          60,
          "from_bytes",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 1351,
            end: 1414,
            pattern_start: 1362,
            pattern_end: 1368
          }
        )
      }
      let $1 = $regexp.scan(re, age_string$1);
      if ($1 instanceof $Empty) {
        return new Error(
          $data_error.new_value_invalid(
            ("AgeString is invalid: '" + age_string$1) + "'",
          ),
        );
      } else {
        let $2 = $1.tail;
        if ($2 instanceof $Empty) {
          let $3 = $1.head.submatches;
          if ($3 instanceof $Empty) {
            return new Error(
              $data_error.new_value_invalid(
                ("AgeString is invalid: '" + age_string$1) + "'",
              ),
            );
          } else {
            let $4 = $3.head;
            if ($4 instanceof Some) {
              let $5 = $3.tail;
              if ($5 instanceof $Empty) {
                return new Error(
                  $data_error.new_value_invalid(
                    ("AgeString is invalid: '" + age_string$1) + "'",
                  ),
                );
              } else {
                let $6 = $5.head;
                if ($6 instanceof Some) {
                  let $7 = $5.tail;
                  if ($7 instanceof $Empty) {
                    let number = $4[0];
                    let unit = $6[0];
                    let $8 = $int.parse(number);
                    let number$1;
                    if ($8 instanceof Ok) {
                      number$1 = $8[0];
                    } else {
                      throw makeError(
                        "let_assert",
                        FILEPATH,
                        "dcmfx_core/data_element_value/age_string",
                        64,
                        "from_bytes",
                        "Pattern match failed, no pattern matched the value.",
                        {
                          value: $8,
                          start: 1527,
                          end: 1568,
                          pattern_start: 1538,
                          pattern_end: 1548
                        }
                      )
                    }
                    let _block$2;
                    if (unit === "D") {
                      _block$2 = new Days();
                    } else if (unit === "W") {
                      _block$2 = new Weeks();
                    } else if (unit === "M") {
                      _block$2 = new Months();
                    } else {
                      _block$2 = new Years();
                    }
                    let unit$1 = _block$2;
                    return new Ok(new StructuredAge(number$1, unit$1));
                  } else {
                    return new Error(
                      $data_error.new_value_invalid(
                        ("AgeString is invalid: '" + age_string$1) + "'",
                      ),
                    );
                  }
                } else {
                  return new Error(
                    $data_error.new_value_invalid(
                      ("AgeString is invalid: '" + age_string$1) + "'",
                    ),
                  );
                }
              }
            } else {
              return new Error(
                $data_error.new_value_invalid(
                  ("AgeString is invalid: '" + age_string$1) + "'",
                ),
              );
            }
          }
        } else {
          return new Error(
            $data_error.new_value_invalid(
              ("AgeString is invalid: '" + age_string$1) + "'",
            ),
          );
        }
      }
    },
  );
}

/**
 * Converts a structured age into an `AgeString` value.
 */
export function to_bytes(age) {
  return $bool.guard(
    (age.number < 0) || (age.number > 999),
    new Error(
      $data_error.new_value_invalid(
        ("AgeString value " + $int.to_string(age.number)) + " is outside the valid range of 0-999",
      ),
    ),
    () => {
      let _block;
      let $ = age.unit;
      if ($ instanceof Days) {
        _block = "D";
      } else if ($ instanceof Weeks) {
        _block = "W";
      } else if ($ instanceof Months) {
        _block = "M";
      } else {
        _block = "Y";
      }
      let unit = _block;
      let _pipe = age.number;
      let _pipe$1 = $int.to_string(_pipe);
      let _pipe$2 = $utils.pad_start(_pipe$1, 3, "0");
      let _pipe$3 = $string.append(_pipe$2, unit);
      let _pipe$4 = $bit_array.from_string(_pipe$3);
      let _pipe$5 = $bit_array_utils.pad_to_even_length(_pipe$4, 0x20);
      return new Ok(_pipe$5);
    },
  );
}

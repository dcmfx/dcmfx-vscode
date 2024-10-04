/// <reference types="./age_string.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $regex from "../../../gleam_stdlib/gleam/regex.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $data_error from "../../dcmfx_core/data_error.mjs";
import * as $bit_array_utils from "../../dcmfx_core/internal/bit_array_utils.mjs";
import * as $utils from "../../dcmfx_core/internal/utils.mjs";
import { Ok, Error, CustomType as $CustomType, makeError } from "../../gleam.mjs";

export class Days extends $CustomType {}

export class Weeks extends $CustomType {}

export class Months extends $CustomType {}

export class Years extends $CustomType {}

export class StructuredAge extends $CustomType {
  constructor(number, unit) {
    super();
    this.number = number;
    this.unit = unit;
  }
}

export function to_string(age) {
  let unit = (() => {
    let $ = age.unit;
    if ($ instanceof Days) {
      return "day";
    } else if ($ instanceof Weeks) {
      return "week";
    } else if ($ instanceof Months) {
      return "month";
    } else {
      return "year";
    }
  })();
  let plural = (() => {
    let $ = age.number;
    if ($ === 1) {
      return "";
    } else {
      return "s";
    }
  })();
  return (($int.to_string(age.number) + " ") + unit) + plural;
}

export function from_bytes(bytes) {
  let age_string = (() => {
    let _pipe = bytes;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map(_pipe$1, $utils.trim_right_whitespace);
    return $result.replace_error(
      _pipe$2,
      $data_error.new_value_invalid("AgeString is invalid UTF-8"),
    );
  })();
  return $result.try$(
    age_string,
    (age_string) => {
      let $ = $regex.from_string("^(\\d\\d\\d)([DWMY])$");
      if (!$.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_core/data_element_value/age_string",
          59,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: $ }
        )
      }
      let re = $[0];
      let $1 = $regex.scan(re, age_string);
      if ($1.hasLength(1) &&
      $1.head instanceof $regex.Match &&
      $1.head.submatches.hasLength(2) &&
      $1.head.submatches.head instanceof Some &&
      $1.head.submatches.tail.head instanceof Some) {
        let number = $1.head.submatches.head[0];
        let unit = $1.head.submatches.tail.head[0];
        let $2 = $int.parse(number);
        if (!$2.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value/age_string",
            63,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: $2 }
          )
        }
        let number$1 = $2[0];
        let unit$1 = (() => {
          if (unit === "D") {
            return new Days();
          } else if (unit === "W") {
            return new Weeks();
          } else if (unit === "M") {
            return new Months();
          } else {
            return new Years();
          }
        })();
        return new Ok(new StructuredAge(number$1, unit$1));
      } else {
        return new Error(
          $data_error.new_value_invalid(
            ("AgeString is invalid: '" + age_string) + "'",
          ),
        );
      }
    },
  );
}

export function to_bytes(age) {
  return $bool.guard(
    (age.number < 0) || (age.number > 999),
    new Error(
      $data_error.new_value_invalid(
        ("AgeString value " + $int.to_string(age.number)) + " is outside the valid range of 0-999",
      ),
    ),
    () => {
      let unit = (() => {
        let $ = age.unit;
        if ($ instanceof Days) {
          return "D";
        } else if ($ instanceof Weeks) {
          return "W";
        } else if ($ instanceof Months) {
          return "M";
        } else {
          return "Y";
        }
      })();
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

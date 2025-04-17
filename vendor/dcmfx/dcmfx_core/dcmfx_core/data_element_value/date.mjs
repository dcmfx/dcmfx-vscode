/// <reference types="./date.d.mts" />
import * as $regexp from "../../../gleam_regexp/gleam/regexp.mjs";
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $data_error from "../../dcmfx_core/data_error.mjs";
import * as $utils from "../../dcmfx_core/internal/utils.mjs";
import { Ok, Error, CustomType as $CustomType, makeError } from "../../gleam.mjs";

export class StructuredDate extends $CustomType {
  constructor(year, month, day) {
    super();
    this.year = year;
    this.month = month;
    this.day = day;
  }
}

export function from_bytes(bytes) {
  let _block;
  let _pipe = bytes;
  let _pipe$1 = $bit_array.to_string(_pipe);
  _block = $result.replace_error(
    _pipe$1,
    $data_error.new_value_invalid("Date is invalid UTF-8"),
  );
  let date_string = _block;
  return $result.try$(
    date_string,
    (date_string) => {
      let _block$1;
      let _pipe$2 = date_string;
      let _pipe$3 = $utils.trim_ascii(_pipe$2, 0x0);
      _block$1 = $string.trim(_pipe$3);
      let date_string$1 = _block$1;
      let $ = $regexp.from_string("^(\\d{4})(\\d\\d)(\\d\\d)$");
      if (!$.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_core/data_element_value/date",
          32,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: $ }
        )
      }
      let re = $[0];
      let $1 = $regexp.scan(re, date_string$1);
      if ($1.hasLength(1) &&
      $1.head instanceof $regexp.Match &&
      $1.head.submatches.hasLength(3) &&
      $1.head.submatches.head instanceof Some &&
      $1.head.submatches.tail.head instanceof Some &&
      $1.head.submatches.tail.tail.head instanceof Some) {
        let year = $1.head.submatches.head[0];
        let month = $1.head.submatches.tail.head[0];
        let day = $1.head.submatches.tail.tail.head[0];
        let $2 = $int.parse(year);
        if (!$2.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value/date",
            36,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: $2 }
          )
        }
        let year$1 = $2[0];
        let $3 = $int.parse(month);
        if (!$3.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value/date",
            37,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: $3 }
          )
        }
        let month$1 = $3[0];
        let $4 = $int.parse(day);
        if (!$4.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value/date",
            38,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: $4 }
          )
        }
        let day$1 = $4[0];
        return new Ok(new StructuredDate(year$1, month$1, day$1));
      } else {
        return new Error(
          $data_error.new_value_invalid(
            ("Date is invalid: '" + date_string$1) + "'",
          ),
        );
      }
    },
  );
}

export function components_to_string(year, month, day) {
  let has_day_without_month = $option.is_some(day) && !$option.is_some(month);
  return $bool.guard(
    has_day_without_month,
    new Error(
      $data_error.new_value_invalid(
        "Date's month must be present when there is a day value",
      ),
    ),
    () => {
      let _block;
      let $ = (year >= 0) && (year <= 9999);
      if ($) {
        let _pipe = year;
        let _pipe$1 = $int.to_string(_pipe);
        let _pipe$2 = $utils.pad_start(_pipe$1, 4, "0");
        _block = new Ok(_pipe$2);
      } else {
        _block = new Error(
          $data_error.new_value_invalid(
            "Date's year is invalid: " + $int.to_string(year),
          ),
        );
      }
      let year$1 = _block;
      return $result.try$(
        year$1,
        (year) => {
          let _block$1;
          if (month instanceof Some) {
            let month$1 = month[0];
            let $1 = (month$1 >= 1) && (month$1 <= 12);
            if ($1) {
              let _pipe = month$1;
              let _pipe$1 = $int.to_string(_pipe);
              let _pipe$2 = $utils.pad_start(_pipe$1, 2, "0");
              _block$1 = new Ok(_pipe$2);
            } else {
              _block$1 = new Error(
                $data_error.new_value_invalid(
                  "Date's month is invalid: " + $int.to_string(month$1),
                ),
              );
            }
          } else {
            _block$1 = new Ok("");
          }
          let month$1 = _block$1;
          return $result.try$(
            month$1,
            (month) => {
              let _block$2;
              if (day instanceof Some) {
                let day$1 = day[0];
                let $1 = (day$1 >= 1) && (day$1 <= 31);
                if ($1) {
                  let _pipe = day$1;
                  let _pipe$1 = $int.to_string(_pipe);
                  let _pipe$2 = $utils.pad_start(_pipe$1, 2, "0");
                  _block$2 = new Ok(_pipe$2);
                } else {
                  _block$2 = new Error(
                    $data_error.new_value_invalid(
                      "Date's day is invalid: " + $int.to_string(day$1),
                    ),
                  );
                }
              } else {
                _block$2 = new Ok("");
              }
              let day$1 = _block$2;
              return $result.try$(
                day$1,
                (day) => { return new Ok((year + month) + day); },
              );
            },
          );
        },
      );
    },
  );
}

export function to_bytes(value) {
  let _pipe = components_to_string(
    value.year,
    new Some(value.month),
    new Some(value.day),
  );
  return $result.map(_pipe, $bit_array.from_string);
}

export function to_iso8601(date) {
  let _block;
  let _pipe = date.year;
  let _pipe$1 = $int.to_string(_pipe);
  _block = $utils.pad_start(_pipe$1, 4, "0");
  let year = _block;
  let _block$1;
  let _pipe$2 = date.month;
  let _pipe$3 = $int.to_string(_pipe$2);
  _block$1 = $utils.pad_start(_pipe$3, 2, "0");
  let month = _block$1;
  let _block$2;
  let _pipe$4 = date.day;
  let _pipe$5 = $int.to_string(_pipe$4);
  _block$2 = $utils.pad_start(_pipe$5, 2, "0");
  let day = _block$2;
  return (((year + "-") + month) + "-") + day;
}

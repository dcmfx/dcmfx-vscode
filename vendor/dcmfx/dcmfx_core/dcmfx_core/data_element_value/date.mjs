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
import { Ok, Error, Empty as $Empty, CustomType as $CustomType, makeError } from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_core/data_element_value/date.gleam";

export class StructuredDate extends $CustomType {
  constructor(year, month, day) {
    super();
    this.year = year;
    this.month = month;
    this.day = day;
  }
}
export const StructuredDate$StructuredDate = (year, month, day) =>
  new StructuredDate(year, month, day);
export const StructuredDate$isStructuredDate = (value) =>
  value instanceof StructuredDate;
export const StructuredDate$StructuredDate$year = (value) => value.year;
export const StructuredDate$StructuredDate$0 = (value) => value.year;
export const StructuredDate$StructuredDate$month = (value) => value.month;
export const StructuredDate$StructuredDate$1 = (value) => value.month;
export const StructuredDate$StructuredDate$day = (value) => value.day;
export const StructuredDate$StructuredDate$2 = (value) => value.day;

/**
 * Converts a `Date` value into a structured date.
 */
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
      let re;
      if ($ instanceof Ok) {
        re = $[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_element_value/date",
          32,
          "from_bytes",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 857,
            end: 925,
            pattern_start: 868,
            pattern_end: 874
          }
        )
      }
      let $1 = $regexp.scan(re, date_string$1);
      if ($1 instanceof $Empty) {
        return new Error(
          $data_error.new_value_invalid(
            ("Date is invalid: '" + date_string$1) + "'",
          ),
        );
      } else {
        let $2 = $1.tail;
        if ($2 instanceof $Empty) {
          let $3 = $1.head.submatches;
          if ($3 instanceof $Empty) {
            return new Error(
              $data_error.new_value_invalid(
                ("Date is invalid: '" + date_string$1) + "'",
              ),
            );
          } else {
            let $4 = $3.head;
            if ($4 instanceof Some) {
              let $5 = $3.tail;
              if ($5 instanceof $Empty) {
                return new Error(
                  $data_error.new_value_invalid(
                    ("Date is invalid: '" + date_string$1) + "'",
                  ),
                );
              } else {
                let $6 = $5.head;
                if ($6 instanceof Some) {
                  let $7 = $5.tail;
                  if ($7 instanceof $Empty) {
                    return new Error(
                      $data_error.new_value_invalid(
                        ("Date is invalid: '" + date_string$1) + "'",
                      ),
                    );
                  } else {
                    let $8 = $7.head;
                    if ($8 instanceof Some) {
                      let $9 = $7.tail;
                      if ($9 instanceof $Empty) {
                        let year = $4[0];
                        let month = $6[0];
                        let day = $8[0];
                        let $10 = $int.parse(year);
                        let year$1;
                        if ($10 instanceof Ok) {
                          year$1 = $10[0];
                        } else {
                          throw makeError(
                            "let_assert",
                            FILEPATH,
                            "dcmfx_core/data_element_value/date",
                            36,
                            "from_bytes",
                            "Pattern match failed, no pattern matched the value.",
                            {
                              value: $10,
                              start: 1049,
                              end: 1086,
                              pattern_start: 1060,
                              pattern_end: 1068
                            }
                          )
                        }
                        let $11 = $int.parse(month);
                        let month$1;
                        if ($11 instanceof Ok) {
                          month$1 = $11[0];
                        } else {
                          throw makeError(
                            "let_assert",
                            FILEPATH,
                            "dcmfx_core/data_element_value/date",
                            37,
                            "from_bytes",
                            "Pattern match failed, no pattern matched the value.",
                            {
                              value: $11,
                              start: 1093,
                              end: 1132,
                              pattern_start: 1104,
                              pattern_end: 1113
                            }
                          )
                        }
                        let $12 = $int.parse(day);
                        let day$1;
                        if ($12 instanceof Ok) {
                          day$1 = $12[0];
                        } else {
                          throw makeError(
                            "let_assert",
                            FILEPATH,
                            "dcmfx_core/data_element_value/date",
                            38,
                            "from_bytes",
                            "Pattern match failed, no pattern matched the value.",
                            {
                              value: $12,
                              start: 1139,
                              end: 1174,
                              pattern_start: 1150,
                              pattern_end: 1157
                            }
                          )
                        }
                        return new Ok(
                          new StructuredDate(year$1, month$1, day$1),
                        );
                      } else {
                        return new Error(
                          $data_error.new_value_invalid(
                            ("Date is invalid: '" + date_string$1) + "'",
                          ),
                        );
                      }
                    } else {
                      return new Error(
                        $data_error.new_value_invalid(
                          ("Date is invalid: '" + date_string$1) + "'",
                        ),
                      );
                    }
                  }
                } else {
                  return new Error(
                    $data_error.new_value_invalid(
                      ("Date is invalid: '" + date_string$1) + "'",
                    ),
                  );
                }
              }
            } else {
              return new Error(
                $data_error.new_value_invalid(
                  ("Date is invalid: '" + date_string$1) + "'",
                ),
              );
            }
          }
        } else {
          return new Error(
            $data_error.new_value_invalid(
              ("Date is invalid: '" + date_string$1) + "'",
            ),
          );
        }
      }
    },
  );
}

/**
 * Builds the content of a `Date` data element value where both the month and
 * day are optional. The month value is required if there is a day specified.
 * 
 * @ignore
 */
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

/**
 * Converts a structured date to a `Date` value.
 */
export function to_bytes(value) {
  let _pipe = components_to_string(
    value.year,
    new Some(value.month),
    new Some(value.day),
  );
  return $result.map(_pipe, $bit_array.from_string);
}

/**
 * Formats a structured date as an ISO 8601 date.
 */
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

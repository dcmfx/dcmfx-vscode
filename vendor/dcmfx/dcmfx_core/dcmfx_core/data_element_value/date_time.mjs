/// <reference types="./date_time.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $regex from "../../../gleam_stdlib/gleam/regex.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $date from "../../dcmfx_core/data_element_value/date.mjs";
import * as $time from "../../dcmfx_core/data_element_value/time.mjs";
import { StructuredTime } from "../../dcmfx_core/data_element_value/time.mjs";
import * as $data_error from "../../dcmfx_core/data_error.mjs";
import * as $bit_array_utils from "../../dcmfx_core/internal/bit_array_utils.mjs";
import * as $utils from "../../dcmfx_core/internal/utils.mjs";
import { Ok, Error, CustomType as $CustomType, makeError, remainderInt } from "../../gleam.mjs";

export class StructuredDateTime extends $CustomType {
  constructor(year, month, day, hour, minute, second, time_zone_offset) {
    super();
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.time_zone_offset = time_zone_offset;
  }
}

export function from_bytes(bytes) {
  let date_time_string = (() => {
    let _pipe = bytes;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map(_pipe$1, $utils.trim_right_whitespace);
    return $result.replace_error(
      _pipe$2,
      $data_error.new_value_invalid("DateTime is invalid UTF-8"),
    );
  })();
  return $result.try$(
    date_time_string,
    (date_time_string) => {
      let $ = $regex.from_string(
        "^(\\d{4})((\\d{2})((\\d{2})((\\d{2})((\\d{2})((\\d{2})(\\.\\d{1,6})?)?)?)?)?)?([\\+\\-]\\d{4})?$",
      );
      if (!$.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_core/data_element_value/date_time",
          43,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: $ }
        )
      }
      let re = $[0];
      let $1 = $regex.scan(re, date_time_string);
      if ($1.atLeastLength(1)) {
        let match = $1.head;
        let submatches = $list.append(
          match.submatches,
          $list.repeat(new None(), 13 - $list.length(match.submatches)),
        );
        let $2 = (() => {
          if (submatches.hasLength(13) && submatches.head instanceof Some) {
            let year = submatches.head[0];
            let month = submatches.tail.tail.head;
            let day = submatches.tail.tail.tail.tail.head;
            let hour = submatches.tail.tail.tail.tail.tail.tail.head;
            let minute = submatches.tail.tail.tail.tail.tail.tail.tail.tail.head;
            let second = submatches.tail.tail.tail.tail.tail.tail.tail.tail.tail.head;
            let offset = submatches.tail.tail.tail.tail.tail.tail.tail.tail.tail.tail.tail.tail.head;
            return [year, month, day, hour, minute, second, offset];
          } else {
            return [
              "0",
              new None(),
              new None(),
              new None(),
              new None(),
              new None(),
              new None(),
            ];
          }
        })();
        let year = $2[0];
        let month = $2[1];
        let day = $2[2];
        let hour = $2[3];
        let minute = $2[4];
        let second = $2[5];
        let offset = $2[6];
        let $3 = $int.parse(year);
        if (!$3.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value/date_time",
            73,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: $3 }
          )
        }
        let year$1 = $3[0];
        let parse_int = (value) => {
          if (value instanceof Some) {
            let value$1 = value[0];
            return $option.from_result($int.parse(value$1));
          } else {
            return new None();
          }
        };
        let month$1 = parse_int(month);
        let day$1 = parse_int(day);
        let hour$1 = parse_int(hour);
        let minute$1 = parse_int(minute);
        let offset$1 = parse_int(offset);
        let second$1 = (() => {
          if (second instanceof Some) {
            let second$1 = second[0];
            return $option.from_result($utils.smart_parse_float(second$1));
          } else {
            return new None();
          }
        })();
        return new Ok(
          new StructuredDateTime(
            year$1,
            month$1,
            day$1,
            hour$1,
            minute$1,
            second$1,
            offset$1,
          ),
        );
      } else {
        return new Error(
          $data_error.new_value_invalid(
            ("DateTime is invalid: '" + date_time_string) + "'",
          ),
        );
      }
    },
  );
}

export function to_bytes(value) {
  let has_hour_without_day = $option.is_some(value.hour) && !$option.is_some(
    value.day,
  );
  return $bool.guard(
    has_hour_without_day,
    new Error(
      $data_error.new_value_invalid(
        "DateTime day value must be present when there is an hour value",
      ),
    ),
    () => {
      let date = $date.components_to_string(value.year, value.month, value.day);
      return $result.try$(
        date,
        (date) => {
          let time = (() => {
            let $ = value.hour;
            if ($ instanceof Some) {
              let hour = $[0];
              return $time.to_string(
                new StructuredTime(hour, value.minute, value.second),
              );
            } else {
              return new Ok("");
            }
          })();
          return $result.try$(
            time,
            (time) => {
              let time_zone_offset = (() => {
                let $ = value.time_zone_offset;
                if ($ instanceof Some) {
                  let offset = $[0];
                  let is_offset_valid = ((offset >= -1200) && (offset <= 1400)) && ((remainderInt(
                    offset,
                    100
                  )) < 60);
                  if (is_offset_valid) {
                    let sign = (() => {
                      let $1 = offset < 0;
                      if ($1) {
                        return "-";
                      } else {
                        return "+";
                      }
                    })();
                    let _pipe = offset;
                    let _pipe$1 = $int.absolute_value(_pipe);
                    let _pipe$2 = $int.to_string(_pipe$1);
                    let _pipe$3 = $utils.pad_start(_pipe$2, 4, "0");
                    let _pipe$4 = ((_capture) => {
                      return $string.append(sign, _capture);
                    })(_pipe$3);
                    return new Ok(_pipe$4);
                  } else {
                    return new Error(
                      $data_error.new_value_invalid(
                        "DateTime time zone offset is invalid: " + $int.to_string(
                          offset,
                        ),
                      ),
                    );
                  }
                } else {
                  return new Ok("");
                }
              })();
              return $result.try$(
                time_zone_offset,
                (time_zone_offset) => {
                  let _pipe = ((date + time) + time_zone_offset);
                  let _pipe$1 = $bit_array.from_string(_pipe);
                  let _pipe$2 = $bit_array_utils.pad_to_even_length(
                    _pipe$1,
                    0x20,
                  );
                  return new Ok(_pipe$2);
                },
              );
            },
          );
        },
      );
    },
  );
}

export function to_iso8601(date_time) {
  let s = (() => {
    let _pipe = date_time.year;
    let _pipe$1 = $int.to_string(_pipe);
    return $utils.pad_start(_pipe$1, 4, "0");
  })();
  let s$1 = (() => {
    let $ = date_time.month;
    if ($ instanceof Some) {
      let month = $[0];
      let s$1 = (s + "-") + (() => {
        let _pipe = month;
        let _pipe$1 = $int.to_string(_pipe);
        return $utils.pad_start(_pipe$1, 2, "0");
      })();
      let $1 = date_time.day;
      if ($1 instanceof Some) {
        let day = $1[0];
        let s$2 = (s$1 + "-") + (() => {
          let _pipe = day;
          let _pipe$1 = $int.to_string(_pipe);
          return $utils.pad_start(_pipe$1, 2, "0");
        })();
        let $2 = date_time.hour;
        if ($2 instanceof Some) {
          let hour = $2[0];
          return (s$2 + "T") + $time.to_iso8601(
            new StructuredTime(hour, date_time.minute, date_time.second),
          );
        } else {
          return s$2;
        }
      } else {
        return s$1;
      }
    } else {
      return s;
    }
  })();
  let $ = date_time.time_zone_offset;
  if ($ instanceof Some) {
    let offset = $[0];
    let sign = (() => {
      let $1 = offset < 0;
      if ($1) {
        return "-";
      } else {
        return "+";
      }
    })();
    let value = (() => {
      let _pipe = offset;
      let _pipe$1 = $int.absolute_value(_pipe);
      let _pipe$2 = $int.to_string(_pipe$1);
      return $utils.pad_start(_pipe$2, 4, "0");
    })();
    return (s$1 + sign) + value;
  } else {
    return s$1;
  }
}
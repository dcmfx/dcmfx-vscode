/// <reference types="./time.d.mts" />
import * as $regexp from "../../../gleam_regexp/gleam/regexp.mjs";
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $float from "../../../gleam_stdlib/gleam/float.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $data_error from "../../dcmfx_core/data_error.mjs";
import * as $utils from "../../dcmfx_core/internal/utils.mjs";
import { Ok, Error, CustomType as $CustomType, makeError } from "../../gleam.mjs";

export class StructuredTime extends $CustomType {
  constructor(hour, minute, second) {
    super();
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }
}

export function from_bytes(bytes) {
  let time_string = (() => {
    let _pipe = bytes;
    let _pipe$1 = $bit_array.to_string(_pipe);
    let _pipe$2 = $result.map(_pipe$1, $utils.trim_end_whitespace);
    return $result.replace_error(
      _pipe$2,
      $data_error.new_value_invalid("Time is invalid UTF-8"),
    );
  })();
  return $result.try$(
    time_string,
    (time_string) => {
      let $ = $regexp.from_string(
        "^(\\d\\d)((\\d\\d)((\\d\\d)(\\.\\d{1,6})?)?)?$",
      );
      if (!$.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_core/data_element_value/time",
          31,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: $ }
        )
      }
      let re = $[0];
      let $1 = $regexp.scan(re, time_string);
      if ($1.hasLength(1)) {
        let match = $1.head;
        let $2 = (() => {
          let $3 = match.submatches;
          if ($3.atLeastLength(4) && $3.head instanceof Some) {
            let hour = $3.head[0];
            let minute = $3.tail.tail.head;
            let second = $3.tail.tail.tail.head;
            return [hour, minute, second];
          } else if ($3.atLeastLength(3) &&
          $3.head instanceof Some &&
          $3.tail.tail.head instanceof Some) {
            let hour = $3.head[0];
            let minute = $3.tail.tail.head[0];
            return [hour, new Some(minute), new None()];
          } else if ($3.atLeastLength(1) && $3.head instanceof Some) {
            let hour = $3.head[0];
            return [hour, new None(), new None()];
          } else {
            return ["0", new None(), new None()];
          }
        })();
        let hour = $2[0];
        let minute = $2[1];
        let second = $2[2];
        let $3 = $int.parse(hour);
        if (!$3.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_core/data_element_value/time",
            43,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: $3 }
          )
        }
        let hour$1 = $3[0];
        let minute$1 = (() => {
          if (minute instanceof Some) {
            let minute$1 = minute[0];
            return $option.from_result($int.parse(minute$1));
          } else {
            return new None();
          }
        })();
        let second$1 = (() => {
          if (second instanceof Some) {
            let second$1 = second[0];
            return $option.from_result($utils.smart_parse_float(second$1));
          } else {
            return new None();
          }
        })();
        return new Ok(new StructuredTime(hour$1, minute$1, second$1));
      } else {
        return new Error(
          $data_error.new_value_invalid(
            ("Time is invalid: '" + time_string) + "'",
          ),
        );
      }
    },
  );
}

function format_second(seconds) {
  let whole_seconds = (() => {
    let _pipe = seconds;
    let _pipe$1 = $float.floor(_pipe);
    let _pipe$2 = $float.round(_pipe$1);
    let _pipe$3 = $int.to_string(_pipe$2);
    return $utils.pad_start(_pipe$3, 2, "0");
  })();
  let fractional_seconds = (() => {
    let _pipe = ((seconds - $float.floor(seconds)) * 1_000_000.0);
    return $float.round(_pipe);
  })();
  if (fractional_seconds === 0) {
    return whole_seconds;
  } else {
    let fractional_seconds$1 = (() => {
      let _pipe = fractional_seconds;
      let _pipe$1 = $int.to_string(_pipe);
      return $utils.trim_end(_pipe$1, "0");
    })();
    return (whole_seconds + ".") + fractional_seconds$1;
  }
}

export function to_string(value) {
  let has_second_without_minute = $option.is_some(value.second) && !$option.is_some(
    value.minute,
  );
  return $bool.guard(
    has_second_without_minute,
    new Error(
      $data_error.new_value_invalid(
        "Time minute value must be present when there is a second value",
      ),
    ),
    () => {
      let hour = (() => {
        let $ = (value.hour >= 0) && (value.hour <= 23);
        if ($) {
          let _pipe = value.hour;
          let _pipe$1 = $int.to_string(_pipe);
          let _pipe$2 = $utils.pad_start(_pipe$1, 2, "0");
          return new Ok(_pipe$2);
        } else {
          return new Error(
            $data_error.new_value_invalid(
              "Time hour value is invalid: " + $int.to_string(value.hour),
            ),
          );
        }
      })();
      return $result.try$(
        hour,
        (hour) => {
          let minute = (() => {
            let $ = value.minute;
            if ($ instanceof Some) {
              let minute = $[0];
              let $1 = (minute >= 0) && (minute <= 59);
              if ($1) {
                let _pipe = minute;
                let _pipe$1 = $int.to_string(_pipe);
                let _pipe$2 = $utils.pad_start(_pipe$1, 2, "0");
                return new Ok(_pipe$2);
              } else {
                return new Error(
                  $data_error.new_value_invalid(
                    "Time minute value is invalid: " + $int.to_string(minute),
                  ),
                );
              }
            } else {
              return new Ok("");
            }
          })();
          return $result.try$(
            minute,
            (minute) => {
              let second = (() => {
                let $ = value.second;
                if ($ instanceof Some) {
                  let second = $[0];
                  let $1 = (second >= 0.0) && (second <= 60.0);
                  if ($1) {
                    return new Ok(format_second(second));
                  } else {
                    return new Error(
                      $data_error.new_value_invalid(
                        "Time second value is invalid: " + $float.to_string(
                          second,
                        ),
                      ),
                    );
                  }
                } else {
                  return new Ok("");
                }
              })();
              return $result.try$(
                second,
                (second) => { return new Ok((hour + minute) + second); },
              );
            },
          );
        },
      );
    },
  );
}

export function to_bytes(time) {
  let _pipe = time;
  let _pipe$1 = to_string(_pipe);
  return $result.map(_pipe$1, $bit_array.from_string);
}

export function to_iso8601(time) {
  let hour = (() => {
    let _pipe = time.hour;
    let _pipe$1 = $int.to_string(_pipe);
    return $utils.pad_start(_pipe$1, 2, "0");
  })();
  let $ = time.minute;
  if ($ instanceof Some) {
    let minute = $[0];
    let minute$1 = (() => {
      let _pipe = minute;
      let _pipe$1 = $int.to_string(_pipe);
      return $utils.pad_start(_pipe$1, 2, "0");
    })();
    let $1 = time.second;
    if ($1 instanceof Some) {
      let second = $1[0];
      return (((hour + ":") + minute$1) + ":") + format_second(second);
    } else {
      return (hour + ":") + minute$1;
    }
  } else {
    return hour;
  }
}

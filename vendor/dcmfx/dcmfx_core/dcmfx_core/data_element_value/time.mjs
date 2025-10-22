/// <reference types="./time.d.mts" />
import * as $regexp from "../../../gleam_regexp/gleam/regexp.mjs";
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $float from "../../../gleam_stdlib/gleam/float.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $data_error from "../../dcmfx_core/data_error.mjs";
import * as $utils from "../../dcmfx_core/internal/utils.mjs";
import { Ok, Error, Empty as $Empty, CustomType as $CustomType, makeError } from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_core/data_element_value/time.gleam";

export class StructuredTime extends $CustomType {
  constructor(hour, minute, second) {
    super();
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }
}
export const StructuredTime$StructuredTime = (hour, minute, second) =>
  new StructuredTime(hour, minute, second);
export const StructuredTime$isStructuredTime = (value) =>
  value instanceof StructuredTime;
export const StructuredTime$StructuredTime$hour = (value) => value.hour;
export const StructuredTime$StructuredTime$0 = (value) => value.hour;
export const StructuredTime$StructuredTime$minute = (value) => value.minute;
export const StructuredTime$StructuredTime$1 = (value) => value.minute;
export const StructuredTime$StructuredTime$second = (value) => value.second;
export const StructuredTime$StructuredTime$2 = (value) => value.second;

/**
 * Converts a `Time` value into a structured time.
 */
export function from_bytes(bytes) {
  let _block;
  let _pipe = bytes;
  let _pipe$1 = $bit_array.to_string(_pipe);
  _block = $result.replace_error(
    _pipe$1,
    $data_error.new_value_invalid("Time is invalid UTF-8"),
  );
  let time_string = _block;
  return $result.try$(
    time_string,
    (time_string) => {
      let _block$1;
      let _pipe$2 = time_string;
      let _pipe$3 = $utils.trim_ascii(_pipe$2, 0x0);
      _block$1 = $string.trim(_pipe$3);
      let time_string$1 = _block$1;
      let $ = $regexp.from_string(
        "^(\\d\\d)((\\d\\d)((\\d\\d)(\\.\\d{1,6})?)?)?$",
      );
      let re;
      if ($ instanceof Ok) {
        re = $[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_element_value/time",
          33,
          "from_bytes",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 905,
            end: 997,
            pattern_start: 916,
            pattern_end: 922
          }
        )
      }
      let $1 = $regexp.scan(re, time_string$1);
      if ($1 instanceof $Empty) {
        return new Error(
          $data_error.new_value_invalid(
            ("Time is invalid: '" + time_string$1) + "'",
          ),
        );
      } else {
        let $2 = $1.tail;
        if ($2 instanceof $Empty) {
          let match = $1.head;
          let _block$2;
          let $4 = match.submatches;
          if ($4 instanceof $Empty) {
            _block$2 = ["0", new None(), new None()];
          } else {
            let $5 = $4.head;
            if ($5 instanceof Some) {
              let $6 = $4.tail;
              if ($6 instanceof $Empty) {
                let hour = $5[0];
                _block$2 = [hour, new None(), new None()];
              } else {
                let $7 = $6.tail;
                if ($7 instanceof $Empty) {
                  let hour = $5[0];
                  _block$2 = [hour, new None(), new None()];
                } else {
                  let $8 = $7.tail;
                  if ($8 instanceof $Empty) {
                    let $9 = $7.head;
                    if ($9 instanceof Some) {
                      let hour = $5[0];
                      let minute = $9[0];
                      _block$2 = [hour, new Some(minute), new None()];
                    } else {
                      let hour = $5[0];
                      _block$2 = [hour, new None(), new None()];
                    }
                  } else {
                    let hour = $5[0];
                    let minute = $7.head;
                    let second = $8.head;
                    _block$2 = [hour, minute, second];
                  }
                }
              }
            } else {
              _block$2 = ["0", new None(), new None()];
            }
          }
          let $3 = _block$2;
          let hour;
          let minute;
          let second;
          hour = $3[0];
          minute = $3[1];
          second = $3[2];
          let $5 = $int.parse(hour);
          let hour$1;
          if ($5 instanceof Ok) {
            hour$1 = $5[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "dcmfx_core/data_element_value/time",
              45,
              "from_bytes",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $5,
                start: 1353,
                end: 1390,
                pattern_start: 1364,
                pattern_end: 1372
              }
            )
          }
          let _block$3;
          if (minute instanceof Some) {
            let minute$1 = minute[0];
            _block$3 = $option.from_result($int.parse(minute$1));
          } else {
            _block$3 = minute;
          }
          let minute$1 = _block$3;
          let _block$4;
          if (second instanceof Some) {
            let second$1 = second[0];
            _block$4 = $option.from_result($utils.smart_parse_float(second$1));
          } else {
            _block$4 = second;
          }
          let second$1 = _block$4;
          return new Ok(new StructuredTime(hour$1, minute$1, second$1));
        } else {
          return new Error(
            $data_error.new_value_invalid(
              ("Time is invalid: '" + time_string$1) + "'",
            ),
          );
        }
      }
    },
  );
}

/**
 * Takes a number of seconds and formats it as `SS[.FFFFFF]` with two digits
 * for the whole number of seconds, and up to 6 digits for the fractional
 * seconds. The fractional seconds are only included if the number of seconds
 * is not an exact whole number.
 * 
 * @ignore
 */
function format_second(seconds) {
  let _block;
  let _pipe = seconds;
  let _pipe$1 = $float.floor(_pipe);
  let _pipe$2 = $float.round(_pipe$1);
  let _pipe$3 = $int.to_string(_pipe$2);
  _block = $utils.pad_start(_pipe$3, 2, "0");
  let whole_seconds = _block;
  let _block$1;
  let _pipe$4 = ((seconds - $float.floor(seconds)) * 1_000_000.0);
  _block$1 = $float.round(_pipe$4);
  let fractional_seconds = _block$1;
  if (fractional_seconds === 0) {
    return whole_seconds;
  } else {
    let _block$2;
    let _pipe$5 = fractional_seconds;
    let _pipe$6 = $int.to_string(_pipe$5);
    _block$2 = $utils.trim_ascii_end(_pipe$6, 0x30);
    let fractional_seconds$1 = _block$2;
    return (whole_seconds + ".") + fractional_seconds$1;
  }
}

/**
 * Returns the string value of a structured time.
 */
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
      let _block;
      let $ = (value.hour >= 0) && (value.hour <= 23);
      if ($) {
        let _pipe = value.hour;
        let _pipe$1 = $int.to_string(_pipe);
        let _pipe$2 = $utils.pad_start(_pipe$1, 2, "0");
        _block = new Ok(_pipe$2);
      } else {
        _block = new Error(
          $data_error.new_value_invalid(
            "Time hour value is invalid: " + $int.to_string(value.hour),
          ),
        );
      }
      let hour = _block;
      return $result.try$(
        hour,
        (hour) => {
          let _block$1;
          let $1 = value.minute;
          if ($1 instanceof Some) {
            let minute = $1[0];
            let $2 = (minute >= 0) && (minute <= 59);
            if ($2) {
              let _pipe = minute;
              let _pipe$1 = $int.to_string(_pipe);
              let _pipe$2 = $utils.pad_start(_pipe$1, 2, "0");
              _block$1 = new Ok(_pipe$2);
            } else {
              _block$1 = new Error(
                $data_error.new_value_invalid(
                  "Time minute value is invalid: " + $int.to_string(minute),
                ),
              );
            }
          } else {
            _block$1 = new Ok("");
          }
          let minute = _block$1;
          return $result.try$(
            minute,
            (minute) => {
              let _block$2;
              let $2 = value.second;
              if ($2 instanceof Some) {
                let second = $2[0];
                let $3 = (second >= 0.0) && (second <= 60.0);
                if ($3) {
                  _block$2 = new Ok(format_second(second));
                } else {
                  _block$2 = new Error(
                    $data_error.new_value_invalid(
                      "Time second value is invalid: " + $float.to_string(
                        second,
                      ),
                    ),
                  );
                }
              } else {
                _block$2 = new Ok("");
              }
              let second = _block$2;
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

/**
 * Converts a structured time to a `Time` value.
 */
export function to_bytes(time) {
  let _pipe = time;
  let _pipe$1 = to_string(_pipe);
  return $result.map(_pipe$1, $bit_array.from_string);
}

/**
 * Formats a structured time as an ISO 8601 time. Components that aren't
 * specified are omitted.
 */
export function to_iso8601(time) {
  let _block;
  let _pipe = time.hour;
  let _pipe$1 = $int.to_string(_pipe);
  _block = $utils.pad_start(_pipe$1, 2, "0");
  let hour = _block;
  let $ = time.minute;
  if ($ instanceof Some) {
    let minute = $[0];
    let _block$1;
    let _pipe$2 = minute;
    let _pipe$3 = $int.to_string(_pipe$2);
    _block$1 = $utils.pad_start(_pipe$3, 2, "0");
    let minute$1 = _block$1;
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

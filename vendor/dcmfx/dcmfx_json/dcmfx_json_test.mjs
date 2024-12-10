/// <reference types="./dcmfx_json_test.d.mts" />
import * as $data_element_value from "../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $person_name from "../dcmfx_core/dcmfx_core/data_element_value/person_name.mjs";
import { PersonNameComponents, StructuredPersonName } from "../dcmfx_core/dcmfx_core/data_element_value/person_name.mjs";
import * as $data_set from "../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $dictionary from "../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $transfer_syntax from "../dcmfx_core/dcmfx_core/transfer_syntax.mjs";
import * as $value_representation from "../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../gleam_stdlib/gleam/option.mjs";
import * as $gleeunit from "../gleeunit/gleeunit.mjs";
import * as $should from "../gleeunit/gleeunit/should.mjs";
import * as $ieee_float from "../ieee_float/ieee_float.mjs";
import * as $dcmfx_json from "./dcmfx_json.mjs";
import * as $json_config from "./dcmfx_json/json_config.mjs";
import { DicomJsonConfig } from "./dcmfx_json/json_config.mjs";
import { Ok, toList, makeError, toBitArray } from "./gleam.mjs";

export function main() {
  return $gleeunit.main();
}

function test_data_sets() {
  let _pipe = toList([
    [
      toList([
        [
          $dictionary.manufacturer.tag,
          $data_element_value.new_long_string(toList(["123"])),
        ],
        [
          $dictionary.patient_name.tag,
          $data_element_value.new_person_name(
            toList([
              new StructuredPersonName(
                new Some(new PersonNameComponents("Jedi", "Yoda", "", "", "")),
                new None(),
                new None(),
              ),
            ]),
          ),
        ],
        [
          $dictionary.patient_sex.tag,
          $data_element_value.new_code_string(toList(["O"])),
        ],
      ]),
      ((("{" + "\"00080070\":{\"vr\":\"LO\",\"Value\":[\"123\"]},") + "\"00100010\":{\"vr\":\"PN\",\"Value\":[{\"Alphabetic\":\"Jedi^Yoda\"}]},") + "\"00100040\":{\"vr\":\"CS\",\"Value\":[\"O\"]}") + "}",
    ],
    [
      toList([
        [
          $dictionary.manufacturer.tag,
          $data_element_value.new_long_string(toList([""])),
        ],
      ]),
      "{\"00080070\":{\"vr\":\"LO\"}}",
    ],
    [
      toList([
        [
          $dictionary.manufacturer.tag,
          $data_element_value.new_long_string(toList(["", ""])),
        ],
      ]),
      "{\"00080070\":{\"vr\":\"LO\",\"Value\":[null,null]}}",
    ],
    [
      toList([
        [
          $dictionary.stage_number.tag,
          $data_element_value.new_integer_string(toList([1])),
        ],
      ]),
      "{\"00082122\":{\"vr\":\"IS\",\"Value\":[1]}}",
    ],
    [
      toList([
        [
          $dictionary.patient_size.tag,
          $data_element_value.new_decimal_string(toList([1.2])),
        ],
      ]),
      "{\"00101020\":{\"vr\":\"DS\",\"Value\":[1.2]}}",
    ],
    [
      toList([
        [
          $dictionary.pixel_data.tag,
          $data_element_value.new_other_byte_string(toBitArray([1, 2])),
        ],
      ]),
      "{\"7FE00010\":{\"vr\":\"OB\",\"InlineBinary\":\"AQI=\"}}",
    ],
    [
      toList([
        [
          $dictionary.pixel_data.tag,
          $data_element_value.new_other_word_string(toBitArray([0x3, 0x4])),
        ],
      ]),
      "{\"7FE00010\":{\"vr\":\"OW\",\"InlineBinary\":\"AwQ=\"}}",
    ],
    [
      toList([
        [
          $dictionary.transfer_syntax_uid.tag,
          $data_element_value.new_unique_identifier(
            toList([
              $transfer_syntax.encapsulated_uncompressed_explicit_vr_little_endian.uid,
            ]),
          ),
        ],
        [
          $dictionary.pixel_data.tag,
          $data_element_value.new_encapsulated_pixel_data(
            new $value_representation.OtherByteString(),
            toList([toBitArray([]), toBitArray([1, 2])]),
          ),
        ],
      ]),
      (("{" + "\"00020010\":{\"vr\":\"UI\",\"Value\":[\"1.2.840.10008.1.2.1.98\"]},") + "\"7FE00010\":{\"vr\":\"OB\",\"InlineBinary\":\"/v8A4AAAAAD+/wDgAgAAAAEC\"}") + "}",
    ],
    [
      toList([
        [
          $dictionary.energy_weighting_factor.tag,
          $data_element_value.new_floating_point_single(
            toList([$ieee_float.positive_infinity()]),
          ),
        ],
        [
          $dictionary.distance_source_to_isocenter.tag,
          $data_element_value.new_floating_point_single(
            toList([$ieee_float.negative_infinity()]),
          ),
        ],
        [
          $dictionary.distance_object_to_table_top.tag,
          $data_element_value.new_floating_point_single(
            toList([$ieee_float.nan()]),
          ),
        ],
      ]),
      ((("{" + "\"00189353\":{\"vr\":\"FL\",\"Value\":[\"Infinity\"]},") + "\"00189402\":{\"vr\":\"FL\",\"Value\":[\"-Infinity\"]},") + "\"00189403\":{\"vr\":\"FL\",\"Value\":[\"NaN\"]}") + "}",
    ],
  ]);
  return $list.map(
    _pipe,
    (x) => {
      let data_elements = x[0];
      let json = x[1];
      let data_elements$1 = $list.map(
        data_elements,
        (data_element) => {
          let $ = data_element[1];
          if (!$.isOk()) {
            throw makeError(
              "let_assert",
              "dcmfx_json_test",
              151,
              "",
              "Pattern match failed, no pattern matched the value.",
              { value: $ }
            )
          }
          let value = $[0];
          return [data_element[0], value];
        },
      );
      return [data_elements$1, json];
    },
  );
}

export function data_set_to_json_test() {
  let _pipe = test_data_sets();
  return $list.each(
    _pipe,
    (x) => {
      let tags = x[0];
      let expected_json = x[1];
      let ds = $data_set.from_list(tags);
      let config = new DicomJsonConfig(true, false);
      let _pipe$1 = ds;
      let _pipe$2 = $dcmfx_json.data_set_to_json(_pipe$1, config);
      return $should.equal(_pipe$2, new Ok(expected_json));
    },
  );
}

export function json_to_data_set_test() {
  let _pipe = test_data_sets();
  return $list.each(
    _pipe,
    (x) => {
      let tags = x[0];
      let expected_json = x[1];
      let ds = $data_set.from_list(tags);
      let _pipe$1 = expected_json;
      let _pipe$2 = $dcmfx_json.json_to_data_set(_pipe$1);
      return $should.equal(_pipe$2, new Ok(ds));
    },
  );
}

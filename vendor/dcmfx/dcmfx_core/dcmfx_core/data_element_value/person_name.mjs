/// <reference types="./person_name.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $data_error from "../../dcmfx_core/data_error.mjs";
import * as $bit_array_utils from "../../dcmfx_core/internal/bit_array_utils.mjs";
import * as $utils from "../../dcmfx_core/internal/utils.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  NonEmpty as $NonEmpty,
  CustomType as $CustomType,
  makeError,
} from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_core/data_element_value/person_name.gleam";

export class PersonNameComponents extends $CustomType {
  constructor(last_name, first_name, middle_name, prefix, suffix) {
    super();
    this.last_name = last_name;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.prefix = prefix;
    this.suffix = suffix;
  }
}

export class StructuredPersonName extends $CustomType {
  constructor(alphabetic, ideographic, phonetic) {
    super();
    this.alphabetic = alphabetic;
    this.ideographic = ideographic;
    this.phonetic = phonetic;
  }
}

function parse_person_name_component_group(component_group) {
  let _block;
  let _pipe = $string.split(component_group, "^");
  _block = $list.map(
    _pipe,
    (_capture) => { return $utils.trim_ascii_end(_capture, 0x20); },
  );
  let components = _block;
  let component_count = $list.length(components);
  let is_valid = (component_count > 0) && (component_count <= 5);
  return $bool.guard(
    !is_valid,
    new Error(
      $data_error.new_value_invalid(
        "PersonName has too many components: " + $int.to_string(component_count),
      ),
    ),
    () => {
      let has_content = $list.any(
        components,
        (component) => { return component !== ""; },
      );
      return $bool.guard(
        !has_content,
        new Ok(new None()),
        () => {
          let components$1 = $list.append(
            components,
            $list.repeat("", 5 - component_count),
          );
          if (
            components$1 instanceof $Empty ||
            components$1.tail instanceof $Empty ||
            components$1.tail.tail instanceof $Empty ||
            components$1.tail.tail.tail instanceof $Empty ||
            components$1.tail.tail.tail.tail instanceof $Empty ||
            components$1.tail.tail.tail.tail.tail instanceof $NonEmpty
          ) {
            throw makeError(
              "let_assert",
              FILEPATH,
              "dcmfx_core/data_element_value/person_name",
              117,
              "parse_person_name_component_group",
              "Pattern match failed, no pattern matched the value.",
              {
                value: components$1,
                start: 3577,
                end: 3653,
                pattern_start: 3588,
                pattern_end: 3640
              }
            )
          }
          let last_name = components$1.head;
          let first_name = components$1.tail.head;
          let middle_name = components$1.tail.tail.head;
          let prefix = components$1.tail.tail.tail.head;
          let suffix = components$1.tail.tail.tail.tail.head;
          return new Ok(
            new Some(
              new PersonNameComponents(
                last_name,
                first_name,
                middle_name,
                prefix,
                suffix,
              ),
            ),
          );
        },
      );
    },
  );
}

function parse_person_name_string(person_name_string) {
  let component_groups = $string.split(person_name_string, "=");
  let component_group_count = $list.length(component_groups);
  let is_valid = component_group_count <= 3;
  return $bool.guard(
    !is_valid,
    new Error(
      $data_error.new_value_invalid(
        "PersonName has too many component groups: " + $int.to_string(
          component_group_count,
        ),
      ),
    ),
    () => {
      let _block;
      let _pipe = component_groups;
      let _pipe$1 = $list.map(_pipe, parse_person_name_component_group);
      _block = $result.all(_pipe$1);
      let person_names = _block;
      return $result.try$(
        person_names,
        (person_names) => {
          let _block$1;
          if (person_names instanceof $Empty) {
            _block$1 = [new None(), new None(), new None()];
          } else {
            let $1 = person_names.tail;
            if ($1 instanceof $Empty) {
              let alphabetic = person_names.head;
              _block$1 = [alphabetic, new None(), new None()];
            } else {
              let $2 = $1.tail;
              if ($2 instanceof $Empty) {
                let alphabetic = person_names.head;
                let ideographic = $1.head;
                _block$1 = [alphabetic, ideographic, new None()];
              } else {
                let $3 = $2.tail;
                if ($3 instanceof $Empty) {
                  let alphabetic = person_names.head;
                  let ideographic = $1.head;
                  let phonetic = $2.head;
                  _block$1 = [alphabetic, ideographic, phonetic];
                } else {
                  _block$1 = [new None(), new None(), new None()];
                }
              }
            }
          }
          let $ = _block$1;
          let alphabetic = $[0];
          let ideographic = $[1];
          let phonetic = $[2];
          return new Ok(
            new StructuredPersonName(alphabetic, ideographic, phonetic),
          );
        },
      );
    },
  );
}

export function from_bytes(bytes) {
  let _block;
  let _pipe = bytes;
  let _pipe$1 = $bit_array.to_string(_pipe);
  _block = $result.replace_error(
    _pipe$1,
    $data_error.new_value_invalid("PersonName is invalid UTF-8"),
  );
  let person_name_string = _block;
  return $result.try$(
    person_name_string,
    (person_name_string) => {
      let _pipe$2 = person_name_string;
      let _pipe$3 = $string.split(_pipe$2, "\\");
      let _pipe$4 = $list.map(_pipe$3, parse_person_name_string);
      return $result.all(_pipe$4);
    },
  );
}

function components_to_string(components) {
  let _pipe = toList([
    components.last_name,
    components.first_name,
    components.middle_name,
    components.prefix,
    components.suffix,
  ]);
  let _pipe$1 = $list.map(
    _pipe,
    (_capture) => { return $utils.trim_ascii_end(_capture, 0x20); },
  );
  let _pipe$2 = $list.map(
    _pipe$1,
    (n) => {
      let is_too_long = $string.length(n) > 64;
      return $bool.guard(
        is_too_long,
        new Error(
          $data_error.new_value_invalid("PersonName component is too long"),
        ),
        () => {
          let has_disallowed_characters = ($string.contains(n, "^") || $string.contains(
            n,
            "=",
          )) || $string.contains(n, "\\");
          return $bool.guard(
            has_disallowed_characters,
            new Error(
              $data_error.new_value_invalid(
                "PersonName component has disallowed characters",
              ),
            ),
            () => { return new Ok(n); },
          );
        },
      );
    },
  );
  let _pipe$3 = $result.all(_pipe$2);
  let _pipe$4 = $result.map(
    _pipe$3,
    (_capture) => { return $string.join(_capture, "^"); },
  );
  return $result.map(
    _pipe$4,
    (_capture) => { return $utils.trim_ascii_end(_capture, 0x5E); },
  );
}

export function to_bytes(value) {
  let _block;
  let _pipe = value;
  let _pipe$1 = $list.map(
    _pipe,
    (value) => {
      let _pipe$1 = toList([value.alphabetic, value.ideographic, value.phonetic]);
      let _pipe$2 = $list.map(
        _pipe$1,
        (component_group) => {
          if (component_group instanceof Some) {
            let n = component_group[0];
            return components_to_string(n);
          } else {
            return new Ok("");
          }
        },
      );
      let _pipe$3 = $result.all(_pipe$2);
      let _pipe$4 = $result.map(
        _pipe$3,
        (_capture) => { return $string.join(_capture, "="); },
      );
      return $result.map(
        _pipe$4,
        (_capture) => { return $utils.trim_ascii_end(_capture, 0x3D); },
      );
    },
  );
  _block = $result.all(_pipe$1);
  let names = _block;
  return $result.map(
    names,
    (names) => {
      let _pipe$2 = names;
      let _pipe$3 = $string.join(_pipe$2, "\\");
      let _pipe$4 = $bit_array.from_string(_pipe$3);
      return $bit_array_utils.pad_to_even_length(_pipe$4, 0x20);
    },
  );
}

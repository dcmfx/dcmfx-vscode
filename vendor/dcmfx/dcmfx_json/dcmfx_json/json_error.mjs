/// <reference types="./json_error.d.mts" />
import * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_error from "../../dcmfx_core/dcmfx_core/data_error.mjs";
import * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $dictionary from "../../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $p10_error from "../../dcmfx_p10/dcmfx_p10/p10_error.mjs";
import * as $io from "../../gleam_stdlib/gleam/io.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None } from "../../gleam_stdlib/gleam/option.mjs";
import { Ok, toList, CustomType as $CustomType } from "../gleam.mjs";

export class DataError extends $CustomType {
  constructor(data_error) {
    super();
    this.data_error = data_error;
  }
}

export class P10Error extends $CustomType {
  constructor(p10_error) {
    super();
    this.p10_error = p10_error;
  }
}

export class JsonInvalid extends $CustomType {
  constructor(details, path) {
    super();
    this.details = details;
    this.path = path;
  }
}

export function serialize_error_to_lines(error, task_description) {
  if (error instanceof DataError) {
    let error$1 = error.data_error;
    return $data_error.to_lines(error$1, task_description);
  } else {
    let error$1 = error.p10_error;
    return $p10_error.to_lines(error$1, task_description);
  }
}

export function deserialize_error_to_lines(error, task_description) {
  let details = error.details;
  let path = error.path;
  return $list.flatten(
    toList([
      toList([
        "DICOM JSON deserialize error " + task_description,
        "",
        "  Details: " + details,
      ]),
      (() => {
        let $ = $data_set_path.final_data_element(path);
        if ($ instanceof Ok) {
          let tag = $[0];
          return toList([
            "  Tag: " + $data_element_tag.to_string(tag),
            "  Name: " + $dictionary.tag_name(tag, new None()),
          ]);
        } else {
          return toList([]);
        }
      })(),
      (() => {
        let $ = $data_set_path.is_root(path);
        if ($) {
          return toList([]);
        } else {
          return toList(["  Path: " + $data_set_path.to_string(path)]);
        }
      })(),
    ]),
  );
}

export function print_serialize_error(error, task_description) {
  let _pipe = serialize_error_to_lines(error, task_description);
  return $list.each(_pipe, $io.println);
}

export function print_deserialize_error(error, task_description) {
  let _pipe = deserialize_error_to_lines(error, task_description);
  return $list.each(_pipe, $io.println);
}

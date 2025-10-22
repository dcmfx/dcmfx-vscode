/// <reference types="./data_error.d.mts" />
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../gleam_stdlib/gleam/io.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $data_element_tag from "../dcmfx_core/data_element_tag.mjs";
import * as $data_set_path from "../dcmfx_core/data_set_path.mjs";
import * as $dictionary from "../dcmfx_core/dictionary.mjs";
import * as $value_representation from "../dcmfx_core/value_representation.mjs";
import { Ok, toList, CustomType as $CustomType } from "../gleam.mjs";

/**
 * When retrieving a value, the requested tag was not present in the data
 * set.
 */
export class TagNotPresent extends $CustomType {
  constructor(path) {
    super();
    this.path = path;
  }
}
export const DataError$TagNotPresent = (path) => new TagNotPresent(path);
export const DataError$isTagNotPresent = (value) =>
  value instanceof TagNotPresent;
export const DataError$TagNotPresent$path = (value) => value.path;
export const DataError$TagNotPresent$0 = (value) => value.path;

/**
 * When retrieving a value, the requested type is not present. E.g. tried to
 * retrieve an integer value when the data element value contains a string.
 */
export class ValueNotPresent extends $CustomType {
  constructor(path) {
    super();
    this.path = path;
  }
}
export const DataError$ValueNotPresent = (path) => new ValueNotPresent(path);
export const DataError$isValueNotPresent = (value) =>
  value instanceof ValueNotPresent;
export const DataError$ValueNotPresent$path = (value) => value.path;
export const DataError$ValueNotPresent$0 = (value) => value.path;

/**
 * When retrieving a value, it did not have the required multiplicity. E.g.
 * tried to retrieve a single string value when the data element contained
 * multiple string values.
 */
export class MultiplicityMismatch extends $CustomType {
  constructor(path) {
    super();
    this.path = path;
  }
}
export const DataError$MultiplicityMismatch = (path) =>
  new MultiplicityMismatch(path);
export const DataError$isMultiplicityMismatch = (value) =>
  value instanceof MultiplicityMismatch;
export const DataError$MultiplicityMismatch$path = (value) => value.path;
export const DataError$MultiplicityMismatch$0 = (value) => value.path;

/**
 * When retrieving a value, there was an error decoding its bytes. E.g. a
 * string value that had bytes that are not valid UTF-8, or a `PersonName`
 * value that had an invalid structure.
 *
 * When creating a value, the supplied input was not valid for the type of
 * data element being created.
 */
export class ValueInvalid extends $CustomType {
  constructor(details, path) {
    super();
    this.details = details;
    this.path = path;
  }
}
export const DataError$ValueInvalid = (details, path) =>
  new ValueInvalid(details, path);
export const DataError$isValueInvalid = (value) =>
  value instanceof ValueInvalid;
export const DataError$ValueInvalid$details = (value) => value.details;
export const DataError$ValueInvalid$0 = (value) => value.details;
export const DataError$ValueInvalid$path = (value) => value.path;
export const DataError$ValueInvalid$1 = (value) => value.path;

/**
 * When creating a value, the supplied data did not meet a required length
 * constraint, e.g. the minimum or maximum length for the value
 * representation wasn't respected.
 */
export class ValueLengthInvalid extends $CustomType {
  constructor(vr, length, details, path) {
    super();
    this.vr = vr;
    this.length = length;
    this.details = details;
    this.path = path;
  }
}
export const DataError$ValueLengthInvalid = (vr, length, details, path) =>
  new ValueLengthInvalid(vr, length, details, path);
export const DataError$isValueLengthInvalid = (value) =>
  value instanceof ValueLengthInvalid;
export const DataError$ValueLengthInvalid$vr = (value) => value.vr;
export const DataError$ValueLengthInvalid$0 = (value) => value.vr;
export const DataError$ValueLengthInvalid$length = (value) => value.length;
export const DataError$ValueLengthInvalid$1 = (value) => value.length;
export const DataError$ValueLengthInvalid$details = (value) => value.details;
export const DataError$ValueLengthInvalid$2 = (value) => value.details;
export const DataError$ValueLengthInvalid$path = (value) => value.path;
export const DataError$ValueLengthInvalid$3 = (value) => value.path;

/**
 * Converts a data error a human-readable string.
 */
export function to_string(error) {
  let optional_path_to_string = (path) => {
    let _pipe = path;
    let _pipe$1 = $option.map(_pipe, $data_set_path.to_detailed_string);
    return $option.unwrap(_pipe$1, "<unknown>");
  };
  return "DICOM Data Error: " + (() => {
    if (error instanceof TagNotPresent) {
      let path$1 = error.path;
      return "Tag not present at " + $data_set_path.to_detailed_string(path$1);
    } else if (error instanceof ValueNotPresent) {
      let path$1 = error.path;
      return "Value not present at " + optional_path_to_string(path$1);
    } else if (error instanceof MultiplicityMismatch) {
      let path$1 = error.path;
      return "Multiplicity mismatch at " + optional_path_to_string(path$1);
    } else if (error instanceof ValueInvalid) {
      let details$1 = error.details;
      let path$1 = error.path;
      return (("Invalid value at " + optional_path_to_string(path$1)) + ", details: ") + details$1;
    } else {
      let details$1 = error.details;
      let path$1 = error.path;
      return (("Invalid value length at " + optional_path_to_string(path$1)) + ", details: ") + details$1;
    }
  })();
}

/**
 * Constructs a new 'Tag not present' data error.
 */
export function new_tag_not_present() {
  return new TagNotPresent($data_set_path.new$());
}

/**
 * Constructs a new 'Value not present' data error.
 */
export function new_value_not_present() {
  return new ValueNotPresent(new None());
}

/**
 * Constructs a new 'Multiplicity mismatch' data error.
 */
export function new_multiplicity_mismatch() {
  return new MultiplicityMismatch(new None());
}

/**
 * Constructs a new 'Value invalid' data error.
 */
export function new_value_invalid(details) {
  return new ValueInvalid(details, new None());
}

/**
 * Constructs a new 'Value length invalid' data error.
 */
export function new_value_length_invalid(vr, length, details) {
  return new ValueLengthInvalid(vr, length, details, new None());
}

/**
 * Returns the data set path for a data error.
 */
export function path(error) {
  if (error instanceof TagNotPresent) {
    let path$1 = error.path;
    return new Some(path$1);
  } else if (error instanceof ValueNotPresent) {
    let path$1 = error.path;
    return path$1;
  } else if (error instanceof MultiplicityMismatch) {
    let path$1 = error.path;
    return path$1;
  } else if (error instanceof ValueInvalid) {
    let path$1 = error.path;
    return path$1;
  } else {
    let path$1 = error.path;
    return path$1;
  }
}

/**
 * Adds a data set path to a data error. This indicates the exact location
 * that a data error occurred in a data set, and should be included wherever
 * possible to make troubleshooting easier.
 */
export function with_path(error, path) {
  if (error instanceof TagNotPresent) {
    return new TagNotPresent(path);
  } else if (error instanceof ValueNotPresent) {
    return new ValueNotPresent(new Some(path));
  } else if (error instanceof MultiplicityMismatch) {
    return new ValueNotPresent(new Some(path));
  } else if (error instanceof ValueInvalid) {
    let details$1 = error.details;
    return new ValueInvalid(details$1, new Some(path));
  } else {
    let vr = error.vr;
    let length = error.length;
    let details$1 = error.details;
    return new ValueLengthInvalid(vr, length, details$1, new Some(path));
  }
}

/**
 * Returns the name of a data error as a human-readable string.
 */
export function name(error) {
  if (error instanceof TagNotPresent) {
    return "Tag not present";
  } else if (error instanceof ValueNotPresent) {
    return "Value not present";
  } else if (error instanceof MultiplicityMismatch) {
    return "Multiplicity mismatch";
  } else if (error instanceof ValueInvalid) {
    return "Invalid value";
  } else {
    return "Invalid value length";
  }
}

/**
 * Returns the `details` field of the error, if one exists.
 */
export function details(error) {
  if (error instanceof TagNotPresent) {
    return "";
  } else if (error instanceof ValueNotPresent) {
    return "";
  } else if (error instanceof MultiplicityMismatch) {
    return "";
  } else if (error instanceof ValueInvalid) {
    let details$1 = error.details;
    return details$1;
  } else {
    let details$1 = error.details;
    return details$1;
  }
}

/**
 * Returns lines of output that describe a DICOM data error in a human-readable
 * format.
 */
export function to_lines(error, task_description) {
  let initial_lines = toList([
    "DICOM data error " + task_description,
    "",
    "  Error: " + name(error),
  ]);
  let _block;
  if (error instanceof TagNotPresent) {
    let path$1 = error.path;
    let path_line = "  Path: " + $data_set_path.to_string(path$1);
    let $ = $data_set_path.final_data_element(path$1);
    if ($ instanceof Ok) {
      let tag = $[0];
      _block = toList([
        "  Tag: " + $data_element_tag.to_string(tag),
        "  Name: " + $dictionary.tag_name(tag, new None()),
        path_line,
      ]);
    } else {
      _block = toList([path_line]);
    }
  } else if (error instanceof ValueNotPresent) {
    let $ = error.path;
    if ($ instanceof Some) {
      let path$1 = $[0];
      let path_line = "  Path: " + $data_set_path.to_string(path$1);
      let $1 = $data_set_path.final_data_element(path$1);
      if ($1 instanceof Ok) {
        let tag = $1[0];
        _block = toList([
          "  Tag: " + $data_element_tag.to_string(tag),
          "  Name: " + $dictionary.tag_name(tag, new None()),
          path_line,
        ]);
      } else {
        _block = toList([path_line]);
      }
    } else {
      _block = toList([]);
    }
  } else if (error instanceof MultiplicityMismatch) {
    let $ = error.path;
    if ($ instanceof Some) {
      let path$1 = $[0];
      let path_line = "  Path: " + $data_set_path.to_string(path$1);
      let $1 = $data_set_path.final_data_element(path$1);
      if ($1 instanceof Ok) {
        let tag = $1[0];
        _block = toList([
          "  Tag: " + $data_element_tag.to_string(tag),
          "  Name: " + $dictionary.tag_name(tag, new None()),
          path_line,
        ]);
      } else {
        _block = toList([path_line]);
      }
    } else {
      _block = toList([]);
    }
  } else if (error instanceof ValueInvalid) {
    let $ = error.path;
    if ($ instanceof Some) {
      let path$1 = $[0];
      let path_line = "  Path: " + $data_set_path.to_string(path$1);
      let $1 = $data_set_path.final_data_element(path$1);
      if ($1 instanceof Ok) {
        let tag = $1[0];
        _block = toList([
          "  Tag: " + $data_element_tag.to_string(tag),
          "  Name: " + $dictionary.tag_name(tag, new None()),
          path_line,
        ]);
      } else {
        _block = toList([path_line]);
      }
    } else {
      _block = toList([]);
    }
  } else {
    let $ = error.path;
    if ($ instanceof Some) {
      let path$1 = $[0];
      let path_line = "  Path: " + $data_set_path.to_string(path$1);
      let $1 = $data_set_path.final_data_element(path$1);
      if ($1 instanceof Ok) {
        let tag = $1[0];
        _block = toList([
          "  Tag: " + $data_element_tag.to_string(tag),
          "  Name: " + $dictionary.tag_name(tag, new None()),
          path_line,
        ]);
      } else {
        _block = toList([path_line]);
      }
    } else {
      _block = toList([]);
    }
  }
  let path_lines = _block;
  let _block$1;
  if (error instanceof ValueInvalid) {
    let details$1 = error.details;
    _block$1 = toList(["  Details: " + details$1]);
  } else if (error instanceof ValueLengthInvalid) {
    let vr = error.vr;
    let length = error.length;
    let details$1 = error.details;
    _block$1 = toList([
      "  VR: " + $value_representation.to_string(vr),
      ("  Length: " + $int.to_string(length)) + " bytes",
      "  Details: " + details$1,
    ]);
  } else {
    _block$1 = toList([]);
  }
  let details_lines = _block$1;
  return $list.flatten(toList([initial_lines, path_lines, details_lines]));
}

/**
 * Prints a DICOM data error to stderr in a human-readable format.
 */
export function print(error, task_description) {
  $io.println_error("");
  $io.println_error("-----");
  let _pipe = error;
  let _pipe$1 = to_lines(_pipe, task_description);
  $list.each(_pipe$1, $io.println_error)
  return $io.println_error("");
}

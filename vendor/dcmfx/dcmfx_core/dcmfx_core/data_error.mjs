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
import { toList, CustomType as $CustomType } from "../gleam.mjs";

class TagNotPresent extends $CustomType {
  constructor(path) {
    super();
    this.path = path;
  }
}

class ValueNotPresent extends $CustomType {
  constructor(path) {
    super();
    this.path = path;
  }
}

class MultiplicityMismatch extends $CustomType {
  constructor(path) {
    super();
    this.path = path;
  }
}

class ValueInvalid extends $CustomType {
  constructor(details, path) {
    super();
    this.details = details;
    this.path = path;
  }
}

class ValueLengthInvalid extends $CustomType {
  constructor(vr, length, details, path) {
    super();
    this.vr = vr;
    this.length = length;
    this.details = details;
    this.path = path;
  }
}

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
      let details = error.details;
      let path$1 = error.path;
      return (("Invalid value at " + optional_path_to_string(path$1)) + ", details: ") + details;
    } else {
      let details = error.details;
      let path$1 = error.path;
      return (("Invalid value length at " + optional_path_to_string(path$1)) + ", details: ") + details;
    }
  })();
}

export function new_tag_not_present() {
  return new TagNotPresent($data_set_path.new$());
}

export function new_value_not_present() {
  return new ValueNotPresent(new None());
}

export function new_multiplicity_mismatch() {
  return new MultiplicityMismatch(new None());
}

export function new_value_invalid(details) {
  return new ValueInvalid(details, new None());
}

export function new_value_length_invalid(vr, length, details) {
  return new ValueLengthInvalid(vr, length, details, new None());
}

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

export function is_tag_not_present(error) {
  if (error instanceof TagNotPresent) {
    return true;
  } else {
    return false;
  }
}

export function with_path(error, path) {
  if (error instanceof TagNotPresent) {
    return new TagNotPresent(path);
  } else if (error instanceof ValueNotPresent) {
    return new ValueNotPresent(new Some(path));
  } else if (error instanceof MultiplicityMismatch) {
    return new ValueNotPresent(new Some(path));
  } else if (error instanceof ValueInvalid) {
    let details = error.details;
    return new ValueInvalid(details, new Some(path));
  } else {
    let vr = error.vr;
    let length = error.length;
    let details = error.details;
    return new ValueLengthInvalid(vr, length, details, new Some(path));
  }
}

export function name(error) {
  if (error instanceof TagNotPresent) {
    return "Tag not present";
  } else if (error instanceof ValueNotPresent) {
    return "Value not present";
  } else if (error instanceof MultiplicityMismatch) {
    return "Multiplicity mismatch";
  } else if (error instanceof ValueInvalid) {
    return "Value is invalid";
  } else {
    return "Value length is invalid";
  }
}

export function to_lines(error, task_description) {
  let initial_lines = toList([
    "DICOM data error " + task_description,
    "",
    "  Error: " + name(error),
  ]);
  let path_lines = (() => {
    if (error instanceof TagNotPresent) {
      let path$1 = error.path;
      let path_line = "  Path: " + $data_set_path.to_string(path$1);
      let $ = $data_set_path.final_data_element(path$1);
      if ($.isOk()) {
        let tag = $[0];
        return toList([
          "  Tag: " + $data_element_tag.to_string(tag),
          "  Name: " + $dictionary.tag_name(tag, new None()),
          path_line,
        ]);
      } else {
        return toList([path_line]);
      }
    } else if (error instanceof ValueNotPresent && error.path instanceof Some) {
      let path$1 = error.path[0];
      let path_line = "  Path: " + $data_set_path.to_string(path$1);
      let $ = $data_set_path.final_data_element(path$1);
      if ($.isOk()) {
        let tag = $[0];
        return toList([
          "  Tag: " + $data_element_tag.to_string(tag),
          "  Name: " + $dictionary.tag_name(tag, new None()),
          path_line,
        ]);
      } else {
        return toList([path_line]);
      }
    } else if (error instanceof MultiplicityMismatch &&
    error.path instanceof Some) {
      let path$1 = error.path[0];
      let path_line = "  Path: " + $data_set_path.to_string(path$1);
      let $ = $data_set_path.final_data_element(path$1);
      if ($.isOk()) {
        let tag = $[0];
        return toList([
          "  Tag: " + $data_element_tag.to_string(tag),
          "  Name: " + $dictionary.tag_name(tag, new None()),
          path_line,
        ]);
      } else {
        return toList([path_line]);
      }
    } else if (error instanceof ValueInvalid && error.path instanceof Some) {
      let path$1 = error.path[0];
      let path_line = "  Path: " + $data_set_path.to_string(path$1);
      let $ = $data_set_path.final_data_element(path$1);
      if ($.isOk()) {
        let tag = $[0];
        return toList([
          "  Tag: " + $data_element_tag.to_string(tag),
          "  Name: " + $dictionary.tag_name(tag, new None()),
          path_line,
        ]);
      } else {
        return toList([path_line]);
      }
    } else if (error instanceof ValueLengthInvalid && error.path instanceof Some) {
      let path$1 = error.path[0];
      let path_line = "  Path: " + $data_set_path.to_string(path$1);
      let $ = $data_set_path.final_data_element(path$1);
      if ($.isOk()) {
        let tag = $[0];
        return toList([
          "  Tag: " + $data_element_tag.to_string(tag),
          "  Name: " + $dictionary.tag_name(tag, new None()),
          path_line,
        ]);
      } else {
        return toList([path_line]);
      }
    } else {
      return toList([]);
    }
  })();
  let details_lines = (() => {
    if (error instanceof ValueInvalid) {
      let details = error.details;
      return toList(["  Details: " + details]);
    } else if (error instanceof ValueLengthInvalid) {
      let vr = error.vr;
      let length = error.length;
      let details = error.details;
      return toList([
        "  VR: " + $value_representation.to_string(vr),
        ("  Length: " + $int.to_string(length)) + " bytes",
        "  Details: " + details,
      ]);
    } else {
      return toList([]);
    }
  })();
  return $list.flatten(toList([initial_lines, path_lines, details_lines]));
}

export function print(error, task_description) {
  $io.println_error("");
  $io.println_error("-----");
  let _pipe = error;
  let _pipe$1 = to_lines(_pipe, task_description);
  $list.each(_pipe$1, $io.println_error)
  return $io.println_error("");
}

/// <reference types="./data_set_path.d.mts" />
import * as $regexp from "../../gleam_regexp/gleam/regexp.mjs";
import * as $bool from "../../gleam_stdlib/gleam/bool.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $data_element_tag from "../dcmfx_core/data_element_tag.mjs";
import * as $dictionary from "../dcmfx_core/dictionary.mjs";
import {
  Ok,
  Error,
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
} from "../gleam.mjs";

class DataSetPath extends $CustomType {
  constructor(entries) {
    super();
    this.entries = entries;
  }
}

export class DataElement extends $CustomType {
  constructor(tag) {
    super();
    this.tag = tag;
  }
}

export class SequenceItem extends $CustomType {
  constructor(index) {
    super();
    this.index = index;
  }
}

export function new$() {
  return new DataSetPath(toList([]));
}

export function new_with_data_element(tag) {
  return new DataSetPath(toList([new DataElement(tag)]));
}

export function entries(path) {
  return path.entries;
}

export function size(path) {
  let _pipe = path.entries;
  return $list.length(_pipe);
}

export function is_empty(path) {
  let _pipe = path.entries;
  return $list.is_empty(_pipe);
}

export function sequence_item_count(path) {
  let _pipe = path.entries;
  return $list.fold(
    _pipe,
    0,
    (acc, entry) => {
      if (entry instanceof DataElement) {
        return acc;
      } else {
        return acc + 1;
      }
    },
  );
}

export function final_data_element(path) {
  let $ = path.entries;
  if ($.atLeastLength(1) && $.head instanceof DataElement) {
    let tag = $.head.tag;
    return new Ok(tag);
  } else {
    return new Error(undefined);
  }
}

export function add_data_element(path, tag) {
  let $ = path.entries;
  if ($.hasLength(0)) {
    return new Ok(
      new DataSetPath(listPrepend(new DataElement(tag), path.entries)),
    );
  } else if ($.atLeastLength(1) && $.head instanceof SequenceItem) {
    return new Ok(
      new DataSetPath(listPrepend(new DataElement(tag), path.entries)),
    );
  } else {
    return new Error(
      "Invalid data set path entry: " + $data_element_tag.to_hex_string(tag),
    );
  }
}

export function add_sequence_item(path, index) {
  let $ = path.entries;
  if ($.atLeastLength(1) && $.head instanceof DataElement) {
    return new Ok(
      new DataSetPath(listPrepend(new SequenceItem(index), path.entries)),
    );
  } else {
    return new Error(
      ("Invalid data set path entry: [" + $int.to_string(index)) + "]",
    );
  }
}

export function pop(path) {
  let $ = path.entries;
  if ($.atLeastLength(1)) {
    let rest = $.tail;
    return new Ok(new DataSetPath(rest));
  } else {
    return new Error(undefined);
  }
}

export function from_string(s) {
  let path = new$();
  return $bool.guard(
    s === "",
    new Ok(path),
    () => {
      let _pipe = s;
      let _pipe$1 = $string.split(_pipe, "/");
      return $list.try_fold(
        _pipe$1,
        path,
        (path, entry) => {
          let $ = $data_element_tag.from_hex_string(entry);
          if ($.isOk()) {
            let tag = $[0];
            return add_data_element(path, tag);
          } else {
            let $1 = $regexp.from_string("^\\[(\\d+)\\]$");
            if (!$1.isOk()) {
              throw makeError(
                "let_assert",
                "dcmfx_core/data_set_path",
                149,
                "",
                "Pattern match failed, no pattern matched the value.",
                { value: $1 }
              )
            }
            let re = $1[0];
            let $2 = $regexp.scan(re, entry);
            if ($2.hasLength(1) &&
            $2.head instanceof $regexp.Match &&
            $2.head.submatches.hasLength(1) &&
            $2.head.submatches.head instanceof Some) {
              let index = $2.head.submatches.head[0];
              let $3 = $int.parse(index);
              if (!$3.isOk()) {
                throw makeError(
                  "let_assert",
                  "dcmfx_core/data_set_path",
                  153,
                  "",
                  "Pattern match failed, no pattern matched the value.",
                  { value: $3 }
                )
              }
              let index$1 = $3[0];
              return add_sequence_item(path, index$1);
            } else {
              return new Error("Invalid data set path entry: " + entry);
            }
          }
        },
      );
    },
  );
}

export function to_detailed_string(path) {
  let _pipe = path.entries;
  let _pipe$1 = $list.map(
    _pipe,
    (entry) => {
      if (entry instanceof DataElement) {
        let tag = entry.tag;
        return $dictionary.tag_with_name(tag, new None());
      } else {
        let index = entry.index;
        return "Item " + $int.to_string(index);
      }
    },
  );
  let _pipe$2 = $list.reverse(_pipe$1);
  return $string.join(_pipe$2, " / ");
}

export function to_string(path) {
  let _pipe = path.entries;
  let _pipe$1 = $list.map(
    _pipe,
    (entry) => {
      if (entry instanceof DataElement) {
        let tag = entry.tag;
        return $data_element_tag.to_hex_string(tag);
      } else {
        let index = entry.index;
        return ("[" + $int.to_string(index)) + "]";
      }
    },
  );
  let _pipe$2 = $list.reverse(_pipe$1);
  return $string.join(_pipe$2, "/");
}

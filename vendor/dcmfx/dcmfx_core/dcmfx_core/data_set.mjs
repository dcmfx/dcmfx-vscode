/// <reference types="./data_set.d.mts" />
import * as $bigi from "../../bigi/bigi.mjs";
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../gleam_stdlib/gleam/bool.mjs";
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../gleam_stdlib/gleam/io.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $ieee_float from "../../ieee_float/ieee_float.mjs";
import * as $data_element_tag from "../dcmfx_core/data_element_tag.mjs";
import { DataElementTag } from "../dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../dcmfx_core/data_element_value.mjs";
import * as $age_string from "../dcmfx_core/data_element_value/age_string.mjs";
import * as $date from "../dcmfx_core/data_element_value/date.mjs";
import * as $date_time from "../dcmfx_core/data_element_value/date_time.mjs";
import * as $person_name from "../dcmfx_core/data_element_value/person_name.mjs";
import * as $time from "../dcmfx_core/data_element_value/time.mjs";
import * as $data_error from "../dcmfx_core/data_error.mjs";
import * as $data_set_path from "../dcmfx_core/data_set_path.mjs";
import * as $data_set_print from "../dcmfx_core/data_set_print.mjs";
import * as $dictionary from "../dcmfx_core/dictionary.mjs";
import * as $utils from "../dcmfx_core/internal/utils.mjs";
import * as $transfer_syntax from "../dcmfx_core/transfer_syntax.mjs";
import * as $value_multiplicity from "../dcmfx_core/value_multiplicity.mjs";
import * as $value_representation from "../dcmfx_core/value_representation.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  CustomType as $CustomType,
  makeError,
  isEqual,
} from "../gleam.mjs";

const FILEPATH = "src/dcmfx_core/data_set.gleam";

export class LookupResultDataElementValue extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const DataSetLookupResult$LookupResultDataElementValue = ($0) =>
  new LookupResultDataElementValue($0);
export const DataSetLookupResult$isLookupResultDataElementValue = (value) =>
  value instanceof LookupResultDataElementValue;
export const DataSetLookupResult$LookupResultDataElementValue$0 = (value) =>
  value[0];

export class LookupResultDataSet extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const DataSetLookupResult$LookupResultDataSet = ($0) =>
  new LookupResultDataSet($0);
export const DataSetLookupResult$isLookupResultDataSet = (value) =>
  value instanceof LookupResultDataSet;
export const DataSetLookupResult$LookupResultDataSet$0 = (value) => value[0];

/**
 * Returns a new empty data set.
 */
export function new$() {
  return $dict.new$();
}

/**
 * Returns the number of data elements in a data set.
 */
export function size(data_set) {
  let _pipe = data_set;
  return $dict.size(_pipe);
}

/**
 * Returns whether a data set is empty and contains no data elements.
 */
export function is_empty(data_set) {
  let _pipe = data_set;
  return $dict.is_empty(_pipe);
}

/**
 * Returns whether a data element with the specified tag exists in a data set.
 */
export function has(data_set, tag) {
  let _pipe = data_set;
  return $dict.has_key(_pipe, tag);
}

/**
 * Inserts a data element tag and value into a data set. If there is already a
 * value for the tag then it is replaced with the new value.
 */
export function insert(data_set, tag, value) {
  return $dict.insert(data_set, tag, value);
}

/**
 * Inserts a new binary value into a data set. If there is already a value for
 * the tag it is replaced with the new value.
 */
export function insert_binary_value(data_set, tag, vr, bytes) {
  let _block;
  let _pipe = $data_element_value.new_binary(vr, bytes);
  _block = $result.map_error(
    _pipe,
    (e) => {
      return $data_error.with_path(e, $data_set_path.new_with_data_element(tag));
    },
  );
  let value = _block;
  return $result.map(value, (value) => { return insert(data_set, tag, value); });
}

/**
 * Merges two data sets together to form a new data set. Data elements from the
 * second data set take precedence.
 */
export function merge(a, b) {
  return $dict.merge(a, b);
}

/**
 * Creates a data set from a list of data element tags and values.
 */
export function from_list(data_elements) {
  let _pipe = data_elements;
  return $list.fold(
    _pipe,
    new$(),
    (data_set, element) => {
      let tag;
      let value;
      tag = element[0];
      value = element[1];
      return insert(data_set, tag, value);
    },
  );
}

/**
 * Creates a new data set with all the data elements in the given data set
 * except for the specified tag. Also returns the deleted data element value,
 * if any.
 */
export function delete$(data_set, tag) {
  let _block;
  let _pipe = $dict.get(data_set, tag);
  _block = $option.from_result(_pipe);
  let deleted_value = _block;
  let data_set$1 = $dict.delete$(data_set, tag);
  return [deleted_value, data_set$1];
}

/**
 * Returns the tags in a data set, sorted by group and element.
 */
export function tags(data_set) {
  let _pipe = data_set;
  let _pipe$1 = $dict.keys(_pipe);
  return $list.sort(
    _pipe$1,
    (a, b) => {
      let $ = $int.compare(a.group, b.group);
      if ($ instanceof $order.Eq) {
        return $int.compare(a.element, b.element);
      } else {
        return $;
      }
    },
  );
}

/**
 * Converts a data set to a list of data element tags and values.
 */
export function to_list(data_set) {
  let _pipe = data_set;
  let _pipe$1 = tags(_pipe);
  return $list.map(
    _pipe$1,
    (tag) => {
      let $ = $dict.get(data_set, tag);
      let value;
      if ($ instanceof Ok) {
        value = $[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_set",
          508,
          "to_list",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 15897,
            end: 15943,
            pattern_start: 15908,
            pattern_end: 15917
          }
        )
      }
      return [tag, value];
    },
  );
}

/**
 * Maps the tags and values in a data set to a new list, in order of increasing
 * tag value.
 */
export function map(data_set, callback) {
  let _pipe = data_set;
  let _pipe$1 = tags(_pipe);
  return $list.map(
    _pipe$1,
    (tag) => {
      let $ = $dict.get(data_set, tag);
      let value;
      if ($ instanceof Ok) {
        value = $[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_set",
          566,
          "map",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 17249,
            end: 17295,
            pattern_start: 17260,
            pattern_end: 17269
          }
        )
      }
      return callback(tag, value);
    },
  );
}

/**
 * Maps the values in a data set to a new data set.
 */
export function map_values(data_set, callback) {
  return $dict.map_values(data_set, callback);
}

/**
 * Creates a new data set containing only those data elements for which the
 * given function returns `True`.
 */
export function filter(data_set, predicate) {
  let _pipe = data_set;
  return $dict.filter(_pipe, predicate);
}

/**
 * Folds the tags and values in a data set, in order of increasing tag value,
 * into a single value.
 */
export function fold(data_set, initial, callback) {
  let _pipe = data_set;
  let _pipe$1 = tags(_pipe);
  return $list.fold(
    _pipe$1,
    initial,
    (current, tag) => {
      let $ = $dict.get(data_set, tag);
      let value;
      if ($ instanceof Ok) {
        value = $[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_set",
          603,
          "fold",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 18112,
            end: 18158,
            pattern_start: 18123,
            pattern_end: 18132
          }
        )
      }
      return callback(current, tag, value);
    },
  );
}

/**
 * Folds the tags and values in a data set, in order of increasing tag value,
 * into a single value. If the folding function returns `Ok(..)` then folding
 * continues, and if it returns `Error(..)` then folding stops and the error is
 * returned.
 */
export function try_fold(data_set, initial, callback) {
  let _pipe = data_set;
  let _pipe$1 = tags(_pipe);
  return $list.try_fold(
    _pipe$1,
    initial,
    (current, tag) => {
      let $ = $dict.get(data_set, tag);
      let value;
      if ($ instanceof Ok) {
        value = $[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_set",
          622,
          "try_fold",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 18672,
            end: 18718,
            pattern_start: 18683,
            pattern_end: 18692
          }
        )
      }
      return callback(current, tag, value);
    },
  );
}

/**
 * Folds the tags and values in a data set, in order of increasing tag value,
 * into a single value.
 *
 * This variant of `fold()` allows for folding to be ended early by returning
 * `Stop` from the callback.
 */
export function fold_until(data_set, initial, callback) {
  let _pipe = data_set;
  let _pipe$1 = tags(_pipe);
  return $list.fold_until(
    _pipe$1,
    initial,
    (current, tag) => {
      let $ = $dict.get(data_set, tag);
      let value;
      if ($ instanceof Ok) {
        value = $[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_set",
          642,
          "fold_until",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 19199,
            end: 19245,
            pattern_start: 19210,
            pattern_end: 19219
          }
        )
      }
      return callback(current, tag, value);
    },
  );
}

/**
 * Partitions a data set into a pair of data sets by a given categorization
 * function.
 */
export function partition(data_set, predicate) {
  let _pipe = data_set;
  return $dict.fold(
    _pipe,
    [new$(), new$()],
    (current, tag, value) => {
      let $ = predicate(tag);
      if ($) {
        return [insert(current[0], tag, value), current[1]];
      } else {
        return [current[0], insert(current[1], tag, value)];
      }
    },
  );
}

/**
 * Looks up a data set path in a data set and returns the data element or
 * data set that it specifies. If the path is invalid for the data set then
 * an error is returned.
 * 
 * @ignore
 */
function lookup(data_set, path) {
  let create_error = () => {
    return new Error(
      (() => {
        let _pipe = $data_error.new_tag_not_present();
        return $data_error.with_path(_pipe, path);
      })(),
    );
  };
  let _pipe = path;
  let _pipe$1 = $data_set_path.entries(_pipe);
  let _pipe$2 = $list.reverse(_pipe$1);
  return $list.try_fold(
    _pipe$2,
    new LookupResultDataSet(data_set),
    (lookup_result, entry) => {
      if (lookup_result instanceof LookupResultDataElementValue) {
        let value = lookup_result[0];
        if (entry instanceof $data_set_path.SequenceItem) {
          let index = entry.index;
          let $ = $data_element_value.sequence_items(value);
          if ($ instanceof Ok) {
            let items = $[0];
            let $1 = $utils.list_at(items, index);
            if ($1 instanceof Ok) {
              let data_set$1 = $1[0];
              return new Ok(new LookupResultDataSet(data_set$1));
            } else {
              return create_error();
            }
          } else {
            return create_error();
          }
        } else {
          return create_error();
        }
      } else {
        let data_set$1 = lookup_result[0];
        if (entry instanceof $data_set_path.DataElement) {
          let tag = entry.tag;
          let $ = $dict.get(data_set$1, tag);
          if ($ instanceof Ok) {
            let value = $[0];
            return new Ok(new LookupResultDataElementValue(value));
          } else {
            return create_error();
          }
        } else {
          return create_error();
        }
      }
    },
  );
}

/**
 * Returns the data element value for the specified tag in a data set.
 */
export function get_value(data_set, tag) {
  let _pipe = $dict.get(data_set, tag);
  return $result.map_error(
    _pipe,
    (_) => {
      let _pipe$1 = $data_error.new_tag_not_present();
      return $data_error.with_path(
        _pipe$1,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the data element value at the specified path in a data set. The
 * path must end with a data element tag.
 */
export function get_value_at_path(data_set, path) {
  let $ = lookup(data_set, path);
  if ($ instanceof Ok) {
    let $1 = $[0];
    if ($1 instanceof LookupResultDataElementValue) {
      let value = $1[0];
      return new Ok(value);
    } else {
      let _pipe = $data_error.new_tag_not_present();
      let _pipe$1 = $data_error.with_path(_pipe, path);
      return new Error(_pipe$1);
    }
  } else {
    let _pipe = $data_error.new_tag_not_present();
    let _pipe$1 = $data_error.with_path(_pipe, path);
    return new Error(_pipe$1);
  }
}

/**
 * Returns the data set at the specified path in a data set. The path must
 * be empty or end with a sequence item index.
 */
export function get_data_set_at_path(data_set, path) {
  let $ = lookup(data_set, path);
  if ($ instanceof Ok) {
    let $1 = $[0];
    if ($1 instanceof LookupResultDataSet) {
      let data_set$1 = $1[0];
      return new Ok(data_set$1);
    } else {
      let _pipe = $data_error.new_tag_not_present();
      let _pipe$1 = $data_error.with_path(_pipe, path);
      return new Error(_pipe$1);
    }
  } else {
    let _pipe = $data_error.new_tag_not_present();
    let _pipe$1 = $data_error.with_path(_pipe, path);
    return new Error(_pipe$1);
  }
}

/**
 * Returns the raw value bytes for the specified tag in a data set.
 *
 * See `data_element_value.bytes()`.
 */
export function get_value_bytes(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.bytes);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the raw value bytes for the specified tag in a data set and also
 * checks that its value representation is one of the specified allowed VRs.
 *
 * See `data_element_value.vr_bytes()`.
 */
export function get_value_vr_bytes(data_set, tag, allowed_vrs) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(
    _pipe$1,
    (_capture) => { return $data_element_value.vr_bytes(_capture, allowed_vrs); },
  );
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the singular string value for a data element in a data set. If the
 * data element with the specified tag does not hold exactly one string value
 * then an error is returned.
 */
export function get_string(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_string);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns a new data set containing the File Meta Information data elements
 * in this data set, i.e. those where the data element tag group equals 2.
 *
 * This function also sets the *'(0002,0002) Media Storage SOP Class UID'* and
 * *'(0002,0003) Media Storage SOP Instance UID'* data elements to match the
 * *'(0008,0016) SOP Class UID'* and *'(0008,0018) SOP Instance UID'* data
 * elements in this data set.
 */
export function file_meta_information(data_set) {
  let _block;
  let _pipe = data_set;
  _block = $dict.filter(_pipe, (tag, _) => { return tag.group === 2; });
  let file_meta_information$1 = _block;
  let _block$1;
  let $ = get_value(data_set, $dictionary.sop_class_uid.tag);
  let $1 = get_string(data_set, $dictionary.sop_class_uid.tag);
  if ($ instanceof Ok && $1 instanceof Ok) {
    let value = $[0];
    _block$1 = $dict.insert(
      file_meta_information$1,
      $dictionary.media_storage_sop_class_uid.tag,
      value,
    );
  } else {
    _block$1 = file_meta_information$1;
  }
  let file_meta_information$2 = _block$1;
  let _block$2;
  let $2 = get_value(data_set, $dictionary.sop_instance_uid.tag);
  let $3 = get_string(data_set, $dictionary.sop_instance_uid.tag);
  if ($2 instanceof Ok && $3 instanceof Ok) {
    let value = $2[0];
    _block$2 = $dict.insert(
      file_meta_information$2,
      $dictionary.media_storage_sop_instance_uid.tag,
      value,
    );
  } else {
    _block$2 = file_meta_information$2;
  }
  let file_meta_information$3 = _block$2;
  let _pipe$1 = file_meta_information$3;
  return $dict.filter(
    _pipe$1,
    (_, value) => { return $result.is_ok($data_element_value.bytes(value)); },
  );
}

/**
 * Returns all of the string values for a data element in a data set. If the
 * data element with the specified tag is not of a type that supports multiple
 * string values then an error is returned.
 */
export function get_strings(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_strings);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the singular integer value for a data element in a data set. If the
 * data element with the specified tag does not hold exactly one integer value
 * then an error is returned.
 */
export function get_int(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_int);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the singular integer value for a data element in a data set. If the
 * data element with the specified tag does not hold exactly one integer value
 * then an error is returned.
 *
 * If the data element is not in the data set then the specified default value
 * is returned.
 */
export function get_int_with_default(data_set, tag, default$) {
  let $ = has(data_set, tag);
  if ($) {
    return get_int(data_set, tag);
  } else {
    return new Ok(default$);
  }
}

/**
 * Returns all of the integer values for a data element in a data set. If the
 * data element with the specified tag is not of a type that supports multiple
 * integer values then an error is returned.
 */
export function get_ints(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_ints);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the lookup table descriptor value for a data element in a data set.
 * If the data element with the specified tab does not hold a lookup table
 * descriptor then an error is returned.
 */
export function get_lookup_table_descriptor(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(
    _pipe$1,
    $data_element_value.get_lookup_table_descriptor,
  );
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the singular big integer value for a data element in a data set. If
 * the data element with the specified tag does not hold exactly one big
 * integer value then an error is returned.
 */
export function get_big_int(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_big_int);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns all of the big integer values for a data element in a data set. If
 * the data element with the specified tag is not of a type that supports
 * multiple big integer values then an error is returned.
 */
export function get_big_ints(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_big_ints);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the singular floating point value for a data element in a data set.
 * If the data element with the specified tag does not hold exactly one
 * floating point value then an error is returned.
 */
export function get_float(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_float);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the singular floating point value for a data element in a data set.
 * If the data element with the specified tag does not hold exactly one
 * floating point value then an error is returned.
 *
 * If the data element is not in the data set then the specified default value
 * is returned.
 */
export function get_float_with_default(data_set, tag, default$) {
  let $ = has(data_set, tag);
  if ($) {
    return get_float(data_set, tag);
  } else {
    return new Ok($ieee_float.finite(default$));
  }
}

/**
 * Returns all of the floating point values for a data element in a data set.
 * If the data element with the specified tag is not of a type that supports
 * multiple floating point values then an error is returned.
 */
export function get_floats(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_floats);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the age value for a data element in a data set. If the data element
 * does not hold an `AgeString` value then an error is returned.
 */
export function get_age(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_age);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the attribute tags value for a data element in a data set. If the
 * data element does not hold an `AttributeTag` value then an error is
 * returned.
 */
export function get_attribute_tags(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_attribute_tags);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the date value for a data element in a data set. If the data element
 * does not hold a `Date` value then an error is returned.
 */
export function get_date(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_date);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the structured date/time value for a data element in a data set. If
 * the data element does not hold a `DateTime` value then an error is returned.
 */
export function get_date_time(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_date_time);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the time value for a data element in a data set. If the data element
 * does not hold a `Time` value then an error is returned.
 */
export function get_time(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_time);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the singular person name value for a data element in a data set.
 * If the data element with the specified tag does not hold exactly one
 * person name value then an error is returned.
 */
export function get_person_name(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_person_name);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns all of the person name values for a data element in a data set. If
 * the data element with the specified tag is not of a type that supports
 * multiple person name values then an error is returned.
 */
export function get_person_names(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.get_person_names);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Returns the sequence items for a data element in a data set. If the data
 * element with the specified tag is not a sequence then an error is
 * returned.
 */
export function get_sequence_items(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.try$(_pipe$1, $data_element_value.sequence_items);
  return $result.map_error(
    _pipe$2,
    (_capture) => {
      return $data_error.with_path(
        _capture,
        $data_set_path.new_with_data_element(tag),
      );
    },
  );
}

/**
 * Looks up the *'(0002,0010) Transfer Syntax UID'* data element in a data set,
 * and if present, attempts to convert it to a known transfer syntax
 * definition.
 */
export function get_transfer_syntax(data_set) {
  let transfer_syntax_uid = get_string(
    data_set,
    $dictionary.transfer_syntax_uid.tag,
  );
  return $result.try$(
    transfer_syntax_uid,
    (transfer_syntax_uid) => {
      let _pipe = $transfer_syntax.from_uid(transfer_syntax_uid);
      return $result.map_error(
        _pipe,
        (_) => {
          return $data_error.new_value_invalid(
            ("Unrecognized transfer syntax UID: '" + transfer_syntax_uid) + "'",
          );
        },
      );
    },
  );
}

/**
 * Returns the size in bytes of all data elements in a data set.
 *
 * See `data_element_value.total_byte_size()`.
 */
export function total_byte_size(data_set) {
  let _pipe = data_set;
  return $dict.fold(
    _pipe,
    0,
    (total, _, value) => {
      return total + $data_element_value.total_byte_size(value);
    },
  );
}

/**
 * Returns the value of the `(gggg,00xx) Private Creator` data element in this
 * data set for the specified private tag.
 */
export function private_creator_for_tag(data_set, tag) {
  return $bool.guard(
    !$data_element_tag.is_private(tag),
    new Error(undefined),
    () => {
      let private_creator_tag = new DataElementTag(
        tag.group,
        $int.bitwise_shift_right(tag.element, 8),
      );
      return $bool.guard(
        (private_creator_tag.element < 0x10) || (private_creator_tag.element > 0xFF),
        new Error(undefined),
        () => {
          let $ = get_string(data_set, private_creator_tag);
          if ($ instanceof Ok) {
            return $;
          } else {
            return new Error(undefined);
          }
        },
      );
    },
  );
}

/**
 * Returns the human-readable name for a data element tag in a data set,
 * using its data elements to determine the private creator if the tag is
 * private.
 */
export function tag_name(data_set, tag) {
  let _block;
  let _pipe = data_set;
  let _pipe$1 = private_creator_for_tag(_pipe, tag);
  _block = $option.from_result(_pipe$1);
  let private_creator = _block;
  return $dictionary.tag_name(tag, private_creator);
}

function do_to_lines(data_set, print_options, context, callback, indent) {
  let _pipe = data_set;
  let _pipe$1 = tags(_pipe);
  return $list.fold(
    _pipe$1,
    context,
    (context, tag) => {
      let $ = get_value(data_set, tag);
      let value;
      if ($ instanceof Ok) {
        value = $[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_set",
          702,
          "do_to_lines",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 20700,
            end: 20747,
            pattern_start: 20711,
            pattern_end: 20720
          }
        )
      }
      let $1 = $data_set_print.format_data_element_prefix(
        tag,
        tag_name(data_set, tag),
        new Some($data_element_value.value_representation(value)),
        (() => {
          let _pipe$2 = $data_element_value.bytes(value);
          let _pipe$3 = $result.map(_pipe$2, $bit_array.byte_size);
          return $option.from_result(_pipe$3);
        })(),
        indent,
        print_options,
      );
      let header;
      let header_width;
      header = $1[0];
      header_width = $1[1];
      let $2 = $data_element_value.sequence_items(value);
      let $3 = $data_element_value.encapsulated_pixel_data(value);
      if ($2 instanceof Ok) {
        let items = $2[0];
        let context$1 = callback(context, header);
        let _block;
        let _pipe$2 = items;
        _block = $list.fold(
          _pipe$2,
          context$1,
          (context, item) => {
            let context$1 = callback(
              context,
              $data_set_print.format_data_element_prefix(
                $dictionary.item.tag,
                $dictionary.item.name,
                new None(),
                new None(),
                indent + 1,
                print_options,
              )[0],
            );
            let context$2 = do_to_lines(
              item,
              print_options,
              context$1,
              callback,
              indent + 2,
            );
            return callback(
              context$2,
              $data_set_print.format_data_element_prefix(
                $dictionary.item_delimitation_item.tag,
                $dictionary.item_delimitation_item.name,
                new None(),
                new None(),
                indent + 1,
                print_options,
              )[0],
            );
          },
        );
        let context$2 = _block;
        return callback(
          context$2,
          $data_set_print.format_data_element_prefix(
            $dictionary.sequence_delimitation_item.tag,
            $dictionary.sequence_delimitation_item.name,
            new None(),
            new None(),
            indent,
            print_options,
          )[0],
        );
      } else if ($3 instanceof Ok) {
        let items = $3[0];
        let context$1 = callback(context, header);
        let _block;
        let _pipe$2 = items;
        _block = $list.fold(
          _pipe$2,
          context$1,
          (context, item) => {
            let $4 = $data_set_print.format_data_element_prefix(
              $dictionary.item.tag,
              $dictionary.item.name,
              new None(),
              new Some($bit_array.byte_size(item)),
              indent + 1,
              print_options,
            );
            let item_header;
            let item_header_width;
            item_header = $4[0];
            item_header_width = $4[1];
            let value_max_width = $int.max(
              print_options.max_width - item_header_width,
              10,
            );
            return callback(
              context,
              item_header + $utils.inspect_bit_array(
                item,
                (globalThis.Math.trunc(value_max_width / 3)) - 1,
              ),
            );
          },
        );
        let context$2 = _block;
        return callback(
          context$2,
          $data_set_print.format_data_element_prefix(
            $dictionary.sequence_delimitation_item.tag,
            $dictionary.sequence_delimitation_item.name,
            new None(),
            new None(),
            indent,
            print_options,
          )[0],
        );
      } else {
        let value_max_width = $int.max(
          print_options.max_width - header_width,
          10,
        );
        return callback(
          context,
          header + $data_element_value.to_string(value, tag, value_max_width),
        );
      }
    },
  );
}

/**
 * Converts a data set to a list of printable lines using the specified print
 * options. The lines are returned via a callback.
 */
export function to_lines(data_set, print_options, context, callback) {
  return do_to_lines(data_set, print_options, context, callback, 0);
}

/**
 * Prints a data set to stdout formatted for readability using the given print
 * options.
 */
export function print_with_options(data_set, print_options) {
  return to_lines(
    data_set,
    print_options,
    undefined,
    (_, s) => { return $io.println(s); },
  );
}

/**
 * Prints a data set to stdout formatted for readability.
 */
export function print(data_set) {
  return print_with_options(data_set, $data_set_print.new_print_options());
}

/**
 * Formats a data element tag in a data set as `"(GROUP,ELEMENT) TAG_NAME"`,
 * e.g. "(0008,0020) StudyDate"`. The other data elements in the data set
 * are used to determine the private creator if the tag is private.
 */
export function tag_with_name(data_set, tag) {
  let _block;
  let _pipe = data_set;
  let _pipe$1 = private_creator_for_tag(_pipe, tag);
  _block = $option.from_result(_pipe$1);
  let private_creator = _block;
  return $dictionary.tag_with_name(tag, private_creator);
}

/**
 * Removes all private range tags from a data set, including recursively
 * into any sequences that are present.
 */
export function delete_private_elements(data_set) {
  let _pipe = data_set;
  return fold(
    _pipe,
    new$(),
    (current, tag, value) => {
      return $bool.guard(
        $data_element_tag.is_private(tag),
        current,
        () => {
          let _block;
          let $ = $data_element_value.sequence_items(value);
          if ($ instanceof Ok) {
            let items = $[0];
            let _pipe$1 = items;
            let _pipe$2 = $list.map(_pipe$1, delete_private_elements);
            _block = $data_element_value.new_sequence(_pipe$2);
          } else {
            _block = value;
          }
          let value$1 = _block;
          return insert(current, tag, value$1);
        },
      );
    },
  );
}

/**
 * Returns a new data set containing just the private tags for the given group
 * and private creator name in a data set. The group number must always be odd
 * for private data elements, and the private creator name must match exactly.
 *
 * If the group number is even or there is no `(gggg,00XX) Private Creator`
 * data element with the specified name then an error is returned.
 */
export function private_block(data_set, group, private_creator) {
  return $bool.guard(
    $int.is_even(group),
    new Error("Private group number is even"),
    () => {
      let _block;
      let _pipe = $data_element_value.new_long_string(toList([private_creator]));
      _block = $result.replace_error(_pipe, "Private creator name is invalid");
      let private_creator_value = _block;
      return $result.try$(
        private_creator_value,
        (private_creator_value) => {
          let _block$1;
          let _pipe$1 = $list.range(0x10, 0xFF);
          let _pipe$2 = $list.find(
            _pipe$1,
            (element) => {
              return isEqual(
                $dict.get(data_set, new DataElementTag(group, element)),
                new Ok(private_creator_value)
              );
            },
          );
          _block$1 = $result.replace_error(
            _pipe$2,
            ("Private creator '" + private_creator) + "' not found",
          );
          let private_creator_element = _block$1;
          return $result.map(
            private_creator_element,
            (private_creator_element) => {
              let element_start = $int.bitwise_shift_left(
                private_creator_element,
                8,
              );
              let element_end = element_start + 0xFF;
              let _pipe$3 = data_set;
              return fold(
                _pipe$3,
                new$(),
                (current, tag, value) => {
                  let $ = ((tag.group === group) && (tag.element >= element_start)) && (tag.element <= element_end);
                  if ($) {
                    return insert(current, tag, value);
                  } else {
                    return current;
                  }
                },
              );
            },
          );
        },
      );
    },
  );
}

/**
 * Helper function that returns an error message when one of the
 * `insert_*_element` functions is called with invalid arguments.
 * 
 * @ignore
 */
function invalid_insert_error(item) {
  let $ = item.vrs;
  if ($ instanceof $Empty) {
    let vrs = $;
    return new Error(
      $data_error.new_value_invalid(
        (("Data element '" + item.name) + "' supports multiple VRs: ") + (() => {
          let _pipe = vrs;
          let _pipe$1 = $list.map(_pipe, $value_representation.to_string);
          return $string.join(_pipe$1, ", ");
        })(),
      ),
    );
  } else {
    let $1 = $.tail;
    if ($1 instanceof $Empty) {
      let vr = $.head;
      return new Error(
        $data_error.new_value_invalid(
          (((("Data element '" + item.name) + "' does not support the provided data, its VR is ") + $value_representation.to_string(
            vr,
          )) + " with multiplicity ") + $value_multiplicity.to_string(
            item.multiplicity,
          ),
        ),
      );
    } else {
      let vrs = $;
      return new Error(
        $data_error.new_value_invalid(
          (("Data element '" + item.name) + "' supports multiple VRs: ") + (() => {
            let _pipe = vrs;
            let _pipe$1 = $list.map(_pipe, $value_representation.to_string);
            return $string.join(_pipe$1, ", ");
          })(),
        ),
      );
    }
  }
}

/**
 * Inserts a data element with an age string value into a data set. The data
 * element being inserted must be referenced through its dictionary entry.
 */
export function insert_age_string(data_set, item, value) {
  return $bool.lazy_guard(
    !$value_multiplicity.contains(item.multiplicity, 1),
    () => { return invalid_insert_error(item); },
    () => {
      let _block;
      let _block$1;
      let $ = item.vrs;
      if ($ instanceof $Empty) {
        _block$1 = invalid_insert_error(item);
      } else {
        let $1 = $.tail;
        if ($1 instanceof $Empty) {
          let $2 = $.head;
          if ($2 instanceof $value_representation.AgeString) {
            _block$1 = $data_element_value.new_age_string(value);
          } else {
            _block$1 = invalid_insert_error(item);
          }
        } else {
          _block$1 = invalid_insert_error(item);
        }
      }
      let _pipe = _block$1;
      _block = $result.map_error(
        _pipe,
        (e) => {
          return $data_error.with_path(
            e,
            $data_set_path.new_with_data_element(item.tag),
          );
        },
      );
      let value$1 = _block;
      return $result.map(
        value$1,
        (value) => { return insert(data_set, item.tag, value); },
      );
    },
  );
}

/**
 * Inserts a data element with an attribute tag value into a data set. The data
 * element being inserted must be referenced through its dictionary entry.
 */
export function insert_attribute_tag_value(data_set, item, value) {
  return $bool.lazy_guard(
    !$value_multiplicity.contains(item.multiplicity, $list.length(value)),
    () => { return invalid_insert_error(item); },
    () => {
      let _block;
      let _block$1;
      let $ = item.vrs;
      if ($ instanceof $Empty) {
        _block$1 = invalid_insert_error(item);
      } else {
        let $1 = $.tail;
        if ($1 instanceof $Empty) {
          let $2 = $.head;
          if ($2 instanceof $value_representation.AttributeTag) {
            _block$1 = $data_element_value.new_attribute_tag(value);
          } else {
            _block$1 = invalid_insert_error(item);
          }
        } else {
          _block$1 = invalid_insert_error(item);
        }
      }
      let _pipe = _block$1;
      _block = $result.map_error(
        _pipe,
        (e) => {
          return $data_error.with_path(
            e,
            $data_set_path.new_with_data_element(item.tag),
          );
        },
      );
      let value$1 = _block;
      return $result.map(
        value$1,
        (value) => { return insert(data_set, item.tag, value); },
      );
    },
  );
}

/**
 * Inserts a data element with a date value into a data set. The data element
 * being inserted must be referenced through its dictionary entry.
 */
export function insert_date_value(data_set, item, value) {
  return $bool.lazy_guard(
    !$value_multiplicity.contains(item.multiplicity, 1),
    () => { return invalid_insert_error(item); },
    () => {
      let _block;
      let _block$1;
      let $ = item.vrs;
      if ($ instanceof $Empty) {
        _block$1 = invalid_insert_error(item);
      } else {
        let $1 = $.tail;
        if ($1 instanceof $Empty) {
          let $2 = $.head;
          if ($2 instanceof $value_representation.Date) {
            _block$1 = $data_element_value.new_date(value);
          } else {
            _block$1 = invalid_insert_error(item);
          }
        } else {
          _block$1 = invalid_insert_error(item);
        }
      }
      let _pipe = _block$1;
      _block = $result.map_error(
        _pipe,
        (e) => {
          return $data_error.with_path(
            e,
            $data_set_path.new_with_data_element(item.tag),
          );
        },
      );
      let value$1 = _block;
      return $result.map(
        value$1,
        (value) => { return insert(data_set, item.tag, value); },
      );
    },
  );
}

/**
 * Inserts a data element with a date time value into a data set. The data
 * element being inserted must be referenced through its dictionary entry.
 */
export function insert_date_time_value(data_set, item, value) {
  return $bool.lazy_guard(
    !$value_multiplicity.contains(item.multiplicity, 1),
    () => { return invalid_insert_error(item); },
    () => {
      let _block;
      let _block$1;
      let $ = item.vrs;
      if ($ instanceof $Empty) {
        _block$1 = invalid_insert_error(item);
      } else {
        let $1 = $.tail;
        if ($1 instanceof $Empty) {
          let $2 = $.head;
          if ($2 instanceof $value_representation.Date) {
            _block$1 = $data_element_value.new_date_time(value);
          } else {
            _block$1 = invalid_insert_error(item);
          }
        } else {
          _block$1 = invalid_insert_error(item);
        }
      }
      let _pipe = _block$1;
      _block = $result.map_error(
        _pipe,
        (e) => {
          return $data_error.with_path(
            e,
            $data_set_path.new_with_data_element(item.tag),
          );
        },
      );
      let value$1 = _block;
      return $result.map(
        value$1,
        (value) => { return insert(data_set, item.tag, value); },
      );
    },
  );
}

/**
 * Inserts a data element with float values into a data set. The data element
 * being inserted must be referenced through its dictionary entry. This method
 * automatically determines the correct VR to use for the new data element.
 */
export function insert_float_value(data_set, item, value) {
  return $bool.lazy_guard(
    !$value_multiplicity.contains(item.multiplicity, $list.length(value)),
    () => { return invalid_insert_error(item); },
    () => {
      let _block;
      let _block$1;
      let $ = item.vrs;
      if ($ instanceof $Empty) {
        _block$1 = invalid_insert_error(item);
      } else {
        let $1 = $.tail;
        if ($1 instanceof $Empty) {
          let $2 = $.head;
          if ($2 instanceof $value_representation.DecimalString) {
            let _pipe = value;
            let _pipe$1 = $list.map(_pipe, $ieee_float.to_finite);
            let _pipe$2 = $result.all(_pipe$1);
            let _pipe$3 = $result.replace_error(
              _pipe$2,
              $data_error.new_value_invalid(
                "DecimalString float value was not finite",
              ),
            );
            _block$1 = $result.try$(
              _pipe$3,
              $data_element_value.new_decimal_string,
            );
          } else if ($2 instanceof $value_representation.FloatingPointDouble) {
            _block$1 = $data_element_value.new_floating_point_double(value);
          } else if ($2 instanceof $value_representation.FloatingPointSingle) {
            _block$1 = $data_element_value.new_floating_point_single(value);
          } else if ($2 instanceof $value_representation.OtherDoubleString) {
            _block$1 = $data_element_value.new_other_double_string(value);
          } else if ($2 instanceof $value_representation.OtherFloatString) {
            _block$1 = $data_element_value.new_other_float_string(value);
          } else {
            _block$1 = invalid_insert_error(item);
          }
        } else {
          _block$1 = invalid_insert_error(item);
        }
      }
      let _pipe = _block$1;
      _block = $result.map_error(
        _pipe,
        (e) => {
          return $data_error.with_path(
            e,
            $data_set_path.new_with_data_element(item.tag),
          );
        },
      );
      let value$1 = _block;
      return $result.map(
        value$1,
        (value) => { return insert(data_set, item.tag, value); },
      );
    },
  );
}

/**
 * Inserts a data element with integer values into a data set. The data
 * element being inserted must be referenced through its dictionary entry. This
 * method automatically determines the correct VR to use for the new data
 * element.
 */
export function insert_int_value(data_set, item, value) {
  return $bool.lazy_guard(
    !$value_multiplicity.contains(item.multiplicity, $list.length(value)),
    () => { return invalid_insert_error(item); },
    () => {
      let _block;
      let _block$1;
      let $ = item.vrs;
      if ($ instanceof $Empty) {
        _block$1 = invalid_insert_error(item);
      } else {
        let $1 = $.tail;
        if ($1 instanceof $Empty) {
          let $2 = $.head;
          if ($2 instanceof $value_representation.IntegerString) {
            _block$1 = $data_element_value.new_integer_string(value);
          } else if ($2 instanceof $value_representation.SignedLong) {
            _block$1 = $data_element_value.new_signed_long(value);
          } else if ($2 instanceof $value_representation.SignedShort) {
            _block$1 = $data_element_value.new_signed_short(value);
          } else if ($2 instanceof $value_representation.UnsignedLong) {
            _block$1 = $data_element_value.new_unsigned_long(value);
          } else if ($2 instanceof $value_representation.UnsignedShort) {
            _block$1 = $data_element_value.new_unsigned_short(value);
          } else {
            _block$1 = invalid_insert_error(item);
          }
        } else {
          _block$1 = invalid_insert_error(item);
        }
      }
      let _pipe = _block$1;
      _block = $result.map_error(
        _pipe,
        (e) => {
          return $data_error.with_path(
            e,
            $data_set_path.new_with_data_element(item.tag),
          );
        },
      );
      let value$1 = _block;
      return $result.map(
        value$1,
        (value) => { return insert(data_set, item.tag, value); },
      );
    },
  );
}

/**
 * Inserts a data element with big integer values into a data set. The data
 * element being inserted must be referenced through its dictionary entry. This
 * method automatically determines the correct VR to use for the new data
 * element.
 */
export function insert_big_int_value(data_set, item, value) {
  return $bool.lazy_guard(
    !$value_multiplicity.contains(item.multiplicity, $list.length(value)),
    () => { return invalid_insert_error(item); },
    () => {
      let _block;
      let _block$1;
      let $ = item.vrs;
      if ($ instanceof $Empty) {
        _block$1 = invalid_insert_error(item);
      } else {
        let $1 = $.tail;
        if ($1 instanceof $Empty) {
          let $2 = $.head;
          if ($2 instanceof $value_representation.SignedVeryLong) {
            _block$1 = $data_element_value.new_signed_very_long(value);
          } else if ($2 instanceof $value_representation.UnsignedVeryLong) {
            _block$1 = $data_element_value.new_unsigned_very_long(value);
          } else {
            _block$1 = invalid_insert_error(item);
          }
        } else {
          _block$1 = invalid_insert_error(item);
        }
      }
      let _pipe = _block$1;
      _block = $result.map_error(
        _pipe,
        (e) => {
          return $data_error.with_path(
            e,
            $data_set_path.new_with_data_element(item.tag),
          );
        },
      );
      let value$1 = _block;
      return $result.map(
        value$1,
        (value) => { return insert(data_set, item.tag, value); },
      );
    },
  );
}

/**
 * Inserts a data element with a person name value into a data set. The data
 * element being inserted must be referenced through its dictionary entry.
 */
export function insert_person_name_value(data_set, item, value) {
  return $bool.lazy_guard(
    !$value_multiplicity.contains(item.multiplicity, $list.length(value)),
    () => { return invalid_insert_error(item); },
    () => {
      let _block;
      let _block$1;
      let $ = item.vrs;
      if ($ instanceof $Empty) {
        _block$1 = invalid_insert_error(item);
      } else {
        let $1 = $.tail;
        if ($1 instanceof $Empty) {
          let $2 = $.head;
          if ($2 instanceof $value_representation.PersonName) {
            _block$1 = $data_element_value.new_person_name(value);
          } else {
            _block$1 = invalid_insert_error(item);
          }
        } else {
          _block$1 = invalid_insert_error(item);
        }
      }
      let _pipe = _block$1;
      _block = $result.map_error(
        _pipe,
        (e) => {
          return $data_error.with_path(
            e,
            $data_set_path.new_with_data_element(item.tag),
          );
        },
      );
      let value$1 = _block;
      return $result.map(
        value$1,
        (value) => { return insert(data_set, item.tag, value); },
      );
    },
  );
}

/**
 * Inserts a data element with a sequence value into a data set. The data
 * element being inserted must be referenced through its dictionary entry.
 */
export function insert_sequence(data_set, item, value) {
  let _block;
  let _block$1;
  let $ = item.vrs;
  if ($ instanceof $Empty) {
    _block$1 = invalid_insert_error(item);
  } else {
    let $1 = $.tail;
    if ($1 instanceof $Empty) {
      let $2 = $.head;
      if ($2 instanceof $value_representation.Sequence) {
        _block$1 = new Ok($data_element_value.new_sequence(value));
      } else {
        _block$1 = invalid_insert_error(item);
      }
    } else {
      _block$1 = invalid_insert_error(item);
    }
  }
  let _pipe = _block$1;
  _block = $result.map_error(
    _pipe,
    (e) => {
      return $data_error.with_path(
        e,
        $data_set_path.new_with_data_element(item.tag),
      );
    },
  );
  let value$1 = _block;
  return $result.map(
    value$1,
    (value) => { return insert(data_set, item.tag, value); },
  );
}

/**
 * Inserts a data element with a string value into a data set. The data
 * element being inserted must be referenced through its dictionary entry. This
 * method automatically determines the correct VR to use for the new data
 * element.
 */
export function insert_string_value(data_set, item, value) {
  return $bool.lazy_guard(
    !$value_multiplicity.contains(item.multiplicity, $list.length(value)),
    () => { return invalid_insert_error(item); },
    () => {
      let _block;
      let _block$1;
      let $ = item.vrs;
      if ($ instanceof $Empty) {
        _block$1 = invalid_insert_error(item);
      } else {
        let $1 = $.tail;
        if ($1 instanceof $Empty) {
          if (value instanceof $Empty) {
            let $2 = $.head;
            if ($2 instanceof $value_representation.CodeString) {
              _block$1 = $data_element_value.new_code_string(value);
            } else if ($2 instanceof $value_representation.LongString) {
              _block$1 = $data_element_value.new_long_string(value);
            } else if ($2 instanceof $value_representation.ShortString) {
              _block$1 = $data_element_value.new_short_string(value);
            } else if ($2 instanceof $value_representation.UniqueIdentifier) {
              _block$1 = $data_element_value.new_unique_identifier(value);
            } else if ($2 instanceof $value_representation.UnlimitedCharacters) {
              _block$1 = $data_element_value.new_unlimited_characters(value);
            } else {
              _block$1 = invalid_insert_error(item);
            }
          } else {
            let $2 = value.tail;
            if ($2 instanceof $Empty) {
              let $3 = $.head;
              if ($3 instanceof $value_representation.ApplicationEntity) {
                let value$1 = value.head;
                _block$1 = $data_element_value.new_application_entity(value$1);
              } else if ($3 instanceof $value_representation.CodeString) {
                _block$1 = $data_element_value.new_code_string(value);
              } else if ($3 instanceof $value_representation.LongString) {
                _block$1 = $data_element_value.new_long_string(value);
              } else if ($3 instanceof $value_representation.LongText) {
                let value$1 = value.head;
                _block$1 = $data_element_value.new_long_text(value$1);
              } else if ($3 instanceof $value_representation.ShortString) {
                _block$1 = $data_element_value.new_short_string(value);
              } else if ($3 instanceof $value_representation.ShortText) {
                let value$1 = value.head;
                _block$1 = $data_element_value.new_short_text(value$1);
              } else if ($3 instanceof $value_representation.UniqueIdentifier) {
                _block$1 = $data_element_value.new_unique_identifier(value);
              } else if (
                $3 instanceof $value_representation.UniversalResourceIdentifier
              ) {
                let value$1 = value.head;
                _block$1 = $data_element_value.new_universal_resource_identifier(
                  value$1,
                );
              } else if ($3 instanceof $value_representation.UnlimitedCharacters) {
                _block$1 = $data_element_value.new_unlimited_characters(value);
              } else if ($3 instanceof $value_representation.UnlimitedText) {
                let value$1 = value.head;
                _block$1 = $data_element_value.new_unlimited_text(value$1);
              } else {
                _block$1 = invalid_insert_error(item);
              }
            } else {
              let $3 = $.head;
              if ($3 instanceof $value_representation.CodeString) {
                _block$1 = $data_element_value.new_code_string(value);
              } else if ($3 instanceof $value_representation.LongString) {
                _block$1 = $data_element_value.new_long_string(value);
              } else if ($3 instanceof $value_representation.ShortString) {
                _block$1 = $data_element_value.new_short_string(value);
              } else if ($3 instanceof $value_representation.UniqueIdentifier) {
                _block$1 = $data_element_value.new_unique_identifier(value);
              } else if ($3 instanceof $value_representation.UnlimitedCharacters) {
                _block$1 = $data_element_value.new_unlimited_characters(value);
              } else {
                _block$1 = invalid_insert_error(item);
              }
            }
          }
        } else {
          _block$1 = invalid_insert_error(item);
        }
      }
      let _pipe = _block$1;
      _block = $result.map_error(
        _pipe,
        (e) => {
          return $data_error.with_path(
            e,
            $data_set_path.new_with_data_element(item.tag),
          );
        },
      );
      let value$1 = _block;
      return $result.map(
        value$1,
        (value) => { return insert(data_set, item.tag, value); },
      );
    },
  );
}

/**
 * Inserts a data element with a time value into a data set. The data element
 * being inserted must be referenced through its dictionary entry.
 */
export function insert_time_value(data_set, item, value) {
  return $bool.lazy_guard(
    !$value_multiplicity.contains(item.multiplicity, 1),
    () => { return invalid_insert_error(item); },
    () => {
      let _block;
      let _block$1;
      let $ = item.vrs;
      if ($ instanceof $Empty) {
        _block$1 = invalid_insert_error(item);
      } else {
        let $1 = $.tail;
        if ($1 instanceof $Empty) {
          let $2 = $.head;
          if ($2 instanceof $value_representation.Time) {
            _block$1 = $data_element_value.new_time(value);
          } else {
            _block$1 = invalid_insert_error(item);
          }
        } else {
          _block$1 = invalid_insert_error(item);
        }
      }
      let _pipe = _block$1;
      _block = $result.map_error(
        _pipe,
        (e) => {
          return $data_error.with_path(
            e,
            $data_set_path.new_with_data_element(item.tag),
          );
        },
      );
      let value$1 = _block;
      return $result.map(
        value$1,
        (value) => { return insert(data_set, item.tag, value); },
      );
    },
  );
}

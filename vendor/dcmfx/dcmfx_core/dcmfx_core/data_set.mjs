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
  divideInt,
  isEqual,
} from "../gleam.mjs";

const FILEPATH = "src/dcmfx_core/data_set.gleam";

export class LookupResultDataElementValue extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}

export class LookupResultDataSet extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}

export function new$() {
  return $dict.new$();
}

export function size(data_set) {
  let _pipe = data_set;
  return $dict.size(_pipe);
}

export function is_empty(data_set) {
  let _pipe = data_set;
  return $dict.is_empty(_pipe);
}

export function has(data_set, tag) {
  let _pipe = data_set;
  return $dict.has_key(_pipe, tag);
}

export function insert(data_set, tag, value) {
  return $dict.insert(data_set, tag, value);
}

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

export function merge(a, b) {
  return $dict.merge(a, b);
}

export function from_list(data_elements) {
  let _pipe = data_elements;
  return $list.fold(
    _pipe,
    new$(),
    (data_set, element) => {
      let tag = element[0];
      let value = element[1];
      return insert(data_set, tag, value);
    },
  );
}

export function delete$(data_set, tag) {
  let _block;
  let _pipe = $dict.get(data_set, tag);
  _block = $option.from_result(_pipe);
  let deleted_value = _block;
  let data_set$1 = $dict.delete$(data_set, tag);
  return [deleted_value, data_set$1];
}

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
        let o = $;
        return o;
      }
    },
  );
}

export function to_list(data_set) {
  let _pipe = data_set;
  let _pipe$1 = tags(_pipe);
  return $list.map(
    _pipe$1,
    (tag) => {
      let $ = $dict.get(data_set, tag);
      if (!($ instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_set",
          508,
          "to_list",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 15898,
            end: 15944,
            pattern_start: 15909,
            pattern_end: 15918
          }
        )
      }
      let value = $[0];
      return [tag, value];
    },
  );
}

export function map(data_set, callback) {
  let _pipe = data_set;
  let _pipe$1 = tags(_pipe);
  return $list.map(
    _pipe$1,
    (tag) => {
      let $ = $dict.get(data_set, tag);
      if (!($ instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_set",
          566,
          "map",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 17250,
            end: 17296,
            pattern_start: 17261,
            pattern_end: 17270
          }
        )
      }
      let value = $[0];
      return callback(tag, value);
    },
  );
}

export function map_values(data_set, callback) {
  return $dict.map_values(data_set, callback);
}

export function filter(data_set, predicate) {
  let _pipe = data_set;
  return $dict.filter(_pipe, predicate);
}

export function fold(data_set, initial, callback) {
  let _pipe = data_set;
  let _pipe$1 = tags(_pipe);
  return $list.fold(
    _pipe$1,
    initial,
    (current, tag) => {
      let $ = $dict.get(data_set, tag);
      if (!($ instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_set",
          603,
          "fold",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 18113,
            end: 18159,
            pattern_start: 18124,
            pattern_end: 18133
          }
        )
      }
      let value = $[0];
      return callback(current, tag, value);
    },
  );
}

export function try_fold(data_set, initial, callback) {
  let _pipe = data_set;
  let _pipe$1 = tags(_pipe);
  return $list.try_fold(
    _pipe$1,
    initial,
    (current, tag) => {
      let $ = $dict.get(data_set, tag);
      if (!($ instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_set",
          622,
          "try_fold",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 18673,
            end: 18719,
            pattern_start: 18684,
            pattern_end: 18693
          }
        )
      }
      let value = $[0];
      return callback(current, tag, value);
    },
  );
}

export function fold_until(data_set, initial, callback) {
  let _pipe = data_set;
  let _pipe$1 = tags(_pipe);
  return $list.fold_until(
    _pipe$1,
    initial,
    (current, tag) => {
      let $ = $dict.get(data_set, tag);
      if (!($ instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_set",
          642,
          "fold_until",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 19200,
            end: 19246,
            pattern_start: 19211,
            pattern_end: 19220
          }
        )
      }
      let value = $[0];
      return callback(current, tag, value);
    },
  );
}

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

export function get_value_bytes(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.bytes);
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

export function get_value_vr_bytes(data_set, tag, allowed_vrs) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(
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

export function get_string(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_string);
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

export function file_meta_information(data_set) {
  let _block;
  let _pipe = data_set;
  _block = $dict.filter(_pipe, (tag, _) => { return tag.group === 2; });
  let file_meta_information$1 = _block;
  let _block$1;
  let $ = get_value(data_set, $dictionary.sop_class_uid.tag);
  let $1 = get_string(data_set, $dictionary.sop_class_uid.tag);
  if ($1 instanceof Ok) {
    if ($ instanceof Ok) {
      let value = $[0];
      _block$1 = $dict.insert(
        file_meta_information$1,
        $dictionary.media_storage_sop_class_uid.tag,
        value,
      );
    } else {
      _block$1 = file_meta_information$1;
    }
  } else {
    _block$1 = file_meta_information$1;
  }
  let file_meta_information$2 = _block$1;
  let _block$2;
  let $2 = get_value(data_set, $dictionary.sop_instance_uid.tag);
  let $3 = get_string(data_set, $dictionary.sop_instance_uid.tag);
  if ($3 instanceof Ok) {
    if ($2 instanceof Ok) {
      let value = $2[0];
      _block$2 = $dict.insert(
        file_meta_information$2,
        $dictionary.media_storage_sop_instance_uid.tag,
        value,
      );
    } else {
      _block$2 = file_meta_information$2;
    }
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

export function get_strings(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_strings);
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

export function get_int(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_int);
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

export function get_int_with_default(data_set, tag, default$) {
  let $ = has(data_set, tag);
  if ($) {
    return get_int(data_set, tag);
  } else {
    return new Ok(default$);
  }
}

export function get_ints(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_ints);
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

export function get_lookup_table_descriptor(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(
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

export function get_big_int(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_big_int);
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

export function get_big_ints(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_big_ints);
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

export function get_float(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_float);
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

export function get_float_with_default(data_set, tag, default$) {
  let $ = has(data_set, tag);
  if ($) {
    return get_float(data_set, tag);
  } else {
    return new Ok($ieee_float.finite(default$));
  }
}

export function get_floats(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_floats);
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

export function get_age(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_age);
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

export function get_attribute_tags(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_attribute_tags);
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

export function get_date(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_date);
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

export function get_date_time(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_date_time);
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

export function get_time(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_time);
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

export function get_person_name(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_person_name);
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

export function get_person_names(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.get_person_names);
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

export function get_sequence_items(data_set, tag) {
  let _pipe = data_set;
  let _pipe$1 = get_value(_pipe, tag);
  let _pipe$2 = $result.then$(_pipe$1, $data_element_value.sequence_items);
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
            let s = $[0];
            return new Ok(s);
          } else {
            return new Error(undefined);
          }
        },
      );
    },
  );
}

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
      if (!($ instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_core/data_set",
          702,
          "do_to_lines",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 20701,
            end: 20748,
            pattern_start: 20712,
            pattern_end: 20721
          }
        )
      }
      let value = $[0];
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
      let header = $1[0];
      let header_width = $1[1];
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
            let item_header = $4[0];
            let item_header_width = $4[1];
            let value_max_width = $int.max(
              print_options.max_width - item_header_width,
              10,
            );
            return callback(
              context,
              item_header + $utils.inspect_bit_array(
                item,
                (divideInt(value_max_width, 3)) - 1,
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

export function to_lines(data_set, print_options, context, callback) {
  return do_to_lines(data_set, print_options, context, callback, 0);
}

export function print_with_options(data_set, print_options) {
  return to_lines(
    data_set,
    print_options,
    undefined,
    (_, s) => { return $io.println(s); },
  );
}

export function print(data_set) {
  return print_with_options(data_set, $data_set_print.new_print_options());
}

export function tag_with_name(data_set, tag) {
  let _block;
  let _pipe = data_set;
  let _pipe$1 = private_creator_for_tag(_pipe, tag);
  _block = $option.from_result(_pipe$1);
  let private_creator = _block;
  return $dictionary.tag_with_name(tag, private_creator);
}

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
            _block$1 = $result.then$(
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
          let $2 = $.head;
          if ($2 instanceof $value_representation.ApplicationEntity) {
            if (value instanceof $Empty) {
              _block$1 = invalid_insert_error(item);
            } else {
              let $3 = value.tail;
              if ($3 instanceof $Empty) {
                let value$1 = value.head;
                _block$1 = $data_element_value.new_application_entity(value$1);
              } else {
                _block$1 = invalid_insert_error(item);
              }
            }
          } else if ($2 instanceof $value_representation.CodeString) {
            _block$1 = $data_element_value.new_code_string(value);
          } else if ($2 instanceof $value_representation.LongString) {
            _block$1 = $data_element_value.new_long_string(value);
          } else if ($2 instanceof $value_representation.LongText) {
            if (value instanceof $Empty) {
              _block$1 = invalid_insert_error(item);
            } else {
              let $3 = value.tail;
              if ($3 instanceof $Empty) {
                let value$1 = value.head;
                _block$1 = $data_element_value.new_long_text(value$1);
              } else {
                _block$1 = invalid_insert_error(item);
              }
            }
          } else if ($2 instanceof $value_representation.ShortString) {
            _block$1 = $data_element_value.new_short_string(value);
          } else if ($2 instanceof $value_representation.ShortText) {
            if (value instanceof $Empty) {
              _block$1 = invalid_insert_error(item);
            } else {
              let $3 = value.tail;
              if ($3 instanceof $Empty) {
                let value$1 = value.head;
                _block$1 = $data_element_value.new_short_text(value$1);
              } else {
                _block$1 = invalid_insert_error(item);
              }
            }
          } else if ($2 instanceof $value_representation.UniqueIdentifier) {
            _block$1 = $data_element_value.new_unique_identifier(value);
          } else if ($2 instanceof $value_representation.UniversalResourceIdentifier) {
            if (value instanceof $Empty) {
              _block$1 = invalid_insert_error(item);
            } else {
              let $3 = value.tail;
              if ($3 instanceof $Empty) {
                let value$1 = value.head;
                _block$1 = $data_element_value.new_universal_resource_identifier(
                  value$1,
                );
              } else {
                _block$1 = invalid_insert_error(item);
              }
            }
          } else if ($2 instanceof $value_representation.UnlimitedCharacters) {
            _block$1 = $data_element_value.new_unlimited_characters(value);
          } else if ($2 instanceof $value_representation.UnlimitedText) {
            if (value instanceof $Empty) {
              _block$1 = invalid_insert_error(item);
            } else {
              let $3 = value.tail;
              if ($3 instanceof $Empty) {
                let value$1 = value.head;
                _block$1 = $data_element_value.new_unlimited_text(value$1);
              } else {
                _block$1 = invalid_insert_error(item);
              }
            }
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

/// <reference types="./p10_insert_transform.d.mts" />
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $data_set from "../../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $p10_part from "../../dcmfx_p10/p10_part.mjs";
import * as $p10_filter_transform from "../../dcmfx_p10/transforms/p10_filter_transform.mjs";
import {
  Ok,
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
} from "../../gleam.mjs";

class P10InsertTransform extends $CustomType {
  constructor(data_elements_to_insert, filter_transform) {
    super();
    this.data_elements_to_insert = data_elements_to_insert;
    this.filter_transform = filter_transform;
  }
}

export function new$(data_elements_to_insert) {
  let tags_to_insert = $data_set.tags(data_elements_to_insert);
  let filter_transform = $p10_filter_transform.new$(
    (tag, _, location) => {
      return (!isEqual(location, toList([]))) || !$list.contains(
        tags_to_insert,
        tag,
      );
    },
    false,
  );
  return new P10InsertTransform(
    $data_set.to_list(data_elements_to_insert),
    filter_transform,
  );
}

function prepend_data_element_parts(data_element, acc) {
  let tag = data_element[0];
  let value = data_element[1];
  let $ = $p10_part.data_element_to_parts(
    tag,
    value,
    acc,
    (acc, part) => { return new Ok(listPrepend(part, acc)); },
  );
  if (!$.isOk()) {
    throw makeError(
      "let_assert",
      "dcmfx_p10/transforms/p10_insert_transform",
      133,
      "prepend_data_element_parts",
      "Pattern match failed, no pattern matched the value.",
      { value: $ }
    )
  }
  let parts = $[0];
  return parts;
}

function parts_to_insert_before_tag(tag, data_elements_to_insert, acc) {
  if (data_elements_to_insert.atLeastLength(1)) {
    let data_element = data_elements_to_insert.head;
    let rest = data_elements_to_insert.tail;
    let $ = $data_element_tag.to_int(data_element[0]) < $data_element_tag.to_int(
      tag,
    );
    if ($) {
      let _pipe = data_element;
      let _pipe$1 = prepend_data_element_parts(_pipe, acc);
      return ((_capture) => {
        return parts_to_insert_before_tag(tag, rest, _capture);
      })(_pipe$1);
    } else {
      return [acc, data_elements_to_insert];
    }
  } else {
    return [acc, data_elements_to_insert];
  }
}

export function add_part(context, part) {
  return $bool.guard(
    isEqual(context.data_elements_to_insert, toList([])),
    [toList([part]), context],
    () => {
      let is_at_root = $p10_filter_transform.is_at_root(
        context.filter_transform,
      );
      let $ = $p10_filter_transform.add_part(context.filter_transform, part);
      let filter_result = $[0];
      let filter_transform = $[1];
      let context$1 = (() => {
        let _record = context;
        return new P10InsertTransform(
          _record.data_elements_to_insert,
          filter_transform,
        );
      })();
      return $bool.guard(
        !filter_result,
        [toList([]), context$1],
        () => {
          return $bool.guard(
            !is_at_root,
            [toList([part]), context$1],
            () => {
              if (part instanceof $p10_part.SequenceStart) {
                let tag = part.tag;
                let $1 = parts_to_insert_before_tag(
                  tag,
                  context$1.data_elements_to_insert,
                  toList([]),
                );
                let parts_to_insert = $1[0];
                let data_elements_to_insert = $1[1];
                let context$2 = (() => {
                  let _record = context$1;
                  return new P10InsertTransform(
                    data_elements_to_insert,
                    _record.filter_transform,
                  );
                })();
                let parts = (() => {
                  let _pipe = listPrepend(part, parts_to_insert);
                  return $list.reverse(_pipe);
                })();
                return [parts, context$2];
              } else if (part instanceof $p10_part.DataElementHeader) {
                let tag = part.tag;
                let $1 = parts_to_insert_before_tag(
                  tag,
                  context$1.data_elements_to_insert,
                  toList([]),
                );
                let parts_to_insert = $1[0];
                let data_elements_to_insert = $1[1];
                let context$2 = (() => {
                  let _record = context$1;
                  return new P10InsertTransform(
                    data_elements_to_insert,
                    _record.filter_transform,
                  );
                })();
                let parts = (() => {
                  let _pipe = listPrepend(part, parts_to_insert);
                  return $list.reverse(_pipe);
                })();
                return [parts, context$2];
              } else if (part instanceof $p10_part.End) {
                let parts = (() => {
                  let _pipe = context$1.data_elements_to_insert;
                  return $list.fold(
                    _pipe,
                    toList([]),
                    (acc, data_element) => {
                      return prepend_data_element_parts(data_element, acc);
                    },
                  );
                })();
                let context$2 = (() => {
                  let _record = context$1;
                  return new P10InsertTransform(
                    toList([]),
                    _record.filter_transform,
                  );
                })();
                let parts$1 = (() => {
                  let _pipe = listPrepend(new $p10_part.End(), parts);
                  return $list.reverse(_pipe);
                })();
                return [parts$1, context$2];
              } else {
                return [toList([part]), context$1];
              }
            },
          );
        },
      );
    },
  );
}

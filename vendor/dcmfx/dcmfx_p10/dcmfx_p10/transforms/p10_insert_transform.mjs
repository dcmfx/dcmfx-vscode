/// <reference types="./p10_insert_transform.d.mts" />
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $data_set from "../../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $p10_token from "../../dcmfx_p10/p10_token.mjs";
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
  );
  return new P10InsertTransform(
    $data_set.to_list(data_elements_to_insert),
    filter_transform,
  );
}

function prepend_data_element_tokens(data_element, acc) {
  let tag = data_element[0];
  let value = data_element[1];
  let $ = $p10_token.data_element_to_tokens(
    tag,
    value,
    acc,
    (acc, token) => { return new Ok(listPrepend(token, acc)); },
  );
  if (!$.isOk()) {
    throw makeError(
      "let_assert",
      "dcmfx_p10/transforms/p10_insert_transform",
      130,
      "prepend_data_element_tokens",
      "Pattern match failed, no pattern matched the value.",
      { value: $ }
    )
  }
  let tokens = $[0];
  return tokens;
}

function tokens_to_insert_before_tag(tag, data_elements_to_insert, acc) {
  if (data_elements_to_insert.atLeastLength(1)) {
    let data_element = data_elements_to_insert.head;
    let rest = data_elements_to_insert.tail;
    let $ = $data_element_tag.to_int(data_element[0]) < $data_element_tag.to_int(
      tag,
    );
    if ($) {
      let _pipe = data_element;
      let _pipe$1 = prepend_data_element_tokens(_pipe, acc);
      return ((_capture) => {
        return tokens_to_insert_before_tag(tag, rest, _capture);
      })(_pipe$1);
    } else {
      return [acc, data_elements_to_insert];
    }
  } else {
    return [acc, data_elements_to_insert];
  }
}

export function add_token(context, token) {
  return $bool.guard(
    isEqual(context.data_elements_to_insert, toList([])),
    [toList([token]), context],
    () => {
      let is_at_root = $p10_filter_transform.is_at_root(
        context.filter_transform,
      );
      let $ = $p10_filter_transform.add_token(context.filter_transform, token);
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
            [toList([token]), context$1],
            () => {
              if (token instanceof $p10_token.SequenceStart) {
                let tag = token.tag;
                let $1 = tokens_to_insert_before_tag(
                  tag,
                  context$1.data_elements_to_insert,
                  toList([]),
                );
                let tokens_to_insert = $1[0];
                let data_elements_to_insert = $1[1];
                let context$2 = (() => {
                  let _record = context$1;
                  return new P10InsertTransform(
                    data_elements_to_insert,
                    _record.filter_transform,
                  );
                })();
                let tokens = (() => {
                  let _pipe = listPrepend(token, tokens_to_insert);
                  return $list.reverse(_pipe);
                })();
                return [tokens, context$2];
              } else if (token instanceof $p10_token.DataElementHeader) {
                let tag = token.tag;
                let $1 = tokens_to_insert_before_tag(
                  tag,
                  context$1.data_elements_to_insert,
                  toList([]),
                );
                let tokens_to_insert = $1[0];
                let data_elements_to_insert = $1[1];
                let context$2 = (() => {
                  let _record = context$1;
                  return new P10InsertTransform(
                    data_elements_to_insert,
                    _record.filter_transform,
                  );
                })();
                let tokens = (() => {
                  let _pipe = listPrepend(token, tokens_to_insert);
                  return $list.reverse(_pipe);
                })();
                return [tokens, context$2];
              } else if (token instanceof $p10_token.End) {
                let tokens = (() => {
                  let _pipe = context$1.data_elements_to_insert;
                  return $list.fold(
                    _pipe,
                    toList([]),
                    (acc, data_element) => {
                      return prepend_data_element_tokens(data_element, acc);
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
                let tokens$1 = (() => {
                  let _pipe = listPrepend(new $p10_token.End(), tokens);
                  return $list.reverse(_pipe);
                })();
                return [tokens$1, context$2];
              } else {
                return [toList([token]), context$1];
              }
            },
          );
        },
      );
    },
  );
}

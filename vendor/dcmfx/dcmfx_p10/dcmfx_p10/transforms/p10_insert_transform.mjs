/// <reference types="./p10_insert_transform.d.mts" />
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $data_set from "../../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $data_set_path from "../../../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $p10_error from "../../dcmfx_p10/p10_error.mjs";
import * as $p10_token from "../../dcmfx_p10/p10_token.mjs";
import * as $p10_filter_transform from "../../dcmfx_p10/transforms/p10_filter_transform.mjs";
import {
  Ok,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
} from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_p10/transforms/p10_insert_transform.gleam";

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
    (tag, _, _1, path) => {
      return !$data_set_path.is_root(path) || !$list.contains(
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

function prepend_data_element_tokens(data_element, path, acc) {
  let tag = data_element[0];
  let value = data_element[1];
  let $ = $p10_token.data_element_to_tokens(
    tag,
    value,
    path,
    acc,
    (acc, token) => { return new Ok(listPrepend(token, acc)); },
  );
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "dcmfx_p10/transforms/p10_insert_transform",
      181,
      "prepend_data_element_tokens",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5900,
        end: 6032,
        pattern_start: 5911,
        pattern_end: 5921
      }
    )
  }
  let tokens = $[0];
  return tokens;
}

export function flush(transform) {
  let _block;
  let _pipe = transform.data_elements_to_insert;
  _block = $list.fold(
    _pipe,
    toList([]),
    (acc, data_element) => {
      return prepend_data_element_tokens(
        data_element,
        $data_set_path.new_with_data_element(data_element[0]),
        acc,
      );
    },
  );
  let tokens = _block;
  return [
    tokens,
    (() => {
      let _record = transform;
      return new P10InsertTransform(toList([]), _record.filter_transform);
    })(),
  ];
}

function tokens_to_insert_before_tag(
  tag,
  path,
  data_elements_to_insert,
  token,
  acc
) {
  if (data_elements_to_insert instanceof $Empty) {
    return new Ok([acc, data_elements_to_insert]);
  } else {
    let data_element = data_elements_to_insert.head;
    let rest = data_elements_to_insert.tail;
    let $ = $data_element_tag.to_int(data_element[0]) < $data_element_tag.to_int(
      tag,
    );
    if ($) {
      let _block;
      let _pipe = path;
      let _pipe$1 = $data_set_path.pop(_pipe);
      let _pipe$2 = $result.try$(
        _pipe$1,
        (_capture) => {
          return $data_set_path.add_data_element(_capture, data_element[0]);
        },
      );
      _block = $result.map_error(
        _pipe$2,
        (_) => {
          return new $p10_error.TokenStreamInvalid(
            "Adding token to insert transform",
            "Failed altering path for data element to insert",
            token,
          );
        },
      );
      let path$1 = _block;
      return $result.try$(
        path$1,
        (path) => {
          let _pipe$3 = data_element;
          let _pipe$4 = prepend_data_element_tokens(_pipe$3, path, acc);
          return ((_capture) => {
            return tokens_to_insert_before_tag(tag, path, rest, token, _capture);
          })(_pipe$4);
        },
      );
    } else {
      return new Ok([acc, data_elements_to_insert]);
    }
  }
}

export function add_token(transform, token) {
  return $bool.guard(
    isEqual(transform.data_elements_to_insert, toList([])),
    new Ok([toList([token]), transform]),
    () => {
      let is_at_root = $p10_filter_transform.is_at_root(
        transform.filter_transform,
      );
      let add_token_result = $p10_filter_transform.add_token(
        transform.filter_transform,
        token,
      );
      return $result.try$(
        add_token_result,
        (_use0) => {
          let filter_result = _use0[0];
          let filter_transform = _use0[1];
          let _block;
          let _record = transform;
          _block = new P10InsertTransform(
            _record.data_elements_to_insert,
            filter_transform,
          );
          let transform$1 = _block;
          return $bool.guard(
            !filter_result,
            new Ok([toList([]), transform$1]),
            () => {
              return $bool.guard(
                !is_at_root,
                new Ok([toList([token]), transform$1]),
                () => {
                  if (token instanceof $p10_token.DataElementHeader) {
                    let tag = token.tag;
                    let path = token.path;
                    return $result.map(
                      tokens_to_insert_before_tag(
                        tag,
                        path,
                        transform$1.data_elements_to_insert,
                        token,
                        toList([]),
                      ),
                      (_use0) => {
                        let tokens_to_insert = _use0[0];
                        let data_elements_to_insert = _use0[1];
                        let _block$1;
                        let _record$1 = transform$1;
                        _block$1 = new P10InsertTransform(
                          data_elements_to_insert,
                          _record$1.filter_transform,
                        );
                        let transform$2 = _block$1;
                        let _block$2;
                        let _pipe = listPrepend(token, tokens_to_insert);
                        _block$2 = $list.reverse(_pipe);
                        let tokens = _block$2;
                        return [tokens, transform$2];
                      },
                    );
                  } else if (token instanceof $p10_token.SequenceStart) {
                    let tag = token.tag;
                    let path = token.path;
                    return $result.map(
                      tokens_to_insert_before_tag(
                        tag,
                        path,
                        transform$1.data_elements_to_insert,
                        token,
                        toList([]),
                      ),
                      (_use0) => {
                        let tokens_to_insert = _use0[0];
                        let data_elements_to_insert = _use0[1];
                        let _block$1;
                        let _record$1 = transform$1;
                        _block$1 = new P10InsertTransform(
                          data_elements_to_insert,
                          _record$1.filter_transform,
                        );
                        let transform$2 = _block$1;
                        let _block$2;
                        let _pipe = listPrepend(token, tokens_to_insert);
                        _block$2 = $list.reverse(_pipe);
                        let tokens = _block$2;
                        return [tokens, transform$2];
                      },
                    );
                  } else if (token instanceof $p10_token.End) {
                    let $ = flush(transform$1);
                    let tokens = $[0];
                    let transform$2 = $[1];
                    let _block$1;
                    let _pipe = listPrepend(new $p10_token.End(), tokens);
                    _block$1 = $list.reverse(_pipe);
                    let tokens$1 = _block$1;
                    return new Ok([tokens$1, transform$2]);
                  } else {
                    return new Ok([toList([token]), transform$1]);
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

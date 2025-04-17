/// <reference types="./p10_filter_transform.d.mts" />
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_set_path from "../../../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $p10_error from "../../dcmfx_p10/p10_error.mjs";
import * as $p10_token from "../../dcmfx_p10/p10_token.mjs";
import {
  Ok,
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
} from "../../gleam.mjs";

class P10FilterTransform extends $CustomType {
  constructor(predicate, path, path_filter_results) {
    super();
    this.predicate = predicate;
    this.path = path;
    this.path_filter_results = path_filter_results;
  }
}

export function new$(predicate) {
  return new P10FilterTransform(predicate, $data_set_path.new$(), toList([]));
}

export function is_at_root(context) {
  return $data_set_path.is_empty(context.path);
}

export function add_token(context, token) {
  let _block;
  let $ = context.path_filter_results;
  if ($.atLeastLength(1)) {
    let filter_result = $.head;
    _block = filter_result;
  } else {
    _block = true;
  }
  let current_filter_state = _block;
  let map_data_set_path_error = (details) => {
    return new $p10_error.TokenStreamInvalid(
      "Filtering P10 token stream",
      details,
      token,
    );
  };
  let run_predicate = (tag, vr, length) => {
    let _block$1;
    let $1 = context.path_filter_results;
    if ($1.hasLength(0)) {
      _block$1 = context.predicate(tag, vr, length, context.path);
    } else if ($1.atLeastLength(1) && $1.head) {
      _block$1 = context.predicate(tag, vr, length, context.path);
    } else {
      _block$1 = false;
    }
    let filter_result = _block$1;
    let _block$2;
    let _pipe = context.path;
    let _pipe$1 = $data_set_path.add_data_element(_pipe, tag);
    _block$2 = $result.map_error(_pipe$1, map_data_set_path_error);
    let path = _block$2;
    return $result.map(
      path,
      (path) => {
        let path_filter_results = listPrepend(
          filter_result,
          context.path_filter_results,
        );
        let _block$3;
        let _record = context;
        _block$3 = new P10FilterTransform(
          _record.predicate,
          path,
          path_filter_results,
        );
        let new_context = _block$3;
        return [filter_result, new_context];
      },
    );
  };
  if (token instanceof $p10_token.SequenceStart) {
    let tag = token.tag;
    let vr = token.vr;
    return run_predicate(tag, vr, new None());
  } else if (token instanceof $p10_token.DataElementHeader) {
    let tag = token.tag;
    let vr = token.vr;
    let length = token.length;
    return run_predicate(tag, vr, new Some(length));
  } else if (token instanceof $p10_token.SequenceItemStart) {
    let index = token.index;
    let _block$1;
    let _pipe = context.path;
    let _pipe$1 = $data_set_path.add_sequence_item(_pipe, index);
    _block$1 = $result.map_error(_pipe$1, map_data_set_path_error);
    let path = _block$1;
    return $result.map(
      path,
      (path) => {
        let _block$2;
        let _record = context;
        _block$2 = new P10FilterTransform(
          _record.predicate,
          path,
          _record.path_filter_results,
        );
        let new_context = _block$2;
        return [current_filter_state, new_context];
      },
    );
  } else if (token instanceof $p10_token.SequenceItemDelimiter) {
    let _block$1;
    let _pipe = context.path;
    let _pipe$1 = $data_set_path.pop(_pipe);
    _block$1 = $result.map_error(_pipe$1, map_data_set_path_error);
    let path = _block$1;
    return $result.map(
      path,
      (path) => {
        let _block$2;
        let _record = context;
        _block$2 = new P10FilterTransform(
          _record.predicate,
          path,
          _record.path_filter_results,
        );
        let new_context = _block$2;
        return [current_filter_state, new_context];
      },
    );
  } else if (token instanceof $p10_token.PixelDataItem) {
    let index = token.index;
    let _block$1;
    let _pipe = context.path;
    let _pipe$1 = $data_set_path.add_sequence_item(_pipe, index);
    _block$1 = $result.map_error(_pipe$1, map_data_set_path_error);
    let path = _block$1;
    return $result.map(
      path,
      (path) => {
        let path_filter_results = listPrepend(
          current_filter_state,
          context.path_filter_results,
        );
        let _block$2;
        let _record = context;
        _block$2 = new P10FilterTransform(
          _record.predicate,
          path,
          path_filter_results,
        );
        let new_context = _block$2;
        return [current_filter_state, new_context];
      },
    );
  } else if (token instanceof $p10_token.SequenceDelimiter) {
    let _block$1;
    let _pipe = context.path;
    let _pipe$1 = $data_set_path.pop(_pipe);
    _block$1 = $result.map_error(_pipe$1, map_data_set_path_error);
    let path = _block$1;
    return $result.map(
      path,
      (path) => {
        let $1 = $list.rest(context.path_filter_results);
        if (!$1.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_p10/transforms/p10_filter_transform",
            155,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: $1 }
          )
        }
        let path_filter_results = $1[0];
        let _block$2;
        let _record = context;
        _block$2 = new P10FilterTransform(
          _record.predicate,
          path,
          path_filter_results,
        );
        let new_context = _block$2;
        return [current_filter_state, new_context];
      },
    );
  } else if (token instanceof $p10_token.DataElementValueBytes &&
  token.bytes_remaining === 0) {
    let _block$1;
    let _pipe = context.path;
    let _pipe$1 = $data_set_path.pop(_pipe);
    _block$1 = $result.map_error(_pipe$1, map_data_set_path_error);
    let path = _block$1;
    return $result.map(
      path,
      (path) => {
        let $1 = $list.rest(context.path_filter_results);
        if (!$1.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_p10/transforms/p10_filter_transform",
            155,
            "",
            "Pattern match failed, no pattern matched the value.",
            { value: $1 }
          )
        }
        let path_filter_results = $1[0];
        let _block$2;
        let _record = context;
        _block$2 = new P10FilterTransform(
          _record.predicate,
          path,
          path_filter_results,
        );
        let new_context = _block$2;
        return [current_filter_state, new_context];
      },
    );
  } else {
    return new Ok([current_filter_state, context]);
  }
}

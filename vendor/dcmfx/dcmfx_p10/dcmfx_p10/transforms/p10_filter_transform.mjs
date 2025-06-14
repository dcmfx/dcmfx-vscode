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
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "../../gleam.mjs";

class P10FilterTransform extends $CustomType {
  constructor(predicate, path_filter_results) {
    super();
    this.predicate = predicate;
    this.path_filter_results = path_filter_results;
  }
}

export function new$(predicate) {
  return new P10FilterTransform(predicate, toList([]));
}

export function is_at_root(transform) {
  return $list.length(transform.path_filter_results) <= 1;
}

export function add_token(transform, token) {
  let _block;
  let $ = transform.path_filter_results;
  if ($ instanceof $Empty) {
    _block = true;
  } else {
    let filter_result = $.head;
    _block = filter_result;
  }
  let current_filter_state = _block;
  let run_predicate = (tag, vr, length, path) => {
    let _block$1;
    let $1 = transform.path_filter_results;
    if ($1 instanceof $Empty) {
      _block$1 = transform.predicate(tag, vr, length, path);
    } else {
      let $2 = $1.head;
      if ($2) {
        _block$1 = transform.predicate(tag, vr, length, path);
      } else {
        _block$1 = false;
      }
    }
    let filter_result = _block$1;
    let path_filter_results = listPrepend(
      filter_result,
      transform.path_filter_results,
    );
    let _block$2;
    let _record = transform;
    _block$2 = new P10FilterTransform(_record.predicate, path_filter_results);
    let new_transform = _block$2;
    return new Ok([filter_result, new_transform]);
  };
  if (token instanceof $p10_token.FilePreambleAndDICMPrefix) {
    return new Ok([true, transform]);
  } else if (token instanceof $p10_token.FileMetaInformation) {
    return new Ok([true, transform]);
  } else if (token instanceof $p10_token.DataElementHeader) {
    let tag = token.tag;
    let vr = token.vr;
    let length = token.length;
    let path = token.path;
    return run_predicate(tag, vr, new Some(length), path);
  } else if (token instanceof $p10_token.DataElementValueBytes) {
    let bytes_remaining = token.bytes_remaining;
    let _block$1;
    if (bytes_remaining === 0) {
      let _pipe = $list.rest(transform.path_filter_results);
      _block$1 = $result.map_error(
        _pipe,
        (_) => {
          return new $p10_error.TokenStreamInvalid(
            "Adding token to filter transform",
            "Data element bytes ended when current path is empty",
            token,
          );
        },
      );
    } else {
      _block$1 = new Ok(transform.path_filter_results);
    }
    let path_filter_results = _block$1;
    return $result.map(
      path_filter_results,
      (path_filter_results) => {
        let _block$2;
        let _record = transform;
        _block$2 = new P10FilterTransform(
          _record.predicate,
          path_filter_results,
        );
        let new_transform = _block$2;
        return [current_filter_state, new_transform];
      },
    );
  } else if (token instanceof $p10_token.SequenceStart) {
    let tag = token.tag;
    let vr = token.vr;
    let path = token.path;
    return run_predicate(tag, vr, new None(), path);
  } else if (token instanceof $p10_token.SequenceDelimiter) {
    let _block$1;
    let _pipe = $list.rest(transform.path_filter_results);
    _block$1 = $result.map_error(
      _pipe,
      (_) => {
        return new $p10_error.TokenStreamInvalid(
          "Adding token to filter transform",
          "Sequence delimiter received when current path is empty",
          token,
        );
      },
    );
    let path_filter_results = _block$1;
    return $result.map(
      path_filter_results,
      (path_filter_results) => {
        let _block$2;
        let _record = transform;
        _block$2 = new P10FilterTransform(
          _record.predicate,
          path_filter_results,
        );
        let new_transform = _block$2;
        return [current_filter_state, new_transform];
      },
    );
  } else if (token instanceof $p10_token.SequenceItemStart) {
    let path_filter_results = listPrepend(
      current_filter_state,
      transform.path_filter_results,
    );
    let _block$1;
    let _record = transform;
    _block$1 = new P10FilterTransform(_record.predicate, path_filter_results);
    let new_transform = _block$1;
    return new Ok([current_filter_state, new_transform]);
  } else if (token instanceof $p10_token.SequenceItemDelimiter) {
    let _block$1;
    let _pipe = $list.rest(transform.path_filter_results);
    _block$1 = $result.map_error(
      _pipe,
      (_) => {
        return new $p10_error.TokenStreamInvalid(
          "Adding token to filter transform",
          "Sequence item delimiter received when current path is empty",
          token,
        );
      },
    );
    let path_filter_results = _block$1;
    return $result.map(
      path_filter_results,
      (path_filter_results) => {
        let _block$2;
        let _record = transform;
        _block$2 = new P10FilterTransform(
          _record.predicate,
          path_filter_results,
        );
        let new_transform = _block$2;
        return [current_filter_state, new_transform];
      },
    );
  } else if (token instanceof $p10_token.PixelDataItem) {
    let path_filter_results = listPrepend(
      current_filter_state,
      transform.path_filter_results,
    );
    let _block$1;
    let _record = transform;
    _block$1 = new P10FilterTransform(_record.predicate, path_filter_results);
    let new_transform = _block$1;
    return new Ok([current_filter_state, new_transform]);
  } else {
    return new Ok([true, transform]);
  }
}

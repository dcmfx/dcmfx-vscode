/// <reference types="./p10_custom_type_transform.d.mts" />
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_error from "../../../dcmfx_core/dcmfx_core/data_error.mjs";
import * as $data_set from "../../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $order from "../../../gleam_stdlib/gleam/order.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $data_set_builder from "../../dcmfx_p10/data_set_builder.mjs";
import * as $p10_error from "../../dcmfx_p10/p10_error.mjs";
import * as $p10_token from "../../dcmfx_p10/p10_token.mjs";
import * as $p10_filter_transform from "../../dcmfx_p10/transforms/p10_filter_transform.mjs";
import { Ok, Error, CustomType as $CustomType, makeError, isEqual } from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_p10/transforms/p10_custom_type_transform.gleam";

class P10CustomTypeTransform extends $CustomType {
  constructor(filter, highest_tag, target_from_data_set, target) {
    super();
    this.filter = filter;
    this.highest_tag = highest_tag;
    this.target_from_data_set = target_from_data_set;
    this.target = target;
  }
}

/**
 * An error that occurred when adding a P10 token to the data set builder.
 * This can happen when the stream of DICOM P10 tokens is invalid.
 */
export class P10Error extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}

/**
 * An error that occurred when creating the custom type from the gathered
 * data set.
 */
export class DataError extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}

/**
 * Creates a new transform for converting a stream of DICOM P10 tokens to
 * a custom type. The data elements needed by the custom type must be
 * specified.
 */
export function new$(tags, target_from_data_set) {
  let filter = $p10_filter_transform.new$(
    (tag, _, _1, _2) => { return $list.contains(tags, tag); },
  );
  let _block;
  let _pipe = tags;
  let _pipe$1 = $list.max(_pipe, $data_element_tag.compare);
  _block = $result.unwrap(_pipe$1, $data_element_tag.zero);
  let highest_tag = _block;
  return new P10CustomTypeTransform(
    new Some([filter, $data_set_builder.new$()]),
    highest_tag,
    target_from_data_set,
    new None(),
  );
}

/**
 * Adds the next token in the DICOM P10 token stream.
 */
export function add_token(transform, token) {
  let $ = transform.filter;
  if ($ instanceof Some) {
    let filter = $[0][0];
    let builder = $[0][1];
    let is_at_root = $p10_filter_transform.is_at_root(filter);
    return $result.try$(
      (() => {
        let $1 = $p10_filter_transform.add_token(filter, token);
        if ($1 instanceof Ok) {
          let $2 = $1[0][0];
          if ($2) {
            let filter$1 = $1[0][1];
            let _block;
            let _pipe = builder;
            let _pipe$1 = $data_set_builder.add_token(_pipe, token);
            _block = $result.map_error(
              _pipe$1,
              (var0) => { return new P10Error(var0); },
            );
            let builder$1 = _block;
            return $result.map(
              builder$1,
              (builder) => { return [filter$1, builder]; },
            );
          } else {
            let filter$1 = $1[0][1];
            return new Ok([filter$1, builder]);
          }
        } else {
          let e = $1[0];
          return new Error(new P10Error(e));
        }
      })(),
      (_use0) => {
        let filter$1;
        let builder$1;
        filter$1 = _use0[0];
        builder$1 = _use0[1];
        let is_complete = is_at_root && (() => {
          if (token instanceof $p10_token.DataElementHeader) {
            let tag = token.tag;
            return isEqual(
              $data_element_tag.compare(tag, transform.highest_tag),
              new $order.Gt()
            );
          } else if (token instanceof $p10_token.DataElementValueBytes) {
            let $1 = token.bytes_remaining;
            if ($1 === 0) {
              let tag = token.tag;
              return isEqual(tag, transform.highest_tag);
            } else {
              return false;
            }
          } else if (token instanceof $p10_token.SequenceStart) {
            let tag = token.tag;
            return isEqual(
              $data_element_tag.compare(tag, transform.highest_tag),
              new $order.Gt()
            );
          } else if (token instanceof $p10_token.SequenceDelimiter) {
            let tag = token.tag;
            return isEqual(tag, transform.highest_tag);
          } else if (token instanceof $p10_token.End) {
            return true;
          } else {
            return false;
          }
        })();
        if (is_complete) {
          let _block;
          let _pipe = builder$1;
          let _pipe$1 = $data_set_builder.force_end(_pipe);
          _block = $data_set_builder.final_data_set(_pipe$1);
          let $1 = _block;
          let data_set;
          if ($1 instanceof Ok) {
            data_set = $1[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "dcmfx_p10/transforms/p10_custom_type_transform",
              119,
              "add_token",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $1,
                start: 3820,
                end: 3954,
                pattern_start: 3831,
                pattern_end: 3843
              }
            )
          }
          let _block$1;
          let _pipe$2 = transform.target_from_data_set(data_set);
          _block$1 = $result.map_error(
            _pipe$2,
            (var0) => { return new DataError(var0); },
          );
          let target = _block$1;
          return $result.try$(
            target,
            (target) => {
              let _pipe$3 = new P10CustomTypeTransform(
                new None(),
                transform.highest_tag,
                transform.target_from_data_set,
                new Some(target),
              );
              return new Ok(_pipe$3);
            },
          );
        } else {
          let _pipe = new P10CustomTypeTransform(
            new Some([filter$1, builder$1]),
            transform.highest_tag,
            transform.target_from_data_set,
            transform.target,
          );
          return new Ok(_pipe);
        }
      },
    );
  } else {
    return new Ok(transform);
  }
}

/**
 * Returns the custom type created by this transform. This is set once all the
 * required data elements have been gathered from the stream of DICOM P10
 * tokens and successfully constructed into the custom type.
 */
export function get_output(transform) {
  return transform.target;
}

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
import { Ok, CustomType as $CustomType, makeError, isEqual } from "../../gleam.mjs";

class P10CustomTypeTransform extends $CustomType {
  constructor(filter, last_tag, target_from_data_set, target) {
    super();
    this.filter = filter;
    this.last_tag = last_tag;
    this.target_from_data_set = target_from_data_set;
    this.target = target;
  }
}

export class P10Error extends $CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
}

export class DataError extends $CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
}

export function new$(tags, target_from_data_set) {
  let filter = $p10_filter_transform.new$(
    (tag, _, _1) => { return $list.contains(tags, tag); },
  );
  let last_tag = (() => {
    let _pipe = tags;
    let _pipe$1 = $list.max(_pipe, $data_element_tag.compare);
    return $result.unwrap(_pipe$1, $data_element_tag.zero);
  })();
  return new P10CustomTypeTransform(
    new Some([filter, $data_set_builder.new$()]),
    last_tag,
    target_from_data_set,
    new None(),
  );
}

export function add_token(transform, token) {
  let $ = transform.filter;
  if ($ instanceof Some) {
    let filter = $[0][0];
    let builder = $[0][1];
    let is_at_root = $p10_filter_transform.is_at_root(filter);
    return $result.try$(
      (() => {
        let $1 = $p10_filter_transform.add_token(filter, token);
        if ($1[0]) {
          let filter$1 = $1[1];
          let builder$1 = (() => {
            let _pipe = builder;
            let _pipe$1 = $data_set_builder.add_token(_pipe, token);
            return $result.map_error(
              _pipe$1,
              (var0) => { return new P10Error(var0); },
            );
          })();
          return $result.map(
            builder$1,
            (builder) => { return [filter$1, builder]; },
          );
        } else {
          let filter$1 = $1[1];
          return new Ok([filter$1, builder]);
        }
      })(),
      (_use0) => {
        let filter$1 = _use0[0];
        let builder$1 = _use0[1];
        let is_complete = is_at_root && (() => {
          if (token instanceof $p10_token.DataElementHeader) {
            let tag = token.tag;
            return isEqual(
              $data_element_tag.compare(tag, transform.last_tag),
              new $order.Gt()
            );
          } else if (token instanceof $p10_token.SequenceStart) {
            let tag = token.tag;
            return isEqual(
              $data_element_tag.compare(tag, transform.last_tag),
              new $order.Gt()
            );
          } else if (token instanceof $p10_token.DataElementValueBytes &&
          token.bytes_remaining === 0) {
            let tag = token.tag;
            return isEqual(tag, transform.last_tag);
          } else if (token instanceof $p10_token.SequenceDelimiter) {
            let tag = token.tag;
            return isEqual(tag, transform.last_tag);
          } else if (token instanceof $p10_token.End) {
            return true;
          } else {
            return false;
          }
        })();
        if (is_complete) {
          let $1 = (() => {
            let _pipe = builder$1;
            let _pipe$1 = $data_set_builder.force_end(_pipe);
            return $data_set_builder.final_data_set(_pipe$1);
          })();
          if (!$1.isOk()) {
            throw makeError(
              "let_assert",
              "dcmfx_p10/transforms/p10_custom_type_transform",
              115,
              "",
              "Pattern match failed, no pattern matched the value.",
              { value: $1 }
            )
          }
          let data_set = $1[0];
          let target = (() => {
            let _pipe = transform.target_from_data_set(data_set);
            return $result.map_error(
              _pipe,
              (var0) => { return new DataError(var0); },
            );
          })();
          return $result.try$(
            target,
            (target) => {
              let _pipe = (() => {
                let _record = transform;
                return new P10CustomTypeTransform(
                  new None(),
                  _record.last_tag,
                  _record.target_from_data_set,
                  new Some(target),
                );
              })();
              return new Ok(_pipe);
            },
          );
        } else {
          let _pipe = (() => {
            let _record = transform;
            return new P10CustomTypeTransform(
              new Some([filter$1, builder$1]),
              _record.last_tag,
              _record.target_from_data_set,
              _record.target,
            );
          })();
          return new Ok(_pipe);
        }
      },
    );
  } else {
    return new Ok(transform);
  }
}

export function get_output(transform) {
  return transform.target;
}

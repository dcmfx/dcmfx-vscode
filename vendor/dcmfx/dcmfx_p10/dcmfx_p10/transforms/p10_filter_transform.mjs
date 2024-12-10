/// <reference types="./p10_filter_transform.d.mts" />
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_set from "../../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $dictionary from "../../../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $data_set_builder from "../../dcmfx_p10/data_set_builder.mjs";
import * as $p10_error from "../../dcmfx_p10/p10_error.mjs";
import * as $p10_part from "../../dcmfx_p10/p10_part.mjs";
import {
  Ok,
  Error,
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
} from "../../gleam.mjs";

class P10FilterTransform extends $CustomType {
  constructor(predicate, location, data_set_builder) {
    super();
    this.predicate = predicate;
    this.location = location;
    this.data_set_builder = data_set_builder;
  }
}

export class LocationEntry extends $CustomType {
  constructor(tag, filter_result) {
    super();
    this.tag = tag;
    this.filter_result = filter_result;
  }
}

export function new$(predicate, create_data_set) {
  let data_set_builder = (() => {
    if (create_data_set) {
      return new Some(new Ok($data_set_builder.new$()));
    } else {
      return new None();
    }
  })();
  return new P10FilterTransform(predicate, toList([]), data_set_builder);
}

export function is_at_root(context) {
  return isEqual(context.location, toList([]));
}

export function data_set(context) {
  let $ = context.data_set_builder;
  if ($ instanceof Some && $[0].isOk()) {
    let builder = $[0][0];
    let $1 = (() => {
      let _pipe = builder;
      let _pipe$1 = $data_set_builder.force_end(_pipe);
      return $data_set_builder.final_data_set(_pipe$1);
    })();
    if (!$1.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_p10/transforms/p10_filter_transform",
        68,
        "data_set",
        "Pattern match failed, no pattern matched the value.",
        { value: $1 }
      )
    }
    let builder$1 = $1[0];
    return new Ok(builder$1);
  } else if ($ instanceof Some && !$[0].isOk()) {
    let e = $[0][0];
    return new Error(e);
  } else {
    return new Ok($data_set.new$());
  }
}

export function add_part(context, part) {
  let $ = (() => {
    if (part instanceof $p10_part.SequenceStart) {
      let tag = part.tag;
      let vr = part.vr;
      let filter_result = (() => {
        let $1 = context.location;
        if ($1.hasLength(0)) {
          return context.predicate(tag, vr, context.location);
        } else if ($1.atLeastLength(1) &&
        $1.head instanceof LocationEntry &&
        $1.head.filter_result) {
          return context.predicate(tag, vr, context.location);
        } else {
          return false;
        }
      })();
      let new_location = listPrepend(
        new LocationEntry(tag, filter_result),
        context.location,
      );
      let new_context = context.withFields({ location: new_location });
      return [filter_result, new_context];
    } else if (part instanceof $p10_part.DataElementHeader) {
      let tag = part.tag;
      let vr = part.vr;
      let filter_result = (() => {
        let $1 = context.location;
        if ($1.hasLength(0)) {
          return context.predicate(tag, vr, context.location);
        } else if ($1.atLeastLength(1) &&
        $1.head instanceof LocationEntry &&
        $1.head.filter_result) {
          return context.predicate(tag, vr, context.location);
        } else {
          return false;
        }
      })();
      let new_location = listPrepend(
        new LocationEntry(tag, filter_result),
        context.location,
      );
      let new_context = context.withFields({ location: new_location });
      return [filter_result, new_context];
    } else if (part instanceof $p10_part.PixelDataItem) {
      let filter_result = (() => {
        let $1 = context.location;
        if ($1.atLeastLength(1) && $1.head instanceof LocationEntry) {
          let filter_result = $1.head.filter_result;
          return filter_result;
        } else {
          return true;
        }
      })();
      let new_location = listPrepend(
        new LocationEntry($dictionary.item.tag, filter_result),
        context.location,
      );
      let new_context = context.withFields({ location: new_location });
      return [filter_result, new_context];
    } else if (part instanceof $p10_part.SequenceDelimiter) {
      let filter_result = (() => {
        let $1 = context.location;
        if ($1.atLeastLength(1) && $1.head instanceof LocationEntry) {
          let filter_result = $1.head.filter_result;
          return filter_result;
        } else {
          return true;
        }
      })();
      let $1 = $list.rest(context.location);
      if (!$1.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_p10/transforms/p10_filter_transform",
          134,
          "add_part",
          "Pattern match failed, no pattern matched the value.",
          { value: $1 }
        )
      }
      let new_location = $1[0];
      let new_context = context.withFields({ location: new_location });
      return [filter_result, new_context];
    } else if (part instanceof $p10_part.DataElementValueBytes &&
    part.bytes_remaining === 0) {
      let filter_result = (() => {
        let $1 = context.location;
        if ($1.atLeastLength(1) && $1.head instanceof LocationEntry) {
          let filter_result = $1.head.filter_result;
          return filter_result;
        } else {
          return true;
        }
      })();
      let $1 = $list.rest(context.location);
      if (!$1.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_p10/transforms/p10_filter_transform",
          134,
          "add_part",
          "Pattern match failed, no pattern matched the value.",
          { value: $1 }
        )
      }
      let new_location = $1[0];
      let new_context = context.withFields({ location: new_location });
      return [filter_result, new_context];
    } else {
      let $1 = context.location;
      if ($1.atLeastLength(1) &&
      $1.head instanceof LocationEntry &&
      !$1.head.filter_result) {
        return [false, context];
      } else {
        return [true, context];
      }
    }
  })();
  let filter_result = $[0];
  let context$1 = $[1];
  let data_set_builder = (() => {
    if (filter_result) {
      let $1 = context$1.data_set_builder;
      if ($1 instanceof Some && $1[0].isOk()) {
        let builder = $1[0][0];
        if (part instanceof $p10_part.FileMetaInformation) {
          return new Some(new Ok(builder));
        } else {
          return new Some($data_set_builder.add_part(builder, part));
        }
      } else {
        let a = $1;
        return a;
      }
    } else {
      return context$1.data_set_builder;
    }
  })();
  let context$2 = context$1.withFields({ data_set_builder: data_set_builder });
  return [context$2, filter_result];
}

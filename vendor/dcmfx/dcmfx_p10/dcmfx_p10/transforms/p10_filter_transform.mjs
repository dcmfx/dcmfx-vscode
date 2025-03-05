/// <reference types="./p10_filter_transform.d.mts" />
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $dictionary from "../../../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $p10_token from "../../dcmfx_p10/p10_token.mjs";
import {
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
} from "../../gleam.mjs";

class P10FilterTransform extends $CustomType {
  constructor(predicate, location) {
    super();
    this.predicate = predicate;
    this.location = location;
  }
}

export class LocationEntry extends $CustomType {
  constructor(tag, filter_result) {
    super();
    this.tag = tag;
    this.filter_result = filter_result;
  }
}

export function new$(predicate) {
  return new P10FilterTransform(predicate, toList([]));
}

export function is_at_root(context) {
  return isEqual(context.location, toList([]));
}

export function add_token(context, token) {
  if (token instanceof $p10_token.SequenceStart) {
    let tag = token.tag;
    let vr = token.vr;
    let filter_result = (() => {
      let $ = context.location;
      if ($.hasLength(0)) {
        return context.predicate(tag, vr, context.location);
      } else if ($.atLeastLength(1) &&
      $.head instanceof LocationEntry &&
      $.head.filter_result) {
        return context.predicate(tag, vr, context.location);
      } else {
        return false;
      }
    })();
    let new_location = listPrepend(
      new LocationEntry(tag, filter_result),
      context.location,
    );
    let new_context = (() => {
      let _record = context;
      return new P10FilterTransform(_record.predicate, new_location);
    })();
    return [filter_result, new_context];
  } else if (token instanceof $p10_token.DataElementHeader) {
    let tag = token.tag;
    let vr = token.vr;
    let filter_result = (() => {
      let $ = context.location;
      if ($.hasLength(0)) {
        return context.predicate(tag, vr, context.location);
      } else if ($.atLeastLength(1) &&
      $.head instanceof LocationEntry &&
      $.head.filter_result) {
        return context.predicate(tag, vr, context.location);
      } else {
        return false;
      }
    })();
    let new_location = listPrepend(
      new LocationEntry(tag, filter_result),
      context.location,
    );
    let new_context = (() => {
      let _record = context;
      return new P10FilterTransform(_record.predicate, new_location);
    })();
    return [filter_result, new_context];
  } else if (token instanceof $p10_token.PixelDataItem) {
    let filter_result = (() => {
      let $ = context.location;
      if ($.atLeastLength(1) && $.head instanceof LocationEntry) {
        let filter_result = $.head.filter_result;
        return filter_result;
      } else {
        return true;
      }
    })();
    let new_location = listPrepend(
      new LocationEntry($dictionary.item.tag, filter_result),
      context.location,
    );
    let new_context = (() => {
      let _record = context;
      return new P10FilterTransform(_record.predicate, new_location);
    })();
    return [filter_result, new_context];
  } else if (token instanceof $p10_token.SequenceDelimiter) {
    let filter_result = (() => {
      let $ = context.location;
      if ($.atLeastLength(1) && $.head instanceof LocationEntry) {
        let filter_result = $.head.filter_result;
        return filter_result;
      } else {
        return true;
      }
    })();
    let $ = $list.rest(context.location);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_p10/transforms/p10_filter_transform",
        93,
        "add_token",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let new_location = $[0];
    let new_context = (() => {
      let _record = context;
      return new P10FilterTransform(_record.predicate, new_location);
    })();
    return [filter_result, new_context];
  } else if (token instanceof $p10_token.DataElementValueBytes &&
  token.bytes_remaining === 0) {
    let filter_result = (() => {
      let $ = context.location;
      if ($.atLeastLength(1) && $.head instanceof LocationEntry) {
        let filter_result = $.head.filter_result;
        return filter_result;
      } else {
        return true;
      }
    })();
    let $ = $list.rest(context.location);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_p10/transforms/p10_filter_transform",
        93,
        "add_token",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let new_location = $[0];
    let new_context = (() => {
      let _record = context;
      return new P10FilterTransform(_record.predicate, new_location);
    })();
    return [filter_result, new_context];
  } else {
    let $ = context.location;
    if ($.atLeastLength(1) &&
    $.head instanceof LocationEntry &&
    !$.head.filter_result) {
      return [false, context];
    } else {
      return [true, context];
    }
  }
}

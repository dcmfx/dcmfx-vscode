/// <reference types="./p10_print_transform.d.mts" />
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import { DataElementTag } from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $data_set from "../../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $data_set_print from "../../../dcmfx_core/dcmfx_core/data_set_print.mjs";
import * as $dictionary from "../../../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $p10_token from "../../dcmfx_p10/p10_token.mjs";
import {
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
} from "../../gleam.mjs";

class P10PrintTransform extends $CustomType {
  constructor(print_options, indent, current_data_element, ignore_data_element_value_bytes, value_max_width, private_creators, last_data_element_private_creator_tag) {
    super();
    this.print_options = print_options;
    this.indent = indent;
    this.current_data_element = current_data_element;
    this.ignore_data_element_value_bytes = ignore_data_element_value_bytes;
    this.value_max_width = value_max_width;
    this.private_creators = private_creators;
    this.last_data_element_private_creator_tag = last_data_element_private_creator_tag;
  }
}

export function new$(print_options) {
  return new P10PrintTransform(
    print_options,
    0,
    new DataElementTag(0, 0),
    false,
    0,
    toList([$data_set.new$()]),
    new None(),
  );
}

export function add_token(context, token) {
  if (token instanceof $p10_token.FileMetaInformation) {
    let data_set = token.data_set;
    return [
      $data_set.to_lines(
        data_set,
        context.print_options,
        "",
        (s, line) => { return (s + line) + "\n"; },
      ),
      context,
    ];
  } else if (token instanceof $p10_token.DataElementHeader) {
    let tag = token.tag;
    let vr = token.vr;
    let length = token.length;
    let $ = $list.first(context.private_creators);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_p10/transforms/p10_print_transform",
        63,
        "add_token",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let private_creators = $[0];
    let $1 = $data_set_print.format_data_element_prefix(
      tag,
      $data_set.tag_name(private_creators, tag),
      new Some(vr),
      new Some(length),
      context.indent,
      context.print_options,
    );
    let s = $1[0];
    let width = $1[1];
    let value_max_width = $int.max(context.print_options.max_width - width, 10);
    let ignore_data_element_value_bytes = false;
    let last_data_element_private_creator_tag = (() => {
      let $2 = (isEqual(vr, new $value_representation.LongString())) && $data_element_tag.is_private_creator(
        tag,
      );
      if ($2) {
        return new Some(tag);
      } else {
        return new None();
      }
    })();
    let new_context = (() => {
      let _record = context;
      return new P10PrintTransform(
        _record.print_options,
        _record.indent,
        tag,
        ignore_data_element_value_bytes,
        value_max_width,
        _record.private_creators,
        last_data_element_private_creator_tag,
      );
    })();
    return [s, new_context];
  } else if (token instanceof $p10_token.DataElementValueBytes &&
  (!context.ignore_data_element_value_bytes)) {
    let vr = token.vr;
    let data = token.data;
    let value = $data_element_value.new_binary_unchecked(vr, data);
    let ignore_data_element_value_bytes = true;
    let private_creators = (() => {
      let $ = context.last_data_element_private_creator_tag;
      let $1 = context.private_creators;
      if ($ instanceof Some && $1.atLeastLength(1)) {
        let tag = $[0];
        let private_creators = $1.head;
        let rest = $1.tail;
        return listPrepend(
          $data_set.insert(
            private_creators,
            tag,
            $data_element_value.new_binary_unchecked(
              new $value_representation.LongString(),
              data,
            ),
          ),
          rest,
        );
      } else {
        return context.private_creators;
      }
    })();
    let s = $data_element_value.to_string(
      value,
      context.current_data_element,
      context.value_max_width,
    ) + "\n";
    let new_context = (() => {
      let _record = context;
      return new P10PrintTransform(
        _record.print_options,
        _record.indent,
        _record.current_data_element,
        ignore_data_element_value_bytes,
        _record.value_max_width,
        private_creators,
        _record.last_data_element_private_creator_tag,
      );
    })();
    return [s, new_context];
  } else if (token instanceof $p10_token.SequenceStart) {
    let tag = token.tag;
    let vr = token.vr;
    let $ = $list.first(context.private_creators);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_p10/transforms/p10_print_transform",
        152,
        "add_token",
        "Pattern match failed, no pattern matched the value.",
        { value: $ }
      )
    }
    let private_creators = $[0];
    let s = $data_set_print.format_data_element_prefix(
      tag,
      $data_set.tag_name(private_creators, tag),
      new Some(vr),
      new None(),
      context.indent,
      context.print_options,
    )[0];
    let new_context = (() => {
      let _record = context;
      return new P10PrintTransform(
        _record.print_options,
        context.indent + 1,
        _record.current_data_element,
        _record.ignore_data_element_value_bytes,
        _record.value_max_width,
        _record.private_creators,
        _record.last_data_element_private_creator_tag,
      );
    })();
    return [s + "\n", new_context];
  } else if (token instanceof $p10_token.SequenceDelimiter) {
    let s = $data_set_print.format_data_element_prefix(
      $dictionary.sequence_delimitation_item.tag,
      $dictionary.sequence_delimitation_item.name,
      new None(),
      new None(),
      context.indent - 1,
      context.print_options,
    )[0];
    let new_context = (() => {
      let _record = context;
      return new P10PrintTransform(
        _record.print_options,
        context.indent - 1,
        _record.current_data_element,
        _record.ignore_data_element_value_bytes,
        _record.value_max_width,
        _record.private_creators,
        _record.last_data_element_private_creator_tag,
      );
    })();
    return [s + "\n", new_context];
  } else if (token instanceof $p10_token.SequenceItemStart) {
    let s = $data_set_print.format_data_element_prefix(
      $dictionary.item.tag,
      $dictionary.item.name,
      new None(),
      new None(),
      context.indent,
      context.print_options,
    )[0];
    let new_context = (() => {
      let _record = context;
      return new P10PrintTransform(
        _record.print_options,
        context.indent + 1,
        _record.current_data_element,
        _record.ignore_data_element_value_bytes,
        _record.value_max_width,
        listPrepend($data_set.new$(), context.private_creators),
        _record.last_data_element_private_creator_tag,
      );
    })();
    return [s + "\n", new_context];
  } else if (token instanceof $p10_token.SequenceItemDelimiter) {
    let s = $data_set_print.format_data_element_prefix(
      $dictionary.item_delimitation_item.tag,
      $dictionary.item_delimitation_item.name,
      new None(),
      new None(),
      context.indent - 1,
      context.print_options,
    )[0];
    let new_context = (() => {
      let _record = context;
      return new P10PrintTransform(
        _record.print_options,
        context.indent - 1,
        _record.current_data_element,
        _record.ignore_data_element_value_bytes,
        _record.value_max_width,
        (() => {
          let _pipe = $list.rest(context.private_creators);
          return $result.unwrap(_pipe, context.private_creators);
        })(),
        _record.last_data_element_private_creator_tag,
      );
    })();
    return [s + "\n", new_context];
  } else if (token instanceof $p10_token.PixelDataItem) {
    let length = token.length;
    let $ = $data_set_print.format_data_element_prefix(
      $dictionary.item.tag,
      $dictionary.item.name,
      new None(),
      new Some(length),
      context.indent,
      context.print_options,
    );
    let s = $[0];
    let width = $[1];
    let value_max_width = $int.max(context.print_options.max_width - width, 10);
    let ignore_data_element_value_bytes = false;
    let new_context = (() => {
      let _record = context;
      return new P10PrintTransform(
        _record.print_options,
        _record.indent,
        _record.current_data_element,
        ignore_data_element_value_bytes,
        value_max_width,
        _record.private_creators,
        _record.last_data_element_private_creator_tag,
      );
    })();
    return [s, new_context];
  } else {
    return ["", context];
  }
}

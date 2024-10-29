/// <reference types="./p10_print_transform.d.mts" />
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import { DataElementTag } from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $data_set from "../../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $data_set_print from "../../../dcmfx_core/dcmfx_core/data_set_print.mjs";
import * as $registry from "../../../dcmfx_core/dcmfx_core/registry.mjs";
import * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $p10_part from "../../dcmfx_p10/p10_part.mjs";
import {
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
} from "../../gleam.mjs";

export class P10PrintTransform extends $CustomType {
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

export function add_part(context, part) {
  if (part instanceof $p10_part.FileMetaInformation) {
    let data_set = part.data_set;
    return [
      context,
      $data_set.to_lines(
        data_set,
        context.print_options,
        "",
        (s, line) => { return (s + line) + "\n"; },
      ),
    ];
  } else if (part instanceof $p10_part.DataElementHeader) {
    let tag = part.tag;
    let vr = part.vr;
    let length = part.length;
    let $ = $list.first(context.private_creators);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_p10/transforms/p10_print_transform",
        64,
        "add_part",
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
    let new_context = context.withFields({
      current_data_element: tag,
      value_max_width: value_max_width,
      ignore_data_element_value_bytes: ignore_data_element_value_bytes,
      last_data_element_private_creator_tag: last_data_element_private_creator_tag
    });
    return [new_context, s];
  } else if (part instanceof $p10_part.DataElementValueBytes &&
  (!context.ignore_data_element_value_bytes)) {
    let vr = part.vr;
    let data = part.data;
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
    let new_context = context.withFields({
      ignore_data_element_value_bytes: ignore_data_element_value_bytes,
      private_creators: private_creators
    });
    return [new_context, s];
  } else if (part instanceof $p10_part.SequenceStart) {
    let tag = part.tag;
    let vr = part.vr;
    let $ = $list.first(context.private_creators);
    if (!$.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_p10/transforms/p10_print_transform",
        153,
        "add_part",
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
    let new_context = context.withFields({ indent: context.indent + 1 });
    return [new_context, s + "\n"];
  } else if (part instanceof $p10_part.SequenceDelimiter) {
    let s = $data_set_print.format_data_element_prefix(
      $registry.sequence_delimitation_item.tag,
      $registry.sequence_delimitation_item.name,
      new None(),
      new None(),
      context.indent - 1,
      context.print_options,
    )[0];
    let new_context = context.withFields({ indent: context.indent - 1 });
    return [new_context, s + "\n"];
  } else if (part instanceof $p10_part.SequenceItemStart) {
    let s = $data_set_print.format_data_element_prefix(
      $registry.item.tag,
      $registry.item.name,
      new None(),
      new None(),
      context.indent,
      context.print_options,
    )[0];
    let new_context = context.withFields({
      indent: context.indent + 1,
      private_creators: listPrepend($data_set.new$(), context.private_creators)
    });
    return [new_context, s + "\n"];
  } else if (part instanceof $p10_part.SequenceItemDelimiter) {
    let s = $data_set_print.format_data_element_prefix(
      $registry.item_delimitation_item.tag,
      $registry.item_delimitation_item.name,
      new None(),
      new None(),
      context.indent - 1,
      context.print_options,
    )[0];
    let new_context = context.withFields({
      indent: context.indent - 1,
      private_creators: (() => {
        let _pipe = $list.rest(context.private_creators);
        return $result.unwrap(_pipe, context.private_creators);
      })()
    });
    return [new_context, s + "\n"];
  } else if (part instanceof $p10_part.PixelDataItem) {
    let length = part.length;
    let $ = $data_set_print.format_data_element_prefix(
      $registry.item.tag,
      $registry.item.name,
      new None(),
      new Some(length),
      context.indent,
      context.print_options,
    );
    let s = $[0];
    let width = $[1];
    let value_max_width = $int.max(context.print_options.max_width - width, 10);
    let ignore_data_element_value_bytes = false;
    let new_context = context.withFields({
      value_max_width: value_max_width,
      ignore_data_element_value_bytes: ignore_data_element_value_bytes
    });
    return [new_context, s];
  } else {
    return [context, ""];
  }
}

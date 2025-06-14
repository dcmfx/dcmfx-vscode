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
  Ok,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
} from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_p10/transforms/p10_print_transform.gleam";

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

export function add_token(transform, token) {
  if (token instanceof $p10_token.FileMetaInformation) {
    let data_set = token.data_set;
    return [
      $data_set.to_lines(
        data_set,
        transform.print_options,
        "",
        (s, line) => { return (s + line) + "\n"; },
      ),
      transform,
    ];
  } else if (token instanceof $p10_token.DataElementHeader) {
    let tag = token.tag;
    let vr = token.vr;
    let length = token.length;
    let $ = $list.first(transform.private_creators);
    if (!($ instanceof Ok)) {
      throw makeError(
        "let_assert",
        FILEPATH,
        "dcmfx_p10/transforms/p10_print_transform",
        63,
        "add_token",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $,
          start: 2074,
          end: 2146,
          pattern_start: 2085,
          pattern_end: 2105
        }
      )
    }
    let private_creators = $[0];
    let $1 = $data_set_print.format_data_element_prefix(
      tag,
      $data_set.tag_name(private_creators, tag),
      new Some(vr),
      new Some(length),
      transform.indent,
      transform.print_options,
    );
    let s = $1[0];
    let width = $1[1];
    let value_max_width = $int.max(
      transform.print_options.max_width - width,
      10,
    );
    let ignore_data_element_value_bytes = false;
    let _block;
    let $2 = (isEqual(vr, new $value_representation.LongString())) && $data_element_tag.is_private_creator(
      tag,
    );
    if ($2) {
      _block = new Some(tag);
    } else {
      _block = new None();
    }
    let last_data_element_private_creator_tag = _block;
    let _block$1;
    let _record = transform;
    _block$1 = new P10PrintTransform(
      _record.print_options,
      _record.indent,
      tag,
      ignore_data_element_value_bytes,
      value_max_width,
      _record.private_creators,
      last_data_element_private_creator_tag,
    );
    let new_transform = _block$1;
    return [s, new_transform];
  } else if (token instanceof $p10_token.DataElementValueBytes) {
    if (!transform.ignore_data_element_value_bytes) {
      let vr = token.vr;
      let data = token.data;
      let value = $data_element_value.new_binary_unchecked(vr, data);
      let ignore_data_element_value_bytes = true;
      let _block;
      let $ = transform.last_data_element_private_creator_tag;
      let $1 = transform.private_creators;
      if ($1 instanceof $Empty) {
        _block = transform.private_creators;
      } else if ($ instanceof Some) {
        let private_creators = $1.head;
        let rest = $1.tail;
        let tag = $[0];
        _block = listPrepend(
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
        _block = transform.private_creators;
      }
      let private_creators = _block;
      let s = $data_element_value.to_string(
        value,
        transform.current_data_element,
        transform.value_max_width,
      ) + "\n";
      let _block$1;
      let _record = transform;
      _block$1 = new P10PrintTransform(
        _record.print_options,
        _record.indent,
        _record.current_data_element,
        ignore_data_element_value_bytes,
        _record.value_max_width,
        private_creators,
        _record.last_data_element_private_creator_tag,
      );
      let new_transform = _block$1;
      return [s, new_transform];
    } else {
      return ["", transform];
    }
  } else if (token instanceof $p10_token.SequenceStart) {
    let tag = token.tag;
    let vr = token.vr;
    let $ = $list.first(transform.private_creators);
    if (!($ instanceof Ok)) {
      throw makeError(
        "let_assert",
        FILEPATH,
        "dcmfx_p10/transforms/p10_print_transform",
        153,
        "add_token",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $,
          start: 4622,
          end: 4694,
          pattern_start: 4633,
          pattern_end: 4653
        }
      )
    }
    let private_creators = $[0];
    let s = $data_set_print.format_data_element_prefix(
      tag,
      $data_set.tag_name(private_creators, tag),
      new Some(vr),
      new None(),
      transform.indent,
      transform.print_options,
    )[0];
    let _block;
    let _record = transform;
    _block = new P10PrintTransform(
      _record.print_options,
      transform.indent + 1,
      _record.current_data_element,
      _record.ignore_data_element_value_bytes,
      _record.value_max_width,
      _record.private_creators,
      _record.last_data_element_private_creator_tag,
    );
    let new_transform = _block;
    return [s + "\n", new_transform];
  } else if (token instanceof $p10_token.SequenceDelimiter) {
    let s = $data_set_print.format_data_element_prefix(
      $dictionary.sequence_delimitation_item.tag,
      $dictionary.sequence_delimitation_item.name,
      new None(),
      new None(),
      transform.indent - 1,
      transform.print_options,
    )[0];
    let _block;
    let _record = transform;
    _block = new P10PrintTransform(
      _record.print_options,
      transform.indent - 1,
      _record.current_data_element,
      _record.ignore_data_element_value_bytes,
      _record.value_max_width,
      _record.private_creators,
      _record.last_data_element_private_creator_tag,
    );
    let new_transform = _block;
    return [s + "\n", new_transform];
  } else if (token instanceof $p10_token.SequenceItemStart) {
    let s = $data_set_print.format_data_element_prefix(
      $dictionary.item.tag,
      $dictionary.item.name,
      new None(),
      new None(),
      transform.indent,
      transform.print_options,
    )[0];
    let _block;
    let _record = transform;
    _block = new P10PrintTransform(
      _record.print_options,
      transform.indent + 1,
      _record.current_data_element,
      _record.ignore_data_element_value_bytes,
      _record.value_max_width,
      listPrepend($data_set.new$(), transform.private_creators),
      _record.last_data_element_private_creator_tag,
    );
    let new_transform = _block;
    return [s + "\n", new_transform];
  } else if (token instanceof $p10_token.SequenceItemDelimiter) {
    let s = $data_set_print.format_data_element_prefix(
      $dictionary.item_delimitation_item.tag,
      $dictionary.item_delimitation_item.name,
      new None(),
      new None(),
      transform.indent - 1,
      transform.print_options,
    )[0];
    let _block;
    let _record = transform;
    _block = new P10PrintTransform(
      _record.print_options,
      transform.indent - 1,
      _record.current_data_element,
      _record.ignore_data_element_value_bytes,
      _record.value_max_width,
      (() => {
        let _pipe = $list.rest(transform.private_creators);
        return $result.unwrap(_pipe, transform.private_creators);
      })(),
      _record.last_data_element_private_creator_tag,
    );
    let new_transform = _block;
    return [s + "\n", new_transform];
  } else if (token instanceof $p10_token.PixelDataItem) {
    let length = token.length;
    let $ = $data_set_print.format_data_element_prefix(
      $dictionary.item.tag,
      $dictionary.item.name,
      new None(),
      new Some(length),
      transform.indent,
      transform.print_options,
    );
    let s = $[0];
    let width = $[1];
    let value_max_width = $int.max(
      transform.print_options.max_width - width,
      10,
    );
    let ignore_data_element_value_bytes = false;
    let _block;
    let _record = transform;
    _block = new P10PrintTransform(
      _record.print_options,
      _record.indent,
      _record.current_data_element,
      ignore_data_element_value_bytes,
      value_max_width,
      _record.private_creators,
      _record.last_data_element_private_creator_tag,
    );
    let new_transform = _block;
    return [s, new_transform];
  } else {
    return ["", transform];
  }
}

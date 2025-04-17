/// <reference types="./data_set_print.d.mts" />
import * as $envoy from "../../envoy/envoy.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $term_size from "../../term_size/term_size.mjs";
import * as $data_element_tag from "../dcmfx_core/data_element_tag.mjs";
import * as $utils from "../dcmfx_core/internal/utils.mjs";
import * as $value_representation from "../dcmfx_core/value_representation.mjs";
import { Ok, CustomType as $CustomType, isEqual } from "../gleam.mjs";

export class DataSetPrintOptions extends $CustomType {
  constructor(styled, max_width) {
    super();
    this.styled = styled;
    this.max_width = max_width;
  }
}

export function new_print_options() {
  let term = $envoy.get("TERM");
  let colorterm = $envoy.get("COLORTERM");
  let no_color = $envoy.get("NO_COLOR");
  let styled = ($result.is_ok(colorterm) || ($result.is_ok(term) && (!isEqual(
    term,
    new Ok("dumb")
  )))) && (!isEqual(no_color, new Ok("1")));
  let _block;
  let _pipe = $term_size.columns();
  _block = $result.unwrap(_pipe, 80);
  let max_width = _block;
  return new DataSetPrintOptions(styled, max_width);
}

function text_reset() {
  return "\u{001b}[0m";
}

function text_blue(s) {
  return "\u{001b}[34m" + s;
}

function text_cyan_and_reset(s) {
  return ("\u{001b}[36m" + s) + text_reset();
}

function text_reset_to_bold(s) {
  return (text_reset() + "\u{001b}[1m") + s;
}

function text_green(s) {
  return "\u{001b}[32m" + s;
}

export function format_data_element_prefix(
  tag,
  tag_name,
  vr,
  length,
  indent,
  print_options
) {
  let _block;
  let $ = print_options.styled;
  if ($) {
    let _pipe = tag;
    let _pipe$1 = $data_element_tag.to_string(_pipe);
    _block = text_blue(_pipe$1);
  } else {
    let _pipe = tag;
    _block = $data_element_tag.to_string(_pipe);
  }
  let tag$1 = _block;
  let tag_name_len = $utils.string_fast_length(tag_name);
  let _block$1;
  let $1 = print_options.styled;
  if ($1) {
    _block$1 = text_reset_to_bold(tag_name);
  } else {
    _block$1 = tag_name;
  }
  let tag_name$1 = _block$1;
  let _block$2;
  let $2 = print_options.styled;
  if ($2) {
    if (vr instanceof Some) {
      let vr$1 = vr[0];
      let _block$3;
      let $3 = print_options.styled;
      if ($3) {
        let _pipe = vr$1;
        let _pipe$1 = $value_representation.to_string(_pipe);
        _block$3 = text_green(_pipe$1);
      } else {
        let _pipe = vr$1;
        _block$3 = $value_representation.to_string(_pipe);
      }
      let vr$2 = _block$3;
      _block$2 = (((tag$1 + " ") + vr$2) + " ") + tag_name$1;
    } else {
      _block$2 = (tag$1 + " ") + tag_name$1;
    }
  } else {
    if (vr instanceof Some) {
      let vr$1 = vr[0];
      _block$2 = (((tag$1 + " ") + $value_representation.to_string(vr$1)) + " ") + tag_name$1;
    } else {
      _block$2 = (tag$1 + " ") + tag_name$1;
    }
  }
  let output = _block$2;
  let _block$3;
  if (vr instanceof Some) {
    _block$3 = 15;
  } else {
    _block$3 = 12;
  }
  let tag_and_vr_width = _block$3;
  let has_length = !isEqual(length, new None());
  let _block$4;
  if (length instanceof Some) {
    let length$1 = length[0];
    _block$4 = ("[" + (() => {
      let _pipe = length$1;
      let _pipe$1 = $int.to_string(_pipe);
      return $utils.pad_start(_pipe$1, 6, " ");
    })()) + " bytes] ";
  } else {
    _block$4 = "";
  }
  let length$1 = _block$4;
  let _block$5;
  let _pipe = length$1;
  _block$5 = $utils.string_fast_length(_pipe);
  let length_width = _block$5;
  let _block$6;
  let $3 = print_options.styled;
  if ($3) {
    _block$6 = text_cyan_and_reset(length$1);
  } else {
    _block$6 = length$1;
  }
  let length$2 = _block$6;
  let _block$7;
  if (has_length) {
    _block$7 = $int.max(50 - (tag_and_vr_width + tag_name_len), 0) + 2;
  } else {
    _block$7 = 0;
  }
  let padding = _block$7;
  let s = (($string.repeat(" ", indent * 2) + output) + $string.repeat(
    " ",
    padding,
  )) + length$2;
  let width = (((indent * 2 + tag_and_vr_width) + tag_name_len) + padding) + length_width;
  return [s, width];
}

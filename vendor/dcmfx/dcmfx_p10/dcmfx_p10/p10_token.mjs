/// <reference types="./p10_token.d.mts" />
import * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $data_set from "../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $dictionary from "../../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $value_representation from "../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $data_element_header from "../dcmfx_p10/internal/data_element_header.mjs";
import * as $value_length from "../dcmfx_p10/internal/value_length.mjs";
import { CustomType as $CustomType, makeError } from "../gleam.mjs";

export class FilePreambleAndDICMPrefix extends $CustomType {
  constructor(preamble) {
    super();
    this.preamble = preamble;
  }
}

export class FileMetaInformation extends $CustomType {
  constructor(data_set) {
    super();
    this.data_set = data_set;
  }
}

export class DataElementHeader extends $CustomType {
  constructor(tag, vr, length) {
    super();
    this.tag = tag;
    this.vr = vr;
    this.length = length;
  }
}

export class DataElementValueBytes extends $CustomType {
  constructor(tag, vr, data, bytes_remaining) {
    super();
    this.tag = tag;
    this.vr = vr;
    this.data = data;
    this.bytes_remaining = bytes_remaining;
  }
}

export class SequenceStart extends $CustomType {
  constructor(tag, vr) {
    super();
    this.tag = tag;
    this.vr = vr;
  }
}

export class SequenceDelimiter extends $CustomType {
  constructor(tag) {
    super();
    this.tag = tag;
  }
}

export class SequenceItemStart extends $CustomType {
  constructor(index) {
    super();
    this.index = index;
  }
}

export class SequenceItemDelimiter extends $CustomType {}

export class PixelDataItem extends $CustomType {
  constructor(index, length) {
    super();
    this.index = index;
    this.length = length;
  }
}

export class End extends $CustomType {}

export function to_string(token) {
  if (token instanceof FilePreambleAndDICMPrefix) {
    return "FilePreambleAndDICMPrefix";
  } else if (token instanceof FileMetaInformation) {
    let data_set = token.data_set;
    return "FileMetaInformation: " + (() => {
      let _pipe = $data_set.map(
        data_set,
        (tag, value) => {
          return ((() => {
            let _pipe = new $data_element_header.DataElementHeader(
              tag,
              new Some($data_element_value.value_representation(value)),
              $value_length.zero,
            );
            return $data_element_header.to_string(_pipe);
          })() + ": ") + $data_element_value.to_string(value, tag, 80);
        },
      );
      return $string.join(_pipe, ", ");
    })();
  } else if (token instanceof DataElementHeader) {
    let tag = token.tag;
    let vr = token.vr;
    let length = token.length;
    return ((((((("DataElementHeader: " + $data_element_tag.to_string(tag)) + ", name: ") + $dictionary.tag_name(
      tag,
      new None(),
    )) + ", vr: ") + $value_representation.to_string(vr)) + ", length: ") + $int.to_string(
      length,
    )) + " bytes";
  } else if (token instanceof DataElementValueBytes) {
    let data = token.data;
    let bytes_remaining = token.bytes_remaining;
    return ((("DataElementValueBytes: " + $int.to_string(
      $bit_array.byte_size(data),
    )) + " bytes of data, ") + $int.to_string(bytes_remaining)) + " bytes remaining";
  } else if (token instanceof SequenceStart) {
    let tag = token.tag;
    let vr = token.vr;
    return (((("SequenceStart: " + $data_element_tag.to_string(tag)) + ", name: ") + $dictionary.tag_name(
      tag,
      new None(),
    )) + ", vr: ") + $value_representation.to_string(vr);
  } else if (token instanceof SequenceDelimiter) {
    return "SequenceDelimiter";
  } else if (token instanceof SequenceItemStart) {
    let index = token.index;
    return "SequenceItemStart: item " + $int.to_string(index);
  } else if (token instanceof SequenceItemDelimiter) {
    return "SequenceItemDelimiter";
  } else if (token instanceof PixelDataItem) {
    let index = token.index;
    let length = token.length;
    return ((("PixelDataItem: item " + $int.to_string(index)) + ", ") + $int.to_string(
      length,
    )) + " bytes";
  } else {
    return "End";
  }
}

export function is_header_token(token) {
  if (token instanceof FilePreambleAndDICMPrefix) {
    return true;
  } else if (token instanceof FileMetaInformation) {
    return true;
  } else {
    return false;
  }
}

export function data_element_to_tokens(tag, value, context, token_callback) {
  let vr = $data_element_value.value_representation(value);
  let $ = $data_element_value.bytes(value);
  if ($.isOk()) {
    let bytes = $[0];
    let header_token = new DataElementHeader(
      tag,
      vr,
      $bit_array.byte_size(bytes),
    );
    return $result.try$(
      token_callback(context, header_token),
      (context) => {
        let _pipe = new DataElementValueBytes(tag, vr, bytes, 0);
        return ((_capture) => { return token_callback(context, _capture); })(
          _pipe,
        );
      },
    );
  } else {
    let $1 = $data_element_value.encapsulated_pixel_data(value);
    if ($1.isOk()) {
      let items = $1[0];
      let header_token = new SequenceStart(tag, vr);
      return $result.try$(
        token_callback(context, header_token),
        (context) => {
          let _block;
          let _pipe = items;
          let _pipe$1 = $list.try_fold(
            _pipe,
            [context, 0],
            (acc, item) => {
              let context$1 = acc[0];
              let index = acc[1];
              let length = $bit_array.byte_size(item);
              let item_header_token = new PixelDataItem(index, length);
              let context$2 = token_callback(context$1, item_header_token);
              return $result.try$(
                context$2,
                (context) => {
                  let value_bytes_token = new DataElementValueBytes(
                    $dictionary.item.tag,
                    vr,
                    item,
                    0,
                  );
                  return $result.map(
                    token_callback(context, value_bytes_token),
                    (context) => { return [context, index + 1]; },
                  );
                },
              );
            },
          );
          _block = $result.map(_pipe$1, (acc) => { return acc[0]; });
          let context$1 = _block;
          return $result.try$(
            context$1,
            (context) => {
              return token_callback(context, new SequenceDelimiter(tag));
            },
          );
        },
      );
    } else {
      let $2 = $data_element_value.sequence_items(value);
      if (!$2.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_p10/p10_token",
          226,
          "data_element_to_tokens",
          "Pattern match failed, no pattern matched the value.",
          { value: $2 }
        )
      }
      let items = $2[0];
      let header_token = new SequenceStart(tag, vr);
      return $result.try$(
        token_callback(context, header_token),
        (context) => {
          let _block;
          let _pipe = items;
          let _pipe$1 = $list.try_fold(
            _pipe,
            [context, 0],
            (acc, item) => {
              let context$1 = acc[0];
              let index = acc[1];
              let item_start_token = new SequenceItemStart(index);
              let context$2 = token_callback(context$1, item_start_token);
              return $result.try$(
                context$2,
                (context) => {
                  return $result.try$(
                    data_elements_to_tokens(item, context, token_callback),
                    (context) => {
                      let item_delimiter_token = new SequenceItemDelimiter();
                      return $result.map(
                        token_callback(context, item_delimiter_token),
                        (context) => { return [context, index + 1]; },
                      );
                    },
                  );
                },
              );
            },
          );
          _block = $result.map(_pipe$1, (acc) => { return acc[0]; });
          let context$1 = _block;
          return $result.try$(
            context$1,
            (context) => {
              return token_callback(context, new SequenceDelimiter(tag));
            },
          );
        },
      );
    }
  }
}

export function data_elements_to_tokens(data_set, context, token_callback) {
  let _pipe = data_set;
  return $data_set.try_fold(
    _pipe,
    context,
    (context, tag, value) => {
      return data_element_to_tokens(tag, value, context, token_callback);
    },
  );
}

/// <reference types="./p10_part.d.mts" />
import * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import { DataElementTag } from "../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $data_set from "../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $registry from "../../dcmfx_core/dcmfx_core/registry.mjs";
import * as $value_representation from "../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $data_element_header from "../dcmfx_p10/internal/data_element_header.mjs";
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
  constructor(vr, data, bytes_remaining) {
    super();
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

export class SequenceDelimiter extends $CustomType {}

export class SequenceItemStart extends $CustomType {}

export class SequenceItemDelimiter extends $CustomType {}

export class PixelDataItem extends $CustomType {
  constructor(length) {
    super();
    this.length = length;
  }
}

export class End extends $CustomType {}

export function to_string(part) {
  if (part instanceof FilePreambleAndDICMPrefix) {
    return "FilePreambleAndDICMPrefix";
  } else if (part instanceof FileMetaInformation) {
    let data_set = part.data_set;
    return "FileMetaInformation: " + (() => {
      let _pipe = $data_set.map(
        data_set,
        (tag, value) => {
          return ((() => {
            let _pipe = new $data_element_header.DataElementHeader(
              tag,
              new Some($data_element_value.value_representation(value)),
              0,
            );
            return $data_element_header.to_string(_pipe);
          })() + ": ") + $data_element_value.to_string(value, tag, 80);
        },
      );
      return $string.join(_pipe, ", ");
    })();
  } else if (part instanceof DataElementHeader) {
    let tag = part.tag;
    let vr = part.vr;
    let length = part.length;
    return ((((((("DataElementHeader: " + $data_element_tag.to_string(tag)) + ", name: ") + $registry.tag_name(
      tag,
      new None(),
    )) + ", vr: ") + $value_representation.to_string(vr)) + ", length: ") + $int.to_string(
      length,
    )) + " bytes";
  } else if (part instanceof DataElementValueBytes) {
    let data = part.data;
    let bytes_remaining = part.bytes_remaining;
    return ((("DataElementValueBytes: " + $int.to_string(
      $bit_array.byte_size(data),
    )) + " bytes of data, ") + $int.to_string(bytes_remaining)) + " bytes remaining";
  } else if (part instanceof SequenceStart) {
    let tag = part.tag;
    let vr = part.vr;
    return (((("SequenceStart: " + $data_element_tag.to_string(tag)) + ", name: ") + $registry.tag_name(
      tag,
      new None(),
    )) + ", vr: ") + $value_representation.to_string(vr);
  } else if (part instanceof SequenceDelimiter) {
    return "SequenceDelimiter";
  } else if (part instanceof SequenceItemStart) {
    return "SequenceItemStart";
  } else if (part instanceof SequenceItemDelimiter) {
    return "SequenceItemDelimiter";
  } else if (part instanceof PixelDataItem) {
    let length = part.length;
    return ("PixelDataItem: " + $int.to_string(length)) + " bytes";
  } else {
    return "End";
  }
}

export function data_element_to_parts(tag, value, context, part_callback) {
  let vr = $data_element_value.value_representation(value);
  let length = (() => {
    let _pipe = value;
    let _pipe$1 = $data_element_value.bytes(_pipe);
    let _pipe$2 = $result.map(_pipe$1, $bit_array.byte_size);
    return $result.unwrap(_pipe$2, 0xFFFFFFFF);
  })();
  let $ = $data_element_value.bytes(value);
  if ($.isOk()) {
    let bytes = $[0];
    let header_part = new DataElementHeader(tag, vr, length);
    return $result.try$(
      part_callback(context, header_part),
      (context) => {
        let _pipe = new DataElementValueBytes(vr, bytes, 0);
        return ((_capture) => { return part_callback(context, _capture); })(
          _pipe,
        );
      },
    );
  } else {
    let $1 = $data_element_value.encapsulated_pixel_data(value);
    if ($1.isOk()) {
      let items = $1[0];
      let header_part = new SequenceStart(tag, vr);
      return $result.try$(
        part_callback(context, header_part),
        (context) => {
          let context$1 = (() => {
            let _pipe = items;
            return $list.try_fold(
              _pipe,
              context,
              (context, item) => {
                let length$1 = $bit_array.byte_size(item);
                let item_header_part = new PixelDataItem(length$1);
                let context$1 = part_callback(context, item_header_part);
                return $result.try$(
                  context$1,
                  (context) => {
                    let value_bytes_part = new DataElementValueBytes(
                      vr,
                      item,
                      0,
                    );
                    return part_callback(context, value_bytes_part);
                  },
                );
              },
            );
          })();
          return $result.try$(
            context$1,
            (context) => {
              return part_callback(context, new SequenceDelimiter());
            },
          );
        },
      );
    } else {
      let $2 = $data_element_value.sequence_items(value);
      if (!$2.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_p10/p10_part",
          204,
          "data_element_to_parts",
          "Pattern match failed, no pattern matched the value.",
          { value: $2 }
        )
      }
      let items = $2[0];
      let header_part = new SequenceStart(tag, vr);
      return $result.try$(
        part_callback(context, header_part),
        (context) => {
          let context$1 = (() => {
            let _pipe = items;
            return $list.try_fold(
              _pipe,
              context,
              (context, item) => {
                let item_start_part = new SequenceItemStart();
                let context$1 = part_callback(context, item_start_part);
                return $result.try$(
                  context$1,
                  (context) => {
                    return $result.try$(
                      data_elements_to_parts(item, context, part_callback),
                      (context) => {
                        let item_delimiter_part = new SequenceItemDelimiter();
                        return part_callback(context, item_delimiter_part);
                      },
                    );
                  },
                );
              },
            );
          })();
          return $result.try$(
            context$1,
            (context) => {
              return part_callback(context, new SequenceDelimiter());
            },
          );
        },
      );
    }
  }
}

export function data_elements_to_parts(data_set, context, part_callback) {
  let _pipe = data_set;
  return $data_set.try_fold(
    _pipe,
    context,
    (context, tag, value) => {
      return data_element_to_parts(tag, value, context, part_callback);
    },
  );
}

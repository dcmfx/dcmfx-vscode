/// <reference types="./p10_token.d.mts" />
import * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $data_set from "../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.mjs";
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
import { Ok, CustomType as $CustomType, makeError } from "../gleam.mjs";

const FILEPATH = "src/dcmfx_p10/p10_token.gleam";

/**
 * The 128-byte File Preamble and the "DICM" prefix, which are present at the
 * start of DICOM P10 data. The content of the File Preamble's bytes are
 * application-defined, and in many cases are unused and set to zero.
 *
 * When reading DICOM P10 data that doesn't contain a File Preamble and
 * "DICM" prefix this token is emitted with all bytes set to zero.
 */
export class FilePreambleAndDICMPrefix extends $CustomType {
  constructor(preamble) {
    super();
    this.preamble = preamble;
  }
}
export const P10Token$FilePreambleAndDICMPrefix = (preamble) =>
  new FilePreambleAndDICMPrefix(preamble);
export const P10Token$isFilePreambleAndDICMPrefix = (value) =>
  value instanceof FilePreambleAndDICMPrefix;
export const P10Token$FilePreambleAndDICMPrefix$preamble = (value) =>
  value.preamble;
export const P10Token$FilePreambleAndDICMPrefix$0 = (value) => value.preamble;

/**
 * The File Meta Information dataset for the DICOM P10.
 *
 * When reading DICOM P10 data that doesn't contain File Meta Information
 * this token is emitted with an empty data set.
 */
export class FileMetaInformation extends $CustomType {
  constructor(data_set) {
    super();
    this.data_set = data_set;
  }
}
export const P10Token$FileMetaInformation = (data_set) =>
  new FileMetaInformation(data_set);
export const P10Token$isFileMetaInformation = (value) =>
  value instanceof FileMetaInformation;
export const P10Token$FileMetaInformation$data_set = (value) => value.data_set;
export const P10Token$FileMetaInformation$0 = (value) => value.data_set;

/**
 * The start of the next data element. This token will always be followed by
 * one or more `DataElementValueBytes` tokens containing the value bytes for
 * the data element.
 */
export class DataElementHeader extends $CustomType {
  constructor(tag, vr, length, path) {
    super();
    this.tag = tag;
    this.vr = vr;
    this.length = length;
    this.path = path;
  }
}
export const P10Token$DataElementHeader = (tag, vr, length, path) =>
  new DataElementHeader(tag, vr, length, path);
export const P10Token$isDataElementHeader = (value) =>
  value instanceof DataElementHeader;
export const P10Token$DataElementHeader$tag = (value) => value.tag;
export const P10Token$DataElementHeader$0 = (value) => value.tag;
export const P10Token$DataElementHeader$vr = (value) => value.vr;
export const P10Token$DataElementHeader$1 = (value) => value.vr;
export const P10Token$DataElementHeader$length = (value) => value.length;
export const P10Token$DataElementHeader$2 = (value) => value.length;
export const P10Token$DataElementHeader$path = (value) => value.path;
export const P10Token$DataElementHeader$3 = (value) => value.path;

/**
 * Raw data for the value of the current data element. Data element values
 * are split across multiple of these tokens when their length exceeds the
 * maximum token size.
 */
export class DataElementValueBytes extends $CustomType {
  constructor(tag, vr, data, bytes_remaining) {
    super();
    this.tag = tag;
    this.vr = vr;
    this.data = data;
    this.bytes_remaining = bytes_remaining;
  }
}
export const P10Token$DataElementValueBytes = (tag, vr, data, bytes_remaining) =>
  new DataElementValueBytes(tag, vr, data, bytes_remaining);
export const P10Token$isDataElementValueBytes = (value) =>
  value instanceof DataElementValueBytes;
export const P10Token$DataElementValueBytes$tag = (value) => value.tag;
export const P10Token$DataElementValueBytes$0 = (value) => value.tag;
export const P10Token$DataElementValueBytes$vr = (value) => value.vr;
export const P10Token$DataElementValueBytes$1 = (value) => value.vr;
export const P10Token$DataElementValueBytes$data = (value) => value.data;
export const P10Token$DataElementValueBytes$2 = (value) => value.data;
export const P10Token$DataElementValueBytes$bytes_remaining = (value) =>
  value.bytes_remaining;
export const P10Token$DataElementValueBytes$3 = (value) =>
  value.bytes_remaining;

/**
 * The start of a new sequence. If this is the start of a sequence of
 * encapsulated pixel data then the VR of that data, either `OtherByteString`
 * or `OtherWordString`, will be specified. If not, the VR will be
 * `Sequence`.
 */
export class SequenceStart extends $CustomType {
  constructor(tag, vr, path) {
    super();
    this.tag = tag;
    this.vr = vr;
    this.path = path;
  }
}
export const P10Token$SequenceStart = (tag, vr, path) =>
  new SequenceStart(tag, vr, path);
export const P10Token$isSequenceStart = (value) =>
  value instanceof SequenceStart;
export const P10Token$SequenceStart$tag = (value) => value.tag;
export const P10Token$SequenceStart$0 = (value) => value.tag;
export const P10Token$SequenceStart$vr = (value) => value.vr;
export const P10Token$SequenceStart$1 = (value) => value.vr;
export const P10Token$SequenceStart$path = (value) => value.path;
export const P10Token$SequenceStart$2 = (value) => value.path;

/**
 * The end of the current sequence.
 */
export class SequenceDelimiter extends $CustomType {
  constructor(tag) {
    super();
    this.tag = tag;
  }
}
export const P10Token$SequenceDelimiter = (tag) => new SequenceDelimiter(tag);
export const P10Token$isSequenceDelimiter = (value) =>
  value instanceof SequenceDelimiter;
export const P10Token$SequenceDelimiter$tag = (value) => value.tag;
export const P10Token$SequenceDelimiter$0 = (value) => value.tag;

/**
 * The start of a new item in the current sequence.
 */
export class SequenceItemStart extends $CustomType {
  constructor(index) {
    super();
    this.index = index;
  }
}
export const P10Token$SequenceItemStart = (index) =>
  new SequenceItemStart(index);
export const P10Token$isSequenceItemStart = (value) =>
  value instanceof SequenceItemStart;
export const P10Token$SequenceItemStart$index = (value) => value.index;
export const P10Token$SequenceItemStart$0 = (value) => value.index;

export class SequenceItemDelimiter extends $CustomType {}
export const P10Token$SequenceItemDelimiter = () => new SequenceItemDelimiter();
export const P10Token$isSequenceItemDelimiter = (value) =>
  value instanceof SequenceItemDelimiter;

/**
 * The start of a new item in the current encapsulated pixel data sequence.
 * The data for the item follows in one or more `DataElementValueBytes`
 * tokens.
 */
export class PixelDataItem extends $CustomType {
  constructor(index, length) {
    super();
    this.index = index;
    this.length = length;
  }
}
export const P10Token$PixelDataItem = (index, length) =>
  new PixelDataItem(index, length);
export const P10Token$isPixelDataItem = (value) =>
  value instanceof PixelDataItem;
export const P10Token$PixelDataItem$index = (value) => value.index;
export const P10Token$PixelDataItem$0 = (value) => value.index;
export const P10Token$PixelDataItem$length = (value) => value.length;
export const P10Token$PixelDataItem$1 = (value) => value.length;

export class End extends $CustomType {}
export const P10Token$End = () => new End();
export const P10Token$isEnd = (value) => value instanceof End;

/**
 * Converts a DICOM P10 token to a human-readable string.
 */
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

/**
 * Returns whether this DICOM P10 token is token of the file header or File
 * Meta Information prior to the main data set, i.e. is it a
 * `FilePreambleAndDICMPrefix` or `FileMetaInformation` token.
 */
export function is_header_token(token) {
  if (token instanceof FilePreambleAndDICMPrefix) {
    return true;
  } else if (token instanceof FileMetaInformation) {
    return true;
  } else {
    return false;
  }
}

/**
 * Converts a DICOM data element to DICOM P10 tokens. Each token is returned
 * via a callback.
 */
export function data_element_to_tokens(
  tag,
  value,
  path,
  context,
  token_callback
) {
  let vr = $data_element_value.value_representation(value);
  let $ = $data_element_value.bytes(value);
  if ($ instanceof Ok) {
    let bytes = $[0];
    let header_token = new DataElementHeader(
      tag,
      vr,
      $bit_array.byte_size(bytes),
      path,
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
    if ($1 instanceof Ok) {
      let items = $1[0];
      let header_token = new SequenceStart(tag, vr, path);
      return $result.try$(
        token_callback(context, header_token),
        (context) => {
          let _block;
          let _pipe = items;
          let _pipe$1 = $list.try_fold(
            _pipe,
            [context, 0],
            (acc, item) => {
              let context$1;
              let index;
              context$1 = acc[0];
              index = acc[1];
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
      let items;
      if ($2 instanceof Ok) {
        items = $2[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_p10/p10_token",
          237,
          "data_element_to_tokens",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $2,
            start: 7905,
            end: 7968,
            pattern_start: 7916,
            pattern_end: 7925
          }
        )
      }
      let header_token = new SequenceStart(tag, vr, path);
      return $result.try$(
        token_callback(context, header_token),
        (context) => {
          let _block;
          let _pipe = items;
          let _pipe$1 = $list.try_fold(
            _pipe,
            [context, 0],
            (acc, item) => {
              let context$1;
              let index;
              context$1 = acc[0];
              index = acc[1];
              let item_start_token = new SequenceItemStart(index);
              let context$2 = token_callback(context$1, item_start_token);
              return $result.try$(
                context$2,
                (context) => {
                  let $3 = $data_set_path.add_sequence_item(path, index);
                  let path$1;
                  if ($3 instanceof Ok) {
                    path$1 = $3[0];
                  } else {
                    throw makeError(
                      "let_assert",
                      FILEPATH,
                      "dcmfx_p10/p10_token",
                      251,
                      "data_element_to_tokens",
                      "Pattern match failed, no pattern matched the value.",
                      {
                        value: $3,
                        start: 8446,
                        end: 8512,
                        pattern_start: 8457,
                        pattern_end: 8465
                      }
                    )
                  }
                  return $result.try$(
                    data_elements_to_tokens(
                      item,
                      path$1,
                      context,
                      token_callback,
                    ),
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

/**
 * Converts all the data elements in a data set directly to DICOM P10 tokens.
 * Each token is returned via a callback.
 */
export function data_elements_to_tokens(data_set, path, context, token_callback) {
  let _pipe = data_set;
  return $data_set.try_fold(
    _pipe,
    context,
    (context, tag, value) => {
      let $ = $data_set_path.add_data_element(path, tag);
      let path$1;
      if ($ instanceof Ok) {
        path$1 = $[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_p10/p10_token",
          170,
          "data_elements_to_tokens",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 5586,
            end: 5649,
            pattern_start: 5597,
            pattern_end: 5605
          }
        )
      }
      return data_element_to_tokens(tag, value, path$1, context, token_callback);
    },
  );
}

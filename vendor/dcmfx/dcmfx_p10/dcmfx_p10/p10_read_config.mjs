/// <reference types="./p10_read_config.d.mts" />
import * as $transfer_syntax from "../../dcmfx_core/dcmfx_core/transfer_syntax.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import { CustomType as $CustomType } from "../gleam.mjs";

export class P10ReadConfig extends $CustomType {
  constructor(max_token_size, max_string_size, max_sequence_depth, require_dicm_prefix, require_ordered_data_elements, default_transfer_syntax) {
    super();
    this.max_token_size = max_token_size;
    this.max_string_size = max_string_size;
    this.max_sequence_depth = max_sequence_depth;
    this.require_dicm_prefix = require_dicm_prefix;
    this.require_ordered_data_elements = require_ordered_data_elements;
    this.default_transfer_syntax = default_transfer_syntax;
  }
}

/**
 * Returns the default read config.
 */
export function new$() {
  return new P10ReadConfig(
    0xFFFFFFFE,
    0xFFFFFFFE,
    10_000,
    false,
    true,
    $transfer_syntax.implicit_vr_little_endian,
  );
}

/**
 * The maximum size in bytes of a DICOM P10 token emitted by a read context.
 * This can be used to control memory usage during a streaming read, and must
 * be a multiple of 8.
 *
 * The maximum token size is relevant to two specific tokens:
 *
 * 1. `FileMetaInformation`, where it sets the maximum size in bytes of the
 *    File Meta Information, as specified by the File Meta Information Group
 *    Length value. If this size is exceeded an error will occur when reading
 *    the DICOM P10 data.
 *
 * 2. `DataElementValueBytes`, where it sets the maximum size in bytes of its
 *    `data` (with the exception of non-UTF-8 string data, see
 *    `max_string_size()` for further details). Data element values with a
 *    length exceeding this size will be split across multiple
 *    `DataElementValueBytes` tokens.
 *
 * By default there is no limit on the maximum token size, that is, each data
 * element will have its value bytes emitted in exactly one
 * `DataElementValueBytes` token.
 */
export function max_token_size(config, value) {
  return new P10ReadConfig(
    (globalThis.Math.trunc(value / 8)) * 8,
    config.max_string_size,
    config.max_sequence_depth,
    config.require_dicm_prefix,
    config.require_ordered_data_elements,
    config.default_transfer_syntax,
  );
}

/**
 * The maximum size in bytes of non-UTF-8 strings that can be read by a read
 * context. This can be used to control memory usage during a streaming read.
 *
 * The maximum string size is relevant to data elements containing string
 * values that are not encoded in UTF-8. Such string data is converted to UTF-8
 * by the read context, which requires that the whole string value be read into
 * memory.
 *
 * Specifically:
 *
 * 1. The maximum string size sets a hard upper limit on the size of a
 *    non-UTF-8 string value that can be read. Data element values containing
 *    non-UTF-8 string data larger that the maximum string size will result in
 *    an error. Because of this, the maximum size should not be set too low.
 *
 * 2. The maximum string size can be set larger than the maximum token size to
 *    allow more leniency in regard to the size of string data that can be
 *    parsed, while keeping token sizes smaller for other common cases such as
 *    image data.
 *
 * By default there is no limit on the maximum string size.
 */
export function max_string_size(config, value) {
  return new P10ReadConfig(
    config.max_token_size,
    $int.max(config.max_token_size, value),
    config.max_sequence_depth,
    config.require_dicm_prefix,
    config.require_ordered_data_elements,
    config.default_transfer_syntax,
  );
}

/**
 * ### `max_sequence_depth: Int`
 *
 * The maximum sequence depth that can be read by a read context. This can be
 * used to control memory usage during a streaming read, as well as to reject
 * malformed or malicious DICOM P10 data.
 *
 * By default the maximum sequence depth is set to ten thousand, i.e. no
 * meaningful maximum is enforced.
 */
export function max_sequence_depth(config, value) {
  return new P10ReadConfig(
    config.max_token_size,
    config.max_string_size,
    $int.max(0, value),
    config.require_dicm_prefix,
    config.require_ordered_data_elements,
    config.default_transfer_syntax,
  );
}

/**
 * Whether to require input data have 'DICM' at bytes 128-132. This is required
 * for well-formed DICOM P10 data, but it may be absent in some cases. If this
 * is set to `False` then such data will be readable.
 *
 * By default the 'DICM' prefix at bytes 128-132 is not required.
 */
export function require_dicm_prefix(config, value) {
  return new P10ReadConfig(
    config.max_token_size,
    config.max_string_size,
    config.max_sequence_depth,
    value,
    config.require_ordered_data_elements,
    config.default_transfer_syntax,
  );
}

/**
 * Whether to error if data elements are not in ascending order in the DICOM
 * P10 data. Such data is malformed but is still able to read, however doing so
 * can potentially lead to incorrect results. For example:
 *
 * 1. If the *'(0008,0005) Specific Character Set'* data element appears after
 *    data elements that use an encoded string VR, they will be decoded using
 *    the wrong character set.
 *
 * 2. If a '(gggg,00xx) Private Creator' data element appears after the data
 *    elements it defines the private creator for, those data elements will
 *    all be read with a VR of UN (when the transfer syntax is 'Implicit VR
 *    Little Endian').
 *
 * By default this requirement is enforced.
 */
export function require_ordered_data_elements(config, value) {
  return new P10ReadConfig(
    config.max_token_size,
    config.max_string_size,
    config.max_sequence_depth,
    config.require_dicm_prefix,
    value,
    config.default_transfer_syntax,
  );
}

/**
 * The transfer syntax to use when reading DICOM P10 data that doesn't
 * specify a transfer syntax in its File Meta Information, or doesn't have
 * any File Meta Information.
 *
 * By default this is 'Implicit VR Little Endian'.
 */
export function default_transfer_syntax(config, value) {
  return new P10ReadConfig(
    config.max_token_size,
    config.max_string_size,
    config.max_sequence_depth,
    config.require_dicm_prefix,
    config.require_ordered_data_elements,
    value,
  );
}

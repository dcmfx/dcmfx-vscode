/// <reference types="./p10_error.d.mts" />
import * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $file_stream_error from "../../file_streams/file_streams/file_stream_error.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../gleam_stdlib/gleam/io.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $p10_token from "../dcmfx_p10/p10_token.mjs";
import { toList, prepend as listPrepend, CustomType as $CustomType } from "../gleam.mjs";

/**
 * This error occurs when a DICOM P10 read or write context is supplied data
 * that specifies a DICOM transfer syntax that isn't supported.
 */
export class TransferSyntaxNotSupported extends $CustomType {
  constructor(transfer_syntax_uid) {
    super();
    this.transfer_syntax_uid = transfer_syntax_uid;
  }
}

/**
 * This error occurs when a DICOM P10 read context is supplied data that
 * contains a *'(0008,0005) SpecificCharacterSet'* data element that is
 * invalid and unable to be decoded.
 *
 * This error will never occur on valid DICOM P10 data because all character
 * sets defined by the DICOM standard are supported.
 */
export class SpecificCharacterSetInvalid extends $CustomType {
  constructor(specific_character_set, details) {
    super();
    this.specific_character_set = specific_character_set;
    this.details = details;
  }
}

/**
 * This error occurs when a DICOM P10 read context requires more data to be
 * added to it before the next token can be read.
 */
export class DataRequired extends $CustomType {
  constructor(when) {
    super();
    this.when = when;
  }
}

/**
 * This error occurs when a DICOM P10 read context reaches the end of its
 * data while reading the next token, and no more data is able to be added.
 * This means the provided data is malformed or truncated.
 */
export class DataEndedUnexpectedly extends $CustomType {
  constructor(when, path, offset) {
    super();
    this.when = when;
    this.path = path;
    this.offset = offset;
  }
}

export class DicmPrefixNotPresent extends $CustomType {}

/**
 * This error occurs when a DICOM P10 read context is unable to read the next
 * DICOM P10 token because the supplied data is invalid, and also when a
 * DICOM P10 write context is unable to serialize a token written to it.
 */
export class DataInvalid extends $CustomType {
  constructor(when, details, path, offset) {
    super();
    this.when = when;
    this.details = details;
    this.path = path;
    this.offset = offset;
  }
}

/**
 * This error occurs when one of the configured maximums for a DICOM P10 read
 * context is exceeded during reading of the supplied data. These maximums
 * are used to control memory usage when reading.
 */
export class MaximumExceeded extends $CustomType {
  constructor(details, path, offset) {
    super();
    this.details = details;
    this.path = path;
    this.offset = offset;
  }
}

/**
 * This error occurs when a stream of `P10Token`s is being ingested and a
 * token is received that is invalid at the current location in the token
 * stream. E.g. a `DataElementValueBytes` token that does not follow a
 * `DataElementHeader`.
 */
export class TokenStreamInvalid extends $CustomType {
  constructor(when, details, token) {
    super();
    this.when = when;
    this.details = details;
    this.token = token;
  }
}

export class WriteAfterCompletion extends $CustomType {}

/**
 * This error occurs when there is an error with an underlying file stream.
 */
export class FileStreamError extends $CustomType {
  constructor(when, error) {
    super();
    this.when = when;
    this.error = error;
  }
}

/**
 * A fallback/general-purpose error for cases not covered by the other error
 * variants.
 */
export class OtherError extends $CustomType {
  constructor(error_type, details) {
    super();
    this.error_type = error_type;
    this.details = details;
  }
}

/**
 * Returns the name of the error as a human-readable string.
 */
export function name(error) {
  if (error instanceof TransferSyntaxNotSupported) {
    return "Transfer syntax not supported";
  } else if (error instanceof SpecificCharacterSetInvalid) {
    return "Specific character set invalid";
  } else if (error instanceof DataRequired) {
    return "Data required";
  } else if (error instanceof DataEndedUnexpectedly) {
    return "Unexpected end of data";
  } else if (error instanceof DicmPrefixNotPresent) {
    return "'DICM' prefix is not present";
  } else if (error instanceof DataInvalid) {
    return "Invalid data";
  } else if (error instanceof MaximumExceeded) {
    return "Maximum exceeded";
  } else if (error instanceof TokenStreamInvalid) {
    return "P10 token stream invalid";
  } else if (error instanceof WriteAfterCompletion) {
    return "Write after completion";
  } else if (error instanceof FileStreamError) {
    return "File stream I/O failure";
  } else {
    let error_type = error.error_type;
    return error_type;
  }
}

/**
 * Returns the `details` field of the error, if one exists.
 */
export function details(error) {
  if (error instanceof TransferSyntaxNotSupported) {
    return "";
  } else if (error instanceof SpecificCharacterSetInvalid) {
    let details$1 = error.details;
    return details$1;
  } else if (error instanceof DataRequired) {
    return "";
  } else if (error instanceof DataEndedUnexpectedly) {
    return "";
  } else if (error instanceof DicmPrefixNotPresent) {
    return "";
  } else if (error instanceof DataInvalid) {
    let details$1 = error.details;
    return details$1;
  } else if (error instanceof MaximumExceeded) {
    let details$1 = error.details;
    return details$1;
  } else if (error instanceof TokenStreamInvalid) {
    let details$1 = error.details;
    return details$1;
  } else if (error instanceof WriteAfterCompletion) {
    return "";
  } else if (error instanceof FileStreamError) {
    return "";
  } else {
    let details$1 = error.details;
    return details$1;
  }
}

/**
 * Returns lines of text that describe a DICOM P10 error in a human-readable
 * format.
 */
export function to_lines(error, task_description) {
  let lines = toList(["", "DICOM P10 error " + task_description]);
  let lines$1 = listPrepend("  Error: " + name(error), lines);
  let _block;
  if (error instanceof DataRequired) {
    let when = error.when;
    _block = listPrepend("  When: " + when, lines$1);
  } else if (error instanceof DataEndedUnexpectedly) {
    let when = error.when;
    _block = listPrepend("  When: " + when, lines$1);
  } else if (error instanceof DataInvalid) {
    let when = error.when;
    _block = listPrepend("  When: " + when, lines$1);
  } else if (error instanceof TokenStreamInvalid) {
    let when = error.when;
    _block = listPrepend("  When: " + when, lines$1);
  } else if (error instanceof FileStreamError) {
    let when = error.when;
    _block = listPrepend("  When: " + when, lines$1);
  } else {
    _block = lines$1;
  }
  let lines$2 = _block;
  let _block$1;
  if (error instanceof TransferSyntaxNotSupported) {
    let uid = error.transfer_syntax_uid;
    _block$1 = listPrepend("  Transfer syntax UID: " + uid, lines$2);
  } else if (error instanceof SpecificCharacterSetInvalid) {
    let charset = error.specific_character_set;
    let details$1 = error.details;
    _block$1 = $list.flatten(
      toList([
        (() => {
          if (details$1 === "") {
            return toList([]);
          } else {
            return toList(["  Details: " + details$1]);
          }
        })(),
        toList(["  Specific character set: " + charset]),
        lines$2,
      ]),
    );
  } else if (error instanceof DataInvalid) {
    let details$1 = error.details;
    _block$1 = listPrepend("  Details: " + details$1, lines$2);
  } else if (error instanceof MaximumExceeded) {
    let details$1 = error.details;
    _block$1 = listPrepend("  Details: " + details$1, lines$2);
  } else if (error instanceof TokenStreamInvalid) {
    let details$1 = error.details;
    let token = error.token;
    _block$1 = listPrepend(
      "  Token: " + $p10_token.to_string(token),
      listPrepend("  Details: " + details$1, lines$2),
    );
  } else if (error instanceof FileStreamError) {
    let error$1 = error.error;
    _block$1 = listPrepend("  Details: " + $string.inspect(error$1), lines$2);
  } else if (error instanceof OtherError) {
    let details$1 = error.details;
    _block$1 = listPrepend("  Details: " + details$1, lines$2);
  } else {
    _block$1 = lines$2;
  }
  let lines$3 = _block$1;
  let _block$2;
  if (error instanceof DataEndedUnexpectedly) {
    let path = error.path;
    let offset = error.offset;
    _block$2 = listPrepend(
      "  Offset: 0x" + $int.to_base16(offset),
      listPrepend("  Path: " + $data_set_path.to_detailed_string(path), lines$3),
    );
  } else if (error instanceof DataInvalid) {
    let path = error.path;
    let offset = error.offset;
    _block$2 = listPrepend(
      "  Offset: 0x" + $int.to_base16(offset),
      listPrepend("  Path: " + $data_set_path.to_detailed_string(path), lines$3),
    );
  } else if (error instanceof MaximumExceeded) {
    let path = error.path;
    let offset = error.offset;
    _block$2 = listPrepend(
      "  Offset: 0x" + $int.to_base16(offset),
      listPrepend("  Path: " + $data_set_path.to_detailed_string(path), lines$3),
    );
  } else {
    _block$2 = lines$3;
  }
  let lines$4 = _block$2;
  let _pipe = lines$4;
  return $list.reverse(_pipe);
}

/**
 * Returns lines of text that describe a DICOM P10 error in a human-readable
 * format.
 */
export function print(error, task_description) {
  $io.println_error("");
  $io.println_error("-----");
  let _pipe = to_lines(error, task_description);
  $list.each(_pipe, $io.println_error)
  return $io.println_error("");
}

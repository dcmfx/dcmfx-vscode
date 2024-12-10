/// <reference types="./p10_error.d.mts" />
import * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $file_stream_error from "../../file_streams/file_streams/file_stream_error.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../gleam_stdlib/gleam/io.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $p10_part from "../dcmfx_p10/p10_part.mjs";
import { toList, prepend as listPrepend, CustomType as $CustomType } from "../gleam.mjs";

export class TransferSyntaxNotSupported extends $CustomType {
  constructor(transfer_syntax_uid) {
    super();
    this.transfer_syntax_uid = transfer_syntax_uid;
  }
}

export class SpecificCharacterSetInvalid extends $CustomType {
  constructor(specific_character_set, details) {
    super();
    this.specific_character_set = specific_character_set;
    this.details = details;
  }
}

export class DataRequired extends $CustomType {
  constructor(when) {
    super();
    this.when = when;
  }
}

export class DataEndedUnexpectedly extends $CustomType {
  constructor(when, path, offset) {
    super();
    this.when = when;
    this.path = path;
    this.offset = offset;
  }
}

export class DataInvalid extends $CustomType {
  constructor(when, details, path, offset) {
    super();
    this.when = when;
    this.details = details;
    this.path = path;
    this.offset = offset;
  }
}

export class MaximumExceeded extends $CustomType {
  constructor(details, path, offset) {
    super();
    this.details = details;
    this.path = path;
    this.offset = offset;
  }
}

export class PartStreamInvalid extends $CustomType {
  constructor(when, details, part) {
    super();
    this.when = when;
    this.details = details;
    this.part = part;
  }
}

export class WriteAfterCompletion extends $CustomType {}

export class FileStreamError extends $CustomType {
  constructor(when, error) {
    super();
    this.when = when;
    this.error = error;
  }
}

export class OtherError extends $CustomType {
  constructor(error_type, details) {
    super();
    this.error_type = error_type;
    this.details = details;
  }
}

export function name(error) {
  if (error instanceof TransferSyntaxNotSupported) {
    return "Transfer syntax not supported";
  } else if (error instanceof SpecificCharacterSetInvalid) {
    return "Specific character set invalid";
  } else if (error instanceof DataRequired) {
    return "Data required";
  } else if (error instanceof DataEndedUnexpectedly) {
    return "Unexpected end of data";
  } else if (error instanceof DataInvalid) {
    return "Invalid data";
  } else if (error instanceof MaximumExceeded) {
    return "Maximum exceeded";
  } else if (error instanceof PartStreamInvalid) {
    return "P10 part stream invalid";
  } else if (error instanceof WriteAfterCompletion) {
    return "Write after completion";
  } else if (error instanceof FileStreamError) {
    return "File stream I/O failure";
  } else {
    let error_type = error.error_type;
    return error_type;
  }
}

export function to_lines(error, task_description) {
  let lines = toList(["", "DICOM P10 error " + task_description]);
  let lines$1 = listPrepend("  Error: " + name(error), lines);
  let lines$2 = (() => {
    if (error instanceof DataRequired) {
      let when = error.when;
      return listPrepend("  When: " + when, lines$1);
    } else if (error instanceof DataEndedUnexpectedly) {
      let when = error.when;
      return listPrepend("  When: " + when, lines$1);
    } else if (error instanceof DataInvalid) {
      let when = error.when;
      return listPrepend("  When: " + when, lines$1);
    } else if (error instanceof PartStreamInvalid) {
      let when = error.when;
      return listPrepend("  When: " + when, lines$1);
    } else if (error instanceof FileStreamError) {
      let when = error.when;
      return listPrepend("  When: " + when, lines$1);
    } else {
      return lines$1;
    }
  })();
  let lines$3 = (() => {
    if (error instanceof TransferSyntaxNotSupported) {
      let uid = error.transfer_syntax_uid;
      return listPrepend("  Transfer syntax UID: " + uid, lines$2);
    } else if (error instanceof SpecificCharacterSetInvalid) {
      let charset = error.specific_character_set;
      let details = error.details;
      return listPrepend(
        "  Details: " + details,
        listPrepend("  Specific character set: " + charset, lines$2),
      );
    } else if (error instanceof PartStreamInvalid) {
      let details = error.details;
      let part = error.part;
      return listPrepend(
        "  Part: " + $p10_part.to_string(part),
        listPrepend("  Details: " + details, lines$2),
      );
    } else if (error instanceof FileStreamError) {
      let error$1 = error.error;
      return listPrepend("  Details: " + $string.inspect(error$1), lines$2);
    } else if (error instanceof DataInvalid) {
      let details = error.details;
      return listPrepend("  Details: " + details, lines$2);
    } else if (error instanceof MaximumExceeded) {
      let details = error.details;
      return listPrepend("  Details: " + details, lines$2);
    } else if (error instanceof OtherError) {
      let details = error.details;
      return listPrepend("  Details: " + details, lines$2);
    } else {
      return lines$2;
    }
  })();
  let lines$4 = (() => {
    if (error instanceof DataEndedUnexpectedly) {
      let path = error.path;
      let offset = error.offset;
      return listPrepend(
        "  Offset: 0x" + $int.to_base16(offset),
        listPrepend(
          "  Path: " + $data_set_path.to_detailed_string(path),
          lines$3,
        ),
      );
    } else if (error instanceof DataInvalid &&
    error.path instanceof Some &&
    error.offset instanceof Some) {
      let path = error.path[0];
      let offset = error.offset[0];
      return listPrepend(
        "  Offset: 0x" + $int.to_base16(offset),
        listPrepend(
          "  Path: " + $data_set_path.to_detailed_string(path),
          lines$3,
        ),
      );
    } else if (error instanceof MaximumExceeded) {
      let path = error.path;
      let offset = error.offset;
      return listPrepend(
        "  Offset: 0x" + $int.to_base16(offset),
        listPrepend(
          "  Path: " + $data_set_path.to_detailed_string(path),
          lines$3,
        ),
      );
    } else {
      return lines$3;
    }
  })();
  let _pipe = lines$4;
  return $list.reverse(_pipe);
}

export function print(error, task_description) {
  $io.println_error("");
  $io.println_error("-----");
  let _pipe = to_lines(error, task_description);
  $list.each(_pipe, $io.println_error)
  return $io.println_error("");
}

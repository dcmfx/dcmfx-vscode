/// <reference types="./regex.d.mts" />
import { CustomType as $CustomType } from "../gleam.mjs";
import * as $option from "../gleam/option.mjs";
import {
  compile_regex as compile,
  regex_check as check,
  regex_split as split,
  regex_scan as scan,
  regex_replace as replace,
} from "../gleam_stdlib.mjs";

export { check, compile, replace, scan, split };

export class Match extends $CustomType {
  constructor(content, submatches) {
    super();
    this.content = content;
    this.submatches = submatches;
  }
}

export class CompileError extends $CustomType {
  constructor(error, byte_index) {
    super();
    this.error = error;
    this.byte_index = byte_index;
  }
}

export class Options extends $CustomType {
  constructor(case_insensitive, multi_line) {
    super();
    this.case_insensitive = case_insensitive;
    this.multi_line = multi_line;
  }
}

export function from_string(pattern) {
  return compile(pattern, new Options(false, false));
}

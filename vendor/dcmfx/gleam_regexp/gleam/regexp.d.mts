import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export type Regexp$ = unknown;

export class Match extends _.CustomType {
  /** @deprecated */
  constructor(content: string, submatches: _.List<$option.Option$<string>>);
  /** @deprecated */
  content: string;
  /** @deprecated */
  submatches: _.List<$option.Option$<string>>;
}
export function Match$Match(
  content: string,
  submatches: _.List<$option.Option$<string>>,
): Match$;
export function Match$isMatch(value: Match$): boolean;
export function Match$Match$0(value: Match$): string;
export function Match$Match$content(value: Match$): string;
export function Match$Match$1(value: Match$): _.List<$option.Option$<string>>;
export function Match$Match$submatches(value: Match$): _.List<
  $option.Option$<string>
>;

export type Match$ = Match;

export class CompileError extends _.CustomType {
  /** @deprecated */
  constructor(error: string, byte_index: number);
  /** @deprecated */
  error: string;
  /** @deprecated */
  byte_index: number;
}
export function CompileError$CompileError(
  error: string,
  byte_index: number,
): CompileError$;
export function CompileError$isCompileError(value: CompileError$): boolean;
export function CompileError$CompileError$0(value: CompileError$): string;
export function CompileError$CompileError$error(value: CompileError$): string;
export function CompileError$CompileError$1(value: CompileError$): number;
export function CompileError$CompileError$byte_index(value: CompileError$): number;

export type CompileError$ = CompileError;

export class Options extends _.CustomType {
  /** @deprecated */
  constructor(case_insensitive: boolean, multi_line: boolean);
  /** @deprecated */
  case_insensitive: boolean;
  /** @deprecated */
  multi_line: boolean;
}
export function Options$Options(
  case_insensitive: boolean,
  multi_line: boolean,
): Options$;
export function Options$isOptions(value: Options$): boolean;
export function Options$Options$0(value: Options$): boolean;
export function Options$Options$case_insensitive(value: Options$): boolean;
export function Options$Options$1(value: Options$): boolean;
export function Options$Options$multi_line(value: Options$): boolean;

export type Options$ = Options;

export function compile(pattern: string, options: Options$): _.Result<
  Regexp$,
  CompileError$
>;

export function from_string(pattern: string): _.Result<Regexp$, CompileError$>;

export function check(regexp: Regexp$, string: string): boolean;

export function split(regexp: Regexp$, string: string): _.List<string>;

export function scan(regexp: Regexp$, string: string): _.List<Match$>;

export function replace(pattern: Regexp$, string: string, substitute: string): string;

export function match_map(
  pattern: Regexp$,
  string: string,
  substitute: (x0: Match$) => string
): string;

import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export type Regexp$ = unknown;

export class Match extends _.CustomType {
  constructor(content: string, submatches: _.List<$option.Option$<string>>);
  
  content: string;
  submatches: _.List<$option.Option$<string>>;
}

export type Match$ = Match;

export class CompileError extends _.CustomType {
  constructor(error: string, byte_index: number);
  
  error: string;
  byte_index: number;
}

export type CompileError$ = CompileError;

export class Options extends _.CustomType {
  constructor(case_insensitive: boolean, multi_line: boolean);
  
  case_insensitive: boolean;
  multi_line: boolean;
}

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

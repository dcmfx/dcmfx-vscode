import type * as _ from "../gleam.d.mts";
import type * as $option from "../gleam/option.d.mts";

export type Regex$ = {
  __gleam__gleam__regex__Regex: never;
};

export class Match extends _.CustomType {
  private __gleam__gleam__regex__Match: never;

  constructor(content: string, submatches: _.List<$option.Option$<string>>);
  
  content: string;
  submatches: _.List<$option.Option$<string>>;
}

export type Match$ = Match;

export class CompileError extends _.CustomType {
  private __gleam__gleam__regex__CompileError: never;

  constructor(error: string, byte_index: number);
  
  error: string;
  byte_index: number;
}

export type CompileError$ = CompileError;

export class Options extends _.CustomType {
  private __gleam__gleam__regex__Options: never;

  constructor(case_insensitive: boolean, multi_line: boolean);
  
  case_insensitive: boolean;
  multi_line: boolean;
}

export type Options$ = Options;

export function compile(pattern: string, options: Options$): _.Result<
  Regex$,
  CompileError$
>;

export function from_string(pattern: string): _.Result<Regex$, CompileError$>;

export function check(regex: Regex$, content: string): boolean;

export function split(regex: Regex$, string: string): _.List<string>;

export function scan(regex: Regex$, string: string): _.List<Match$>;

export function replace(pattern: Regex$, string: string, substitute: string): string;

import type * as _ from "../gleam.d.mts";

export type StringBuilder$ = {
  __gleam__gleam__string_builder__StringBuilder: never;
};

declare class All extends _.CustomType {
  private __gleam__gleam__string_builder__All: never;
}

declare type Direction$ = All;

export function prepend_builder(builder: StringBuilder$, prefix: StringBuilder$): StringBuilder$;

export function append_builder(builder: StringBuilder$, suffix: StringBuilder$): StringBuilder$;

export function new$(): StringBuilder$;

export function from_strings(strings: _.List<string>): StringBuilder$;

export function concat(builders: _.List<StringBuilder$>): StringBuilder$;

export function from_string(string: string): StringBuilder$;

export function prepend(builder: StringBuilder$, prefix: string): StringBuilder$;

export function append(builder: StringBuilder$, second: string): StringBuilder$;

export function to_string(builder: StringBuilder$): string;

export function byte_size(builder: StringBuilder$): number;

export function join(builders: _.List<StringBuilder$>, sep: string): StringBuilder$;

export function lowercase(builder: StringBuilder$): StringBuilder$;

export function uppercase(builder: StringBuilder$): StringBuilder$;

export function reverse(builder: StringBuilder$): StringBuilder$;

export function split(iodata: StringBuilder$, pattern: string): _.List<
  StringBuilder$
>;

export function replace(
  builder: StringBuilder$,
  pattern: string,
  substitute: string
): StringBuilder$;

export function is_equal(a: StringBuilder$, b: StringBuilder$): boolean;

export function is_empty(builder: StringBuilder$): boolean;

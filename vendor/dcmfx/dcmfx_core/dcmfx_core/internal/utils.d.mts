import type * as _ from "../../gleam.d.mts";

export function string_fast_length(s: string): number;

export function pad_start(s: string, desired_length: number, pad_string: string): string;

export function spaces(n: number): string;

export function trim_right_codepoints(s: string, codepoints: _.List<number>): string;

export function smart_parse_float(input: string): _.Result<number, undefined>;

export function trim_right(s: string, chars: string): string;

export function trim_right_whitespace(s: string): string;

export function list_at<HDA>(list: _.List<HDA>, index: number): _.Result<
  HDA,
  undefined
>;

export function inspect_bit_array(bits: _.BitArray): string;

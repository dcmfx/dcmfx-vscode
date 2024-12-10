import type * as _ from "../../gleam.d.mts";

export function string_fast_length(s: string): number;

export function pad_start(s: string, desired_length: number, pad_string: string): string;

export function trim_end_codepoints(s: string, codepoints: _.List<number>): string;

export function smart_parse_float(input: string): _.Result<number, undefined>;

export function trim_end(s: string, chars: string): string;

export function trim_end_whitespace(s: string): string;

export function list_at<HHD>(list: _.List<HHD>, index: number): _.Result<
  HHD,
  undefined
>;

export function inspect_bit_array(bits: _.BitArray): string;

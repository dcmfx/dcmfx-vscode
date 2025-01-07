import type * as _ from "../../gleam.d.mts";

export function string_fast_length(s: string): number;

export function pad_start(s: string, desired_length: number, pad_string: string): string;

export function trim_ascii_end(s: string, ascii_character: number): string;

export function smart_parse_float(input: string): _.Result<number, undefined>;

export function trim_ascii(s: string, ascii_character: number): string;

export function list_at<GKJ>(list: _.List<GKJ>, index: number): _.Result<
  GKJ,
  undefined
>;

export function inspect_bit_array(bits: _.BitArray, max_length: number): string;

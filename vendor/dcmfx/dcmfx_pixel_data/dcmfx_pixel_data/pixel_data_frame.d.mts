import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

declare class PixelDataFrame extends _.CustomType {
  constructor(
    frame_index: $option.Option$<number>,
    chunks: _.List<_.BitArray>,
    length_in_bits: number,
    bit_offset: number
  );
  
  frame_index: $option.Option$<number>;
  chunks: _.List<_.BitArray>;
  length_in_bits: number;
  bit_offset: number;
}

export type PixelDataFrame$ = PixelDataFrame;

export function new$(): PixelDataFrame$;

export function index(frame: PixelDataFrame$): $option.Option$<number>;

export function set_index(frame: PixelDataFrame$, index: number): PixelDataFrame$;

export function push_chunk(frame: PixelDataFrame$, data: _.BitArray): PixelDataFrame$;

export function length_in_bits(frame: PixelDataFrame$): number;

export function length(frame: PixelDataFrame$): number;

export function bit_offset(frame: PixelDataFrame$): number;

export function set_bit_offset(frame: PixelDataFrame$, bit_offset: number): PixelDataFrame$;

export function is_empty(frame: PixelDataFrame$): boolean;

export function chunks(frame: PixelDataFrame$): _.List<_.BitArray>;

export function drop_end_bytes(frame: PixelDataFrame$, count: number): PixelDataFrame$;

export function to_bytes(frame: PixelDataFrame$): _.BitArray;

export function equals(frame: PixelDataFrame$, other: PixelDataFrame$): boolean;

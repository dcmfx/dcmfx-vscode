import type * as _ from "../gleam.d.mts";

declare class PixelDataFrame extends _.CustomType {
  constructor(
    frame_index: number,
    fragments: _.List<_.BitArray>,
    length: number,
    bit_offset: number
  );
  
  frame_index: number;
  fragments: _.List<_.BitArray>;
  length: number;
  bit_offset: number;
}

export type PixelDataFrame$ = PixelDataFrame;

export function new$(frame_index: number): PixelDataFrame$;

export function index(frame: PixelDataFrame$): number;

export function push_fragment(frame: PixelDataFrame$, data: _.BitArray): PixelDataFrame$;

export function length(frame: PixelDataFrame$): number;

export function length_in_bits(frame: PixelDataFrame$): number;

export function bit_offset(frame: PixelDataFrame$): number;

export function set_bit_offset(frame: PixelDataFrame$, bit_offset: number): PixelDataFrame$;

export function is_empty(frame: PixelDataFrame$): boolean;

export function fragments(frame: PixelDataFrame$): _.List<_.BitArray>;

export function drop_end_bytes(frame: PixelDataFrame$, count: number): PixelDataFrame$;

export function to_bytes(frame: PixelDataFrame$): _.BitArray;

export function equals(frame: PixelDataFrame$, other: PixelDataFrame$): boolean;

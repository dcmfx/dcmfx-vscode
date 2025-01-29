import type * as _ from "../gleam.d.mts";

declare class PixelDataFrame extends _.CustomType {
  constructor(fragments: _.List<_.BitArray>, length: number);
  
  fragments: _.List<_.BitArray>;
  length: number;
}

export type PixelDataFrame$ = PixelDataFrame;

export function new$(): PixelDataFrame$;

export function push_fragment(frame: PixelDataFrame$, data: _.BitArray): PixelDataFrame$;

export function length(frame: PixelDataFrame$): number;

export function is_empty(frame: PixelDataFrame$): boolean;

export function fragments(frame: PixelDataFrame$): _.List<_.BitArray>;

export function drop_end_bytes(frame: PixelDataFrame$, count: number): PixelDataFrame$;

export function to_bytes(frame: PixelDataFrame$): _.BitArray;

export function equals(frame: PixelDataFrame$, other: PixelDataFrame$): boolean;

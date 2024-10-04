import type * as $flush_command from "../../dcmfx_p10/internal/zlib/flush_command.d.mts";
import type * as $inflate_result from "../../dcmfx_p10/internal/zlib/inflate_result.d.mts";
import type * as _ from "../../gleam.d.mts";

export type ZlibStream$ = {
  __gleam__dcmfx_p10__internal__zlib__ZlibStream: never;
};

export class Deflated extends _.CustomType {
  private __gleam__dcmfx_p10__internal__zlib__Deflated: never;
}

export type Zmethod$ = Deflated;

export class Default extends _.CustomType {
  private __gleam__dcmfx_p10__internal__zlib__Default: never;
}

export class Filtered extends _.CustomType {
  private __gleam__dcmfx_p10__internal__zlib__Filtered: never;
}

export class HuffmanOnly extends _.CustomType {
  private __gleam__dcmfx_p10__internal__zlib__HuffmanOnly: never;
}

export class Rle extends _.CustomType {
  private __gleam__dcmfx_p10__internal__zlib__Rle: never;
}

export type Zstrategy$ = Default | Filtered | HuffmanOnly | Rle;

export function open(): ZlibStream$;

export function deflate_init(
  stream: ZlibStream$,
  level: number,
  method: Zmethod$,
  window_bits: number,
  mem_level: number,
  strategy: Zstrategy$
): undefined;

export function inflate_init(stream: ZlibStream$, window_bits: number): undefined;

export function deflate(
  stream: ZlibStream$,
  data: _.BitArray,
  flush: $flush_command.FlushCommand$
): _.List<_.BitArray>;

export function safe_inflate(zlib_stream: ZlibStream$, input_bytes: _.BitArray): _.Result<
  $inflate_result.InflateResult$,
  undefined
>;

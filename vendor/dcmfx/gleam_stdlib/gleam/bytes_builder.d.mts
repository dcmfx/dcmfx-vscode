import type * as _ from "../gleam.d.mts";
import type * as $string_builder from "../gleam/string_builder.d.mts";

declare class Bytes extends _.CustomType {
  private __gleam__gleam__bytes_builder__Bytes: never;

  constructor(argument$0: _.BitArray);
  
  0: _.BitArray;
}

declare class Text extends _.CustomType {
  private __gleam__gleam__bytes_builder__Text: never;

  constructor(argument$0: $string_builder.StringBuilder$);
  
  0: $string_builder.StringBuilder$;
}

declare class Many extends _.CustomType {
  private __gleam__gleam__bytes_builder__Many: never;

  constructor(argument$0: _.List<BytesBuilder$>);
  
  0: _.List<BytesBuilder$>;
}

export type BytesBuilder$ = Bytes | Text | Many;

export function append_builder(first: BytesBuilder$, second: BytesBuilder$): BytesBuilder$;

export function prepend_builder(second: BytesBuilder$, first: BytesBuilder$): BytesBuilder$;

export function concat(builders: _.List<BytesBuilder$>): BytesBuilder$;

export function new$(): BytesBuilder$;

export function from_string(string: string): BytesBuilder$;

export function prepend_string(second: BytesBuilder$, first: string): BytesBuilder$;

export function append_string(first: BytesBuilder$, second: string): BytesBuilder$;

export function from_string_builder(builder: $string_builder.StringBuilder$): BytesBuilder$;

export function from_bit_array(bits: _.BitArray): BytesBuilder$;

export function prepend(second: BytesBuilder$, first: _.BitArray): BytesBuilder$;

export function append(first: BytesBuilder$, second: _.BitArray): BytesBuilder$;

export function concat_bit_arrays(bits: _.List<_.BitArray>): BytesBuilder$;

export function to_bit_array(builder: BytesBuilder$): _.BitArray;

export function byte_size(builder: BytesBuilder$): number;

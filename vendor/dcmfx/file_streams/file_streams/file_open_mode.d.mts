import type * as $text_encoding from "../file_streams/text_encoding.d.mts";
import type * as _ from "../gleam.d.mts";

export class Append extends _.CustomType {
  private __gleam__file_streams__file_open_mode__Append: never;
}

export class Binary extends _.CustomType {
  private __gleam__file_streams__file_open_mode__Binary: never;
}

export class DelayedWrite extends _.CustomType {
  private __gleam__file_streams__file_open_mode__DelayedWrite: never;

  constructor(size: number, delay: number);
  
  size: number;
  delay: number;
}

export class Encoding extends _.CustomType {
  private __gleam__file_streams__file_open_mode__Encoding: never;

  constructor(encoding: $text_encoding.TextEncoding$);
  
  encoding: $text_encoding.TextEncoding$;
}

export class Exclusive extends _.CustomType {
  private __gleam__file_streams__file_open_mode__Exclusive: never;
}

export class Raw extends _.CustomType {
  private __gleam__file_streams__file_open_mode__Raw: never;
}

export class Read extends _.CustomType {
  private __gleam__file_streams__file_open_mode__Read: never;
}

export class ReadAhead extends _.CustomType {
  private __gleam__file_streams__file_open_mode__ReadAhead: never;

  constructor(size: number);
  
  size: number;
}

export class Write extends _.CustomType {
  private __gleam__file_streams__file_open_mode__Write: never;
}

export type FileOpenMode$ = Append | Binary | DelayedWrite | Encoding | Exclusive | Raw | Read | ReadAhead | Write;

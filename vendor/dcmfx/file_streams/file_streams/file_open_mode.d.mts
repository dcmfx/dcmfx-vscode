import type * as $text_encoding from "../file_streams/text_encoding.d.mts";
import type * as _ from "../gleam.d.mts";

export class Append extends _.CustomType {}

export class Binary extends _.CustomType {}

export class DelayedWrite extends _.CustomType {
  constructor(size: number, delay: number);
  
  size: number;
  delay: number;
}

export class Encoding extends _.CustomType {
  constructor(encoding: $text_encoding.TextEncoding$);
  
  encoding: $text_encoding.TextEncoding$;
}

export class Exclusive extends _.CustomType {}

export class Raw extends _.CustomType {}

export class Read extends _.CustomType {}

export class ReadAhead extends _.CustomType {
  constructor(size: number);
  
  size: number;
}

export class Write extends _.CustomType {}

export type FileOpenMode$ = Append | Binary | DelayedWrite | Encoding | Exclusive | Raw | Read | ReadAhead | Write;

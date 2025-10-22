import type * as $text_encoding from "../file_streams/text_encoding.d.mts";
import type * as _ from "../gleam.d.mts";

export class Append extends _.CustomType {}
export function FileOpenMode$Append(): FileOpenMode$;
export function FileOpenMode$isAppend(value: FileOpenMode$): boolean;

export class Binary extends _.CustomType {}
export function FileOpenMode$Binary(): FileOpenMode$;
export function FileOpenMode$isBinary(value: FileOpenMode$): boolean;

export class DelayedWrite extends _.CustomType {
  /** @deprecated */
  constructor(size: number, delay: number);
  /** @deprecated */
  size: number;
  /** @deprecated */
  delay: number;
}
export function FileOpenMode$DelayedWrite(
  size: number,
  delay: number,
): FileOpenMode$;
export function FileOpenMode$isDelayedWrite(value: FileOpenMode$): boolean;
export function FileOpenMode$DelayedWrite$0(value: FileOpenMode$): number;
export function FileOpenMode$DelayedWrite$size(value: FileOpenMode$): number;
export function FileOpenMode$DelayedWrite$1(value: FileOpenMode$): number;
export function FileOpenMode$DelayedWrite$delay(value: FileOpenMode$): number;

export class Encoding extends _.CustomType {
  /** @deprecated */
  constructor(encoding: $text_encoding.TextEncoding$);
  /** @deprecated */
  encoding: $text_encoding.TextEncoding$;
}
export function FileOpenMode$Encoding(
  encoding: $text_encoding.TextEncoding$,
): FileOpenMode$;
export function FileOpenMode$isEncoding(value: FileOpenMode$): boolean;
export function FileOpenMode$Encoding$0(value: FileOpenMode$): $text_encoding.TextEncoding$;
export function FileOpenMode$Encoding$encoding(
  value: FileOpenMode$,
): $text_encoding.TextEncoding$;

export class Exclusive extends _.CustomType {}
export function FileOpenMode$Exclusive(): FileOpenMode$;
export function FileOpenMode$isExclusive(value: FileOpenMode$): boolean;

export class Raw extends _.CustomType {}
export function FileOpenMode$Raw(): FileOpenMode$;
export function FileOpenMode$isRaw(value: FileOpenMode$): boolean;

export class Read extends _.CustomType {}
export function FileOpenMode$Read(): FileOpenMode$;
export function FileOpenMode$isRead(value: FileOpenMode$): boolean;

export class ReadAhead extends _.CustomType {
  /** @deprecated */
  constructor(size: number);
  /** @deprecated */
  size: number;
}
export function FileOpenMode$ReadAhead(size: number): FileOpenMode$;
export function FileOpenMode$isReadAhead(value: FileOpenMode$): boolean;
export function FileOpenMode$ReadAhead$0(value: FileOpenMode$): number;
export function FileOpenMode$ReadAhead$size(value: FileOpenMode$): number;

export class Write extends _.CustomType {}
export function FileOpenMode$Write(): FileOpenMode$;
export function FileOpenMode$isWrite(value: FileOpenMode$): boolean;

export type FileOpenMode$ = Append | Binary | DelayedWrite | Encoding | Exclusive | Raw | Read | ReadAhead | Write;

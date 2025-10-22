import type * as _ from "../../gleam.d.mts";

export class Bof extends _.CustomType {
  /** @deprecated */
  constructor(offset: number);
  /** @deprecated */
  offset: number;
}
export function Location$Bof(offset: number): Location$;
export function Location$isBof(value: Location$): boolean;
export function Location$Bof$0(value: Location$): number;
export function Location$Bof$offset(value: Location$): number;

export class Cur extends _.CustomType {
  /** @deprecated */
  constructor(offset: number);
  /** @deprecated */
  offset: number;
}
export function Location$Cur(offset: number): Location$;
export function Location$isCur(value: Location$): boolean;
export function Location$Cur$0(value: Location$): number;
export function Location$Cur$offset(value: Location$): number;

export class Eof extends _.CustomType {
  /** @deprecated */
  constructor(offset: number);
  /** @deprecated */
  offset: number;
}
export function Location$Eof(offset: number): Location$;
export function Location$isEof(value: Location$): boolean;
export function Location$Eof$0(value: Location$): number;
export function Location$Eof$offset(value: Location$): number;

export type Location$ = Bof | Cur | Eof;

export function Location$offset(value: Location$): number;

/// <reference types="./raw_location.d.mts" />
import { CustomType as $CustomType } from "../../gleam.mjs";

export class Bof extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}
export const Location$Bof = (offset) => new Bof(offset);
export const Location$isBof = (value) => value instanceof Bof;
export const Location$Bof$offset = (value) => value.offset;
export const Location$Bof$0 = (value) => value.offset;

export class Cur extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}
export const Location$Cur = (offset) => new Cur(offset);
export const Location$isCur = (value) => value instanceof Cur;
export const Location$Cur$offset = (value) => value.offset;
export const Location$Cur$0 = (value) => value.offset;

export class Eof extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}
export const Location$Eof = (offset) => new Eof(offset);
export const Location$isEof = (value) => value instanceof Eof;
export const Location$Eof$offset = (value) => value.offset;
export const Location$Eof$0 = (value) => value.offset;

export const Location$offset = (value) => value.offset;

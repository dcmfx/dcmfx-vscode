import type * as _ from "../../gleam.d.mts";

export class Bof extends _.CustomType {
  constructor(offset: number);
  
  offset: number;
}

export class Cur extends _.CustomType {
  constructor(offset: number);
  
  offset: number;
}

export class Eof extends _.CustomType {
  constructor(offset: number);
  
  offset: number;
}

export type Location$ = Bof | Cur | Eof;

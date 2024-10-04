import type * as _ from "../../../gleam.d.mts";

export class Continue extends _.CustomType {
  private __gleam__dcmfx_p10__internal__zlib__inflate_result__Continue: never;

  constructor(argument$0: _.BitArray);
  
  0: _.BitArray;
}

export class Finished extends _.CustomType {
  private __gleam__dcmfx_p10__internal__zlib__inflate_result__Finished: never;

  constructor(argument$0: _.BitArray);
  
  0: _.BitArray;
}

export type InflateResult$ = Continue | Finished;

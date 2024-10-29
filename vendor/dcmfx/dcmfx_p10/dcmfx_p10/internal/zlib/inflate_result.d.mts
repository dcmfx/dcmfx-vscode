import type * as _ from "../../../gleam.d.mts";

export class Continue extends _.CustomType {
  constructor(argument$0: _.BitArray);
  
  0: _.BitArray;
}

export class Finished extends _.CustomType {
  constructor(argument$0: _.BitArray);
  
  0: _.BitArray;
}

export type InflateResult$ = Continue | Finished;

import type * as _ from "../gleam.d.mts";

declare class Deque<BZXN> extends _.CustomType {
  constructor(in$: _.List<any>, out: _.List<any>);
  
  in$: _.List<any>;
  out: _.List<any>;
}

export type Deque$<BZXN> = Deque<BZXN>;

export function new$(): Deque$<any>;

export function from_list<BZXQ>(list: _.List<BZXQ>): Deque$<BZXQ>;

export function to_list<BZXT>(deque: Deque$<BZXT>): _.List<BZXT>;

export function is_empty(deque: Deque$<any>): boolean;

export function length(deque: Deque$<any>): number;

export function push_back<BZYA>(deque: Deque$<BZYA>, item: BZYA): Deque$<BZYA>;

export function push_front<BZYD>(deque: Deque$<BZYD>, item: BZYD): Deque$<BZYD>;

export function pop_back<BZYG>(deque: Deque$<BZYG>): _.Result<
  [BZYG, Deque$<BZYG>],
  undefined
>;

export function pop_front<BZYL>(deque: Deque$<BZYL>): _.Result<
  [BZYL, Deque$<BZYL>],
  undefined
>;

export function reverse<BZYQ>(deque: Deque$<BZYQ>): Deque$<BZYQ>;

export function is_logically_equal<BZYT>(
  a: Deque$<BZYT>,
  b: Deque$<BZYT>,
  element_is_equal: (x0: BZYT, x1: BZYT) => boolean
): boolean;

export function is_equal<BZZB>(a: Deque$<BZZB>, b: Deque$<BZZB>): boolean;

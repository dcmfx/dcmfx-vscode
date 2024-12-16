import type * as _ from "../gleam.d.mts";

declare class Deque<BZWQ> extends _.CustomType {
  constructor(in$: _.List<any>, out: _.List<any>);
  
  in$: _.List<any>;
  out: _.List<any>;
}

export type Deque$<BZWQ> = Deque<BZWQ>;

export function new$(): Deque$<any>;

export function from_list<BZWT>(list: _.List<BZWT>): Deque$<BZWT>;

export function to_list<BZWW>(deque: Deque$<BZWW>): _.List<BZWW>;

export function is_empty(deque: Deque$<any>): boolean;

export function length(deque: Deque$<any>): number;

export function push_back<BZXD>(deque: Deque$<BZXD>, item: BZXD): Deque$<BZXD>;

export function push_front<BZXG>(deque: Deque$<BZXG>, item: BZXG): Deque$<BZXG>;

export function pop_back<BZXJ>(deque: Deque$<BZXJ>): _.Result<
  [BZXJ, Deque$<BZXJ>],
  undefined
>;

export function pop_front<BZXO>(deque: Deque$<BZXO>): _.Result<
  [BZXO, Deque$<BZXO>],
  undefined
>;

export function reverse<BZXT>(deque: Deque$<BZXT>): Deque$<BZXT>;

export function is_logically_equal<BZXW>(
  a: Deque$<BZXW>,
  b: Deque$<BZXW>,
  element_is_equal: (x0: BZXW, x1: BZXW) => boolean
): boolean;

export function is_equal<BZYE>(a: Deque$<BZYE>, b: Deque$<BZYE>): boolean;

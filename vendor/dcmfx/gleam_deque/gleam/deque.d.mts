import type * as _ from "../gleam.d.mts";

declare class Deque<BXFD> extends _.CustomType {
  constructor(in$: _.List<any>, out: _.List<any>);
  
  in$: _.List<any>;
  out: _.List<any>;
}

export type Deque$<BXFD> = Deque<BXFD>;

export function new$(): Deque$<any>;

export function from_list<BXFG>(list: _.List<BXFG>): Deque$<BXFG>;

export function to_list<BXFJ>(deque: Deque$<BXFJ>): _.List<BXFJ>;

export function is_empty(deque: Deque$<any>): boolean;

export function length(deque: Deque$<any>): number;

export function push_back<BXFQ>(deque: Deque$<BXFQ>, item: BXFQ): Deque$<BXFQ>;

export function push_front<BXFT>(deque: Deque$<BXFT>, item: BXFT): Deque$<BXFT>;

export function pop_back<BXFW>(deque: Deque$<BXFW>): _.Result<
  [BXFW, Deque$<BXFW>],
  undefined
>;

export function pop_front<BXGB>(deque: Deque$<BXGB>): _.Result<
  [BXGB, Deque$<BXGB>],
  undefined
>;

export function reverse<BXGG>(deque: Deque$<BXGG>): Deque$<BXGG>;

export function is_logically_equal<BXGJ>(
  a: Deque$<BXGJ>,
  b: Deque$<BXGJ>,
  element_is_equal: (x0: BXGJ, x1: BXGJ) => boolean
): boolean;

export function is_equal<BXGR>(a: Deque$<BXGR>, b: Deque$<BXGR>): boolean;

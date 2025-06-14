import type * as _ from "../gleam.d.mts";

declare class Deque<BXFH> extends _.CustomType {
  constructor(in$: _.List<any>, out: _.List<any>);
  
  in$: _.List<any>;
  out: _.List<any>;
}

export type Deque$<BXFH> = Deque<BXFH>;

export function new$(): Deque$<any>;

export function from_list<BXFK>(list: _.List<BXFK>): Deque$<BXFK>;

export function to_list<BXFN>(deque: Deque$<BXFN>): _.List<BXFN>;

export function is_empty(deque: Deque$<any>): boolean;

export function length(deque: Deque$<any>): number;

export function push_back<BXFU>(deque: Deque$<BXFU>, item: BXFU): Deque$<BXFU>;

export function push_front<BXFX>(deque: Deque$<BXFX>, item: BXFX): Deque$<BXFX>;

export function pop_back<BXGA>(deque: Deque$<BXGA>): _.Result<
  [BXGA, Deque$<BXGA>],
  undefined
>;

export function pop_front<BXGF>(deque: Deque$<BXGF>): _.Result<
  [BXGF, Deque$<BXGF>],
  undefined
>;

export function reverse<BXGK>(deque: Deque$<BXGK>): Deque$<BXGK>;

export function is_logically_equal<BXGN>(
  a: Deque$<BXGN>,
  b: Deque$<BXGN>,
  element_is_equal: (x0: BXGN, x1: BXGN) => boolean
): boolean;

export function is_equal<BXGV>(a: Deque$<BXGV>, b: Deque$<BXGV>): boolean;

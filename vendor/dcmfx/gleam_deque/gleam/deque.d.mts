import type * as _ from "../gleam.d.mts";

declare class Deque<BZEH> extends _.CustomType {
  constructor(in$: _.List<any>, out: _.List<any>);
  
  in$: _.List<any>;
  out: _.List<any>;
}

export type Deque$<BZEH> = Deque<BZEH>;

export function new$(): Deque$<any>;

export function from_list<BZEK>(list: _.List<BZEK>): Deque$<BZEK>;

export function to_list<BZEN>(deque: Deque$<BZEN>): _.List<BZEN>;

export function is_empty(deque: Deque$<any>): boolean;

export function length(deque: Deque$<any>): number;

export function push_back<BZEU>(deque: Deque$<BZEU>, item: BZEU): Deque$<BZEU>;

export function push_front<BZEX>(deque: Deque$<BZEX>, item: BZEX): Deque$<BZEX>;

export function pop_back<BZFA>(deque: Deque$<BZFA>): _.Result<
  [BZFA, Deque$<BZFA>],
  undefined
>;

export function pop_front<BZFF>(deque: Deque$<BZFF>): _.Result<
  [BZFF, Deque$<BZFF>],
  undefined
>;

export function reverse<BZFK>(deque: Deque$<BZFK>): Deque$<BZFK>;

export function is_logically_equal<BZFN>(
  a: Deque$<BZFN>,
  b: Deque$<BZFN>,
  element_is_equal: (x0: BZFN, x1: BZFN) => boolean
): boolean;

export function is_equal<BZFV>(a: Deque$<BZFV>, b: Deque$<BZFV>): boolean;

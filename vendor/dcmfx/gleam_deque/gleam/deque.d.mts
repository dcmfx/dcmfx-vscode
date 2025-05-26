import type * as _ from "../gleam.d.mts";

declare class Deque<BZCQ> extends _.CustomType {
  constructor(in$: _.List<any>, out: _.List<any>);
  
  in$: _.List<any>;
  out: _.List<any>;
}

export type Deque$<BZCQ> = Deque<BZCQ>;

export function new$(): Deque$<any>;

export function from_list<BZCT>(list: _.List<BZCT>): Deque$<BZCT>;

export function to_list<BZCW>(deque: Deque$<BZCW>): _.List<BZCW>;

export function is_empty(deque: Deque$<any>): boolean;

export function length(deque: Deque$<any>): number;

export function push_back<BZDD>(deque: Deque$<BZDD>, item: BZDD): Deque$<BZDD>;

export function push_front<BZDG>(deque: Deque$<BZDG>, item: BZDG): Deque$<BZDG>;

export function pop_back<BZDJ>(deque: Deque$<BZDJ>): _.Result<
  [BZDJ, Deque$<BZDJ>],
  undefined
>;

export function pop_front<BZDO>(deque: Deque$<BZDO>): _.Result<
  [BZDO, Deque$<BZDO>],
  undefined
>;

export function reverse<BZDT>(deque: Deque$<BZDT>): Deque$<BZDT>;

export function is_logically_equal<BZDW>(
  a: Deque$<BZDW>,
  b: Deque$<BZDW>,
  element_is_equal: (x0: BZDW, x1: BZDW) => boolean
): boolean;

export function is_equal<BZEE>(a: Deque$<BZEE>, b: Deque$<BZEE>): boolean;

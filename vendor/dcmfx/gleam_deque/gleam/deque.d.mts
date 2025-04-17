import type * as _ from "../gleam.d.mts";

declare class Deque<BZCR> extends _.CustomType {
  constructor(in$: _.List<any>, out: _.List<any>);
  
  in$: _.List<any>;
  out: _.List<any>;
}

export type Deque$<BZCR> = Deque<BZCR>;

export function new$(): Deque$<any>;

export function from_list<BZCU>(list: _.List<BZCU>): Deque$<BZCU>;

export function to_list<BZCX>(deque: Deque$<BZCX>): _.List<BZCX>;

export function is_empty(deque: Deque$<any>): boolean;

export function length(deque: Deque$<any>): number;

export function push_back<BZDE>(deque: Deque$<BZDE>, item: BZDE): Deque$<BZDE>;

export function push_front<BZDH>(deque: Deque$<BZDH>, item: BZDH): Deque$<BZDH>;

export function pop_back<BZDK>(deque: Deque$<BZDK>): _.Result<
  [BZDK, Deque$<BZDK>],
  undefined
>;

export function pop_front<BZDP>(deque: Deque$<BZDP>): _.Result<
  [BZDP, Deque$<BZDP>],
  undefined
>;

export function reverse<BZDU>(deque: Deque$<BZDU>): Deque$<BZDU>;

export function is_logically_equal<BZDX>(
  a: Deque$<BZDX>,
  b: Deque$<BZDX>,
  element_is_equal: (x0: BZDX, x1: BZDX) => boolean
): boolean;

export function is_equal<BZEF>(a: Deque$<BZEF>, b: Deque$<BZEF>): boolean;

import type * as _ from "../gleam.d.mts";

declare class Deque<BYZQ> extends _.CustomType {
  constructor(in$: _.List<any>, out: _.List<any>);
  
  in$: _.List<any>;
  out: _.List<any>;
}

export type Deque$<BYZQ> = Deque<BYZQ>;

export function new$(): Deque$<any>;

export function from_list<BYZT>(list: _.List<BYZT>): Deque$<BYZT>;

export function to_list<BYZW>(deque: Deque$<BYZW>): _.List<BYZW>;

export function is_empty(deque: Deque$<any>): boolean;

export function length(deque: Deque$<any>): number;

export function push_back<BZAD>(deque: Deque$<BZAD>, item: BZAD): Deque$<BZAD>;

export function push_front<BZAG>(deque: Deque$<BZAG>, item: BZAG): Deque$<BZAG>;

export function pop_back<BZAJ>(deque: Deque$<BZAJ>): _.Result<
  [BZAJ, Deque$<BZAJ>],
  undefined
>;

export function pop_front<BZAO>(deque: Deque$<BZAO>): _.Result<
  [BZAO, Deque$<BZAO>],
  undefined
>;

export function reverse<BZAT>(deque: Deque$<BZAT>): Deque$<BZAT>;

export function is_logically_equal<BZAW>(
  a: Deque$<BZAW>,
  b: Deque$<BZAW>,
  element_is_equal: (x0: BZAW, x1: BZAW) => boolean
): boolean;

export function is_equal<BZBE>(a: Deque$<BZBE>, b: Deque$<BZBE>): boolean;

import type * as _ from "../gleam.d.mts";

declare class Deque<BWZN> extends _.CustomType {
  /** @deprecated */
  constructor(in$: _.List<any>, out: _.List<any>);
  /** @deprecated */
  in$: _.List<any>;
  /** @deprecated */
  out: _.List<any>;
}

export type Deque$<BWZN> = Deque<BWZN>;

export function new$(): Deque$<any>;

export function from_list<BWZQ>(list: _.List<BWZQ>): Deque$<BWZQ>;

export function to_list<BWZT>(deque: Deque$<BWZT>): _.List<BWZT>;

export function is_empty(deque: Deque$<any>): boolean;

export function length(deque: Deque$<any>): number;

export function push_back<BXAA>(deque: Deque$<BXAA>, item: BXAA): Deque$<BXAA>;

export function push_front<BXAD>(deque: Deque$<BXAD>, item: BXAD): Deque$<BXAD>;

export function pop_back<BXAG>(deque: Deque$<BXAG>): _.Result<
  [BXAG, Deque$<BXAG>],
  undefined
>;

export function pop_front<BXAL>(deque: Deque$<BXAL>): _.Result<
  [BXAL, Deque$<BXAL>],
  undefined
>;

export function reverse<BXAQ>(deque: Deque$<BXAQ>): Deque$<BXAQ>;

export function is_logically_equal<BXAT>(
  a: Deque$<BXAT>,
  b: Deque$<BXAT>,
  element_is_equal: (x0: BXAT, x1: BXAT) => boolean
): boolean;

export function is_equal<BXBB>(a: Deque$<BXBB>, b: Deque$<BXBB>): boolean;

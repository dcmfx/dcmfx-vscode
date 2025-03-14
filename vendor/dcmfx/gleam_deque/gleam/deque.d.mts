import type * as _ from "../gleam.d.mts";

declare class Deque<BZDF> extends _.CustomType {
  constructor(in$: _.List<any>, out: _.List<any>);
  
  in$: _.List<any>;
  out: _.List<any>;
}

export type Deque$<BZDF> = Deque<BZDF>;

export function new$(): Deque$<any>;

export function from_list<BZDI>(list: _.List<BZDI>): Deque$<BZDI>;

export function to_list<BZDL>(deque: Deque$<BZDL>): _.List<BZDL>;

export function is_empty(deque: Deque$<any>): boolean;

export function length(deque: Deque$<any>): number;

export function push_back<BZDS>(deque: Deque$<BZDS>, item: BZDS): Deque$<BZDS>;

export function push_front<BZDV>(deque: Deque$<BZDV>, item: BZDV): Deque$<BZDV>;

export function pop_back<BZDY>(deque: Deque$<BZDY>): _.Result<
  [BZDY, Deque$<BZDY>],
  undefined
>;

export function pop_front<BZED>(deque: Deque$<BZED>): _.Result<
  [BZED, Deque$<BZED>],
  undefined
>;

export function reverse<BZEI>(deque: Deque$<BZEI>): Deque$<BZEI>;

export function is_logically_equal<BZEL>(
  a: Deque$<BZEL>,
  b: Deque$<BZEL>,
  element_is_equal: (x0: BZEL, x1: BZEL) => boolean
): boolean;

export function is_equal<BZET>(a: Deque$<BZET>, b: Deque$<BZET>): boolean;

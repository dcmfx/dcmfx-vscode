import type * as _ from "../gleam.d.mts";

declare class Deque<BZBO> extends _.CustomType {
  constructor(in$: _.List<any>, out: _.List<any>);
  
  in$: _.List<any>;
  out: _.List<any>;
}

export type Deque$<BZBO> = Deque<BZBO>;

export function new$(): Deque$<any>;

export function from_list<BZBR>(list: _.List<BZBR>): Deque$<BZBR>;

export function to_list<BZBU>(deque: Deque$<BZBU>): _.List<BZBU>;

export function is_empty(deque: Deque$<any>): boolean;

export function length(deque: Deque$<any>): number;

export function push_back<BZCB>(deque: Deque$<BZCB>, item: BZCB): Deque$<BZCB>;

export function push_front<BZCE>(deque: Deque$<BZCE>, item: BZCE): Deque$<BZCE>;

export function pop_back<BZCH>(deque: Deque$<BZCH>): _.Result<
  [BZCH, Deque$<BZCH>],
  undefined
>;

export function pop_front<BZCM>(deque: Deque$<BZCM>): _.Result<
  [BZCM, Deque$<BZCM>],
  undefined
>;

export function reverse<BZCR>(deque: Deque$<BZCR>): Deque$<BZCR>;

export function is_logically_equal<BZCU>(
  a: Deque$<BZCU>,
  b: Deque$<BZCU>,
  element_is_equal: (x0: BZCU, x1: BZCU) => boolean
): boolean;

export function is_equal<BZDC>(a: Deque$<BZDC>, b: Deque$<BZDC>): boolean;

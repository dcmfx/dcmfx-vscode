import type * as _ from "../gleam.d.mts";

declare class Deque<BZBB> extends _.CustomType {
  constructor(in$: _.List<any>, out: _.List<any>);
  
  in$: _.List<any>;
  out: _.List<any>;
}

export type Deque$<BZBB> = Deque<BZBB>;

export function new$(): Deque$<any>;

export function from_list<BZBE>(list: _.List<BZBE>): Deque$<BZBE>;

export function to_list<BZBH>(deque: Deque$<BZBH>): _.List<BZBH>;

export function is_empty(deque: Deque$<any>): boolean;

export function length(deque: Deque$<any>): number;

export function push_back<BZBO>(deque: Deque$<BZBO>, item: BZBO): Deque$<BZBO>;

export function push_front<BZBR>(deque: Deque$<BZBR>, item: BZBR): Deque$<BZBR>;

export function pop_back<BZBU>(deque: Deque$<BZBU>): _.Result<
  [BZBU, Deque$<BZBU>],
  undefined
>;

export function pop_front<BZBZ>(deque: Deque$<BZBZ>): _.Result<
  [BZBZ, Deque$<BZBZ>],
  undefined
>;

export function reverse<BZCE>(deque: Deque$<BZCE>): Deque$<BZCE>;

export function is_logically_equal<BZCH>(
  a: Deque$<BZCH>,
  b: Deque$<BZCH>,
  element_is_equal: (x0: BZCH, x1: BZCH) => boolean
): boolean;

export function is_equal<BZCP>(a: Deque$<BZCP>, b: Deque$<BZCP>): boolean;

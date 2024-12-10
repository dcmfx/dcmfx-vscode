import type * as _ from "../gleam.d.mts";

declare class Queue<EWF> extends _.CustomType {
  constructor(in$: _.List<any>, out: _.List<any>);
  
  in$: _.List<any>;
  out: _.List<any>;
}

export type Queue$<EWF> = Queue<EWF>;

export function new$(): Queue$<any>;

export function from_list<EWI>(list: _.List<EWI>): Queue$<EWI>;

export function to_list<EWL>(queue: Queue$<EWL>): _.List<EWL>;

export function is_empty(queue: Queue$<any>): boolean;

export function length(queue: Queue$<any>): number;

export function push_back<EWS>(queue: Queue$<EWS>, item: EWS): Queue$<EWS>;

export function push_front<EWV>(queue: Queue$<EWV>, item: EWV): Queue$<EWV>;

export function pop_back<EWY>(queue: Queue$<EWY>): _.Result<
  [EWY, Queue$<EWY>],
  undefined
>;

export function pop_front<EXD>(queue: Queue$<EXD>): _.Result<
  [EXD, Queue$<EXD>],
  undefined
>;

export function reverse<EXI>(queue: Queue$<EXI>): Queue$<EXI>;

export function is_logically_equal<EXL>(
  a: Queue$<EXL>,
  b: Queue$<EXL>,
  element_is_equal: (x0: EXL, x1: EXL) => boolean
): boolean;

export function is_equal<EXT>(a: Queue$<EXT>, b: Queue$<EXT>): boolean;

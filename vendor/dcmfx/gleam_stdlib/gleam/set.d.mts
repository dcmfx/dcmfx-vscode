import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";

declare class Set<CVA> extends _.CustomType {
  /** @deprecated */
  constructor(dict: $dict.Dict$<any, undefined>);
  /** @deprecated */
  dict: $dict.Dict$<any, undefined>;
}

export type Set$<CVA> = Set<CVA>;

export function new$(): Set$<any>;

export function size(set: Set$<any>): number;

export function is_empty(set: Set$<any>): boolean;

export function contains<CVK>(set: Set$<CVK>, member: CVK): boolean;

export function delete$<CVM>(set: Set$<CVM>, member: CVM): Set$<CVM>;

export function to_list<CVP>(set: Set$<CVP>): _.List<CVP>;

export function fold<CVV, CVX>(
  set: Set$<CVV>,
  initial: CVX,
  reducer: (x0: CVX, x1: CVV) => CVX
): CVX;

export function filter<CVY>(set: Set$<CVY>, predicate: (x0: CVY) => boolean): Set$<
  CVY
>;

export function drop<CWF>(set: Set$<CWF>, disallowed: _.List<CWF>): Set$<CWF>;

export function take<CWJ>(set: Set$<CWJ>, desired: _.List<CWJ>): Set$<CWJ>;

export function intersection<CWW>(first: Set$<CWW>, second: Set$<CWW>): Set$<
  CWW
>;

export function difference<CXA>(first: Set$<CXA>, second: Set$<CXA>): Set$<CXA>;

export function is_subset<CXE>(first: Set$<CXE>, second: Set$<CXE>): boolean;

export function is_disjoint<CXH>(first: Set$<CXH>, second: Set$<CXH>): boolean;

export function each<CXO>(set: Set$<CXO>, fun: (x0: CXO) => any): undefined;

export function insert<CVH>(set: Set$<CVH>, member: CVH): Set$<CVH>;

export function from_list<CVS>(members: _.List<CVS>): Set$<CVS>;

export function map<CWB, CWD>(set: Set$<CWB>, fun: (x0: CWB) => CWD): Set$<CWD>;

export function union<CWN>(first: Set$<CWN>, second: Set$<CWN>): Set$<CWN>;

export function symmetric_difference<CXK>(first: Set$<CXK>, second: Set$<CXK>): Set$<
  CXK
>;

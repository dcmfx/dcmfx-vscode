import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";

declare class Set<CYO> extends _.CustomType {
  constructor(dict: $dict.Dict$<any, undefined>);
  
  dict: $dict.Dict$<any, undefined>;
}

export type Set$<CYO> = Set<CYO>;

export function new$(): Set$<any>;

export function size(set: Set$<any>): number;

export function is_empty(set: Set$<any>): boolean;

export function contains<CYY>(set: Set$<CYY>, member: CYY): boolean;

export function delete$<CZA>(set: Set$<CZA>, member: CZA): Set$<CZA>;

export function to_list<CZD>(set: Set$<CZD>): _.List<CZD>;

export function fold<CZJ, CZL>(
  set: Set$<CZJ>,
  initial: CZL,
  reducer: (x0: CZL, x1: CZJ) => CZL
): CZL;

export function filter<CZM>(set: Set$<CZM>, predicate: (x0: CZM) => boolean): Set$<
  CZM
>;

export function drop<CZT>(set: Set$<CZT>, disallowed: _.List<CZT>): Set$<CZT>;

export function take<CZX>(set: Set$<CZX>, desired: _.List<CZX>): Set$<CZX>;

export function intersection<DAK>(first: Set$<DAK>, second: Set$<DAK>): Set$<
  DAK
>;

export function difference<DAO>(first: Set$<DAO>, second: Set$<DAO>): Set$<DAO>;

export function is_subset<DAS>(first: Set$<DAS>, second: Set$<DAS>): boolean;

export function is_disjoint<DAV>(first: Set$<DAV>, second: Set$<DAV>): boolean;

export function each<DBC>(set: Set$<DBC>, fun: (x0: DBC) => any): undefined;

export function insert<CYV>(set: Set$<CYV>, member: CYV): Set$<CYV>;

export function from_list<CZG>(members: _.List<CZG>): Set$<CZG>;

export function map<CZP, CZR>(set: Set$<CZP>, fun: (x0: CZP) => CZR): Set$<CZR>;

export function union<DAB>(first: Set$<DAB>, second: Set$<DAB>): Set$<DAB>;

export function symmetric_difference<DAY>(first: Set$<DAY>, second: Set$<DAY>): Set$<
  DAY
>;

import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";

declare class Set<EJO> extends _.CustomType {
  constructor(dict: $dict.Dict$<any, undefined>);
  
  dict: $dict.Dict$<any, undefined>;
}

export type Set$<EJO> = Set<EJO>;

export function new$(): Set$<any>;

export function size(set: Set$<any>): number;

export function is_empty(set: Set$<any>): boolean;

export function contains<EJY>(set: Set$<EJY>, member: EJY): boolean;

export function delete$<EKA>(set: Set$<EKA>, member: EKA): Set$<EKA>;

export function to_list<EKD>(set: Set$<EKD>): _.List<EKD>;

export function fold<EKJ, EKL>(
  set: Set$<EKJ>,
  initial: EKL,
  reducer: (x0: EKL, x1: EKJ) => EKL
): EKL;

export function filter<EKM>(set: Set$<EKM>, predicate: (x0: EKM) => boolean): Set$<
  EKM
>;

export function drop<EKT>(set: Set$<EKT>, disallowed: _.List<EKT>): Set$<EKT>;

export function take<EKX>(set: Set$<EKX>, desired: _.List<EKX>): Set$<EKX>;

export function intersection<ELK>(first: Set$<ELK>, second: Set$<ELK>): Set$<
  ELK
>;

export function difference<ELO>(first: Set$<ELO>, second: Set$<ELO>): Set$<ELO>;

export function is_subset<ELS>(first: Set$<ELS>, second: Set$<ELS>): boolean;

export function is_disjoint<ELV>(first: Set$<ELV>, second: Set$<ELV>): boolean;

export function each<EMC>(set: Set$<EMC>, fun: (x0: EMC) => any): undefined;

export function insert<EJV>(set: Set$<EJV>, member: EJV): Set$<EJV>;

export function from_list<EKG>(members: _.List<EKG>): Set$<EKG>;

export function map<EKP, EKR>(set: Set$<EKP>, fun: (x0: EKP) => EKR): Set$<EKR>;

export function union<ELB>(first: Set$<ELB>, second: Set$<ELB>): Set$<ELB>;

export function symmetric_difference<ELY>(first: Set$<ELY>, second: Set$<ELY>): Set$<
  ELY
>;

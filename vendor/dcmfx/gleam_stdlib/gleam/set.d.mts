import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";

declare class Set<FBN> extends _.CustomType {
  constructor(dict: $dict.Dict$<any, undefined>);
  
  dict: $dict.Dict$<any, undefined>;
}

export type Set$<FBN> = Set<FBN>;

export function new$(): Set$<any>;

export function size(set: Set$<any>): number;

export function is_empty(set: Set$<any>): boolean;

export function contains<FBX>(set: Set$<FBX>, member: FBX): boolean;

export function delete$<FBZ>(set: Set$<FBZ>, member: FBZ): Set$<FBZ>;

export function to_list<FCC>(set: Set$<FCC>): _.List<FCC>;

export function fold<FCI, FCK>(
  set: Set$<FCI>,
  initial: FCK,
  reducer: (x0: FCK, x1: FCI) => FCK
): FCK;

export function filter<FCL>(set: Set$<FCL>, predicate: (x0: FCL) => boolean): Set$<
  FCL
>;

export function drop<FCS>(set: Set$<FCS>, disallowed: _.List<FCS>): Set$<FCS>;

export function take<FCW>(set: Set$<FCW>, desired: _.List<FCW>): Set$<FCW>;

export function intersection<FDJ>(first: Set$<FDJ>, second: Set$<FDJ>): Set$<
  FDJ
>;

export function difference<FDN>(first: Set$<FDN>, second: Set$<FDN>): Set$<FDN>;

export function is_subset<FDR>(first: Set$<FDR>, second: Set$<FDR>): boolean;

export function is_disjoint<FDU>(first: Set$<FDU>, second: Set$<FDU>): boolean;

export function each<FEB>(set: Set$<FEB>, fun: (x0: FEB) => any): undefined;

export function insert<FBU>(set: Set$<FBU>, member: FBU): Set$<FBU>;

export function from_list<FCF>(members: _.List<FCF>): Set$<FCF>;

export function map<FCO, FCQ>(set: Set$<FCO>, fun: (x0: FCO) => FCQ): Set$<FCQ>;

export function union<FDA>(first: Set$<FDA>, second: Set$<FDA>): Set$<FDA>;

export function symmetric_difference<FDX>(first: Set$<FDX>, second: Set$<FDX>): Set$<
  FDX
>;

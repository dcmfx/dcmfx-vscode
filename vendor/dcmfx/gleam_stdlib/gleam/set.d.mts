import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";

declare class Set<EGB> extends _.CustomType {
  constructor(dict: $dict.Dict$<any, undefined>);
  
  dict: $dict.Dict$<any, undefined>;
}

export type Set$<EGB> = Set<EGB>;

export function new$(): Set$<any>;

export function size(set: Set$<any>): number;

export function is_empty(set: Set$<any>): boolean;

export function contains<EGL>(set: Set$<EGL>, member: EGL): boolean;

export function delete$<EGN>(set: Set$<EGN>, member: EGN): Set$<EGN>;

export function to_list<EGQ>(set: Set$<EGQ>): _.List<EGQ>;

export function fold<EGW, EGY>(
  set: Set$<EGW>,
  initial: EGY,
  reducer: (x0: EGY, x1: EGW) => EGY
): EGY;

export function filter<EGZ>(set: Set$<EGZ>, predicate: (x0: EGZ) => boolean): Set$<
  EGZ
>;

export function drop<EHG>(set: Set$<EHG>, disallowed: _.List<EHG>): Set$<EHG>;

export function take<EHK>(set: Set$<EHK>, desired: _.List<EHK>): Set$<EHK>;

export function intersection<EHX>(first: Set$<EHX>, second: Set$<EHX>): Set$<
  EHX
>;

export function difference<EIB>(first: Set$<EIB>, second: Set$<EIB>): Set$<EIB>;

export function is_subset<EIF>(first: Set$<EIF>, second: Set$<EIF>): boolean;

export function is_disjoint<EII>(first: Set$<EII>, second: Set$<EII>): boolean;

export function each<EIP>(set: Set$<EIP>, fun: (x0: EIP) => any): undefined;

export function insert<EGI>(set: Set$<EGI>, member: EGI): Set$<EGI>;

export function from_list<EGT>(members: _.List<EGT>): Set$<EGT>;

export function map<EHC, EHE>(set: Set$<EHC>, fun: (x0: EHC) => EHE): Set$<EHE>;

export function union<EHO>(first: Set$<EHO>, second: Set$<EHO>): Set$<EHO>;

export function symmetric_difference<EIL>(first: Set$<EIL>, second: Set$<EIL>): Set$<
  EIL
>;

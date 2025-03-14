import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";

declare class Set<EGH> extends _.CustomType {
  constructor(dict: $dict.Dict$<any, undefined>);
  
  dict: $dict.Dict$<any, undefined>;
}

export type Set$<EGH> = Set<EGH>;

export function new$(): Set$<any>;

export function size(set: Set$<any>): number;

export function is_empty(set: Set$<any>): boolean;

export function contains<EGR>(set: Set$<EGR>, member: EGR): boolean;

export function delete$<EGT>(set: Set$<EGT>, member: EGT): Set$<EGT>;

export function to_list<EGW>(set: Set$<EGW>): _.List<EGW>;

export function fold<EHC, EHE>(
  set: Set$<EHC>,
  initial: EHE,
  reducer: (x0: EHE, x1: EHC) => EHE
): EHE;

export function filter<EHF>(set: Set$<EHF>, predicate: (x0: EHF) => boolean): Set$<
  EHF
>;

export function drop<EHM>(set: Set$<EHM>, disallowed: _.List<EHM>): Set$<EHM>;

export function take<EHQ>(set: Set$<EHQ>, desired: _.List<EHQ>): Set$<EHQ>;

export function intersection<EID>(first: Set$<EID>, second: Set$<EID>): Set$<
  EID
>;

export function difference<EIH>(first: Set$<EIH>, second: Set$<EIH>): Set$<EIH>;

export function is_subset<EIL>(first: Set$<EIL>, second: Set$<EIL>): boolean;

export function is_disjoint<EIO>(first: Set$<EIO>, second: Set$<EIO>): boolean;

export function each<EIV>(set: Set$<EIV>, fun: (x0: EIV) => any): undefined;

export function insert<EGO>(set: Set$<EGO>, member: EGO): Set$<EGO>;

export function from_list<EGZ>(members: _.List<EGZ>): Set$<EGZ>;

export function map<EHI, EHK>(set: Set$<EHI>, fun: (x0: EHI) => EHK): Set$<EHK>;

export function union<EHU>(first: Set$<EHU>, second: Set$<EHU>): Set$<EHU>;

export function symmetric_difference<EIR>(first: Set$<EIR>, second: Set$<EIR>): Set$<
  EIR
>;

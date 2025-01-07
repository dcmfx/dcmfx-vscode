import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";

declare class Set<EGI> extends _.CustomType {
  constructor(dict: $dict.Dict$<any, undefined>);
  
  dict: $dict.Dict$<any, undefined>;
}

export type Set$<EGI> = Set<EGI>;

export function new$(): Set$<any>;

export function size(set: Set$<any>): number;

export function is_empty(set: Set$<any>): boolean;

export function contains<EGS>(set: Set$<EGS>, member: EGS): boolean;

export function delete$<EGU>(set: Set$<EGU>, member: EGU): Set$<EGU>;

export function to_list<EGX>(set: Set$<EGX>): _.List<EGX>;

export function fold<EHD, EHF>(
  set: Set$<EHD>,
  initial: EHF,
  reducer: (x0: EHF, x1: EHD) => EHF
): EHF;

export function filter<EHG>(set: Set$<EHG>, predicate: (x0: EHG) => boolean): Set$<
  EHG
>;

export function drop<EHN>(set: Set$<EHN>, disallowed: _.List<EHN>): Set$<EHN>;

export function take<EHR>(set: Set$<EHR>, desired: _.List<EHR>): Set$<EHR>;

export function intersection<EIE>(first: Set$<EIE>, second: Set$<EIE>): Set$<
  EIE
>;

export function difference<EII>(first: Set$<EII>, second: Set$<EII>): Set$<EII>;

export function is_subset<EIM>(first: Set$<EIM>, second: Set$<EIM>): boolean;

export function is_disjoint<EIP>(first: Set$<EIP>, second: Set$<EIP>): boolean;

export function each<EIW>(set: Set$<EIW>, fun: (x0: EIW) => any): undefined;

export function insert<EGP>(set: Set$<EGP>, member: EGP): Set$<EGP>;

export function from_list<EHA>(members: _.List<EHA>): Set$<EHA>;

export function map<EHJ, EHL>(set: Set$<EHJ>, fun: (x0: EHJ) => EHL): Set$<EHL>;

export function union<EHV>(first: Set$<EHV>, second: Set$<EHV>): Set$<EHV>;

export function symmetric_difference<EIS>(first: Set$<EIS>, second: Set$<EIS>): Set$<
  EIS
>;

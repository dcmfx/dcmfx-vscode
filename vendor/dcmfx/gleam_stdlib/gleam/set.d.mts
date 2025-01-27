import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";

declare class Set<EEZ> extends _.CustomType {
  constructor(dict: $dict.Dict$<any, undefined>);
  
  dict: $dict.Dict$<any, undefined>;
}

export type Set$<EEZ> = Set<EEZ>;

export function new$(): Set$<any>;

export function size(set: Set$<any>): number;

export function is_empty(set: Set$<any>): boolean;

export function contains<EFJ>(set: Set$<EFJ>, member: EFJ): boolean;

export function delete$<EFL>(set: Set$<EFL>, member: EFL): Set$<EFL>;

export function to_list<EFO>(set: Set$<EFO>): _.List<EFO>;

export function fold<EFU, EFW>(
  set: Set$<EFU>,
  initial: EFW,
  reducer: (x0: EFW, x1: EFU) => EFW
): EFW;

export function filter<EFX>(set: Set$<EFX>, predicate: (x0: EFX) => boolean): Set$<
  EFX
>;

export function drop<EGE>(set: Set$<EGE>, disallowed: _.List<EGE>): Set$<EGE>;

export function take<EGI>(set: Set$<EGI>, desired: _.List<EGI>): Set$<EGI>;

export function intersection<EGV>(first: Set$<EGV>, second: Set$<EGV>): Set$<
  EGV
>;

export function difference<EGZ>(first: Set$<EGZ>, second: Set$<EGZ>): Set$<EGZ>;

export function is_subset<EHD>(first: Set$<EHD>, second: Set$<EHD>): boolean;

export function is_disjoint<EHG>(first: Set$<EHG>, second: Set$<EHG>): boolean;

export function each<EHN>(set: Set$<EHN>, fun: (x0: EHN) => any): undefined;

export function insert<EFG>(set: Set$<EFG>, member: EFG): Set$<EFG>;

export function from_list<EFR>(members: _.List<EFR>): Set$<EFR>;

export function map<EGA, EGC>(set: Set$<EGA>, fun: (x0: EGA) => EGC): Set$<EGC>;

export function union<EGM>(first: Set$<EGM>, second: Set$<EGM>): Set$<EGM>;

export function symmetric_difference<EHJ>(first: Set$<EHJ>, second: Set$<EHJ>): Set$<
  EHJ
>;

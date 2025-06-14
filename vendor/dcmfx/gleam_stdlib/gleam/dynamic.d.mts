import type * as _ from "../gleam.d.mts";

export type Dynamic$ = unknown;

export function classify(data: Dynamic$): string;

export function from(a: any): Dynamic$;

export function bool(a: boolean): Dynamic$;

export function string(a: string): Dynamic$;

export function float(a: number): Dynamic$;

export function int(a: number): Dynamic$;

export function bit_array(a: _.BitArray): Dynamic$;

export function list(a: _.List<Dynamic$>): Dynamic$;

export function array(a: _.List<Dynamic$>): Dynamic$;

export function properties(entries: _.List<[Dynamic$, Dynamic$]>): Dynamic$;

export function nil(): Dynamic$;

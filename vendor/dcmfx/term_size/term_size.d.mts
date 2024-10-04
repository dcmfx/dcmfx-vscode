import type * as _ from "./gleam.d.mts";

export function get(): _.Result<[number, number], undefined>;

export function rows(): _.Result<number, undefined>;

export function columns(): _.Result<number, undefined>;

import type * as $dict from "../gleam_stdlib/gleam/dict.d.mts";
import type * as _ from "./gleam.d.mts";

export function get(name: string): _.Result<string, undefined>;

export function set(name: string, value: string): undefined;

export function unset(name: string): undefined;

export function all(): $dict.Dict$<string, string>;

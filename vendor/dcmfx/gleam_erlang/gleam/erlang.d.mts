import type * as $dynamic from "../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $atom from "../gleam/erlang/atom.d.mts";
import type * as $charlist from "../gleam/erlang/charlist.d.mts";

declare class Safe extends _.CustomType {
  private __gleam__gleam__erlang__Safe: never;
}

declare type Safe$ = Safe;

export class Eof extends _.CustomType {
  private __gleam__gleam__erlang__Eof: never;
}

export class NoData extends _.CustomType {
  private __gleam__gleam__erlang__NoData: never;
}

export type GetLineError$ = Eof | NoData;

export class Second extends _.CustomType {
  private __gleam__gleam__erlang__Second: never;
}

export class Millisecond extends _.CustomType {
  private __gleam__gleam__erlang__Millisecond: never;
}

export class Microsecond extends _.CustomType {
  private __gleam__gleam__erlang__Microsecond: never;
}

export class Nanosecond extends _.CustomType {
  private __gleam__gleam__erlang__Nanosecond: never;
}

export type TimeUnit$ = Second | Millisecond | Microsecond | Nanosecond;

export class Exited extends _.CustomType {
  private __gleam__gleam__erlang__Exited: never;

  constructor(argument$0: $dynamic.Dynamic$);
  
  0: $dynamic.Dynamic$;
}

export class Thrown extends _.CustomType {
  private __gleam__gleam__erlang__Thrown: never;

  constructor(argument$0: $dynamic.Dynamic$);
  
  0: $dynamic.Dynamic$;
}

export class Errored extends _.CustomType {
  private __gleam__gleam__erlang__Errored: never;

  constructor(argument$0: $dynamic.Dynamic$);
  
  0: $dynamic.Dynamic$;
}

export type Crash$ = Exited | Thrown | Errored;

export class UnknownApplication extends _.CustomType {
  private __gleam__gleam__erlang__UnknownApplication: never;

  constructor(name: $atom.Atom$);
  
  name: $atom.Atom$;
}

export class ApplicationFailedToStart extends _.CustomType {
  private __gleam__gleam__erlang__ApplicationFailedToStart: never;

  constructor(name: $atom.Atom$, reason: $dynamic.Dynamic$);
  
  name: $atom.Atom$;
  reason: $dynamic.Dynamic$;
}

export type EnsureAllStartedError$ = UnknownApplication | ApplicationFailedToStart;

export type Reference$ = {
  __gleam__gleam__erlang__Reference: never;
};

export function format(term: any): string;

export function term_to_binary(a: any): _.BitArray;

export function get_line(prompt: string): _.Result<string, GetLineError$>;

export function system_time(a: TimeUnit$): number;

export function erlang_timestamp(): [number, number, number];

export function rescue<GJT>(a: () => GJT): _.Result<GJT, Crash$>;

export function binary_to_term(binary: _.BitArray): _.Result<
  $dynamic.Dynamic$,
  undefined
>;

export function unsafe_binary_to_term(binary: _.BitArray): _.Result<
  $dynamic.Dynamic$,
  undefined
>;

export function start_arguments(): _.List<string>;

export function ensure_all_started(application: $atom.Atom$): _.Result<
  _.List<$atom.Atom$>,
  EnsureAllStartedError$
>;

export function make_reference(): Reference$;

export function priv_directory(name: string): _.Result<string, undefined>;

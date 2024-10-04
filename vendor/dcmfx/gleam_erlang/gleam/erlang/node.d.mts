import type * as _ from "../../gleam.d.mts";
import type * as $atom from "../../gleam/erlang/atom.d.mts";

export type Node$ = {
  __gleam__gleam__erlang__node__Node: never;
};

declare type DoNotLeak$ = {
  __gleam__gleam__erlang__node__DoNotLeak: never;
};

export class FailedToConnect extends _.CustomType {
  private __gleam__gleam__erlang__node__FailedToConnect: never;
}

export class LocalNodeIsNotAlive extends _.CustomType {
  private __gleam__gleam__erlang__node__LocalNodeIsNotAlive: never;
}

export type ConnectError$ = FailedToConnect | LocalNodeIsNotAlive;

export function self(): Node$;

export function visible(): _.List<Node$>;

export function connect(node: $atom.Atom$): _.Result<Node$, ConnectError$>;

export function send(node: Node$, name: $atom.Atom$, message: any): undefined;

export function to_atom(node: Node$): $atom.Atom$;

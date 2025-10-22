import type * as _ from "../../../gleam.d.mts";

export class None extends _.CustomType {}
export function FlushCommand$None(): FlushCommand$;
export function FlushCommand$isNone(value: FlushCommand$): boolean;

export class Sync extends _.CustomType {}
export function FlushCommand$Sync(): FlushCommand$;
export function FlushCommand$isSync(value: FlushCommand$): boolean;

export class Full extends _.CustomType {}
export function FlushCommand$Full(): FlushCommand$;
export function FlushCommand$isFull(value: FlushCommand$): boolean;

export class Finish extends _.CustomType {}
export function FlushCommand$Finish(): FlushCommand$;
export function FlushCommand$isFinish(value: FlushCommand$): boolean;

export type FlushCommand$ = None | Sync | Full | Finish;

/// <reference types="./flush_command.d.mts" />
import { CustomType as $CustomType } from "../../../gleam.mjs";

export class None extends $CustomType {}
export const FlushCommand$None = () => new None();
export const FlushCommand$isNone = (value) => value instanceof None;

export class Sync extends $CustomType {}
export const FlushCommand$Sync = () => new Sync();
export const FlushCommand$isSync = (value) => value instanceof Sync;

export class Full extends $CustomType {}
export const FlushCommand$Full = () => new Full();
export const FlushCommand$isFull = (value) => value instanceof Full;

export class Finish extends $CustomType {}
export const FlushCommand$Finish = () => new Finish();
export const FlushCommand$isFinish = (value) => value instanceof Finish;

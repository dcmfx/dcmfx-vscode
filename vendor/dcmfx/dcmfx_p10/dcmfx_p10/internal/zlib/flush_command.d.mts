import type * as _ from "../../../gleam.d.mts";

export class None extends _.CustomType {}

export class Sync extends _.CustomType {}

export class Full extends _.CustomType {}

export class Finish extends _.CustomType {}

export type FlushCommand$ = None | Sync | Full | Finish;

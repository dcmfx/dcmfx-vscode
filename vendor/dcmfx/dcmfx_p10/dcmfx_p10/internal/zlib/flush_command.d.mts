import type * as _ from "../../../gleam.d.mts";

export class None extends _.CustomType {
  private __gleam__dcmfx_p10__internal__zlib__flush_command__None: never;
}

export class Sync extends _.CustomType {
  private __gleam__dcmfx_p10__internal__zlib__flush_command__Sync: never;
}

export class Full extends _.CustomType {
  private __gleam__dcmfx_p10__internal__zlib__flush_command__Full: never;
}

export class Finish extends _.CustomType {
  private __gleam__dcmfx_p10__internal__zlib__flush_command__Finish: never;
}

export type FlushCommand$ = None | Sync | Full | Finish;

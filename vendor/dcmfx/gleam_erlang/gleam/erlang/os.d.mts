import type * as _ from "../../gleam.d.mts";

export class WindowsNt extends _.CustomType {}

export class Linux extends _.CustomType {}

export class Darwin extends _.CustomType {}

export class FreeBsd extends _.CustomType {}

export class Other extends _.CustomType {
  constructor(argument$0: string);
  
  0: string;
}

export type OsFamily$ = WindowsNt | Linux | Darwin | FreeBsd | Other;

export function family(): OsFamily$;

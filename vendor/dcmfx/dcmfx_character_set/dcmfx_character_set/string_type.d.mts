import type * as _ from "../gleam.d.mts";

export class SingleValue extends _.CustomType {}

export class MultiValue extends _.CustomType {}

export class PersonName extends _.CustomType {}

export type StringType$ = SingleValue | MultiValue | PersonName;

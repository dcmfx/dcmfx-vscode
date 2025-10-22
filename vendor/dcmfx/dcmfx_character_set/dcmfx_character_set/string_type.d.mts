import type * as _ from "../gleam.d.mts";

export class SingleValue extends _.CustomType {}
export function StringType$SingleValue(): StringType$;
export function StringType$isSingleValue(value: StringType$): boolean;

export class MultiValue extends _.CustomType {}
export function StringType$MultiValue(): StringType$;
export function StringType$isMultiValue(value: StringType$): boolean;

export class PersonName extends _.CustomType {}
export function StringType$PersonName(): StringType$;
export function StringType$isPersonName(value: StringType$): boolean;

export type StringType$ = SingleValue | MultiValue | PersonName;

/// <reference types="./string_type.d.mts" />
import { CustomType as $CustomType } from "../gleam.mjs";

export class SingleValue extends $CustomType {}
export const StringType$SingleValue = () => new SingleValue();
export const StringType$isSingleValue = (value) => value instanceof SingleValue;

export class MultiValue extends $CustomType {}
export const StringType$MultiValue = () => new MultiValue();
export const StringType$isMultiValue = (value) => value instanceof MultiValue;

export class PersonName extends $CustomType {}
export const StringType$PersonName = () => new PersonName();
export const StringType$isPersonName = (value) => value instanceof PersonName;

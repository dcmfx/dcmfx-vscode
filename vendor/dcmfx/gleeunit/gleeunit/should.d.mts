import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export function equal<CCSE>(a: CCSE, b: CCSE): undefined;

export function not_equal<CCSF>(a: CCSF, b: CCSF): undefined;

export function be_ok<CCSG>(a: _.Result<CCSG, any>): CCSG;

export function be_error<CCSL>(a: _.Result<any, CCSL>): CCSL;

export function be_some<CCSO>(a: $option.Option$<CCSO>): CCSO;

export function be_none(a: $option.Option$<any>): undefined;

export function be_true(actual: boolean): undefined;

export function be_false(actual: boolean): undefined;

export function fail(): undefined;

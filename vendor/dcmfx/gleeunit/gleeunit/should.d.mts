import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export function equal<CCUY>(a: CCUY, b: CCUY): undefined;

export function not_equal<CCUZ>(a: CCUZ, b: CCUZ): undefined;

export function be_ok<CCVA>(a: _.Result<CCVA, any>): CCVA;

export function be_error<CCVF>(a: _.Result<any, CCVF>): CCVF;

export function be_some<CCVI>(a: $option.Option$<CCVI>): CCVI;

export function be_none(a: $option.Option$<any>): undefined;

export function be_true(actual: boolean): undefined;

export function be_false(actual: boolean): undefined;

export function fail(): undefined;

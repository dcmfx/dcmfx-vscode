import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export function equal<CCWT>(a: CCWT, b: CCWT): undefined;

export function not_equal<CCWU>(a: CCWU, b: CCWU): undefined;

export function be_ok<CCWV>(a: _.Result<CCWV, any>): CCWV;

export function be_error<CCXA>(a: _.Result<any, CCXA>): CCXA;

export function be_some<CCXD>(a: $option.Option$<CCXD>): CCXD;

export function be_none(a: $option.Option$<any>): undefined;

export function be_true(actual: boolean): undefined;

export function be_false(actual: boolean): undefined;

export function fail(): undefined;

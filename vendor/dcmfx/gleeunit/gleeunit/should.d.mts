import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export function equal<CCUB>(a: CCUB, b: CCUB): undefined;

export function not_equal<CCUC>(a: CCUC, b: CCUC): undefined;

export function be_ok<CCUD>(a: _.Result<CCUD, any>): CCUD;

export function be_error<CCUI>(a: _.Result<any, CCUI>): CCUI;

export function be_some<CCUL>(a: $option.Option$<CCUL>): CCUL;

export function be_none(a: $option.Option$<any>): undefined;

export function be_true(actual: boolean): undefined;

export function be_false(actual: boolean): undefined;

export function fail(): undefined;

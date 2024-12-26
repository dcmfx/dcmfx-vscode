import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export function equal<CCGR>(a: CCGR, b: CCGR): undefined;

export function not_equal<CCGS>(a: CCGS, b: CCGS): undefined;

export function be_ok<CCGT>(a: _.Result<CCGT, any>): CCGT;

export function be_error<CCGY>(a: _.Result<any, CCGY>): CCGY;

export function be_some<CCHB>(a: $option.Option$<CCHB>): CCHB;

export function be_none(a: $option.Option$<any>): undefined;

export function be_true(actual: boolean): undefined;

export function be_false(actual: boolean): undefined;

export function fail(): undefined;

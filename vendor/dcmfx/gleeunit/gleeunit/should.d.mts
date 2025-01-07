import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export function equal<CCDX>(a: CCDX, b: CCDX): undefined;

export function not_equal<CCDY>(a: CCDY, b: CCDY): undefined;

export function be_ok<CCDZ>(a: _.Result<CCDZ, any>): CCDZ;

export function be_error<CCEE>(a: _.Result<any, CCEE>): CCEE;

export function be_some<CCEH>(a: $option.Option$<CCEH>): CCEH;

export function be_none(a: $option.Option$<any>): undefined;

export function be_true(actual: boolean): undefined;

export function be_false(actual: boolean): undefined;

export function fail(): undefined;

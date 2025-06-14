import type * as _ from "../gleam.d.mts";

export class Some<GA> extends _.CustomType {
  constructor(argument$0: GA);
  
  0: GA;
}

export class None extends _.CustomType {}

export type Option$<GA> = Some<GA> | None;

export function all<GB>(list: _.List<Option$<GB>>): Option$<_.List<GB>>;

export function is_some(option: Option$<any>): boolean;

export function is_none(option: Option$<any>): boolean;

export function to_result<GX, HA>(option: Option$<GX>, e: HA): _.Result<GX, HA>;

export function from_result<HD>(result: _.Result<HD, any>): Option$<HD>;

export function unwrap<HI>(option: Option$<HI>, default$: HI): HI;

export function lazy_unwrap<HK>(option: Option$<HK>, default$: () => HK): HK;

export function map<HM, HO>(option: Option$<HM>, fun: (x0: HM) => HO): Option$<
  HO
>;

export function flatten<HQ>(option: Option$<Option$<HQ>>): Option$<HQ>;

export function then$<HU, HW>(option: Option$<HU>, fun: (x0: HU) => Option$<HW>): Option$<
  HW
>;

export function or<HZ>(first: Option$<HZ>, second: Option$<HZ>): Option$<HZ>;

export function lazy_or<ID>(first: Option$<ID>, second: () => Option$<ID>): Option$<
  ID
>;

export function values<IH>(options: _.List<Option$<IH>>): _.List<IH>;

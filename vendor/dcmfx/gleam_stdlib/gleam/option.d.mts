import type * as _ from "../gleam.d.mts";

export class Some<FZ> extends _.CustomType {
  constructor(argument$0: FZ);
  
  0: FZ;
}

export class None extends _.CustomType {}

export type Option$<FZ> = Some<FZ> | None;

export function all<GA>(list: _.List<Option$<GA>>): Option$<_.List<GA>>;

export function is_some(option: Option$<any>): boolean;

export function is_none(option: Option$<any>): boolean;

export function to_result<GP, GS>(option: Option$<GP>, e: GS): _.Result<GP, GS>;

export function from_result<GV>(result: _.Result<GV, any>): Option$<GV>;

export function unwrap<HA>(option: Option$<HA>, default$: HA): HA;

export function lazy_unwrap<HC>(option: Option$<HC>, default$: () => HC): HC;

export function map<HE, HG>(option: Option$<HE>, fun: (x0: HE) => HG): Option$<
  HG
>;

export function flatten<HI>(option: Option$<Option$<HI>>): Option$<HI>;

export function then$<HM, HO>(option: Option$<HM>, fun: (x0: HM) => Option$<HO>): Option$<
  HO
>;

export function or<HR>(first: Option$<HR>, second: Option$<HR>): Option$<HR>;

export function lazy_or<HV>(first: Option$<HV>, second: () => Option$<HV>): Option$<
  HV
>;

export function values<HZ>(options: _.List<Option$<HZ>>): _.List<HZ>;

import type * as _ from "../gleam.d.mts";

export class Some<FQ> extends _.CustomType {
  constructor(argument$0: FQ);
  
  0: FQ;
}

export class None extends _.CustomType {}

export type Option$<FQ> = Some<FQ> | None;

export function all<FR>(list: _.List<Option$<FR>>): Option$<_.List<FR>>;

export function is_some(option: Option$<any>): boolean;

export function is_none(option: Option$<any>): boolean;

export function to_result<GG, GJ>(option: Option$<GG>, e: GJ): _.Result<GG, GJ>;

export function from_result<GM>(result: _.Result<GM, any>): Option$<GM>;

export function unwrap<GR>(option: Option$<GR>, default$: GR): GR;

export function lazy_unwrap<GT>(option: Option$<GT>, default$: () => GT): GT;

export function map<GV, GX>(option: Option$<GV>, fun: (x0: GV) => GX): Option$<
  GX
>;

export function flatten<GZ>(option: Option$<Option$<GZ>>): Option$<GZ>;

export function then$<HD, HF>(option: Option$<HD>, fun: (x0: HD) => Option$<HF>): Option$<
  HF
>;

export function or<HI>(first: Option$<HI>, second: Option$<HI>): Option$<HI>;

export function lazy_or<HM>(first: Option$<HM>, second: () => Option$<HM>): Option$<
  HM
>;

export function values<HQ>(options: _.List<Option$<HQ>>): _.List<HQ>;

import type * as _ from "../gleam.d.mts";

export class Some<FE> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: FE);
  /** @deprecated */
  0: FE;
}
export function Option$Some<FE>($0: FE): Option$<FE>;
export function Option$isSome<FE>(value: Option$<FE>): boolean;
export function Option$Some$0<FE>(value: Option$<FE>): FE;

export class None extends _.CustomType {}
export function Option$None<FE>(): Option$<FE>;
export function Option$isNone<FE>(value: Option$<FE>): boolean;

export type Option$<FE> = Some<FE> | None;

export function all<FF>(list: _.List<Option$<FF>>): Option$<_.List<FF>>;

export function is_some(option: Option$<any>): boolean;

export function is_none(option: Option$<any>): boolean;

export function to_result<GB, GE>(option: Option$<GB>, e: GE): _.Result<GB, GE>;

export function from_result<GH>(result: _.Result<GH, any>): Option$<GH>;

export function unwrap<GM>(option: Option$<GM>, default$: GM): GM;

export function lazy_unwrap<GO>(option: Option$<GO>, default$: () => GO): GO;

export function map<GQ, GS>(option: Option$<GQ>, fun: (x0: GQ) => GS): Option$<
  GS
>;

export function flatten<GU>(option: Option$<Option$<GU>>): Option$<GU>;

export function then$<GY, HA>(option: Option$<GY>, fun: (x0: GY) => Option$<HA>): Option$<
  HA
>;

export function or<HD>(first: Option$<HD>, second: Option$<HD>): Option$<HD>;

export function lazy_or<HH>(first: Option$<HH>, second: () => Option$<HH>): Option$<
  HH
>;

export function values<HL>(options: _.List<Option$<HL>>): _.List<HL>;

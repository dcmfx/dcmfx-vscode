import type * as _ from "../../../gleam.d.mts";

export class Continue extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function InflateResult$Continue($0: _.BitArray): InflateResult$;
export function InflateResult$isContinue(value: InflateResult$): boolean;
export function InflateResult$Continue$0(value: InflateResult$): _.BitArray;

export class Finished extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function InflateResult$Finished($0: _.BitArray): InflateResult$;
export function InflateResult$isFinished(value: InflateResult$): boolean;
export function InflateResult$Finished$0(value: InflateResult$): _.BitArray;

export type InflateResult$ = Continue | Finished;

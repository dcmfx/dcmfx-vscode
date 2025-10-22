/// <reference types="./inflate_result.d.mts" />
import { CustomType as $CustomType } from "../../../gleam.mjs";

export class Continue extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const InflateResult$Continue = ($0) => new Continue($0);
export const InflateResult$isContinue = (value) => value instanceof Continue;
export const InflateResult$Continue$0 = (value) => value[0];

export class Finished extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const InflateResult$Finished = ($0) => new Finished($0);
export const InflateResult$isFinished = (value) => value instanceof Finished;
export const InflateResult$Finished$0 = (value) => value[0];

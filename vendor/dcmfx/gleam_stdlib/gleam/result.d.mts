import type * as _ from "../gleam.d.mts";

export function is_ok(result: _.Result<any, any>): boolean;

export function is_error(result: _.Result<any, any>): boolean;

export function map<BYC, BYD, BYG>(
  result: _.Result<BYC, BYD>,
  fun: (x0: BYC) => BYG
): _.Result<BYG, BYD>;

export function map_error<BYJ, BYK, BYN>(
  result: _.Result<BYJ, BYK>,
  fun: (x0: BYK) => BYN
): _.Result<BYJ, BYN>;

export function flatten<BYQ, BYR>(result: _.Result<_.Result<BYQ, BYR>, BYR>): _.Result<
  BYQ,
  BYR
>;

export function try$<BYY, BYZ, BZC>(
  result: _.Result<BYY, BYZ>,
  fun: (x0: BYY) => _.Result<BZC, BYZ>
): _.Result<BZC, BYZ>;

export function then$<BZH, BZI, BZL>(
  result: _.Result<BZH, BZI>,
  fun: (x0: BZH) => _.Result<BZL, BZI>
): _.Result<BZL, BZI>;

export function unwrap<BZQ>(result: _.Result<BZQ, any>, default$: BZQ): BZQ;

export function lazy_unwrap<BZU>(
  result: _.Result<BZU, any>,
  default$: () => BZU
): BZU;

export function unwrap_error<BZZ>(result: _.Result<any, BZZ>, default$: BZZ): BZZ;

export function unwrap_both<CAC>(result: _.Result<CAC, CAC>): CAC;

export function or<CAL, CAM>(
  first: _.Result<CAL, CAM>,
  second: _.Result<CAL, CAM>
): _.Result<CAL, CAM>;

export function lazy_or<CAT, CAU>(
  first: _.Result<CAT, CAU>,
  second: () => _.Result<CAT, CAU>
): _.Result<CAT, CAU>;

export function all<CBB, CBC>(results: _.List<_.Result<CBB, CBC>>): _.Result<
  _.List<CBB>,
  CBC
>;

export function partition<CBJ, CBK>(results: _.List<_.Result<CBJ, CBK>>): [
  _.List<CBJ>,
  _.List<CBK>
];

export function replace<CBZ, CCC>(result: _.Result<any, CBZ>, value: CCC): _.Result<
  CCC,
  CBZ
>;

export function replace_error<CCF, CCJ>(result: _.Result<CCF, any>, error: CCJ): _.Result<
  CCF,
  CCJ
>;

export function nil_error<CAF>(result: _.Result<CAF, any>): _.Result<
  CAF,
  undefined
>;

export function values<CCM>(results: _.List<_.Result<CCM, any>>): _.List<CCM>;

export function try_recover<CCS, CCT, CCW>(
  result: _.Result<CCS, CCT>,
  fun: (x0: CCT) => _.Result<CCS, CCW>
): _.Result<CCS, CCW>;

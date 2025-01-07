import type * as _ from "../gleam.d.mts";

export function is_ok(result: _.Result<any, any>): boolean;

export function is_error(result: _.Result<any, any>): boolean;

export function map<BXT, BXU, BXX>(
  result: _.Result<BXT, BXU>,
  fun: (x0: BXT) => BXX
): _.Result<BXX, BXU>;

export function map_error<BYA, BYB, BYE>(
  result: _.Result<BYA, BYB>,
  fun: (x0: BYB) => BYE
): _.Result<BYA, BYE>;

export function flatten<BYH, BYI>(result: _.Result<_.Result<BYH, BYI>, BYI>): _.Result<
  BYH,
  BYI
>;

export function try$<BYP, BYQ, BYT>(
  result: _.Result<BYP, BYQ>,
  fun: (x0: BYP) => _.Result<BYT, BYQ>
): _.Result<BYT, BYQ>;

export function then$<BYY, BYZ, BZC>(
  result: _.Result<BYY, BYZ>,
  fun: (x0: BYY) => _.Result<BZC, BYZ>
): _.Result<BZC, BYZ>;

export function unwrap<BZH>(result: _.Result<BZH, any>, default$: BZH): BZH;

export function lazy_unwrap<BZL>(
  result: _.Result<BZL, any>,
  default$: () => BZL
): BZL;

export function unwrap_error<BZQ>(result: _.Result<any, BZQ>, default$: BZQ): BZQ;

export function unwrap_both<BZT>(result: _.Result<BZT, BZT>): BZT;

export function or<BZW, BZX>(
  first: _.Result<BZW, BZX>,
  second: _.Result<BZW, BZX>
): _.Result<BZW, BZX>;

export function lazy_or<CAE, CAF>(
  first: _.Result<CAE, CAF>,
  second: () => _.Result<CAE, CAF>
): _.Result<CAE, CAF>;

export function all<CAM, CAN>(results: _.List<_.Result<CAM, CAN>>): _.Result<
  _.List<CAM>,
  CAN
>;

export function partition<CAU, CAV>(results: _.List<_.Result<CAU, CAV>>): [
  _.List<CAU>,
  _.List<CAV>
];

export function replace<CBK, CBN>(result: _.Result<any, CBK>, value: CBN): _.Result<
  CBN,
  CBK
>;

export function replace_error<CBQ, CBU>(result: _.Result<CBQ, any>, error: CBU): _.Result<
  CBQ,
  CBU
>;

export function values<CBX>(results: _.List<_.Result<CBX, any>>): _.List<CBX>;

export function try_recover<CCD, CCE, CCH>(
  result: _.Result<CCD, CCE>,
  fun: (x0: CCE) => _.Result<CCD, CCH>
): _.Result<CCD, CCH>;

import type * as _ from "../gleam.d.mts";

export function is_ok(result: _.Result<any, any>): boolean;

export function is_error(result: _.Result<any, any>): boolean;

export function map<BWA, BWB, BWE>(
  result: _.Result<BWA, BWB>,
  fun: (x0: BWA) => BWE
): _.Result<BWE, BWB>;

export function map_error<BWH, BWI, BWL>(
  result: _.Result<BWH, BWI>,
  fun: (x0: BWI) => BWL
): _.Result<BWH, BWL>;

export function flatten<BWO, BWP>(result: _.Result<_.Result<BWO, BWP>, BWP>): _.Result<
  BWO,
  BWP
>;

export function try$<BWW, BWX, BXA>(
  result: _.Result<BWW, BWX>,
  fun: (x0: BWW) => _.Result<BXA, BWX>
): _.Result<BXA, BWX>;

export function then$<BXF, BXG, BXJ>(
  result: _.Result<BXF, BXG>,
  fun: (x0: BXF) => _.Result<BXJ, BXG>
): _.Result<BXJ, BXG>;

export function unwrap<BXO>(result: _.Result<BXO, any>, default$: BXO): BXO;

export function lazy_unwrap<BXS>(
  result: _.Result<BXS, any>,
  default$: () => BXS
): BXS;

export function unwrap_error<BXX>(result: _.Result<any, BXX>, default$: BXX): BXX;

export function unwrap_both<BYA>(result: _.Result<BYA, BYA>): BYA;

export function or<BYJ, BYK>(
  first: _.Result<BYJ, BYK>,
  second: _.Result<BYJ, BYK>
): _.Result<BYJ, BYK>;

export function lazy_or<BYR, BYS>(
  first: _.Result<BYR, BYS>,
  second: () => _.Result<BYR, BYS>
): _.Result<BYR, BYS>;

export function all<BYZ, BZA>(results: _.List<_.Result<BYZ, BZA>>): _.Result<
  _.List<BYZ>,
  BZA
>;

export function partition<BZH, BZI>(results: _.List<_.Result<BZH, BZI>>): [
  _.List<BZH>,
  _.List<BZI>
];

export function replace<BZX, CAA>(result: _.Result<any, BZX>, value: CAA): _.Result<
  CAA,
  BZX
>;

export function replace_error<CAD, CAH>(result: _.Result<CAD, any>, error: CAH): _.Result<
  CAD,
  CAH
>;

export function nil_error<BYD>(result: _.Result<BYD, any>): _.Result<
  BYD,
  undefined
>;

export function values<CAK>(results: _.List<_.Result<CAK, any>>): _.List<CAK>;

export function try_recover<CAQ, CAR, CAU>(
  result: _.Result<CAQ, CAR>,
  fun: (x0: CAR) => _.Result<CAQ, CAU>
): _.Result<CAQ, CAU>;

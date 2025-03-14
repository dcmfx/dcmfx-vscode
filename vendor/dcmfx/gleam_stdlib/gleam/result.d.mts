import type * as _ from "../gleam.d.mts";

export function is_ok(result: _.Result<any, any>): boolean;

export function is_error(result: _.Result<any, any>): boolean;

export function map<BZB, BZC, BZF>(
  result: _.Result<BZB, BZC>,
  fun: (x0: BZB) => BZF
): _.Result<BZF, BZC>;

export function map_error<BZI, BZJ, BZM>(
  result: _.Result<BZI, BZJ>,
  fun: (x0: BZJ) => BZM
): _.Result<BZI, BZM>;

export function flatten<BZP, BZQ>(result: _.Result<_.Result<BZP, BZQ>, BZQ>): _.Result<
  BZP,
  BZQ
>;

export function try$<BZX, BZY, CAB>(
  result: _.Result<BZX, BZY>,
  fun: (x0: BZX) => _.Result<CAB, BZY>
): _.Result<CAB, BZY>;

export function then$<CAG, CAH, CAK>(
  result: _.Result<CAG, CAH>,
  fun: (x0: CAG) => _.Result<CAK, CAH>
): _.Result<CAK, CAH>;

export function unwrap<CAP>(result: _.Result<CAP, any>, default$: CAP): CAP;

export function lazy_unwrap<CAT>(
  result: _.Result<CAT, any>,
  default$: () => CAT
): CAT;

export function unwrap_error<CAY>(result: _.Result<any, CAY>, default$: CAY): CAY;

export function unwrap_both<CBB>(result: _.Result<CBB, CBB>): CBB;

export function or<CBE, CBF>(
  first: _.Result<CBE, CBF>,
  second: _.Result<CBE, CBF>
): _.Result<CBE, CBF>;

export function lazy_or<CBM, CBN>(
  first: _.Result<CBM, CBN>,
  second: () => _.Result<CBM, CBN>
): _.Result<CBM, CBN>;

export function all<CBU, CBV>(results: _.List<_.Result<CBU, CBV>>): _.Result<
  _.List<CBU>,
  CBV
>;

export function partition<CCC, CCD>(results: _.List<_.Result<CCC, CCD>>): [
  _.List<CCC>,
  _.List<CCD>
];

export function replace<CCS, CCV>(result: _.Result<any, CCS>, value: CCV): _.Result<
  CCV,
  CCS
>;

export function replace_error<CCY, CDC>(result: _.Result<CCY, any>, error: CDC): _.Result<
  CCY,
  CDC
>;

export function values<CDF>(results: _.List<_.Result<CDF, any>>): _.List<CDF>;

export function try_recover<CDL, CDM, CDP>(
  result: _.Result<CDL, CDM>,
  fun: (x0: CDM) => _.Result<CDL, CDP>
): _.Result<CDL, CDP>;

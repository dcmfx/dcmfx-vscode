import type * as _ from "../gleam.d.mts";

export function is_ok(result: _.Result<any, any>): boolean;

export function is_error(result: _.Result<any, any>): boolean;

export function map<CLR, CLS, CLV>(
  result: _.Result<CLR, CLS>,
  fun: (x0: CLR) => CLV
): _.Result<CLV, CLS>;

export function map_error<CLY, CLZ, CMC>(
  result: _.Result<CLY, CLZ>,
  fun: (x0: CLZ) => CMC
): _.Result<CLY, CMC>;

export function flatten<CMF, CMG>(result: _.Result<_.Result<CMF, CMG>, CMG>): _.Result<
  CMF,
  CMG
>;

export function try$<CMN, CMO, CMR>(
  result: _.Result<CMN, CMO>,
  fun: (x0: CMN) => _.Result<CMR, CMO>
): _.Result<CMR, CMO>;

export function then$<CMW, CMX, CNA>(
  result: _.Result<CMW, CMX>,
  fun: (x0: CMW) => _.Result<CNA, CMX>
): _.Result<CNA, CMX>;

export function unwrap<CNF>(result: _.Result<CNF, any>, default$: CNF): CNF;

export function lazy_unwrap<CNJ>(
  result: _.Result<CNJ, any>,
  default$: () => CNJ
): CNJ;

export function unwrap_error<CNO>(result: _.Result<any, CNO>, default$: CNO): CNO;

export function unwrap_both<CNR>(result: _.Result<CNR, CNR>): CNR;

export function or<CNU, CNV>(
  first: _.Result<CNU, CNV>,
  second: _.Result<CNU, CNV>
): _.Result<CNU, CNV>;

export function lazy_or<COC, COD>(
  first: _.Result<COC, COD>,
  second: () => _.Result<COC, COD>
): _.Result<COC, COD>;

export function all<COK, COL>(results: _.List<_.Result<COK, COL>>): _.Result<
  _.List<COK>,
  COL
>;

export function partition<COS, COT>(results: _.List<_.Result<COS, COT>>): [
  _.List<COS>,
  _.List<COT>
];

export function replace<CPI, CPL>(result: _.Result<any, CPI>, value: CPL): _.Result<
  CPL,
  CPI
>;

export function replace_error<CPO, CPS>(result: _.Result<CPO, any>, error: CPS): _.Result<
  CPO,
  CPS
>;

export function values<CPV>(results: _.List<_.Result<CPV, any>>): _.List<CPV>;

export function try_recover<CQB, CQC, CQF>(
  result: _.Result<CQB, CQC>,
  fun: (x0: CQC) => _.Result<CQB, CQF>
): _.Result<CQB, CQF>;

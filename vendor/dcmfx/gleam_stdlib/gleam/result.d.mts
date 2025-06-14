import type * as _ from "../gleam.d.mts";

export function is_ok(result: _.Result<any, any>): boolean;

export function is_error(result: _.Result<any, any>): boolean;

export function map<CPF, CPG, CPJ>(
  result: _.Result<CPF, CPG>,
  fun: (x0: CPF) => CPJ
): _.Result<CPJ, CPG>;

export function map_error<CPM, CPN, CPQ>(
  result: _.Result<CPM, CPN>,
  fun: (x0: CPN) => CPQ
): _.Result<CPM, CPQ>;

export function flatten<CPT, CPU>(result: _.Result<_.Result<CPT, CPU>, CPU>): _.Result<
  CPT,
  CPU
>;

export function try$<CQB, CQC, CQF>(
  result: _.Result<CQB, CQC>,
  fun: (x0: CQB) => _.Result<CQF, CQC>
): _.Result<CQF, CQC>;

export function then$<CQK, CQL, CQO>(
  result: _.Result<CQK, CQL>,
  fun: (x0: CQK) => _.Result<CQO, CQL>
): _.Result<CQO, CQL>;

export function unwrap<CQT>(result: _.Result<CQT, any>, default$: CQT): CQT;

export function lazy_unwrap<CQX>(
  result: _.Result<CQX, any>,
  default$: () => CQX
): CQX;

export function unwrap_error<CRC>(result: _.Result<any, CRC>, default$: CRC): CRC;

export function unwrap_both<CRF>(result: _.Result<CRF, CRF>): CRF;

export function or<CRI, CRJ>(
  first: _.Result<CRI, CRJ>,
  second: _.Result<CRI, CRJ>
): _.Result<CRI, CRJ>;

export function lazy_or<CRQ, CRR>(
  first: _.Result<CRQ, CRR>,
  second: () => _.Result<CRQ, CRR>
): _.Result<CRQ, CRR>;

export function all<CRY, CRZ>(results: _.List<_.Result<CRY, CRZ>>): _.Result<
  _.List<CRY>,
  CRZ
>;

export function partition<CSG, CSH>(results: _.List<_.Result<CSG, CSH>>): [
  _.List<CSG>,
  _.List<CSH>
];

export function replace<CSW, CSZ>(result: _.Result<any, CSW>, value: CSZ): _.Result<
  CSZ,
  CSW
>;

export function replace_error<CTC, CTG>(result: _.Result<CTC, any>, error: CTG): _.Result<
  CTC,
  CTG
>;

export function values<CTJ>(results: _.List<_.Result<CTJ, any>>): _.List<CTJ>;

export function try_recover<CTP, CTQ, CTT>(
  result: _.Result<CTP, CTQ>,
  fun: (x0: CTQ) => _.Result<CTP, CTT>
): _.Result<CTP, CTT>;

import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";
import type * as $option from "../gleam/option.d.mts";

export type Dynamic$ = unknown;

export class DecodeError extends _.CustomType {
  constructor(expected: string, found: string, path: _.List<string>);
  
  expected: string;
  found: string;
  path: _.List<string>;
}

export type DecodeError$ = DecodeError;

declare type UnknownTuple$ = unknown;

export type DecodeErrors = _.List<DecodeError$>;

export type Decoder = (x0: Dynamic$) => _.Result<any, _.List<DecodeError$>>;

export function from(a: any): Dynamic$;

export function dynamic(value: Dynamic$): _.Result<
  Dynamic$,
  _.List<DecodeError$>
>;

export function bit_array(data: Dynamic$): _.Result<
  _.BitArray,
  _.List<DecodeError$>
>;

export function classify(data: Dynamic$): string;

export function int(data: Dynamic$): _.Result<number, _.List<DecodeError$>>;

export function float(data: Dynamic$): _.Result<number, _.List<DecodeError$>>;

export function bool(data: Dynamic$): _.Result<boolean, _.List<DecodeError$>>;

export function shallow_list(value: Dynamic$): _.Result<
  _.List<Dynamic$>,
  _.List<DecodeError$>
>;

export function optional<CHX>(
  decode: (x0: Dynamic$) => _.Result<CHX, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$option.Option$<CHX>, _.List<DecodeError$>>;

export function any<CLX>(
  decoders: _.List<(x0: Dynamic$) => _.Result<CLX, _.List<DecodeError$>>>
): (x0: Dynamic$) => _.Result<CLX, _.List<DecodeError$>>;

export function decode1<CMB, CMC>(
  constructor: (x0: CMB) => CMC,
  t1: (x0: Dynamic$) => _.Result<CMB, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CMC, _.List<DecodeError$>>;

export function result<CHF, CHH>(
  decode_ok: (x0: Dynamic$) => _.Result<CHF, _.List<DecodeError$>>,
  decode_error: (x0: Dynamic$) => _.Result<CHH, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<_.Result<CHF, CHH>, _.List<DecodeError$>>;

export function list<CHS>(
  decoder_type: (x0: Dynamic$) => _.Result<CHS, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<_.List<CHS>, _.List<DecodeError$>>;

export function string(data: Dynamic$): _.Result<string, _.List<DecodeError$>>;

export function field<CIH>(
  name: any,
  inner_type: (x0: Dynamic$) => _.Result<CIH, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CIH, _.List<DecodeError$>>;

export function optional_field<CIL>(
  name: any,
  inner_type: (x0: Dynamic$) => _.Result<CIL, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$option.Option$<CIL>, _.List<DecodeError$>>;

export function element<CIT>(
  index: number,
  inner_type: (x0: Dynamic$) => _.Result<CIT, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CIT, _.List<DecodeError$>>;

export function tuple2<CJT, CJV>(
  decode1: (x0: Dynamic$) => _.Result<CJT, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CJV, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CJT, CJV], _.List<DecodeError$>>;

export function tuple3<CJY, CKA, CKC>(
  decode1: (x0: Dynamic$) => _.Result<CJY, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CKA, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CKC, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CJY, CKA, CKC], _.List<DecodeError$>>;

export function tuple4<CKF, CKH, CKJ, CKL>(
  decode1: (x0: Dynamic$) => _.Result<CKF, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CKH, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CKJ, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CKL, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CKF, CKH, CKJ, CKL], _.List<DecodeError$>>;

export function tuple5<CKO, CKQ, CKS, CKU, CKW>(
  decode1: (x0: Dynamic$) => _.Result<CKO, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CKQ, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CKS, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CKU, _.List<DecodeError$>>,
  decode5: (x0: Dynamic$) => _.Result<CKW, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CKO, CKQ, CKS, CKU, CKW], _.List<DecodeError$>>;

export function tuple6<CKZ, CLB, CLD, CLF, CLH, CLJ>(
  decode1: (x0: Dynamic$) => _.Result<CKZ, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CLB, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CLD, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CLF, _.List<DecodeError$>>,
  decode5: (x0: Dynamic$) => _.Result<CLH, _.List<DecodeError$>>,
  decode6: (x0: Dynamic$) => _.Result<CLJ, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<
  [CKZ, CLB, CLD, CLF, CLH, CLJ],
  _.List<DecodeError$>
>;

export function dict<CLM, CLO>(
  key_type: (x0: Dynamic$) => _.Result<CLM, _.List<DecodeError$>>,
  value_type: (x0: Dynamic$) => _.Result<CLO, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$dict.Dict$<CLM, CLO>, _.List<DecodeError$>>;

export function decode2<CMF, CMG, CMH>(
  constructor: (x0: CMF, x1: CMG) => CMH,
  t1: (x0: Dynamic$) => _.Result<CMF, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CMG, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CMH, _.List<DecodeError$>>;

export function decode3<CML, CMM, CMN, CMO>(
  constructor: (x0: CML, x1: CMM, x2: CMN) => CMO,
  t1: (x0: Dynamic$) => _.Result<CML, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CMM, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CMN, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CMO, _.List<DecodeError$>>;

export function decode4<CMT, CMU, CMV, CMW, CMX>(
  constructor: (x0: CMT, x1: CMU, x2: CMV, x3: CMW) => CMX,
  t1: (x0: Dynamic$) => _.Result<CMT, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CMU, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CMV, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CMW, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CMX, _.List<DecodeError$>>;

export function decode5<CND, CNE, CNF, CNG, CNH, CNI>(
  constructor: (x0: CND, x1: CNE, x2: CNF, x3: CNG, x4: CNH) => CNI,
  t1: (x0: Dynamic$) => _.Result<CND, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CNE, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CNF, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CNG, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CNH, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CNI, _.List<DecodeError$>>;

export function decode6<CNP, CNQ, CNR, CNS, CNT, CNU, CNV>(
  constructor: (x0: CNP, x1: CNQ, x2: CNR, x3: CNS, x4: CNT, x5: CNU) => CNV,
  t1: (x0: Dynamic$) => _.Result<CNP, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CNQ, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CNR, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CNS, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CNT, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CNU, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CNV, _.List<DecodeError$>>;

export function decode7<COD, COE, COF, COG, COH, COI, COJ, COK>(
  constructor: (x0: COD, x1: COE, x2: COF, x3: COG, x4: COH, x5: COI, x6: COJ) => COK,
  t1: (x0: Dynamic$) => _.Result<COD, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<COE, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<COF, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<COG, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<COH, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<COI, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<COJ, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<COK, _.List<DecodeError$>>;

export function decode8<COT, COU, COV, COW, COX, COY, COZ, CPA, CPB>(
  constructor: (
    x0: COT,
    x1: COU,
    x2: COV,
    x3: COW,
    x4: COX,
    x5: COY,
    x6: COZ,
    x7: CPA
  ) => CPB,
  t1: (x0: Dynamic$) => _.Result<COT, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<COU, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<COV, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<COW, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<COX, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<COY, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<COZ, _.List<DecodeError$>>,
  t8: (x0: Dynamic$) => _.Result<CPA, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CPB, _.List<DecodeError$>>;

export function decode9<CPL, CPM, CPN, CPO, CPP, CPQ, CPR, CPS, CPT, CPU>(
  constructor: (
    x0: CPL,
    x1: CPM,
    x2: CPN,
    x3: CPO,
    x4: CPP,
    x5: CPQ,
    x6: CPR,
    x7: CPS,
    x8: CPT
  ) => CPU,
  t1: (x0: Dynamic$) => _.Result<CPL, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CPM, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CPN, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CPO, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CPP, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CPQ, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CPR, _.List<DecodeError$>>,
  t8: (x0: Dynamic$) => _.Result<CPS, _.List<DecodeError$>>,
  t9: (x0: Dynamic$) => _.Result<CPT, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CPU, _.List<DecodeError$>>;

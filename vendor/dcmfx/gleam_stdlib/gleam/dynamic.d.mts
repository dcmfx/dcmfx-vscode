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

export function optional<CJX>(
  decode: (x0: Dynamic$) => _.Result<CJX, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$option.Option$<CJX>, _.List<DecodeError$>>;

export function any<CNX>(
  decoders: _.List<(x0: Dynamic$) => _.Result<CNX, _.List<DecodeError$>>>
): (x0: Dynamic$) => _.Result<CNX, _.List<DecodeError$>>;

export function decode1<COB, COC>(
  constructor: (x0: COB) => COC,
  t1: (x0: Dynamic$) => _.Result<COB, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<COC, _.List<DecodeError$>>;

export function result<CJF, CJH>(
  decode_ok: (x0: Dynamic$) => _.Result<CJF, _.List<DecodeError$>>,
  decode_error: (x0: Dynamic$) => _.Result<CJH, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<_.Result<CJF, CJH>, _.List<DecodeError$>>;

export function list<CJS>(
  decoder_type: (x0: Dynamic$) => _.Result<CJS, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<_.List<CJS>, _.List<DecodeError$>>;

export function string(data: Dynamic$): _.Result<string, _.List<DecodeError$>>;

export function field<CKH>(
  name: any,
  inner_type: (x0: Dynamic$) => _.Result<CKH, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CKH, _.List<DecodeError$>>;

export function optional_field<CKL>(
  name: any,
  inner_type: (x0: Dynamic$) => _.Result<CKL, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$option.Option$<CKL>, _.List<DecodeError$>>;

export function element<CKT>(
  index: number,
  inner_type: (x0: Dynamic$) => _.Result<CKT, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CKT, _.List<DecodeError$>>;

export function tuple2<CLT, CLV>(
  decode1: (x0: Dynamic$) => _.Result<CLT, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CLV, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CLT, CLV], _.List<DecodeError$>>;

export function tuple3<CLY, CMA, CMC>(
  decode1: (x0: Dynamic$) => _.Result<CLY, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CMA, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CMC, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CLY, CMA, CMC], _.List<DecodeError$>>;

export function tuple4<CMF, CMH, CMJ, CML>(
  decode1: (x0: Dynamic$) => _.Result<CMF, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CMH, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CMJ, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CML, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CMF, CMH, CMJ, CML], _.List<DecodeError$>>;

export function tuple5<CMO, CMQ, CMS, CMU, CMW>(
  decode1: (x0: Dynamic$) => _.Result<CMO, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CMQ, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CMS, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CMU, _.List<DecodeError$>>,
  decode5: (x0: Dynamic$) => _.Result<CMW, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CMO, CMQ, CMS, CMU, CMW], _.List<DecodeError$>>;

export function tuple6<CMZ, CNB, CND, CNF, CNH, CNJ>(
  decode1: (x0: Dynamic$) => _.Result<CMZ, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CNB, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CND, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CNF, _.List<DecodeError$>>,
  decode5: (x0: Dynamic$) => _.Result<CNH, _.List<DecodeError$>>,
  decode6: (x0: Dynamic$) => _.Result<CNJ, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<
  [CMZ, CNB, CND, CNF, CNH, CNJ],
  _.List<DecodeError$>
>;

export function dict<CNM, CNO>(
  key_type: (x0: Dynamic$) => _.Result<CNM, _.List<DecodeError$>>,
  value_type: (x0: Dynamic$) => _.Result<CNO, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$dict.Dict$<CNM, CNO>, _.List<DecodeError$>>;

export function decode2<COF, COG, COH>(
  constructor: (x0: COF, x1: COG) => COH,
  t1: (x0: Dynamic$) => _.Result<COF, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<COG, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<COH, _.List<DecodeError$>>;

export function decode3<COL, COM, CON, COO>(
  constructor: (x0: COL, x1: COM, x2: CON) => COO,
  t1: (x0: Dynamic$) => _.Result<COL, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<COM, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CON, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<COO, _.List<DecodeError$>>;

export function decode4<COT, COU, COV, COW, COX>(
  constructor: (x0: COT, x1: COU, x2: COV, x3: COW) => COX,
  t1: (x0: Dynamic$) => _.Result<COT, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<COU, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<COV, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<COW, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<COX, _.List<DecodeError$>>;

export function decode5<CPD, CPE, CPF, CPG, CPH, CPI>(
  constructor: (x0: CPD, x1: CPE, x2: CPF, x3: CPG, x4: CPH) => CPI,
  t1: (x0: Dynamic$) => _.Result<CPD, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CPE, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CPF, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CPG, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CPH, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CPI, _.List<DecodeError$>>;

export function decode6<CPP, CPQ, CPR, CPS, CPT, CPU, CPV>(
  constructor: (x0: CPP, x1: CPQ, x2: CPR, x3: CPS, x4: CPT, x5: CPU) => CPV,
  t1: (x0: Dynamic$) => _.Result<CPP, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CPQ, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CPR, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CPS, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CPT, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CPU, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CPV, _.List<DecodeError$>>;

export function decode7<CQD, CQE, CQF, CQG, CQH, CQI, CQJ, CQK>(
  constructor: (x0: CQD, x1: CQE, x2: CQF, x3: CQG, x4: CQH, x5: CQI, x6: CQJ) => CQK,
  t1: (x0: Dynamic$) => _.Result<CQD, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CQE, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CQF, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CQG, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CQH, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CQI, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CQJ, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CQK, _.List<DecodeError$>>;

export function decode8<CQT, CQU, CQV, CQW, CQX, CQY, CQZ, CRA, CRB>(
  constructor: (
    x0: CQT,
    x1: CQU,
    x2: CQV,
    x3: CQW,
    x4: CQX,
    x5: CQY,
    x6: CQZ,
    x7: CRA
  ) => CRB,
  t1: (x0: Dynamic$) => _.Result<CQT, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CQU, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CQV, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CQW, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CQX, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CQY, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CQZ, _.List<DecodeError$>>,
  t8: (x0: Dynamic$) => _.Result<CRA, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CRB, _.List<DecodeError$>>;

export function decode9<CRL, CRM, CRN, CRO, CRP, CRQ, CRR, CRS, CRT, CRU>(
  constructor: (
    x0: CRL,
    x1: CRM,
    x2: CRN,
    x3: CRO,
    x4: CRP,
    x5: CRQ,
    x6: CRR,
    x7: CRS,
    x8: CRT
  ) => CRU,
  t1: (x0: Dynamic$) => _.Result<CRL, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CRM, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CRN, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CRO, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CRP, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CRQ, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CRR, _.List<DecodeError$>>,
  t8: (x0: Dynamic$) => _.Result<CRS, _.List<DecodeError$>>,
  t9: (x0: Dynamic$) => _.Result<CRT, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CRU, _.List<DecodeError$>>;

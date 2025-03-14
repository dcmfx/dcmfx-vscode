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

export function classify(data: Dynamic$): string;

export function from(a: any): Dynamic$;

export function dynamic(value: Dynamic$): _.Result<
  Dynamic$,
  _.List<DecodeError$>
>;

export function bit_array(data: Dynamic$): _.Result<
  _.BitArray,
  _.List<DecodeError$>
>;

export function string(data: Dynamic$): _.Result<string, _.List<DecodeError$>>;

export function int(data: Dynamic$): _.Result<number, _.List<DecodeError$>>;

export function float(data: Dynamic$): _.Result<number, _.List<DecodeError$>>;

export function bool(data: Dynamic$): _.Result<boolean, _.List<DecodeError$>>;

export function shallow_list(value: Dynamic$): _.Result<
  _.List<Dynamic$>,
  _.List<DecodeError$>
>;

export function optional<CKP>(
  decode: (x0: Dynamic$) => _.Result<CKP, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$option.Option$<CKP>, _.List<DecodeError$>>;

export function result<CJX, CJZ>(
  decode_ok: (x0: Dynamic$) => _.Result<CJX, _.List<DecodeError$>>,
  decode_error: (x0: Dynamic$) => _.Result<CJZ, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<_.Result<CJX, CJZ>, _.List<DecodeError$>>;

export function list<CKK>(
  decoder_type: (x0: Dynamic$) => _.Result<CKK, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<_.List<CKK>, _.List<DecodeError$>>;

export function field<CKZ>(
  name: any,
  inner_type: (x0: Dynamic$) => _.Result<CKZ, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CKZ, _.List<DecodeError$>>;

export function optional_field<CLD>(
  name: any,
  inner_type: (x0: Dynamic$) => _.Result<CLD, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$option.Option$<CLD>, _.List<DecodeError$>>;

export function element<CLL>(
  index: number,
  inner_type: (x0: Dynamic$) => _.Result<CLL, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CLL, _.List<DecodeError$>>;

export function tuple2<CML, CMN>(
  decode1: (x0: Dynamic$) => _.Result<CML, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CMN, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CML, CMN], _.List<DecodeError$>>;

export function tuple3<CMQ, CMS, CMU>(
  decode1: (x0: Dynamic$) => _.Result<CMQ, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CMS, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CMU, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CMQ, CMS, CMU], _.List<DecodeError$>>;

export function tuple4<CMX, CMZ, CNB, CND>(
  decode1: (x0: Dynamic$) => _.Result<CMX, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CMZ, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CNB, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CND, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CMX, CMZ, CNB, CND], _.List<DecodeError$>>;

export function tuple5<CNG, CNI, CNK, CNM, CNO>(
  decode1: (x0: Dynamic$) => _.Result<CNG, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CNI, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CNK, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CNM, _.List<DecodeError$>>,
  decode5: (x0: Dynamic$) => _.Result<CNO, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CNG, CNI, CNK, CNM, CNO], _.List<DecodeError$>>;

export function tuple6<CNR, CNT, CNV, CNX, CNZ, COB>(
  decode1: (x0: Dynamic$) => _.Result<CNR, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CNT, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CNV, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CNX, _.List<DecodeError$>>,
  decode5: (x0: Dynamic$) => _.Result<CNZ, _.List<DecodeError$>>,
  decode6: (x0: Dynamic$) => _.Result<COB, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<
  [CNR, CNT, CNV, CNX, CNZ, COB],
  _.List<DecodeError$>
>;

export function dict<COE, COG>(
  key_type: (x0: Dynamic$) => _.Result<COE, _.List<DecodeError$>>,
  value_type: (x0: Dynamic$) => _.Result<COG, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$dict.Dict$<COE, COG>, _.List<DecodeError$>>;

export function any<COP>(
  decoders: _.List<(x0: Dynamic$) => _.Result<COP, _.List<DecodeError$>>>
): (x0: Dynamic$) => _.Result<COP, _.List<DecodeError$>>;

export function decode1<COX, COY>(
  constructor: (x0: COX) => COY,
  t1: (x0: Dynamic$) => _.Result<COX, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<COY, _.List<DecodeError$>>;

export function decode2<CPB, CPC, CPD>(
  constructor: (x0: CPB, x1: CPC) => CPD,
  t1: (x0: Dynamic$) => _.Result<CPB, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CPC, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CPD, _.List<DecodeError$>>;

export function decode3<CPH, CPI, CPJ, CPK>(
  constructor: (x0: CPH, x1: CPI, x2: CPJ) => CPK,
  t1: (x0: Dynamic$) => _.Result<CPH, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CPI, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CPJ, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CPK, _.List<DecodeError$>>;

export function decode4<CPP, CPQ, CPR, CPS, CPT>(
  constructor: (x0: CPP, x1: CPQ, x2: CPR, x3: CPS) => CPT,
  t1: (x0: Dynamic$) => _.Result<CPP, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CPQ, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CPR, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CPS, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CPT, _.List<DecodeError$>>;

export function decode5<CPZ, CQA, CQB, CQC, CQD, CQE>(
  constructor: (x0: CPZ, x1: CQA, x2: CQB, x3: CQC, x4: CQD) => CQE,
  t1: (x0: Dynamic$) => _.Result<CPZ, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CQA, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CQB, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CQC, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CQD, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CQE, _.List<DecodeError$>>;

export function decode6<CQL, CQM, CQN, CQO, CQP, CQQ, CQR>(
  constructor: (x0: CQL, x1: CQM, x2: CQN, x3: CQO, x4: CQP, x5: CQQ) => CQR,
  t1: (x0: Dynamic$) => _.Result<CQL, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CQM, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CQN, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CQO, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CQP, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CQQ, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CQR, _.List<DecodeError$>>;

export function decode7<CQZ, CRA, CRB, CRC, CRD, CRE, CRF, CRG>(
  constructor: (x0: CQZ, x1: CRA, x2: CRB, x3: CRC, x4: CRD, x5: CRE, x6: CRF) => CRG,
  t1: (x0: Dynamic$) => _.Result<CQZ, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CRA, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CRB, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CRC, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CRD, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CRE, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CRF, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CRG, _.List<DecodeError$>>;

export function decode8<CRP, CRQ, CRR, CRS, CRT, CRU, CRV, CRW, CRX>(
  constructor: (
    x0: CRP,
    x1: CRQ,
    x2: CRR,
    x3: CRS,
    x4: CRT,
    x5: CRU,
    x6: CRV,
    x7: CRW
  ) => CRX,
  t1: (x0: Dynamic$) => _.Result<CRP, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CRQ, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CRR, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CRS, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CRT, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CRU, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CRV, _.List<DecodeError$>>,
  t8: (x0: Dynamic$) => _.Result<CRW, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CRX, _.List<DecodeError$>>;

export function decode9<CSH, CSI, CSJ, CSK, CSL, CSM, CSN, CSO, CSP, CSQ>(
  constructor: (
    x0: CSH,
    x1: CSI,
    x2: CSJ,
    x3: CSK,
    x4: CSL,
    x5: CSM,
    x6: CSN,
    x7: CSO,
    x8: CSP
  ) => CSQ,
  t1: (x0: Dynamic$) => _.Result<CSH, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CSI, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CSJ, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CSK, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CSL, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CSM, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CSN, _.List<DecodeError$>>,
  t8: (x0: Dynamic$) => _.Result<CSO, _.List<DecodeError$>>,
  t9: (x0: Dynamic$) => _.Result<CSP, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CSQ, _.List<DecodeError$>>;

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

export function optional<CJH>(
  decode: (x0: Dynamic$) => _.Result<CJH, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$option.Option$<CJH>, _.List<DecodeError$>>;

export function result<CIP, CIR>(
  decode_ok: (x0: Dynamic$) => _.Result<CIP, _.List<DecodeError$>>,
  decode_error: (x0: Dynamic$) => _.Result<CIR, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<_.Result<CIP, CIR>, _.List<DecodeError$>>;

export function list<CJC>(
  decoder_type: (x0: Dynamic$) => _.Result<CJC, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<_.List<CJC>, _.List<DecodeError$>>;

export function field<CJR>(
  name: any,
  inner_type: (x0: Dynamic$) => _.Result<CJR, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CJR, _.List<DecodeError$>>;

export function optional_field<CJV>(
  name: any,
  inner_type: (x0: Dynamic$) => _.Result<CJV, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$option.Option$<CJV>, _.List<DecodeError$>>;

export function element<CKD>(
  index: number,
  inner_type: (x0: Dynamic$) => _.Result<CKD, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CKD, _.List<DecodeError$>>;

export function tuple2<CLD, CLF>(
  decode1: (x0: Dynamic$) => _.Result<CLD, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CLF, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CLD, CLF], _.List<DecodeError$>>;

export function tuple3<CLI, CLK, CLM>(
  decode1: (x0: Dynamic$) => _.Result<CLI, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CLK, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CLM, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CLI, CLK, CLM], _.List<DecodeError$>>;

export function tuple4<CLP, CLR, CLT, CLV>(
  decode1: (x0: Dynamic$) => _.Result<CLP, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CLR, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CLT, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CLV, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CLP, CLR, CLT, CLV], _.List<DecodeError$>>;

export function tuple5<CLY, CMA, CMC, CME, CMG>(
  decode1: (x0: Dynamic$) => _.Result<CLY, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CMA, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CMC, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CME, _.List<DecodeError$>>,
  decode5: (x0: Dynamic$) => _.Result<CMG, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CLY, CMA, CMC, CME, CMG], _.List<DecodeError$>>;

export function tuple6<CMJ, CML, CMN, CMP, CMR, CMT>(
  decode1: (x0: Dynamic$) => _.Result<CMJ, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CML, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CMN, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CMP, _.List<DecodeError$>>,
  decode5: (x0: Dynamic$) => _.Result<CMR, _.List<DecodeError$>>,
  decode6: (x0: Dynamic$) => _.Result<CMT, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<
  [CMJ, CML, CMN, CMP, CMR, CMT],
  _.List<DecodeError$>
>;

export function dict<CMW, CMY>(
  key_type: (x0: Dynamic$) => _.Result<CMW, _.List<DecodeError$>>,
  value_type: (x0: Dynamic$) => _.Result<CMY, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$dict.Dict$<CMW, CMY>, _.List<DecodeError$>>;

export function any<CNH>(
  decoders: _.List<(x0: Dynamic$) => _.Result<CNH, _.List<DecodeError$>>>
): (x0: Dynamic$) => _.Result<CNH, _.List<DecodeError$>>;

export function decode1<CNP, CNQ>(
  constructor: (x0: CNP) => CNQ,
  t1: (x0: Dynamic$) => _.Result<CNP, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CNQ, _.List<DecodeError$>>;

export function decode2<CNT, CNU, CNV>(
  constructor: (x0: CNT, x1: CNU) => CNV,
  t1: (x0: Dynamic$) => _.Result<CNT, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CNU, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CNV, _.List<DecodeError$>>;

export function decode3<CNZ, COA, COB, COC>(
  constructor: (x0: CNZ, x1: COA, x2: COB) => COC,
  t1: (x0: Dynamic$) => _.Result<CNZ, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<COA, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<COB, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<COC, _.List<DecodeError$>>;

export function decode4<COH, COI, COJ, COK, COL>(
  constructor: (x0: COH, x1: COI, x2: COJ, x3: COK) => COL,
  t1: (x0: Dynamic$) => _.Result<COH, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<COI, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<COJ, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<COK, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<COL, _.List<DecodeError$>>;

export function decode5<COR, COS, COT, COU, COV, COW>(
  constructor: (x0: COR, x1: COS, x2: COT, x3: COU, x4: COV) => COW,
  t1: (x0: Dynamic$) => _.Result<COR, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<COS, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<COT, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<COU, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<COV, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<COW, _.List<DecodeError$>>;

export function decode6<CPD, CPE, CPF, CPG, CPH, CPI, CPJ>(
  constructor: (x0: CPD, x1: CPE, x2: CPF, x3: CPG, x4: CPH, x5: CPI) => CPJ,
  t1: (x0: Dynamic$) => _.Result<CPD, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CPE, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CPF, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CPG, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CPH, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CPI, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CPJ, _.List<DecodeError$>>;

export function decode7<CPR, CPS, CPT, CPU, CPV, CPW, CPX, CPY>(
  constructor: (x0: CPR, x1: CPS, x2: CPT, x3: CPU, x4: CPV, x5: CPW, x6: CPX) => CPY,
  t1: (x0: Dynamic$) => _.Result<CPR, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CPS, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CPT, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CPU, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CPV, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CPW, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CPX, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CPY, _.List<DecodeError$>>;

export function decode8<CQH, CQI, CQJ, CQK, CQL, CQM, CQN, CQO, CQP>(
  constructor: (
    x0: CQH,
    x1: CQI,
    x2: CQJ,
    x3: CQK,
    x4: CQL,
    x5: CQM,
    x6: CQN,
    x7: CQO
  ) => CQP,
  t1: (x0: Dynamic$) => _.Result<CQH, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CQI, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CQJ, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CQK, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CQL, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CQM, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CQN, _.List<DecodeError$>>,
  t8: (x0: Dynamic$) => _.Result<CQO, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CQP, _.List<DecodeError$>>;

export function decode9<CQZ, CRA, CRB, CRC, CRD, CRE, CRF, CRG, CRH, CRI>(
  constructor: (
    x0: CQZ,
    x1: CRA,
    x2: CRB,
    x3: CRC,
    x4: CRD,
    x5: CRE,
    x6: CRF,
    x7: CRG,
    x8: CRH
  ) => CRI,
  t1: (x0: Dynamic$) => _.Result<CQZ, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CRA, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CRB, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CRC, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CRD, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CRE, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CRF, _.List<DecodeError$>>,
  t8: (x0: Dynamic$) => _.Result<CRG, _.List<DecodeError$>>,
  t9: (x0: Dynamic$) => _.Result<CRH, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CRI, _.List<DecodeError$>>;

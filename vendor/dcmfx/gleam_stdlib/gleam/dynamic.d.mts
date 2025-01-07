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

export function optional<CJF>(
  decode: (x0: Dynamic$) => _.Result<CJF, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$option.Option$<CJF>, _.List<DecodeError$>>;

export function any<CNF>(
  decoders: _.List<(x0: Dynamic$) => _.Result<CNF, _.List<DecodeError$>>>
): (x0: Dynamic$) => _.Result<CNF, _.List<DecodeError$>>;

export function decode1<CNJ, CNK>(
  constructor: (x0: CNJ) => CNK,
  t1: (x0: Dynamic$) => _.Result<CNJ, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CNK, _.List<DecodeError$>>;

export function result<CIN, CIP>(
  decode_ok: (x0: Dynamic$) => _.Result<CIN, _.List<DecodeError$>>,
  decode_error: (x0: Dynamic$) => _.Result<CIP, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<_.Result<CIN, CIP>, _.List<DecodeError$>>;

export function list<CJA>(
  decoder_type: (x0: Dynamic$) => _.Result<CJA, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<_.List<CJA>, _.List<DecodeError$>>;

export function string(data: Dynamic$): _.Result<string, _.List<DecodeError$>>;

export function field<CJP>(
  name: any,
  inner_type: (x0: Dynamic$) => _.Result<CJP, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CJP, _.List<DecodeError$>>;

export function optional_field<CJT>(
  name: any,
  inner_type: (x0: Dynamic$) => _.Result<CJT, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$option.Option$<CJT>, _.List<DecodeError$>>;

export function element<CKB>(
  index: number,
  inner_type: (x0: Dynamic$) => _.Result<CKB, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CKB, _.List<DecodeError$>>;

export function tuple2<CLB, CLD>(
  decode1: (x0: Dynamic$) => _.Result<CLB, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CLD, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CLB, CLD], _.List<DecodeError$>>;

export function tuple3<CLG, CLI, CLK>(
  decode1: (x0: Dynamic$) => _.Result<CLG, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CLI, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CLK, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CLG, CLI, CLK], _.List<DecodeError$>>;

export function tuple4<CLN, CLP, CLR, CLT>(
  decode1: (x0: Dynamic$) => _.Result<CLN, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CLP, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CLR, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CLT, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CLN, CLP, CLR, CLT], _.List<DecodeError$>>;

export function tuple5<CLW, CLY, CMA, CMC, CME>(
  decode1: (x0: Dynamic$) => _.Result<CLW, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CLY, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CMA, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CMC, _.List<DecodeError$>>,
  decode5: (x0: Dynamic$) => _.Result<CME, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CLW, CLY, CMA, CMC, CME], _.List<DecodeError$>>;

export function tuple6<CMH, CMJ, CML, CMN, CMP, CMR>(
  decode1: (x0: Dynamic$) => _.Result<CMH, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CMJ, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CML, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CMN, _.List<DecodeError$>>,
  decode5: (x0: Dynamic$) => _.Result<CMP, _.List<DecodeError$>>,
  decode6: (x0: Dynamic$) => _.Result<CMR, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<
  [CMH, CMJ, CML, CMN, CMP, CMR],
  _.List<DecodeError$>
>;

export function dict<CMU, CMW>(
  key_type: (x0: Dynamic$) => _.Result<CMU, _.List<DecodeError$>>,
  value_type: (x0: Dynamic$) => _.Result<CMW, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$dict.Dict$<CMU, CMW>, _.List<DecodeError$>>;

export function decode2<CNN, CNO, CNP>(
  constructor: (x0: CNN, x1: CNO) => CNP,
  t1: (x0: Dynamic$) => _.Result<CNN, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CNO, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CNP, _.List<DecodeError$>>;

export function decode3<CNT, CNU, CNV, CNW>(
  constructor: (x0: CNT, x1: CNU, x2: CNV) => CNW,
  t1: (x0: Dynamic$) => _.Result<CNT, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CNU, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CNV, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CNW, _.List<DecodeError$>>;

export function decode4<COB, COC, COD, COE, COF>(
  constructor: (x0: COB, x1: COC, x2: COD, x3: COE) => COF,
  t1: (x0: Dynamic$) => _.Result<COB, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<COC, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<COD, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<COE, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<COF, _.List<DecodeError$>>;

export function decode5<COL, COM, CON, COO, COP, COQ>(
  constructor: (x0: COL, x1: COM, x2: CON, x3: COO, x4: COP) => COQ,
  t1: (x0: Dynamic$) => _.Result<COL, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<COM, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CON, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<COO, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<COP, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<COQ, _.List<DecodeError$>>;

export function decode6<COX, COY, COZ, CPA, CPB, CPC, CPD>(
  constructor: (x0: COX, x1: COY, x2: COZ, x3: CPA, x4: CPB, x5: CPC) => CPD,
  t1: (x0: Dynamic$) => _.Result<COX, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<COY, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<COZ, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CPA, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CPB, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CPC, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CPD, _.List<DecodeError$>>;

export function decode7<CPL, CPM, CPN, CPO, CPP, CPQ, CPR, CPS>(
  constructor: (x0: CPL, x1: CPM, x2: CPN, x3: CPO, x4: CPP, x5: CPQ, x6: CPR) => CPS,
  t1: (x0: Dynamic$) => _.Result<CPL, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CPM, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CPN, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CPO, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CPP, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CPQ, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CPR, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CPS, _.List<DecodeError$>>;

export function decode8<CQB, CQC, CQD, CQE, CQF, CQG, CQH, CQI, CQJ>(
  constructor: (
    x0: CQB,
    x1: CQC,
    x2: CQD,
    x3: CQE,
    x4: CQF,
    x5: CQG,
    x6: CQH,
    x7: CQI
  ) => CQJ,
  t1: (x0: Dynamic$) => _.Result<CQB, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CQC, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CQD, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CQE, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CQF, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CQG, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CQH, _.List<DecodeError$>>,
  t8: (x0: Dynamic$) => _.Result<CQI, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CQJ, _.List<DecodeError$>>;

export function decode9<CQT, CQU, CQV, CQW, CQX, CQY, CQZ, CRA, CRB, CRC>(
  constructor: (
    x0: CQT,
    x1: CQU,
    x2: CQV,
    x3: CQW,
    x4: CQX,
    x5: CQY,
    x6: CQZ,
    x7: CRA,
    x8: CRB
  ) => CRC,
  t1: (x0: Dynamic$) => _.Result<CQT, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CQU, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CQV, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CQW, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CQX, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CQY, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CQZ, _.List<DecodeError$>>,
  t8: (x0: Dynamic$) => _.Result<CRA, _.List<DecodeError$>>,
  t9: (x0: Dynamic$) => _.Result<CRB, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CRC, _.List<DecodeError$>>;

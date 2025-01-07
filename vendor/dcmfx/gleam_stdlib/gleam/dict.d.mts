import type * as _ from "../gleam.d.mts";
import type * as $option from "../gleam/option.d.mts";

export type Dict$<KS, KR> = unknown;

export function size(dict: Dict$<any, any>): number;

export function to_list<LB, LC>(dict: Dict$<LB, LC>): _.List<[LB, LC]>;

export function new$(): Dict$<any, any>;

export function is_empty(dict: Dict$<any, any>): boolean;

export function get<ME, MF>(from: Dict$<ME, MF>, get: ME): _.Result<
  MF,
  undefined
>;

export function has_key<LS>(dict: Dict$<LS, any>, key: LS): boolean;

export function insert<MK, ML>(dict: Dict$<MK, ML>, key: MK, value: ML): Dict$<
  MK,
  ML
>;

export function from_list<LG, LH>(list: _.List<[LG, LH]>): Dict$<LG, LH>;

export function keys<NK>(dict: Dict$<NK, any>): _.List<NK>;

export function values<NZ>(dict: Dict$<any, NZ>): _.List<NZ>;

export function take<OU, OV>(dict: Dict$<OU, OV>, desired_keys: _.List<OU>): Dict$<
  OU,
  OV
>;

export function merge<PR, PS>(dict: Dict$<PR, PS>, new_entries: Dict$<PR, PS>): Dict$<
  PR,
  PS
>;

export function delete$<QM, QN>(dict: Dict$<QM, QN>, key: QM): Dict$<QM, QN>;

export function drop<QY, QZ>(dict: Dict$<QY, QZ>, disallowed_keys: _.List<QY>): Dict$<
  QY,
  QZ
>;

export function upsert<RF, RG>(
  dict: Dict$<RF, RG>,
  key: RF,
  fun: (x0: $option.Option$<RG>) => RG
): Dict$<RF, RG>;

export function fold<RM, RN, RQ>(
  dict: Dict$<RM, RN>,
  initial: RQ,
  fun: (x0: RQ, x1: RM, x2: RN) => RQ
): RQ;

export function map_values<MW, MX, NA>(
  dict: Dict$<MW, MX>,
  fun: (x0: MW, x1: MX) => NA
): Dict$<MW, NA>;

export function filter<OI, OJ>(
  dict: Dict$<OI, OJ>,
  predicate: (x0: OI, x1: OJ) => boolean
): Dict$<OI, OJ>;

export function each<RV, RW>(dict: Dict$<RV, RW>, fun: (x0: RV, x1: RW) => any): undefined;

export function combine<SA, SB>(
  dict: Dict$<SA, SB>,
  other: Dict$<SA, SB>,
  fun: (x0: SB, x1: SB) => SB
): Dict$<SA, SB>;

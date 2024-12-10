import type * as _ from "../gleam.d.mts";
import type * as $option from "../gleam/option.d.mts";

export type Dict$<KH, KI> = unknown;

export function size(dict: Dict$<any, any>): number;

export function to_list<KR, KS>(dict: Dict$<KR, KS>): _.List<[KR, KS]>;

export function new$(): Dict$<any, any>;

export function is_empty(dict: Dict$<any, any>): boolean;

export function get<LU, LV>(from: Dict$<LU, LV>, get: LU): _.Result<
  LV,
  undefined
>;

export function has_key<LI>(dict: Dict$<LI, any>, key: LI): boolean;

export function insert<MA, MB>(dict: Dict$<MA, MB>, key: MA, value: MB): Dict$<
  MA,
  MB
>;

export function from_list<KW, KX>(list: _.List<[KW, KX]>): Dict$<KW, KX>;

export function keys<NA>(dict: Dict$<NA, any>): _.List<NA>;

export function values<NP>(dict: Dict$<any, NP>): _.List<NP>;

export function take<OK, OL>(dict: Dict$<OK, OL>, desired_keys: _.List<OK>): Dict$<
  OK,
  OL
>;

export function merge<PH, PI>(dict: Dict$<PH, PI>, new_entries: Dict$<PH, PI>): Dict$<
  PH,
  PI
>;

export function delete$<QC, QD>(dict: Dict$<QC, QD>, key: QC): Dict$<QC, QD>;

export function drop<QO, QP>(dict: Dict$<QO, QP>, disallowed_keys: _.List<QO>): Dict$<
  QO,
  QP
>;

export function upsert<QV, QW>(
  dict: Dict$<QV, QW>,
  key: QV,
  fun: (x0: $option.Option$<QW>) => QW
): Dict$<QV, QW>;

export function fold<RC, RD, RG>(
  dict: Dict$<RC, RD>,
  initial: RG,
  fun: (x0: RG, x1: RC, x2: RD) => RG
): RG;

export function map_values<MM, MN, MQ>(
  dict: Dict$<MM, MN>,
  fun: (x0: MM, x1: MN) => MQ
): Dict$<MM, MQ>;

export function filter<NY, NZ>(
  dict: Dict$<NY, NZ>,
  predicate: (x0: NY, x1: NZ) => boolean
): Dict$<NY, NZ>;

export function each<RL, RM>(dict: Dict$<RL, RM>, fun: (x0: RL, x1: RM) => any): undefined;

export function combine<RQ, RR>(
  dict: Dict$<RQ, RR>,
  other: Dict$<RQ, RR>,
  fun: (x0: RR, x1: RR) => RR
): Dict$<RQ, RR>;

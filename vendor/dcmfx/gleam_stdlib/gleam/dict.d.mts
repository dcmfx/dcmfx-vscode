import type * as _ from "../gleam.d.mts";
import type * as $option from "../gleam/option.d.mts";

export type Dict$<KR, KQ> = unknown;

export function size(dict: Dict$<any, any>): number;

export function to_list<LA, LB>(dict: Dict$<LA, LB>): _.List<[LA, LB]>;

export function new$(): Dict$<any, any>;

export function is_empty(dict: Dict$<any, any>): boolean;

export function get<MD, ME>(from: Dict$<MD, ME>, get: MD): _.Result<
  ME,
  undefined
>;

export function has_key<LR>(dict: Dict$<LR, any>, key: LR): boolean;

export function insert<MJ, MK>(dict: Dict$<MJ, MK>, key: MJ, value: MK): Dict$<
  MJ,
  MK
>;

export function from_list<LF, LG>(list: _.List<[LF, LG]>): Dict$<LF, LG>;

export function keys<NJ>(dict: Dict$<NJ, any>): _.List<NJ>;

export function values<NY>(dict: Dict$<any, NY>): _.List<NY>;

export function take<OT, OU>(dict: Dict$<OT, OU>, desired_keys: _.List<OT>): Dict$<
  OT,
  OU
>;

export function merge<PQ, PR>(dict: Dict$<PQ, PR>, new_entries: Dict$<PQ, PR>): Dict$<
  PQ,
  PR
>;

export function delete$<QL, QM>(dict: Dict$<QL, QM>, key: QL): Dict$<QL, QM>;

export function drop<QX, QY>(dict: Dict$<QX, QY>, disallowed_keys: _.List<QX>): Dict$<
  QX,
  QY
>;

export function upsert<RE, RF>(
  dict: Dict$<RE, RF>,
  key: RE,
  fun: (x0: $option.Option$<RF>) => RF
): Dict$<RE, RF>;

export function fold<RL, RM, RP>(
  dict: Dict$<RL, RM>,
  initial: RP,
  fun: (x0: RP, x1: RL, x2: RM) => RP
): RP;

export function map_values<MV, MW, MZ>(
  dict: Dict$<MV, MW>,
  fun: (x0: MV, x1: MW) => MZ
): Dict$<MV, MZ>;

export function filter<OH, OI>(
  dict: Dict$<OH, OI>,
  predicate: (x0: OH, x1: OI) => boolean
): Dict$<OH, OI>;

export function each<RU, RV>(dict: Dict$<RU, RV>, fun: (x0: RU, x1: RV) => any): undefined;

export function combine<RZ, SA>(
  dict: Dict$<RZ, SA>,
  other: Dict$<RZ, SA>,
  fun: (x0: SA, x1: SA) => SA
): Dict$<RZ, SA>;

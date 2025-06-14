import type * as _ from "../gleam.d.mts";
import type * as $option from "../gleam/option.d.mts";

export type Dict$<LA, LB> = unknown;

export function size(dict: Dict$<any, any>): number;

export function is_empty(dict: Dict$<any, any>): boolean;

export function to_list<LK, LL>(dict: Dict$<LK, LL>): _.List<[LK, LL]>;

export function new$(): Dict$<any, any>;

export function get<MN, MO>(from: Dict$<MN, MO>, get: MN): _.Result<
  MO,
  undefined
>;

export function has_key<MB>(dict: Dict$<MB, any>, key: MB): boolean;

export function insert<MT, MU>(dict: Dict$<MT, MU>, key: MT, value: MU): Dict$<
  MT,
  MU
>;

export function from_list<LP, LQ>(list: _.List<[LP, LQ]>): Dict$<LP, LQ>;

export function keys<NT>(dict: Dict$<NT, any>): _.List<NT>;

export function values<OI>(dict: Dict$<any, OI>): _.List<OI>;

export function take<PD, PE>(dict: Dict$<PD, PE>, desired_keys: _.List<PD>): Dict$<
  PD,
  PE
>;

export function merge<QA, QB>(dict: Dict$<QA, QB>, new_entries: Dict$<QA, QB>): Dict$<
  QA,
  QB
>;

export function delete$<QV, QW>(dict: Dict$<QV, QW>, key: QV): Dict$<QV, QW>;

export function drop<RH, RI>(dict: Dict$<RH, RI>, disallowed_keys: _.List<RH>): Dict$<
  RH,
  RI
>;

export function upsert<RO, RP>(
  dict: Dict$<RO, RP>,
  key: RO,
  fun: (x0: $option.Option$<RP>) => RP
): Dict$<RO, RP>;

export function fold<RV, RW, RZ>(
  dict: Dict$<RV, RW>,
  initial: RZ,
  fun: (x0: RZ, x1: RV, x2: RW) => RZ
): RZ;

export function map_values<NF, NG, NJ>(
  dict: Dict$<NF, NG>,
  fun: (x0: NF, x1: NG) => NJ
): Dict$<NF, NJ>;

export function filter<OR, OS>(
  dict: Dict$<OR, OS>,
  predicate: (x0: OR, x1: OS) => boolean
): Dict$<OR, OS>;

export function each<SE, SF>(dict: Dict$<SE, SF>, fun: (x0: SE, x1: SF) => any): undefined;

export function combine<SJ, SK>(
  dict: Dict$<SJ, SK>,
  other: Dict$<SJ, SK>,
  fun: (x0: SK, x1: SK) => SK
): Dict$<SJ, SK>;

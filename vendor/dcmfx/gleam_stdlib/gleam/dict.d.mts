import type * as _ from "../gleam.d.mts";
import type * as $option from "../gleam/option.d.mts";

export type Dict$<KE, KF> = unknown;

export function size(dict: Dict$<any, any>): number;

export function is_empty(dict: Dict$<any, any>): boolean;

export function to_list<KO, KP>(dict: Dict$<KO, KP>): _.List<[KO, KP]>;

export function new$(): Dict$<any, any>;

export function get<LR, LS>(from: Dict$<LR, LS>, get: LR): _.Result<
  LS,
  undefined
>;

export function has_key<LF>(dict: Dict$<LF, any>, key: LF): boolean;

export function insert<LX, LY>(dict: Dict$<LX, LY>, key: LX, value: LY): Dict$<
  LX,
  LY
>;

export function from_list<KT, KU>(list: _.List<[KT, KU]>): Dict$<KT, KU>;

export function keys<MX>(dict: Dict$<MX, any>): _.List<MX>;

export function values<NM>(dict: Dict$<any, NM>): _.List<NM>;

export function take<OH, OI>(dict: Dict$<OH, OI>, desired_keys: _.List<OH>): Dict$<
  OH,
  OI
>;

export function merge<PE, PF>(dict: Dict$<PE, PF>, new_entries: Dict$<PE, PF>): Dict$<
  PE,
  PF
>;

export function delete$<PZ, QA>(dict: Dict$<PZ, QA>, key: PZ): Dict$<PZ, QA>;

export function drop<QL, QM>(dict: Dict$<QL, QM>, disallowed_keys: _.List<QL>): Dict$<
  QL,
  QM
>;

export function upsert<QS, QT>(
  dict: Dict$<QS, QT>,
  key: QS,
  fun: (x0: $option.Option$<QT>) => QT
): Dict$<QS, QT>;

export function fold<QZ, RA, RD>(
  dict: Dict$<QZ, RA>,
  initial: RD,
  fun: (x0: RD, x1: QZ, x2: RA) => RD
): RD;

export function map_values<MJ, MK, MN>(
  dict: Dict$<MJ, MK>,
  fun: (x0: MJ, x1: MK) => MN
): Dict$<MJ, MN>;

export function filter<NV, NW>(
  dict: Dict$<NV, NW>,
  predicate: (x0: NV, x1: NW) => boolean
): Dict$<NV, NW>;

export function each<RI, RJ>(dict: Dict$<RI, RJ>, fun: (x0: RI, x1: RJ) => any): undefined;

export function combine<RN, RO>(
  dict: Dict$<RN, RO>,
  other: Dict$<RN, RO>,
  fun: (x0: RO, x1: RO) => RO
): Dict$<RN, RO>;

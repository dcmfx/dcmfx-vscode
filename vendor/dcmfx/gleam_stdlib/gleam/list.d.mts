import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";
import type * as $order from "../gleam/order.d.mts";

export class Continue<YG> extends _.CustomType {
  constructor(argument$0: YG);
  
  0: YG;
}

export class Stop<YG> extends _.CustomType {
  constructor(argument$0: YG);
  
  0: YG;
}

export type ContinueOrStop$<YG> = Continue<YG> | Stop<YG>;

declare class Ascending extends _.CustomType {}

declare class Descending extends _.CustomType {}

declare type Sorting$ = Ascending | Descending;

export function length(list: _.List<any>): number;

export function reverse<YN>(list: _.List<YN>): _.List<YN>;

export function is_empty(list: _.List<any>): boolean;

export function contains<YW>(list: _.List<YW>, elem: YW): boolean;

export function first<YY>(list: _.List<YY>): _.Result<YY, undefined>;

export function rest<AAC>(list: _.List<AAC>): _.Result<_.List<AAC>, undefined>;

export function filter<AAV>(list: _.List<AAV>, predicate: (x0: AAV) => boolean): _.List<
  AAV
>;

export function filter_map<ABC, ABE>(
  list: _.List<ABC>,
  fun: (x0: ABC) => _.Result<ABE, any>
): _.List<ABE>;

export function map<ABR, ABT>(list: _.List<ABR>, fun: (x0: ABR) => ABT): _.List<
  ABT
>;

export function map2<ACA, ACC, ACE>(
  list1: _.List<ACA>,
  list2: _.List<ACC>,
  fun: (x0: ACA, x1: ACC) => ACE
): _.List<ACE>;

export function index_map<ACS, ACU>(
  list: _.List<ACS>,
  fun: (x0: ACS, x1: number) => ACU
): _.List<ACU>;

export function try_map<ADB, ADD, ADE>(
  list: _.List<ADB>,
  fun: (x0: ADB) => _.Result<ADD, ADE>
): _.Result<_.List<ADD>, ADE>;

export function drop<ADU>(list: _.List<ADU>, n: number): _.List<ADU>;

export function take<ADX>(list: _.List<ADX>, n: number): _.List<ADX>;

export function new$(): _.List<any>;

export function wrap<AEG>(item: AEG): _.List<AEG>;

export function append<AEI>(first: _.List<AEI>, second: _.List<AEI>): _.List<
  AEI
>;

export function prepend<AEQ>(list: _.List<AEQ>, item: AEQ): _.List<AEQ>;

export function flatten<AFC>(lists: _.List<_.List<AFC>>): _.List<AFC>;

export function flat_map<AFG, AFI>(
  list: _.List<AFG>,
  fun: (x0: AFG) => _.List<AFI>
): _.List<AFI>;

export function fold<AFL, AFN>(
  list: _.List<AFL>,
  initial: AFN,
  fun: (x0: AFN, x1: AFL) => AFN
): AFN;

export function count<YL>(list: _.List<YL>, predicate: (x0: YL) => boolean): number;

export function group<AAH, AAJ>(list: _.List<AAH>, key: (x0: AAH) => AAJ): $dict.Dict$<
  AAJ,
  _.List<AAH>
>;

export function map_fold<ACN, ACP, ACQ>(
  list: _.List<ACN>,
  initial: ACP,
  fun: (x0: ACP, x1: ACN) => [ACP, ACQ]
): [ACP, _.List<ACQ>];

export function fold_right<AFO, AFQ>(
  list: _.List<AFO>,
  initial: AFQ,
  fun: (x0: AFQ, x1: AFO) => AFQ
): AFQ;

export function index_fold<AFR, AFT>(
  list: _.List<AFR>,
  initial: AFT,
  fun: (x0: AFT, x1: AFR, x2: number) => AFT
): AFT;

export function try_fold<AFX, AFZ, AGA>(
  list: _.List<AFX>,
  initial: AFZ,
  fun: (x0: AFZ, x1: AFX) => _.Result<AFZ, AGA>
): _.Result<AFZ, AGA>;

export function fold_until<AGF, AGH>(
  list: _.List<AGF>,
  initial: AGH,
  fun: (x0: AGH, x1: AGF) => ContinueOrStop$<AGH>
): AGH;

export function find<AGJ>(list: _.List<AGJ>, is_desired: (x0: AGJ) => boolean): _.Result<
  AGJ,
  undefined
>;

export function find_map<AGN, AGP>(
  list: _.List<AGN>,
  fun: (x0: AGN) => _.Result<AGP, any>
): _.Result<AGP, undefined>;

export function all<AGV>(list: _.List<AGV>, predicate: (x0: AGV) => boolean): boolean;

export function any<AGX>(list: _.List<AGX>, predicate: (x0: AGX) => boolean): boolean;

export function zip<AGZ, AHB>(list: _.List<AGZ>, other: _.List<AHB>): _.List<
  [AGZ, AHB]
>;

export function strict_zip<AHK, AHM>(list: _.List<AHK>, other: _.List<AHM>): _.Result<
  _.List<[AHK, AHM]>,
  undefined
>;

export function unzip<AHZ, AIA>(input: _.List<[AHZ, AIA]>): [
  _.List<AHZ>,
  _.List<AIA>
];

export function intersperse<AIL>(list: _.List<AIL>, elem: AIL): _.List<AIL>;

export function unique<AIS>(list: _.List<AIS>): _.List<AIS>;

export function sort<AIV>(
  list: _.List<AIV>,
  compare: (x0: AIV, x1: AIV) => $order.Order$
): _.List<AIV>;

export function range(start: number, stop: number): _.List<number>;

export function repeat<AKI>(a: AKI, times: number): _.List<AKI>;

export function split<AKN>(list: _.List<AKN>, index: number): [
  _.List<AKN>,
  _.List<AKN>
];

export function split_while<AKW>(
  list: _.List<AKW>,
  predicate: (x0: AKW) => boolean
): [_.List<AKW>, _.List<AKW>];

export function key_find<ALF, ALG>(
  keyword_list: _.List<[ALF, ALG]>,
  desired_key: ALF
): _.Result<ALG, undefined>;

export function key_filter<ALK, ALL>(
  keyword_list: _.List<[ALK, ALL]>,
  desired_key: ALK
): _.List<ALL>;

export function pop<ALO>(list: _.List<ALO>, is_desired: (x0: ALO) => boolean): _.Result<
  [ALO, _.List<ALO>],
  undefined
>;

export function pop_map<ALX, ALZ>(
  haystack: _.List<ALX>,
  is_desired: (x0: ALX) => _.Result<ALZ, any>
): _.Result<[ALZ, _.List<ALX>], undefined>;

export function key_pop<AMQ, AMR>(list: _.List<[AMQ, AMR]>, key: AMQ): _.Result<
  [AMR, _.List<[AMQ, AMR]>],
  undefined
>;

export function key_set<AMW, AMX>(
  list: _.List<[AMW, AMX]>,
  key: AMW,
  value: AMX
): _.List<[AMW, AMX]>;

export function each<ANA>(list: _.List<ANA>, f: (x0: ANA) => any): undefined;

export function try_each<AND, ANG>(
  list: _.List<AND>,
  fun: (x0: AND) => _.Result<any, ANG>
): _.Result<undefined, ANG>;

export function partition<ANL>(
  list: _.List<ANL>,
  categorise: (x0: ANL) => boolean
): [_.List<ANL>, _.List<ANL>];

export function permutations<ANU>(list: _.List<ANU>): _.List<_.List<ANU>>;

export function window<ANY>(list: _.List<ANY>, n: number): _.List<_.List<ANY>>;

export function window_by_2<AOI>(list: _.List<AOI>): _.List<[AOI, AOI]>;

export function drop_while<AOL>(
  list: _.List<AOL>,
  predicate: (x0: AOL) => boolean
): _.List<AOL>;

export function take_while<AOO>(
  list: _.List<AOO>,
  predicate: (x0: AOO) => boolean
): _.List<AOO>;

export function chunk<AOV>(list: _.List<AOV>, f: (x0: AOV) => any): _.List<
  _.List<AOV>
>;

export function sized_chunk<API>(list: _.List<API>, count: number): _.List<
  _.List<API>
>;

export function reduce<APT>(list: _.List<APT>, fun: (x0: APT, x1: APT) => APT): _.Result<
  APT,
  undefined
>;

export function scan<APX, APZ>(
  list: _.List<APX>,
  initial: APZ,
  fun: (x0: APZ, x1: APX) => APZ
): _.List<APZ>;

export function last<AQG>(list: _.List<AQG>): _.Result<AQG, undefined>;

export function combinations<AQK>(items: _.List<AQK>, n: number): _.List<
  _.List<AQK>
>;

export function combination_pairs<AQO>(items: _.List<AQO>): _.List<[AQO, AQO]>;

export function transpose<AQZ>(list_of_list: _.List<_.List<AQZ>>): _.List<
  _.List<AQZ>
>;

export function interleave<AQV>(list: _.List<_.List<AQV>>): _.List<AQV>;

export function shuffle<ARE>(list: _.List<ARE>): _.List<ARE>;

export function max<ARO>(
  list: _.List<ARO>,
  compare: (x0: ARO, x1: ARO) => $order.Order$
): _.Result<ARO, undefined>;

export function sample<ARS>(list: _.List<ARS>, k: number): _.List<ARS>;

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

export function count<YL>(list: _.List<YL>, predicate: (x0: YL) => boolean): number;

export function reverse<YP>(list: _.List<YP>): _.List<YP>;

export function is_empty(list: _.List<any>): boolean;

export function contains<YY>(list: _.List<YY>, elem: YY): boolean;

export function first<AAA>(list: _.List<AAA>): _.Result<AAA, undefined>;

export function rest<AAE>(list: _.List<AAE>): _.Result<_.List<AAE>, undefined>;

export function group<AAJ, AAL>(list: _.List<AAJ>, key: (x0: AAJ) => AAL): $dict.Dict$<
  AAL,
  _.List<AAJ>
>;

export function filter<AAY>(list: _.List<AAY>, predicate: (x0: AAY) => boolean): _.List<
  AAY
>;

export function filter_map<ABF, ABH>(
  list: _.List<ABF>,
  fun: (x0: ABF) => _.Result<ABH, any>
): _.List<ABH>;

export function map<ABU, ABW>(list: _.List<ABU>, fun: (x0: ABU) => ABW): _.List<
  ABW
>;

export function map2<ACD, ACF, ACH>(
  list1: _.List<ACD>,
  list2: _.List<ACF>,
  fun: (x0: ACD, x1: ACF) => ACH
): _.List<ACH>;

export function map_fold<ACQ, ACS, ACT>(
  list: _.List<ACQ>,
  initial: ACS,
  fun: (x0: ACS, x1: ACQ) => [ACS, ACT]
): [ACS, _.List<ACT>];

export function index_map<ADB, ADD>(
  list: _.List<ADB>,
  fun: (x0: ADB, x1: number) => ADD
): _.List<ADD>;

export function try_map<ADK, ADM, ADN>(
  list: _.List<ADK>,
  fun: (x0: ADK) => _.Result<ADM, ADN>
): _.Result<_.List<ADM>, ADN>;

export function drop<AED>(list: _.List<AED>, n: number): _.List<AED>;

export function take<AEG>(list: _.List<AEG>, n: number): _.List<AEG>;

export function new$(): _.List<any>;

export function wrap<AEP>(item: AEP): _.List<AEP>;

export function append<AER>(first: _.List<AER>, second: _.List<AER>): _.List<
  AER
>;

export function prepend<AEZ>(list: _.List<AEZ>, item: AEZ): _.List<AEZ>;

export function flatten<AFC>(lists: _.List<_.List<AFC>>): _.List<AFC>;

export function flat_map<AFL, AFN>(
  list: _.List<AFL>,
  fun: (x0: AFL) => _.List<AFN>
): _.List<AFN>;

export function fold<AFQ, AFS>(
  list: _.List<AFQ>,
  initial: AFS,
  fun: (x0: AFS, x1: AFQ) => AFS
): AFS;

export function fold_right<AFT, AFV>(
  list: _.List<AFT>,
  initial: AFV,
  fun: (x0: AFV, x1: AFT) => AFV
): AFV;

export function index_fold<AFW, AFY>(
  list: _.List<AFW>,
  initial: AFY,
  fun: (x0: AFY, x1: AFW, x2: number) => AFY
): AFY;

export function try_fold<AGC, AGE, AGF>(
  list: _.List<AGC>,
  initial: AGE,
  fun: (x0: AGE, x1: AGC) => _.Result<AGE, AGF>
): _.Result<AGE, AGF>;

export function fold_until<AGK, AGM>(
  list: _.List<AGK>,
  initial: AGM,
  fun: (x0: AGM, x1: AGK) => ContinueOrStop$<AGM>
): AGM;

export function find<AGO>(list: _.List<AGO>, is_desired: (x0: AGO) => boolean): _.Result<
  AGO,
  undefined
>;

export function find_map<AGS, AGU>(
  list: _.List<AGS>,
  fun: (x0: AGS) => _.Result<AGU, any>
): _.Result<AGU, undefined>;

export function all<AHA>(list: _.List<AHA>, predicate: (x0: AHA) => boolean): boolean;

export function any<AHC>(list: _.List<AHC>, predicate: (x0: AHC) => boolean): boolean;

export function zip<AHE, AHG>(list: _.List<AHE>, other: _.List<AHG>): _.List<
  [AHE, AHG]
>;

export function strict_zip<AHP, AHR>(list: _.List<AHP>, other: _.List<AHR>): _.Result<
  _.List<[AHP, AHR]>,
  undefined
>;

export function unzip<AIE, AIF>(input: _.List<[AIE, AIF]>): [
  _.List<AIE>,
  _.List<AIF>
];

export function intersperse<AIQ>(list: _.List<AIQ>, elem: AIQ): _.List<AIQ>;

export function unique<AIX>(list: _.List<AIX>): _.List<AIX>;

export function sort<AJG>(
  list: _.List<AJG>,
  compare: (x0: AJG, x1: AJG) => $order.Order$
): _.List<AJG>;

export function range(start: number, stop: number): _.List<number>;

export function repeat<AKT>(a: AKT, times: number): _.List<AKT>;

export function split<AKY>(list: _.List<AKY>, index: number): [
  _.List<AKY>,
  _.List<AKY>
];

export function split_while<ALH>(
  list: _.List<ALH>,
  predicate: (x0: ALH) => boolean
): [_.List<ALH>, _.List<ALH>];

export function key_find<ALQ, ALR>(
  keyword_list: _.List<[ALQ, ALR]>,
  desired_key: ALQ
): _.Result<ALR, undefined>;

export function key_filter<ALV, ALW>(
  keyword_list: _.List<[ALV, ALW]>,
  desired_key: ALV
): _.List<ALW>;

export function key_pop<ALZ, AMA>(list: _.List<[ALZ, AMA]>, key: ALZ): _.Result<
  [AMA, _.List<[ALZ, AMA]>],
  undefined
>;

export function key_set<AMM, AMN>(
  list: _.List<[AMM, AMN]>,
  key: AMM,
  value: AMN
): _.List<[AMM, AMN]>;

export function each<AMV>(list: _.List<AMV>, f: (x0: AMV) => any): undefined;

export function try_each<AMY, ANB>(
  list: _.List<AMY>,
  fun: (x0: AMY) => _.Result<any, ANB>
): _.Result<undefined, ANB>;

export function partition<ANG>(
  list: _.List<ANG>,
  categorise: (x0: ANG) => boolean
): [_.List<ANG>, _.List<ANG>];

export function permutations<ANP>(list: _.List<ANP>): _.List<_.List<ANP>>;

export function window<ANT>(list: _.List<ANT>, n: number): _.List<_.List<ANT>>;

export function window_by_2<AOD>(list: _.List<AOD>): _.List<[AOD, AOD]>;

export function drop_while<AOG>(
  list: _.List<AOG>,
  predicate: (x0: AOG) => boolean
): _.List<AOG>;

export function take_while<AOJ>(
  list: _.List<AOJ>,
  predicate: (x0: AOJ) => boolean
): _.List<AOJ>;

export function chunk<AOQ>(list: _.List<AOQ>, f: (x0: AOQ) => any): _.List<
  _.List<AOQ>
>;

export function sized_chunk<APD>(list: _.List<APD>, count: number): _.List<
  _.List<APD>
>;

export function reduce<APO>(list: _.List<APO>, fun: (x0: APO, x1: APO) => APO): _.Result<
  APO,
  undefined
>;

export function scan<APS, APU>(
  list: _.List<APS>,
  initial: APU,
  fun: (x0: APU, x1: APS) => APU
): _.List<APU>;

export function last<AQB>(list: _.List<AQB>): _.Result<AQB, undefined>;

export function combinations<AQF>(items: _.List<AQF>, n: number): _.List<
  _.List<AQF>
>;

export function combination_pairs<AQJ>(items: _.List<AQJ>): _.List<[AQJ, AQJ]>;

export function transpose<AQU>(list_of_lists: _.List<_.List<AQU>>): _.List<
  _.List<AQU>
>;

export function interleave<AQQ>(list: _.List<_.List<AQQ>>): _.List<AQQ>;

export function shuffle<ARP>(list: _.List<ARP>): _.List<ARP>;

export function max<ARZ>(
  list: _.List<ARZ>,
  compare: (x0: ARZ, x1: ARZ) => $order.Order$
): _.Result<ARZ, undefined>;

export function sample<ASH>(list: _.List<ASH>, k: number): _.List<ASH>;

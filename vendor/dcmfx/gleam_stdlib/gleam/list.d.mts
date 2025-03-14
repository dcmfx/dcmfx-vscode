import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";
import type * as $order from "../gleam/order.d.mts";

export class Continue<YP> extends _.CustomType {
  constructor(argument$0: YP);
  
  0: YP;
}

export class Stop<YP> extends _.CustomType {
  constructor(argument$0: YP);
  
  0: YP;
}

export type ContinueOrStop$<YP> = Continue<YP> | Stop<YP>;

declare class Ascending extends _.CustomType {}

declare class Descending extends _.CustomType {}

declare type Sorting$ = Ascending | Descending;

export function length(list: _.List<any>): number;

export function reverse<YW>(list: _.List<YW>): _.List<YW>;

export function is_empty(list: _.List<any>): boolean;

export function contains<AAF>(list: _.List<AAF>, elem: AAF): boolean;

export function first<AAH>(list: _.List<AAH>): _.Result<AAH, undefined>;

export function rest<AAL>(list: _.List<AAL>): _.Result<_.List<AAL>, undefined>;

export function filter<ABE>(list: _.List<ABE>, predicate: (x0: ABE) => boolean): _.List<
  ABE
>;

export function filter_map<ABL, ABN>(
  list: _.List<ABL>,
  fun: (x0: ABL) => _.Result<ABN, any>
): _.List<ABN>;

export function map<ACA, ACC>(list: _.List<ACA>, fun: (x0: ACA) => ACC): _.List<
  ACC
>;

export function map2<ACJ, ACL, ACN>(
  list1: _.List<ACJ>,
  list2: _.List<ACL>,
  fun: (x0: ACJ, x1: ACL) => ACN
): _.List<ACN>;

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

export function flatten<AFH>(lists: _.List<_.List<AFH>>): _.List<AFH>;

export function flat_map<AFL, AFN>(
  list: _.List<AFL>,
  fun: (x0: AFL) => _.List<AFN>
): _.List<AFN>;

export function fold<AFQ, AFS>(
  list: _.List<AFQ>,
  initial: AFS,
  fun: (x0: AFS, x1: AFQ) => AFS
): AFS;

export function count<YU>(list: _.List<YU>, predicate: (x0: YU) => boolean): number;

export function group<AAQ, AAS>(list: _.List<AAQ>, key: (x0: AAQ) => AAS): $dict.Dict$<
  AAS,
  _.List<AAQ>
>;

export function map_fold<ACW, ACY, ACZ>(
  list: _.List<ACW>,
  initial: ACY,
  fun: (x0: ACY, x1: ACW) => [ACY, ACZ]
): [ACY, _.List<ACZ>];

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

export function pop<ALZ>(list: _.List<ALZ>, is_desired: (x0: ALZ) => boolean): _.Result<
  [ALZ, _.List<ALZ>],
  undefined
>;

export function pop_map<AMI, AMK>(
  haystack: _.List<AMI>,
  is_desired: (x0: AMI) => _.Result<AMK, any>
): _.Result<[AMK, _.List<AMI>], undefined>;

export function key_pop<ANB, ANC>(list: _.List<[ANB, ANC]>, key: ANB): _.Result<
  [ANC, _.List<[ANB, ANC]>],
  undefined
>;

export function key_set<ANO, ANP>(
  list: _.List<[ANO, ANP]>,
  key: ANO,
  value: ANP
): _.List<[ANO, ANP]>;

export function each<ANX>(list: _.List<ANX>, f: (x0: ANX) => any): undefined;

export function try_each<AOA, AOD>(
  list: _.List<AOA>,
  fun: (x0: AOA) => _.Result<any, AOD>
): _.Result<undefined, AOD>;

export function partition<AOI>(
  list: _.List<AOI>,
  categorise: (x0: AOI) => boolean
): [_.List<AOI>, _.List<AOI>];

export function permutations<AOR>(list: _.List<AOR>): _.List<_.List<AOR>>;

export function window<AOV>(list: _.List<AOV>, n: number): _.List<_.List<AOV>>;

export function window_by_2<APF>(list: _.List<APF>): _.List<[APF, APF]>;

export function drop_while<API>(
  list: _.List<API>,
  predicate: (x0: API) => boolean
): _.List<API>;

export function take_while<APL>(
  list: _.List<APL>,
  predicate: (x0: APL) => boolean
): _.List<APL>;

export function chunk<APS>(list: _.List<APS>, f: (x0: APS) => any): _.List<
  _.List<APS>
>;

export function sized_chunk<AQF>(list: _.List<AQF>, count: number): _.List<
  _.List<AQF>
>;

export function reduce<AQQ>(list: _.List<AQQ>, fun: (x0: AQQ, x1: AQQ) => AQQ): _.Result<
  AQQ,
  undefined
>;

export function scan<AQU, AQW>(
  list: _.List<AQU>,
  initial: AQW,
  fun: (x0: AQW, x1: AQU) => AQW
): _.List<AQW>;

export function last<ARD>(list: _.List<ARD>): _.Result<ARD, undefined>;

export function combinations<ARH>(items: _.List<ARH>, n: number): _.List<
  _.List<ARH>
>;

export function combination_pairs<ARL>(items: _.List<ARL>): _.List<[ARL, ARL]>;

export function transpose<ARW>(list_of_list: _.List<_.List<ARW>>): _.List<
  _.List<ARW>
>;

export function interleave<ARS>(list: _.List<_.List<ARS>>): _.List<ARS>;

export function shuffle<ASB>(list: _.List<ASB>): _.List<ASB>;

export function max<ASL>(
  list: _.List<ASL>,
  compare: (x0: ASL, x1: ASL) => $order.Order$
): _.Result<ASL, undefined>;

export function sample<ASP>(list: _.List<ASP>, k: number): _.List<ASP>;

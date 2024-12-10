import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";
import type * as $order from "../gleam/order.d.mts";

export class Continue<XW> extends _.CustomType {
  constructor(argument$0: XW);
  
  0: XW;
}

export class Stop<XW> extends _.CustomType {
  constructor(argument$0: XW);
  
  0: XW;
}

export type ContinueOrStop$<XW> = Continue<XW> | Stop<XW>;

declare class Ascending extends _.CustomType {}

declare class Descending extends _.CustomType {}

declare type Sorting$ = Ascending | Descending;

export function length(list: _.List<any>): number;

export function reverse<YD>(list: _.List<YD>): _.List<YD>;

export function is_empty(list: _.List<any>): boolean;

export function contains<YM>(list: _.List<YM>, elem: YM): boolean;

export function first<YO>(list: _.List<YO>): _.Result<YO, undefined>;

export function rest<YS>(list: _.List<YS>): _.Result<_.List<YS>, undefined>;

export function filter<AAL>(list: _.List<AAL>, predicate: (x0: AAL) => boolean): _.List<
  AAL
>;

export function filter_map<AAS, AAU>(
  list: _.List<AAS>,
  fun: (x0: AAS) => _.Result<AAU, any>
): _.List<AAU>;

export function map<ABH, ABJ>(list: _.List<ABH>, fun: (x0: ABH) => ABJ): _.List<
  ABJ
>;

export function map2<ABQ, ABS, ABU>(
  list1: _.List<ABQ>,
  list2: _.List<ABS>,
  fun: (x0: ABQ, x1: ABS) => ABU
): _.List<ABU>;

export function index_map<ACI, ACK>(
  list: _.List<ACI>,
  fun: (x0: ACI, x1: number) => ACK
): _.List<ACK>;

export function try_map<ACR, ACT, ACU>(
  list: _.List<ACR>,
  fun: (x0: ACR) => _.Result<ACT, ACU>
): _.Result<_.List<ACT>, ACU>;

export function drop<ADK>(list: _.List<ADK>, n: number): _.List<ADK>;

export function take<ADN>(list: _.List<ADN>, n: number): _.List<ADN>;

export function new$(): _.List<any>;

export function wrap<ADW>(item: ADW): _.List<ADW>;

export function append<ADY>(first: _.List<ADY>, second: _.List<ADY>): _.List<
  ADY
>;

export function prepend<AEG>(list: _.List<AEG>, item: AEG): _.List<AEG>;

export function concat<AEN>(lists: _.List<_.List<AEN>>): _.List<AEN>;

export function flatten<AEW>(lists: _.List<_.List<AEW>>): _.List<AEW>;

export function flat_map<AFA, AFC>(
  list: _.List<AFA>,
  fun: (x0: AFA) => _.List<AFC>
): _.List<AFC>;

export function fold<AFF, AFH>(
  list: _.List<AFF>,
  initial: AFH,
  fun: (x0: AFH, x1: AFF) => AFH
): AFH;

export function count<YB>(list: _.List<YB>, predicate: (x0: YB) => boolean): number;

export function group<YX, YZ>(list: _.List<YX>, key: (x0: YX) => YZ): $dict.Dict$<
  YZ,
  _.List<YX>
>;

export function map_fold<ACD, ACF, ACG>(
  list: _.List<ACD>,
  initial: ACF,
  fun: (x0: ACF, x1: ACD) => [ACF, ACG]
): [ACF, _.List<ACG>];

export function fold_right<AFI, AFK>(
  list: _.List<AFI>,
  initial: AFK,
  fun: (x0: AFK, x1: AFI) => AFK
): AFK;

export function index_fold<AFL, AFN>(
  list: _.List<AFL>,
  initial: AFN,
  fun: (x0: AFN, x1: AFL, x2: number) => AFN
): AFN;

export function try_fold<AFR, AFT, AFU>(
  list: _.List<AFR>,
  initial: AFT,
  fun: (x0: AFT, x1: AFR) => _.Result<AFT, AFU>
): _.Result<AFT, AFU>;

export function fold_until<AFZ, AGB>(
  list: _.List<AFZ>,
  initial: AGB,
  fun: (x0: AGB, x1: AFZ) => ContinueOrStop$<AGB>
): AGB;

export function find<AGD>(list: _.List<AGD>, is_desired: (x0: AGD) => boolean): _.Result<
  AGD,
  undefined
>;

export function find_map<AGH, AGJ>(
  list: _.List<AGH>,
  fun: (x0: AGH) => _.Result<AGJ, any>
): _.Result<AGJ, undefined>;

export function all<AGP>(list: _.List<AGP>, predicate: (x0: AGP) => boolean): boolean;

export function any<AGR>(list: _.List<AGR>, predicate: (x0: AGR) => boolean): boolean;

export function zip<AGT, AGV>(list: _.List<AGT>, other: _.List<AGV>): _.List<
  [AGT, AGV]
>;

export function strict_zip<AHE, AHG>(list: _.List<AHE>, other: _.List<AHG>): _.Result<
  _.List<[AHE, AHG]>,
  undefined
>;

export function unzip<AHT, AHU>(input: _.List<[AHT, AHU]>): [
  _.List<AHT>,
  _.List<AHU>
];

export function intersperse<AIF>(list: _.List<AIF>, elem: AIF): _.List<AIF>;

export function unique<AIM>(list: _.List<AIM>): _.List<AIM>;

export function sort<AIP>(
  list: _.List<AIP>,
  compare: (x0: AIP, x1: AIP) => $order.Order$
): _.List<AIP>;

export function range(start: number, stop: number): _.List<number>;

export function repeat<AKC>(a: AKC, times: number): _.List<AKC>;

export function split<AKH>(list: _.List<AKH>, index: number): [
  _.List<AKH>,
  _.List<AKH>
];

export function split_while<AKQ>(
  list: _.List<AKQ>,
  predicate: (x0: AKQ) => boolean
): [_.List<AKQ>, _.List<AKQ>];

export function key_find<AKZ, ALA>(
  keyword_list: _.List<[AKZ, ALA]>,
  desired_key: AKZ
): _.Result<ALA, undefined>;

export function key_filter<ALE, ALF>(
  keyword_list: _.List<[ALE, ALF]>,
  desired_key: ALE
): _.List<ALF>;

export function pop<ALI>(list: _.List<ALI>, is_desired: (x0: ALI) => boolean): _.Result<
  [ALI, _.List<ALI>],
  undefined
>;

export function pop_map<ALR, ALT>(
  haystack: _.List<ALR>,
  is_desired: (x0: ALR) => _.Result<ALT, any>
): _.Result<[ALT, _.List<ALR>], undefined>;

export function key_pop<AMK, AML>(list: _.List<[AMK, AML]>, key: AMK): _.Result<
  [AML, _.List<[AMK, AML]>],
  undefined
>;

export function key_set<AMQ, AMR>(
  list: _.List<[AMQ, AMR]>,
  key: AMQ,
  value: AMR
): _.List<[AMQ, AMR]>;

export function each<AMU>(list: _.List<AMU>, f: (x0: AMU) => any): undefined;

export function try_each<AMX, ANA>(
  list: _.List<AMX>,
  fun: (x0: AMX) => _.Result<any, ANA>
): _.Result<undefined, ANA>;

export function partition<ANF>(
  list: _.List<ANF>,
  categorise: (x0: ANF) => boolean
): [_.List<ANF>, _.List<ANF>];

export function permutations<ANO>(list: _.List<ANO>): _.List<_.List<ANO>>;

export function window<ANS>(list: _.List<ANS>, n: number): _.List<_.List<ANS>>;

export function window_by_2<AOC>(list: _.List<AOC>): _.List<[AOC, AOC]>;

export function drop_while<AOF>(
  list: _.List<AOF>,
  predicate: (x0: AOF) => boolean
): _.List<AOF>;

export function take_while<AOI>(
  list: _.List<AOI>,
  predicate: (x0: AOI) => boolean
): _.List<AOI>;

export function chunk<AOP>(list: _.List<AOP>, f: (x0: AOP) => any): _.List<
  _.List<AOP>
>;

export function sized_chunk<APC>(list: _.List<APC>, count: number): _.List<
  _.List<APC>
>;

export function reduce<APN>(list: _.List<APN>, fun: (x0: APN, x1: APN) => APN): _.Result<
  APN,
  undefined
>;

export function scan<APR, APT>(
  list: _.List<APR>,
  initial: APT,
  fun: (x0: APT, x1: APR) => APT
): _.List<APT>;

export function last<AQA>(list: _.List<AQA>): _.Result<AQA, undefined>;

export function combinations<AQE>(items: _.List<AQE>, n: number): _.List<
  _.List<AQE>
>;

export function combination_pairs<AQI>(items: _.List<AQI>): _.List<[AQI, AQI]>;

export function transpose<AQT>(list_of_list: _.List<_.List<AQT>>): _.List<
  _.List<AQT>
>;

export function interleave<AQP>(list: _.List<_.List<AQP>>): _.List<AQP>;

export function shuffle<AQY>(list: _.List<AQY>): _.List<AQY>;

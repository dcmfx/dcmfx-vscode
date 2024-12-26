import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";
import type * as $order from "../gleam/order.d.mts";

export class Continue<YF> extends _.CustomType {
  constructor(argument$0: YF);
  
  0: YF;
}

export class Stop<YF> extends _.CustomType {
  constructor(argument$0: YF);
  
  0: YF;
}

export type ContinueOrStop$<YF> = Continue<YF> | Stop<YF>;

declare class Ascending extends _.CustomType {}

declare class Descending extends _.CustomType {}

declare type Sorting$ = Ascending | Descending;

export function length(list: _.List<any>): number;

export function reverse<YM>(list: _.List<YM>): _.List<YM>;

export function is_empty(list: _.List<any>): boolean;

export function contains<YV>(list: _.List<YV>, elem: YV): boolean;

export function first<YX>(list: _.List<YX>): _.Result<YX, undefined>;

export function rest<AAB>(list: _.List<AAB>): _.Result<_.List<AAB>, undefined>;

export function filter<AAU>(list: _.List<AAU>, predicate: (x0: AAU) => boolean): _.List<
  AAU
>;

export function filter_map<ABB, ABD>(
  list: _.List<ABB>,
  fun: (x0: ABB) => _.Result<ABD, any>
): _.List<ABD>;

export function map<ABQ, ABS>(list: _.List<ABQ>, fun: (x0: ABQ) => ABS): _.List<
  ABS
>;

export function map2<ABZ, ACB, ACD>(
  list1: _.List<ABZ>,
  list2: _.List<ACB>,
  fun: (x0: ABZ, x1: ACB) => ACD
): _.List<ACD>;

export function index_map<ACR, ACT>(
  list: _.List<ACR>,
  fun: (x0: ACR, x1: number) => ACT
): _.List<ACT>;

export function try_map<ADA, ADC, ADD>(
  list: _.List<ADA>,
  fun: (x0: ADA) => _.Result<ADC, ADD>
): _.Result<_.List<ADC>, ADD>;

export function drop<ADT>(list: _.List<ADT>, n: number): _.List<ADT>;

export function take<ADW>(list: _.List<ADW>, n: number): _.List<ADW>;

export function new$(): _.List<any>;

export function wrap<AEF>(item: AEF): _.List<AEF>;

export function append<AEH>(first: _.List<AEH>, second: _.List<AEH>): _.List<
  AEH
>;

export function prepend<AEP>(list: _.List<AEP>, item: AEP): _.List<AEP>;

export function concat<AEW>(lists: _.List<_.List<AEW>>): _.List<AEW>;

export function flatten<AFF>(lists: _.List<_.List<AFF>>): _.List<AFF>;

export function flat_map<AFJ, AFL>(
  list: _.List<AFJ>,
  fun: (x0: AFJ) => _.List<AFL>
): _.List<AFL>;

export function fold<AFO, AFQ>(
  list: _.List<AFO>,
  initial: AFQ,
  fun: (x0: AFQ, x1: AFO) => AFQ
): AFQ;

export function count<YK>(list: _.List<YK>, predicate: (x0: YK) => boolean): number;

export function group<AAG, AAI>(list: _.List<AAG>, key: (x0: AAG) => AAI): $dict.Dict$<
  AAI,
  _.List<AAG>
>;

export function map_fold<ACM, ACO, ACP>(
  list: _.List<ACM>,
  initial: ACO,
  fun: (x0: ACO, x1: ACM) => [ACO, ACP]
): [ACO, _.List<ACP>];

export function fold_right<AFR, AFT>(
  list: _.List<AFR>,
  initial: AFT,
  fun: (x0: AFT, x1: AFR) => AFT
): AFT;

export function index_fold<AFU, AFW>(
  list: _.List<AFU>,
  initial: AFW,
  fun: (x0: AFW, x1: AFU, x2: number) => AFW
): AFW;

export function try_fold<AGA, AGC, AGD>(
  list: _.List<AGA>,
  initial: AGC,
  fun: (x0: AGC, x1: AGA) => _.Result<AGC, AGD>
): _.Result<AGC, AGD>;

export function fold_until<AGI, AGK>(
  list: _.List<AGI>,
  initial: AGK,
  fun: (x0: AGK, x1: AGI) => ContinueOrStop$<AGK>
): AGK;

export function find<AGM>(list: _.List<AGM>, is_desired: (x0: AGM) => boolean): _.Result<
  AGM,
  undefined
>;

export function find_map<AGQ, AGS>(
  list: _.List<AGQ>,
  fun: (x0: AGQ) => _.Result<AGS, any>
): _.Result<AGS, undefined>;

export function all<AGY>(list: _.List<AGY>, predicate: (x0: AGY) => boolean): boolean;

export function any<AHA>(list: _.List<AHA>, predicate: (x0: AHA) => boolean): boolean;

export function zip<AHC, AHE>(list: _.List<AHC>, other: _.List<AHE>): _.List<
  [AHC, AHE]
>;

export function strict_zip<AHN, AHP>(list: _.List<AHN>, other: _.List<AHP>): _.Result<
  _.List<[AHN, AHP]>,
  undefined
>;

export function unzip<AIC, AID>(input: _.List<[AIC, AID]>): [
  _.List<AIC>,
  _.List<AID>
];

export function intersperse<AIO>(list: _.List<AIO>, elem: AIO): _.List<AIO>;

export function unique<AIV>(list: _.List<AIV>): _.List<AIV>;

export function sort<AIY>(
  list: _.List<AIY>,
  compare: (x0: AIY, x1: AIY) => $order.Order$
): _.List<AIY>;

export function range(start: number, stop: number): _.List<number>;

export function repeat<AKL>(a: AKL, times: number): _.List<AKL>;

export function split<AKQ>(list: _.List<AKQ>, index: number): [
  _.List<AKQ>,
  _.List<AKQ>
];

export function split_while<AKZ>(
  list: _.List<AKZ>,
  predicate: (x0: AKZ) => boolean
): [_.List<AKZ>, _.List<AKZ>];

export function key_find<ALI, ALJ>(
  keyword_list: _.List<[ALI, ALJ]>,
  desired_key: ALI
): _.Result<ALJ, undefined>;

export function key_filter<ALN, ALO>(
  keyword_list: _.List<[ALN, ALO]>,
  desired_key: ALN
): _.List<ALO>;

export function pop<ALR>(list: _.List<ALR>, is_desired: (x0: ALR) => boolean): _.Result<
  [ALR, _.List<ALR>],
  undefined
>;

export function pop_map<AMA, AMC>(
  haystack: _.List<AMA>,
  is_desired: (x0: AMA) => _.Result<AMC, any>
): _.Result<[AMC, _.List<AMA>], undefined>;

export function key_pop<AMT, AMU>(list: _.List<[AMT, AMU]>, key: AMT): _.Result<
  [AMU, _.List<[AMT, AMU]>],
  undefined
>;

export function key_set<AMZ, ANA>(
  list: _.List<[AMZ, ANA]>,
  key: AMZ,
  value: ANA
): _.List<[AMZ, ANA]>;

export function each<AND>(list: _.List<AND>, f: (x0: AND) => any): undefined;

export function try_each<ANG, ANJ>(
  list: _.List<ANG>,
  fun: (x0: ANG) => _.Result<any, ANJ>
): _.Result<undefined, ANJ>;

export function partition<ANO>(
  list: _.List<ANO>,
  categorise: (x0: ANO) => boolean
): [_.List<ANO>, _.List<ANO>];

export function permutations<ANX>(list: _.List<ANX>): _.List<_.List<ANX>>;

export function window<AOB>(list: _.List<AOB>, n: number): _.List<_.List<AOB>>;

export function window_by_2<AOL>(list: _.List<AOL>): _.List<[AOL, AOL]>;

export function drop_while<AOO>(
  list: _.List<AOO>,
  predicate: (x0: AOO) => boolean
): _.List<AOO>;

export function take_while<AOR>(
  list: _.List<AOR>,
  predicate: (x0: AOR) => boolean
): _.List<AOR>;

export function chunk<AOY>(list: _.List<AOY>, f: (x0: AOY) => any): _.List<
  _.List<AOY>
>;

export function sized_chunk<APL>(list: _.List<APL>, count: number): _.List<
  _.List<APL>
>;

export function reduce<APW>(list: _.List<APW>, fun: (x0: APW, x1: APW) => APW): _.Result<
  APW,
  undefined
>;

export function scan<AQA, AQC>(
  list: _.List<AQA>,
  initial: AQC,
  fun: (x0: AQC, x1: AQA) => AQC
): _.List<AQC>;

export function last<AQJ>(list: _.List<AQJ>): _.Result<AQJ, undefined>;

export function combinations<AQN>(items: _.List<AQN>, n: number): _.List<
  _.List<AQN>
>;

export function combination_pairs<AQR>(items: _.List<AQR>): _.List<[AQR, AQR]>;

export function transpose<ARC>(list_of_list: _.List<_.List<ARC>>): _.List<
  _.List<ARC>
>;

export function interleave<AQY>(list: _.List<_.List<AQY>>): _.List<AQY>;

export function shuffle<ARH>(list: _.List<ARH>): _.List<ARH>;

export function max<ARR>(
  list: _.List<ARR>,
  compare: (x0: ARR, x1: ARR) => $order.Order$
): _.Result<ARR, undefined>;

export function sample<ARV>(list: _.List<ARV>, k: number): _.List<ARV>;

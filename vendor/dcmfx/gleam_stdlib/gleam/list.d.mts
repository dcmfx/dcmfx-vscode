import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";
import type * as $order from "../gleam/order.d.mts";

export class Continue<XE> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: XE);
  /** @deprecated */
  0: XE;
}
export function ContinueOrStop$Continue<XE>($0: XE): ContinueOrStop$<XE>;
export function ContinueOrStop$isContinue<XE>(
  value: ContinueOrStop$<XE>,
): boolean;
export function ContinueOrStop$Continue$0<XE>(value: ContinueOrStop$<XE>): XE;

export class Stop<XE> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: XE);
  /** @deprecated */
  0: XE;
}
export function ContinueOrStop$Stop<XE>($0: XE): ContinueOrStop$<XE>;
export function ContinueOrStop$isStop<XE>(value: ContinueOrStop$<XE>): boolean;
export function ContinueOrStop$Stop$0<XE>(value: ContinueOrStop$<XE>): XE;

export type ContinueOrStop$<XE> = Continue<XE> | Stop<XE>;

declare class Ascending extends _.CustomType {}

declare class Descending extends _.CustomType {}

declare type Sorting$ = Ascending | Descending;

export function length(list: _.List<any>): number;

export function count<XJ>(list: _.List<XJ>, predicate: (x0: XJ) => boolean): number;

export function reverse<XN>(list: _.List<XN>): _.List<XN>;

export function is_empty(list: _.List<any>): boolean;

export function contains<XW>(list: _.List<XW>, elem: XW): boolean;

export function first<XY>(list: _.List<XY>): _.Result<XY, undefined>;

export function rest<YC>(list: _.List<YC>): _.Result<_.List<YC>, undefined>;

export function group<YH, YJ>(list: _.List<YH>, key: (x0: YH) => YJ): $dict.Dict$<
  YJ,
  _.List<YH>
>;

export function filter<YW>(list: _.List<YW>, predicate: (x0: YW) => boolean): _.List<
  YW
>;

export function filter_map<AAD, AAF>(
  list: _.List<AAD>,
  fun: (x0: AAD) => _.Result<AAF, any>
): _.List<AAF>;

export function map<AAS, AAU>(list: _.List<AAS>, fun: (x0: AAS) => AAU): _.List<
  AAU
>;

export function map2<ABB, ABD, ABF>(
  list1: _.List<ABB>,
  list2: _.List<ABD>,
  fun: (x0: ABB, x1: ABD) => ABF
): _.List<ABF>;

export function map_fold<ABO, ABQ, ABR>(
  list: _.List<ABO>,
  initial: ABQ,
  fun: (x0: ABQ, x1: ABO) => [ABQ, ABR]
): [ABQ, _.List<ABR>];

export function index_map<ABZ, ACB>(
  list: _.List<ABZ>,
  fun: (x0: ABZ, x1: number) => ACB
): _.List<ACB>;

export function try_map<ACI, ACK, ACL>(
  list: _.List<ACI>,
  fun: (x0: ACI) => _.Result<ACK, ACL>
): _.Result<_.List<ACK>, ACL>;

export function drop<ADB>(list: _.List<ADB>, n: number): _.List<ADB>;

export function take<ADE>(list: _.List<ADE>, n: number): _.List<ADE>;

export function new$(): _.List<any>;

export function wrap<ADN>(item: ADN): _.List<ADN>;

export function append<ADP>(first: _.List<ADP>, second: _.List<ADP>): _.List<
  ADP
>;

export function prepend<ADX>(list: _.List<ADX>, item: ADX): _.List<ADX>;

export function flatten<AEA>(lists: _.List<_.List<AEA>>): _.List<AEA>;

export function flat_map<AEJ, AEL>(
  list: _.List<AEJ>,
  fun: (x0: AEJ) => _.List<AEL>
): _.List<AEL>;

export function fold<AEO, AEQ>(
  list: _.List<AEO>,
  initial: AEQ,
  fun: (x0: AEQ, x1: AEO) => AEQ
): AEQ;

export function fold_right<AER, AET>(
  list: _.List<AER>,
  initial: AET,
  fun: (x0: AET, x1: AER) => AET
): AET;

export function index_fold<AEU, AEW>(
  list: _.List<AEU>,
  initial: AEW,
  fun: (x0: AEW, x1: AEU, x2: number) => AEW
): AEW;

export function try_fold<AFA, AFC, AFD>(
  list: _.List<AFA>,
  initial: AFC,
  fun: (x0: AFC, x1: AFA) => _.Result<AFC, AFD>
): _.Result<AFC, AFD>;

export function fold_until<AFI, AFK>(
  list: _.List<AFI>,
  initial: AFK,
  fun: (x0: AFK, x1: AFI) => ContinueOrStop$<AFK>
): AFK;

export function find<AFM>(list: _.List<AFM>, is_desired: (x0: AFM) => boolean): _.Result<
  AFM,
  undefined
>;

export function find_map<AFQ, AFS>(
  list: _.List<AFQ>,
  fun: (x0: AFQ) => _.Result<AFS, any>
): _.Result<AFS, undefined>;

export function all<AFY>(list: _.List<AFY>, predicate: (x0: AFY) => boolean): boolean;

export function any<AGA>(list: _.List<AGA>, predicate: (x0: AGA) => boolean): boolean;

export function zip<AGC, AGE>(list: _.List<AGC>, other: _.List<AGE>): _.List<
  [AGC, AGE]
>;

export function strict_zip<AGN, AGP>(list: _.List<AGN>, other: _.List<AGP>): _.Result<
  _.List<[AGN, AGP]>,
  undefined
>;

export function unzip<AHC, AHD>(input: _.List<[AHC, AHD]>): [
  _.List<AHC>,
  _.List<AHD>
];

export function intersperse<AHO>(list: _.List<AHO>, elem: AHO): _.List<AHO>;

export function unique<AHV>(list: _.List<AHV>): _.List<AHV>;

export function sort<AIE>(
  list: _.List<AIE>,
  compare: (x0: AIE, x1: AIE) => $order.Order$
): _.List<AIE>;

export function range(start: number, stop: number): _.List<number>;

export function repeat<AJR>(a: AJR, times: number): _.List<AJR>;

export function split<AJW>(list: _.List<AJW>, index: number): [
  _.List<AJW>,
  _.List<AJW>
];

export function split_while<AKF>(
  list: _.List<AKF>,
  predicate: (x0: AKF) => boolean
): [_.List<AKF>, _.List<AKF>];

export function key_find<AKO, AKP>(
  keyword_list: _.List<[AKO, AKP]>,
  desired_key: AKO
): _.Result<AKP, undefined>;

export function key_filter<AKT, AKU>(
  keyword_list: _.List<[AKT, AKU]>,
  desired_key: AKT
): _.List<AKU>;

export function key_pop<AKX, AKY>(list: _.List<[AKX, AKY]>, key: AKX): _.Result<
  [AKY, _.List<[AKX, AKY]>],
  undefined
>;

export function key_set<ALK, ALL>(
  list: _.List<[ALK, ALL]>,
  key: ALK,
  value: ALL
): _.List<[ALK, ALL]>;

export function each<ALT>(list: _.List<ALT>, f: (x0: ALT) => any): undefined;

export function try_each<ALW, ALZ>(
  list: _.List<ALW>,
  fun: (x0: ALW) => _.Result<any, ALZ>
): _.Result<undefined, ALZ>;

export function partition<AME>(
  list: _.List<AME>,
  categorise: (x0: AME) => boolean
): [_.List<AME>, _.List<AME>];

export function permutations<AMN>(list: _.List<AMN>): _.List<_.List<AMN>>;

export function window<AMR>(list: _.List<AMR>, n: number): _.List<_.List<AMR>>;

export function window_by_2<ANB>(list: _.List<ANB>): _.List<[ANB, ANB]>;

export function drop_while<ANE>(
  list: _.List<ANE>,
  predicate: (x0: ANE) => boolean
): _.List<ANE>;

export function take_while<ANH>(
  list: _.List<ANH>,
  predicate: (x0: ANH) => boolean
): _.List<ANH>;

export function chunk<ANO>(list: _.List<ANO>, f: (x0: ANO) => any): _.List<
  _.List<ANO>
>;

export function sized_chunk<AOB>(list: _.List<AOB>, count: number): _.List<
  _.List<AOB>
>;

export function reduce<AOM>(list: _.List<AOM>, fun: (x0: AOM, x1: AOM) => AOM): _.Result<
  AOM,
  undefined
>;

export function scan<AOQ, AOS>(
  list: _.List<AOQ>,
  initial: AOS,
  fun: (x0: AOS, x1: AOQ) => AOS
): _.List<AOS>;

export function last<AOZ>(list: _.List<AOZ>): _.Result<AOZ, undefined>;

export function combinations<APD>(items: _.List<APD>, n: number): _.List<
  _.List<APD>
>;

export function combination_pairs<APH>(items: _.List<APH>): _.List<[APH, APH]>;

export function transpose<APS>(list_of_lists: _.List<_.List<APS>>): _.List<
  _.List<APS>
>;

export function interleave<APO>(list: _.List<_.List<APO>>): _.List<APO>;

export function shuffle<AQN>(list: _.List<AQN>): _.List<AQN>;

export function max<AQX>(
  list: _.List<AQX>,
  compare: (x0: AQX, x1: AQX) => $order.Order$
): _.Result<AQX, undefined>;

export function sample<ARF>(list: _.List<ARF>, k: number): _.List<ARF>;

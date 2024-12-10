import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";
import type * as $list from "../gleam/list.d.mts";
import type * as $option from "../gleam/option.d.mts";

declare class Stop extends _.CustomType {}

declare class Continue<DRT> extends _.CustomType {
  constructor(argument$0: DRT, argument$1: () => Action$<any>);
  
  0: DRT;
  1: () => Action$<any>;
}

declare type Action$<DRT> = Stop | Continue<DRT>;

declare class Iterator<DRU> extends _.CustomType {
  constructor(continuation: () => Action$<any>);
  
  continuation: () => Action$<any>;
}

export type Iterator$<DRU> = Iterator<DRU>;

export class Next<DRW, DRV> extends _.CustomType {
  constructor(element: DRV, accumulator: DRW);
  
  element: DRV;
  accumulator: DRW;
}

export class Done extends _.CustomType {}

export type Step$<DRV, DRW> = Next<DRV, DRW> | Done;

declare class AnotherBy<DRX, DRY> extends _.CustomType {
  constructor(
    argument$0: _.List<any>,
    argument$1: DRY,
    argument$2: DRX,
    argument$3: () => Action$<any>
  );
  
  0: _.List<any>;
  1: DRY;
  2: DRX;
  3: () => Action$<any>;
}

declare class LastBy<DRX> extends _.CustomType {
  constructor(argument$0: _.List<any>);
  
  0: _.List<any>;
}

declare type Chunk$<DRX, DRY> = AnotherBy<DRX, DRY> | LastBy<DRX>;

declare class Another<DRZ> extends _.CustomType {
  constructor(argument$0: _.List<any>, argument$1: () => Action$<any>);
  
  0: _.List<any>;
  1: () => Action$<any>;
}

declare class Last<DRZ> extends _.CustomType {
  constructor(argument$0: _.List<any>);
  
  0: _.List<any>;
}

declare class NoMore extends _.CustomType {}

declare type SizedChunk$<DRZ> = Another<DRZ> | Last<DRZ> | NoMore;

export function unfold<DSC, DSD>(initial: DSC, f: (x0: DSC) => Step$<DSD, DSC>): Iterator$<
  DSD
>;

export function repeatedly<DSM>(f: () => DSM): Iterator$<DSM>;

export function repeat<DSO>(x: DSO): Iterator$<DSO>;

export function from_list<DSQ>(list: _.List<DSQ>): Iterator$<DSQ>;

export function transform<DTA, DTC, DTD>(
  iterator: Iterator$<DTA>,
  initial: DTC,
  f: (x0: DTC, x1: DTA) => Step$<DTD, DTC>
): Iterator$<DTD>;

export function fold<DTH, DTJ>(
  iterator: Iterator$<DTH>,
  initial: DTJ,
  f: (x0: DTJ, x1: DTH) => DTJ
): DTJ;

export function run(iterator: Iterator$<any>): undefined;

export function to_list<DTP>(iterator: Iterator$<DTP>): _.List<DTP>;

export function step<DTS>(iterator: Iterator$<DTS>): Step$<DTS, Iterator$<DTS>>;

export function take<DTX>(iterator: Iterator$<DTX>, desired: number): Iterator$<
  DTX
>;

export function drop<DUD>(iterator: Iterator$<DUD>, desired: number): Iterator$<
  DUD
>;

export function map<DUJ, DUL>(iterator: Iterator$<DUJ>, f: (x0: DUJ) => DUL): Iterator$<
  DUL
>;

export function map2<DUR, DUT, DUV>(
  iterator1: Iterator$<DUR>,
  iterator2: Iterator$<DUT>,
  fun: (x0: DUR, x1: DUT) => DUV
): Iterator$<DUV>;

export function append<DVD>(first: Iterator$<DVD>, second: Iterator$<DVD>): Iterator$<
  DVD
>;

export function flatten<DVL>(iterator: Iterator$<Iterator$<DVL>>): Iterator$<
  DVL
>;

export function concat<DVT>(iterators: _.List<Iterator$<DVT>>): Iterator$<DVT>;

export function flat_map<DVX, DVZ>(
  iterator: Iterator$<DVX>,
  f: (x0: DVX) => Iterator$<DVZ>
): Iterator$<DVZ>;

export function filter<DWC>(
  iterator: Iterator$<DWC>,
  predicate: (x0: DWC) => boolean
): Iterator$<DWC>;

export function filter_map<DWI, DWK>(
  iterator: Iterator$<DWI>,
  f: (x0: DWI) => _.Result<DWK, any>
): Iterator$<DWK>;

export function cycle<DWW>(iterator: Iterator$<DWW>): Iterator$<DWW>;

export function find<DXA>(
  haystack: Iterator$<DXA>,
  is_desired: (x0: DXA) => boolean
): _.Result<DXA, undefined>;

export function find_map<DXI, DXK>(
  haystack: Iterator$<DXI>,
  is_desired: (x0: DXI) => _.Result<DXK, any>
): _.Result<DXK, undefined>;

export function index<DXY>(iterator: Iterator$<DXY>): Iterator$<[DXY, number]>;

export function iterate<DYE>(initial: DYE, f: (x0: DYE) => DYE): Iterator$<DYE>;

export function take_while<DYG>(
  iterator: Iterator$<DYG>,
  predicate: (x0: DYG) => boolean
): Iterator$<DYG>;

export function drop_while<DYM>(
  iterator: Iterator$<DYM>,
  predicate: (x0: DYM) => boolean
): Iterator$<DYM>;

export function scan<DYS, DYU>(
  iterator: Iterator$<DYS>,
  initial: DYU,
  f: (x0: DYU, x1: DYS) => DYU
): Iterator$<DYU>;

export function zip<DZA, DZC>(left: Iterator$<DZA>, right: Iterator$<DZC>): Iterator$<
  [DZA, DZC]
>;

export function chunk<DZK>(iterator: Iterator$<DZK>, f: (x0: DZK) => any): Iterator$<
  _.List<DZK>
>;

export function sized_chunk<EAA>(iterator: Iterator$<EAA>, count: number): Iterator$<
  _.List<EAA>
>;

export function intersperse<EAM>(iterator: Iterator$<EAM>, elem: EAM): Iterator$<
  EAM
>;

export function any<EAS>(
  iterator: Iterator$<EAS>,
  predicate: (x0: EAS) => boolean
): boolean;

export function all<EAW>(
  iterator: Iterator$<EAW>,
  predicate: (x0: EAW) => boolean
): boolean;

export function group<EBA, EBC>(iterator: Iterator$<EBA>, key: (x0: EBA) => EBC): $dict.Dict$<
  EBC,
  _.List<EBA>
>;

export function reduce<EBS>(
  iterator: Iterator$<EBS>,
  f: (x0: EBS, x1: EBS) => EBS
): _.Result<EBS, undefined>;

export function last<EBW>(iterator: Iterator$<EBW>): _.Result<EBW, undefined>;

export function empty(): Iterator$<any>;

export function once<ECC>(f: () => ECC): Iterator$<ECC>;

export function range(start: number, stop: number): Iterator$<number>;

export function single<ECE>(elem: ECE): Iterator$<ECE>;

export function interleave<ECG>(left: Iterator$<ECG>, right: Iterator$<ECG>): Iterator$<
  ECG
>;

export function fold_until<ECO, ECQ>(
  iterator: Iterator$<ECO>,
  initial: ECQ,
  f: (x0: ECQ, x1: ECO) => $list.ContinueOrStop$<ECQ>
): ECQ;

export function try_fold<ECW, ECY, ECZ>(
  iterator: Iterator$<ECW>,
  initial: ECY,
  f: (x0: ECY, x1: ECW) => _.Result<ECY, ECZ>
): _.Result<ECY, ECZ>;

export function first<EDM>(iterator: Iterator$<EDM>): _.Result<EDM, undefined>;

export function at<EDQ>(iterator: Iterator$<EDQ>, index: number): _.Result<
  EDQ,
  undefined
>;

export function length(iterator: Iterator$<any>): number;

export function each<EDY>(iterator: Iterator$<EDY>, f: (x0: EDY) => any): undefined;

export function yield$<EEB>(element: EEB, next: () => Iterator$<EEB>): Iterator$<
  EEB
>;

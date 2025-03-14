import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $decode from "../../../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $erlang from "../../gleam/erlang.d.mts";
import type * as $atom from "../../gleam/erlang/atom.d.mts";

export type Pid$ = unknown;

declare class Subject extends _.CustomType {
  constructor(owner: Pid$, tag: $erlang.Reference$);
  
  owner: Pid$;
  tag: $erlang.Reference$;
}

export type Subject$<FSI> = Subject;

declare type DoNotLeak$ = unknown;

export type Selector$<FSJ> = unknown;

export class ExitMessage extends _.CustomType {
  constructor(pid: Pid$, reason: ExitReason$);
  
  pid: Pid$;
  reason: ExitReason$;
}

export type ExitMessage$ = ExitMessage;

export class Normal extends _.CustomType {}

export class Killed extends _.CustomType {}

export class Abnormal extends _.CustomType {
  constructor(reason: string);
  
  reason: string;
}

export type ExitReason$ = Normal | Killed | Abnormal;

declare class Anything extends _.CustomType {}

declare type AnythingSelectorTag$ = Anything;

declare class Process extends _.CustomType {}

declare type ProcessMonitorFlag$ = Process;

declare class ProcessMonitor extends _.CustomType {
  constructor(tag: $erlang.Reference$);
  
  tag: $erlang.Reference$;
}

export type ProcessMonitor$ = ProcessMonitor;

export class ProcessDown extends _.CustomType {
  constructor(pid: Pid$, reason: $dynamic.Dynamic$);
  
  pid: Pid$;
  reason: $dynamic.Dynamic$;
}

export type ProcessDown$ = ProcessDown;

export class CalleeDown extends _.CustomType {
  constructor(reason: $dynamic.Dynamic$);
  
  reason: $dynamic.Dynamic$;
}

export class CallTimeout extends _.CustomType {}

export type CallError$<FSK> = CalleeDown | CallTimeout;

export type Timer$ = unknown;

export class TimerNotFound extends _.CustomType {}

export class Cancelled extends _.CustomType {
  constructor(time_remaining: number);
  
  time_remaining: number;
}

export type Cancelled$ = TimerNotFound | Cancelled;

declare class Kill extends _.CustomType {}

declare type KillFlag$ = Kill;

export function self(): Pid$;

export function start(implementation: () => any, link: boolean): Pid$;

export function new_subject(): Subject$<any>;

export function subject_owner(subject: Subject$<any>): Pid$;

export function send<FST>(subject: Subject$<FST>, message: FST): undefined;

export function receive<FSV>(subject: Subject$<FSV>, timeout: number): _.Result<
  FSV,
  undefined
>;

export function receive_forever<FSZ>(subject: Subject$<FSZ>): FSZ;

export function new_selector(): Selector$<any>;

export function select<FTD>(from: Selector$<FTD>, within: number): _.Result<
  FTD,
  undefined
>;

export function select_forever<FTH>(from: Selector$<FTH>): FTH;

export function map_selector<FTJ, FTL>(a: Selector$<FTJ>, b: (x0: FTJ) => FTL): Selector$<
  FTL
>;

export function merge_selector<FTN>(a: Selector$<FTN>, b: Selector$<FTN>): Selector$<
  FTN
>;

export function flush_messages(): undefined;

export function selecting_trapped_exits<FTR>(
  selector: Selector$<FTR>,
  handler: (x0: ExitMessage$) => FTR
): Selector$<FTR>;

export function selecting<FTU, FTW>(
  selector: Selector$<FTU>,
  subject: Subject$<FTW>,
  transform: (x0: FTW) => FTU
): Selector$<FTU>;

export function selecting_record2<FUE>(
  selector: Selector$<FUE>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$) => FUE
): Selector$<FUE>;

export function selecting_record3<FUI>(
  selector: Selector$<FUI>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$, x1: $dynamic.Dynamic$) => FUI
): Selector$<FUI>;

export function selecting_record4<FUM>(
  selector: Selector$<FUM>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$
  ) => FUM
): Selector$<FUM>;

export function selecting_record5<FUQ>(
  selector: Selector$<FUQ>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$
  ) => FUQ
): Selector$<FUQ>;

export function selecting_record6<FUU>(
  selector: Selector$<FUU>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$
  ) => FUU
): Selector$<FUU>;

export function selecting_record7<FUY>(
  selector: Selector$<FUY>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$
  ) => FUY
): Selector$<FUY>;

export function selecting_record8<FVC>(
  selector: Selector$<FVC>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$,
    x6: $dynamic.Dynamic$
  ) => FVC
): Selector$<FVC>;

export function selecting_anything<FVG>(
  selector: Selector$<FVG>,
  handler: (x0: $dynamic.Dynamic$) => FVG
): Selector$<FVG>;

export function deselecting<FTZ>(
  selector: Selector$<FTZ>,
  subject: Subject$<any>
): Selector$<FTZ>;

export function sleep(a: number): undefined;

export function sleep_forever(): undefined;

export function is_alive(a: Pid$): boolean;

export function monitor_process(pid: Pid$): ProcessMonitor$;

export function selecting_process_down<FVS>(
  selector: Selector$<FVS>,
  monitor: ProcessMonitor$,
  mapping: (x0: ProcessDown$) => FVS
): Selector$<FVS>;

export function demonitor_process(monitor: ProcessMonitor$): undefined;

export function deselecting_process_down<FVV>(
  selector: Selector$<FVV>,
  monitor: ProcessMonitor$
): Selector$<FVV>;

export function try_call<FVY, FWA>(
  subject: Subject$<FVY>,
  make_request: (x0: Subject$<FWA>) => FVY,
  timeout: number
): _.Result<FWA, CallError$<FWA>>;

export function call<FWF, FWH>(
  subject: Subject$<FWF>,
  make_request: (x0: Subject$<FWH>) => FWF,
  timeout: number
): FWH;

export function try_call_forever<FWN, FWP>(
  subject: Subject$<FWN>,
  make_request: (x0: Subject$<FWP>) => FWN
): _.Result<FWP, CallError$<any>>;

export function call_forever<FWJ, FWL>(
  subject: Subject$<FWJ>,
  make_request: (x0: Subject$<FWL>) => FWJ
): FWL;

export function link(pid: Pid$): boolean;

export function unlink(pid: Pid$): undefined;

export function send_after<FWW>(
  subject: Subject$<FWW>,
  delay: number,
  message: FWW
): Timer$;

export function cancel_timer(timer: Timer$): Cancelled$;

export function kill(pid: Pid$): undefined;

export function send_exit(pid: Pid$): undefined;

export function send_abnormal_exit(pid: Pid$, reason: string): undefined;

export function trap_exits(a: boolean): undefined;

export function register(pid: Pid$, name: $atom.Atom$): _.Result<
  undefined,
  undefined
>;

export function unregister(name: $atom.Atom$): _.Result<undefined, undefined>;

export function named(name: $atom.Atom$): _.Result<Pid$, undefined>;

export function pid_from_dynamic(from: $dynamic.Dynamic$): _.Result<
  Pid$,
  _.List<$decode.DecodeError$>
>;

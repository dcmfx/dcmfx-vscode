import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $erlang from "../../gleam/erlang.d.mts";
import type * as $atom from "../../gleam/erlang/atom.d.mts";

export type Pid$ = unknown;

declare class Subject extends _.CustomType {
  constructor(owner: Pid$, tag: $erlang.Reference$);
  
  owner: Pid$;
  tag: $erlang.Reference$;
}

export type Subject$<FVJ> = Subject;

declare type DoNotLeak$ = unknown;

export type Selector$<FVK> = unknown;

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

export type CallError$<FVL> = CalleeDown | CallTimeout;

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

export function send<FVU>(subject: Subject$<FVU>, message: FVU): undefined;

export function receive<FVW>(subject: Subject$<FVW>, timeout: number): _.Result<
  FVW,
  undefined
>;

export function receive_forever<FWA>(subject: Subject$<FWA>): FWA;

export function new_selector(): Selector$<any>;

export function select<FWE>(from: Selector$<FWE>, within: number): _.Result<
  FWE,
  undefined
>;

export function select_forever<FWI>(from: Selector$<FWI>): FWI;

export function map_selector<FWK, FWM>(a: Selector$<FWK>, b: (x0: FWK) => FWM): Selector$<
  FWM
>;

export function merge_selector<FWO>(a: Selector$<FWO>, b: Selector$<FWO>): Selector$<
  FWO
>;

export function flush_messages(): undefined;

export function selecting_trapped_exits<FWS>(
  selector: Selector$<FWS>,
  handler: (x0: ExitMessage$) => FWS
): Selector$<FWS>;

export function selecting<FWV, FWX>(
  selector: Selector$<FWV>,
  subject: Subject$<FWX>,
  transform: (x0: FWX) => FWV
): Selector$<FWV>;

export function selecting_record2<FXF>(
  selector: Selector$<FXF>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$) => FXF
): Selector$<FXF>;

export function selecting_record3<FXJ>(
  selector: Selector$<FXJ>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$, x1: $dynamic.Dynamic$) => FXJ
): Selector$<FXJ>;

export function selecting_record4<FXN>(
  selector: Selector$<FXN>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$
  ) => FXN
): Selector$<FXN>;

export function selecting_record5<FXR>(
  selector: Selector$<FXR>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$
  ) => FXR
): Selector$<FXR>;

export function selecting_record6<FXV>(
  selector: Selector$<FXV>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$
  ) => FXV
): Selector$<FXV>;

export function selecting_record7<FXZ>(
  selector: Selector$<FXZ>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$
  ) => FXZ
): Selector$<FXZ>;

export function selecting_record8<FYD>(
  selector: Selector$<FYD>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$,
    x6: $dynamic.Dynamic$
  ) => FYD
): Selector$<FYD>;

export function selecting_anything<FYH>(
  selector: Selector$<FYH>,
  handler: (x0: $dynamic.Dynamic$) => FYH
): Selector$<FYH>;

export function deselecting<FXA>(
  selector: Selector$<FXA>,
  subject: Subject$<any>
): Selector$<FXA>;

export function sleep(a: number): undefined;

export function sleep_forever(): undefined;

export function is_alive(a: Pid$): boolean;

export function monitor_process(pid: Pid$): ProcessMonitor$;

export function selecting_process_down<FYT>(
  selector: Selector$<FYT>,
  monitor: ProcessMonitor$,
  mapping: (x0: ProcessDown$) => FYT
): Selector$<FYT>;

export function demonitor_process(monitor: ProcessMonitor$): undefined;

export function deselecting_process_down<FYW>(
  selector: Selector$<FYW>,
  monitor: ProcessMonitor$
): Selector$<FYW>;

export function try_call<FYZ, FZB>(
  subject: Subject$<FYZ>,
  make_request: (x0: Subject$<FZB>) => FYZ,
  timeout: number
): _.Result<FZB, CallError$<FZB>>;

export function call<FZG, FZI>(
  subject: Subject$<FZG>,
  make_request: (x0: Subject$<FZI>) => FZG,
  timeout: number
): FZI;

export function try_call_forever<FZO, FZQ>(
  subject: Subject$<FZO>,
  make_request: (x0: Subject$<FZQ>) => FZO
): _.Result<FZQ, CallError$<any>>;

export function call_forever<FZK, FZM>(
  subject: Subject$<FZK>,
  make_request: (x0: Subject$<FZM>) => FZK
): FZM;

export function link(pid: Pid$): boolean;

export function unlink(pid: Pid$): undefined;

export function send_after<FZX>(
  subject: Subject$<FZX>,
  delay: number,
  message: FZX
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
  _.List<$dynamic.DecodeError$>
>;

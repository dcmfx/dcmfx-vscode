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

export type Subject$<GNV> = Subject;

declare type DoNotLeak$ = unknown;

export type Selector$<GNW> = unknown;

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

export type CallError$<GNX> = CalleeDown | CallTimeout;

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

export function send<GOG>(subject: Subject$<GOG>, message: GOG): undefined;

export function receive<GOI>(subject: Subject$<GOI>, timeout: number): _.Result<
  GOI,
  undefined
>;

export function receive_forever<GOM>(subject: Subject$<GOM>): GOM;

export function new_selector(): Selector$<any>;

export function select<GOQ>(from: Selector$<GOQ>, within: number): _.Result<
  GOQ,
  undefined
>;

export function select_forever<GOU>(from: Selector$<GOU>): GOU;

export function map_selector<GOW, GOY>(a: Selector$<GOW>, b: (x0: GOW) => GOY): Selector$<
  GOY
>;

export function merge_selector<GPA>(a: Selector$<GPA>, b: Selector$<GPA>): Selector$<
  GPA
>;

export function flush_messages(): undefined;

export function selecting_trapped_exits<GPE>(
  selector: Selector$<GPE>,
  handler: (x0: ExitMessage$) => GPE
): Selector$<GPE>;

export function selecting<GPH, GPJ>(
  selector: Selector$<GPH>,
  subject: Subject$<GPJ>,
  transform: (x0: GPJ) => GPH
): Selector$<GPH>;

export function selecting_record2<GPR>(
  selector: Selector$<GPR>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$) => GPR
): Selector$<GPR>;

export function selecting_record3<GPV>(
  selector: Selector$<GPV>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$, x1: $dynamic.Dynamic$) => GPV
): Selector$<GPV>;

export function selecting_record4<GPZ>(
  selector: Selector$<GPZ>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$
  ) => GPZ
): Selector$<GPZ>;

export function selecting_record5<GQD>(
  selector: Selector$<GQD>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$
  ) => GQD
): Selector$<GQD>;

export function selecting_record6<GQH>(
  selector: Selector$<GQH>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$
  ) => GQH
): Selector$<GQH>;

export function selecting_record7<GQL>(
  selector: Selector$<GQL>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$
  ) => GQL
): Selector$<GQL>;

export function selecting_record8<GQP>(
  selector: Selector$<GQP>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$,
    x6: $dynamic.Dynamic$
  ) => GQP
): Selector$<GQP>;

export function selecting_anything<GQT>(
  selector: Selector$<GQT>,
  handler: (x0: $dynamic.Dynamic$) => GQT
): Selector$<GQT>;

export function deselecting<GPM>(
  selector: Selector$<GPM>,
  subject: Subject$<any>
): Selector$<GPM>;

export function sleep(a: number): undefined;

export function sleep_forever(): undefined;

export function is_alive(a: Pid$): boolean;

export function monitor_process(pid: Pid$): ProcessMonitor$;

export function selecting_process_down<GRF>(
  selector: Selector$<GRF>,
  monitor: ProcessMonitor$,
  mapping: (x0: ProcessDown$) => GRF
): Selector$<GRF>;

export function demonitor_process(monitor: ProcessMonitor$): undefined;

export function deselecting_process_down<GRI>(
  selector: Selector$<GRI>,
  monitor: ProcessMonitor$
): Selector$<GRI>;

export function try_call<GRL, GRN>(
  subject: Subject$<GRL>,
  make_request: (x0: Subject$<GRN>) => GRL,
  timeout: number
): _.Result<GRN, CallError$<GRN>>;

export function call<GRS, GRU>(
  subject: Subject$<GRS>,
  make_request: (x0: Subject$<GRU>) => GRS,
  timeout: number
): GRU;

export function try_call_forever<GSA, GSC>(
  subject: Subject$<GSA>,
  make_request: (x0: Subject$<GSC>) => GSA
): _.Result<GSC, CallError$<any>>;

export function call_forever<GRW, GRY>(
  subject: Subject$<GRW>,
  make_request: (x0: Subject$<GRY>) => GRW
): GRY;

export function link(pid: Pid$): boolean;

export function unlink(pid: Pid$): undefined;

export function send_after<GSJ>(
  subject: Subject$<GSJ>,
  delay: number,
  message: GSJ
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

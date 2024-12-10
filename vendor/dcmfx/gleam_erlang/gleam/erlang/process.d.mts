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

export type Subject$<GOV> = Subject;

declare type DoNotLeak$ = unknown;

export type Selector$<GOW> = unknown;

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

export type CallError$<GOX> = CalleeDown | CallTimeout;

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

export function send<GPG>(subject: Subject$<GPG>, message: GPG): undefined;

export function receive<GPI>(subject: Subject$<GPI>, timeout: number): _.Result<
  GPI,
  undefined
>;

export function receive_forever<GPM>(subject: Subject$<GPM>): GPM;

export function new_selector(): Selector$<any>;

export function select<GPQ>(from: Selector$<GPQ>, within: number): _.Result<
  GPQ,
  undefined
>;

export function select_forever<GPU>(from: Selector$<GPU>): GPU;

export function map_selector<GPW, GPY>(a: Selector$<GPW>, b: (x0: GPW) => GPY): Selector$<
  GPY
>;

export function merge_selector<GQA>(a: Selector$<GQA>, b: Selector$<GQA>): Selector$<
  GQA
>;

export function flush_messages(): undefined;

export function selecting_trapped_exits<GQE>(
  selector: Selector$<GQE>,
  handler: (x0: ExitMessage$) => GQE
): Selector$<GQE>;

export function selecting<GQH, GQJ>(
  selector: Selector$<GQH>,
  subject: Subject$<GQJ>,
  transform: (x0: GQJ) => GQH
): Selector$<GQH>;

export function selecting_record2<GQR>(
  selector: Selector$<GQR>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$) => GQR
): Selector$<GQR>;

export function selecting_record3<GQV>(
  selector: Selector$<GQV>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$, x1: $dynamic.Dynamic$) => GQV
): Selector$<GQV>;

export function selecting_record4<GQZ>(
  selector: Selector$<GQZ>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$
  ) => GQZ
): Selector$<GQZ>;

export function selecting_record5<GRD>(
  selector: Selector$<GRD>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$
  ) => GRD
): Selector$<GRD>;

export function selecting_record6<GRH>(
  selector: Selector$<GRH>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$
  ) => GRH
): Selector$<GRH>;

export function selecting_record7<GRL>(
  selector: Selector$<GRL>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$
  ) => GRL
): Selector$<GRL>;

export function selecting_record8<GRP>(
  selector: Selector$<GRP>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$,
    x6: $dynamic.Dynamic$
  ) => GRP
): Selector$<GRP>;

export function selecting_anything<GRT>(
  selector: Selector$<GRT>,
  handler: (x0: $dynamic.Dynamic$) => GRT
): Selector$<GRT>;

export function deselecting<GQM>(
  selector: Selector$<GQM>,
  subject: Subject$<any>
): Selector$<GQM>;

export function sleep(a: number): undefined;

export function sleep_forever(): undefined;

export function is_alive(a: Pid$): boolean;

export function monitor_process(pid: Pid$): ProcessMonitor$;

export function selecting_process_down<GSF>(
  selector: Selector$<GSF>,
  monitor: ProcessMonitor$,
  mapping: (x0: ProcessDown$) => GSF
): Selector$<GSF>;

export function demonitor_process(monitor: ProcessMonitor$): undefined;

export function deselecting_process_down<GSI>(
  selector: Selector$<GSI>,
  monitor: ProcessMonitor$
): Selector$<GSI>;

export function try_call<GSL, GSN>(
  subject: Subject$<GSL>,
  make_request: (x0: Subject$<GSN>) => GSL,
  timeout: number
): _.Result<GSN, CallError$<GSN>>;

export function call<GSS, GSU>(
  subject: Subject$<GSS>,
  make_request: (x0: Subject$<GSU>) => GSS,
  timeout: number
): GSU;

export function try_call_forever<GTA, GTC>(
  subject: Subject$<GTA>,
  make_request: (x0: Subject$<GTC>) => GTA
): _.Result<GTC, CallError$<any>>;

export function call_forever<GSW, GSY>(
  subject: Subject$<GSW>,
  make_request: (x0: Subject$<GSY>) => GSW
): GSY;

export function link(pid: Pid$): boolean;

export function unlink(pid: Pid$): undefined;

export function send_after<GTJ>(
  subject: Subject$<GTJ>,
  delay: number,
  message: GTJ
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

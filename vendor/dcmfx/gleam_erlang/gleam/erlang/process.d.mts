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

export type Subject$<FRD> = Subject;

declare type DoNotLeak$ = unknown;

export type Selector$<FRE> = unknown;

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

export type CallError$<FRF> = CalleeDown | CallTimeout;

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

export function send<FRO>(subject: Subject$<FRO>, message: FRO): undefined;

export function receive<FRQ>(subject: Subject$<FRQ>, timeout: number): _.Result<
  FRQ,
  undefined
>;

export function receive_forever<FRU>(subject: Subject$<FRU>): FRU;

export function new_selector(): Selector$<any>;

export function select<FRY>(from: Selector$<FRY>, within: number): _.Result<
  FRY,
  undefined
>;

export function select_forever<FSC>(from: Selector$<FSC>): FSC;

export function map_selector<FSE, FSG>(a: Selector$<FSE>, b: (x0: FSE) => FSG): Selector$<
  FSG
>;

export function merge_selector<FSI>(a: Selector$<FSI>, b: Selector$<FSI>): Selector$<
  FSI
>;

export function flush_messages(): undefined;

export function selecting_trapped_exits<FSM>(
  selector: Selector$<FSM>,
  handler: (x0: ExitMessage$) => FSM
): Selector$<FSM>;

export function selecting<FSP, FSR>(
  selector: Selector$<FSP>,
  subject: Subject$<FSR>,
  transform: (x0: FSR) => FSP
): Selector$<FSP>;

export function selecting_record2<FSZ>(
  selector: Selector$<FSZ>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$) => FSZ
): Selector$<FSZ>;

export function selecting_record3<FTD>(
  selector: Selector$<FTD>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$, x1: $dynamic.Dynamic$) => FTD
): Selector$<FTD>;

export function selecting_record4<FTH>(
  selector: Selector$<FTH>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$
  ) => FTH
): Selector$<FTH>;

export function selecting_record5<FTL>(
  selector: Selector$<FTL>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$
  ) => FTL
): Selector$<FTL>;

export function selecting_record6<FTP>(
  selector: Selector$<FTP>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$
  ) => FTP
): Selector$<FTP>;

export function selecting_record7<FTT>(
  selector: Selector$<FTT>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$
  ) => FTT
): Selector$<FTT>;

export function selecting_record8<FTX>(
  selector: Selector$<FTX>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$,
    x6: $dynamic.Dynamic$
  ) => FTX
): Selector$<FTX>;

export function selecting_anything<FUB>(
  selector: Selector$<FUB>,
  handler: (x0: $dynamic.Dynamic$) => FUB
): Selector$<FUB>;

export function deselecting<FSU>(
  selector: Selector$<FSU>,
  subject: Subject$<any>
): Selector$<FSU>;

export function sleep(a: number): undefined;

export function sleep_forever(): undefined;

export function is_alive(a: Pid$): boolean;

export function monitor_process(pid: Pid$): ProcessMonitor$;

export function selecting_process_down<FUN>(
  selector: Selector$<FUN>,
  monitor: ProcessMonitor$,
  mapping: (x0: ProcessDown$) => FUN
): Selector$<FUN>;

export function demonitor_process(monitor: ProcessMonitor$): undefined;

export function deselecting_process_down<FUQ>(
  selector: Selector$<FUQ>,
  monitor: ProcessMonitor$
): Selector$<FUQ>;

export function try_call<FUT, FUV>(
  subject: Subject$<FUT>,
  make_request: (x0: Subject$<FUV>) => FUT,
  timeout: number
): _.Result<FUV, CallError$<FUV>>;

export function call<FVA, FVC>(
  subject: Subject$<FVA>,
  make_request: (x0: Subject$<FVC>) => FVA,
  timeout: number
): FVC;

export function try_call_forever<FVI, FVK>(
  subject: Subject$<FVI>,
  make_request: (x0: Subject$<FVK>) => FVI
): _.Result<FVK, CallError$<any>>;

export function call_forever<FVE, FVG>(
  subject: Subject$<FVE>,
  make_request: (x0: Subject$<FVG>) => FVE
): FVG;

export function link(pid: Pid$): boolean;

export function unlink(pid: Pid$): undefined;

export function send_after<FVR>(
  subject: Subject$<FVR>,
  delay: number,
  message: FVR
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

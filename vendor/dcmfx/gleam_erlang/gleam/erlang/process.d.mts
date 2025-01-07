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

export type Subject$<FSD> = Subject;

declare type DoNotLeak$ = unknown;

export type Selector$<FSE> = unknown;

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

export type CallError$<FSF> = CalleeDown | CallTimeout;

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

export function send<FSO>(subject: Subject$<FSO>, message: FSO): undefined;

export function receive<FSQ>(subject: Subject$<FSQ>, timeout: number): _.Result<
  FSQ,
  undefined
>;

export function receive_forever<FSU>(subject: Subject$<FSU>): FSU;

export function new_selector(): Selector$<any>;

export function select<FSY>(from: Selector$<FSY>, within: number): _.Result<
  FSY,
  undefined
>;

export function select_forever<FTC>(from: Selector$<FTC>): FTC;

export function map_selector<FTE, FTG>(a: Selector$<FTE>, b: (x0: FTE) => FTG): Selector$<
  FTG
>;

export function merge_selector<FTI>(a: Selector$<FTI>, b: Selector$<FTI>): Selector$<
  FTI
>;

export function flush_messages(): undefined;

export function selecting_trapped_exits<FTM>(
  selector: Selector$<FTM>,
  handler: (x0: ExitMessage$) => FTM
): Selector$<FTM>;

export function selecting<FTP, FTR>(
  selector: Selector$<FTP>,
  subject: Subject$<FTR>,
  transform: (x0: FTR) => FTP
): Selector$<FTP>;

export function selecting_record2<FTZ>(
  selector: Selector$<FTZ>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$) => FTZ
): Selector$<FTZ>;

export function selecting_record3<FUD>(
  selector: Selector$<FUD>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$, x1: $dynamic.Dynamic$) => FUD
): Selector$<FUD>;

export function selecting_record4<FUH>(
  selector: Selector$<FUH>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$
  ) => FUH
): Selector$<FUH>;

export function selecting_record5<FUL>(
  selector: Selector$<FUL>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$
  ) => FUL
): Selector$<FUL>;

export function selecting_record6<FUP>(
  selector: Selector$<FUP>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$
  ) => FUP
): Selector$<FUP>;

export function selecting_record7<FUT>(
  selector: Selector$<FUT>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$
  ) => FUT
): Selector$<FUT>;

export function selecting_record8<FUX>(
  selector: Selector$<FUX>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$,
    x6: $dynamic.Dynamic$
  ) => FUX
): Selector$<FUX>;

export function selecting_anything<FVB>(
  selector: Selector$<FVB>,
  handler: (x0: $dynamic.Dynamic$) => FVB
): Selector$<FVB>;

export function deselecting<FTU>(
  selector: Selector$<FTU>,
  subject: Subject$<any>
): Selector$<FTU>;

export function sleep(a: number): undefined;

export function sleep_forever(): undefined;

export function is_alive(a: Pid$): boolean;

export function monitor_process(pid: Pid$): ProcessMonitor$;

export function selecting_process_down<FVN>(
  selector: Selector$<FVN>,
  monitor: ProcessMonitor$,
  mapping: (x0: ProcessDown$) => FVN
): Selector$<FVN>;

export function demonitor_process(monitor: ProcessMonitor$): undefined;

export function deselecting_process_down<FVQ>(
  selector: Selector$<FVQ>,
  monitor: ProcessMonitor$
): Selector$<FVQ>;

export function try_call<FVT, FVV>(
  subject: Subject$<FVT>,
  make_request: (x0: Subject$<FVV>) => FVT,
  timeout: number
): _.Result<FVV, CallError$<FVV>>;

export function call<FWA, FWC>(
  subject: Subject$<FWA>,
  make_request: (x0: Subject$<FWC>) => FWA,
  timeout: number
): FWC;

export function try_call_forever<FWI, FWK>(
  subject: Subject$<FWI>,
  make_request: (x0: Subject$<FWK>) => FWI
): _.Result<FWK, CallError$<any>>;

export function call_forever<FWE, FWG>(
  subject: Subject$<FWE>,
  make_request: (x0: Subject$<FWG>) => FWE
): FWG;

export function link(pid: Pid$): boolean;

export function unlink(pid: Pid$): undefined;

export function send_after<FWR>(
  subject: Subject$<FWR>,
  delay: number,
  message: FWR
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

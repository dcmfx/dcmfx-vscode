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

export type Subject$<FQU> = Subject;

declare type DoNotLeak$ = unknown;

export type Selector$<FQV> = unknown;

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

export type CallError$<FQW> = CalleeDown | CallTimeout;

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

export function send<FRF>(subject: Subject$<FRF>, message: FRF): undefined;

export function receive<FRH>(subject: Subject$<FRH>, timeout: number): _.Result<
  FRH,
  undefined
>;

export function receive_forever<FRL>(subject: Subject$<FRL>): FRL;

export function new_selector(): Selector$<any>;

export function select<FRP>(from: Selector$<FRP>, within: number): _.Result<
  FRP,
  undefined
>;

export function select_forever<FRT>(from: Selector$<FRT>): FRT;

export function map_selector<FRV, FRX>(a: Selector$<FRV>, b: (x0: FRV) => FRX): Selector$<
  FRX
>;

export function merge_selector<FRZ>(a: Selector$<FRZ>, b: Selector$<FRZ>): Selector$<
  FRZ
>;

export function flush_messages(): undefined;

export function selecting_trapped_exits<FSD>(
  selector: Selector$<FSD>,
  handler: (x0: ExitMessage$) => FSD
): Selector$<FSD>;

export function selecting<FSG, FSI>(
  selector: Selector$<FSG>,
  subject: Subject$<FSI>,
  transform: (x0: FSI) => FSG
): Selector$<FSG>;

export function selecting_record2<FSQ>(
  selector: Selector$<FSQ>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$) => FSQ
): Selector$<FSQ>;

export function selecting_record3<FSU>(
  selector: Selector$<FSU>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$, x1: $dynamic.Dynamic$) => FSU
): Selector$<FSU>;

export function selecting_record4<FSY>(
  selector: Selector$<FSY>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$
  ) => FSY
): Selector$<FSY>;

export function selecting_record5<FTC>(
  selector: Selector$<FTC>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$
  ) => FTC
): Selector$<FTC>;

export function selecting_record6<FTG>(
  selector: Selector$<FTG>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$
  ) => FTG
): Selector$<FTG>;

export function selecting_record7<FTK>(
  selector: Selector$<FTK>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$
  ) => FTK
): Selector$<FTK>;

export function selecting_record8<FTO>(
  selector: Selector$<FTO>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$,
    x6: $dynamic.Dynamic$
  ) => FTO
): Selector$<FTO>;

export function selecting_anything<FTS>(
  selector: Selector$<FTS>,
  handler: (x0: $dynamic.Dynamic$) => FTS
): Selector$<FTS>;

export function deselecting<FSL>(
  selector: Selector$<FSL>,
  subject: Subject$<any>
): Selector$<FSL>;

export function sleep(a: number): undefined;

export function sleep_forever(): undefined;

export function is_alive(a: Pid$): boolean;

export function monitor_process(pid: Pid$): ProcessMonitor$;

export function selecting_process_down<FUE>(
  selector: Selector$<FUE>,
  monitor: ProcessMonitor$,
  mapping: (x0: ProcessDown$) => FUE
): Selector$<FUE>;

export function demonitor_process(monitor: ProcessMonitor$): undefined;

export function deselecting_process_down<FUH>(
  selector: Selector$<FUH>,
  monitor: ProcessMonitor$
): Selector$<FUH>;

export function try_call<FUK, FUM>(
  subject: Subject$<FUK>,
  make_request: (x0: Subject$<FUM>) => FUK,
  timeout: number
): _.Result<FUM, CallError$<FUM>>;

export function call<FUR, FUT>(
  subject: Subject$<FUR>,
  make_request: (x0: Subject$<FUT>) => FUR,
  timeout: number
): FUT;

export function try_call_forever<FUZ, FVB>(
  subject: Subject$<FUZ>,
  make_request: (x0: Subject$<FVB>) => FUZ
): _.Result<FVB, CallError$<any>>;

export function call_forever<FUV, FUX>(
  subject: Subject$<FUV>,
  make_request: (x0: Subject$<FUX>) => FUV
): FUX;

export function link(pid: Pid$): boolean;

export function unlink(pid: Pid$): undefined;

export function send_after<FVI>(
  subject: Subject$<FVI>,
  delay: number,
  message: FVI
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

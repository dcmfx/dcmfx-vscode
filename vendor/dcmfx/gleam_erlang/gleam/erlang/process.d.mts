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

export type Subject$<GOQ> = Subject;

declare type DoNotLeak$ = unknown;

export type Selector$<GOR> = unknown;

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

export type CallError$<GOS> = CalleeDown | CallTimeout;

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

export function send<GPB>(subject: Subject$<GPB>, message: GPB): undefined;

export function new_selector(): Selector$<any>;

export function select<GPJ>(from: Selector$<GPJ>, within: number): _.Result<
  GPJ,
  undefined
>;

export function select_forever<GPN>(from: Selector$<GPN>): GPN;

export function map_selector<GPP, GPR>(a: Selector$<GPP>, b: (x0: GPP) => GPR): Selector$<
  GPR
>;

export function merge_selector<GPT>(a: Selector$<GPT>, b: Selector$<GPT>): Selector$<
  GPT
>;

export function flush_messages(): undefined;

export function selecting_trapped_exits<GPX>(
  selector: Selector$<GPX>,
  handler: (x0: ExitMessage$) => GPX
): Selector$<GPX>;

export function selecting<GQA, GQC>(
  selector: Selector$<GQA>,
  subject: Subject$<GQC>,
  transform: (x0: GQC) => GQA
): Selector$<GQA>;

export function receive<GPD>(subject: Subject$<GPD>, timeout: number): _.Result<
  GPD,
  undefined
>;

export function selecting_record2<GQF>(
  selector: Selector$<GQF>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$) => GQF
): Selector$<GQF>;

export function selecting_record3<GQJ>(
  selector: Selector$<GQJ>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$, x1: $dynamic.Dynamic$) => GQJ
): Selector$<GQJ>;

export function selecting_record4<GQN>(
  selector: Selector$<GQN>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$
  ) => GQN
): Selector$<GQN>;

export function selecting_record5<GQR>(
  selector: Selector$<GQR>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$
  ) => GQR
): Selector$<GQR>;

export function selecting_record6<GQV>(
  selector: Selector$<GQV>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$
  ) => GQV
): Selector$<GQV>;

export function selecting_record7<GQZ>(
  selector: Selector$<GQZ>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$
  ) => GQZ
): Selector$<GQZ>;

export function selecting_record8<GRD>(
  selector: Selector$<GRD>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$,
    x6: $dynamic.Dynamic$
  ) => GRD
): Selector$<GRD>;

export function selecting_anything<GRH>(
  selector: Selector$<GRH>,
  handler: (x0: $dynamic.Dynamic$) => GRH
): Selector$<GRH>;

export function sleep(a: number): undefined;

export function sleep_forever(): undefined;

export function is_alive(a: Pid$): boolean;

export function monitor_process(pid: Pid$): ProcessMonitor$;

export function selecting_process_down<GRP>(
  selector: Selector$<GRP>,
  monitor: ProcessMonitor$,
  mapping: (x0: ProcessDown$) => GRP
): Selector$<GRP>;

export function demonitor_process(monitor: ProcessMonitor$): undefined;

export function try_call<GRS, GRU>(
  subject: Subject$<GRS>,
  make_request: (x0: Subject$<GRU>) => GRS,
  timeout: number
): _.Result<GRU, CallError$<GRU>>;

export function call<GRZ, GSB>(
  subject: Subject$<GRZ>,
  make_request: (x0: Subject$<GSB>) => GRZ,
  timeout: number
): GSB;

export function link(pid: Pid$): boolean;

export function unlink(pid: Pid$): undefined;

export function send_after<GSE>(
  subject: Subject$<GSE>,
  delay: number,
  message: GSE
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

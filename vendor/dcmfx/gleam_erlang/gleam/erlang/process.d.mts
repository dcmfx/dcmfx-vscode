import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $erlang from "../../gleam/erlang.d.mts";
import type * as $atom from "../../gleam/erlang/atom.d.mts";

export type Pid$ = {
  __gleam__gleam__erlang__process__Pid: never;
};

declare class Subject extends _.CustomType {
  private __gleam__gleam__erlang__process__Subject: never;

  constructor(owner: Pid$, tag: $erlang.Reference$);
  
  owner: Pid$;
  tag: $erlang.Reference$;
}

export type Subject$<GMP> = Subject;

declare type DoNotLeak$ = {
  __gleam__gleam__erlang__process__DoNotLeak: never;
};

export type Selector$<GMQ> = {
  __gleam__gleam__erlang__process__Selector: never;
};

export class ExitMessage extends _.CustomType {
  private __gleam__gleam__erlang__process__ExitMessage: never;

  constructor(pid: Pid$, reason: ExitReason$);
  
  pid: Pid$;
  reason: ExitReason$;
}

export type ExitMessage$ = ExitMessage;

export class Normal extends _.CustomType {
  private __gleam__gleam__erlang__process__Normal: never;
}

export class Killed extends _.CustomType {
  private __gleam__gleam__erlang__process__Killed: never;
}

export class Abnormal extends _.CustomType {
  private __gleam__gleam__erlang__process__Abnormal: never;

  constructor(reason: string);
  
  reason: string;
}

export type ExitReason$ = Normal | Killed | Abnormal;

declare class Anything extends _.CustomType {
  private __gleam__gleam__erlang__process__Anything: never;
}

declare type AnythingSelectorTag$ = Anything;

declare class Process extends _.CustomType {
  private __gleam__gleam__erlang__process__Process: never;
}

declare type ProcessMonitorFlag$ = Process;

declare class ProcessMonitor extends _.CustomType {
  private __gleam__gleam__erlang__process__ProcessMonitor: never;

  constructor(tag: $erlang.Reference$);
  
  tag: $erlang.Reference$;
}

export type ProcessMonitor$ = ProcessMonitor;

export class ProcessDown extends _.CustomType {
  private __gleam__gleam__erlang__process__ProcessDown: never;

  constructor(pid: Pid$, reason: $dynamic.Dynamic$);
  
  pid: Pid$;
  reason: $dynamic.Dynamic$;
}

export type ProcessDown$ = ProcessDown;

export class CalleeDown extends _.CustomType {
  private __gleam__gleam__erlang__process__CalleeDown: never;

  constructor(reason: $dynamic.Dynamic$);
  
  reason: $dynamic.Dynamic$;
}

export class CallTimeout extends _.CustomType {
  private __gleam__gleam__erlang__process__CallTimeout: never;
}

export type CallError$<GMR> = CalleeDown | CallTimeout;

export type Timer$ = {
  __gleam__gleam__erlang__process__Timer: never;
};

export class TimerNotFound extends _.CustomType {
  private __gleam__gleam__erlang__process__TimerNotFound: never;
}

export class Cancelled extends _.CustomType {
  private __gleam__gleam__erlang__process__Cancelled: never;

  constructor(time_remaining: number);
  
  time_remaining: number;
}

export type Cancelled$ = TimerNotFound | Cancelled;

declare class Kill extends _.CustomType {
  private __gleam__gleam__erlang__process__Kill: never;
}

declare type KillFlag$ = Kill;

export function self(): Pid$;

export function start(implementation: () => any, link: boolean): Pid$;

export function new_subject(): Subject$<any>;

export function subject_owner(subject: Subject$<any>): Pid$;

export function send<GNA>(subject: Subject$<GNA>, message: GNA): undefined;

export function new_selector(): Selector$<any>;

export function select<GNI>(from: Selector$<GNI>, within: number): _.Result<
  GNI,
  undefined
>;

export function select_forever<GNM>(from: Selector$<GNM>): GNM;

export function map_selector<GNO, GNQ>(a: Selector$<GNO>, b: (x0: GNO) => GNQ): Selector$<
  GNQ
>;

export function merge_selector<GNS>(a: Selector$<GNS>, b: Selector$<GNS>): Selector$<
  GNS
>;

export function flush_messages(): undefined;

export function selecting_trapped_exits<GNW>(
  selector: Selector$<GNW>,
  handler: (x0: ExitMessage$) => GNW
): Selector$<GNW>;

export function selecting<GNZ, GOB>(
  selector: Selector$<GNZ>,
  subject: Subject$<GOB>,
  transform: (x0: GOB) => GNZ
): Selector$<GNZ>;

export function receive<GNC>(subject: Subject$<GNC>, timeout: number): _.Result<
  GNC,
  undefined
>;

export function selecting_record2<GOE>(
  selector: Selector$<GOE>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$) => GOE
): Selector$<GOE>;

export function selecting_record3<GOI>(
  selector: Selector$<GOI>,
  tag: any,
  transform: (x0: $dynamic.Dynamic$, x1: $dynamic.Dynamic$) => GOI
): Selector$<GOI>;

export function selecting_record4<GOM>(
  selector: Selector$<GOM>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$
  ) => GOM
): Selector$<GOM>;

export function selecting_record5<GOQ>(
  selector: Selector$<GOQ>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$
  ) => GOQ
): Selector$<GOQ>;

export function selecting_record6<GOU>(
  selector: Selector$<GOU>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$
  ) => GOU
): Selector$<GOU>;

export function selecting_record7<GOY>(
  selector: Selector$<GOY>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$
  ) => GOY
): Selector$<GOY>;

export function selecting_record8<GPC>(
  selector: Selector$<GPC>,
  tag: any,
  transform: (
    x0: $dynamic.Dynamic$,
    x1: $dynamic.Dynamic$,
    x2: $dynamic.Dynamic$,
    x3: $dynamic.Dynamic$,
    x4: $dynamic.Dynamic$,
    x5: $dynamic.Dynamic$,
    x6: $dynamic.Dynamic$
  ) => GPC
): Selector$<GPC>;

export function selecting_anything<GPG>(
  selector: Selector$<GPG>,
  handler: (x0: $dynamic.Dynamic$) => GPG
): Selector$<GPG>;

export function sleep(a: number): undefined;

export function sleep_forever(): undefined;

export function is_alive(a: Pid$): boolean;

export function monitor_process(pid: Pid$): ProcessMonitor$;

export function selecting_process_down<GPO>(
  selector: Selector$<GPO>,
  monitor: ProcessMonitor$,
  mapping: (x0: ProcessDown$) => GPO
): Selector$<GPO>;

export function demonitor_process(monitor: ProcessMonitor$): undefined;

export function try_call<GPR, GPT>(
  subject: Subject$<GPR>,
  make_request: (x0: Subject$<GPT>) => GPR,
  timeout: number
): _.Result<GPT, CallError$<GPT>>;

export function call<GPY, GQA>(
  subject: Subject$<GPY>,
  make_request: (x0: Subject$<GQA>) => GPY,
  timeout: number
): GQA;

export function link(pid: Pid$): boolean;

export function unlink(pid: Pid$): undefined;

export function send_after<GQD>(
  subject: Subject$<GQD>,
  delay: number,
  message: GQD
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

import type * as _ from "../gleam.d.mts";

export class P10WriteConfig extends _.CustomType {
  constructor(
    implementation_class_uid: string,
    implementation_version_name: string,
    zlib_compression_level: number
  );
  
  implementation_class_uid: string;
  implementation_version_name: string;
  zlib_compression_level: number;
}

export type P10WriteConfig$ = P10WriteConfig;

export function new$(): P10WriteConfig$;

export function implementation_class_uid(config: P10WriteConfig$, value: string): P10WriteConfig$;

export function implementation_version_name(
  config: P10WriteConfig$,
  value: string
): P10WriteConfig$;

export function zlib_compression_level(config: P10WriteConfig$, value: number): P10WriteConfig$;

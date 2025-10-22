import type * as _ from "../gleam.d.mts";

export class P10WriteConfig extends _.CustomType {
  /** @deprecated */
  constructor(
    implementation_class_uid: string,
    implementation_version_name: string,
    zlib_compression_level: number
  );
  /** @deprecated */
  implementation_class_uid: string;
  /** @deprecated */
  implementation_version_name: string;
  /** @deprecated */
  zlib_compression_level: number;
}
export function P10WriteConfig$P10WriteConfig(
  implementation_class_uid: string,
  implementation_version_name: string,
  zlib_compression_level: number,
): P10WriteConfig$;
export function P10WriteConfig$isP10WriteConfig(
  value: P10WriteConfig$,
): boolean;
export function P10WriteConfig$P10WriteConfig$0(value: P10WriteConfig$): string;
export function P10WriteConfig$P10WriteConfig$implementation_class_uid(value: P10WriteConfig$): string;
export function P10WriteConfig$P10WriteConfig$1(
  value: P10WriteConfig$,
): string;
export function P10WriteConfig$P10WriteConfig$implementation_version_name(value: P10WriteConfig$): string;
export function P10WriteConfig$P10WriteConfig$2(
  value: P10WriteConfig$,
): number;
export function P10WriteConfig$P10WriteConfig$zlib_compression_level(value: P10WriteConfig$): number;

export type P10WriteConfig$ = P10WriteConfig;

export function new$(): P10WriteConfig$;

export function implementation_class_uid(config: P10WriteConfig$, value: string): P10WriteConfig$;

export function implementation_version_name(
  config: P10WriteConfig$,
  value: string
): P10WriteConfig$;

export function zlib_compression_level(config: P10WriteConfig$, value: number): P10WriteConfig$;

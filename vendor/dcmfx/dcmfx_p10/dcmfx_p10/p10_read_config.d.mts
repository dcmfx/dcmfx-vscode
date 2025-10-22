import type * as $transfer_syntax from "../../dcmfx_core/dcmfx_core/transfer_syntax.d.mts";
import type * as _ from "../gleam.d.mts";

export class P10ReadConfig extends _.CustomType {
  /** @deprecated */
  constructor(
    max_token_size: number,
    max_string_size: number,
    max_sequence_depth: number,
    require_dicm_prefix: boolean,
    require_ordered_data_elements: boolean,
    default_transfer_syntax: $transfer_syntax.TransferSyntax$
  );
  /** @deprecated */
  max_token_size: number;
  /** @deprecated */
  max_string_size: number;
  /** @deprecated */
  max_sequence_depth: number;
  /** @deprecated */
  require_dicm_prefix: boolean;
  /** @deprecated */
  require_ordered_data_elements: boolean;
  /** @deprecated */
  default_transfer_syntax: $transfer_syntax.TransferSyntax$;
}
export function P10ReadConfig$P10ReadConfig(
  max_token_size: number,
  max_string_size: number,
  max_sequence_depth: number,
  require_dicm_prefix: boolean,
  require_ordered_data_elements: boolean,
  default_transfer_syntax: $transfer_syntax.TransferSyntax$,
): P10ReadConfig$;
export function P10ReadConfig$isP10ReadConfig(value: P10ReadConfig$): boolean;
export function P10ReadConfig$P10ReadConfig$0(value: P10ReadConfig$): number;
export function P10ReadConfig$P10ReadConfig$max_token_size(value: P10ReadConfig$): number;
export function P10ReadConfig$P10ReadConfig$1(
  value: P10ReadConfig$,
): number;
export function P10ReadConfig$P10ReadConfig$max_string_size(value: P10ReadConfig$): number;
export function P10ReadConfig$P10ReadConfig$2(
  value: P10ReadConfig$,
): number;
export function P10ReadConfig$P10ReadConfig$max_sequence_depth(value: P10ReadConfig$): number;
export function P10ReadConfig$P10ReadConfig$3(
  value: P10ReadConfig$,
): boolean;
export function P10ReadConfig$P10ReadConfig$require_dicm_prefix(value: P10ReadConfig$): boolean;
export function P10ReadConfig$P10ReadConfig$4(
  value: P10ReadConfig$,
): boolean;
export function P10ReadConfig$P10ReadConfig$require_ordered_data_elements(value: P10ReadConfig$): boolean;
export function P10ReadConfig$P10ReadConfig$5(
  value: P10ReadConfig$,
): $transfer_syntax.TransferSyntax$;
export function P10ReadConfig$P10ReadConfig$default_transfer_syntax(value: P10ReadConfig$): $transfer_syntax.TransferSyntax$;

export type P10ReadConfig$ = P10ReadConfig;

export function new$(): P10ReadConfig$;

export function max_token_size(config: P10ReadConfig$, value: number): P10ReadConfig$;

export function max_string_size(config: P10ReadConfig$, value: number): P10ReadConfig$;

export function max_sequence_depth(config: P10ReadConfig$, value: number): P10ReadConfig$;

export function require_dicm_prefix(config: P10ReadConfig$, value: boolean): P10ReadConfig$;

export function require_ordered_data_elements(
  config: P10ReadConfig$,
  value: boolean
): P10ReadConfig$;

export function default_transfer_syntax(
  config: P10ReadConfig$,
  value: $transfer_syntax.TransferSyntax$
): P10ReadConfig$;

import type * as $transfer_syntax from "../../dcmfx_core/dcmfx_core/transfer_syntax.d.mts";
import type * as _ from "../gleam.d.mts";

export class P10ReadConfig extends _.CustomType {
  constructor(
    max_token_size: number,
    max_string_size: number,
    max_sequence_depth: number,
    require_dicm_prefix: boolean,
    require_ordered_data_elements: boolean,
    default_transfer_syntax: $transfer_syntax.TransferSyntax$
  );
  
  max_token_size: number;
  max_string_size: number;
  max_sequence_depth: number;
  require_dicm_prefix: boolean;
  require_ordered_data_elements: boolean;
  default_transfer_syntax: $transfer_syntax.TransferSyntax$;
}

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

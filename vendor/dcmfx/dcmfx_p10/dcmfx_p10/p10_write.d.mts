import type * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $data_error from "../../dcmfx_core/dcmfx_core/data_error.d.mts";
import type * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
import type * as $transfer_syntax from "../../dcmfx_core/dcmfx_core/transfer_syntax.d.mts";
import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_element_header from "../dcmfx_p10/internal/data_element_header.d.mts";
import type * as $p10_location from "../dcmfx_p10/internal/p10_location.d.mts";
import type * as $zlib from "../dcmfx_p10/internal/zlib.d.mts";
import type * as $p10_error from "../dcmfx_p10/p10_error.d.mts";
import type * as $p10_token from "../dcmfx_p10/p10_token.d.mts";
import type * as $p10_write_config from "../dcmfx_p10/p10_write_config.d.mts";
import type * as _ from "../gleam.d.mts";

declare class P10WriteContext extends _.CustomType {
  /** @deprecated */
  constructor(
    config: $p10_write_config.P10WriteConfig$,
    p10_bytes: _.List<_.BitArray>,
    p10_total_byte_count: number,
    is_ended: boolean,
    transfer_syntax: $transfer_syntax.TransferSyntax$,
    zlib_stream: $option.Option$<$zlib.ZlibStream$>,
    location: _.List<$p10_location.LocationEntry$>,
    path: $data_set_path.DataSetPath$
  );
  /** @deprecated */
  config: $p10_write_config.P10WriteConfig$;
  /** @deprecated */
  p10_bytes: _.List<_.BitArray>;
  /** @deprecated */
  p10_total_byte_count: number;
  /** @deprecated */
  is_ended: boolean;
  /** @deprecated */
  transfer_syntax: $transfer_syntax.TransferSyntax$;
  /** @deprecated */
  zlib_stream: $option.Option$<$zlib.ZlibStream$>;
  /** @deprecated */
  location: _.List<$p10_location.LocationEntry$>;
  /** @deprecated */
  path: $data_set_path.DataSetPath$;
}

export type P10WriteContext$ = P10WriteContext;

export function new_write_context(
  config: $option.Option$<$p10_write_config.P10WriteConfig$>
): P10WriteContext$;

export function read_bytes(context: P10WriteContext$): [
  _.List<_.BitArray>,
  P10WriteContext$
];

export function data_element_header_to_bytes(
  header: $data_element_header.DataElementHeader$,
  endianness: $transfer_syntax.Endianness$,
  context: P10WriteContext$
): _.Result<_.BitArray, $p10_error.P10Error$>;

export function data_set_to_tokens<BZEL, BZEM>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  path: $data_set_path.DataSetPath$,
  callback_context: BZEL,
  token_callback: (x0: BZEL, x1: $p10_token.P10Token$) => _.Result<BZEL, BZEM>
): _.Result<BZEL, BZEM>;

export function write_token(
  context: P10WriteContext$,
  token: $p10_token.P10Token$
): _.Result<P10WriteContext$, $p10_error.P10Error$>;

export function data_set_to_bytes<BZER>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  path: $data_set_path.DataSetPath$,
  context: BZER,
  bytes_callback: (x0: BZER, x1: _.BitArray) => _.Result<
    BZER,
    $p10_error.P10Error$
  >,
  config: $option.Option$<$p10_write_config.P10WriteConfig$>
): _.Result<BZER, $p10_error.P10Error$>;

import type * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
import type * as $transfer_syntax from "../../dcmfx_core/dcmfx_core/transfer_syntax.d.mts";
import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_element_header from "../dcmfx_p10/internal/data_element_header.d.mts";
import type * as $zlib from "../dcmfx_p10/internal/zlib.d.mts";
import type * as $p10_error from "../dcmfx_p10/p10_error.d.mts";
import type * as $p10_part from "../dcmfx_p10/p10_part.d.mts";
import type * as _ from "../gleam.d.mts";

export class P10WriteConfig extends _.CustomType {
  private __gleam__dcmfx_p10__p10_write__P10WriteConfig: never;

  constructor(zlib_compression_level: number);
  
  zlib_compression_level: number;
}

export type P10WriteConfig$ = P10WriteConfig;

declare class P10WriteContext extends _.CustomType {
  private __gleam__dcmfx_p10__p10_write__P10WriteContext: never;

  constructor(
    config: P10WriteConfig$,
    p10_bytes: _.List<_.BitArray>,
    p10_total_byte_count: number,
    is_ended: boolean,
    transfer_syntax: $transfer_syntax.TransferSyntax$,
    zlib_stream: $option.Option$<$zlib.ZlibStream$>,
    path: $data_set_path.DataSetPath$,
    sequence_item_counts: _.List<number>
  );
  
  config: P10WriteConfig$;
  p10_bytes: _.List<_.BitArray>;
  p10_total_byte_count: number;
  is_ended: boolean;
  transfer_syntax: $transfer_syntax.TransferSyntax$;
  zlib_stream: $option.Option$<$zlib.ZlibStream$>;
  path: $data_set_path.DataSetPath$;
  sequence_item_counts: _.List<number>;
}

export type P10WriteContext$ = P10WriteContext;

export function default_config(): P10WriteConfig$;

export function new_write_context(): P10WriteContext$;

export function with_config(context: P10WriteContext$, config: P10WriteConfig$): P10WriteContext$;

export function read_bytes(context: P10WriteContext$): [
  P10WriteContext$,
  _.List<_.BitArray>
];

export function data_set_to_parts<CBZO, CBZP>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  callback_context: CBZO,
  part_callback: (x0: CBZO, x1: $p10_part.P10Part$) => _.Result<CBZO, CBZP>
): _.Result<CBZO, CBZP>;

export function data_element_header_to_bytes(
  header: $data_element_header.DataElementHeader$,
  endianness: $transfer_syntax.Endianness$
): _.Result<_.BitArray, $p10_error.P10Error$>;

export function write_part(context: P10WriteContext$, part: $p10_part.P10Part$): _.Result<
  P10WriteContext$,
  $p10_error.P10Error$
>;

export function data_set_to_bytes<CBZU>(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  context: CBZU,
  bytes_callback: (x0: CBZU, x1: _.BitArray) => _.Result<
    CBZU,
    $p10_error.P10Error$
  >,
  config: P10WriteConfig$
): _.Result<CBZU, $p10_error.P10Error$>;

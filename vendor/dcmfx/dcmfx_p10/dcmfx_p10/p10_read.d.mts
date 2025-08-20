import type * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $data_set_path from "../../dcmfx_core/dcmfx_core/data_set_path.d.mts";
import type * as $transfer_syntax from "../../dcmfx_core/dcmfx_core/transfer_syntax.d.mts";
import type * as $value_representation from "../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $byte_stream from "../dcmfx_p10/internal/byte_stream.d.mts";
import type * as $data_element_header from "../dcmfx_p10/internal/data_element_header.d.mts";
import type * as $p10_location from "../dcmfx_p10/internal/p10_location.d.mts";
import type * as $p10_error from "../dcmfx_p10/p10_error.d.mts";
import type * as $p10_read_config from "../dcmfx_p10/p10_read_config.d.mts";
import type * as $p10_token from "../dcmfx_p10/p10_token.d.mts";
import type * as _ from "../gleam.d.mts";

declare class P10ReadContext extends _.CustomType {
  constructor(
    config: $p10_read_config.P10ReadConfig$,
    stream: $byte_stream.ByteStream$,
    next_action: NextAction$,
    transfer_syntax: $transfer_syntax.TransferSyntax$,
    path: $data_set_path.DataSetPath$,
    location: _.List<$p10_location.LocationEntry$>,
    has_emitted_specific_character_set_data_element: boolean
  );
  
  config: $p10_read_config.P10ReadConfig$;
  stream: $byte_stream.ByteStream$;
  next_action: NextAction$;
  transfer_syntax: $transfer_syntax.TransferSyntax$;
  path: $data_set_path.DataSetPath$;
  location: _.List<$p10_location.LocationEntry$>;
  has_emitted_specific_character_set_data_element: boolean;
}

export type P10ReadContext$ = P10ReadContext;

declare class ReadFilePreambleAndDICMPrefix extends _.CustomType {}

declare class ReadFileMetaInformation extends _.CustomType {
  constructor(starts_at: number);
  
  starts_at: number;
}

declare class ReadDataElementHeader extends _.CustomType {}

declare class ReadDataElementValueBytes extends _.CustomType {
  constructor(
    tag: $data_element_tag.DataElementTag$,
    vr: $value_representation.ValueRepresentation$,
    length: number,
    bytes_remaining: number,
    emit_tokens: boolean
  );
  
  tag: $data_element_tag.DataElementTag$;
  vr: $value_representation.ValueRepresentation$;
  length: number;
  bytes_remaining: number;
  emit_tokens: boolean;
}

declare class ReadPixelDataItem extends _.CustomType {
  constructor(vr: $value_representation.ValueRepresentation$);
  
  vr: $value_representation.ValueRepresentation$;
}

declare type NextAction$ = ReadFilePreambleAndDICMPrefix | ReadFileMetaInformation | ReadDataElementHeader | ReadDataElementValueBytes | ReadPixelDataItem;

export function new_read_context(
  config: $option.Option$<$p10_read_config.P10ReadConfig$>
): P10ReadContext$;

export function transfer_syntax(context: P10ReadContext$): $transfer_syntax.TransferSyntax$;

export function write_bytes(
  context: P10ReadContext$,
  bytes: _.BitArray,
  done: boolean
): _.Result<P10ReadContext$, $p10_error.P10Error$>;

export function read_tokens(context: P10ReadContext$): _.Result<
  [_.List<$p10_token.P10Token$>, P10ReadContext$],
  $p10_error.P10Error$
>;

import type * as $data_element_tag from "../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $file_stream from "../file_streams/file_streams/file_stream.d.mts";
import type * as $dict from "../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../gleam_stdlib/gleam/option.d.mts";
import type * as $data_set_builder from "./dcmfx_p10/data_set_builder.d.mts";
import type * as $p10_error from "./dcmfx_p10/p10_error.d.mts";
import type * as $p10_read from "./dcmfx_p10/p10_read.d.mts";
import type * as $p10_token from "./dcmfx_p10/p10_token.d.mts";
import type * as $p10_write from "./dcmfx_p10/p10_write.d.mts";
import type * as _ from "./gleam.d.mts";

export function is_valid_bytes(bytes: _.BitArray): boolean;

export function is_valid_file(filename: string): boolean;

export function read_tokens_from_stream(
  stream: $file_stream.FileStream$,
  context: $p10_read.P10ReadContext$
): _.Result<
  [_.List<$p10_token.P10Token$>, $p10_read.P10ReadContext$],
  $p10_error.P10Error$
>;

export function read_stream(stream: $file_stream.FileStream$): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  [$p10_error.P10Error$, $data_set_builder.DataSetBuilder$]
>;

export function read_file_returning_builder_on_error(filename: string): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  [$p10_error.P10Error$, $data_set_builder.DataSetBuilder$]
>;

export function read_file(filename: string): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  $p10_error.P10Error$
>;

export function read_bytes(bytes: _.BitArray): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  [$p10_error.P10Error$, $data_set_builder.DataSetBuilder$]
>;

export function write_stream(
  stream: $file_stream.FileStream$,
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  config: $option.Option$<$p10_write.P10WriteConfig$>
): _.Result<undefined, $p10_error.P10Error$>;

export function write_file(
  filename: string,
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  config: $option.Option$<$p10_write.P10WriteConfig$>
): _.Result<undefined, $p10_error.P10Error$>;

export function write_bytes(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  config: $option.Option$<$p10_write.P10WriteConfig$>
): _.Result<_.BitArray, $p10_error.P10Error$>;

export function write_tokens_to_stream(
  tokens: _.List<$p10_token.P10Token$>,
  stream: $file_stream.FileStream$,
  context: $p10_write.P10WriteContext$
): _.Result<[boolean, $p10_write.P10WriteContext$], $p10_error.P10Error$>;

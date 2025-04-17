import type * as $data_element_tag from "../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $transfer_syntax from "../dcmfx_core/dcmfx_core/transfer_syntax.d.mts";
import type * as $dict from "../gleam_stdlib/gleam/dict.d.mts";
import type * as $p10_pixel_data_frame_filter from "./dcmfx_pixel_data/p10_pixel_data_frame_filter.d.mts";
import type * as $pixel_data_frame from "./dcmfx_pixel_data/pixel_data_frame.d.mts";
import type * as _ from "./gleam.d.mts";

export function get_pixel_data_frames(
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >
): _.Result<
  _.List<$pixel_data_frame.PixelDataFrame$>,
  $p10_pixel_data_frame_filter.P10PixelDataFrameFilterError$
>;

export function file_extension_for_transfer_syntax(
  ts: $transfer_syntax.TransferSyntax$
): string;

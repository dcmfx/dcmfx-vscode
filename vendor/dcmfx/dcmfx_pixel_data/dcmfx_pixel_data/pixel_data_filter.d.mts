import type * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $data_error from "../../dcmfx_core/dcmfx_core/data_error.d.mts";
import type * as $p10_token from "../../dcmfx_p10/dcmfx_p10/p10_token.d.mts";
import type * as $p10_filter_transform from "../../dcmfx_p10/dcmfx_p10/transforms/p10_filter_transform.d.mts";
import type * as $deque from "../../gleam_deque/gleam/deque.d.mts";
import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $pixel_data_frame from "../dcmfx_pixel_data/pixel_data_frame.d.mts";
import type * as _ from "../gleam.d.mts";

export class PixelDataFilter extends _.CustomType {
  constructor(
    is_encapsulated: boolean,
    details_filter: $option.Option$<$p10_filter_transform.P10FilterTransform$>,
    details: $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >,
    pixel_data_filter: $p10_filter_transform.P10FilterTransform$,
    native_pixel_data_frame_size: number,
    pixel_data: $deque.Deque$<_.BitArray>,
    pixel_data_write_offset: number,
    pixel_data_read_offset: number,
    offset_table: $option.Option$<_.List<[number, $option.Option$<number>]>>
  );
  
  is_encapsulated: boolean;
  details_filter: $option.Option$<$p10_filter_transform.P10FilterTransform$>;
  details: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >;
  pixel_data_filter: $p10_filter_transform.P10FilterTransform$;
  native_pixel_data_frame_size: number;
  pixel_data: $deque.Deque$<_.BitArray>;
  pixel_data_write_offset: number;
  pixel_data_read_offset: number;
  offset_table: $option.Option$<_.List<[number, $option.Option$<number>]>>;
}

export type PixelDataFilter$ = PixelDataFilter;

export function new$(): PixelDataFilter$;

export function add_token(filter: PixelDataFilter$, token: $p10_token.P10Token$): _.Result<
  [_.List<$pixel_data_frame.PixelDataFrame$>, PixelDataFilter$],
  $data_error.DataError$
>;

import type * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $data_error from "../../../dcmfx_core/dcmfx_core/data_error.d.mts";
import type * as $p10_error from "../../../dcmfx_p10/dcmfx_p10/p10_error.d.mts";
import type * as $p10_token from "../../../dcmfx_p10/dcmfx_p10/p10_token.d.mts";
import type * as $p10_custom_type_transform from "../../../dcmfx_p10/dcmfx_p10/transforms/p10_custom_type_transform.d.mts";
import type * as $p10_filter_transform from "../../../dcmfx_p10/dcmfx_p10/transforms/p10_filter_transform.d.mts";
import type * as $deque from "../../../gleam_deque/gleam/deque.d.mts";
import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $pixel_data_frame from "../../dcmfx_pixel_data/pixel_data_frame.d.mts";
import type * as _ from "../../gleam.d.mts";

declare class P10PixelDataFrameTransform extends _.CustomType {
  /** @deprecated */
  constructor(
    is_encapsulated: boolean,
    details: $p10_custom_type_transform.P10CustomTypeTransform$<
      PixelDataFrameTransformDetails$
    >,
    pixel_data_filter: $p10_filter_transform.P10FilterTransform$,
    native_pixel_data_frame_size: number,
    pixel_data: $deque.Deque$<[_.BitArray, number, boolean]>,
    pixel_data_write_offset: number,
    pixel_data_read_offset: number,
    offset_table: $option.Option$<_.List<[number, $option.Option$<number>]>>,
    next_frame_index: number
  );
  /** @deprecated */
  is_encapsulated: boolean;
  /** @deprecated */
  details: $p10_custom_type_transform.P10CustomTypeTransform$<
    PixelDataFrameTransformDetails$
  >;
  /** @deprecated */
  pixel_data_filter: $p10_filter_transform.P10FilterTransform$;
  /** @deprecated */
  native_pixel_data_frame_size: number;
  /** @deprecated */
  pixel_data: $deque.Deque$<[_.BitArray, number, boolean]>;
  /** @deprecated */
  pixel_data_write_offset: number;
  /** @deprecated */
  pixel_data_read_offset: number;
  /** @deprecated */
  offset_table: $option.Option$<_.List<[number, $option.Option$<number>]>>;
  /** @deprecated */
  next_frame_index: number;
}

export type P10PixelDataFrameTransform$ = P10PixelDataFrameTransform;

declare class PixelDataFrameTransformDetails extends _.CustomType {
  /** @deprecated */
  constructor(
    number_of_frames: number,
    rows: number,
    columns: number,
    bits_allocated: number,
    extended_offset_table: $option.Option$<
      $data_element_value.DataElementValue$
    >,
    extended_offset_table_lengths: $option.Option$<
      $data_element_value.DataElementValue$
    >
  );
  /** @deprecated */
  number_of_frames: number;
  /** @deprecated */
  rows: number;
  /** @deprecated */
  columns: number;
  /** @deprecated */
  bits_allocated: number;
  /** @deprecated */
  extended_offset_table: $option.Option$<$data_element_value.DataElementValue$>;
  /** @deprecated */
  extended_offset_table_lengths: $option.Option$<
    $data_element_value.DataElementValue$
  >;
}

declare type PixelDataFrameTransformDetails$ = PixelDataFrameTransformDetails;

export class P10Error extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $p10_error.P10Error$);
  /** @deprecated */
  0: $p10_error.P10Error$;
}
export function P10PixelDataFrameTransformError$P10Error(
  $0: $p10_error.P10Error$,
): P10PixelDataFrameTransformError$;
export function P10PixelDataFrameTransformError$isP10Error(
  value: P10PixelDataFrameTransformError$,
): boolean;
export function P10PixelDataFrameTransformError$P10Error$0(value: P10PixelDataFrameTransformError$): $p10_error.P10Error$;

export class DataError extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $data_error.DataError$);
  /** @deprecated */
  0: $data_error.DataError$;
}
export function P10PixelDataFrameTransformError$DataError(
  $0: $data_error.DataError$,
): P10PixelDataFrameTransformError$;
export function P10PixelDataFrameTransformError$isDataError(
  value: P10PixelDataFrameTransformError$,
): boolean;
export function P10PixelDataFrameTransformError$DataError$0(value: P10PixelDataFrameTransformError$): $data_error.DataError$;

export type P10PixelDataFrameTransformError$ = P10Error | DataError;

export function new$(): P10PixelDataFrameTransform$;

export function add_token(
  transform: P10PixelDataFrameTransform$,
  token: $p10_token.P10Token$
): _.Result<
  [_.List<$pixel_data_frame.PixelDataFrame$>, P10PixelDataFrameTransform$],
  P10PixelDataFrameTransformError$
>;

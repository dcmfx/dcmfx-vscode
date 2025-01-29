/// <reference types="./dcmfx_pixel_data.d.mts" />
import * as $data_error from "../dcmfx_core/dcmfx_core/data_error.mjs";
import * as $data_set from "../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $dictionary from "../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $transfer_syntax from "../dcmfx_core/dcmfx_core/transfer_syntax.mjs";
import * as $p10_write from "../dcmfx_p10/dcmfx_p10/p10_write.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $pair from "../gleam_stdlib/gleam/pair.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $pixel_data_filter from "./dcmfx_pixel_data/pixel_data_filter.mjs";
import * as $pixel_data_frame from "./dcmfx_pixel_data/pixel_data_frame.mjs";
import { toList, isEqual } from "./gleam.mjs";

export function get_pixel_data_frames(data_set) {
  let ds = (() => {
    let _pipe = toList([
      $dictionary.number_of_frames.tag,
      $dictionary.extended_offset_table.tag,
      $dictionary.extended_offset_table_lengths.tag,
      $dictionary.pixel_data.tag,
    ]);
    return $list.fold(
      _pipe,
      $data_set.new$(),
      (ds, tag) => {
        let $ = $data_set.get_value(data_set, tag);
        if ($.isOk()) {
          let value = $[0];
          return $data_set.insert(ds, tag, value);
        } else {
          return ds;
        }
      },
    );
  })();
  let context = [toList([]), $pixel_data_filter.new$()];
  let _pipe = ds;
  let _pipe$1 = $p10_write.data_set_to_parts(
    _pipe,
    context,
    (context, part) => {
      let frames = context[0];
      let filter = context[1];
      return $result.map(
        $pixel_data_filter.add_part(filter, part),
        (_use0) => {
          let new_frames = _use0[0];
          let filter$1 = _use0[1];
          let frames$1 = $list.append(frames, new_frames);
          return [frames$1, filter$1];
        },
      );
    },
  );
  return $result.map(_pipe$1, $pair.first);
}

export function file_extension_for_transfer_syntax(ts) {
  if ((((isEqual(ts, $transfer_syntax.jpeg_baseline_8bit)) || (isEqual(
    ts,
    $transfer_syntax.jpeg_extended_12bit
  ))) || (isEqual(ts, $transfer_syntax.jpeg_lossless_non_hierarchical))) || (isEqual(
    ts,
    $transfer_syntax.jpeg_lossless_non_hierarchical_sv1
  ))) {
    let ts$1 = ts;
    return ".jpg";
  } else if ((isEqual(ts, $transfer_syntax.jpeg_ls_lossless)) || (isEqual(
    ts,
    $transfer_syntax.jpeg_ls_lossy_near_lossless
  ))) {
    let ts$1 = ts;
    return ".jls";
  } else if ((((isEqual(ts, $transfer_syntax.jpeg_2k_lossless_only)) || (isEqual(
    ts,
    $transfer_syntax.jpeg_2k
  ))) || (isEqual(ts, $transfer_syntax.jpeg_2k_multi_component_lossless_only))) || (isEqual(
    ts,
    $transfer_syntax.jpeg_2k_multi_component
  ))) {
    let ts$1 = ts;
    return ".jp2";
  } else if ((((isEqual(ts, $transfer_syntax.mpeg2_main_profile_main_level)) || (isEqual(
    ts,
    $transfer_syntax.fragmentable_mpeg2_main_profile_main_level
  ))) || (isEqual(ts, $transfer_syntax.mpeg2_main_profile_high_level))) || (isEqual(
    ts,
    $transfer_syntax.fragmentable_mpeg2_main_profile_high_level
  ))) {
    let ts$1 = ts;
    return ".mp2";
  } else if ((((((((((isEqual(ts, $transfer_syntax.mpeg4_avc_h264_high_profile)) || (isEqual(
    ts,
    $transfer_syntax.fragmentable_mpeg4_avc_h264_high_profile
  ))) || (isEqual(
    ts,
    $transfer_syntax.mpeg4_avc_h264_bd_compatible_high_profile
  ))) || (isEqual(
    ts,
    $transfer_syntax.fragmentable_mpeg4_avc_h264_bd_compatible_high_profile
  ))) || (isEqual(ts, $transfer_syntax.mpeg4_avc_h264_high_profile_for_2d_video))) || (isEqual(
    ts,
    $transfer_syntax.fragmentable_mpeg4_avc_h264_high_profile_for_2d_video
  ))) || (isEqual(ts, $transfer_syntax.mpeg4_avc_h264_high_profile_for_3d_video))) || (isEqual(
    ts,
    $transfer_syntax.fragmentable_mpeg4_avc_h264_high_profile_for_3d_video
  ))) || (isEqual(ts, $transfer_syntax.mpeg4_avc_h264_stereo_high_profile))) || (isEqual(
    ts,
    $transfer_syntax.fragmentable_mpeg4_avc_h264_stereo_high_profile
  ))) {
    let ts$1 = ts;
    return ".mp4";
  } else if ((isEqual(ts, $transfer_syntax.hevc_h265_main_profile)) || (isEqual(
    ts,
    $transfer_syntax.hevc_h265_main_10_profile
  ))) {
    let ts$1 = ts;
    return ".mp4";
  } else if (((isEqual(
    ts,
    $transfer_syntax.high_throughput_jpeg_2k_lossless_only
  )) || (isEqual(
    ts,
    $transfer_syntax.high_throughput_jpeg_2k_with_rpcl_options_lossless_only
  ))) || (isEqual(ts, $transfer_syntax.high_throughput_jpeg_2k))) {
    let ts$1 = ts;
    return ".jph";
  } else {
    return ".bin";
  }
}

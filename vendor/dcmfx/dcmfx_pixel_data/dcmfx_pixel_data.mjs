/// <reference types="./dcmfx_pixel_data.d.mts" />
import * as $data_set from "../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $data_set_path from "../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $dictionary from "../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $transfer_syntax from "../dcmfx_core/dcmfx_core/transfer_syntax.mjs";
import * as $p10_write from "../dcmfx_p10/dcmfx_p10/p10_write.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $pair from "../gleam_stdlib/gleam/pair.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $pixel_data_frame from "./dcmfx_pixel_data/pixel_data_frame.mjs";
import * as $p10_pixel_data_frame_transform from "./dcmfx_pixel_data/transforms/p10_pixel_data_frame_transform.mjs";
import { Ok, toList, isEqual } from "./gleam.mjs";

export function get_pixel_data_frames(data_set) {
  let _block;
  let _pipe = toList([
    $dictionary.number_of_frames.tag,
    $dictionary.rows.tag,
    $dictionary.columns.tag,
    $dictionary.bits_allocated.tag,
    $dictionary.extended_offset_table.tag,
    $dictionary.extended_offset_table_lengths.tag,
    $dictionary.pixel_data.tag,
  ]);
  _block = $list.fold(
    _pipe,
    $data_set.new$(),
    (ds, tag) => {
      let $ = $data_set.get_value(data_set, tag);
      if ($ instanceof Ok) {
        let value = $[0];
        return $data_set.insert(ds, tag, value);
      } else {
        return ds;
      }
    },
  );
  let ds = _block;
  let context = [toList([]), $p10_pixel_data_frame_transform.new$()];
  let _pipe$1 = ds;
  let _pipe$2 = $p10_write.data_set_to_tokens(
    _pipe$1,
    $data_set_path.new$(),
    context,
    (context, token) => {
      let frames = context[0];
      let filter = context[1];
      return $result.map(
        $p10_pixel_data_frame_transform.add_token(filter, token),
        (_use0) => {
          let new_frames = _use0[0];
          let filter$1 = _use0[1];
          let frames$1 = $list.append(frames, new_frames);
          return [frames$1, filter$1];
        },
      );
    },
  );
  return $result.map(_pipe$2, $pair.first);
}

export function file_extension_for_transfer_syntax(ts) {
  let ts$1 = ts;
  if ((((isEqual(ts$1, $transfer_syntax.jpeg_baseline_8bit)) || (isEqual(
    ts$1,
    $transfer_syntax.jpeg_extended_12bit
  ))) || (isEqual(ts$1, $transfer_syntax.jpeg_lossless_non_hierarchical))) || (isEqual(
    ts$1,
    $transfer_syntax.jpeg_lossless_non_hierarchical_sv1
  ))) {
    return ".jpg";
  } else {
    let ts$2 = ts;
    if ((isEqual(ts$2, $transfer_syntax.jpeg_ls_lossless)) || (isEqual(
      ts$2,
      $transfer_syntax.jpeg_ls_lossy_near_lossless
    ))) {
      return ".jls";
    } else {
      let ts$3 = ts;
      if ((((isEqual(ts$3, $transfer_syntax.jpeg_2k_lossless_only)) || (isEqual(
        ts$3,
        $transfer_syntax.jpeg_2k
      ))) || (isEqual(
        ts$3,
        $transfer_syntax.jpeg_2k_multi_component_lossless_only
      ))) || (isEqual(ts$3, $transfer_syntax.jpeg_2k_multi_component))) {
        return ".j2k";
      } else {
        let ts$4 = ts;
        if ((((isEqual(ts$4, $transfer_syntax.mpeg2_main_profile_main_level)) || (isEqual(
          ts$4,
          $transfer_syntax.fragmentable_mpeg2_main_profile_main_level
        ))) || (isEqual(ts$4, $transfer_syntax.mpeg2_main_profile_high_level))) || (isEqual(
          ts$4,
          $transfer_syntax.fragmentable_mpeg2_main_profile_high_level
        ))) {
          return ".mp2";
        } else {
          let ts$5 = ts;
          if ((((((((((isEqual(
            ts$5,
            $transfer_syntax.mpeg4_avc_h264_high_profile
          )) || (isEqual(
            ts$5,
            $transfer_syntax.fragmentable_mpeg4_avc_h264_high_profile
          ))) || (isEqual(
            ts$5,
            $transfer_syntax.mpeg4_avc_h264_bd_compatible_high_profile
          ))) || (isEqual(
            ts$5,
            $transfer_syntax.fragmentable_mpeg4_avc_h264_bd_compatible_high_profile
          ))) || (isEqual(
            ts$5,
            $transfer_syntax.mpeg4_avc_h264_high_profile_for_2d_video
          ))) || (isEqual(
            ts$5,
            $transfer_syntax.fragmentable_mpeg4_avc_h264_high_profile_for_2d_video
          ))) || (isEqual(
            ts$5,
            $transfer_syntax.mpeg4_avc_h264_high_profile_for_3d_video
          ))) || (isEqual(
            ts$5,
            $transfer_syntax.fragmentable_mpeg4_avc_h264_high_profile_for_3d_video
          ))) || (isEqual(
            ts$5,
            $transfer_syntax.mpeg4_avc_h264_stereo_high_profile
          ))) || (isEqual(
            ts$5,
            $transfer_syntax.fragmentable_mpeg4_avc_h264_stereo_high_profile
          ))) {
            return ".mp4";
          } else {
            let ts$6 = ts;
            if ((isEqual(ts$6, $transfer_syntax.hevc_h265_main_profile)) || (isEqual(
              ts$6,
              $transfer_syntax.hevc_h265_main_10_profile
            ))) {
              return ".mp4";
            } else {
              let ts$7 = ts;
              if (((isEqual(ts$7, $transfer_syntax.jpeg_xl_lossless)) || (isEqual(
                ts$7,
                $transfer_syntax.jpeg_xl_jpeg_recompression
              ))) || (isEqual(ts$7, $transfer_syntax.jpeg_xl))) {
                return ".jxl";
              } else {
                let ts$8 = ts;
                if (((isEqual(
                  ts$8,
                  $transfer_syntax.high_throughput_jpeg_2k_lossless_only
                )) || (isEqual(
                  ts$8,
                  $transfer_syntax.high_throughput_jpeg_2k_with_rpcl_options_lossless_only
                ))) || (isEqual(ts$8, $transfer_syntax.high_throughput_jpeg_2k))) {
                  return ".jph";
                } else {
                  let ts$9 = ts;
                  if (isEqual(
                    ts$9,
                    $transfer_syntax.deflated_image_frame_compression
                  )) {
                    return ".zz";
                  } else {
                    return ".bin";
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

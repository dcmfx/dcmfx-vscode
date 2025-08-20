import type * as _ from "../gleam.d.mts";

export class VrImplicit extends _.CustomType {}

export class VrExplicit extends _.CustomType {}

export type VrSerialization$ = VrImplicit | VrExplicit;

export class LittleEndian extends _.CustomType {}

export class BigEndian extends _.CustomType {}

export type Endianness$ = LittleEndian | BigEndian;

export class TransferSyntax extends _.CustomType {
  constructor(
    name: string,
    uid: string,
    vr_serialization: VrSerialization$,
    endianness: Endianness$,
    is_deflated: boolean,
    is_encapsulated: boolean
  );
  
  name: string;
  uid: string;
  vr_serialization: VrSerialization$;
  endianness: Endianness$;
  is_deflated: boolean;
  is_encapsulated: boolean;
}

export type TransferSyntax$ = TransferSyntax;

export const implicit_vr_little_endian: TransferSyntax$;

export const explicit_vr_little_endian: TransferSyntax$;

export const encapsulated_uncompressed_explicit_vr_little_endian: TransferSyntax$;

export const deflated_explicit_vr_little_endian: TransferSyntax$;

export const explicit_vr_big_endian: TransferSyntax$;

export const jpeg_baseline_8bit: TransferSyntax$;

export const jpeg_extended_12bit: TransferSyntax$;

export const jpeg_lossless_non_hierarchical: TransferSyntax$;

export const jpeg_lossless_non_hierarchical_sv1: TransferSyntax$;

export const jpeg_ls_lossless: TransferSyntax$;

export const jpeg_ls_lossy_near_lossless: TransferSyntax$;

export const jpeg_2000_lossless_only: TransferSyntax$;

export const jpeg_2000: TransferSyntax$;

export const jpeg_2000_multi_component_lossless_only: TransferSyntax$;

export const jpeg_2000_multi_component: TransferSyntax$;

export const jpip_referenced: TransferSyntax$;

export const jpip_referenced_deflate: TransferSyntax$;

export const mpeg2_main_profile_main_level: TransferSyntax$;

export const fragmentable_mpeg2_main_profile_main_level: TransferSyntax$;

export const mpeg2_main_profile_high_level: TransferSyntax$;

export const fragmentable_mpeg2_main_profile_high_level: TransferSyntax$;

export const mpeg4_avc_h264_high_profile: TransferSyntax$;

export const fragmentable_mpeg4_avc_h264_high_profile: TransferSyntax$;

export const mpeg4_avc_h264_bd_compatible_high_profile: TransferSyntax$;

export const fragmentable_mpeg4_avc_h264_bd_compatible_high_profile: TransferSyntax$;

export const mpeg4_avc_h264_high_profile_for_2d_video: TransferSyntax$;

export const fragmentable_mpeg4_avc_h264_high_profile_for_2d_video: TransferSyntax$;

export const mpeg4_avc_h264_high_profile_for_3d_video: TransferSyntax$;

export const fragmentable_mpeg4_avc_h264_high_profile_for_3d_video: TransferSyntax$;

export const mpeg4_avc_h264_stereo_high_profile: TransferSyntax$;

export const fragmentable_mpeg4_avc_h264_stereo_high_profile: TransferSyntax$;

export const hevc_h265_main_profile: TransferSyntax$;

export const hevc_h265_main_10_profile: TransferSyntax$;

export const jpeg_xl_lossless: TransferSyntax$;

export const jpeg_xl_jpeg_recompression: TransferSyntax$;

export const jpeg_xl: TransferSyntax$;

export const high_throughput_jpeg_2000_lossless_only: TransferSyntax$;

export const high_throughput_jpeg_2000_with_rpcl_options_lossless_only: TransferSyntax$;

export const high_throughput_jpeg_2000: TransferSyntax$;

export function is_jpeg_2000(transfer_syntax: TransferSyntax$): boolean;

export const jpip_high_throughput_jpeg_2000_referenced: TransferSyntax$;

export const jpip_high_throughput_jpeg_2000_referenced_deflate: TransferSyntax$;

export const rle_lossless: TransferSyntax$;

export const smpte_st_2110_20_uncompressed_progressive_active_video: TransferSyntax$;

export const smpte_st_2110_20_uncompressed_interlaced_active_video: TransferSyntax$;

export const smpte_st_2110_30_pcm_audio: TransferSyntax$;

export const deflated_image_frame_compression: TransferSyntax$;

export function from_uid(uid: string): _.Result<TransferSyntax$, undefined>;

export const all: _.List<TransferSyntax$>;

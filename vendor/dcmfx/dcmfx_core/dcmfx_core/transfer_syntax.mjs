/// <reference types="./transfer_syntax.d.mts" />
import { Ok, Error, toList, CustomType as $CustomType } from "../gleam.mjs";

export class VrImplicit extends $CustomType {}

export class VrExplicit extends $CustomType {}

export class LittleEndian extends $CustomType {}

export class BigEndian extends $CustomType {}

export class TransferSyntax extends $CustomType {
  constructor(name, uid, vr_serialization, endianness, is_deflated, is_encapsulated) {
    super();
    this.name = name;
    this.uid = uid;
    this.vr_serialization = vr_serialization;
    this.endianness = endianness;
    this.is_deflated = is_deflated;
    this.is_encapsulated = is_encapsulated;
  }
}

export const implicit_vr_little_endian = /* @__PURE__ */ new TransferSyntax(
  "Implicit VR Little Endian",
  "1.2.840.10008.1.2",
  /* @__PURE__ */ new VrImplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  false,
);

export const explicit_vr_little_endian = /* @__PURE__ */ new TransferSyntax(
  "Explicit VR Little Endian",
  "1.2.840.10008.1.2.1",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  false,
);

export const encapsulated_uncompressed_explicit_vr_little_endian = /* @__PURE__ */ new TransferSyntax(
  "Encapsulated Uncompressed Explicit VR Little Endian",
  "1.2.840.10008.1.2.1.98",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const deflated_explicit_vr_little_endian = /* @__PURE__ */ new TransferSyntax(
  "Deflated Explicit VR Little Endian",
  "1.2.840.10008.1.2.1.99",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  true,
  false,
);

export const explicit_vr_big_endian = /* @__PURE__ */ new TransferSyntax(
  "Explicit VR Big Endian",
  "1.2.840.10008.1.2.2",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new BigEndian(),
  false,
  false,
);

export const jpeg_baseline_8bit = /* @__PURE__ */ new TransferSyntax(
  "JPEG Baseline (Process 1)",
  "1.2.840.10008.1.2.4.50",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpeg_extended_12bit = /* @__PURE__ */ new TransferSyntax(
  "JPEG Extended (Process 2 & 4)",
  "1.2.840.10008.1.2.4.51",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpeg_lossless_non_hierarchical = /* @__PURE__ */ new TransferSyntax(
  "JPEG Lossless, Non-Hierarchical (Process 14)",
  "1.2.840.10008.1.2.4.57",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpeg_lossless_non_hierarchical_sv1 = /* @__PURE__ */ new TransferSyntax(
  "JPEG Lossless, Non-Hierarchical, First-Order Prediction (Process 14 [Selection Value 1])",
  "1.2.840.10008.1.2.4.70",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpeg_ls_lossless = /* @__PURE__ */ new TransferSyntax(
  "JPEG-LS Lossless Image Compression",
  "1.2.840.10008.1.2.4.80",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpeg_ls_lossy_near_lossless = /* @__PURE__ */ new TransferSyntax(
  "JPEG-LS Lossy (Near-Lossless) Image Compression",
  "1.2.840.10008.1.2.4.81",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpeg_2k_lossless_only = /* @__PURE__ */ new TransferSyntax(
  "JPEG 2000 Image Compression (Lossless Only)",
  "1.2.840.10008.1.2.4.90",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpeg_2k = /* @__PURE__ */ new TransferSyntax(
  "JPEG 2000 Image Compression",
  "1.2.840.10008.1.2.4.91",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpeg_2k_multi_component_lossless_only = /* @__PURE__ */ new TransferSyntax(
  "JPEG 2000 Part 2 Multi-component Image Compression (Lossless Only)",
  "1.2.840.10008.1.2.4.92",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpeg_2k_multi_component = /* @__PURE__ */ new TransferSyntax(
  "JPEG 2000 Part 2 Multi-component Image Compression",
  "1.2.840.10008.1.2.4.93",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpip_referenced = /* @__PURE__ */ new TransferSyntax(
  "JPIP Referenced",
  "1.2.840.10008.1.2.4.94",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  false,
);

export const jpip_referenced_deflate = /* @__PURE__ */ new TransferSyntax(
  "JPIP Referenced Deflate",
  "1.2.840.10008.1.2.4.95",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  true,
  false,
);

export const mpeg2_main_profile_main_level = /* @__PURE__ */ new TransferSyntax(
  "MPEG2 Main Profile @ Main Level",
  "1.2.840.10008.1.2.4.100",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const fragmentable_mpeg2_main_profile_main_level = /* @__PURE__ */ new TransferSyntax(
  "Fragmentable MPEG2 Main Profile @ Main Level",
  "1.2.840.10008.1.2.4.100.1",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const mpeg2_main_profile_high_level = /* @__PURE__ */ new TransferSyntax(
  "MPEG2 Main Profile @ High Level",
  "1.2.840.10008.1.2.4.101",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const fragmentable_mpeg2_main_profile_high_level = /* @__PURE__ */ new TransferSyntax(
  "Fragmentable MPEG2 Main Profile @ High Level",
  "1.2.840.10008.1.2.4.101.1",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const mpeg4_avc_h264_high_profile = /* @__PURE__ */ new TransferSyntax(
  "MPEG-4 AVC/H.264 High Profile / Level 4.1",
  "1.2.840.10008.1.2.4.102",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const fragmentable_mpeg4_avc_h264_high_profile = /* @__PURE__ */ new TransferSyntax(
  "Fragmentable MPEG-4 AVC/H.264 High Profile / Level 4.1",
  "1.2.840.10008.1.2.4.102.1",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const mpeg4_avc_h264_bd_compatible_high_profile = /* @__PURE__ */ new TransferSyntax(
  "MPEG-4 AVC/H.264 BD-compatible High Profile / Level 4.1",
  "1.2.840.10008.1.2.4.103",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const fragmentable_mpeg4_avc_h264_bd_compatible_high_profile = /* @__PURE__ */ new TransferSyntax(
  "Fragmentable MPEG-4 AVC/H.264 BD-compatible High Profile / Level 4.1",
  "1.2.840.10008.1.2.4.103.1",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const mpeg4_avc_h264_high_profile_for_2d_video = /* @__PURE__ */ new TransferSyntax(
  "MPEG-4 AVC/H.264 High Profile / Level 4.2 For 2D Video",
  "1.2.840.10008.1.2.4.104",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const fragmentable_mpeg4_avc_h264_high_profile_for_2d_video = /* @__PURE__ */ new TransferSyntax(
  "Fragmentable MPEG-4 AVC/H.264 High Profile / Level 4.2 For 2D Video",
  "1.2.840.10008.1.2.4.104.1",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const mpeg4_avc_h264_high_profile_for_3d_video = /* @__PURE__ */ new TransferSyntax(
  "MPEG-4 AVC/H.264 High Profile / Level 4.2 For 3D Video",
  "1.2.840.10008.1.2.4.105",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const fragmentable_mpeg4_avc_h264_high_profile_for_3d_video = /* @__PURE__ */ new TransferSyntax(
  "Fragmentable MPEG-4 AVC/H.264 High Profile / Level 4.2 For 3D Video",
  "1.2.840.10008.1.2.4.105.1",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const mpeg4_avc_h264_stereo_high_profile = /* @__PURE__ */ new TransferSyntax(
  "MPEG-4 AVC/H.264 Stereo High Profile / Level 4.2",
  "1.2.840.10008.1.2.4.106",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const fragmentable_mpeg4_avc_h264_stereo_high_profile = /* @__PURE__ */ new TransferSyntax(
  "Fragmentable MPEG-4 AVC/H.264 Stereo High Profile / Level 4.2",
  "1.2.840.10008.1.2.4.106.1",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const hevc_h265_main_profile = /* @__PURE__ */ new TransferSyntax(
  "HEVC/H.265 Main Profile / Level 5.1",
  "1.2.840.10008.1.2.4.107",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const hevc_h265_main_10_profile = /* @__PURE__ */ new TransferSyntax(
  "HEVC/H.265 Main 10 Profile / Level 5.1",
  "1.2.840.10008.1.2.4.108",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpeg_xl_lossless = /* @__PURE__ */ new TransferSyntax(
  "JPEG XL Lossless",
  "1.2.840.10008.1.2.4.110",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpeg_xl_jpeg_recompression = /* @__PURE__ */ new TransferSyntax(
  "JPEG XL JPEG Recompression",
  "1.2.840.10008.1.2.4.111",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpeg_xl = /* @__PURE__ */ new TransferSyntax(
  "JPEG XL",
  "1.2.840.10008.1.2.4.112",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const high_throughput_jpeg_2k_lossless_only = /* @__PURE__ */ new TransferSyntax(
  "High-Throughput JPEG 2000 (Lossless Only)",
  "1.2.840.10008.1.2.4.201",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const high_throughput_jpeg_2k_with_rpcl_options_lossless_only = /* @__PURE__ */ new TransferSyntax(
  "High-Throughput JPEG 2000 with RPCL Options (Lossless Only)",
  "1.2.840.10008.1.2.4.202",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const high_throughput_jpeg_2k = /* @__PURE__ */ new TransferSyntax(
  "High-Throughput JPEG 2000",
  "1.2.840.10008.1.2.4.203",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const jpip_high_throughput_jpeg_2k_referenced = /* @__PURE__ */ new TransferSyntax(
  "JPIP HTJ2K Referenced",
  "1.2.840.10008.1.2.4.204",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  false,
);

export const jpip_high_throughput_jpeg_2k_referenced_deflate = /* @__PURE__ */ new TransferSyntax(
  "JPIP HTJ2K Referenced Deflate",
  "1.2.840.10008.1.2.4.205",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  true,
  false,
);

export const rle_lossless = /* @__PURE__ */ new TransferSyntax(
  "RLE Lossless",
  "1.2.840.10008.1.2.5",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const smpte_st_2110_20_uncompressed_progressive_active_video = /* @__PURE__ */ new TransferSyntax(
  "SMPTE ST 2110-20 Uncompressed Progressive Active Video",
  "1.2.840.10008.1.2.7.1",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const smpte_st_2110_20_uncompressed_interlaced_active_video = /* @__PURE__ */ new TransferSyntax(
  "SMPTE ST 2110-20 Uncompressed Interlaced Active Video",
  "1.2.840.10008.1.2.7.2",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export const smpte_st_2110_30_pcm_audio = /* @__PURE__ */ new TransferSyntax(
  "SMPTE ST 2110-30 PCM Audio",
  "1.2.840.10008.1.2.7.3",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  false,
);

export const deflated_image_frame_compression = /* @__PURE__ */ new TransferSyntax(
  "Deflated Image Frame Compression",
  "1.2.840.10008.1.2.8.1",
  /* @__PURE__ */ new VrExplicit(),
  /* @__PURE__ */ new LittleEndian(),
  false,
  true,
);

export function from_uid(uid) {
  if (uid === "1.2.840.10008.1.2") {
    return new Ok(implicit_vr_little_endian);
  } else if (uid === "1.2.840.10008.1.2.1") {
    return new Ok(explicit_vr_little_endian);
  } else if (uid === "1.2.840.10008.1.2.1.98") {
    return new Ok(encapsulated_uncompressed_explicit_vr_little_endian);
  } else if (uid === "1.2.840.10008.1.2.1.99") {
    return new Ok(deflated_explicit_vr_little_endian);
  } else if (uid === "1.2.840.10008.1.2.2") {
    return new Ok(explicit_vr_big_endian);
  } else if (uid === "1.2.840.10008.1.2.4.50") {
    return new Ok(jpeg_baseline_8bit);
  } else if (uid === "1.2.840.10008.1.2.4.51") {
    return new Ok(jpeg_extended_12bit);
  } else if (uid === "1.2.840.10008.1.2.4.57") {
    return new Ok(jpeg_lossless_non_hierarchical);
  } else if (uid === "1.2.840.10008.1.2.4.70") {
    return new Ok(jpeg_lossless_non_hierarchical_sv1);
  } else if (uid === "1.2.840.10008.1.2.4.80") {
    return new Ok(jpeg_ls_lossless);
  } else if (uid === "1.2.840.10008.1.2.4.81") {
    return new Ok(jpeg_ls_lossy_near_lossless);
  } else if (uid === "1.2.840.10008.1.2.4.90") {
    return new Ok(jpeg_2k_lossless_only);
  } else if (uid === "1.2.840.10008.1.2.4.91") {
    return new Ok(jpeg_2k);
  } else if (uid === "1.2.840.10008.1.2.4.92") {
    return new Ok(jpeg_2k_multi_component_lossless_only);
  } else if (uid === "1.2.840.10008.1.2.4.93") {
    return new Ok(jpeg_2k_multi_component);
  } else if (uid === "1.2.840.10008.1.2.4.94") {
    return new Ok(jpip_referenced);
  } else if (uid === "1.2.840.10008.1.2.4.95") {
    return new Ok(jpip_referenced_deflate);
  } else if (uid === "1.2.840.10008.1.2.4.100") {
    return new Ok(mpeg2_main_profile_main_level);
  } else if (uid === "1.2.840.10008.1.2.4.100.1") {
    return new Ok(fragmentable_mpeg2_main_profile_main_level);
  } else if (uid === "1.2.840.10008.1.2.4.101") {
    return new Ok(mpeg2_main_profile_high_level);
  } else if (uid === "1.2.840.10008.1.2.4.101.1") {
    return new Ok(fragmentable_mpeg2_main_profile_high_level);
  } else if (uid === "1.2.840.10008.1.2.4.102") {
    return new Ok(mpeg4_avc_h264_high_profile);
  } else if (uid === "1.2.840.10008.1.2.4.102.1") {
    return new Ok(fragmentable_mpeg4_avc_h264_high_profile);
  } else if (uid === "1.2.840.10008.1.2.4.103") {
    return new Ok(mpeg4_avc_h264_bd_compatible_high_profile);
  } else if (uid === "1.2.840.10008.1.2.4.103.1") {
    return new Ok(fragmentable_mpeg4_avc_h264_bd_compatible_high_profile);
  } else if (uid === "1.2.840.10008.1.2.4.104") {
    return new Ok(mpeg4_avc_h264_high_profile_for_2d_video);
  } else if (uid === "1.2.840.10008.1.2.4.104.1") {
    return new Ok(fragmentable_mpeg4_avc_h264_high_profile_for_2d_video);
  } else if (uid === "1.2.840.10008.1.2.4.105") {
    return new Ok(mpeg4_avc_h264_high_profile_for_3d_video);
  } else if (uid === "1.2.840.10008.1.2.4.105.1") {
    return new Ok(fragmentable_mpeg4_avc_h264_high_profile_for_3d_video);
  } else if (uid === "1.2.840.10008.1.2.4.106") {
    return new Ok(mpeg4_avc_h264_stereo_high_profile);
  } else if (uid === "1.2.840.10008.1.2.4.106.1") {
    return new Ok(fragmentable_mpeg4_avc_h264_stereo_high_profile);
  } else if (uid === "1.2.840.10008.1.2.4.107") {
    return new Ok(hevc_h265_main_profile);
  } else if (uid === "1.2.840.10008.1.2.4.108") {
    return new Ok(hevc_h265_main_10_profile);
  } else if (uid === "1.2.840.10008.1.2.4.110") {
    return new Ok(jpeg_xl_lossless);
  } else if (uid === "1.2.840.10008.1.2.4.111") {
    return new Ok(jpeg_xl_jpeg_recompression);
  } else if (uid === "1.2.840.10008.1.2.4.112") {
    return new Ok(jpeg_xl);
  } else if (uid === "1.2.840.10008.1.2.4.201") {
    return new Ok(high_throughput_jpeg_2k_lossless_only);
  } else if (uid === "1.2.840.10008.1.2.4.202") {
    return new Ok(high_throughput_jpeg_2k_with_rpcl_options_lossless_only);
  } else if (uid === "1.2.840.10008.1.2.4.203") {
    return new Ok(high_throughput_jpeg_2k);
  } else if (uid === "1.2.840.10008.1.2.4.204") {
    return new Ok(jpip_high_throughput_jpeg_2k_referenced);
  } else if (uid === "1.2.840.10008.1.2.4.205") {
    return new Ok(jpip_high_throughput_jpeg_2k_referenced_deflate);
  } else if (uid === "1.2.840.10008.1.2.5") {
    return new Ok(rle_lossless);
  } else if (uid === "1.2.840.10008.1.2.7.1") {
    return new Ok(smpte_st_2110_20_uncompressed_progressive_active_video);
  } else if (uid === "1.2.840.10008.1.2.7.2") {
    return new Ok(smpte_st_2110_20_uncompressed_interlaced_active_video);
  } else if (uid === "1.2.840.10008.1.2.7.3") {
    return new Ok(smpte_st_2110_30_pcm_audio);
  } else if (uid === "1.2.840.10008.1.2.8.1") {
    return new Ok(deflated_image_frame_compression);
  } else {
    return new Error(undefined);
  }
}

export const all = /* @__PURE__ */ toList([
  implicit_vr_little_endian,
  explicit_vr_little_endian,
  encapsulated_uncompressed_explicit_vr_little_endian,
  deflated_explicit_vr_little_endian,
  explicit_vr_big_endian,
  jpeg_baseline_8bit,
  jpeg_extended_12bit,
  jpeg_lossless_non_hierarchical,
  jpeg_lossless_non_hierarchical_sv1,
  jpeg_ls_lossless,
  jpeg_ls_lossy_near_lossless,
  jpeg_2k_lossless_only,
  jpeg_2k,
  jpeg_2k_multi_component_lossless_only,
  jpeg_2k_multi_component,
  jpip_referenced,
  jpip_referenced_deflate,
  mpeg2_main_profile_main_level,
  fragmentable_mpeg2_main_profile_main_level,
  mpeg2_main_profile_high_level,
  fragmentable_mpeg2_main_profile_high_level,
  mpeg4_avc_h264_high_profile,
  fragmentable_mpeg4_avc_h264_high_profile,
  mpeg4_avc_h264_bd_compatible_high_profile,
  fragmentable_mpeg4_avc_h264_bd_compatible_high_profile,
  mpeg4_avc_h264_high_profile_for_2d_video,
  fragmentable_mpeg4_avc_h264_high_profile_for_2d_video,
  mpeg4_avc_h264_high_profile_for_3d_video,
  fragmentable_mpeg4_avc_h264_high_profile_for_3d_video,
  mpeg4_avc_h264_stereo_high_profile,
  fragmentable_mpeg4_avc_h264_stereo_high_profile,
  hevc_h265_main_profile,
  hevc_h265_main_10_profile,
  jpeg_xl_lossless,
  jpeg_xl_jpeg_recompression,
  jpeg_xl,
  high_throughput_jpeg_2k_lossless_only,
  high_throughput_jpeg_2k_with_rpcl_options_lossless_only,
  high_throughput_jpeg_2k,
  jpip_high_throughput_jpeg_2k_referenced,
  jpip_high_throughput_jpeg_2k_referenced_deflate,
  rle_lossless,
  smpte_st_2110_20_uncompressed_progressive_active_video,
  smpte_st_2110_20_uncompressed_interlaced_active_video,
  smpte_st_2110_30_pcm_audio,
  deflated_image_frame_compression,
]);

/// <reference types="./p10_write_config.d.mts" />
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $uids from "../dcmfx_p10/uids.mjs";
import { CustomType as $CustomType } from "../gleam.mjs";

export class P10WriteConfig extends $CustomType {
  constructor(implementation_class_uid, implementation_version_name, zlib_compression_level) {
    super();
    this.implementation_class_uid = implementation_class_uid;
    this.implementation_version_name = implementation_version_name;
    this.zlib_compression_level = zlib_compression_level;
  }
}

/**
 * Returns the default write config.
 */
export function new$() {
  return new P10WriteConfig(
    $uids.dcmfx_implementation_class_uid,
    $uids.dcmfx_implementation_version_name,
    6,
  );
}

/**
 * The implementation class UID that will be included in the File Meta
 * Information header of serialized DICOM P10 data.
 *
 * Defaults to the value of `dcmfx_p10/uids.dcmfx_implementation_class_uid`.
 */
export function implementation_class_uid(config, value) {
  return new P10WriteConfig(
    value,
    config.implementation_version_name,
    config.zlib_compression_level,
  );
}

/**
 * The implementation version name that will be included in the File Meta
 * Information header of serialized DICOM P10 data.
 *
 * Defaults to the value of `dcmfx_p10/uids.dcmfx_implementation_version_name`.
 */
export function implementation_version_name(config, value) {
  return new P10WriteConfig(
    config.implementation_class_uid,
    value,
    config.zlib_compression_level,
  );
}

/**
 * The zlib compression level to use when the transfer syntax being used is
 * deflated. There are only three deflated transfer syntaxes: 'Deflated
 * Explicit VR Little Endian', 'JPIP Referenced Deflate', and 'JPIP HTJ2K
 * Referenced Deflate'.
 *
 * The level ranges from 0, meaning no compression, through to 9, which gives
 * the best compression at the cost of speed.
 *
 * Default: 6.
 */
export function zlib_compression_level(config, value) {
  return new P10WriteConfig(
    config.implementation_class_uid,
    config.implementation_version_name,
    $int.clamp(value, 0, 9),
  );
}

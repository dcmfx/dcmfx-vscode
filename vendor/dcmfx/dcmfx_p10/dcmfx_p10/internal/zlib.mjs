/// <reference types="./zlib.d.mts" />
import * as $flush_command from "../../dcmfx_p10/internal/zlib/flush_command.mjs";
import * as $inflate_result from "../../dcmfx_p10/internal/zlib/inflate_result.mjs";
import { CustomType as $CustomType } from "../../gleam.mjs";
import {
  open,
  deflateInit as deflate_init,
  inflateInit as inflate_init,
  deflate,
  safeInflate as safe_inflate,
} from "../../pako_ffi.mjs";

export { deflate, deflate_init, inflate_init, open, safe_inflate };

export class Deflated extends $CustomType {}

export class Default extends $CustomType {}

export class Filtered extends $CustomType {}

export class HuffmanOnly extends $CustomType {}

export class Rle extends $CustomType {}

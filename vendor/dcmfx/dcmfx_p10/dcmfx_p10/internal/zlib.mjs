/// <reference types="./zlib.d.mts" />
import * as $flush_command from "../../dcmfx_p10/internal/zlib/flush_command.mjs";
import * as $inflate_result from "../../dcmfx_p10/internal/zlib/inflate_result.mjs";
import { CustomType as $CustomType } from "../../gleam.mjs";
import { open, deflate_init, inflate_init, deflate, safe_inflate } from "./zlib_ffi.mjs";

export { deflate, deflate_init, inflate_init, open, safe_inflate };

export class Deflated extends $CustomType {}

export class Default extends $CustomType {}

export class Filtered extends $CustomType {}

export class HuffmanOnly extends $CustomType {}

export class Rle extends $CustomType {}

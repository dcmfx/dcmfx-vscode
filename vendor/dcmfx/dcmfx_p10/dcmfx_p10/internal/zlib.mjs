/// <reference types="./zlib.d.mts" />
import * as $flush_command from "../../dcmfx_p10/internal/zlib/flush_command.mjs";
import * as $inflate_result from "../../dcmfx_p10/internal/zlib/inflate_result.mjs";
import { CustomType as $CustomType } from "../../gleam.mjs";
import { open, deflate_init, inflate_init, deflate, safe_inflate } from "./zlib_ffi.mjs";

export { deflate, deflate_init, inflate_init, open, safe_inflate };

export class Deflated extends $CustomType {}
export const Zmethod$Deflated = () => new Deflated();
export const Zmethod$isDeflated = (value) => value instanceof Deflated;

export class Default extends $CustomType {}
export const Zstrategy$Default = () => new Default();
export const Zstrategy$isDefault = (value) => value instanceof Default;

export class Filtered extends $CustomType {}
export const Zstrategy$Filtered = () => new Filtered();
export const Zstrategy$isFiltered = (value) => value instanceof Filtered;

export class HuffmanOnly extends $CustomType {}
export const Zstrategy$HuffmanOnly = () => new HuffmanOnly();
export const Zstrategy$isHuffmanOnly = (value) => value instanceof HuffmanOnly;

export class Rle extends $CustomType {}
export const Zstrategy$Rle = () => new Rle();
export const Zstrategy$isRle = (value) => value instanceof Rle;

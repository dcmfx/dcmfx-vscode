/// <reference types="./endian.d.mts" />
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import {
  endian__swap_16_bit as swap_16_bit,
  endian__swap_32_bit as swap_32_bit,
  endian__swap_64_bit as swap_64_bit,
} from "../../dcmfx_core_ffi.mjs";

export { swap_16_bit, swap_32_bit, swap_64_bit };

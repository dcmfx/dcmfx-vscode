/// <reference types="./json_config.d.mts" />
import { CustomType as $CustomType } from "../gleam.mjs";

export class DicomJsonConfig extends $CustomType {
  constructor(store_encapsulated_pixel_data, pretty_print) {
    super();
    this.store_encapsulated_pixel_data = store_encapsulated_pixel_data;
    this.pretty_print = pretty_print;
  }
}
export const DicomJsonConfig$DicomJsonConfig = (store_encapsulated_pixel_data, pretty_print) =>
  new DicomJsonConfig(store_encapsulated_pixel_data, pretty_print);
export const DicomJsonConfig$isDicomJsonConfig = (value) =>
  value instanceof DicomJsonConfig;
export const DicomJsonConfig$DicomJsonConfig$store_encapsulated_pixel_data = (value) =>
  value.store_encapsulated_pixel_data;
export const DicomJsonConfig$DicomJsonConfig$0 = (value) =>
  value.store_encapsulated_pixel_data;
export const DicomJsonConfig$DicomJsonConfig$pretty_print = (value) =>
  value.pretty_print;
export const DicomJsonConfig$DicomJsonConfig$1 = (value) => value.pretty_print;

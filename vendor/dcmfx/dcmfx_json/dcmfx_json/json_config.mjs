/// <reference types="./json_config.d.mts" />
import { CustomType as $CustomType } from "../gleam.mjs";

export class DicomJsonConfig extends $CustomType {
  constructor(store_encapsulated_pixel_data, pretty_print) {
    super();
    this.store_encapsulated_pixel_data = store_encapsulated_pixel_data;
    this.pretty_print = pretty_print;
  }
}

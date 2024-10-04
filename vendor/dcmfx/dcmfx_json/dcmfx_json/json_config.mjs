/// <reference types="./json_config.d.mts" />
import { CustomType as $CustomType } from "../gleam.mjs";

export class DicomJsonConfig extends $CustomType {
  constructor(store_encapsulated_pixel_data) {
    super();
    this.store_encapsulated_pixel_data = store_encapsulated_pixel_data;
  }
}

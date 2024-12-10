import type * as _ from "../gleam.d.mts";

export class DicomJsonConfig extends _.CustomType {
  constructor(store_encapsulated_pixel_data: boolean, pretty_print: boolean);
  
  store_encapsulated_pixel_data: boolean;
  pretty_print: boolean;
}

export type DicomJsonConfig$ = DicomJsonConfig;

import type * as _ from "../gleam.d.mts";

export class DicomJsonConfig extends _.CustomType {
  /** @deprecated */
  constructor(store_encapsulated_pixel_data: boolean, pretty_print: boolean);
  /** @deprecated */
  store_encapsulated_pixel_data: boolean;
  /** @deprecated */
  pretty_print: boolean;
}
export function DicomJsonConfig$DicomJsonConfig(
  store_encapsulated_pixel_data: boolean,
  pretty_print: boolean,
): DicomJsonConfig$;
export function DicomJsonConfig$isDicomJsonConfig(
  value: DicomJsonConfig$,
): boolean;
export function DicomJsonConfig$DicomJsonConfig$0(value: DicomJsonConfig$): boolean;
export function DicomJsonConfig$DicomJsonConfig$store_encapsulated_pixel_data(
  value: DicomJsonConfig$,
): boolean;
export function DicomJsonConfig$DicomJsonConfig$1(value: DicomJsonConfig$): boolean;
export function DicomJsonConfig$DicomJsonConfig$pretty_print(
  value: DicomJsonConfig$,
): boolean;

export type DicomJsonConfig$ = DicomJsonConfig;

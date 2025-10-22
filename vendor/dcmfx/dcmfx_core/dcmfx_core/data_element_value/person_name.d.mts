import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_error from "../../dcmfx_core/data_error.d.mts";
import type * as _ from "../../gleam.d.mts";

export class PersonNameComponents extends _.CustomType {
  /** @deprecated */
  constructor(
    last_name: string,
    first_name: string,
    middle_name: string,
    prefix: string,
    suffix: string
  );
  /** @deprecated */
  last_name: string;
  /** @deprecated */
  first_name: string;
  /** @deprecated */
  middle_name: string;
  /** @deprecated */
  prefix: string;
  /** @deprecated */
  suffix: string;
}
export function PersonNameComponents$PersonNameComponents(
  last_name: string,
  first_name: string,
  middle_name: string,
  prefix: string,
  suffix: string,
): PersonNameComponents$;
export function PersonNameComponents$isPersonNameComponents(
  value: PersonNameComponents$,
): boolean;
export function PersonNameComponents$PersonNameComponents$0(value: PersonNameComponents$): string;
export function PersonNameComponents$PersonNameComponents$last_name(
  value: PersonNameComponents$,
): string;
export function PersonNameComponents$PersonNameComponents$1(value: PersonNameComponents$): string;
export function PersonNameComponents$PersonNameComponents$first_name(
  value: PersonNameComponents$,
): string;
export function PersonNameComponents$PersonNameComponents$2(value: PersonNameComponents$): string;
export function PersonNameComponents$PersonNameComponents$middle_name(
  value: PersonNameComponents$,
): string;
export function PersonNameComponents$PersonNameComponents$3(value: PersonNameComponents$): string;
export function PersonNameComponents$PersonNameComponents$prefix(
  value: PersonNameComponents$,
): string;
export function PersonNameComponents$PersonNameComponents$4(value: PersonNameComponents$): string;
export function PersonNameComponents$PersonNameComponents$suffix(
  value: PersonNameComponents$,
): string;

export type PersonNameComponents$ = PersonNameComponents;

export class StructuredPersonName extends _.CustomType {
  /** @deprecated */
  constructor(
    alphabetic: $option.Option$<PersonNameComponents$>,
    ideographic: $option.Option$<PersonNameComponents$>,
    phonetic: $option.Option$<PersonNameComponents$>
  );
  /** @deprecated */
  alphabetic: $option.Option$<PersonNameComponents$>;
  /** @deprecated */
  ideographic: $option.Option$<PersonNameComponents$>;
  /** @deprecated */
  phonetic: $option.Option$<PersonNameComponents$>;
}
export function StructuredPersonName$StructuredPersonName(
  alphabetic: $option.Option$<PersonNameComponents$>,
  ideographic: $option.Option$<PersonNameComponents$>,
  phonetic: $option.Option$<PersonNameComponents$>,
): StructuredPersonName$;
export function StructuredPersonName$isStructuredPersonName(
  value: StructuredPersonName$,
): boolean;
export function StructuredPersonName$StructuredPersonName$0(value: StructuredPersonName$): $option.Option$<
  PersonNameComponents$
>;
export function StructuredPersonName$StructuredPersonName$alphabetic(value: StructuredPersonName$): $option.Option$<
  PersonNameComponents$
>;
export function StructuredPersonName$StructuredPersonName$1(value: StructuredPersonName$): $option.Option$<
  PersonNameComponents$
>;
export function StructuredPersonName$StructuredPersonName$ideographic(value: StructuredPersonName$): $option.Option$<
  PersonNameComponents$
>;
export function StructuredPersonName$StructuredPersonName$2(value: StructuredPersonName$): $option.Option$<
  PersonNameComponents$
>;
export function StructuredPersonName$StructuredPersonName$phonetic(value: StructuredPersonName$): $option.Option$<
  PersonNameComponents$
>;

export type StructuredPersonName$ = StructuredPersonName;

export function from_bytes(bytes: _.BitArray): _.Result<
  _.List<StructuredPersonName$>,
  $data_error.DataError$
>;

export function to_bytes(value: _.List<StructuredPersonName$>): _.Result<
  _.BitArray,
  $data_error.DataError$
>;

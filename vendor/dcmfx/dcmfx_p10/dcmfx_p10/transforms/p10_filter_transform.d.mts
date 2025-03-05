import type * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $p10_token from "../../dcmfx_p10/p10_token.d.mts";
import type * as _ from "../../gleam.d.mts";

declare class P10FilterTransform extends _.CustomType {
  constructor(
    predicate: (
      x0: $data_element_tag.DataElementTag$,
      x1: $value_representation.ValueRepresentation$,
      x2: _.List<LocationEntry$>
    ) => boolean,
    location: _.List<LocationEntry$>
  );
  
  predicate: (
    x0: $data_element_tag.DataElementTag$,
    x1: $value_representation.ValueRepresentation$,
    x2: _.List<LocationEntry$>
  ) => boolean;
  location: _.List<LocationEntry$>;
}

export type P10FilterTransform$ = P10FilterTransform;

export class LocationEntry extends _.CustomType {
  constructor(tag: $data_element_tag.DataElementTag$, filter_result: boolean);
  
  tag: $data_element_tag.DataElementTag$;
  filter_result: boolean;
}

export type LocationEntry$ = LocationEntry;

export function new$(
  predicate: (
    x0: $data_element_tag.DataElementTag$,
    x1: $value_representation.ValueRepresentation$,
    x2: _.List<LocationEntry$>
  ) => boolean
): P10FilterTransform$;

export function is_at_root(context: P10FilterTransform$): boolean;

export function add_token(
  context: P10FilterTransform$,
  token: $p10_token.P10Token$
): [boolean, P10FilterTransform$];

import type * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.d.mts";
import type * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.d.mts";
import type * as $value_representation from "../../dcmfx_core/dcmfx_core/value_representation.d.mts";
import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $p10_error from "../dcmfx_p10/p10_error.d.mts";
import type * as $p10_token from "../dcmfx_p10/p10_token.d.mts";
import type * as _ from "../gleam.d.mts";

declare class DataSetBuilder extends _.CustomType {
  constructor(
    file_preamble: $option.Option$<_.BitArray>,
    file_meta_information: $option.Option$<
      $dict.Dict$<
        $data_element_tag.DataElementTag$,
        $data_element_value.DataElementValue$
      >
    >,
    location: _.List<BuilderLocation$>,
    pending_data_element: $option.Option$<PendingDataElement$>,
    is_complete: boolean
  );
  
  file_preamble: $option.Option$<_.BitArray>;
  file_meta_information: $option.Option$<
    $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  >;
  location: _.List<BuilderLocation$>;
  pending_data_element: $option.Option$<PendingDataElement$>;
  is_complete: boolean;
}

export type DataSetBuilder$ = DataSetBuilder;

declare class RootDataSet extends _.CustomType {
  constructor(
    data_set: $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  );
  
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >;
}

declare class Sequence extends _.CustomType {
  constructor(
    tag: $data_element_tag.DataElementTag$,
    items: _.List<
      $dict.Dict$<
        $data_element_tag.DataElementTag$,
        $data_element_value.DataElementValue$
      >
    >
  );
  
  tag: $data_element_tag.DataElementTag$;
  items: _.List<
    $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  >;
}

declare class SequenceItem extends _.CustomType {
  constructor(
    data_set: $dict.Dict$<
      $data_element_tag.DataElementTag$,
      $data_element_value.DataElementValue$
    >
  );
  
  data_set: $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >;
}

declare class EncapsulatedPixelDataSequence extends _.CustomType {
  constructor(
    vr: $value_representation.ValueRepresentation$,
    items: _.List<_.BitArray>
  );
  
  vr: $value_representation.ValueRepresentation$;
  items: _.List<_.BitArray>;
}

declare type BuilderLocation$ = RootDataSet | Sequence | SequenceItem | EncapsulatedPixelDataSequence;

declare class PendingDataElement extends _.CustomType {
  constructor(
    tag: $data_element_tag.DataElementTag$,
    vr: $value_representation.ValueRepresentation$,
    data: _.List<_.BitArray>
  );
  
  tag: $data_element_tag.DataElementTag$;
  vr: $value_representation.ValueRepresentation$;
  data: _.List<_.BitArray>;
}

declare type PendingDataElement$ = PendingDataElement;

export function new$(): DataSetBuilder$;

export function is_complete(builder: DataSetBuilder$): boolean;

export function file_preamble(builder: DataSetBuilder$): _.Result<
  _.BitArray,
  undefined
>;

export function final_data_set(builder: DataSetBuilder$): _.Result<
  $dict.Dict$<
    $data_element_tag.DataElementTag$,
    $data_element_value.DataElementValue$
  >,
  undefined
>;

export function add_token(builder: DataSetBuilder$, token: $p10_token.P10Token$): _.Result<
  DataSetBuilder$,
  $p10_error.P10Error$
>;

export function force_end(builder: DataSetBuilder$): DataSetBuilder$;

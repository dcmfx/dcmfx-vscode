/// <reference types="./data_element_header.d.mts" />
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $dictionary from "../../../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $value_length from "../../dcmfx_p10/internal/value_length.mjs";
import { CustomType as $CustomType } from "../../gleam.mjs";

export class DataElementHeader extends $CustomType {
  constructor(tag, vr, length) {
    super();
    this.tag = tag;
    this.vr = vr;
    this.length = length;
  }
}

export class ValueLengthU16 extends $CustomType {}

export class ValueLengthU32 extends $CustomType {}

export function to_string(header) {
  let _block;
  let $ = header.vr;
  if ($ instanceof Some) {
    let vr = $[0];
    _block = $value_representation.to_string(vr);
  } else {
    _block = "  ";
  }
  let vr = _block;
  return ((($data_element_tag.to_string(header.tag) + " ") + vr) + " ") + $dictionary.tag_name(
    header.tag,
    new None(),
  );
}

export function value_length_size_max_length(size) {
  if (size instanceof ValueLengthU16) {
    return 0xFFFF;
  } else {
    return 0xFFFFFFFE;
  }
}

export function value_length_size(vr) {
  if (vr instanceof $value_representation.AgeString) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.ApplicationEntity) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.AttributeTag) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.CodeString) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.Date) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.DateTime) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.DecimalString) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.FloatingPointDouble) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.FloatingPointSingle) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.IntegerString) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.LongString) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.LongText) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.OtherByteString) {
    return new ValueLengthU32();
  } else if (vr instanceof $value_representation.OtherDoubleString) {
    return new ValueLengthU32();
  } else if (vr instanceof $value_representation.OtherFloatString) {
    return new ValueLengthU32();
  } else if (vr instanceof $value_representation.OtherLongString) {
    return new ValueLengthU32();
  } else if (vr instanceof $value_representation.OtherVeryLongString) {
    return new ValueLengthU32();
  } else if (vr instanceof $value_representation.OtherWordString) {
    return new ValueLengthU32();
  } else if (vr instanceof $value_representation.PersonName) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.Sequence) {
    return new ValueLengthU32();
  } else if (vr instanceof $value_representation.ShortString) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.ShortText) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.SignedLong) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.SignedShort) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.SignedVeryLong) {
    return new ValueLengthU32();
  } else if (vr instanceof $value_representation.Time) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.UniqueIdentifier) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.UniversalResourceIdentifier) {
    return new ValueLengthU32();
  } else if (vr instanceof $value_representation.Unknown) {
    return new ValueLengthU32();
  } else if (vr instanceof $value_representation.UnlimitedCharacters) {
    return new ValueLengthU32();
  } else if (vr instanceof $value_representation.UnlimitedText) {
    return new ValueLengthU32();
  } else if (vr instanceof $value_representation.UnsignedLong) {
    return new ValueLengthU16();
  } else if (vr instanceof $value_representation.UnsignedShort) {
    return new ValueLengthU16();
  } else {
    return new ValueLengthU32();
  }
}

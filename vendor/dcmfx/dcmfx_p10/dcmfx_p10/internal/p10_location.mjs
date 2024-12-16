/// <reference types="./p10_location.d.mts" />
import * as $dcmfx_character_set from "../../../dcmfx_character_set/dcmfx_character_set.mjs";
import * as $string_type from "../../../dcmfx_character_set/dcmfx_character_set/string_type.mjs";
import * as $data_element_tag from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import { DataElementTag } from "../../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $dictionary from "../../../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $utils from "../../../dcmfx_core/dcmfx_core/internal/utils.mjs";
import * as $value_representation from "../../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../../gleam_stdlib/gleam/bool.mjs";
import * as $dict from "../../../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $value_length from "../../dcmfx_p10/internal/value_length.mjs";
import * as $p10_error from "../../dcmfx_p10/p10_error.mjs";
import * as $p10_part from "../../dcmfx_p10/p10_part.mjs";
import {
  Ok,
  Error,
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
  toBitArray,
  stringBits,
} from "../../gleam.mjs";

class RootDataSet extends $CustomType {
  constructor(clarifying_data_elements) {
    super();
    this.clarifying_data_elements = clarifying_data_elements;
  }
}

class Sequence extends $CustomType {
  constructor(is_implicit_vr, ends_at, item_count) {
    super();
    this.is_implicit_vr = is_implicit_vr;
    this.ends_at = ends_at;
    this.item_count = item_count;
  }
}

class Item extends $CustomType {
  constructor(clarifying_data_elements, ends_at) {
    super();
    this.clarifying_data_elements = clarifying_data_elements;
    this.ends_at = ends_at;
  }
}

class ClarifyingDataElements extends $CustomType {
  constructor(specific_character_set, bits_allocated, pixel_representation, waveform_bits_stored, waveform_bits_allocated, private_creators) {
    super();
    this.specific_character_set = specific_character_set;
    this.bits_allocated = bits_allocated;
    this.pixel_representation = pixel_representation;
    this.waveform_bits_stored = waveform_bits_stored;
    this.waveform_bits_allocated = waveform_bits_allocated;
    this.private_creators = private_creators;
  }
}

export function is_clarifying_data_element(tag) {
  return (((((isEqual(tag, $dictionary.specific_character_set.tag)) || (isEqual(
    tag,
    $dictionary.bits_allocated.tag
  ))) || (isEqual(tag, $dictionary.pixel_representation.tag))) || (isEqual(
    tag,
    $dictionary.waveform_bits_stored.tag
  ))) || (isEqual(tag, $dictionary.waveform_bits_allocated.tag))) || $data_element_tag.is_private_creator(
    tag,
  );
}

function private_creator_for_tag(clarifying_data_elements, tag) {
  return $bool.guard(
    !$data_element_tag.is_private(tag),
    new None(),
    () => {
      let private_creator_tag = new DataElementTag(
        tag.group,
        $int.bitwise_shift_right(tag.element, 8),
      );
      let _pipe = clarifying_data_elements.private_creators;
      let _pipe$1 = $dict.get(_pipe, private_creator_tag);
      let _pipe$2 = $result.map(_pipe$1, (var0) => { return new Some(var0); });
      return $result.unwrap(_pipe$2, new None());
    },
  );
}

function default_clarifying_data_elements() {
  let $ = $dcmfx_character_set.from_string("ISO_IR 100");
  if (!$.isOk()) {
    throw makeError(
      "let_assert",
      "dcmfx_p10/internal/p10_location",
      113,
      "default_clarifying_data_elements",
      "Pattern match failed, no pattern matched the value.",
      { value: $ }
    )
  }
  let charset = $[0];
  return new ClarifyingDataElements(
    charset,
    new None(),
    new None(),
    new None(),
    new None(),
    $dict.new$(),
  );
}

export function new$() {
  return toList([new RootDataSet(default_clarifying_data_elements())]);
}

export function is_implicit_vr_forced(loop$location) {
  while (true) {
    let location = loop$location;
    if (location.atLeastLength(1) &&
    location.head instanceof Sequence &&
    location.head.is_implicit_vr) {
      return true;
    } else if (location.atLeastLength(1)) {
      let rest = location.tail;
      loop$location = rest;
    } else {
      return false;
    }
  }
}

export function next_delimiter_part(location, bytes_read) {
  if (location.atLeastLength(1) &&
  location.head instanceof Sequence &&
  location.head.ends_at instanceof Some &&
  (location.head.ends_at[0] <= bytes_read)) {
    let ends_at = location.head.ends_at[0];
    let rest = location.tail;
    return new Ok([new $p10_part.SequenceDelimiter(), rest]);
  } else if (location.atLeastLength(1) &&
  location.head instanceof Item &&
  location.head.ends_at instanceof Some &&
  (location.head.ends_at[0] <= bytes_read)) {
    let ends_at = location.head.ends_at[0];
    let rest = location.tail;
    return new Ok([new $p10_part.SequenceItemDelimiter(), rest]);
  } else {
    return new Error(undefined);
  }
}

export function pending_delimiter_parts(location) {
  if (location.atLeastLength(1) && location.head instanceof Sequence) {
    let rest = location.tail;
    return listPrepend(
      new $p10_part.SequenceDelimiter(),
      pending_delimiter_parts(rest),
    );
  } else if (location.atLeastLength(1) && location.head instanceof Item) {
    let rest = location.tail;
    return listPrepend(
      new $p10_part.SequenceItemDelimiter(),
      pending_delimiter_parts(rest),
    );
  } else {
    return toList([new $p10_part.End()]);
  }
}

export function end_sequence(location) {
  if (location.atLeastLength(1) && location.head instanceof Sequence) {
    let rest = location.tail;
    return new Ok(rest);
  } else {
    return new Error("Sequence delimiter encountered outside of a sequence");
  }
}

export function sequence_item_count(location) {
  if (location.atLeastLength(1) && location.head instanceof Sequence) {
    let item_count = location.head.item_count;
    return new Ok(item_count);
  } else {
    return new Error(undefined);
  }
}

export function end_item(location) {
  if (location.atLeastLength(1) && location.head instanceof Item) {
    let rest = location.tail;
    return new Ok(rest);
  } else {
    return new Error("Item delimiter encountered outside of an item");
  }
}

function active_clarifying_data_elements(loop$location) {
  while (true) {
    let location = loop$location;
    if (location.atLeastLength(1) && location.head instanceof RootDataSet) {
      let clarifying_data_elements = location.head.clarifying_data_elements;
      return clarifying_data_elements;
    } else if (location.atLeastLength(1) && location.head instanceof Item) {
      let clarifying_data_elements = location.head.clarifying_data_elements;
      return clarifying_data_elements;
    } else if (location.atLeastLength(1)) {
      let rest = location.tail;
      loop$location = rest;
    } else {
      throw makeError(
        "panic",
        "dcmfx_p10/internal/p10_location",
        271,
        "active_clarifying_data_elements",
        "P10 location does not contain the root data set",
        {}
      )
    }
  }
}

export function add_sequence(location, tag, is_implicit_vr, ends_at) {
  if (location.hasLength(1) && location.head instanceof RootDataSet) {
    return new Ok(
      listPrepend(new Sequence(is_implicit_vr, ends_at, 0), location),
    );
  } else if (location.atLeastLength(1) && location.head instanceof Item) {
    return new Ok(
      listPrepend(new Sequence(is_implicit_vr, ends_at, 0), location),
    );
  } else {
    let private_creator = private_creator_for_tag(
      active_clarifying_data_elements(location),
      tag,
    );
    return new Error(
      ("Sequence data element '" + $dictionary.tag_with_name(
        tag,
        private_creator,
      )) + "' encountered outside of the root data set or an item",
    );
  }
}

export function add_item(location, ends_at, length) {
  if (location.atLeastLength(1) && location.head instanceof Sequence) {
    let is_implicit_vr = location.head.is_implicit_vr;
    let sequence_ends_at = location.head.ends_at;
    let item_count = location.head.item_count;
    let rest = location.tail;
    return new Ok(
      listPrepend(
        new Item(active_clarifying_data_elements(location), ends_at),
        listPrepend(
          new Sequence(is_implicit_vr, sequence_ends_at, item_count + 1),
          rest,
        ),
      ),
    );
  } else {
    return new Error(
      ("Item encountered outside of a sequence, length: " + $value_length.to_string(
        length,
      )) + " bytes",
    );
  }
}

function map_clarifying_data_elements(location, map_fn) {
  if (location.atLeastLength(1) && location.head instanceof RootDataSet) {
    let clarifying_data_elements = location.head.clarifying_data_elements;
    let rest = location.tail;
    return listPrepend(new RootDataSet(map_fn(clarifying_data_elements)), rest);
  } else if (location.atLeastLength(1) && location.head instanceof Item) {
    let clarifying_data_elements = location.head.clarifying_data_elements;
    let ends_at = location.head.ends_at;
    let rest = location.tail;
    return listPrepend(
      new Item(map_fn(clarifying_data_elements), ends_at),
      rest,
    );
  } else {
    return location;
  }
}

function update_specific_character_set_clarifying_data_element(
  location,
  value_bytes
) {
  let specific_character_set = (() => {
    let _pipe = value_bytes;
    let _pipe$1 = $bit_array.to_string(_pipe);
    return $result.map_error(
      _pipe$1,
      (_) => {
        return new $p10_error.SpecificCharacterSetInvalid(
          $utils.inspect_bit_array(value_bytes, 64),
          "Invalid UTF-8",
        );
      },
    );
  })();
  return $result.try$(
    specific_character_set,
    (specific_character_set) => {
      let charset = (() => {
        let _pipe = specific_character_set;
        let _pipe$1 = $dcmfx_character_set.from_string(_pipe);
        return $result.map_error(
          _pipe$1,
          (error) => {
            return new $p10_error.SpecificCharacterSetInvalid(
              specific_character_set,
              error,
            );
          },
        );
      })();
      return $result.try$(
        charset,
        (charset) => {
          let new_location = map_clarifying_data_elements(
            location,
            (clarifying_data_elements) => {
              return clarifying_data_elements.withFields({
                specific_character_set: charset
              });
            },
          );
          return new Ok([toBitArray([stringBits("ISO_IR 192")]), new_location]);
        },
      );
    },
  );
}

function update_unsigned_short_clarifying_data_element(location, tag, value) {
  if (isEqual(tag, $dictionary.bits_allocated.tag)) {
    let tag$1 = tag;
    let _pipe = location;
    return map_clarifying_data_elements(
      _pipe,
      (clarifying_data_elements) => {
        return clarifying_data_elements.withFields({
          bits_allocated: new Some(value)
        });
      },
    );
  } else if (isEqual(tag, $dictionary.pixel_representation.tag)) {
    let tag$1 = tag;
    let _pipe = location;
    return map_clarifying_data_elements(
      _pipe,
      (clarifying_data_elements) => {
        return clarifying_data_elements.withFields({
          pixel_representation: new Some(value)
        });
      },
    );
  } else if (isEqual(tag, $dictionary.waveform_bits_stored.tag)) {
    let tag$1 = tag;
    let _pipe = location;
    return map_clarifying_data_elements(
      _pipe,
      (clarifying_data_elements) => {
        return clarifying_data_elements.withFields({
          waveform_bits_stored: new Some(value)
        });
      },
    );
  } else if (isEqual(tag, $dictionary.waveform_bits_allocated.tag)) {
    let tag$1 = tag;
    let _pipe = location;
    return map_clarifying_data_elements(
      _pipe,
      (clarifying_data_elements) => {
        return clarifying_data_elements.withFields({
          waveform_bits_allocated: new Some(value)
        });
      },
    );
  } else {
    return location;
  }
}

function update_private_creator_clarifying_data_element(
  location,
  value_bytes,
  tag
) {
  let location$1 = (() => {
    let $ = $bit_array.to_string(value_bytes);
    if ($.isOk()) {
      let private_creator = $[0];
      let private_creator$1 = (() => {
        let _pipe = private_creator;
        return $utils.trim_ascii_end(_pipe, 0x20);
      })();
      let _pipe = location;
      return map_clarifying_data_elements(
        _pipe,
        (clarifying_data_elements) => {
          return clarifying_data_elements.withFields({
            private_creators: $dict.insert(
              clarifying_data_elements.private_creators,
              tag,
              private_creator$1,
            )
          });
        },
      );
    } else {
      return location;
    }
  })();
  return [value_bytes, location$1];
}

export function add_clarifying_data_element(location, tag, vr, value_bytes) {
  if (isEqual(tag, $dictionary.specific_character_set.tag)) {
    let tag$1 = tag;
    return update_specific_character_set_clarifying_data_element(
      location,
      value_bytes,
    );
  } else if (vr instanceof $value_representation.UnsignedShort &&
  value_bytes.length == 2) {
    let value = value_bytes.intFromSlice(0, 2, false, false);
    let location$1 = update_unsigned_short_clarifying_data_element(
      location,
      tag,
      value,
    );
    return new Ok([value_bytes, location$1]);
  } else if (vr instanceof $value_representation.LongString) {
    return $bool.guard(
      !$data_element_tag.is_private_creator(tag),
      new Ok([value_bytes, location]),
      () => {
        let _pipe = update_private_creator_clarifying_data_element(
          location,
          value_bytes,
          tag,
        );
        return new Ok(_pipe);
      },
    );
  } else {
    return new Ok([value_bytes, location]);
  }
}

export function is_specific_character_set_utf8_compatible(location) {
  return $dcmfx_character_set.is_utf8_compatible(
    active_clarifying_data_elements(location).specific_character_set,
  );
}

export function decode_string_bytes(location, vr, value_bytes) {
  let charset = active_clarifying_data_elements(location).specific_character_set;
  let string_type = (() => {
    if (vr instanceof $value_representation.PersonName) {
      return new $string_type.PersonName();
    } else if (vr instanceof $value_representation.LongString) {
      return new $string_type.MultiValue();
    } else if (vr instanceof $value_representation.ShortString) {
      return new $string_type.MultiValue();
    } else if (vr instanceof $value_representation.UnlimitedCharacters) {
      return new $string_type.MultiValue();
    } else {
      return new $string_type.SingleValue();
    }
  })();
  let _pipe = charset;
  let _pipe$1 = $dcmfx_character_set.decode_bytes(
    _pipe,
    value_bytes,
    string_type,
  );
  let _pipe$2 = $bit_array.from_string(_pipe$1);
  return ((_capture) => {
    return $value_representation.pad_bytes_to_even_length(vr, _capture);
  })(_pipe$2);
}

export function infer_vr_for_tag(location, tag) {
  let clarifying_data_elements = active_clarifying_data_elements(location);
  let private_creator = private_creator_for_tag(clarifying_data_elements, tag);
  let allowed_vrs = (() => {
    let $ = $dictionary.find(tag, private_creator);
    if ($.isOk() && $[0] instanceof $dictionary.Item) {
      let vrs = $[0].vrs;
      return vrs;
    } else {
      return toList([]);
    }
  })();
  if (allowed_vrs.hasLength(1)) {
    let vr = allowed_vrs.head;
    return vr;
  } else if (allowed_vrs.hasLength(2) &&
  allowed_vrs.head instanceof $value_representation.OtherByteString &&
  allowed_vrs.tail.head instanceof $value_representation.OtherWordString &&
  (isEqual(tag, $dictionary.pixel_data.tag))) {
    return new $value_representation.OtherWordString();
  } else if (allowed_vrs.hasLength(2) &&
  allowed_vrs.head instanceof $value_representation.UnsignedShort &&
  allowed_vrs.tail.head instanceof $value_representation.SignedShort &&
  ((((((((((((((((((((isEqual(tag, $dictionary.zero_velocity_pixel_value.tag)) || (isEqual(
    tag,
    $dictionary.mapped_pixel_value.tag
  ))) || (isEqual(tag, $dictionary.smallest_valid_pixel_value.tag))) || (isEqual(
    tag,
    $dictionary.largest_valid_pixel_value.tag
  ))) || (isEqual(tag, $dictionary.smallest_image_pixel_value.tag))) || (isEqual(
    tag,
    $dictionary.largest_image_pixel_value.tag
  ))) || (isEqual(tag, $dictionary.smallest_pixel_value_in_series.tag))) || (isEqual(
    tag,
    $dictionary.largest_pixel_value_in_series.tag
  ))) || (isEqual(tag, $dictionary.smallest_image_pixel_value_in_plane.tag))) || (isEqual(
    tag,
    $dictionary.largest_image_pixel_value_in_plane.tag
  ))) || (isEqual(tag, $dictionary.pixel_padding_value.tag))) || (isEqual(
    tag,
    $dictionary.pixel_padding_range_limit.tag
  ))) || (isEqual(
    tag,
    $dictionary.red_palette_color_lookup_table_descriptor.tag
  ))) || (isEqual(
    tag,
    $dictionary.green_palette_color_lookup_table_descriptor.tag
  ))) || (isEqual(
    tag,
    $dictionary.blue_palette_color_lookup_table_descriptor.tag
  ))) || (isEqual(tag, $dictionary.lut_descriptor.tag))) || (isEqual(
    tag,
    $dictionary.real_world_value_last_value_mapped.tag
  ))) || (isEqual(tag, $dictionary.real_world_value_first_value_mapped.tag))) || (isEqual(
    tag,
    $dictionary.histogram_first_bin_value.tag
  ))) || (isEqual(tag, $dictionary.histogram_last_bin_value.tag)))) {
    let $ = clarifying_data_elements.pixel_representation;
    if ($ instanceof Some && $[0] === 1) {
      return new $value_representation.SignedShort();
    } else {
      return new $value_representation.UnsignedShort();
    }
  } else if (allowed_vrs.hasLength(2) &&
  allowed_vrs.head instanceof $value_representation.OtherByteString &&
  allowed_vrs.tail.head instanceof $value_representation.OtherWordString &&
  ((isEqual(tag, $dictionary.channel_minimum_value.tag)) || (isEqual(
    tag,
    $dictionary.channel_maximum_value.tag
  )))) {
    let $ = clarifying_data_elements.waveform_bits_stored;
    if ($ instanceof Some && $[0] === 16) {
      return new $value_representation.OtherWordString();
    } else if ($ instanceof Some) {
      return new $value_representation.OtherByteString();
    } else {
      return new $value_representation.Unknown();
    }
  } else if (allowed_vrs.hasLength(2) &&
  allowed_vrs.head instanceof $value_representation.OtherByteString &&
  allowed_vrs.tail.head instanceof $value_representation.OtherWordString &&
  ((isEqual(tag, $dictionary.waveform_padding_value.tag)) || (isEqual(
    tag,
    $dictionary.waveform_data.tag
  )))) {
    let $ = clarifying_data_elements.waveform_bits_allocated;
    if ($ instanceof Some && $[0] === 16) {
      return new $value_representation.OtherWordString();
    } else if ($ instanceof Some) {
      return new $value_representation.OtherByteString();
    } else {
      return new $value_representation.Unknown();
    }
  } else if (allowed_vrs.hasLength(2) &&
  allowed_vrs.head instanceof $value_representation.UnsignedShort &&
  allowed_vrs.tail.head instanceof $value_representation.OtherWordString &&
  (isEqual(tag, $dictionary.lut_data.tag))) {
    return new $value_representation.OtherWordString();
  } else if (allowed_vrs.hasLength(2) &&
  allowed_vrs.head instanceof $value_representation.OtherByteString &&
  allowed_vrs.tail.head instanceof $value_representation.OtherWordString &&
  (((tag.group >= 0x6000) && (tag.group <= 0x60FF)) && (tag.element === 0x3000))) {
    return new $value_representation.OtherWordString();
  } else {
    return new $value_representation.Unknown();
  }
}

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
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $value_length from "../../dcmfx_p10/internal/value_length.mjs";
import * as $p10_error from "../../dcmfx_p10/p10_error.mjs";
import * as $p10_token from "../../dcmfx_p10/p10_token.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
  toBitArray,
  bitArraySliceToInt,
  stringBits,
} from "../../gleam.mjs";

const FILEPATH = "src/dcmfx_p10/internal/p10_location.gleam";

class RootDataSet extends $CustomType {
  constructor(clarifying_data_elements, last_data_element_tag) {
    super();
    this.clarifying_data_elements = clarifying_data_elements;
    this.last_data_element_tag = last_data_element_tag;
  }
}

class Sequence extends $CustomType {
  constructor(tag, is_implicit_vr, ends_at, item_count) {
    super();
    this.tag = tag;
    this.is_implicit_vr = is_implicit_vr;
    this.ends_at = ends_at;
    this.item_count = item_count;
  }
}

class Item extends $CustomType {
  constructor(clarifying_data_elements, last_data_element_tag, ends_at) {
    super();
    this.clarifying_data_elements = clarifying_data_elements;
    this.last_data_element_tag = last_data_element_tag;
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

/**
 * Returns whether a data element tag is for a clarifying data element that
 * needs to be materialized by the read process and added to the location.
 */
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

/**
 * Returns the default/initial value for the clarifying data elements.
 * 
 * @ignore
 */
function default_clarifying_data_elements() {
  let $ = $dcmfx_character_set.from_string("ISO_IR 6");
  let charset;
  if ($ instanceof Ok) {
    charset = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "dcmfx_p10/internal/p10_location",
      115,
      "default_clarifying_data_elements",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4229,
        end: 4297,
        pattern_start: 4240,
        pattern_end: 4251
      }
    )
  }
  return new ClarifyingDataElements(
    charset,
    new None(),
    new None(),
    new None(),
    new None(),
    $dict.new$(),
  );
}

/**
 * Creates a new P10 location with an initial entry for the root data set.
 */
export function new$() {
  return toList([
    new RootDataSet(default_clarifying_data_elements(), $data_element_tag.zero),
  ]);
}

/**
 * Checks that the specified data element tag is greater than the previous one
 * at the current P10 location. In DICOM P10 data, data elements in a data set
 * and sequence item must appear in ascending order.
 *
 * This is important to enforce when reading DICOM P10 data in a streaming
 * fashion because lower numbered data elements are sometimes used in the
 * interpretation of higher numbered data elements.
 */
export function check_data_element_ordering(location, tag) {
  let is_tag_ordering_valid = (last_data_element_tag) => {
    return $data_element_tag.to_int(tag) > $data_element_tag.to_int(
      last_data_element_tag,
    );
  };
  if (location instanceof $Empty) {
    return new Error(undefined);
  } else {
    let $ = location.head;
    if ($ instanceof RootDataSet) {
      let rest = location.tail;
      let clarifying_data_elements = $.clarifying_data_elements;
      let last_data_element_tag = $.last_data_element_tag;
      let $1 = is_tag_ordering_valid(last_data_element_tag);
      if ($1) {
        return new Ok(
          listPrepend(new RootDataSet(clarifying_data_elements, tag), rest),
        );
      } else {
        return new Error(undefined);
      }
    } else if ($ instanceof Sequence) {
      return new Ok(location);
    } else {
      let rest = location.tail;
      let clarifying_data_elements = $.clarifying_data_elements;
      let last_data_element_tag = $.last_data_element_tag;
      let ends_at = $.ends_at;
      let $1 = is_tag_ordering_valid(last_data_element_tag);
      if ($1) {
        return new Ok(
          listPrepend(new Item(clarifying_data_elements, tag, ends_at), rest),
        );
      } else {
        return new Error(undefined);
      }
    }
  }
}

/**
 * Returns whether there is a sequence in the location that has forced the use
 * of the 'Implicit VR Little Endian' transfer syntax. This occurs when there
 * is an explicit VR of `UN` (Unknown) that has an undefined length.
 *
 * Ref: DICOM Correction Proposal CP-246.
 */
export function is_implicit_vr_forced(loop$location) {
  while (true) {
    let location = loop$location;
    if (location instanceof $Empty) {
      return false;
    } else {
      let $ = location.head;
      if ($ instanceof Sequence) {
        let $1 = $.is_implicit_vr;
        if ($1) {
          return true;
        } else {
          let rest = location.tail;
          loop$location = rest;
        }
      } else {
        let rest = location.tail;
        loop$location = rest;
      }
    }
  }
}

/**
 * Returns the next delimiter token for a location. This checks the `ends_at`
 * value of the entry at the head of the location to see if the bytes read has
 * met or exceeded it, and if it has then the relevant delimiter token is
 * returned.
 *
 * This is part of the conversion of defined-length sequences and items to use
 * undefined lengths.
 */
export function next_delimiter_token(location, bytes_read) {
  if (location instanceof $Empty) {
    return new Error(undefined);
  } else {
    let $ = location.head;
    if ($ instanceof Sequence) {
      let $1 = $.ends_at;
      if ($1 instanceof Some) {
        let ends_at = $1[0];
        if (ends_at <= bytes_read) {
          let rest = location.tail;
          let tag = $.tag;
          return new Ok([new $p10_token.SequenceDelimiter(tag), rest]);
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else if ($ instanceof Item) {
      let $1 = $.ends_at;
      if ($1 instanceof Some) {
        let ends_at = $1[0];
        if (ends_at <= bytes_read) {
          let rest = location.tail;
          return new Ok([new $p10_token.SequenceItemDelimiter(), rest]);
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else {
      return new Error(undefined);
    }
  }
}

/**
 * Returns all pending delimiter tokens for a location, regardless of whether
 * their `ends_at` offset has been reached.
 */
export function pending_delimiter_tokens(location) {
  if (location instanceof $Empty) {
    return toList([new $p10_token.End()]);
  } else {
    let $ = location.head;
    if ($ instanceof Sequence) {
      let rest = location.tail;
      let tag = $.tag;
      return listPrepend(
        new $p10_token.SequenceDelimiter(tag),
        pending_delimiter_tokens(rest),
      );
    } else if ($ instanceof Item) {
      let rest = location.tail;
      return listPrepend(
        new $p10_token.SequenceItemDelimiter(),
        pending_delimiter_tokens(rest),
      );
    } else {
      return toList([new $p10_token.End()]);
    }
  }
}

/**
 * Ends the current sequence for a P10 location.
 */
export function end_sequence(location) {
  if (location instanceof $Empty) {
    return new Error("Sequence delimiter encountered outside of a sequence");
  } else {
    let $ = location.head;
    if ($ instanceof Sequence) {
      let rest = location.tail;
      let tag = $.tag;
      return new Ok([tag, rest]);
    } else {
      return new Error("Sequence delimiter encountered outside of a sequence");
    }
  }
}

/**
 * Returns the number of items that have been added to the current sequence.
 */
export function sequence_item_count(location) {
  if (location instanceof $Empty) {
    return new Error(undefined);
  } else {
    let $ = location.head;
    if ($ instanceof Sequence) {
      let item_count = $.item_count;
      return new Ok(item_count);
    } else {
      return new Error(undefined);
    }
  }
}

/**
 * Ends the current item for a P10 location.
 */
export function end_item(location) {
  if (location instanceof $Empty) {
    return new Error("Item delimiter encountered outside of an item");
  } else {
    let $ = location.head;
    if ($ instanceof Item) {
      let rest = location.tail;
      return new Ok(rest);
    } else {
      return new Error("Item delimiter encountered outside of an item");
    }
  }
}

/**
 * Returns the clarifying data elements that apply to new data elements.
 * 
 * @ignore
 */
function active_clarifying_data_elements(loop$location) {
  while (true) {
    let location = loop$location;
    if (location instanceof $Empty) {
      throw makeError(
        "panic",
        FILEPATH,
        "dcmfx_p10/internal/p10_location",
        362,
        "active_clarifying_data_elements",
        "P10 location does not contain the root data set",
        {}
      )
    } else {
      let $ = location.head;
      if ($ instanceof RootDataSet) {
        let clarifying_data_elements = $.clarifying_data_elements;
        return clarifying_data_elements;
      } else if ($ instanceof Item) {
        let clarifying_data_elements = $.clarifying_data_elements;
        return clarifying_data_elements;
      } else {
        let rest = location.tail;
        loop$location = rest;
      }
    }
  }
}

/**
 * Returns the value of *'(0x0028,0x0100) Bits Allocated'* if present.
 */
export function bits_allocated(location) {
  return active_clarifying_data_elements(location).bits_allocated;
}

/**
 * Swaps endianness of the value bytes for a given data element tag and VR.
 *
 * This function handles the unusual behavior of pixel data and waveform data
 * that has a VR of OW but a bits allocated value of 32 or 64. This is a
 * special case for endian swapping because it is actually storing 32/64-bit
 * words, not the 16-bit ones indicated by the VR.
 */
export function swap_endianness(location, tag, vr, data) {
  let _block;
  if (vr instanceof $value_representation.OtherWordString) {
    let _block$1;
    let tag$1 = tag;
    if (isEqual(tag$1, $dictionary.pixel_data.tag)) {
      _block$1 = active_clarifying_data_elements(location).bits_allocated;
    } else {
      let tag$2 = tag;
      if (isEqual(tag$2, $dictionary.waveform_data.tag)) {
        _block$1 = active_clarifying_data_elements(location).waveform_bits_allocated;
      } else {
        _block$1 = new None();
      }
    }
    let bits_allocated$1 = _block$1;
    if (bits_allocated$1 instanceof Some) {
      let $ = bits_allocated$1[0];
      if ($ === 32) {
        _block = new $value_representation.UnsignedLong();
      } else if ($ === 64) {
        _block = new $value_representation.UnsignedVeryLong();
      } else {
        _block = vr;
      }
    } else {
      _block = vr;
    }
  } else {
    _block = vr;
  }
  let vr$1 = _block;
  return $value_representation.swap_endianness(vr$1, data);
}

/**
 * Adds a new sequence to a P10 location.
 */
export function add_sequence(location, tag, is_implicit_vr, ends_at) {
  if (location instanceof $Empty) {
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
  } else {
    let $ = location.head;
    if ($ instanceof RootDataSet) {
      let $1 = location.tail;
      if ($1 instanceof $Empty) {
        return new Ok(
          listPrepend(new Sequence(tag, is_implicit_vr, ends_at, 0), location),
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
    } else if ($ instanceof Item) {
      return new Ok(
        listPrepend(new Sequence(tag, is_implicit_vr, ends_at, 0), location),
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
}

/**
 * Adds a new item to a P10 location.
 */
export function add_item(location, ends_at, length) {
  if (location instanceof $Empty) {
    return new Error(
      "Item encountered outside of a sequence, length: " + $value_length.to_string(
        length,
      ),
    );
  } else {
    let $ = location.head;
    if ($ instanceof Sequence) {
      let rest = location.tail;
      let tag = $.tag;
      let is_implicit_vr = $.is_implicit_vr;
      let sequence_ends_at = $.ends_at;
      let item_count = $.item_count;
      let entries = listPrepend(
        new Item(
          active_clarifying_data_elements(location),
          $data_element_tag.zero,
          ends_at,
        ),
        listPrepend(
          new Sequence(tag, is_implicit_vr, sequence_ends_at, item_count + 1),
          rest,
        ),
      );
      return new Ok([item_count, entries]);
    } else {
      return new Error(
        "Item encountered outside of a sequence, length: " + $value_length.to_string(
          length,
        ),
      );
    }
  }
}

function map_clarifying_data_elements(location, map_fn) {
  if (location instanceof $Empty) {
    return location;
  } else {
    let $ = location.head;
    if ($ instanceof RootDataSet) {
      let rest = location.tail;
      let clarifying_data_elements = $.clarifying_data_elements;
      let last_data_element_tag = $.last_data_element_tag;
      return listPrepend(
        new RootDataSet(map_fn(clarifying_data_elements), last_data_element_tag),
        rest,
      );
    } else if ($ instanceof Item) {
      let rest = location.tail;
      let clarifying_data_elements = $.clarifying_data_elements;
      let last_data_element_tag = $.last_data_element_tag;
      let ends_at = $.ends_at;
      return listPrepend(
        new Item(
          map_fn(clarifying_data_elements),
          last_data_element_tag,
          ends_at,
        ),
        rest,
      );
    } else {
      return location;
    }
  }
}

function update_specific_character_set_clarifying_data_element(
  location,
  value_bytes
) {
  let _block;
  let _pipe = value_bytes;
  let _pipe$1 = $bit_array.to_string(_pipe);
  _block = $result.map_error(
    _pipe$1,
    (_) => {
      return new $p10_error.SpecificCharacterSetInvalid(
        $utils.inspect_bit_array(value_bytes, 64),
        "Invalid UTF-8",
      );
    },
  );
  let specific_character_set = _block;
  return $result.try$(
    specific_character_set,
    (specific_character_set) => {
      let _block$1;
      let _pipe$2 = specific_character_set;
      let _pipe$3 = $dcmfx_character_set.from_string(_pipe$2);
      _block$1 = $result.map_error(
        _pipe$3,
        (_) => {
          return new $p10_error.SpecificCharacterSetInvalid(
            $string.slice(specific_character_set, 0, 64),
            "",
          );
        },
      );
      let charset = _block$1;
      return $result.try$(
        charset,
        (charset) => {
          let new_location = map_clarifying_data_elements(
            location,
            (clarifying_data_elements) => {
              return new ClarifyingDataElements(
                charset,
                clarifying_data_elements.bits_allocated,
                clarifying_data_elements.pixel_representation,
                clarifying_data_elements.waveform_bits_stored,
                clarifying_data_elements.waveform_bits_allocated,
                clarifying_data_elements.private_creators,
              );
            },
          );
          return new Ok([toBitArray([stringBits("ISO_IR 192")]), new_location]);
        },
      );
    },
  );
}

function update_unsigned_short_clarifying_data_element(location, tag, value) {
  let tag$1 = tag;
  if (isEqual(tag$1, $dictionary.bits_allocated.tag)) {
    let _pipe = location;
    return map_clarifying_data_elements(
      _pipe,
      (clarifying_data_elements) => {
        return new ClarifyingDataElements(
          clarifying_data_elements.specific_character_set,
          new Some(value),
          clarifying_data_elements.pixel_representation,
          clarifying_data_elements.waveform_bits_stored,
          clarifying_data_elements.waveform_bits_allocated,
          clarifying_data_elements.private_creators,
        );
      },
    );
  } else {
    let tag$2 = tag;
    if (isEqual(tag$2, $dictionary.pixel_representation.tag)) {
      let _pipe = location;
      return map_clarifying_data_elements(
        _pipe,
        (clarifying_data_elements) => {
          return new ClarifyingDataElements(
            clarifying_data_elements.specific_character_set,
            clarifying_data_elements.bits_allocated,
            new Some(value),
            clarifying_data_elements.waveform_bits_stored,
            clarifying_data_elements.waveform_bits_allocated,
            clarifying_data_elements.private_creators,
          );
        },
      );
    } else {
      let tag$3 = tag;
      if (isEqual(tag$3, $dictionary.waveform_bits_stored.tag)) {
        let _pipe = location;
        return map_clarifying_data_elements(
          _pipe,
          (clarifying_data_elements) => {
            return new ClarifyingDataElements(
              clarifying_data_elements.specific_character_set,
              clarifying_data_elements.bits_allocated,
              clarifying_data_elements.pixel_representation,
              new Some(value),
              clarifying_data_elements.waveform_bits_allocated,
              clarifying_data_elements.private_creators,
            );
          },
        );
      } else {
        let tag$4 = tag;
        if (isEqual(tag$4, $dictionary.waveform_bits_allocated.tag)) {
          let _pipe = location;
          return map_clarifying_data_elements(
            _pipe,
            (clarifying_data_elements) => {
              return new ClarifyingDataElements(
                clarifying_data_elements.specific_character_set,
                clarifying_data_elements.bits_allocated,
                clarifying_data_elements.pixel_representation,
                clarifying_data_elements.waveform_bits_stored,
                new Some(value),
                clarifying_data_elements.private_creators,
              );
            },
          );
        } else {
          return location;
        }
      }
    }
  }
}

function update_private_creator_clarifying_data_element(
  location,
  value_bytes,
  tag
) {
  let _block;
  let $ = $bit_array.to_string(value_bytes);
  if ($ instanceof Ok) {
    let private_creator = $[0];
    let _block$1;
    let _pipe = private_creator;
    _block$1 = $utils.trim_ascii_end(_pipe, 0x20);
    let private_creator$1 = _block$1;
    let _pipe$1 = location;
    _block = map_clarifying_data_elements(
      _pipe$1,
      (clarifying_data_elements) => {
        return new ClarifyingDataElements(
          clarifying_data_elements.specific_character_set,
          clarifying_data_elements.bits_allocated,
          clarifying_data_elements.pixel_representation,
          clarifying_data_elements.waveform_bits_stored,
          clarifying_data_elements.waveform_bits_allocated,
          $dict.insert(
            clarifying_data_elements.private_creators,
            tag,
            private_creator$1,
          ),
        );
      },
    );
  } else {
    _block = location;
  }
  let location$1 = _block;
  return [value_bytes, location$1];
}

/**
 * Adds a clarifying data element to a location. The return value includes an
 * updated location and updated value bytes.
 *
 * The only time that the value bytes are altered is the *'(0008,0005)
 * SpecificCharacterSet'* data element.
 */
export function add_clarifying_data_element(location, tag, vr, value_bytes) {
  let tag$1 = tag;
  if (isEqual(tag$1, $dictionary.specific_character_set.tag)) {
    return update_specific_character_set_clarifying_data_element(
      location,
      value_bytes,
    );
  } else if (vr instanceof $value_representation.LongString) {
    return $bool.guard(
      !$data_element_tag.is_private_creator(tag$1),
      new Ok([value_bytes, location]),
      () => {
        let _pipe = update_private_creator_clarifying_data_element(
          location,
          value_bytes,
          tag$1,
        );
        return new Ok(_pipe);
      },
    );
  } else if (
    vr instanceof $value_representation.UnsignedShort &&
    value_bytes.bitSize === 16
  ) {
    let value = bitArraySliceToInt(value_bytes, 0, 16, false, false);
    let location$1 = update_unsigned_short_clarifying_data_element(
      location,
      tag$1,
      value,
    );
    return new Ok([value_bytes, location$1]);
  } else {
    return new Ok([value_bytes, location]);
  }
}

/**
 * Returns whether the current specific character set is byte compatible with
 * UTF-8.
 */
export function is_specific_character_set_utf8_compatible(location) {
  return $dcmfx_character_set.is_utf8_compatible(
    active_clarifying_data_elements(location).specific_character_set,
  );
}

/**
 * Decodes encoded string bytes using the currently active specific character
 * set and returns their UTF-8 bytes.
 */
export function decode_string_bytes(location, vr, value_bytes) {
  let charset = active_clarifying_data_elements(location).specific_character_set;
  let _block;
  if (vr instanceof $value_representation.LongString) {
    _block = new $string_type.MultiValue();
  } else if (vr instanceof $value_representation.PersonName) {
    _block = new $string_type.PersonName();
  } else if (vr instanceof $value_representation.ShortString) {
    _block = new $string_type.MultiValue();
  } else if (vr instanceof $value_representation.UnlimitedCharacters) {
    _block = new $string_type.MultiValue();
  } else {
    _block = new $string_type.SingleValue();
  }
  let string_type = _block;
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

/**
 * When reading a DICOM P10 that uses the 'Implicit VR Little Endian'
 * transfer syntax, returns the VR for the data element, or an error if it
 * can't be determined.
 *
 * The vast majority of VRs can be determined by looking in the dictionary as
 * the data element has only one valid VR. Data elements that can use more
 * than one VR depending on the context require additional logic.
 *
 * On error, the tag of the clarifying data element that was missing or
 * invalid that caused the VR to not be able to be inferred is returned.
 */
export function infer_vr_for_tag(location, tag) {
  let clarifying_data_elements = active_clarifying_data_elements(location);
  let private_creator = private_creator_for_tag(clarifying_data_elements, tag);
  let _block;
  let $ = $dictionary.find(tag, private_creator);
  if ($ instanceof Ok) {
    let vrs = $[0].vrs;
    _block = vrs;
  } else {
    _block = toList([]);
  }
  let allowed_vrs = _block;
  if (allowed_vrs instanceof $Empty) {
    return new Ok(new $value_representation.Unknown());
  } else {
    let $1 = allowed_vrs.tail;
    if ($1 instanceof $Empty) {
      let vr = allowed_vrs.head;
      return new Ok(vr);
    } else {
      let $2 = $1.tail;
      if ($2 instanceof $Empty) {
        let $3 = $1.head;
        if ($3 instanceof $value_representation.OtherWordString) {
          let $4 = allowed_vrs.head;
          if ($4 instanceof $value_representation.OtherByteString) {
            if (isEqual(tag, $dictionary.pixel_data.tag)) {
              return new Ok(new $value_representation.OtherWordString());
            } else if (
              (isEqual(tag, $dictionary.channel_minimum_value.tag)) || (isEqual(
                tag,
                $dictionary.channel_maximum_value.tag
              ))
            ) {
              let $5 = clarifying_data_elements.waveform_bits_stored;
              if ($5 instanceof Some) {
                let $6 = $5[0];
                if ($6 === 8) {
                  return new Ok(new $value_representation.OtherByteString());
                } else if ($6 === 16) {
                  return new Ok(new $value_representation.OtherWordString());
                } else {
                  return new Error($dictionary.waveform_bits_stored.tag);
                }
              } else {
                return new Error($dictionary.waveform_bits_stored.tag);
              }
            } else if (
              (isEqual(tag, $dictionary.waveform_padding_value.tag)) || (isEqual(
                tag,
                $dictionary.waveform_data.tag
              ))
            ) {
              let $5 = clarifying_data_elements.waveform_bits_allocated;
              if ($5 instanceof Some) {
                let $6 = $5[0];
                if ($6 === 8) {
                  return new Ok(new $value_representation.OtherByteString());
                } else if ($6 === 16) {
                  return new Ok(new $value_representation.OtherWordString());
                } else {
                  return new Error($dictionary.waveform_bits_allocated.tag);
                }
              } else {
                return new Error($dictionary.waveform_bits_allocated.tag);
              }
            } else if (
              ((tag.group >= 0x6000) && (tag.group <= 0x60FF)) && (tag.element === 0x3000)
            ) {
              return new Ok(new $value_representation.OtherWordString());
            } else {
              return new Ok(new $value_representation.Unknown());
            }
          } else if (
            $4 instanceof $value_representation.UnsignedShort &&
            isEqual(tag, $dictionary.lut_data.tag)
          ) {
            return new Ok(new $value_representation.OtherWordString());
          } else {
            return new Ok(new $value_representation.Unknown());
          }
        } else if ($3 instanceof $value_representation.SignedShort) {
          let $4 = allowed_vrs.head;
          if (
            $4 instanceof $value_representation.UnsignedShort &&
            (((((((((((((((((((isEqual(
              tag,
              $dictionary.zero_velocity_pixel_value.tag
            )) || (isEqual(tag, $dictionary.mapped_pixel_value.tag))) || (isEqual(
              tag,
              $dictionary.smallest_valid_pixel_value.tag
            ))) || (isEqual(tag, $dictionary.largest_valid_pixel_value.tag))) || (isEqual(
              tag,
              $dictionary.smallest_image_pixel_value.tag
            ))) || (isEqual(tag, $dictionary.largest_image_pixel_value.tag))) || (isEqual(
              tag,
              $dictionary.smallest_pixel_value_in_series.tag
            ))) || (isEqual(tag, $dictionary.largest_pixel_value_in_series.tag))) || (isEqual(
              tag,
              $dictionary.smallest_image_pixel_value_in_plane.tag
            ))) || (isEqual(
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
            ))) || (isEqual(
              tag,
              $dictionary.real_world_value_first_value_mapped.tag
            ))) || (isEqual(tag, $dictionary.histogram_first_bin_value.tag))) || (isEqual(
              tag,
              $dictionary.histogram_last_bin_value.tag
            ))
          ) {
            let $5 = clarifying_data_elements.pixel_representation;
            if ($5 instanceof Some) {
              let $6 = $5[0];
              if ($6 === 0) {
                return new Ok(new $value_representation.UnsignedShort());
              } else if ($6 === 1) {
                return new Ok(new $value_representation.SignedShort());
              } else {
                return new Error($dictionary.pixel_representation.tag);
              }
            } else {
              return new Error($dictionary.pixel_representation.tag);
            }
          } else {
            return new Ok(new $value_representation.Unknown());
          }
        } else {
          return new Ok(new $value_representation.Unknown());
        }
      } else {
        return new Ok(new $value_representation.Unknown());
      }
    }
  }
}

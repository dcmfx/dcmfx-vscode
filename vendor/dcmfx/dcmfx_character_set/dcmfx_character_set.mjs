/// <reference types="./dcmfx_character_set.d.mts" />
import * as $bit_array from "../gleam_stdlib/gleam/bit_array.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../gleam_stdlib/gleam/option.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $character_set from "./dcmfx_character_set/internal/character_set.mjs";
import {
  MultiByteWithExtensions,
  MultiByteWithoutExtensions,
  SingleByteWithExtensions,
  SingleByteWithoutExtensions,
} from "./dcmfx_character_set/internal/character_set.mjs";
import * as $iso_ir_6 from "./dcmfx_character_set/internal/iso_ir_6.mjs";
import * as $jis_x_0201 from "./dcmfx_character_set/internal/jis_x_0201.mjs";
import * as $string_type from "./dcmfx_character_set/string_type.mjs";
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
  bitArraySlice,
} from "./gleam.mjs";

const FILEPATH = "src/dcmfx_character_set.gleam";

class SpecificCharacterSet extends $CustomType {
  constructor(charsets) {
    super();
    this.charsets = charsets;
  }
}

/**
 * Converts a raw value from a "SpecificCharacterSet" data element into a
 * `SpecificCharacterSet` instance that can be used to decode bytes into a
 * native string.
 */
export function from_string(specific_character_set) {
  let _block;
  let _pipe = specific_character_set;
  let _pipe$1 = $string.split(_pipe, "\\");
  let _pipe$2 = $list.map(_pipe$1, $string.trim);
  _block = $list.map(_pipe$2, $string.uppercase);
  let charsets = _block;
  let _block$1;
  if (charsets instanceof $Empty) {
    _block$1 = charsets;
  } else {
    let $ = charsets.tail;
    if ($ instanceof $Empty) {
      let $1 = charsets.head;
      if ($1 === "") {
        _block$1 = toList(["ISO_IR 6"]);
      } else {
        _block$1 = charsets;
      }
    } else {
      let $1 = charsets.head;
      if ($1 === "") {
        let c = $.head;
        let rest = $.tail;
        _block$1 = listPrepend("ISO 2022 IR 6", listPrepend(c, rest));
      } else {
        _block$1 = charsets;
      }
    }
  }
  let charsets$1 = _block$1;
  let _block$2;
  let _pipe$3 = charsets$1;
  let _pipe$4 = $list.map(_pipe$3, $character_set.from_string);
  _block$2 = $result.all(_pipe$4);
  let charsets$2 = _block$2;
  return $result.try$(
    charsets$2,
    (charsets) => {
      let _block$3;
      if (charsets instanceof $Empty) {
        let _block$4;
        let _pipe$5 = charsets;
        _block$4 = $list.find(
          _pipe$5,
          (charset) => {
            if (charset instanceof SingleByteWithoutExtensions) {
              return true;
            } else if (charset instanceof MultiByteWithoutExtensions) {
              return true;
            } else {
              return false;
            }
          },
        );
        let has_non_iso_2022_charset = _block$4;
        if (has_non_iso_2022_charset instanceof Ok) {
          _block$3 = new Error(
            "SpecificCharacterSet has multiple non-ISO 2022 values",
          );
        } else {
          let _block$5;
          let $ = $list.contains(charsets, $character_set.iso_2022_ir_6);
          if ($) {
            _block$5 = charsets;
          } else {
            _block$5 = $list.append(
              charsets,
              toList([$character_set.iso_2022_ir_6]),
            );
          }
          let _pipe$6 = _block$5;
          _block$3 = new Ok(_pipe$6);
        }
      } else {
        let $ = charsets.tail;
        if ($ instanceof $Empty) {
          _block$3 = new Ok(charsets);
        } else {
          let _block$4;
          let _pipe$5 = charsets;
          _block$4 = $list.find(
            _pipe$5,
            (charset) => {
              if (charset instanceof SingleByteWithoutExtensions) {
                return true;
              } else if (charset instanceof MultiByteWithoutExtensions) {
                return true;
              } else {
                return false;
              }
            },
          );
          let has_non_iso_2022_charset = _block$4;
          if (has_non_iso_2022_charset instanceof Ok) {
            _block$3 = new Error(
              "SpecificCharacterSet has multiple non-ISO 2022 values",
            );
          } else {
            let _block$5;
            let $1 = $list.contains(charsets, $character_set.iso_2022_ir_6);
            if ($1) {
              _block$5 = charsets;
            } else {
              _block$5 = $list.append(
                charsets,
                toList([$character_set.iso_2022_ir_6]),
              );
            }
            let _pipe$6 = _block$5;
            _block$3 = new Ok(_pipe$6);
          }
        }
      }
      let charsets$1 = _block$3;
      return $result.try$(
        charsets$1,
        (charsets) => { return new Ok(new SpecificCharacterSet(charsets)); },
      );
    },
  );
}

/**
 * Returns whether a specific character set is byte compatible with UTF-8. This
 * is only the case for the DICOM default character set (ISO_IR 6) and the
 * UTF-8 character set itself (ISO_IR 192).
 */
export function is_utf8_compatible(specific_character_set) {
  return (isEqual(
    specific_character_set.charsets,
    toList([$character_set.iso_ir_6])
  )) || (isEqual(
    specific_character_set.charsets,
    toList([$character_set.iso_ir_192])
  ));
}

/**
 * Returns the default G0 and G1 code elements which are the ones specified by
 * the first character set. These are the initially active code elements and
 * they are also reactivated after any delimiter is encountered.
 * 
 * @ignore
 */
function default_code_elements(specific_character_set) {
  let $ = specific_character_set.charsets;
  if ($ instanceof $Empty) {
    return [new None(), new None()];
  } else {
    let $1 = $.head;
    if ($1 instanceof SingleByteWithExtensions) {
      let code_element_g0 = $1.code_element_g0;
      let code_element_g1 = $1.code_element_g1;
      return [new Some(code_element_g0), code_element_g1];
    } else if ($1 instanceof MultiByteWithExtensions) {
      let code_element_g0 = $1.code_element_g0;
      let code_element_g1 = $1.code_element_g1;
      return [code_element_g0, code_element_g1];
    } else {
      return [new None(), new None()];
    }
  }
}

function update_code_element(candidate, bytes) {
  if (candidate instanceof Some) {
    let candidate$1 = candidate[0];
    let esc = candidate$1.escape_sequence;
    let $ = isEqual(
      $bit_array.slice(bytes, 0, $bit_array.byte_size(esc)),
      new Ok(esc)
    );
    if ($) {
      let esc_length = $bit_array.byte_size(esc);
      let byte_count = $bit_array.byte_size(bytes);
      let $1 = $bit_array.slice(bytes, esc_length, byte_count - esc_length);
      let rest;
      if ($1 instanceof Ok) {
        rest = $1[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_character_set",
          297,
          "update_code_element",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $1,
            start: 9249,
            end: 9342,
            pattern_start: 9260,
            pattern_end: 9268
          }
        )
      }
      return new Ok(rest);
    } else {
      return new Error(undefined);
    }
  } else {
    return new Error(undefined);
  }
}

/**
 * Attempts to update the active code elements based on the escape sequence at
 * the start of the given bytes. If the escape sequence isn't for any of the
 * available character sets then nothing happens, i.e. unrecognized escape
 * sequences are ignored.
 * 
 * @ignore
 */
function apply_escape_sequence(
  specific_character_set,
  bytes,
  active_code_elements
) {
  let _pipe = specific_character_set.charsets;
  return $list.fold_until(
    _pipe,
    [active_code_elements, bytes],
    (current, charset) => {
      let code_elements = $character_set.code_elements(charset);
      let $ = update_code_element(code_elements[0], bytes);
      if ($ instanceof Ok) {
        let bytes$1 = $[0];
        return new $list.Stop([[code_elements[0], current[0][1]], bytes$1]);
      } else {
        let $1 = update_code_element(code_elements[1], bytes);
        if ($1 instanceof Ok) {
          let bytes$1 = $1[0];
          return new $list.Stop([[current[0][0], code_elements[1]], bytes$1]);
        } else {
          return new $list.Continue([current[0], bytes]);
        }
      }
    },
  );
}

function decode_iso_2022_bytes(
  loop$specific_character_set,
  loop$bytes,
  loop$string_type,
  loop$active_code_elements,
  loop$acc
) {
  while (true) {
    let specific_character_set = loop$specific_character_set;
    let bytes = loop$bytes;
    let string_type = loop$string_type;
    let active_code_elements = loop$active_code_elements;
    let acc = loop$acc;
    if (bytes.bitSize === 0) {
      return acc;
    } else if (
      bytes.bitSize >= 8 &&
      bytes.byteAt(0) === 27 &&
      (bytes.bitSize - 8) % 8 === 0
    ) {
      let rest = bitArraySlice(bytes, 8);
      let $ = apply_escape_sequence(
        specific_character_set,
        rest,
        active_code_elements,
      );
      let active_code_elements$1;
      let bytes$1;
      active_code_elements$1 = $[0];
      bytes$1 = $[1];
      loop$specific_character_set = specific_character_set;
      loop$bytes = bytes$1;
      loop$string_type = string_type;
      loop$active_code_elements = active_code_elements$1;
      loop$acc = acc;
    } else {
      let _block;
      let $ = active_code_elements[1];
      if ($ instanceof Some) {
        if (bytes.bitSize >= 8) {
          if ((bytes.bitSize - 8) % 8 === 0) {
            let byte = bytes.byteAt(0);
            if (byte >= 0x80) {
              let g1 = $[0];
              _block = g1.decoder;
            } else {
              let $1 = active_code_elements[0];
              if ($1 instanceof Some) {
                let g0 = $1[0];
                _block = g0.decoder;
              } else {
                _block = $iso_ir_6.decode_next_codepoint;
              }
            }
          } else {
            let $1 = active_code_elements[0];
            if ($1 instanceof Some) {
              let g0 = $1[0];
              _block = g0.decoder;
            } else {
              _block = $iso_ir_6.decode_next_codepoint;
            }
          }
        } else {
          let $1 = active_code_elements[0];
          if ($1 instanceof Some) {
            let g0 = $1[0];
            _block = g0.decoder;
          } else {
            _block = $iso_ir_6.decode_next_codepoint;
          }
        }
      } else {
        let $1 = active_code_elements[0];
        if ($1 instanceof Some) {
          let g0 = $1[0];
          _block = g0.decoder;
        } else {
          _block = $iso_ir_6.decode_next_codepoint;
        }
      }
      let decoder = _block;
      let $1 = decoder(bytes);
      let codepoint;
      let bytes$1;
      if ($1 instanceof Ok) {
        codepoint = $1[0][0];
        bytes$1 = $1[0][1];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_character_set",
          192,
          "decode_iso_2022_bytes",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $1,
            start: 6114,
            end: 6165,
            pattern_start: 6125,
            pattern_end: 6148
          }
        )
      }
      let _block$1;
      let $2 = $string.utf_codepoint_to_int(codepoint);
      if ($2 === 0x9) {
        _block$1 = default_code_elements(specific_character_set);
      } else if ($2 === 0xA) {
        _block$1 = default_code_elements(specific_character_set);
      } else if ($2 === 0xC) {
        _block$1 = default_code_elements(specific_character_set);
      } else if ($2 === 0xD) {
        _block$1 = default_code_elements(specific_character_set);
      } else if ($2 === 0x5C) {
        if (string_type instanceof $string_type.MultiValue) {
          _block$1 = default_code_elements(specific_character_set);
        } else if (string_type instanceof $string_type.PersonName) {
          _block$1 = default_code_elements(specific_character_set);
        } else {
          _block$1 = active_code_elements;
        }
      } else if ($2 === 0x3D && string_type instanceof $string_type.PersonName) {
        _block$1 = default_code_elements(specific_character_set);
      } else if ($2 === 0x5E && string_type instanceof $string_type.PersonName) {
        _block$1 = default_code_elements(specific_character_set);
      } else {
        _block$1 = active_code_elements;
      }
      let active_code_elements$1 = _block$1;
      loop$specific_character_set = specific_character_set;
      loop$bytes = bytes$1;
      loop$string_type = string_type;
      loop$active_code_elements = active_code_elements$1;
      loop$acc = listPrepend(codepoint, acc);
    }
  }
}

/**
 * Decodes bytes using a specific character set to a native string.
 *
 * Trailing whitespace is automatically removed, and invalid bytes are replaced
 * with the U+FFFD character: �.
 */
export function decode_bytes(specific_character_set, bytes, string_type) {
  let _block;
  let $ = specific_character_set.charsets;
  if ($ instanceof $Empty) {
    _block = decode_iso_2022_bytes(
      specific_character_set,
      bytes,
      string_type,
      default_code_elements(specific_character_set),
      toList([]),
    );
  } else {
    let $1 = $.tail;
    if ($1 instanceof $Empty) {
      let $2 = $.head;
      if ($2 instanceof SingleByteWithoutExtensions) {
        let term = $2.defined_term;
        let decoder = $2.decoder;
        let _block$1;
        if (
          string_type instanceof $string_type.MultiValue &&
          term === "ISO_IR 13"
        ) {
          _block$1 = $jis_x_0201.decode_next_codepoint_allowing_backslash;
        } else if (
          string_type instanceof $string_type.PersonName &&
          term === "ISO_IR 13"
        ) {
          _block$1 = $jis_x_0201.decode_next_codepoint_allowing_backslash;
        } else {
          _block$1 = decoder;
        }
        let decoder$1 = _block$1;
        _block = $character_set.decode_bytes(bytes, decoder$1, toList([]));
      } else if ($2 instanceof MultiByteWithoutExtensions) {
        let decoder = $2.decoder;
        _block = $character_set.decode_bytes(bytes, decoder, toList([]));
      } else {
        _block = decode_iso_2022_bytes(
          specific_character_set,
          bytes,
          string_type,
          default_code_elements(specific_character_set),
          toList([]),
        );
      }
    } else {
      _block = decode_iso_2022_bytes(
        specific_character_set,
        bytes,
        string_type,
        default_code_elements(specific_character_set),
        toList([]),
      );
    }
  }
  let _pipe = _block;
  let _pipe$1 = $list.reverse(_pipe);
  return $string.from_utf_codepoints(_pipe$1);
}

function do_sanitize_default_charset_bytes(loop$bytes, loop$i, loop$acc) {
  while (true) {
    let bytes = loop$bytes;
    let i = loop$i;
    let acc = loop$acc;
    let $ = $bit_array.slice(bytes, i, 1);
    if ($ instanceof Ok) {
      let $1 = $[0];
      if ($1.bitSize === 8) {
        let byte = $1.byteAt(0);
        let $2 = byte > 0x7F;
        if ($2) {
          let $3 = $bit_array.slice(bytes, 0, i);
          let before;
          if ($3 instanceof Ok) {
            before = $3[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "dcmfx_character_set",
              329,
              "do_sanitize_default_charset_bytes",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $3,
                start: 10032,
                end: 10084,
                pattern_start: 10043,
                pattern_end: 10053
              }
            )
          }
          let $4 = $bit_array.slice(
            bytes,
            i + 1,
            ($bit_array.byte_size(bytes) - i) - 1,
          );
          let after;
          if ($4 instanceof Ok) {
            after = $4[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "dcmfx_character_set",
              330,
              "do_sanitize_default_charset_bytes",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $4,
                start: 10095,
                end: 10195,
                pattern_start: 10106,
                pattern_end: 10115
              }
            )
          }
          let acc$1 = $bit_array.concat(toList([acc, before, toBitArray([63])]));
          loop$bytes = after;
          loop$i = 0;
          loop$acc = acc$1;
        } else {
          loop$bytes = bytes;
          loop$i = i + 1;
          loop$acc = acc;
        }
      } else {
        return $bit_array.concat(toList([acc, bytes]));
      }
    } else {
      return $bit_array.concat(toList([acc, bytes]));
    }
  }
}

/**
 * Replaces all bytes greater than 0x7F with the value 0x3F, i.e. the question
 * mark character. This can be used to ensure that only valid ISO 646/US-ASCII
 * bytes are present.
 */
export function sanitize_default_charset_bytes(bytes) {
  return do_sanitize_default_charset_bytes(bytes, 0, toBitArray([]));
}

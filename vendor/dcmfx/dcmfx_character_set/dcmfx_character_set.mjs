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
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
  toBitArray,
  bitArraySlice,
} from "./gleam.mjs";

class SpecificCharacterSet extends $CustomType {
  constructor(charsets) {
    super();
    this.charsets = charsets;
  }
}

export function from_string(specific_character_set) {
  let charsets = (() => {
    let _pipe = specific_character_set;
    let _pipe$1 = $string.split(_pipe, "\\");
    let _pipe$2 = $list.map(_pipe$1, $string.trim);
    return $list.map(_pipe$2, $string.uppercase);
  })();
  let charsets$1 = (() => {
    if (charsets.hasLength(1) && charsets.head === "") {
      return toList(["ISO_IR 6"]);
    } else if (charsets.atLeastLength(2) && charsets.head === "") {
      let c = charsets.tail.head;
      let rest = charsets.tail.tail;
      return listPrepend("ISO 2022 IR 6", listPrepend(c, rest));
    } else {
      return charsets;
    }
  })();
  let charsets$2 = (() => {
    let _pipe = charsets$1;
    let _pipe$1 = $list.map(_pipe, $character_set.from_string);
    return $result.all(_pipe$1);
  })();
  return $result.try$(
    charsets$2,
    (charsets) => {
      let charsets$1 = (() => {
        if (charsets.hasLength(1)) {
          return new Ok(charsets);
        } else {
          let has_non_iso_2022_charset = (() => {
            let _pipe = charsets;
            return $list.find(
              _pipe,
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
          })();
          if (has_non_iso_2022_charset.isOk()) {
            return new Error(
              "SpecificCharacterSet has multiple non-ISO 2022 values",
            );
          } else {
            let _pipe = (() => {
              let $ = $list.contains(charsets, $character_set.iso_2022_ir_6);
              if ($) {
                return charsets;
              } else {
                return $list.append(
                  charsets,
                  toList([$character_set.iso_2022_ir_6]),
                );
              }
            })();
            return new Ok(_pipe);
          }
        }
      })();
      return $result.try$(
        charsets$1,
        (charsets) => { return new Ok(new SpecificCharacterSet(charsets)); },
      );
    },
  );
}

export function is_utf8_compatible(specific_character_set) {
  return (isEqual(
    specific_character_set.charsets,
    toList([$character_set.iso_ir_6])
  )) || (isEqual(
    specific_character_set.charsets,
    toList([$character_set.iso_ir_192])
  ));
}

function default_code_elements(specific_character_set) {
  if (specific_character_set instanceof SpecificCharacterSet &&
  specific_character_set.charsets.atLeastLength(1) &&
  specific_character_set.charsets.head instanceof SingleByteWithExtensions) {
    let code_element_g0 = specific_character_set.charsets.head.code_element_g0;
    let code_element_g1 = specific_character_set.charsets.head.code_element_g1;
    return [new Some(code_element_g0), code_element_g1];
  } else if (specific_character_set instanceof SpecificCharacterSet &&
  specific_character_set.charsets.atLeastLength(1) &&
  specific_character_set.charsets.head instanceof MultiByteWithExtensions) {
    let code_element_g0 = specific_character_set.charsets.head.code_element_g0;
    let code_element_g1 = specific_character_set.charsets.head.code_element_g1;
    return [code_element_g0, code_element_g1];
  } else {
    return [new None(), new None()];
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
      if (!$1.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_character_set",
          301,
          "update_code_element",
          "Pattern match failed, no pattern matched the value.",
          { value: $1 }
        )
      }
      let rest = $1[0];
      return new Ok(rest);
    } else {
      return new Error(undefined);
    }
  } else {
    return new Error(undefined);
  }
}

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
      if ($.isOk()) {
        let bytes$1 = $[0];
        return new $list.Stop([[code_elements[0], current[0][1]], bytes$1]);
      } else {
        let $1 = update_code_element(code_elements[1], bytes);
        if ($1.isOk()) {
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
    if (bytes.bitSize == 0) {
      return acc;
    } else if (bytes.byteAt(0) === 27 &&
    (bytes.bitSize >= 8 && (bytes.bitSize - 8) % 8 === 0)) {
      let rest = bitArraySlice(bytes, 8);
      let $ = apply_escape_sequence(
        specific_character_set,
        rest,
        active_code_elements,
      );
      let active_code_elements$1 = $[0];
      let bytes$1 = $[1];
      loop$specific_character_set = specific_character_set;
      loop$bytes = bytes$1;
      loop$string_type = string_type;
      loop$active_code_elements = active_code_elements$1;
      loop$acc = acc;
    } else {
      let decoder = (() => {
        if ((bytes.bitSize >= 8 && (bytes.bitSize - 8) % 8 === 0) &&
        active_code_elements[1] instanceof Some &&
        (bytes.byteAt(0) >= 0x80)) {
          let byte = bytes.byteAt(0);
          let g1 = active_code_elements[1][0];
          return g1.decoder;
        } else if (active_code_elements[0] instanceof Some) {
          let g0 = active_code_elements[0][0];
          return g0.decoder;
        } else {
          return $iso_ir_6.decode_next_codepoint;
        }
      })();
      let $ = decoder(bytes);
      if (!$.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_character_set",
          196,
          "decode_iso_2022_bytes",
          "Pattern match failed, no pattern matched the value.",
          { value: $ }
        )
      }
      let codepoint = $[0][0];
      let bytes$1 = $[0][1];
      let active_code_elements$1 = (() => {
        let $1 = $string.utf_codepoint_to_int(codepoint);
        if ($1 === 0x9) {
          return default_code_elements(specific_character_set);
        } else if ($1 === 0xA) {
          return default_code_elements(specific_character_set);
        } else if ($1 === 0xC) {
          return default_code_elements(specific_character_set);
        } else if ($1 === 0xD) {
          return default_code_elements(specific_character_set);
        } else if ($1 === 0x5C && string_type instanceof $string_type.MultiValue) {
          return default_code_elements(specific_character_set);
        } else if ($1 === 0x5C && string_type instanceof $string_type.PersonName) {
          return default_code_elements(specific_character_set);
        } else if ($1 === 0x3D && string_type instanceof $string_type.PersonName) {
          return default_code_elements(specific_character_set);
        } else if ($1 === 0x5E && string_type instanceof $string_type.PersonName) {
          return default_code_elements(specific_character_set);
        } else {
          return active_code_elements;
        }
      })();
      loop$specific_character_set = specific_character_set;
      loop$bytes = bytes$1;
      loop$string_type = string_type;
      loop$active_code_elements = active_code_elements$1;
      loop$acc = listPrepend(codepoint, acc);
    }
  }
}

export function decode_bytes(specific_character_set, bytes, string_type) {
  let _pipe = (() => {
    if (specific_character_set instanceof SpecificCharacterSet &&
    specific_character_set.charsets.hasLength(1) &&
    specific_character_set.charsets.head instanceof SingleByteWithoutExtensions) {
      let term = specific_character_set.charsets.head.defined_term;
      let decoder = specific_character_set.charsets.head.decoder;
      let decoder$1 = (() => {
        if (term === "ISO_IR 13" &&
        string_type instanceof $string_type.MultiValue) {
          return $jis_x_0201.decode_next_codepoint_allowing_backslash;
        } else if (term === "ISO_IR 13" &&
        string_type instanceof $string_type.PersonName) {
          return $jis_x_0201.decode_next_codepoint_allowing_backslash;
        } else {
          return decoder;
        }
      })();
      return $character_set.decode_bytes(bytes, decoder$1, toList([]));
    } else if (specific_character_set instanceof SpecificCharacterSet &&
    specific_character_set.charsets.hasLength(1) &&
    specific_character_set.charsets.head instanceof MultiByteWithoutExtensions) {
      let decoder = specific_character_set.charsets.head.decoder;
      return $character_set.decode_bytes(bytes, decoder, toList([]));
    } else {
      return decode_iso_2022_bytes(
        specific_character_set,
        bytes,
        string_type,
        default_code_elements(specific_character_set),
        toList([]),
      );
    }
  })();
  let _pipe$1 = $list.reverse(_pipe);
  return $string.from_utf_codepoints(_pipe$1);
}

function do_sanitize_default_charset_bytes(loop$bytes, loop$i, loop$acc) {
  while (true) {
    let bytes = loop$bytes;
    let i = loop$i;
    let acc = loop$acc;
    let $ = $bit_array.slice(bytes, i, 1);
    if ($.isOk() && $[0].bitSize == 8) {
      let byte = $[0].byteAt(0);
      let $1 = byte > 0x7F;
      if ($1) {
        let $2 = $bit_array.slice(bytes, 0, i);
        if (!$2.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_character_set",
            333,
            "do_sanitize_default_charset_bytes",
            "Pattern match failed, no pattern matched the value.",
            { value: $2 }
          )
        }
        let before = $2[0];
        let $3 = $bit_array.slice(
          bytes,
          i + 1,
          ($bit_array.byte_size(bytes) - i) - 1,
        );
        if (!$3.isOk()) {
          throw makeError(
            "let_assert",
            "dcmfx_character_set",
            334,
            "do_sanitize_default_charset_bytes",
            "Pattern match failed, no pattern matched the value.",
            { value: $3 }
          )
        }
        let after = $3[0];
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
  }
}

export function sanitize_default_charset_bytes(bytes) {
  return do_sanitize_default_charset_bytes(bytes, 0, toBitArray([]));
}

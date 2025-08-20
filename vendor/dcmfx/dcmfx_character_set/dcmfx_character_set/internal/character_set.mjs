/// <reference types="./character_set.d.mts" />
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $gb_18030 from "../../dcmfx_character_set/internal/gb_18030.mjs";
import * as $iso_8859_1 from "../../dcmfx_character_set/internal/iso_8859_1.mjs";
import * as $iso_8859_11 from "../../dcmfx_character_set/internal/iso_8859_11.mjs";
import * as $iso_8859_15 from "../../dcmfx_character_set/internal/iso_8859_15.mjs";
import * as $iso_8859_2 from "../../dcmfx_character_set/internal/iso_8859_2.mjs";
import * as $iso_8859_3 from "../../dcmfx_character_set/internal/iso_8859_3.mjs";
import * as $iso_8859_4 from "../../dcmfx_character_set/internal/iso_8859_4.mjs";
import * as $iso_8859_5 from "../../dcmfx_character_set/internal/iso_8859_5.mjs";
import * as $iso_8859_6 from "../../dcmfx_character_set/internal/iso_8859_6.mjs";
import * as $iso_8859_7 from "../../dcmfx_character_set/internal/iso_8859_7.mjs";
import * as $iso_8859_8 from "../../dcmfx_character_set/internal/iso_8859_8.mjs";
import * as $iso_8859_9 from "../../dcmfx_character_set/internal/iso_8859_9.mjs";
import * as $iso_ir_6 from "../../dcmfx_character_set/internal/iso_ir_6.mjs";
import * as $jis_x_0201 from "../../dcmfx_character_set/internal/jis_x_0201.mjs";
import * as $jis_x_0208 from "../../dcmfx_character_set/internal/jis_x_0208.mjs";
import * as $jis_x_0212 from "../../dcmfx_character_set/internal/jis_x_0212.mjs";
import * as $ks_x_1001 from "../../dcmfx_character_set/internal/ks_x_1001.mjs";
import * as $utf8 from "../../dcmfx_character_set/internal/utf8.mjs";
import {
  Ok,
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  toBitArray,
} from "../../gleam.mjs";

export class SingleByteWithoutExtensions extends $CustomType {
  constructor(defined_term, description, decoder) {
    super();
    this.defined_term = defined_term;
    this.description = description;
    this.decoder = decoder;
  }
}

export class SingleByteWithExtensions extends $CustomType {
  constructor(defined_term, description, code_element_g0, code_element_g1) {
    super();
    this.defined_term = defined_term;
    this.description = description;
    this.code_element_g0 = code_element_g0;
    this.code_element_g1 = code_element_g1;
  }
}

export class MultiByteWithExtensions extends $CustomType {
  constructor(defined_term, description, code_element_g0, code_element_g1) {
    super();
    this.defined_term = defined_term;
    this.description = description;
    this.code_element_g0 = code_element_g0;
    this.code_element_g1 = code_element_g1;
  }
}

export class MultiByteWithoutExtensions extends $CustomType {
  constructor(defined_term, description, decoder) {
    super();
    this.defined_term = defined_term;
    this.description = description;
    this.decoder = decoder;
  }
}

export class CodeElement extends $CustomType {
  constructor(escape_sequence, decoder) {
    super();
    this.escape_sequence = escape_sequence;
    this.decoder = decoder;
  }
}

/**
 * Decodes bytes into Unicode codepoints using the specified decoder. The list
 * is returned in reverse order, i.e. with the last codepoint at the list's
 * head.
 */
export function decode_bytes(loop$bytes, loop$decoder, loop$acc) {
  while (true) {
    let bytes = loop$bytes;
    let decoder = loop$decoder;
    let acc = loop$acc;
    let $ = decoder(bytes);
    if ($ instanceof Ok) {
      let codepoint = $[0][0];
      let rest = $[0][1];
      loop$bytes = rest;
      loop$decoder = decoder;
      loop$acc = listPrepend(codepoint, acc);
    } else {
      return acc;
    }
  }
}

/**
 * Returns the G0 and G1 code elements for a character set.
 */
export function code_elements(character_set) {
  if (character_set instanceof SingleByteWithExtensions) {
    let code_element_g0 = character_set.code_element_g0;
    let code_element_g1 = character_set.code_element_g1;
    return [new Some(code_element_g0), code_element_g1];
  } else if (character_set instanceof MultiByteWithExtensions) {
    let code_element_g0 = character_set.code_element_g0;
    let code_element_g1 = character_set.code_element_g1;
    return [code_element_g0, code_element_g1];
  } else {
    return [new None(), new None()];
  }
}

/**
 * ISO IR 6 character set, also known as ISO 646 and US-ASCII.
 */
export const iso_ir_6 = /* @__PURE__ */ new SingleByteWithoutExtensions(
  "ISO_IR 6",
  "Default repertoire",
  $iso_ir_6.decode_next_codepoint,
);

/**
 * ISO IR 100 character set, also known as ISO 8859-1 and Latin-1. Used by many
 * Western European languages.
 */
export const iso_ir_100 = /* @__PURE__ */ new SingleByteWithoutExtensions(
  "ISO_IR 100",
  "Latin alphabet No. 1",
  $iso_8859_1.decode_next_codepoint,
);

/**
 * ISO IR 101 character set, also known as ISO 8859-2 and Latin-2. Used by many
 * Central European languages.
 */
export const iso_ir_101 = /* @__PURE__ */ new SingleByteWithoutExtensions(
  "ISO_IR 101",
  "Latin alphabet No. 2",
  $iso_8859_2.decode_next_codepoint,
);

/**
 * ISO IR 109 character set, also known as ISO 8859-3 and Latin-3. Used by many
 * South European languages.
 */
export const iso_ir_109 = /* @__PURE__ */ new SingleByteWithoutExtensions(
  "ISO_IR 109",
  "Latin alphabet No. 3",
  $iso_8859_3.decode_next_codepoint,
);

/**
 * ISO IR 110 character set, also known as ISO 8859-4 and Latin-4. Used by many
 * North European languages.
 */
export const iso_ir_110 = /* @__PURE__ */ new SingleByteWithoutExtensions(
  "ISO_IR 110",
  "Latin alphabet No. 4",
  $iso_8859_4.decode_next_codepoint,
);

/**
 * ISO IR 144 character set, also known as ISO 8859-5 and Latin/Cyrillic. Used
 * by Slavic languages that use a Cyrillic alphabet.
 */
export const iso_ir_144 = /* @__PURE__ */ new SingleByteWithoutExtensions(
  "ISO_IR 144",
  "Cyrillic",
  $iso_8859_5.decode_next_codepoint,
);

/**
 * ISO IR 127 character set, also known as ISO 8859-6 and Latin/Arabic. Used by
 * the Arabic language.
 */
export const iso_ir_127 = /* @__PURE__ */ new SingleByteWithoutExtensions(
  "ISO_IR 127",
  "Arabic",
  $iso_8859_6.decode_next_codepoint,
);

/**
 * ISO IR 126 character set, also known as ISO 8859-7 and Latin/Greek. Used by
 * the Greek language.
 */
export const iso_ir_126 = /* @__PURE__ */ new SingleByteWithoutExtensions(
  "ISO_IR 126",
  "Greek",
  $iso_8859_7.decode_next_codepoint,
);

/**
 * ISO IR 138 character set, also known as ISO 8859-8 and Latin/Hebrew. Used by
 * the Hebrew language.
 */
export const iso_ir_138 = /* @__PURE__ */ new SingleByteWithoutExtensions(
  "ISO_IR 138",
  "Hebrew",
  $iso_8859_8.decode_next_codepoint,
);

/**
 * ISO IR 148 character set, also known as ISO 8859-9 and Latin-5. Used by the
 * Turkish language.
 */
export const iso_ir_148 = /* @__PURE__ */ new SingleByteWithoutExtensions(
  "ISO_IR 148",
  "Latin alphabet No. 5",
  $iso_8859_9.decode_next_codepoint,
);

/**
 * ISO IR 203 character set, also known as ISO 8859-15 and Latin-9. Used by
 * many languages.
 */
export const iso_ir_203 = /* @__PURE__ */ new SingleByteWithoutExtensions(
  "ISO_IR 203",
  "Latin alphabet No. 9",
  $iso_8859_15.decode_next_codepoint,
);

/**
 * ISO IR 13 character set, also known as JIS X 0201. Used by the Japanese
 * language.
 */
export const iso_ir_13 = /* @__PURE__ */ new SingleByteWithoutExtensions(
  "ISO_IR 13",
  "Japanese",
  $jis_x_0201.decode_next_codepoint,
);

/**
 * ISO IR 166 character set, also known as ISO 8859-11 and TIS 620-2533. Used
 * by the Thai language.
 */
export const iso_ir_166 = /* @__PURE__ */ new SingleByteWithoutExtensions(
  "ISO_IR 166",
  "Thai",
  $iso_8859_11.decode_next_codepoint,
);

const iso_ir_6_code_element = /* @__PURE__ */ new CodeElement(
  /* @__PURE__ */ toBitArray([40, 66]),
  $iso_ir_6.decode_next_codepoint,
);

/**
 * ISO 2022 IR 6 character set, also known as ISO 646 and US-ASCII.
 */
export const iso_2022_ir_6 = /* @__PURE__ */ new SingleByteWithExtensions(
  "ISO 2022 IR 6",
  "Default repertoire",
  iso_ir_6_code_element,
  /* @__PURE__ */ new None(),
);

/**
 * ISO 2022 IR 100 character set, also known as ISO 8859-1 and Latin-1. Used by
 * many Western European languages.
 */
export const iso_2022_ir_100 = /* @__PURE__ */ new SingleByteWithExtensions(
  "ISO 2022 IR 100",
  "Latin alphabet No. 1",
  iso_ir_6_code_element,
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([45, 65]),
      $iso_8859_1.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO 2022 IR 101 character set, also known as ISO 8859-2 and Latin-2. Used by
 * many Central European languages.
 */
export const iso_2022_ir_101 = /* @__PURE__ */ new SingleByteWithExtensions(
  "ISO 2022 IR 101",
  "Latin alphabet No. 2",
  iso_ir_6_code_element,
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([45, 66]),
      $iso_8859_2.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO 2022 IR 109 character set, also known as ISO 8859-3 and Latin-3. Used by
 * many South European languages.
 */
export const iso_2022_ir_109 = /* @__PURE__ */ new SingleByteWithExtensions(
  "ISO 2022 IR 109",
  "Latin alphabet No. 3",
  iso_ir_6_code_element,
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([45, 67]),
      $iso_8859_3.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO 2022 IR 110 character set, also known as ISO 8859-4 and Latin-4. Used by
 * many North European languages.
 */
export const iso_2022_ir_110 = /* @__PURE__ */ new SingleByteWithExtensions(
  "ISO 2022 IR 110",
  "Latin alphabet No. 4",
  iso_ir_6_code_element,
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([45, 68]),
      $iso_8859_4.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO 2022 IR 144 character set, also known as ISO 8859-5 and Latin/Cyrillic.
 * Used by Slavic languages that use a Cyrillic alphabet.
 */
export const iso_2022_ir_144 = /* @__PURE__ */ new SingleByteWithExtensions(
  "ISO 2022 IR 144",
  "Cyrillic",
  iso_ir_6_code_element,
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([45, 76]),
      $iso_8859_5.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO 2022 IR 127 character set, also known as ISO 8859-6 and Latin/Arabic.
 * Used by the Arabic language.
 */
export const iso_2022_ir_127 = /* @__PURE__ */ new SingleByteWithExtensions(
  "ISO 2022 IR 127",
  "Arabic",
  iso_ir_6_code_element,
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([45, 71]),
      $iso_8859_6.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO 2022 IR 126 character set, also known as ISO 8859-7 and Latin/Greek.
 * Used by the Greek language.
 */
export const iso_2022_ir_126 = /* @__PURE__ */ new SingleByteWithExtensions(
  "ISO 2022 IR 126",
  "Greek",
  iso_ir_6_code_element,
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([45, 70]),
      $iso_8859_7.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO 2022 IR 138 character set, also known as ISO 8859-8 and Latin/Hebrew.
 * Used by the Hebrew language.
 */
export const iso_2022_ir_138 = /* @__PURE__ */ new SingleByteWithExtensions(
  "ISO 2022 IR 138",
  "Hebrew",
  iso_ir_6_code_element,
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([45, 72]),
      $iso_8859_8.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO 2022 IR 148 character set, also known as ISO 8859-9 and Latin-5. Used by
 * the Turkish language.
 */
export const iso_2022_ir_148 = /* @__PURE__ */ new SingleByteWithExtensions(
  "ISO 2022 IR 148",
  "Latin alphabet No. 5",
  iso_ir_6_code_element,
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([45, 77]),
      $iso_8859_9.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO 2022 IR 203 character set, also known as ISO 8859-15 and Latin-9. Used
 * by many languages.
 */
export const iso_2022_ir_203 = /* @__PURE__ */ new SingleByteWithExtensions(
  "ISO 2022 IR 203",
  "Latin alphabet No. 9",
  iso_ir_6_code_element,
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([45, 98]),
      $iso_8859_15.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO 2022 IR 13 character set, also known as JIS X 0201. Used by the Japanese
 * language.
 */
export const iso_2022_ir_13 = /* @__PURE__ */ new SingleByteWithExtensions(
  "ISO 2022 IR 13",
  "Japanese",
  /* @__PURE__ */ new CodeElement(
    /* @__PURE__ */ toBitArray([40, 74]),
    $jis_x_0201.decode_next_codepoint,
  ),
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([41, 73]),
      $jis_x_0201.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO 2022 IR 166 character set, also known as ISO 8859-11 and TIS 620-2533.
 * Used by the Thai language.
 */
export const iso_2022_ir_166 = /* @__PURE__ */ new SingleByteWithExtensions(
  "ISO 2022 IR 166",
  "Thai",
  iso_ir_6_code_element,
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([45, 84]),
      $iso_8859_11.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO 2022 IR 87 character set, also known as JIS X 0208. Used by the Japanese
 * language.
 */
export const iso_2022_ir_87 = /* @__PURE__ */ new MultiByteWithExtensions(
  "ISO 2022 IR 87",
  "Japanese",
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([36, 66]),
      $jis_x_0208.decode_next_codepoint,
    ),
  ),
  /* @__PURE__ */ new None(),
);

/**
 * ISO 2022 IR 159 character set, also known as JIS X 0212. Used by the
 * Japanese language.
 */
export const iso_2022_ir_159 = /* @__PURE__ */ new MultiByteWithExtensions(
  "ISO 2022 IR 159",
  "Japanese",
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([36, 40, 68]),
      $jis_x_0212.decode_next_codepoint,
    ),
  ),
  /* @__PURE__ */ new None(),
);

/**
 * ISO 2022 IR 149 character set, also known as KS X 1001. Used by the Korean
 * language.
 */
export const iso_2022_ir_149 = /* @__PURE__ */ new MultiByteWithExtensions(
  "ISO 2022 IR 149",
  "Korean",
  /* @__PURE__ */ new None(),
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([36, 41, 67]),
      $ks_x_1001.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO 2022 IR 58 character set, also known as GB 2312. Used by the Chinese
 * language.
 */
export const iso_2022_ir_58 = /* @__PURE__ */ new MultiByteWithExtensions(
  "ISO 2022 IR 58",
  "Simplified Chinese",
  /* @__PURE__ */ new None(),
  /* @__PURE__ */ new Some(
    /* @__PURE__ */ new CodeElement(
      /* @__PURE__ */ toBitArray([36, 41, 65]),
      $gb_18030.decode_next_codepoint,
    ),
  ),
);

/**
 * ISO IR 192 character set, also known as UTF-8. Used by all languages.
 */
export const iso_ir_192 = /* @__PURE__ */ new MultiByteWithoutExtensions(
  "ISO_IR 192",
  "Unicode in UTF-8",
  $utf8.decode_next_codepoint,
);

/**
 * GB 18030 character set. Used by the Chinese language.
 */
export const gb_18030 = /* @__PURE__ */ new MultiByteWithoutExtensions(
  "GB18030",
  "GB 18030",
  $gb_18030.decode_next_codepoint,
);

/**
 * GBK character set. Used by the Chinese language.
 */
export const gbk = /* @__PURE__ */ new MultiByteWithoutExtensions(
  "GBK",
  "GBK",
  $gb_18030.decode_next_codepoint,
);

/**
 * The list of all DICOM character sets, in the order in which they appear in
 * the DICOM standard: single-byte character sets without extensions,
 * single-byte character sets with extensions, multi-byte character sets with
 * extensions, multi-byte character sets without extensions.
 */
export const all_character_sets = /* @__PURE__ */ toList([
  iso_ir_6,
  iso_ir_100,
  iso_ir_101,
  iso_ir_109,
  iso_ir_110,
  iso_ir_144,
  iso_ir_127,
  iso_ir_126,
  iso_ir_138,
  iso_ir_148,
  iso_ir_203,
  iso_ir_13,
  iso_ir_166,
  iso_2022_ir_6,
  iso_2022_ir_100,
  iso_2022_ir_101,
  iso_2022_ir_109,
  iso_2022_ir_110,
  iso_2022_ir_144,
  iso_2022_ir_127,
  iso_2022_ir_126,
  iso_2022_ir_138,
  iso_2022_ir_148,
  iso_2022_ir_203,
  iso_2022_ir_13,
  iso_2022_ir_166,
  iso_2022_ir_87,
  iso_2022_ir_159,
  iso_2022_ir_149,
  iso_2022_ir_58,
  iso_ir_192,
  gb_18030,
  gbk,
]);

/**
 * Converts a string containing the 'Defined Term' for a character set in the
 * DICOM standard into a `CharacterSet` instance.
 *
 * If the passed term isn't recognized then an error is returned.
 */
export function from_string(defined_term) {
  let standardize_defined_term = (term) => {
    let _pipe = term;
    let _pipe$1 = $string.replace(_pipe, " ", "");
    let _pipe$2 = $string.replace(_pipe$1, "-", "");
    return $string.replace(_pipe$2, "_", "");
  };
  let charset = standardize_defined_term(defined_term);
  let _pipe = all_character_sets;
  let _pipe$1 = $list.find(
    _pipe,
    (character_set) => {
      return standardize_defined_term(character_set.defined_term) === charset;
    },
  );
  return $result.map_error(
    _pipe$1,
    (_) => { return "Invalid character set: " + defined_term; },
  );
}

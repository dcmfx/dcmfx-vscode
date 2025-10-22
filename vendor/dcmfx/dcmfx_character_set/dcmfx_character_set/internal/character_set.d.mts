import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../../gleam.d.mts";

export class SingleByteWithoutExtensions extends _.CustomType {
  /** @deprecated */
  constructor(
    defined_term: string,
    description: string,
    decoder: (x0: _.BitArray) => _.Result<
      [_.UtfCodepoint, _.BitArray],
      undefined
    >
  );
  /** @deprecated */
  defined_term: string;
  /** @deprecated */
  description: string;
  /** @deprecated */
  decoder: (x0: _.BitArray) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>;
}
export function CharacterSet$SingleByteWithoutExtensions(
  defined_term: string,
  description: string,
  decoder: (x0: _.BitArray) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>,
): CharacterSet$;
export function CharacterSet$isSingleByteWithoutExtensions(
  value: CharacterSet$,
): boolean;
export function CharacterSet$SingleByteWithoutExtensions$0(value: CharacterSet$): string;
export function CharacterSet$SingleByteWithoutExtensions$defined_term(
  value: CharacterSet$,
): string;
export function CharacterSet$SingleByteWithoutExtensions$1(value: CharacterSet$): string;
export function CharacterSet$SingleByteWithoutExtensions$description(
  value: CharacterSet$,
): string;
export function CharacterSet$SingleByteWithoutExtensions$2(value: CharacterSet$): (
  x0: _.BitArray
) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>;
export function CharacterSet$SingleByteWithoutExtensions$decoder(value: CharacterSet$): (
  x0: _.BitArray
) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>;

export class SingleByteWithExtensions extends _.CustomType {
  /** @deprecated */
  constructor(
    defined_term: string,
    description: string,
    code_element_g0: CodeElement$,
    code_element_g1: $option.Option$<CodeElement$>
  );
  /** @deprecated */
  defined_term: string;
  /** @deprecated */
  description: string;
  /** @deprecated */
  code_element_g0: CodeElement$;
  /** @deprecated */
  code_element_g1: $option.Option$<CodeElement$>;
}
export function CharacterSet$SingleByteWithExtensions(
  defined_term: string,
  description: string,
  code_element_g0: CodeElement$,
  code_element_g1: $option.Option$<CodeElement$>,
): CharacterSet$;
export function CharacterSet$isSingleByteWithExtensions(
  value: CharacterSet$,
): boolean;
export function CharacterSet$SingleByteWithExtensions$0(value: CharacterSet$): string;
export function CharacterSet$SingleByteWithExtensions$defined_term(
  value: CharacterSet$,
): string;
export function CharacterSet$SingleByteWithExtensions$1(value: CharacterSet$): string;
export function CharacterSet$SingleByteWithExtensions$description(
  value: CharacterSet$,
): string;
export function CharacterSet$SingleByteWithExtensions$2(value: CharacterSet$): CodeElement$;
export function CharacterSet$SingleByteWithExtensions$code_element_g0(
  value: CharacterSet$,
): CodeElement$;
export function CharacterSet$SingleByteWithExtensions$3(value: CharacterSet$): $option.Option$<
  CodeElement$
>;
export function CharacterSet$SingleByteWithExtensions$code_element_g1(value: CharacterSet$): $option.Option$<
  CodeElement$
>;

export class MultiByteWithExtensions extends _.CustomType {
  /** @deprecated */
  constructor(
    defined_term: string,
    description: string,
    code_element_g0: $option.Option$<CodeElement$>,
    code_element_g1: $option.Option$<CodeElement$>
  );
  /** @deprecated */
  defined_term: string;
  /** @deprecated */
  description: string;
  /** @deprecated */
  code_element_g0: $option.Option$<CodeElement$>;
  /** @deprecated */
  code_element_g1: $option.Option$<CodeElement$>;
}
export function CharacterSet$MultiByteWithExtensions(
  defined_term: string,
  description: string,
  code_element_g0: $option.Option$<CodeElement$>,
  code_element_g1: $option.Option$<CodeElement$>,
): CharacterSet$;
export function CharacterSet$isMultiByteWithExtensions(
  value: CharacterSet$,
): boolean;
export function CharacterSet$MultiByteWithExtensions$0(value: CharacterSet$): string;
export function CharacterSet$MultiByteWithExtensions$defined_term(
  value: CharacterSet$,
): string;
export function CharacterSet$MultiByteWithExtensions$1(value: CharacterSet$): string;
export function CharacterSet$MultiByteWithExtensions$description(
  value: CharacterSet$,
): string;
export function CharacterSet$MultiByteWithExtensions$2(value: CharacterSet$): $option.Option$<
  CodeElement$
>;
export function CharacterSet$MultiByteWithExtensions$code_element_g0(value: CharacterSet$): $option.Option$<
  CodeElement$
>;
export function CharacterSet$MultiByteWithExtensions$3(value: CharacterSet$): $option.Option$<
  CodeElement$
>;
export function CharacterSet$MultiByteWithExtensions$code_element_g1(value: CharacterSet$): $option.Option$<
  CodeElement$
>;

export class MultiByteWithoutExtensions extends _.CustomType {
  /** @deprecated */
  constructor(
    defined_term: string,
    description: string,
    decoder: (x0: _.BitArray) => _.Result<
      [_.UtfCodepoint, _.BitArray],
      undefined
    >
  );
  /** @deprecated */
  defined_term: string;
  /** @deprecated */
  description: string;
  /** @deprecated */
  decoder: (x0: _.BitArray) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>;
}
export function CharacterSet$MultiByteWithoutExtensions(
  defined_term: string,
  description: string,
  decoder: (x0: _.BitArray) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>,
): CharacterSet$;
export function CharacterSet$isMultiByteWithoutExtensions(
  value: CharacterSet$,
): boolean;
export function CharacterSet$MultiByteWithoutExtensions$0(value: CharacterSet$): string;
export function CharacterSet$MultiByteWithoutExtensions$defined_term(
  value: CharacterSet$,
): string;
export function CharacterSet$MultiByteWithoutExtensions$1(value: CharacterSet$): string;
export function CharacterSet$MultiByteWithoutExtensions$description(
  value: CharacterSet$,
): string;
export function CharacterSet$MultiByteWithoutExtensions$2(value: CharacterSet$): (
  x0: _.BitArray
) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>;
export function CharacterSet$MultiByteWithoutExtensions$decoder(value: CharacterSet$): (
  x0: _.BitArray
) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>;

export type CharacterSet$ = SingleByteWithoutExtensions | SingleByteWithExtensions | MultiByteWithExtensions | MultiByteWithoutExtensions;

export function CharacterSet$defined_term(value: CharacterSet$): string;
export function CharacterSet$description(value: CharacterSet$): string;

export class CodeElement extends _.CustomType {
  /** @deprecated */
  constructor(
    escape_sequence: _.BitArray,
    decoder: (x0: _.BitArray) => _.Result<
      [_.UtfCodepoint, _.BitArray],
      undefined
    >
  );
  /** @deprecated */
  escape_sequence: _.BitArray;
  /** @deprecated */
  decoder: (x0: _.BitArray) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>;
}
export function CodeElement$CodeElement(
  escape_sequence: _.BitArray,
  decoder: (x0: _.BitArray) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>,
): CodeElement$;
export function CodeElement$isCodeElement(value: CodeElement$): boolean;
export function CodeElement$CodeElement$0(value: CodeElement$): _.BitArray;
export function CodeElement$CodeElement$escape_sequence(value: CodeElement$): _.BitArray;
export function CodeElement$CodeElement$1(
  value: CodeElement$,
): (x0: _.BitArray) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>;
export function CodeElement$CodeElement$decoder(value: CodeElement$): (
  x0: _.BitArray
) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>;

export type CodeElement$ = CodeElement;

export type DecodeNextCodepointFn = (x0: _.BitArray) => _.Result<
  [_.UtfCodepoint, _.BitArray],
  undefined
>;

export type CodeElementPair = [
  $option.Option$<CodeElement$>,
  $option.Option$<CodeElement$>
];

export function decode_bytes(
  bytes: _.BitArray,
  decoder: (x0: _.BitArray) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>,
  acc: _.List<_.UtfCodepoint>
): _.List<_.UtfCodepoint>;

export function code_elements(character_set: CharacterSet$): [
  $option.Option$<CodeElement$>,
  $option.Option$<CodeElement$>
];

export const iso_ir_6: CharacterSet$;

export const iso_ir_100: CharacterSet$;

export const iso_ir_101: CharacterSet$;

export const iso_ir_109: CharacterSet$;

export const iso_ir_110: CharacterSet$;

export const iso_ir_144: CharacterSet$;

export const iso_ir_127: CharacterSet$;

export const iso_ir_126: CharacterSet$;

export const iso_ir_138: CharacterSet$;

export const iso_ir_148: CharacterSet$;

export const iso_ir_203: CharacterSet$;

export const iso_ir_13: CharacterSet$;

export const iso_ir_166: CharacterSet$;

export const iso_2022_ir_6: CharacterSet$;

export const iso_2022_ir_100: CharacterSet$;

export const iso_2022_ir_101: CharacterSet$;

export const iso_2022_ir_109: CharacterSet$;

export const iso_2022_ir_110: CharacterSet$;

export const iso_2022_ir_144: CharacterSet$;

export const iso_2022_ir_127: CharacterSet$;

export const iso_2022_ir_126: CharacterSet$;

export const iso_2022_ir_138: CharacterSet$;

export const iso_2022_ir_148: CharacterSet$;

export const iso_2022_ir_203: CharacterSet$;

export const iso_2022_ir_13: CharacterSet$;

export const iso_2022_ir_166: CharacterSet$;

export const iso_2022_ir_87: CharacterSet$;

export const iso_2022_ir_159: CharacterSet$;

export const iso_2022_ir_149: CharacterSet$;

export const iso_2022_ir_58: CharacterSet$;

export const iso_ir_192: CharacterSet$;

export const gb_18030: CharacterSet$;

export const gbk: CharacterSet$;

export const all_character_sets: _.List<CharacterSet$>;

export function from_string(defined_term: string): _.Result<
  CharacterSet$,
  string
>;

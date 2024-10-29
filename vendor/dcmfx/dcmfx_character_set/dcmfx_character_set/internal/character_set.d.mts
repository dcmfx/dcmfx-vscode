import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../../gleam.d.mts";

export class SingleByteWithoutExtensions extends _.CustomType {
  constructor(
    defined_term: string,
    description: string,
    decoder: (x0: _.BitArray) => _.Result<
      [_.UtfCodepoint, _.BitArray],
      undefined
    >
  );
  
  defined_term: string;
  description: string;
  decoder: (x0: _.BitArray) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>;
}

export class SingleByteWithExtensions extends _.CustomType {
  constructor(
    defined_term: string,
    description: string,
    code_element_g0: CodeElement$,
    code_element_g1: $option.Option$<CodeElement$>
  );
  
  defined_term: string;
  description: string;
  code_element_g0: CodeElement$;
  code_element_g1: $option.Option$<CodeElement$>;
}

export class MultiByteWithExtensions extends _.CustomType {
  constructor(
    defined_term: string,
    description: string,
    code_element_g0: $option.Option$<CodeElement$>,
    code_element_g1: $option.Option$<CodeElement$>
  );
  
  defined_term: string;
  description: string;
  code_element_g0: $option.Option$<CodeElement$>;
  code_element_g1: $option.Option$<CodeElement$>;
}

export class MultiByteWithoutExtensions extends _.CustomType {
  constructor(
    defined_term: string,
    description: string,
    decoder: (x0: _.BitArray) => _.Result<
      [_.UtfCodepoint, _.BitArray],
      undefined
    >
  );
  
  defined_term: string;
  description: string;
  decoder: (x0: _.BitArray) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>;
}

export type CharacterSet$ = SingleByteWithoutExtensions | SingleByteWithExtensions | MultiByteWithExtensions | MultiByteWithoutExtensions;

export class CodeElement extends _.CustomType {
  constructor(
    escape_sequence: _.BitArray,
    decoder: (x0: _.BitArray) => _.Result<
      [_.UtfCodepoint, _.BitArray],
      undefined
    >
  );
  
  escape_sequence: _.BitArray;
  decoder: (x0: _.BitArray) => _.Result<[_.UtfCodepoint, _.BitArray], undefined>;
}

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

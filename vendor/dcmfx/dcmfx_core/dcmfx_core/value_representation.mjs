/// <reference types="./value_representation.d.mts" />
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $bit_array_utils from "../dcmfx_core/internal/bit_array_utils.mjs";
import * as $endian from "../dcmfx_core/internal/endian.mjs";
import { Ok, Error, toList, CustomType as $CustomType, isEqual } from "../gleam.mjs";

export class AgeString extends $CustomType {}

export class ApplicationEntity extends $CustomType {}

export class AttributeTag extends $CustomType {}

export class CodeString extends $CustomType {}

export class Date extends $CustomType {}

export class DateTime extends $CustomType {}

export class DecimalString extends $CustomType {}

export class FloatingPointDouble extends $CustomType {}

export class FloatingPointSingle extends $CustomType {}

export class IntegerString extends $CustomType {}

export class LongString extends $CustomType {}

export class LongText extends $CustomType {}

export class OtherByteString extends $CustomType {}

export class OtherDoubleString extends $CustomType {}

export class OtherFloatString extends $CustomType {}

export class OtherLongString extends $CustomType {}

export class OtherVeryLongString extends $CustomType {}

export class OtherWordString extends $CustomType {}

export class PersonName extends $CustomType {}

export class Sequence extends $CustomType {}

export class ShortString extends $CustomType {}

export class ShortText extends $CustomType {}

export class SignedLong extends $CustomType {}

export class SignedShort extends $CustomType {}

export class SignedVeryLong extends $CustomType {}

export class Time extends $CustomType {}

export class UniqueIdentifier extends $CustomType {}

export class UniversalResourceIdentifier extends $CustomType {}

export class Unknown extends $CustomType {}

export class UnlimitedCharacters extends $CustomType {}

export class UnlimitedText extends $CustomType {}

export class UnsignedLong extends $CustomType {}

export class UnsignedShort extends $CustomType {}

export class UnsignedVeryLong extends $CustomType {}

export class LengthRequirements extends $CustomType {
  constructor(bytes_max, bytes_multiple_of, string_characters_max) {
    super();
    this.bytes_max = bytes_max;
    this.bytes_multiple_of = bytes_multiple_of;
    this.string_characters_max = string_characters_max;
  }
}

/**
 * Converts a value representation into its equivalent two-character string.
 */
export function to_string(vr) {
  if (vr instanceof AgeString) {
    return "AS";
  } else if (vr instanceof ApplicationEntity) {
    return "AE";
  } else if (vr instanceof AttributeTag) {
    return "AT";
  } else if (vr instanceof CodeString) {
    return "CS";
  } else if (vr instanceof Date) {
    return "DA";
  } else if (vr instanceof DateTime) {
    return "DT";
  } else if (vr instanceof DecimalString) {
    return "DS";
  } else if (vr instanceof FloatingPointDouble) {
    return "FD";
  } else if (vr instanceof FloatingPointSingle) {
    return "FL";
  } else if (vr instanceof IntegerString) {
    return "IS";
  } else if (vr instanceof LongString) {
    return "LO";
  } else if (vr instanceof LongText) {
    return "LT";
  } else if (vr instanceof OtherByteString) {
    return "OB";
  } else if (vr instanceof OtherDoubleString) {
    return "OD";
  } else if (vr instanceof OtherFloatString) {
    return "OF";
  } else if (vr instanceof OtherLongString) {
    return "OL";
  } else if (vr instanceof OtherVeryLongString) {
    return "OV";
  } else if (vr instanceof OtherWordString) {
    return "OW";
  } else if (vr instanceof PersonName) {
    return "PN";
  } else if (vr instanceof Sequence) {
    return "SQ";
  } else if (vr instanceof ShortString) {
    return "SH";
  } else if (vr instanceof ShortText) {
    return "ST";
  } else if (vr instanceof SignedLong) {
    return "SL";
  } else if (vr instanceof SignedShort) {
    return "SS";
  } else if (vr instanceof SignedVeryLong) {
    return "SV";
  } else if (vr instanceof Time) {
    return "TM";
  } else if (vr instanceof UniqueIdentifier) {
    return "UI";
  } else if (vr instanceof UniversalResourceIdentifier) {
    return "UR";
  } else if (vr instanceof Unknown) {
    return "UN";
  } else if (vr instanceof UnlimitedCharacters) {
    return "UC";
  } else if (vr instanceof UnlimitedText) {
    return "UT";
  } else if (vr instanceof UnsignedLong) {
    return "UL";
  } else if (vr instanceof UnsignedShort) {
    return "US";
  } else {
    return "UV";
  }
}

/**
 * Converts a two-character string, e.g. "DA", into a value representation.
 */
export function from_bytes(bytes) {
  if (bytes.bitSize >= 8) {
    if (bytes.byteAt(0) === 65) {
      if (bytes.bitSize === 16) {
        if (bytes.byteAt(1) === 69) {
          return new Ok(new ApplicationEntity());
        } else if (bytes.byteAt(1) === 83) {
          return new Ok(new AgeString());
        } else if (bytes.byteAt(1) === 84) {
          return new Ok(new AttributeTag());
        } else if (bytes.byteAt(0) === 68 && bytes.byteAt(1) === 65) {
          return new Ok(new Date());
        } else if (bytes.byteAt(0) === 70) {
          if (bytes.byteAt(1) === 68) {
            return new Ok(new FloatingPointDouble());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new FloatingPointSingle());
          } else if (bytes.byteAt(0) === 76 && bytes.byteAt(1) === 79) {
            return new Ok(new LongString());
          } else if (bytes.byteAt(0) === 79) {
            if (bytes.byteAt(1) === 66) {
              return new Ok(new OtherByteString());
            } else if (bytes.byteAt(1) === 70) {
              return new Ok(new OtherFloatString());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new OtherVeryLongString());
            } else if (bytes.byteAt(1) === 87) {
              return new Ok(new OtherWordString());
            } else if (bytes.byteAt(0) === 80) {
              if (bytes.byteAt(1) === 78) {
                return new Ok(new PersonName());
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new SignedVeryLong());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new UnsignedVeryLong());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 76 && bytes.byteAt(1) === 79) {
          return new Ok(new LongString());
        } else if (bytes.byteAt(0) === 79) {
          if (bytes.byteAt(1) === 66) {
            return new Ok(new OtherByteString());
          } else if (bytes.byteAt(1) === 68) {
            return new Ok(new OtherDoubleString());
          } else if (bytes.byteAt(1) === 70) {
            return new Ok(new OtherFloatString());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new OtherLongString());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new OtherVeryLongString());
          } else if (bytes.byteAt(1) === 87) {
            return new Ok(new OtherWordString());
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 80) {
          if (bytes.byteAt(1) === 78) {
            return new Ok(new PersonName());
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new SignedLong());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new UnsignedLong());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 83) {
          if (bytes.byteAt(1) === 72) {
            return new Ok(new ShortString());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new SignedLong());
          } else if (bytes.byteAt(1) === 81) {
            return new Ok(new Sequence());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new SignedVeryLong());
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
          return new Ok(new Time());
        } else if (bytes.byteAt(0) === 85) {
          if (bytes.byteAt(1) === 67) {
            return new Ok(new UnlimitedCharacters());
          } else if (bytes.byteAt(1) === 73) {
            return new Ok(new UniqueIdentifier());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new UnsignedLong());
          } else if (bytes.byteAt(1) === 78) {
            return new Ok(new Unknown());
          } else if (bytes.byteAt(1) === 82) {
            return new Ok(new UniversalResourceIdentifier());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new UnsignedVeryLong());
          } else {
            return new Error(undefined);
          }
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else if (bytes.byteAt(0) === 67) {
      if (bytes.bitSize === 16) {
        if (bytes.byteAt(1) === 83) {
          return new Ok(new CodeString());
        } else if (bytes.byteAt(0) === 68) {
          if (bytes.byteAt(1) === 65) {
            return new Ok(new Date());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new DateTime());
          } else if (bytes.byteAt(0) === 70) {
            if (bytes.byteAt(1) === 68) {
              return new Ok(new FloatingPointDouble());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new FloatingPointSingle());
            } else if (bytes.byteAt(0) === 76 && bytes.byteAt(1) === 79) {
              return new Ok(new LongString());
            } else if (bytes.byteAt(0) === 79) {
              if (bytes.byteAt(1) === 66) {
                return new Ok(new OtherByteString());
              } else if (bytes.byteAt(1) === 70) {
                return new Ok(new OtherFloatString());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new OtherVeryLongString());
              } else if (bytes.byteAt(1) === 87) {
                return new Ok(new OtherWordString());
              } else if (bytes.byteAt(0) === 80) {
                if (bytes.byteAt(1) === 78) {
                  return new Ok(new PersonName());
                } else if (bytes.byteAt(0) === 83) {
                  if (bytes.byteAt(1) === 72) {
                    return new Ok(new ShortString());
                  } else if (bytes.byteAt(1) === 81) {
                    return new Ok(new Sequence());
                  } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                    return new Ok(new Time());
                  } else if (bytes.byteAt(0) === 85) {
                    if (bytes.byteAt(1) === 67) {
                      return new Ok(new UnlimitedCharacters());
                    } else if (bytes.byteAt(1) === 73) {
                      return new Ok(new UniqueIdentifier());
                    } else if (bytes.byteAt(1) === 82) {
                      return new Ok(new UniversalResourceIdentifier());
                    } else {
                      return new Error(undefined);
                    }
                  } else {
                    return new Error(undefined);
                  }
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 78) {
                    return new Ok(new Unknown());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 80) {
              if (bytes.byteAt(1) === 78) {
                return new Ok(new PersonName());
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(1) === 86) {
                  return new Ok(new SignedVeryLong());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else if (bytes.byteAt(1) === 86) {
                  return new Ok(new UnsignedVeryLong());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new SignedVeryLong());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new UnsignedVeryLong());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 76 && bytes.byteAt(1) === 79) {
            return new Ok(new LongString());
          } else if (bytes.byteAt(0) === 79) {
            if (bytes.byteAt(1) === 66) {
              return new Ok(new OtherByteString());
            } else if (bytes.byteAt(1) === 68) {
              return new Ok(new OtherDoubleString());
            } else if (bytes.byteAt(1) === 70) {
              return new Ok(new OtherFloatString());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new OtherLongString());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new OtherVeryLongString());
            } else if (bytes.byteAt(1) === 87) {
              return new Ok(new OtherWordString());
            } else if (bytes.byteAt(0) === 80) {
              if (bytes.byteAt(1) === 78) {
                return new Ok(new PersonName());
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 76) {
                return new Ok(new SignedLong());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new SignedVeryLong());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 76) {
                return new Ok(new UnsignedLong());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new UnsignedVeryLong());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new SignedLong());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new UnsignedLong());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 70) {
          if (bytes.byteAt(1) === 68) {
            return new Ok(new FloatingPointDouble());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new FloatingPointSingle());
          } else if (bytes.byteAt(0) === 76) {
            if (bytes.byteAt(1) === 79) {
              return new Ok(new LongString());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new LongText());
            } else if (bytes.byteAt(0) === 79) {
              if (bytes.byteAt(1) === 66) {
                return new Ok(new OtherByteString());
              } else if (bytes.byteAt(1) === 70) {
                return new Ok(new OtherFloatString());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new OtherVeryLongString());
              } else if (bytes.byteAt(1) === 87) {
                return new Ok(new OtherWordString());
              } else if (bytes.byteAt(0) === 80) {
                if (bytes.byteAt(1) === 78) {
                  return new Ok(new PersonName());
                } else if (bytes.byteAt(0) === 83) {
                  if (bytes.byteAt(1) === 72) {
                    return new Ok(new ShortString());
                  } else if (bytes.byteAt(1) === 81) {
                    return new Ok(new Sequence());
                  } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                    return new Ok(new Time());
                  } else if (bytes.byteAt(0) === 85) {
                    if (bytes.byteAt(1) === 67) {
                      return new Ok(new UnlimitedCharacters());
                    } else if (bytes.byteAt(1) === 73) {
                      return new Ok(new UniqueIdentifier());
                    } else if (bytes.byteAt(1) === 82) {
                      return new Ok(new UniversalResourceIdentifier());
                    } else {
                      return new Error(undefined);
                    }
                  } else {
                    return new Error(undefined);
                  }
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 78) {
                    return new Ok(new Unknown());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 80) {
              if (bytes.byteAt(1) === 78) {
                return new Ok(new PersonName());
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(1) === 86) {
                  return new Ok(new SignedVeryLong());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else if (bytes.byteAt(1) === 86) {
                  return new Ok(new UnsignedVeryLong());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new SignedVeryLong());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new UnsignedVeryLong());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 79) {
            if (bytes.byteAt(1) === 66) {
              return new Ok(new OtherByteString());
            } else if (bytes.byteAt(1) === 70) {
              return new Ok(new OtherFloatString());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new OtherVeryLongString());
            } else if (bytes.byteAt(1) === 87) {
              return new Ok(new OtherWordString());
            } else if (bytes.byteAt(0) === 80) {
              if (bytes.byteAt(1) === 78) {
                return new Ok(new PersonName());
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(1) === 84) {
                  return new Ok(new ShortText());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else if (bytes.byteAt(1) === 84) {
                  return new Ok(new UnlimitedText());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new ShortText());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new UnlimitedText());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new ShortText());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new SignedVeryLong());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new UnlimitedText());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new UnsignedVeryLong());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new ShortText());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new UnlimitedText());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 76) {
          if (bytes.byteAt(1) === 79) {
            return new Ok(new LongString());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new LongText());
          } else if (bytes.byteAt(0) === 79) {
            if (bytes.byteAt(1) === 66) {
              return new Ok(new OtherByteString());
            } else if (bytes.byteAt(1) === 68) {
              return new Ok(new OtherDoubleString());
            } else if (bytes.byteAt(1) === 70) {
              return new Ok(new OtherFloatString());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new OtherLongString());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new OtherVeryLongString());
            } else if (bytes.byteAt(1) === 87) {
              return new Ok(new OtherWordString());
            } else if (bytes.byteAt(0) === 80) {
              if (bytes.byteAt(1) === 78) {
                return new Ok(new PersonName());
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 76) {
                return new Ok(new SignedLong());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new SignedVeryLong());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 76) {
                return new Ok(new UnsignedLong());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new UnsignedVeryLong());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new SignedLong());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new UnsignedLong());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 79) {
          if (bytes.byteAt(1) === 66) {
            return new Ok(new OtherByteString());
          } else if (bytes.byteAt(1) === 68) {
            return new Ok(new OtherDoubleString());
          } else if (bytes.byteAt(1) === 70) {
            return new Ok(new OtherFloatString());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new OtherLongString());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new OtherVeryLongString());
          } else if (bytes.byteAt(1) === 87) {
            return new Ok(new OtherWordString());
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new ShortText());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new UnlimitedText());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new ShortText());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new UnlimitedText());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 80) {
          if (bytes.byteAt(1) === 78) {
            return new Ok(new PersonName());
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new SignedLong());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new ShortText());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new UnsignedLong());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new UnlimitedText());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 83) {
          if (bytes.byteAt(1) === 72) {
            return new Ok(new ShortString());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new SignedLong());
          } else if (bytes.byteAt(1) === 81) {
            return new Ok(new Sequence());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new ShortText());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new SignedVeryLong());
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
          return new Ok(new Time());
        } else if (bytes.byteAt(0) === 85) {
          if (bytes.byteAt(1) === 67) {
            return new Ok(new UnlimitedCharacters());
          } else if (bytes.byteAt(1) === 73) {
            return new Ok(new UniqueIdentifier());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new UnsignedLong());
          } else if (bytes.byteAt(1) === 78) {
            return new Ok(new Unknown());
          } else if (bytes.byteAt(1) === 82) {
            return new Ok(new UniversalResourceIdentifier());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new UnlimitedText());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new UnsignedVeryLong());
          } else {
            return new Error(undefined);
          }
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else if (bytes.byteAt(0) === 68) {
      if (bytes.bitSize === 16) {
        if (bytes.byteAt(1) === 65) {
          return new Ok(new Date());
        } else if (bytes.byteAt(1) === 83) {
          return new Ok(new DecimalString());
        } else if (bytes.byteAt(1) === 84) {
          return new Ok(new DateTime());
        } else if (bytes.byteAt(0) === 70) {
          if (bytes.byteAt(1) === 68) {
            return new Ok(new FloatingPointDouble());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new FloatingPointSingle());
          } else if (bytes.byteAt(0) === 76 && bytes.byteAt(1) === 79) {
            return new Ok(new LongString());
          } else if (bytes.byteAt(0) === 79) {
            if (bytes.byteAt(1) === 66) {
              return new Ok(new OtherByteString());
            } else if (bytes.byteAt(1) === 70) {
              return new Ok(new OtherFloatString());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new OtherVeryLongString());
            } else if (bytes.byteAt(1) === 87) {
              return new Ok(new OtherWordString());
            } else if (bytes.byteAt(0) === 80) {
              if (bytes.byteAt(1) === 78) {
                return new Ok(new PersonName());
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new SignedVeryLong());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new UnsignedVeryLong());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 76 && bytes.byteAt(1) === 79) {
          return new Ok(new LongString());
        } else if (bytes.byteAt(0) === 79) {
          if (bytes.byteAt(1) === 66) {
            return new Ok(new OtherByteString());
          } else if (bytes.byteAt(1) === 68) {
            return new Ok(new OtherDoubleString());
          } else if (bytes.byteAt(1) === 70) {
            return new Ok(new OtherFloatString());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new OtherLongString());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new OtherVeryLongString());
          } else if (bytes.byteAt(1) === 87) {
            return new Ok(new OtherWordString());
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 80) {
          if (bytes.byteAt(1) === 78) {
            return new Ok(new PersonName());
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new SignedLong());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new UnsignedLong());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 83) {
          if (bytes.byteAt(1) === 72) {
            return new Ok(new ShortString());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new SignedLong());
          } else if (bytes.byteAt(1) === 81) {
            return new Ok(new Sequence());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new SignedVeryLong());
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
          return new Ok(new Time());
        } else if (bytes.byteAt(0) === 85) {
          if (bytes.byteAt(1) === 67) {
            return new Ok(new UnlimitedCharacters());
          } else if (bytes.byteAt(1) === 73) {
            return new Ok(new UniqueIdentifier());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new UnsignedLong());
          } else if (bytes.byteAt(1) === 78) {
            return new Ok(new Unknown());
          } else if (bytes.byteAt(1) === 82) {
            return new Ok(new UniversalResourceIdentifier());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new UnsignedVeryLong());
          } else {
            return new Error(undefined);
          }
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else if (bytes.byteAt(0) === 70) {
      if (bytes.bitSize === 16) {
        if (bytes.byteAt(1) === 68) {
          return new Ok(new FloatingPointDouble());
        } else if (bytes.byteAt(1) === 76) {
          return new Ok(new FloatingPointSingle());
        } else if (bytes.byteAt(0) === 73) {
          if (bytes.byteAt(1) === 83) {
            return new Ok(new IntegerString());
          } else if (bytes.byteAt(0) === 76) {
            if (bytes.byteAt(1) === 79) {
              return new Ok(new LongString());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new LongText());
            } else if (bytes.byteAt(0) === 79) {
              if (bytes.byteAt(1) === 66) {
                return new Ok(new OtherByteString());
              } else if (bytes.byteAt(1) === 70) {
                return new Ok(new OtherFloatString());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new OtherVeryLongString());
              } else if (bytes.byteAt(1) === 87) {
                return new Ok(new OtherWordString());
              } else if (bytes.byteAt(0) === 80) {
                if (bytes.byteAt(1) === 78) {
                  return new Ok(new PersonName());
                } else if (bytes.byteAt(0) === 83) {
                  if (bytes.byteAt(1) === 72) {
                    return new Ok(new ShortString());
                  } else if (bytes.byteAt(1) === 81) {
                    return new Ok(new Sequence());
                  } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                    return new Ok(new Time());
                  } else if (bytes.byteAt(0) === 85) {
                    if (bytes.byteAt(1) === 67) {
                      return new Ok(new UnlimitedCharacters());
                    } else if (bytes.byteAt(1) === 73) {
                      return new Ok(new UniqueIdentifier());
                    } else if (bytes.byteAt(1) === 82) {
                      return new Ok(new UniversalResourceIdentifier());
                    } else {
                      return new Error(undefined);
                    }
                  } else {
                    return new Error(undefined);
                  }
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 78) {
                    return new Ok(new Unknown());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 80) {
              if (bytes.byteAt(1) === 78) {
                return new Ok(new PersonName());
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(1) === 86) {
                  return new Ok(new SignedVeryLong());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else if (bytes.byteAt(1) === 86) {
                  return new Ok(new UnsignedVeryLong());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new SignedVeryLong());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new UnsignedVeryLong());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 79) {
            if (bytes.byteAt(1) === 66) {
              return new Ok(new OtherByteString());
            } else if (bytes.byteAt(1) === 70) {
              return new Ok(new OtherFloatString());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new OtherVeryLongString());
            } else if (bytes.byteAt(1) === 87) {
              return new Ok(new OtherWordString());
            } else if (bytes.byteAt(0) === 80) {
              if (bytes.byteAt(1) === 78) {
                return new Ok(new PersonName());
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(1) === 84) {
                  return new Ok(new ShortText());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else if (bytes.byteAt(1) === 84) {
                  return new Ok(new UnlimitedText());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new ShortText());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new UnlimitedText());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new ShortText());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new SignedVeryLong());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new UnlimitedText());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new UnsignedVeryLong());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new ShortText());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new UnlimitedText());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 76) {
          if (bytes.byteAt(1) === 79) {
            return new Ok(new LongString());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new LongText());
          } else if (bytes.byteAt(0) === 79) {
            if (bytes.byteAt(1) === 66) {
              return new Ok(new OtherByteString());
            } else if (bytes.byteAt(1) === 70) {
              return new Ok(new OtherFloatString());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new OtherVeryLongString());
            } else if (bytes.byteAt(1) === 87) {
              return new Ok(new OtherWordString());
            } else if (bytes.byteAt(0) === 80) {
              if (bytes.byteAt(1) === 78) {
                return new Ok(new PersonName());
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(1) === 83) {
                  return new Ok(new SignedShort());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else if (bytes.byteAt(1) === 83) {
                  return new Ok(new UnsignedShort());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 83) {
                return new Ok(new SignedShort());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 83) {
                return new Ok(new UnsignedShort());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 83) {
                return new Ok(new SignedShort());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new SignedVeryLong());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 83) {
                return new Ok(new UnsignedShort());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new UnsignedVeryLong());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 83) {
              return new Ok(new SignedShort());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 83) {
              return new Ok(new UnsignedShort());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 79) {
          if (bytes.byteAt(1) === 66) {
            return new Ok(new OtherByteString());
          } else if (bytes.byteAt(1) === 70) {
            return new Ok(new OtherFloatString());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new OtherVeryLongString());
          } else if (bytes.byteAt(1) === 87) {
            return new Ok(new OtherWordString());
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 83) {
                return new Ok(new SignedShort());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new ShortText());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 83) {
                return new Ok(new UnsignedShort());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new UnlimitedText());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 83) {
              return new Ok(new SignedShort());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new ShortText());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 83) {
              return new Ok(new UnsignedShort());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new UnlimitedText());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 80) {
          if (bytes.byteAt(1) === 78) {
            return new Ok(new PersonName());
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 83) {
              return new Ok(new SignedShort());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new ShortText());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 83) {
              return new Ok(new UnsignedShort());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new UnlimitedText());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 83) {
          if (bytes.byteAt(1) === 72) {
            return new Ok(new ShortString());
          } else if (bytes.byteAt(1) === 81) {
            return new Ok(new Sequence());
          } else if (bytes.byteAt(1) === 83) {
            return new Ok(new SignedShort());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new ShortText());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new SignedVeryLong());
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
          return new Ok(new Time());
        } else if (bytes.byteAt(0) === 85) {
          if (bytes.byteAt(1) === 67) {
            return new Ok(new UnlimitedCharacters());
          } else if (bytes.byteAt(1) === 73) {
            return new Ok(new UniqueIdentifier());
          } else if (bytes.byteAt(1) === 78) {
            return new Ok(new Unknown());
          } else if (bytes.byteAt(1) === 82) {
            return new Ok(new UniversalResourceIdentifier());
          } else if (bytes.byteAt(1) === 83) {
            return new Ok(new UnsignedShort());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new UnlimitedText());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new UnsignedVeryLong());
          } else {
            return new Error(undefined);
          }
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else if (bytes.byteAt(0) === 73) {
      if (bytes.bitSize === 16) {
        if (bytes.byteAt(1) === 83) {
          return new Ok(new IntegerString());
        } else if (bytes.byteAt(0) === 76) {
          if (bytes.byteAt(1) === 79) {
            return new Ok(new LongString());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new LongText());
          } else if (bytes.byteAt(0) === 79) {
            if (bytes.byteAt(1) === 66) {
              return new Ok(new OtherByteString());
            } else if (bytes.byteAt(1) === 68) {
              return new Ok(new OtherDoubleString());
            } else if (bytes.byteAt(1) === 70) {
              return new Ok(new OtherFloatString());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new OtherLongString());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new OtherVeryLongString());
            } else if (bytes.byteAt(1) === 87) {
              return new Ok(new OtherWordString());
            } else if (bytes.byteAt(0) === 80) {
              if (bytes.byteAt(1) === 78) {
                return new Ok(new PersonName());
              } else if (bytes.byteAt(0) === 83) {
                if (bytes.byteAt(1) === 72) {
                  return new Ok(new ShortString());
                } else if (bytes.byteAt(1) === 81) {
                  return new Ok(new Sequence());
                } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                  return new Ok(new Time());
                } else if (bytes.byteAt(0) === 85) {
                  if (bytes.byteAt(1) === 67) {
                    return new Ok(new UnlimitedCharacters());
                  } else if (bytes.byteAt(1) === 73) {
                    return new Ok(new UniqueIdentifier());
                  } else if (bytes.byteAt(1) === 82) {
                    return new Ok(new UniversalResourceIdentifier());
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  return new Error(undefined);
                }
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 78) {
                  return new Ok(new Unknown());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 76) {
                return new Ok(new SignedLong());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new SignedVeryLong());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 76) {
                return new Ok(new UnsignedLong());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 86) {
                return new Ok(new UnsignedVeryLong());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new SignedLong());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new UnsignedLong());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 79) {
          if (bytes.byteAt(1) === 66) {
            return new Ok(new OtherByteString());
          } else if (bytes.byteAt(1) === 68) {
            return new Ok(new OtherDoubleString());
          } else if (bytes.byteAt(1) === 70) {
            return new Ok(new OtherFloatString());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new OtherLongString());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new OtherVeryLongString());
          } else if (bytes.byteAt(1) === 87) {
            return new Ok(new OtherWordString());
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new ShortText());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 84) {
                return new Ok(new UnlimitedText());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new ShortText());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new UnlimitedText());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 80) {
          if (bytes.byteAt(1) === 78) {
            return new Ok(new PersonName());
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new SignedLong());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new ShortText());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new UnsignedLong());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new UnlimitedText());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 83) {
          if (bytes.byteAt(1) === 72) {
            return new Ok(new ShortString());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new SignedLong());
          } else if (bytes.byteAt(1) === 81) {
            return new Ok(new Sequence());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new ShortText());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new SignedVeryLong());
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
          return new Ok(new Time());
        } else if (bytes.byteAt(0) === 85) {
          if (bytes.byteAt(1) === 67) {
            return new Ok(new UnlimitedCharacters());
          } else if (bytes.byteAt(1) === 73) {
            return new Ok(new UniqueIdentifier());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new UnsignedLong());
          } else if (bytes.byteAt(1) === 78) {
            return new Ok(new Unknown());
          } else if (bytes.byteAt(1) === 82) {
            return new Ok(new UniversalResourceIdentifier());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new UnlimitedText());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new UnsignedVeryLong());
          } else {
            return new Error(undefined);
          }
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else if (bytes.byteAt(0) === 76) {
      if (bytes.bitSize === 16) {
        if (bytes.byteAt(1) === 79) {
          return new Ok(new LongString());
        } else if (bytes.byteAt(1) === 84) {
          return new Ok(new LongText());
        } else if (bytes.byteAt(0) === 79) {
          if (bytes.byteAt(1) === 66) {
            return new Ok(new OtherByteString());
          } else if (bytes.byteAt(1) === 68) {
            return new Ok(new OtherDoubleString());
          } else if (bytes.byteAt(1) === 70) {
            return new Ok(new OtherFloatString());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new OtherLongString());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new OtherVeryLongString());
          } else if (bytes.byteAt(1) === 87) {
            return new Ok(new OtherWordString());
          } else if (bytes.byteAt(0) === 80) {
            if (bytes.byteAt(1) === 78) {
              return new Ok(new PersonName());
            } else if (bytes.byteAt(0) === 83) {
              if (bytes.byteAt(1) === 72) {
                return new Ok(new ShortString());
              } else if (bytes.byteAt(1) === 81) {
                return new Ok(new Sequence());
              } else if (bytes.byteAt(1) === 83) {
                return new Ok(new SignedShort());
              } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
                return new Ok(new Time());
              } else if (bytes.byteAt(0) === 85) {
                if (bytes.byteAt(1) === 67) {
                  return new Ok(new UnlimitedCharacters());
                } else if (bytes.byteAt(1) === 73) {
                  return new Ok(new UniqueIdentifier());
                } else if (bytes.byteAt(1) === 82) {
                  return new Ok(new UniversalResourceIdentifier());
                } else {
                  return new Error(undefined);
                }
              } else {
                return new Error(undefined);
              }
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else if (bytes.byteAt(1) === 83) {
                return new Ok(new UnsignedShort());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 83) {
              return new Ok(new SignedShort());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 78) {
                return new Ok(new Unknown());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 83) {
              return new Ok(new UnsignedShort());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 80) {
          if (bytes.byteAt(1) === 78) {
            return new Ok(new PersonName());
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new SignedLong());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 83) {
              return new Ok(new SignedShort());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new SignedVeryLong());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 76) {
              return new Ok(new UnsignedLong());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 83) {
              return new Ok(new UnsignedShort());
            } else if (bytes.byteAt(1) === 86) {
              return new Ok(new UnsignedVeryLong());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 83) {
          if (bytes.byteAt(1) === 72) {
            return new Ok(new ShortString());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new SignedLong());
          } else if (bytes.byteAt(1) === 81) {
            return new Ok(new Sequence());
          } else if (bytes.byteAt(1) === 83) {
            return new Ok(new SignedShort());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new SignedVeryLong());
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
          return new Ok(new Time());
        } else if (bytes.byteAt(0) === 85) {
          if (bytes.byteAt(1) === 67) {
            return new Ok(new UnlimitedCharacters());
          } else if (bytes.byteAt(1) === 73) {
            return new Ok(new UniqueIdentifier());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new UnsignedLong());
          } else if (bytes.byteAt(1) === 78) {
            return new Ok(new Unknown());
          } else if (bytes.byteAt(1) === 82) {
            return new Ok(new UniversalResourceIdentifier());
          } else if (bytes.byteAt(1) === 83) {
            return new Ok(new UnsignedShort());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new UnsignedVeryLong());
          } else {
            return new Error(undefined);
          }
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else if (bytes.byteAt(0) === 79) {
      if (bytes.bitSize === 16) {
        if (bytes.byteAt(1) === 66) {
          return new Ok(new OtherByteString());
        } else if (bytes.byteAt(1) === 68) {
          return new Ok(new OtherDoubleString());
        } else if (bytes.byteAt(1) === 70) {
          return new Ok(new OtherFloatString());
        } else if (bytes.byteAt(1) === 76) {
          return new Ok(new OtherLongString());
        } else if (bytes.byteAt(1) === 86) {
          return new Ok(new OtherVeryLongString());
        } else if (bytes.byteAt(1) === 87) {
          return new Ok(new OtherWordString());
        } else if (bytes.byteAt(0) === 80) {
          if (bytes.byteAt(1) === 78) {
            return new Ok(new PersonName());
          } else if (bytes.byteAt(0) === 83) {
            if (bytes.byteAt(1) === 72) {
              return new Ok(new ShortString());
            } else if (bytes.byteAt(1) === 81) {
              return new Ok(new Sequence());
            } else if (bytes.byteAt(1) === 83) {
              return new Ok(new SignedShort());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new ShortText());
            } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
              return new Ok(new Time());
            } else if (bytes.byteAt(0) === 85) {
              if (bytes.byteAt(1) === 67) {
                return new Ok(new UnlimitedCharacters());
              } else if (bytes.byteAt(1) === 73) {
                return new Ok(new UniqueIdentifier());
              } else if (bytes.byteAt(1) === 82) {
                return new Ok(new UniversalResourceIdentifier());
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else if (bytes.byteAt(1) === 83) {
              return new Ok(new UnsignedShort());
            } else if (bytes.byteAt(1) === 84) {
              return new Ok(new UnlimitedText());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 83) {
          if (bytes.byteAt(1) === 72) {
            return new Ok(new ShortString());
          } else if (bytes.byteAt(1) === 81) {
            return new Ok(new Sequence());
          } else if (bytes.byteAt(1) === 83) {
            return new Ok(new SignedShort());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new ShortText());
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 78) {
              return new Ok(new Unknown());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
          return new Ok(new Time());
        } else if (bytes.byteAt(0) === 85) {
          if (bytes.byteAt(1) === 67) {
            return new Ok(new UnlimitedCharacters());
          } else if (bytes.byteAt(1) === 73) {
            return new Ok(new UniqueIdentifier());
          } else if (bytes.byteAt(1) === 78) {
            return new Ok(new Unknown());
          } else if (bytes.byteAt(1) === 82) {
            return new Ok(new UniversalResourceIdentifier());
          } else if (bytes.byteAt(1) === 83) {
            return new Ok(new UnsignedShort());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new UnlimitedText());
          } else {
            return new Error(undefined);
          }
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else if (bytes.byteAt(0) === 80) {
      if (bytes.bitSize === 16) {
        if (bytes.byteAt(1) === 78) {
          return new Ok(new PersonName());
        } else if (bytes.byteAt(0) === 83) {
          if (bytes.byteAt(1) === 72) {
            return new Ok(new ShortString());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new SignedLong());
          } else if (bytes.byteAt(1) === 81) {
            return new Ok(new Sequence());
          } else if (bytes.byteAt(1) === 83) {
            return new Ok(new SignedShort());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new ShortText());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new SignedVeryLong());
          } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
            return new Ok(new Time());
          } else if (bytes.byteAt(0) === 85) {
            if (bytes.byteAt(1) === 67) {
              return new Ok(new UnlimitedCharacters());
            } else if (bytes.byteAt(1) === 73) {
              return new Ok(new UniqueIdentifier());
            } else if (bytes.byteAt(1) === 82) {
              return new Ok(new UniversalResourceIdentifier());
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
          return new Ok(new Time());
        } else if (bytes.byteAt(0) === 85) {
          if (bytes.byteAt(1) === 67) {
            return new Ok(new UnlimitedCharacters());
          } else if (bytes.byteAt(1) === 73) {
            return new Ok(new UniqueIdentifier());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new UnsignedLong());
          } else if (bytes.byteAt(1) === 82) {
            return new Ok(new UniversalResourceIdentifier());
          } else if (bytes.byteAt(1) === 83) {
            return new Ok(new UnsignedShort());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new UnlimitedText());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new UnsignedVeryLong());
          } else {
            return new Error(undefined);
          }
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else if (bytes.byteAt(0) === 83) {
      if (bytes.bitSize === 16) {
        if (bytes.byteAt(1) === 72) {
          return new Ok(new ShortString());
        } else if (bytes.byteAt(1) === 76) {
          return new Ok(new SignedLong());
        } else if (bytes.byteAt(1) === 81) {
          return new Ok(new Sequence());
        } else if (bytes.byteAt(1) === 83) {
          return new Ok(new SignedShort());
        } else if (bytes.byteAt(1) === 84) {
          return new Ok(new ShortText());
        } else if (bytes.byteAt(1) === 86) {
          return new Ok(new SignedVeryLong());
        } else if (bytes.byteAt(0) === 84 && bytes.byteAt(1) === 77) {
          return new Ok(new Time());
        } else if (bytes.byteAt(0) === 85) {
          if (bytes.byteAt(1) === 67) {
            return new Ok(new UnlimitedCharacters());
          } else if (bytes.byteAt(1) === 73) {
            return new Ok(new UniqueIdentifier());
          } else if (bytes.byteAt(1) === 78) {
            return new Ok(new Unknown());
          } else if (bytes.byteAt(1) === 82) {
            return new Ok(new UniversalResourceIdentifier());
          } else {
            return new Error(undefined);
          }
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else if (bytes.byteAt(0) === 84) {
      if (bytes.bitSize === 16) {
        if (bytes.byteAt(1) === 77) {
          return new Ok(new Time());
        } else if (bytes.byteAt(0) === 85) {
          if (bytes.byteAt(1) === 67) {
            return new Ok(new UnlimitedCharacters());
          } else if (bytes.byteAt(1) === 73) {
            return new Ok(new UniqueIdentifier());
          } else if (bytes.byteAt(1) === 76) {
            return new Ok(new UnsignedLong());
          } else if (bytes.byteAt(1) === 78) {
            return new Ok(new Unknown());
          } else if (bytes.byteAt(1) === 82) {
            return new Ok(new UniversalResourceIdentifier());
          } else if (bytes.byteAt(1) === 83) {
            return new Ok(new UnsignedShort());
          } else if (bytes.byteAt(1) === 84) {
            return new Ok(new UnlimitedText());
          } else if (bytes.byteAt(1) === 86) {
            return new Ok(new UnsignedVeryLong());
          } else {
            return new Error(undefined);
          }
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    } else if (bytes.byteAt(0) === 85 && bytes.bitSize === 16) {
      if (bytes.byteAt(1) === 67) {
        return new Ok(new UnlimitedCharacters());
      } else if (bytes.byteAt(1) === 73) {
        return new Ok(new UniqueIdentifier());
      } else if (bytes.byteAt(1) === 76) {
        return new Ok(new UnsignedLong());
      } else if (bytes.byteAt(1) === 78) {
        return new Ok(new Unknown());
      } else if (bytes.byteAt(1) === 82) {
        return new Ok(new UniversalResourceIdentifier());
      } else if (bytes.byteAt(1) === 83) {
        return new Ok(new UnsignedShort());
      } else if (bytes.byteAt(1) === 84) {
        return new Ok(new UnlimitedText());
      } else if (bytes.byteAt(1) === 86) {
        return new Ok(new UnsignedVeryLong());
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

/**
 * Returns the human-readable name of a value representation, e.g.
 * `CodeString`, `AttributeTag`.
 */
export function name(vr) {
  if (vr instanceof AgeString) {
    return "AgeString";
  } else if (vr instanceof ApplicationEntity) {
    return "ApplicationEntity";
  } else if (vr instanceof AttributeTag) {
    return "AttributeTag";
  } else if (vr instanceof CodeString) {
    return "CodeString";
  } else if (vr instanceof Date) {
    return "Date";
  } else if (vr instanceof DateTime) {
    return "DateTime";
  } else if (vr instanceof DecimalString) {
    return "DecimalString";
  } else if (vr instanceof FloatingPointDouble) {
    return "FloatingPointDouble";
  } else if (vr instanceof FloatingPointSingle) {
    return "FloatingPointSingle";
  } else if (vr instanceof IntegerString) {
    return "IntegerString";
  } else if (vr instanceof LongString) {
    return "LongString";
  } else if (vr instanceof LongText) {
    return "LongText";
  } else if (vr instanceof OtherByteString) {
    return "OtherByteString";
  } else if (vr instanceof OtherDoubleString) {
    return "OtherDoubleString";
  } else if (vr instanceof OtherFloatString) {
    return "OtherFloatString";
  } else if (vr instanceof OtherLongString) {
    return "OtherLongString";
  } else if (vr instanceof OtherVeryLongString) {
    return "OtherVeryLongString";
  } else if (vr instanceof OtherWordString) {
    return "OtherWordString";
  } else if (vr instanceof PersonName) {
    return "PersonName";
  } else if (vr instanceof Sequence) {
    return "Sequence";
  } else if (vr instanceof ShortString) {
    return "ShortString";
  } else if (vr instanceof ShortText) {
    return "ShortText";
  } else if (vr instanceof SignedLong) {
    return "SignedLong";
  } else if (vr instanceof SignedShort) {
    return "SignedShort";
  } else if (vr instanceof SignedVeryLong) {
    return "SignedVeryLong";
  } else if (vr instanceof Time) {
    return "Time";
  } else if (vr instanceof UniqueIdentifier) {
    return "UniqueIdentifier";
  } else if (vr instanceof UniversalResourceIdentifier) {
    return "UniversalResourceIdentifier";
  } else if (vr instanceof Unknown) {
    return "Unknown";
  } else if (vr instanceof UnlimitedCharacters) {
    return "UnlimitedCharacters";
  } else if (vr instanceof UnlimitedText) {
    return "UnlimitedText";
  } else if (vr instanceof UnsignedLong) {
    return "UnsignedLong";
  } else if (vr instanceof UnsignedShort) {
    return "UnsignedShort";
  } else {
    return "UnsignedVeryLong";
  }
}

/**
 * Returns whether a value representation stores string data.
 */
export function is_string(vr) {
  return ((((((((((((((((isEqual(vr, new AgeString())) || (isEqual(
    vr,
    new ApplicationEntity()
  ))) || (isEqual(vr, new CodeString()))) || (isEqual(vr, new Date()))) || (isEqual(
    vr,
    new DateTime()
  ))) || (isEqual(vr, new DecimalString()))) || (isEqual(
    vr,
    new IntegerString()
  ))) || (isEqual(vr, new LongString()))) || (isEqual(vr, new LongText()))) || (isEqual(
    vr,
    new PersonName()
  ))) || (isEqual(vr, new ShortString()))) || (isEqual(vr, new ShortText()))) || (isEqual(
    vr,
    new Time()
  ))) || (isEqual(vr, new UniqueIdentifier()))) || (isEqual(
    vr,
    new UniversalResourceIdentifier()
  ))) || (isEqual(vr, new UnlimitedCharacters()))) || (isEqual(
    vr,
    new UnlimitedText()
  ));
}

/**
 * Returns whether a value representation stores string data that is UTF-8
 * encoded and can therefore store any Unicode codepoint.
 */
export function is_encoded_string(vr) {
  return ((((((isEqual(vr, new LongString())) || (isEqual(vr, new LongText()))) || (isEqual(
    vr,
    new PersonName()
  ))) || (isEqual(vr, new ShortString()))) || (isEqual(vr, new ShortText()))) || (isEqual(
    vr,
    new UnlimitedCharacters()
  ))) || (isEqual(vr, new UnlimitedText()));
}

/**
 * Appends the correct padding byte for the given value representation if the
 * bytes are not of even length.
 */
export function pad_bytes_to_even_length(vr, bytes) {
  if (vr instanceof UniqueIdentifier) {
    return $bit_array_utils.pad_to_even_length(bytes, 0);
  } else {
    let $ = is_string(vr);
    if ($) {
      return $bit_array_utils.pad_to_even_length(bytes, 0x20);
    } else {
      return bytes;
    }
  }
}

/**
 * Returns the length requirements for a value representation. See the
 * `LengthRequirements` type for details.
 */
export function length_requirements(vr) {
  if (vr instanceof AgeString) {
    return new LengthRequirements(4, new None(), new None());
  } else if (vr instanceof ApplicationEntity) {
    return new LengthRequirements(16, new None(), new None());
  } else if (vr instanceof AttributeTag) {
    return new LengthRequirements(0xFFFC, new Some(4), new None());
  } else if (vr instanceof CodeString) {
    return new LengthRequirements(0xFFFE, new None(), new Some(16));
  } else if (vr instanceof Date) {
    return new LengthRequirements(8, new None(), new None());
  } else if (vr instanceof DateTime) {
    return new LengthRequirements(26, new None(), new None());
  } else if (vr instanceof DecimalString) {
    return new LengthRequirements(0xFFFE, new None(), new Some(16));
  } else if (vr instanceof FloatingPointDouble) {
    return new LengthRequirements(0xFFF8, new Some(8), new None());
  } else if (vr instanceof FloatingPointSingle) {
    return new LengthRequirements(0xFFFC, new Some(4), new None());
  } else if (vr instanceof IntegerString) {
    return new LengthRequirements(0xFFFE, new None(), new Some(12));
  } else if (vr instanceof LongString) {
    return new LengthRequirements(0xFFFE, new None(), new Some(64));
  } else if (vr instanceof LongText) {
    return new LengthRequirements(0xFFFE, new None(), new Some(10_240));
  } else if (vr instanceof OtherByteString) {
    return new LengthRequirements(0xFFFFFFFE, new Some(2), new None());
  } else if (vr instanceof OtherDoubleString) {
    return new LengthRequirements(0xFFFFFFF8, new Some(8), new None());
  } else if (vr instanceof OtherFloatString) {
    return new LengthRequirements(0xFFFFFFFC, new Some(4), new None());
  } else if (vr instanceof OtherLongString) {
    return new LengthRequirements(0xFFFFFFFC, new Some(4), new None());
  } else if (vr instanceof OtherVeryLongString) {
    return new LengthRequirements(0xFFFFFFF8, new Some(8), new None());
  } else if (vr instanceof OtherWordString) {
    return new LengthRequirements(0xFFFFFFFE, new Some(2), new None());
  } else if (vr instanceof PersonName) {
    return new LengthRequirements(0xFFFE, new None(), new Some(324));
  } else if (vr instanceof Sequence) {
    return new LengthRequirements(0, new None(), new None());
  } else if (vr instanceof ShortString) {
    return new LengthRequirements(0xFFFE, new None(), new Some(16));
  } else if (vr instanceof ShortText) {
    return new LengthRequirements(0xFFFE, new None(), new Some(1024));
  } else if (vr instanceof SignedLong) {
    return new LengthRequirements(0xFFFC, new Some(4), new None());
  } else if (vr instanceof SignedShort) {
    return new LengthRequirements(0xFFFE, new Some(2), new None());
  } else if (vr instanceof SignedVeryLong) {
    return new LengthRequirements(0xFFFFFFF8, new Some(8), new None());
  } else if (vr instanceof Time) {
    return new LengthRequirements(14, new None(), new None());
  } else if (vr instanceof UniqueIdentifier) {
    return new LengthRequirements(0xFFFE, new None(), new Some(64));
  } else if (vr instanceof UniversalResourceIdentifier) {
    return new LengthRequirements(0xFFFFFFFE, new None(), new None());
  } else if (vr instanceof Unknown) {
    return new LengthRequirements(0xFFFFFFFE, new None(), new None());
  } else if (vr instanceof UnlimitedCharacters) {
    return new LengthRequirements(0xFFFFFFFE, new None(), new None());
  } else if (vr instanceof UnlimitedText) {
    return new LengthRequirements(0xFFFFFFFE, new None(), new None());
  } else if (vr instanceof UnsignedLong) {
    return new LengthRequirements(0xFFFC, new Some(4), new None());
  } else if (vr instanceof UnsignedShort) {
    return new LengthRequirements(0xFFFE, new Some(2), new None());
  } else {
    return new LengthRequirements(0xFFF8, new Some(8), new None());
  }
}

/**
 * Swaps the endianness of data for a value representation.
 */
export function swap_endianness(vr, bytes) {
  if (vr instanceof AttributeTag) {
    return $endian.swap_16_bit(bytes, toList([]));
  } else if (vr instanceof FloatingPointDouble) {
    return $endian.swap_64_bit(bytes, toList([]));
  } else if (vr instanceof FloatingPointSingle) {
    return $endian.swap_32_bit(bytes, toList([]));
  } else if (vr instanceof OtherDoubleString) {
    return $endian.swap_64_bit(bytes, toList([]));
  } else if (vr instanceof OtherFloatString) {
    return $endian.swap_32_bit(bytes, toList([]));
  } else if (vr instanceof OtherLongString) {
    return $endian.swap_32_bit(bytes, toList([]));
  } else if (vr instanceof OtherVeryLongString) {
    return $endian.swap_64_bit(bytes, toList([]));
  } else if (vr instanceof OtherWordString) {
    return $endian.swap_16_bit(bytes, toList([]));
  } else if (vr instanceof SignedLong) {
    return $endian.swap_32_bit(bytes, toList([]));
  } else if (vr instanceof SignedShort) {
    return $endian.swap_16_bit(bytes, toList([]));
  } else if (vr instanceof SignedVeryLong) {
    return $endian.swap_64_bit(bytes, toList([]));
  } else if (vr instanceof UnsignedLong) {
    return $endian.swap_32_bit(bytes, toList([]));
  } else if (vr instanceof UnsignedShort) {
    return $endian.swap_16_bit(bytes, toList([]));
  } else if (vr instanceof UnsignedVeryLong) {
    return $endian.swap_64_bit(bytes, toList([]));
  } else {
    return bytes;
  }
}

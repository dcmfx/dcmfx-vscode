import { Ok, Error, toList, BitArray } from "./gleam.mjs";
import { Lt, Eq, Gt } from "../gleam_stdlib/gleam/order.mjs";
import { DecodeError } from "../gleam_stdlib/gleam/dynamic.mjs";
import { BigEndian, Signed } from "./bigi.mjs";

export function from(int) {
  return BigInt(int);
}

export function from_string(string) {
  try {
    return new Ok(BigInt(string));
  } catch {
    return new Error(undefined);
  }
}

export function from_bytes(bit_array, endianness, signedness) {
  let value = 0n;

  // Read bytes as an unsigned integer value
  if (endianness instanceof BigEndian) {
    for (let i = 0; i < bit_array.length; i++) {
      value = value * 256n + BigInt(bit_array.byteAt(i));
    }
  } else {
    for (let i = bit_array.length - 1; i >= 0; i--) {
      value = value * 256n + BigInt(bit_array.byteAt(i));
    }
  }

  if (signedness instanceof Signed) {
    const byteSize = BigInt(bit_array.length);

    const highBit = 2n ** (byteSize * 8n - 1n);

    // If the high bit is set and this is a signed integer, reinterpret as
    // two's complement
    if (value >= highBit) {
      value -= highBit * 2n;
    }
  }

  return new Ok(value);
}

export function to(bigint) {
  if (bigint > Number.MAX_SAFE_INTEGER || bigint < Number.MIN_SAFE_INTEGER) {
    return new Error(undefined);
  } else {
    return new Ok(Number(bigint));
  }
}

export function to_string(bigint) {
  return bigint.toString();
}

export function to_bytes(bigint, endianness, signedness, byte_count) {
  const bit_count = BigInt(byte_count * 8);

  if (bit_count < 8n) {
    return new Error(undefined);
  }

  let range_min = 0n;
  let range_max = 0n;

  // Error if the value is out of range for the available bits
  if (signedness instanceof Signed) {
    range_min = -(2n ** (bit_count - 1n));
    range_max = -range_min - 1n;
  } else {
    range_max = 2n ** bit_count - 1n;
  }

  if (bigint < range_min || bigint > range_max) {
    return new Error(undefined);
  }

  // Convert negative number to two's complement representation
  if (bigint < 0) {
    bigint = (1n << bit_count) + bigint;
  }

  const byteArray = new Uint8Array(byte_count);

  if (endianness instanceof BigEndian) {
    for (let i = byteArray.length - 1; i >= 0; i--) {
      const byte = bigint % 256n;
      byteArray[i] = Number(byte);
      bigint = (bigint - byte) / 256n;
    }
  } else {
    for (let i = 0; i < byteArray.length; i++) {
      const byte = bigint % 256n;
      byteArray[i] = Number(byte);
      bigint = (bigint - byte) / 256n;
    }
  }

  return new Ok(new BitArray(byteArray));
}

export function zero() {
  return 0n;
}

export function compare(a, b) {
  if (a < b) {
    return new Lt();
  } else if (a > b) {
    return new Gt();
  } else {
    return new Eq();
  }
}

export function absolute(bigint) {
  if (bigint < 0) {
    return -bigint;
  } else {
    return bigint;
  }
}

export function negate(bigint) {
  return -bigint;
}

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0n) {
    return 0n;
  }

  return a / b;
}

export function divide_no_zero(a, b) {
  if (b === 0n) {
    return new Error(undefined);
  }

  return new Ok(divide(a, b));
}

export function remainder(a, b) {
  if (b === 0n) {
    return 0n;
  }

  return a % b;
}

export function remainder_no_zero(a, b) {
  if (b === 0n) {
    return new Error(undefined);
  }

  return new Ok(remainder(a, b));
}

export function modulo(a, b) {
  if (b === 0n) {
    return 0n;
  }

  return ((a % b) + b) % b;
}

export function modulo_no_zero(a, b) {
  if (b === 0n) {
    return new Error(undefined);
  }

  return new Ok(modulo(a, b));
}

export function power(a, b) {
  if (b < 0) {
    return new Error(undefined);
  }

  return new Ok(a ** b);
}

export function decode(dyn) {
  const dynType = typeof dyn;
  if (dynType === "bigint") {
    return new Ok(dyn);
  } else {
    return new Error(toList([new DecodeError("bigint", dynType, toList([]))]));
  }
}

export function bitwise_and(a, b) {
  return a & b;
}

export function bitwise_exclusive_or(a, b) {
  return a ^ b;
}

export function bitwise_not(a) {
  return ~a;
}

export function bitwise_or(a, b) {
  return a | b;
}

export function bitwise_shift_left(a, b) {
  return a << BigInt(b);
}

export function bitwise_shift_right(a, b) {
  return a >> BigInt(b);
}

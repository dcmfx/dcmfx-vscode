export function and(a: boolean, b: boolean): boolean;

export function or(a: boolean, b: boolean): boolean;

export function negate(bool: boolean): boolean;

export function nor(a: boolean, b: boolean): boolean;

export function nand(a: boolean, b: boolean): boolean;

export function exclusive_or(a: boolean, b: boolean): boolean;

export function exclusive_nor(a: boolean, b: boolean): boolean;

export function to_string(bool: boolean): string;

export function guard<BXD>(
  requirement: boolean,
  consequence: BXD,
  alternative: () => BXD
): BXD;

export function lazy_guard<BXE>(
  requirement: boolean,
  consequence: () => BXE,
  alternative: () => BXE
): BXE;

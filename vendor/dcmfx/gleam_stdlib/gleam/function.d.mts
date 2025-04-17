export function flip<EFI, EFJ, EFK>(fun: (x0: EFI, x1: EFJ) => EFK): (
  x0: EFJ,
  x1: EFI
) => EFK;

export function identity<EFL>(x: EFL): EFL;

export function tap<EFM>(arg: EFM, effect: (x0: EFM) => any): EFM;

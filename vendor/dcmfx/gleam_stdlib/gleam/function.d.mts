export function flip<EFO, EFP, EFQ>(fun: (x0: EFO, x1: EFP) => EFQ): (
  x0: EFP,
  x1: EFO
) => EFQ;

export function identity<EFR>(x: EFR): EFR;

export function tap<EFS>(arg: EFS, effect: (x0: EFS) => any): EFS;

export function flip<EFP, EFQ, EFR>(fun: (x0: EFP, x1: EFQ) => EFR): (
  x0: EFQ,
  x1: EFP
) => EFR;

export function identity<EFS>(x: EFS): EFS;

export function tap<EFT>(arg: EFT, effect: (x0: EFT) => any): EFT;

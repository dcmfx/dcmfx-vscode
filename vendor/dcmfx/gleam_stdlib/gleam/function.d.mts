export function flip<EEG, EEH, EEI>(fun: (x0: EEG, x1: EEH) => EEI): (
  x0: EEH,
  x1: EEG
) => EEI;

export function identity<EEJ>(x: EEJ): EEJ;

export function tap<EEK>(arg: EEK, effect: (x0: EEK) => any): EEK;

export function compose<DOM, DON, DOO>(
  fun1: (x0: DOM) => DON,
  fun2: (x0: DON) => DOO
): (x0: DOM) => DOO;

export function curry2<DOP, DOQ, DOR>(fun: (x0: DOP, x1: DOQ) => DOR): (x0: DOP) => (
  x0: DOQ
) => DOR;

export function curry3<DOT, DOU, DOV, DOW>(
  fun: (x0: DOT, x1: DOU, x2: DOV) => DOW
): (x0: DOT) => (x0: DOU) => (x0: DOV) => DOW;

export function curry4<DOY, DOZ, DPA, DPB, DPC>(
  fun: (x0: DOY, x1: DOZ, x2: DPA, x3: DPB) => DPC
): (x0: DOY) => (x0: DOZ) => (x0: DPA) => (x0: DPB) => DPC;

export function curry5<DPE, DPF, DPG, DPH, DPI, DPJ>(
  fun: (x0: DPE, x1: DPF, x2: DPG, x3: DPH, x4: DPI) => DPJ
): (x0: DPE) => (x0: DPF) => (x0: DPG) => (x0: DPH) => (x0: DPI) => DPJ;

export function curry6<DPL, DPM, DPN, DPO, DPP, DPQ, DPR>(
  fun: (x0: DPL, x1: DPM, x2: DPN, x3: DPO, x4: DPP, x5: DPQ) => DPR
): (x0: DPL) => (x0: DPM) => (x0: DPN) => (x0: DPO) => (x0: DPP) => (x0: DPQ) => DPR;

export function flip<DPT, DPU, DPV>(fun: (x0: DPT, x1: DPU) => DPV): (
  x0: DPU,
  x1: DPT
) => DPV;

export function identity<DPW>(x: DPW): DPW;

export function constant<DPX>(value: DPX): (x0: any) => DPX;

export function tap<DPZ>(arg: DPZ, effect: (x0: DPZ) => any): DPZ;

export function apply1<DQB, DQC>(fun: (x0: DQB) => DQC, arg1: DQB): DQC;

export function apply2<DQD, DQE, DQF>(
  fun: (x0: DQD, x1: DQE) => DQF,
  arg1: DQD,
  arg2: DQE
): DQF;

export function apply3<DQG, DQH, DQI, DQJ>(
  fun: (x0: DQG, x1: DQH, x2: DQI) => DQJ,
  arg1: DQG,
  arg2: DQH,
  arg3: DQI
): DQJ;

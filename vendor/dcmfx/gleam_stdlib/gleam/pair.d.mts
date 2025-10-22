export function first<CKU>(pair: [CKU, any]): CKU;

export function second<CKX>(pair: [any, CKX]): CKX;

export function swap<CKY, CKZ>(pair: [CKY, CKZ]): [CKZ, CKY];

export function map_first<CLA, CLB, CLC>(
  pair: [CLA, CLB],
  fun: (x0: CLA) => CLC
): [CLC, CLB];

export function map_second<CLD, CLE, CLF>(
  pair: [CLD, CLE],
  fun: (x0: CLE) => CLF
): [CLD, CLF];

export function new$<CLG, CLH>(first: CLG, second: CLH): [CLG, CLH];

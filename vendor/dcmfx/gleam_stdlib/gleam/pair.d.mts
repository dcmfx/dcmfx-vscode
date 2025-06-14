export function first<COI>(pair: [COI, any]): COI;

export function second<COL>(pair: [any, COL]): COL;

export function swap<COM, CON>(pair: [COM, CON]): [CON, COM];

export function map_first<COO, COP, COQ>(
  pair: [COO, COP],
  fun: (x0: COO) => COQ
): [COQ, COP];

export function map_second<COR, COS, COT>(
  pair: [COR, COS],
  fun: (x0: COS) => COT
): [COR, COT];

export function new$<COU, COV>(first: COU, second: COV): [COU, COV];

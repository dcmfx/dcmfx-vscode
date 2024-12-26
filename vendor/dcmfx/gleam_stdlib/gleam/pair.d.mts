export function first<XQ>(pair: [XQ, any]): XQ;

export function second<XT>(pair: [any, XT]): XT;

export function swap<XU, XV>(pair: [XU, XV]): [XV, XU];

export function map_first<XW, XX, XY>(pair: [XW, XX], fun: (x0: XW) => XY): [
  XY,
  XX
];

export function map_second<XZ, YA, YB>(pair: [XZ, YA], fun: (x0: YA) => YB): [
  XZ,
  YB
];

export function new$<YC, YD>(first: YC, second: YD): [YC, YD];

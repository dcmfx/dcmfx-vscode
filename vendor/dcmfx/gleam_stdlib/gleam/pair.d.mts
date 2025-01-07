export function first<XR>(pair: [XR, any]): XR;

export function second<XU>(pair: [any, XU]): XU;

export function swap<XV, XW>(pair: [XV, XW]): [XW, XV];

export function map_first<XX, XY, XZ>(pair: [XX, XY], fun: (x0: XX) => XZ): [
  XZ,
  XY
];

export function map_second<YA, YB, YC>(pair: [YA, YB], fun: (x0: YB) => YC): [
  YA,
  YC
];

export function new$<YD, YE>(first: YD, second: YE): [YD, YE];

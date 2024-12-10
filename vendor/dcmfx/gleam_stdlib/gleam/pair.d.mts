export function first<XH>(pair: [XH, any]): XH;

export function second<XK>(pair: [any, XK]): XK;

export function swap<XL, XM>(pair: [XL, XM]): [XM, XL];

export function map_first<XN, XO, XP>(pair: [XN, XO], fun: (x0: XN) => XP): [
  XP,
  XO
];

export function map_second<XQ, XR, XS>(pair: [XQ, XR], fun: (x0: XR) => XS): [
  XQ,
  XS
];

export function new$<XT, XU>(first: XT, second: XU): [XT, XU];

export function compose<EGH, EGI, EGJ>(
  fun1: (x0: EGH) => EGI,
  fun2: (x0: EGI) => EGJ
): (x0: EGH) => EGJ;

export function curry2<EGK, EGL, EGM>(fun: (x0: EGK, x1: EGL) => EGM): (x0: EGK) => (
  x0: EGL
) => EGM;

export function curry3<EGO, EGP, EGQ, EGR>(
  fun: (x0: EGO, x1: EGP, x2: EGQ) => EGR
): (x0: EGO) => (x0: EGP) => (x0: EGQ) => EGR;

export function curry4<EGT, EGU, EGV, EGW, EGX>(
  fun: (x0: EGT, x1: EGU, x2: EGV, x3: EGW) => EGX
): (x0: EGT) => (x0: EGU) => (x0: EGV) => (x0: EGW) => EGX;

export function curry5<EGZ, EHA, EHB, EHC, EHD, EHE>(
  fun: (x0: EGZ, x1: EHA, x2: EHB, x3: EHC, x4: EHD) => EHE
): (x0: EGZ) => (x0: EHA) => (x0: EHB) => (x0: EHC) => (x0: EHD) => EHE;

export function curry6<EHG, EHH, EHI, EHJ, EHK, EHL, EHM>(
  fun: (x0: EHG, x1: EHH, x2: EHI, x3: EHJ, x4: EHK, x5: EHL) => EHM
): (x0: EHG) => (x0: EHH) => (x0: EHI) => (x0: EHJ) => (x0: EHK) => (x0: EHL) => EHM;

export function flip<EHO, EHP, EHQ>(fun: (x0: EHO, x1: EHP) => EHQ): (
  x0: EHP,
  x1: EHO
) => EHQ;

export function identity<EHR>(x: EHR): EHR;

export function constant<EHS>(value: EHS): (x0: any) => EHS;

export function tap<EHU>(arg: EHU, effect: (x0: EHU) => any): EHU;

export function apply1<EHW, EHX>(fun: (x0: EHW) => EHX, arg1: EHW): EHX;

export function apply2<EHY, EHZ, EIA>(
  fun: (x0: EHY, x1: EHZ) => EIA,
  arg1: EHY,
  arg2: EHZ
): EIA;

export function apply3<EIB, EIC, EID, EIE>(
  fun: (x0: EIB, x1: EIC, x2: EID) => EIE,
  arg1: EIB,
  arg2: EIC,
  arg3: EID
): EIE;

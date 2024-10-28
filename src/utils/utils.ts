export const EPS = 10e-7;
export const isZero = (d: number, e = EPS) =>
  d < Math.abs(e) && d > -Math.abs(e);
export const isAbout = (src: number, target: number, e = EPS) =>
  src < target + Math.abs(e) && src > target - Math.abs(e);
export const correct = (x: number, e = EPS) => (isZero(x, e) ? 0 : x);

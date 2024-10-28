import { correct, EPS } from "../utils/utils";

export function solve(a: number, b: number, c: number, e = EPS) {
  [a, b, c, e].forEach((x) => {
    if (typeof x !== "number" || Number.isNaN(x) || !Number.isFinite(x))
      throw new Error("Error: wrong args.");
  });

  const [cA, cB, cC] = [correct(a), correct(b), correct(c)];
  if (cA === 0) throw Error("Error: a === 0.");
  const cD = correct(cB * cB - 4 * cA * cC);
  if (cD < 0) return [];
  const sqrtD = Math.sqrt(cD);
  const a2 = a * 2;
  if (cD === 0) return [-b / a2];
  if (cD > 0) return [(-b + sqrtD) / a2, (-b - sqrtD) / a2];
}

console.log(solve(1, 0, EPS / 10));

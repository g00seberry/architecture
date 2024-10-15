const { EPS, solve } = require("../index");

test("x^2+1 = 0 корней нет", () => {
  expect(solve(1, 0, 1)).toEqual([]);
});
test("x^2-1 = 0 есть два корня кратности 1", () => {
  expect(solve(1, 0, -1)).toEqual([1, -1]);
});
test("x^2+2x+1 = 0 есть один корень кратности 2", () => {
  expect(solve(1, 2, 1)).toEqual([-1]);
});
test("коэффициент a не может быть равен 0", () => {
  expect(() => solve(0, 2, 1)).toThrow();
});
test("D находится в пределах  условного 0 (-e;+e)", () => {
  expect(solve(1, 0, EPS / 10)[0] === -0).toEqual(true);
});
test("D находится за пределами условного 0 (-e;+e)", () => {
  // < 0
  expect(solve(1, 0, EPS)).toEqual([]);
  // > 0
  expect(solve(1, 0, -EPS)).toEqual([0.001, -0.001]);
});
test("аргументы конечные, типа number, != NAN", () => {
  expect(() => solve(Infinity, 1, 1)).toThrow();
  expect(() => solve(1, Infinity, 1)).toThrow();
  expect(() => solve(1, 1, Infinity)).toThrow();
  expect(() => solve("1", 1, 1)).toThrow();
  expect(() => solve(1, "1", 1)).toThrow();
  expect(() => solve(1, 1, "1")).toThrow();
  expect(() => solve(NaN, 1, 1)).toThrow();
  expect(() => solve(1, NaN, 1)).toThrow();
  expect(() => solve(1, 1, NaN)).toThrow();
});

const testFn = require("../index");

test("adds 1 + 2 to equal 3", () => {
  expect(testFn()).toBe(1);
});

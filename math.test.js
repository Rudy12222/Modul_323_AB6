const { sum, subtract, multiply, divide } = require("./math");

test("sum: 1 + 2 = 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("subtract: 5 - 2 = 3", () => {
  expect(subtract(5, 2)).toBe(3);
});

test("multiply: 3 * 4 = 12", () => {
  expect(multiply(3, 4)).toBe(12);
});

test("divide: 8 / 2 = 4", () => {
  expect(divide(8, 2)).toBe(4);
});
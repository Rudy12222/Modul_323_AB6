const { MSGS, update } = require("./Update");

describe("Update", () => {
  test("increments counter for ADD", () => {
    const model = { counter: 2, label: "x" };

    const result = update(MSGS.ADD, model);

    expect(result).toEqual({ counter: 3, label: "x" });
    expect(result).not.toBe(model);
  });

  test("decrements counter for SUBTRACT", () => {
    const model = { counter: 2, label: "x" };

    const result = update(MSGS.SUBTRACT, model);

    expect(result).toEqual({ counter: 1, label: "x" });
    expect(result).not.toBe(model);
  });

  test("returns unchanged copy for unknown message", () => {
    const model = { counter: 5, label: "keep" };

    const result = update("RESET", model);

    expect(result).toEqual(model);
    expect(result).not.toBe(model);
  });

  test("treats lowercase add as invalid message (negative case)", () => {
    const model = { counter: 10 };

    const result = update("add", model);

    expect(result.counter).toBe(10);
  });

  test("does not mutate the original model object", () => {
    const model = { counter: 7, nested: { stable: true } };

    update(MSGS.ADD, model);
    update(MSGS.SUBTRACT, model);
    update("UNKNOWN", model);

    expect(model).toEqual({ counter: 7, nested: { stable: true } });
  });
});

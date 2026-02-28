const { view } = require("./View");
const { MSGS } = require("./Update");

describe("View", () => {
  test("renders counter text and two action buttons", () => {
    const vnode = view(jest.fn(), { counter: 42 });
    const [counterNode, actionsNode] = vnode.children;
    const [increaseButton, decreaseButton] = actionsNode.children;

    expect(vnode.tagName).toBe("DIV");
    expect(counterNode.children[0].text).toBe("Count: 42");
    expect(actionsNode.children).toHaveLength(2);
    expect(increaseButton.children[0].text).toBe("+ Increase");
    expect(decreaseButton.children[0].text).toBe("- Decrease");
  });

  test("does not call dispatch while rendering (negative case)", () => {
    const dispatch = jest.fn();

    view(dispatch, { counter: 0 });

    expect(dispatch).not.toHaveBeenCalled();
  });

  test("dispatches ADD when increase button is clicked", () => {
    const dispatch = jest.fn();
    const vnode = view(dispatch, { counter: 1 });
    const increaseButton = vnode.children[1].children[0];

    increaseButton.properties.onclick();

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(MSGS.ADD);
  });

  test("dispatches SUBTRACT when decrease button is clicked", () => {
    const dispatch = jest.fn();
    const vnode = view(dispatch, { counter: 1 });
    const decreaseButton = vnode.children[1].children[1];

    decreaseButton.properties.onclick();

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(MSGS.SUBTRACT);
  });

  test("throws when model is missing (negative case)", () => {
    expect(() => view(jest.fn(), undefined)).toThrow(TypeError);
  });
});

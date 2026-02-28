const hh = require("hyperscript-helpers");
const h = require("virtual-dom/h");
const diff = require("virtual-dom/diff");
const patch = require("virtual-dom/patch");
const createElement = require("virtual-dom/create-element");

const { div, button } = hh(h);

const MSGS = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
};

function view(dispatch, model) {
  const btnStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  return div({ className: "flex flex-col gap-4 items-center" }, [
    div({ className: "text-3xl" }, `Count: ${model.counter}`),
    div({ className: "flex gap-4" }, [
      button({ className: btnStyle, onclick: () => dispatch(MSGS.ADD) }, "➕ Increase"),
      button({ className: btnStyle, onclick: () => dispatch(MSGS.SUBTRACT) }, "➖ Decrease"),
    ]),
  ]);
}

function update(msg, model) {
  switch (msg) {
    case MSGS.ADD:
      return { ...model, counter: model.counter + 1 };
    case MSGS.SUBTRACT:
      return { ...model, counter: model.counter - 1 };
    default:
      return { ...model };
  }
}

// impure code below (not avoidable but controllable)
function app(initModel, updateFn, viewFn, node) {
  let model = initModel;
  let currentView = viewFn(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);

  function dispatch(msg) {
    model = updateFn(msg, model);
    const updatedView = viewFn(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

const initModel = {
  counter: 0,
};

const rootNode = document.getElementById("app");
app(initModel, update, view, rootNode);

module.exports = { MSGS, view, update, app, initModel };
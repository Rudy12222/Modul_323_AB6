const diff = require("virtual-dom/diff");
const patch = require("virtual-dom/patch");
const createElement = require("virtual-dom/create-element");

// Impure code isolated in one place.
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

module.exports = { app };

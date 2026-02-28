const { app } = require("./App");
const { MSGS, update } = require("./Update");
const { initModel } = require("./Model");
const { view } = require("./View");

const rootNode = document.getElementById("app");
app(initModel, update, view, rootNode);

module.exports = { MSGS, view, update, app, initModel };

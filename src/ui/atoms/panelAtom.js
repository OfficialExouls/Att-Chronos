"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.panelAtom = exports.Panel = void 0;
var jotai_1 = require("jotai");
var Panel;
(function (Panel) {
    Panel[Panel["None"] = 0] = "None";
    Panel[Panel["Settings"] = 1] = "Settings";
    Panel[Panel["Spellbook"] = 2] = "Spellbook";
})(Panel = exports.Panel || (exports.Panel = {}));
exports.panelAtom = jotai_1.atom(Panel.None);

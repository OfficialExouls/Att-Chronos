"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var jotai_1 = require("jotai");
var StateProvider = function (_a) {
    var children = _a.children;
    return jsx_runtime_1.jsx(jotai_1.Provider, { children: children }, void 0);
};
exports.StateProvider = StateProvider;

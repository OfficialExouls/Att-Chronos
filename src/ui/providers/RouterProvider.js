"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var RouterProvider = function (_a) {
    var children = _a.children;
    return jsx_runtime_1.jsx(react_router_dom_1.HashRouter, { children: children }, void 0);
};
exports.RouterProvider = RouterProvider;

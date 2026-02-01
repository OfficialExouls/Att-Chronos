"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Providers = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var AuthProvider_1 = require("./AuthProvider");
var RouterProvider_1 = require("./RouterProvider");
var StateProvider_1 = require("./StateProvider");
var Providers = function (_a) {
    var children = _a.children;
    return (jsx_runtime_1.jsx(StateProvider_1.StateProvider, { children: jsx_runtime_1.jsx(AuthProvider_1.AuthProvider, { children: jsx_runtime_1.jsx(RouterProvider_1.RouterProvider, { children: children }, void 0) }, void 0) }, void 0));
};
exports.Providers = Providers;

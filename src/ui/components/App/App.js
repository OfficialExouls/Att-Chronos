"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var electron_1 = require("electron");
var providers_1 = require("@/providers");
var react_router_dom_1 = require("react-router-dom");
var jotai_1 = require("jotai");
var routes_1 = require("@/routes");
var routes_2 = require("@/routes");
var atoms_1 = require("@/atoms");
var App_module_css_1 = __importDefault(require("./App.module.css"));
electron_1.ipcRenderer.on('speech-exit', function (_, reason) {
    console.log(reason);
});
electron_1.ipcRenderer.on('speech-error', function (_, reason, error) {
    console.log(reason, error);
});
var App = function () {
    var hasSession = jotai_1.useAtom(atoms_1.hasSessionAtom)[0];
    return (jsx_runtime_1.jsx(providers_1.Providers, { children: jsx_runtime_1.jsx("div", __assign({ className: App_module_css_1.default.root }, { children: jsx_runtime_1.jsxs(react_router_dom_1.Switch, { children: [jsx_runtime_1.jsx(react_router_dom_1.Route, { exact: true, path: '/', component: routes_1.RootRoute }, void 0),
                    hasSession ? (jsx_runtime_1.jsx(react_router_dom_1.Redirect, { from: '/auth-callback', to: '/' }, void 0)) : (jsx_runtime_1.jsx(react_router_dom_1.Route, { path: '/auth-callback', component: routes_2.AuthCallbackRoute }, void 0))] }, void 0) }), void 0) }, void 0));
};
exports.App = App;

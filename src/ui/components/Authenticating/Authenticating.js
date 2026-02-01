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
exports.Authenticating = exports.AuthenticatingStage = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Authenticating_module_css_1 = __importDefault(require("./Authenticating.module.css"));
var AuthenticatingStage;
(function (AuthenticatingStage) {
    AuthenticatingStage[AuthenticatingStage["Authenticating"] = 0] = "Authenticating";
    AuthenticatingStage[AuthenticatingStage["ExchangingToken"] = 1] = "ExchangingToken";
    AuthenticatingStage[AuthenticatingStage["CreatingSession"] = 2] = "CreatingSession";
    AuthenticatingStage[AuthenticatingStage["Ready"] = 3] = "Ready";
    AuthenticatingStage[AuthenticatingStage["FatalError"] = 4] = "FatalError";
})(AuthenticatingStage = exports.AuthenticatingStage || (exports.AuthenticatingStage = {}));
var Authenticating = function (_a) {
    var stage = _a.stage, error = _a.error;
    switch (stage) {
        case AuthenticatingStage.Authenticating:
            return (jsx_runtime_1.jsxs("div", __assign({ className: Authenticating_module_css_1.default.center }, { children: [jsx_runtime_1.jsx("span", { children: "Authenticating\u2026" }, void 0),
                    jsx_runtime_1.jsxs("small", __assign({ className: Authenticating_module_css_1.default.instructions }, { children: [jsx_runtime_1.jsx("br", {}, void 0), "Please check your browser window to sign in to your Alta Account."] }), void 0)] }), void 0));
        case AuthenticatingStage.ExchangingToken:
            return (jsx_runtime_1.jsxs("div", __assign({ className: Authenticating_module_css_1.default.center }, { children: [jsx_runtime_1.jsx("span", { children: "Exchanging token\u2026" }, void 0),
                    jsx_runtime_1.jsxs("small", __assign({ className: Authenticating_module_css_1.default.instructions }, { children: [jsx_runtime_1.jsx("br", {}, void 0), "Voodoo is retrieving an access token from Alta."] }), void 0)] }), void 0));
        case AuthenticatingStage.CreatingSession:
            return (jsx_runtime_1.jsxs("div", __assign({ className: Authenticating_module_css_1.default.center }, { children: [jsx_runtime_1.jsx("span", { children: "Creating session\u2026" }, void 0),
                    jsx_runtime_1.jsxs("small", __assign({ className: Authenticating_module_css_1.default.instructions }, { children: [jsx_runtime_1.jsx("br", {}, void 0), "Voodoo is creating your play session."] }), void 0)] }), void 0));
        case AuthenticatingStage.Ready:
            return (jsx_runtime_1.jsxs("div", __assign({ className: Authenticating_module_css_1.default.center }, { children: [jsx_runtime_1.jsx("span", { children: "Ready!" }, void 0),
                    jsx_runtime_1.jsxs("small", __assign({ className: Authenticating_module_css_1.default.instructions }, { children: [jsx_runtime_1.jsx("br", {}, void 0), "What Voodoo will you do?"] }), void 0)] }), void 0));
        case AuthenticatingStage.FatalError:
            return (jsx_runtime_1.jsxs("div", __assign({ className: Authenticating_module_css_1.default.center }, { children: [jsx_runtime_1.jsx("span", { children: "Oops!" }, void 0),
                    jsx_runtime_1.jsxs("small", __assign({ className: Authenticating_module_css_1.default.instructions }, { children: [jsx_runtime_1.jsx("br", {}, void 0), "Something went wrong.", jsx_runtime_1.jsx("br", {}, void 0), "Please restart Voodoo."] }), void 0),
                    error && (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx("br", {}, void 0),
                            jsx_runtime_1.jsx("small", __assign({ className: Authenticating_module_css_1.default.error }, { children: error }), void 0)] }, void 0))] }), void 0));
        default:
            return null;
    }
};
exports.Authenticating = Authenticating;

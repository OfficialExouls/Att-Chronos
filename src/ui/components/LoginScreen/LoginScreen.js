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
exports.LoginScreen = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var electron_1 = require("electron");
var react_1 = require("react");
var jotai_1 = require("jotai");
var atoms_1 = require("@/atoms");
var Logo_1 = require("@/components/Logo");
var AltaAuth_1 = require("@/components/AltaAuth");
var LoginScreen_module_css_1 = __importDefault(require("./LoginScreen.module.css"));
var package_json_1 = __importDefault(require("@/../../package.json"));
var LoginScreen = function () {
    var transition = react_1.useRef(null);
    var _a = react_1.useState(false), isSplashFinished = _a[0], finishSplash = _a[1];
    var _b = jotai_1.useAtom(atoms_1.appStageAtom), appStage = _b[0], setAppStage = _b[1];
    var handleToggleDebug = function () {
        electron_1.ipcRenderer.invoke('toggle-dev-tools');
    };
    /**
     * Show the splash screen for at least 4 seconds, even if libraries
     * load faster than that.
     */
    react_1.useEffect(function () {
        setTimeout(function () {
            finishSplash(true);
        }, 4000);
    }, []);
    react_1.useEffect(function () {
        if (!transition.current && isSplashFinished && appStage === atoms_1.AppStage.Splash) {
            transition.current = setTimeout(function () {
                setAppStage(atoms_1.AppStage.Ready);
            }, 1000);
        }
    }, [isSplashFinished, appStage, setAppStage]);
    return (jsx_runtime_1.jsxs("div", __assign({ className: LoginScreen_module_css_1.default.root }, { children: [jsx_runtime_1.jsx("div", __assign({ className: LoginScreen_module_css_1.default.logo }, { children: jsx_runtime_1.jsx(Logo_1.Logo, {}, void 0) }), void 0),
            appStage === atoms_1.AppStage.Ready ? (jsx_runtime_1.jsxs("div", __assign({ className: LoginScreen_module_css_1.default.login, style: { opacity: 1 } }, { children: [jsx_runtime_1.jsx("span", __assign({ className: LoginScreen_module_css_1.default.title }, { children: "Voodoo" }), void 0),
                    jsx_runtime_1.jsxs("span", __assign({ className: LoginScreen_module_css_1.default.subtitle }, { children: ["Magic Mod for", jsx_runtime_1.jsx("br", {}, void 0), "A Township Tale"] }), void 0),
                    jsx_runtime_1.jsx(AltaAuth_1.LoginButton, {}, void 0)] }), void 0)) : (jsx_runtime_1.jsx("div", __assign({ className: LoginScreen_module_css_1.default.loading, style: { opacity: isSplashFinished ? 0 : 1 } }, { children: "Loading\u2026" }), void 0)),
            jsx_runtime_1.jsxs("div", __assign({ className: LoginScreen_module_css_1.default.footer }, { children: [jsx_runtime_1.jsx("div", __assign({ className: LoginScreen_module_css_1.default.debug }, { children: jsx_runtime_1.jsx("button", __assign({ className: LoginScreen_module_css_1.default.button, onClick: handleToggleDebug }, { children: "Toggle debug window" }), void 0) }), void 0),
                    jsx_runtime_1.jsx("div", __assign({ className: LoginScreen_module_css_1.default.discord }, { children: jsx_runtime_1.jsx("a", __assign({ className: LoginScreen_module_css_1.default.link, href: 'https://discord.gg/THy2AVBPHX', title: 'Join the Voodoo Discord server' }, { children: "Join the Voodoo community on Discord" }), void 0) }), void 0),
                    jsx_runtime_1.jsxs("div", __assign({ className: LoginScreen_module_css_1.default.version }, { children: ["v", package_json_1.default.version, " by\u00A0Ethyn\u00A0Wyrmbane"] }), void 0),
                    jsx_runtime_1.jsxs("div", { children: ["Crystal art by", ' ', jsx_runtime_1.jsx("a", __assign({ className: LoginScreen_module_css_1.default.link, href: 'https://twitter.com/ubizozo', title: "UbiZoZo's Twitter" }, { children: "@UbiZoZo" }), void 0)] }, void 0)] }), void 0)] }), void 0));
};
exports.LoginScreen = LoginScreen;

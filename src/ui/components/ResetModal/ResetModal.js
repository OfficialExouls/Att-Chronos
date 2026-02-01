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
exports.ResetModal = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var electron_1 = require("electron");
var jotai_1 = require("jotai");
var atoms_1 = require("@/atoms");
var ResetModal_module_css_1 = __importDefault(require("./ResetModal.module.css"));
var ResetModal = function (_a) {
    var onClose = _a.onClose, onComplete = _a.onComplete;
    var accessToken = jotai_1.useAtom(atoms_1.accessTokenAtom)[0];
    var _b = jotai_1.useAtom(atoms_1.experienceAtom), experience = _b[0], setExperience = _b[1];
    var _c = react_1.useState(null), fatalError = _c[0], setFatalError = _c[1];
    var _d = react_1.useState(false), isResetting = _d[0], setIsResetting = _d[1];
    var hasFreeResets = experience.freeResets > 0;
    var submitReset = function () {
        setFatalError(null);
        setIsResetting(true);
        electron_1.ipcRenderer
            .invoke('reset-upgrades', { accessToken: accessToken, useFreeReset: hasFreeResets })
            .then(function (response) {
            if (response.ok) {
                setExperience(response.result);
                onComplete();
            }
            else {
                console.error(response.error);
                setFatalError(response.error);
            }
            setIsResetting(false);
        })
            .catch(function (error) {
            console.error(JSON.stringify(error, null, 2));
            setFatalError(error.message);
            setIsResetting(false);
        });
    };
    var costText = hasFreeResets
        ? "and your free resets will be reduced to " + (experience.freeResets - 1)
        : 'minus a reset fee of 10% across all magic schools';
    return (jsx_runtime_1.jsx("div", __assign({ className: ResetModal_module_css_1.default.root }, { children: jsx_runtime_1.jsxs("div", __assign({ className: ResetModal_module_css_1.default.modal }, { children: [jsx_runtime_1.jsx("div", __assign({ className: ResetModal_module_css_1.default.header }, { children: "Confirm Reset" }), void 0),
                jsx_runtime_1.jsxs("div", __assign({ className: ResetModal_module_css_1.default.details }, { children: ["You are about to reset all your spell upgrades. You will be refunded all your accumulated XP ", costText, ".", fatalError ? jsx_runtime_1.jsx("div", __assign({ className: ResetModal_module_css_1.default.error }, { children: fatalError }), void 0) : jsx_runtime_1.jsx("div", __assign({ className: ResetModal_module_css_1.default.empty }, { children: "\u00A0" }), void 0)] }), void 0),
                jsx_runtime_1.jsxs("div", __assign({ className: ResetModal_module_css_1.default.actions }, { children: [jsx_runtime_1.jsx("button", __assign({ className: ResetModal_module_css_1.default.action, onClick: onClose, disabled: isResetting }, { children: "Cancel" }), void 0),
                        jsx_runtime_1.jsx("button", __assign({ className: ResetModal_module_css_1.default.action, onClick: submitReset, disabled: isResetting }, { children: fatalError ? 'Retry' : 'Confirm' }), void 0)] }), void 0)] }), void 0) }), void 0));
};
exports.ResetModal = ResetModal;

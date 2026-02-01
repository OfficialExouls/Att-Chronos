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
exports.Experience = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Experience_module_css_1 = __importDefault(require("./Experience.module.css"));
var XP_PER_LEVEL = 1000;
var Experience = function (_a) {
    var onClick = _a.onClick, school = _a.school, total = _a.total, upgrades = _a.upgrades;
    var level = Math.floor(total / XP_PER_LEVEL);
    var progress = total - level * XP_PER_LEVEL;
    var width = (progress / XP_PER_LEVEL) * 100;
    return (jsx_runtime_1.jsxs("button", __assign({ className: Experience_module_css_1.default.root, onClick: onClick }, { children: [jsx_runtime_1.jsx("div", __assign({ className: Experience_module_css_1.default.upgrades }, { children: upgrades }), void 0),
            jsx_runtime_1.jsxs("div", __assign({ className: Experience_module_css_1.default.experience }, { children: [jsx_runtime_1.jsx("div", __assign({ className: Experience_module_css_1.default.school }, { children: school }), void 0),
                    jsx_runtime_1.jsxs("div", __assign({ className: Experience_module_css_1.default.progress }, { children: [jsx_runtime_1.jsx("div", __assign({ className: Experience_module_css_1.default.track }, { children: jsx_runtime_1.jsx("div", { className: Experience_module_css_1.default.bar, style: { width: width + "%" } }, void 0) }), void 0),
                            jsx_runtime_1.jsxs("div", __assign({ className: Experience_module_css_1.default.xp }, { children: [progress, jsx_runtime_1.jsx("span", { children: "XP" }, void 0)] }), void 0),
                            jsx_runtime_1.jsxs("div", __assign({ className: Experience_module_css_1.default.level }, { children: [jsx_runtime_1.jsx("span", { children: "Lvl" }, void 0), level] }), void 0)] }), void 0)] }), void 0)] }), void 0));
};
exports.Experience = Experience;

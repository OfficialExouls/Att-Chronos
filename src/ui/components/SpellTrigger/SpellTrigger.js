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
exports.SpellTrigger = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var jotai_1 = require("jotai");
var atoms_1 = require("@/atoms");
var SpellTrigger_module_css_1 = __importDefault(require("./SpellTrigger.module.css"));
var SpellTrigger = function (_a) {
    var spell = _a.spell;
    var speechMode = jotai_1.useAtom(atoms_1.speechModeAtom)[0];
    var name = spell.name, school = spell.school, verbalTrigger = spell.verbalTrigger, charges = spell.charges;
    var triggerStyle = { opacity: Number(speechMode === atoms_1.SpeechMode.Awake) };
    return (jsx_runtime_1.jsxs("div", __assign({ className: SpellTrigger_module_css_1.default.root }, { children: [jsx_runtime_1.jsxs("div", __assign({ className: SpellTrigger_module_css_1.default.name }, { children: [name, " ", jsx_runtime_1.jsxs("span", __assign({ className: SpellTrigger_module_css_1.default.charges }, { children: ["\u00D7", charges !== null && charges !== void 0 ? charges : 1] }), void 0)] }), void 0),
            jsx_runtime_1.jsxs("div", __assign({ className: SpellTrigger_module_css_1.default.trigger, style: triggerStyle }, { children: ["Cast with \u201C", school === 'sanguinem magicae' ? 'EXCIO' : 'EVOKE', " ", verbalTrigger.toUpperCase(), "\u201D"] }), void 0)] }), void 0));
};
exports.SpellTrigger = SpellTrigger;

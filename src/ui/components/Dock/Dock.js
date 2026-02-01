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
exports.Dock = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var jotai_1 = require("jotai");
var atoms_1 = require("@/atoms");
var Dock_module_css_1 = __importDefault(require("./Dock.module.css"));
var Slot;
(function (Slot) {
    Slot[Slot["\u03B6"] = 0] = "\u03B6";
    Slot[Slot["\u03B4"] = 1] = "\u03B4";
    Slot[Slot["\u03BB"] = 2] = "\u03BB";
    Slot[Slot["\u03A9"] = 3] = "\u03A9";
})(Slot || (Slot = {}));
var Dock = function (_a) {
    var _b, _c, _d, _e, _f;
    var slot = _a.slot, studying = _a.studying, hint = _a.hint, _g = _a.isEmpty, isEmpty = _g === void 0 ? false : _g;
    var speechMode = jotai_1.useAtom(atoms_1.speechModeAtom)[0];
    var incantations = jotai_1.useAtom(atoms_1.incantationsAtom)[0];
    var isStudying = typeof studying !== 'undefined' && studying !== null;
    var isHinting = typeof hint !== 'undefined';
    var isIncanting = speechMode === atoms_1.SpeechMode.Incanting || speechMode === atoms_1.SpeechMode.Conjuring || speechMode === atoms_1.SpeechMode.Energizing;
    var isActiveDock = isIncanting && slot === incantations.length;
    var dockIncantation = (_b = incantations[slot]) !== null && _b !== void 0 ? _b : null;
    var dockVerbalComponent = (_c = dockIncantation === null || dockIncantation === void 0 ? void 0 : dockIncantation[0]) === null || _c === void 0 ? void 0 : _c.toUpperCase();
    var dockMaterialComponent = dockIncantation === null || dockIncantation === void 0 ? void 0 : dockIncantation[1];
    var dockStudyFeedback = dockIncantation === null || dockIncantation === void 0 ? void 0 : dockIncantation[2];
    var dockStyle, dockIcon, verbalComponent, materialComponent;
    if (isActiveDock) {
        var instructionTop = speechMode === atoms_1.SpeechMode.Conjuring
            ? 'Say the Heartfruit passphrase'
            : speechMode === atoms_1.SpeechMode.Energizing
                ? 'Speak an incantation to'
                : 'Speak an incantation or';
        var instructionBottom = speechMode === atoms_1.SpeechMode.Conjuring
            ? 'or say “NULLIFY”.'
            : speechMode === atoms_1.SpeechMode.Energizing
                ? 'energize a Blood Conduit.'
                : 'say “SEAL” or “NULLIFY”.';
        dockStyle = Dock_module_css_1.default.active;
        dockIcon = Slot[slot];
        verbalComponent = isEmpty ? 'EMPTY' : isHinting ? "Say \u201C" + (hint === null || hint === void 0 ? void 0 : hint[0].toUpperCase()) + "\u201D" : instructionTop;
        materialComponent = isEmpty ? '' : isHinting ? (_d = hint === null || hint === void 0 ? void 0 : hint[1]) !== null && _d !== void 0 ? _d : '' : instructionBottom;
    }
    else {
        if (isEmpty) {
            dockStyle = isIncanting && incantations[slot] ? Dock_module_css_1.default.filled : Dock_module_css_1.default.disabled;
            dockIcon = Slot[slot];
            verbalComponent = dockVerbalComponent !== null && dockVerbalComponent !== void 0 ? dockVerbalComponent : 'EMPTY';
            materialComponent = dockMaterialComponent !== null && dockMaterialComponent !== void 0 ? dockMaterialComponent : '';
        }
        else if (isHinting) {
            var isMatch = ((_e = incantations[slot]) === null || _e === void 0 ? void 0 : _e[0]) === (hint === null || hint === void 0 ? void 0 : hint[0]) && ((_f = incantations[slot]) === null || _f === void 0 ? void 0 : _f[1]) === (hint === null || hint === void 0 ? void 0 : hint[1]);
            var filledStyle = isMatch ? Dock_module_css_1.default.filled : Dock_module_css_1.default.feedbackMismatch;
            dockStyle = incantations[slot] ? filledStyle : Dock_module_css_1.default.disabled;
            dockIcon = incantations[slot] ? (isMatch ? Slot[slot] : 'Χ') : Slot[slot];
            verbalComponent = dockVerbalComponent !== null && dockVerbalComponent !== void 0 ? dockVerbalComponent : "\u201C" + (hint === null || hint === void 0 ? void 0 : hint[0].toUpperCase()) + "\u201D";
            materialComponent = dockMaterialComponent !== null && dockMaterialComponent !== void 0 ? dockMaterialComponent : hint === null || hint === void 0 ? void 0 : hint[1];
        }
        else if (isStudying) {
            switch (dockStudyFeedback) {
                case atoms_1.StudyFeedback.Match:
                    dockStyle = Dock_module_css_1.default.feedbackMatch;
                    dockIcon = 'Ξ';
                    break;
                case atoms_1.StudyFeedback.Partial:
                    dockStyle = Dock_module_css_1.default.feedbackPartial;
                    dockIcon = 'θ';
                    break;
                case atoms_1.StudyFeedback.Mismatch:
                    dockStyle = Dock_module_css_1.default.feedbackMismatch;
                    dockIcon = 'Χ';
                    break;
                default:
                    dockStyle = isIncanting && incantations[slot] ? Dock_module_css_1.default.filled : Dock_module_css_1.default.disabled;
                    dockIcon = Slot[slot];
            }
            verbalComponent = dockVerbalComponent && "\u201C" + (dockVerbalComponent === null || dockVerbalComponent === void 0 ? void 0 : dockVerbalComponent.toUpperCase()) + "\u201D";
            materialComponent = dockMaterialComponent;
        }
        else {
            dockStyle = isIncanting && incantations[slot] ? Dock_module_css_1.default.filled : Dock_module_css_1.default.disabled;
            dockIcon = Slot[slot];
            verbalComponent = dockVerbalComponent && "\u201C" + (dockVerbalComponent === null || dockVerbalComponent === void 0 ? void 0 : dockVerbalComponent.toUpperCase()) + "\u201D";
            materialComponent = dockMaterialComponent;
        }
    }
    return (jsx_runtime_1.jsxs("div", __assign({ className: dockStyle }, { children: [jsx_runtime_1.jsx("div", __assign({ className: Dock_module_css_1.default.dock }, { children: jsx_runtime_1.jsx("span", __assign({ className: Dock_module_css_1.default.slot }, { children: dockIcon }), void 0) }), void 0),
            jsx_runtime_1.jsxs("div", __assign({ className: Dock_module_css_1.default.description }, { children: [verbalComponent, jsx_runtime_1.jsx("br", {}, void 0), materialComponent] }), void 0)] }), void 0));
};
exports.Dock = Dock;

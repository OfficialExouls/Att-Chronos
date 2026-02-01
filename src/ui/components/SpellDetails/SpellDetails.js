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
exports.SpellDetails = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var electron_1 = require("electron");
var jotai_1 = require("jotai");
var atoms_1 = require("@/atoms");
var Button_1 = require("../Button");
var Dock_1 = require("../Dock");
var UpgradeSpell_1 = require("../UpgradeSpell");
var SpellDetails_module_css_1 = __importDefault(require("./SpellDetails.module.css"));
var CastsFrom;
(function (CastsFrom) {
    CastsFrom["eyes"] = "Gaze";
    CastsFrom["mainHand"] = "Main hand";
    CastsFrom["offHand"] = "Off-hand";
    CastsFrom["bothHands"] = "Both hands";
})(CastsFrom || (CastsFrom = {}));
var SpellDetails = function (_a) {
    var _b;
    var spellKey = _a.spellKey, spell = _a.spell, onClose = _a.onClose;
    var _c = react_1.useState(false), isUpgradesOpen = _c[0], setIsUpgradesOpen = _c[1];
    var _d = jotai_1.useAtom(atoms_1.studyingAtom), studying = _d[0], setStudy = _d[1];
    var _e = jotai_1.useAtom(atoms_1.incantationsAtom), setIncantations = _e[1];
    var experience = jotai_1.useAtom(atoms_1.experienceAtom)[0];
    var speechMode = jotai_1.useAtom(atoms_1.speechModeAtom)[0];
    var closeSpellUpgrade = function () { return setIsUpgradesOpen(false); };
    var openSpellUpgrade = function () { return setIsUpgradesOpen(true); };
    var startStudying = function () {
        setStudy(spellKey);
        setIncantations([]);
        electron_1.ipcRenderer.invoke('study-spell', spellKey);
    };
    var stopStudying = function () {
        setStudy(null);
        electron_1.ipcRenderer.invoke('study-spell', null);
    };
    var handleStudyClick = function () {
        if (studying === spellKey) {
            stopStudying();
        }
        else {
            startStudying();
        }
    };
    var hasIncantations = typeof spell.incantations !== 'undefined';
    var incantations = [];
    if (typeof spell.incantations !== 'undefined') {
        var hasSeal = false;
        for (var i = 0; i < 4; ++i) {
            var incantation = spell.incantations[i];
            if (typeof incantation === 'undefined') {
                if (hasSeal) {
                    incantations.push(jsx_runtime_1.jsx(Dock_1.Dock, { slot: i, isEmpty: true }, "dock-" + i));
                }
                else {
                    incantations.push(jsx_runtime_1.jsx(Dock_1.Dock, { slot: i, hint: ['SEAL', ''] }, "dock-" + i));
                    hasSeal = true;
                }
            }
            else {
                incantations.push(jsx_runtime_1.jsx(Dock_1.Dock, { slot: i, hint: incantation }, "dock-" + i));
            }
        }
    }
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsxs("div", __assign({ className: SpellDetails_module_css_1.default.root }, { children: [jsx_runtime_1.jsx("div", __assign({ className: SpellDetails_module_css_1.default.header }, { children: spell.name }), void 0),
                    jsx_runtime_1.jsxs("div", __assign({ className: SpellDetails_module_css_1.default.details }, { children: [jsx_runtime_1.jsx("div", __assign({ className: SpellDetails_module_css_1.default.school }, { children: spell.school }), void 0),
                            jsx_runtime_1.jsx("div", __assign({ className: SpellDetails_module_css_1.default.type }, { children: spell.requiresPreparation ? 'Prepared' : 'Instant' }), void 0),
                            typeof spell.castsFrom === 'undefined' ? null : (jsx_runtime_1.jsx("div", __assign({ className: SpellDetails_module_css_1.default.castsFrom }, { children: CastsFrom[spell.castsFrom] }), void 0)),
                            jsx_runtime_1.jsx("div", __assign({ className: SpellDetails_module_css_1.default.description }, { children: spell.description }), void 0),
                            hasIncantations ? (jsx_runtime_1.jsx("div", __assign({ className: SpellDetails_module_css_1.default.incantations }, { children: incantations }), void 0)) : (jsx_runtime_1.jsxs("div", __assign({ className: SpellDetails_module_css_1.default.discover }, { children: [jsx_runtime_1.jsx("p", { children: "This spell's incantations are unknown. You can study this spell to discover its incantations." }, void 0),
                                    jsx_runtime_1.jsx(Button_1.Button, __assign({ onClick: handleStudyClick, isBusy: speechMode === atoms_1.SpeechMode.Incanting }, { children: speechMode === atoms_1.SpeechMode.Incanting
                                            ? 'Finish incanting'
                                            : studying === spellKey
                                                ? 'Stop studying'
                                                : 'Study spell' }), void 0)] }), void 0))] }), void 0),
                    jsx_runtime_1.jsxs("div", __assign({ className: SpellDetails_module_css_1.default.actionsHeader }, { children: [jsx_runtime_1.jsx("button", __assign({ className: SpellDetails_module_css_1.default.action, onClick: onClose }, { children: "< Back" }), void 0),
                            jsx_runtime_1.jsx("button", __assign({ className: SpellDetails_module_css_1.default.action, onClick: openSpellUpgrade, disabled: Object.keys(spell.upgrades).length === 0 }, { children: "Upgrade" }), void 0)] }), void 0)] }), void 0),
            isUpgradesOpen && (jsx_runtime_1.jsx(UpgradeSpell_1.UpgradeSpell, { spellKey: spellKey, spell: spell, upgrades: (_b = experience.upgrades[spellKey]) !== null && _b !== void 0 ? _b : {}, onClose: closeSpellUpgrade }, void 0))] }, void 0));
};
exports.SpellDetails = SpellDetails;

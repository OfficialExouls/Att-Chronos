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
exports.SpellFinder = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var jotai_1 = require("jotai");
var atoms_1 = require("@/atoms");
var SpellDetails_1 = require("../SpellDetails");
var SpellFinder_module_css_1 = __importDefault(require("./SpellFinder.module.css"));
var SpellFinder = function (_a) {
    var school = _a.school, onClose = _a.onClose;
    var _b = react_1.useState(null), selectedSpell = _b[0], setSelectedSpell = _b[1];
    var spellbook = jotai_1.useAtom(atoms_1.spellbookAtom)[0];
    var experience = jotai_1.useAtom(atoms_1.experienceAtom)[0];
    var closeSpellDetails = function () { return setSelectedSpell(null); };
    var selectSpellUpgrade = function (selection) { return function () { return setSelectedSpell(selection); }; };
    var spells = Object.entries(spellbook).filter(function (_a) {
        var spell = _a[1];
        return spell.school === school;
    });
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsxs("div", __assign({ className: SpellFinder_module_css_1.default.root }, { children: [jsx_runtime_1.jsx("div", __assign({ className: SpellFinder_module_css_1.default.header }, { children: school }), void 0),
                    jsx_runtime_1.jsx("div", __assign({ className: SpellFinder_module_css_1.default.spells }, { children: spells.map(function (_a) {
                            var _b;
                            var spellKey = _a[0], spell = _a[1];
                            var spellHasUpgrades = Object.keys(spell.upgrades).length > 0;
                            var upgrades = Object.values((_b = experience.upgrades[spellKey]) !== null && _b !== void 0 ? _b : {}).reduce(function (sum, upgrade) { return sum + upgrade; }, 0);
                            return (jsx_runtime_1.jsxs("button", __assign({ className: SpellFinder_module_css_1.default.spell, onClick: selectSpellUpgrade({ key: spellKey, spell: spell }) }, { children: [jsx_runtime_1.jsx("span", __assign({ className: SpellFinder_module_css_1.default.upgrades }, { children: spellHasUpgrades ? upgrades : jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: "\\" }, void 0) }), void 0),
                                    jsx_runtime_1.jsx("span", __assign({ className: SpellFinder_module_css_1.default.name }, { children: spell.name }), void 0)] }), spellKey));
                        }) }), void 0),
                    jsx_runtime_1.jsx("div", __assign({ className: SpellFinder_module_css_1.default.close }, { children: jsx_runtime_1.jsx("button", __assign({ onClick: onClose }, { children: "< Back" }), void 0) }), void 0)] }), void 0),
            selectedSpell && (jsx_runtime_1.jsx(SpellDetails_1.SpellDetails, { spellKey: selectedSpell.key, spell: selectedSpell.spell, onClose: closeSpellDetails }, void 0))] }, void 0));
};
exports.SpellFinder = SpellFinder;

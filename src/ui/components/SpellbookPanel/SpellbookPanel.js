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
exports.SpellbookPanel = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var jotai_1 = require("jotai");
var atoms_1 = require("@/atoms");
var Experience_1 = require("../Experience");
var SpellFinder_1 = require("../SpellFinder");
var SpellbookPanel_module_css_1 = __importDefault(require("./SpellbookPanel.module.css"));
var SpellbookPanel = function () {
    var _a = react_1.useState(null), selectedSchool = _a[0], setSelectedSchool = _a[1];
    var experience = jotai_1.useAtom(atoms_1.experienceAtom)[0];
    var spellbook = jotai_1.useAtom(atoms_1.spellbookAtom)[0];
    var _b = jotai_1.useAtom(atoms_1.panelAtom), panel = _b[0], setPanel = _b[1];
    var closePanel = function () {
        setPanel(atoms_1.Panel.None);
    };
    var closeSpellFinder = function () { return setSelectedSchool(null); };
    var selectAbjuration = function () { return setSelectedSchool('abjuration'); };
    var selectConjuration = function () { return setSelectedSchool('conjuration'); };
    var selectEvocation = function () { return setSelectedSchool('evocation'); };
    var selectTransmutation = function () { return setSelectedSchool('transmutation'); };
    var abjurationXpTotal = experience.abjurationXpTotal, conjurationXpTotal = experience.conjurationXpTotal, evocationXpTotal = experience.evocationXpTotal, transmutationXpTotal = experience.transmutationXpTotal, upgrades = experience.upgrades;
    var schoolUpgrades = react_1.useMemo(function () { return function (school) {
        return Object.entries(upgrades)
            .filter(function (_a) {
            var _b;
            var spellKey = _a[0];
            return ((_b = spellbook[spellKey]) === null || _b === void 0 ? void 0 : _b.school) === school;
        })
            .reduce(function (sum, _a) {
            var spellUpgrades = _a[1];
            return sum + Object.values(spellUpgrades).reduce(function (upgrades, upgrade) { return upgrades + upgrade; }, 0);
        }, 0);
    }; }, [upgrades, spellbook]);
    var abjurationUpgrades = schoolUpgrades('abjuration');
    var conjurationUpgrades = schoolUpgrades('conjuration');
    var evocationUpgrades = schoolUpgrades('evocation');
    var transmutationUpgrades = schoolUpgrades('transmutation');
    var isOpen = panel === atoms_1.Panel.Spellbook;
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsxs("div", __assign({ className: isOpen ? SpellbookPanel_module_css_1.default.open : SpellbookPanel_module_css_1.default.closed }, { children: [jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("div", __assign({ className: SpellbookPanel_module_css_1.default.header }, { children: "Spellbook" }), void 0),
                            jsx_runtime_1.jsxs("div", __assign({ className: SpellbookPanel_module_css_1.default.schools }, { children: [jsx_runtime_1.jsxs("div", __assign({ className: SpellbookPanel_module_css_1.default.description }, { children: [jsx_runtime_1.jsx("p", { children: "The spellbook contains a list of spells grouped by their school of magic. Discovered spells have their incantations documented on their spell page. Undiscovered spells can be studied to reveal their hidden incantations." }, void 0),
                                            jsx_runtime_1.jsx("p", { children: "You gain experience every time you cast a spell. The type and amount of XP you gain depends on the number of incantations and the spell's school of magic." }, void 0)] }), void 0),
                                    jsx_runtime_1.jsx(Experience_1.Experience, { onClick: selectAbjuration, school: 'Abjuration', total: abjurationXpTotal, upgrades: abjurationUpgrades }, void 0),
                                    jsx_runtime_1.jsx(Experience_1.Experience, { onClick: selectConjuration, school: 'Conjuration', total: conjurationXpTotal, upgrades: conjurationUpgrades }, void 0),
                                    jsx_runtime_1.jsx(Experience_1.Experience, { onClick: selectEvocation, school: 'Evocation', total: evocationXpTotal, upgrades: evocationUpgrades }, void 0),
                                    jsx_runtime_1.jsx(Experience_1.Experience, { onClick: selectTransmutation, school: 'Transmutation', total: transmutationXpTotal, upgrades: transmutationUpgrades }, void 0)] }), void 0)] }, void 0),
                    jsx_runtime_1.jsx("div", __assign({ className: SpellbookPanel_module_css_1.default.close }, { children: jsx_runtime_1.jsx("button", __assign({ onClick: closePanel }, { children: "Close >" }), void 0) }), void 0)] }), void 0),
            selectedSchool && jsx_runtime_1.jsx(SpellFinder_1.SpellFinder, { school: selectedSchool, onClose: closeSpellFinder }, void 0)] }, void 0));
};
exports.SpellbookPanel = SpellbookPanel;

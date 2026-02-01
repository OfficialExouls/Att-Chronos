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
exports.UpgradeSpell = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var UpgradeModal_1 = require("../UpgradeModal");
var UpgradeSpell_module_css_1 = __importDefault(require("./UpgradeSpell.module.css"));
var UpgradeSpell = function (_a) {
    var _b;
    var spellKey = _a.spellKey, spell = _a.spell, upgrades = _a.upgrades, onClose = _a.onClose;
    var _c = react_1.useState(null), selectedUpgrade = _c[0], setSelectedUpgrade = _c[1];
    var closeModal = function () { return setSelectedUpgrade(null); };
    var selectUpgrade = function (selection) { return function () { return setSelectedUpgrade(selection); }; };
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsxs("div", __assign({ className: UpgradeSpell_module_css_1.default.root }, { children: [jsx_runtime_1.jsx("div", __assign({ className: UpgradeSpell_module_css_1.default.header }, { children: spell.name }), void 0),
                    jsx_runtime_1.jsx("div", __assign({ className: UpgradeSpell_module_css_1.default.upgrades }, { children: Object.entries(spell.upgrades).map(function (_a) {
                            var _b;
                            var upgradeKey = _a[0], upgradeConfig = _a[1];
                            return (jsx_runtime_1.jsxs("button", __assign({ className: UpgradeSpell_module_css_1.default.upgrade, onClick: selectUpgrade({ key: upgradeKey, upgradeConfig: upgradeConfig }) }, { children: [jsx_runtime_1.jsxs("div", __assign({ className: UpgradeSpell_module_css_1.default.title }, { children: [jsx_runtime_1.jsx("span", __assign({ className: UpgradeSpell_module_css_1.default.level }, { children: (_b = upgrades[upgradeKey]) !== null && _b !== void 0 ? _b : 0 }), void 0),
                                            jsx_runtime_1.jsx("span", __assign({ className: UpgradeSpell_module_css_1.default.name }, { children: upgradeConfig.name }), void 0)] }), void 0),
                                    jsx_runtime_1.jsx("div", __assign({ className: UpgradeSpell_module_css_1.default.description }, { children: upgradeConfig.description }), void 0)] }), upgradeKey));
                        }) }), void 0),
                    jsx_runtime_1.jsx("div", __assign({ className: UpgradeSpell_module_css_1.default.close }, { children: jsx_runtime_1.jsx("button", __assign({ onClick: onClose }, { children: "< Back" }), void 0) }), void 0)] }), void 0),
            selectedUpgrade && (jsx_runtime_1.jsx(UpgradeModal_1.UpgradeModal, { school: spell.school, spellKey: spellKey, upgradeKey: selectedUpgrade.key, upgradeConfig: selectedUpgrade.upgradeConfig, currentLevel: (_b = upgrades[selectedUpgrade.key]) !== null && _b !== void 0 ? _b : 0, onClose: closeModal }, void 0))] }, void 0));
};
exports.UpgradeSpell = UpgradeSpell;

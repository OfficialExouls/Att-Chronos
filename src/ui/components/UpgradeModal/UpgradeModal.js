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
exports.UpgradeModal = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var electron_1 = require("electron");
var jotai_1 = require("jotai");
var atoms_1 = require("@/atoms");
var UpgradeModal_module_css_1 = __importDefault(require("./UpgradeModal.module.css"));
var upgradeAttribute = function (upgrades, _a) {
    var isStepFunction = _a.isStepFunction, min = _a.min, max = _a.max, constant = _a.constant;
    var attribute = max - (max - min) * Math.exp(-constant * upgrades);
    return isStepFunction ? Math.round(attribute) : attribute;
};
var UpgradeModal = function (_a) {
    var school = _a.school, spellKey = _a.spellKey, upgradeKey = _a.upgradeKey, upgradeConfig = _a.upgradeConfig, currentLevel = _a.currentLevel, onClose = _a.onClose;
    var accessToken = jotai_1.useAtom(atoms_1.accessTokenAtom)[0];
    var _b = jotai_1.useAtom(atoms_1.experienceAtom), setExperience = _b[1];
    var _c = react_1.useState(null), fatalError = _c[0], setFatalError = _c[1];
    var _d = react_1.useState(false), isUpgrading = _d[0], setIsUpgrading = _d[1];
    var currentAttribute = upgradeAttribute(currentLevel, upgradeConfig);
    var upgradedAttribute = currentAttribute;
    var upgradeLevel = currentLevel;
    var isStepFunction = upgradeConfig.isStepFunction, max = upgradeConfig.max, unit = upgradeConfig.unit, units = upgradeConfig.units;
    var maxAttribute = isStepFunction ? Math.round(max) : max;
    var isMaxed = currentAttribute === maxAttribute;
    react_1.useEffect(function () {
        setIsUpgrading(false);
    }, [currentLevel]);
    var submitUpgrade = function (submitUpgrade) { return function () {
        setFatalError(null);
        setIsUpgrading(true);
        electron_1.ipcRenderer
            .invoke('upgrade', __assign({ accessToken: accessToken }, submitUpgrade))
            .then(function (response) {
            if (response.ok) {
                if (response.result === false) {
                    console.error('Not enough XP.');
                    setFatalError('Not enough XP.');
                }
                else {
                    setExperience(response.result);
                }
            }
            else {
                console.error(response.error);
                setFatalError(response.error);
            }
            setIsUpgrading(false);
        })
            .catch(function (error) {
            console.error(JSON.stringify(error, null, 2));
            setFatalError(error.message);
            setIsUpgrading(false);
        });
    }; };
    if (!isMaxed) {
        if (isStepFunction) {
            /* Find the required level for a "step up". */
            while (currentAttribute === upgradedAttribute)
                upgradedAttribute = upgradeAttribute(++upgradeLevel, upgradeConfig);
        }
        else {
            upgradedAttribute = upgradeAttribute(++upgradeLevel, upgradeConfig);
        }
    }
    var upgradesRequired = upgradeLevel - currentLevel;
    return (jsx_runtime_1.jsx("div", __assign({ className: UpgradeModal_module_css_1.default.root }, { children: jsx_runtime_1.jsxs("div", __assign({ className: UpgradeModal_module_css_1.default.modal }, { children: [jsx_runtime_1.jsxs("div", __assign({ className: UpgradeModal_module_css_1.default.header }, { children: [isMaxed ? 'Inspect' : 'Confirm', " ", upgradesRequired > 1 ? 'Boost' : 'Upgrade'] }), void 0),
                jsx_runtime_1.jsxs("div", __assign({ className: UpgradeModal_module_css_1.default.details }, { children: [upgradeConfig.description, jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("span", __assign({ className: UpgradeModal_module_css_1.default.effect }, { children: "Current" }), void 0), ' ', isStepFunction ? currentAttribute : currentAttribute.toFixed(2), " ", currentAttribute === 1 ? unit : units] }, void 0),
                        isMaxed ? (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("span", __assign({ className: UpgradeModal_module_css_1.default.effect }, { children: "Upgrade" }), void 0), " This effect is fully upgraded!"] }, void 0)) : (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("span", __assign({ className: UpgradeModal_module_css_1.default.effect }, { children: "Upgrade" }), void 0), ' ', isStepFunction ? upgradedAttribute : upgradedAttribute.toFixed(2), ' ', upgradedAttribute === 1 ? unit : units] }, void 0)),
                        fatalError ? (jsx_runtime_1.jsx("div", __assign({ className: UpgradeModal_module_css_1.default.error }, { children: fatalError }), void 0)) : isStepFunction && upgradesRequired > 1 ? (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("span", __assign({ className: UpgradeModal_module_css_1.default.effect }, { children: "!" }), void 0), " You need ", upgradesRequired, " more boosts to upgrade."] }, void 0)) : (jsx_runtime_1.jsx("div", __assign({ className: UpgradeModal_module_css_1.default.empty }, { children: "\u00A0" }), void 0))] }), void 0),
                jsx_runtime_1.jsxs("div", __assign({ className: UpgradeModal_module_css_1.default.actions }, { children: [jsx_runtime_1.jsx("button", __assign({ className: UpgradeModal_module_css_1.default.action, onClick: onClose, disabled: isUpgrading }, { children: "Close" }), void 0),
                        jsx_runtime_1.jsx("button", __assign({ className: UpgradeModal_module_css_1.default.action, onClick: submitUpgrade({ school: school, spellKey: spellKey, upgradeKey: upgradeKey }), disabled: isMaxed || isUpgrading }, { children: fatalError ? 'Retry' : upgradesRequired > 1 ? 'Boost' : 'Upgrade' }), void 0)] }), void 0)] }), void 0) }), void 0));
};
exports.UpgradeModal = UpgradeModal;

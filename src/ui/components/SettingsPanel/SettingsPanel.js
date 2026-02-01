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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsPanel = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var electron_1 = require("electron");
var jotai_1 = require("jotai");
var atoms_1 = require("@/atoms");
var Button_1 = require("../Button");
var ResetModal_1 = require("../ResetModal");
var SettingsPanel_module_css_1 = __importDefault(require("./SettingsPanel.module.css"));
var SettingsPanel = function () {
    var accessToken = jotai_1.useAtom(atoms_1.accessTokenAtom)[0];
    var _a = jotai_1.useAtom(atoms_1.panelAtom), panel = _a[0], setPanel = _a[1];
    var _b = jotai_1.useAtom(atoms_1.speechModeAtom), speechMode = _b[0], setSpeechMode = _b[1];
    var _c = jotai_1.useAtom(atoms_1.dexterityAtom), dexterity = _c[0], setDexterity = _c[1];
    var experience = jotai_1.useAtom(atoms_1.experienceAtom)[0];
    var _d = react_1.useState(false), isBusy = _d[0], setBusy = _d[1];
    var _e = react_1.useState(false), isResetModalOpen = _e[0], setResetModalOpen = _e[1];
    var closePanel = function () {
        setPanel(atoms_1.Panel.None);
    };
    var toggleLock = function () {
        setSpeechMode(function (mode) { return (mode === atoms_1.SpeechMode.Locked ? atoms_1.SpeechMode.Suppressed : atoms_1.SpeechMode.Locked); });
    };
    var setEvokeHand = react_1.useCallback(function (hand) { return __awaiter(void 0, void 0, void 0, function () {
        var angle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setBusy(true);
                    angle = dexterity[1];
                    return [4 /*yield*/, electron_1.ipcRenderer.invoke('apply-settings', {
                            accessToken: accessToken,
                            settings: { dexterity: hand + "Hand/" + angle }
                        })];
                case 1:
                    _a.sent();
                    setDexterity([hand, angle]);
                    setBusy(false);
                    return [2 /*return*/];
            }
        });
    }); }, [accessToken, dexterity, setDexterity]);
    var setEvokeAngle = react_1.useCallback(function (angle) { return __awaiter(void 0, void 0, void 0, function () {
        var hand;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setBusy(true);
                    hand = dexterity[0];
                    return [4 /*yield*/, electron_1.ipcRenderer.invoke('apply-settings', {
                            accessToken: accessToken,
                            settings: { dexterity: hand + "Hand/" + angle }
                        })];
                case 1:
                    _a.sent();
                    setDexterity([hand, angle]);
                    setBusy(false);
                    return [2 /*return*/];
            }
        });
    }); }, [accessToken, dexterity, setDexterity]);
    var openResetModal = function () {
        setResetModalOpen(true);
    };
    var closeResetModal = function () {
        setResetModalOpen(false);
    };
    var toggleDebug = function () {
        electron_1.ipcRenderer.invoke('toggle-dev-tools');
    };
    react_1.useEffect(function () {
        electron_1.ipcRenderer.invoke('speech-lock', speechMode === atoms_1.SpeechMode.Locked);
    }, [speechMode]);
    var isOpen = panel === atoms_1.Panel.Settings;
    var freeResets = experience.freeResets;
    var hasFreeResets = freeResets > 0;
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsxs("div", __assign({ className: isOpen ? SettingsPanel_module_css_1.default.open : SettingsPanel_module_css_1.default.closed }, { children: [jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("div", __assign({ className: SettingsPanel_module_css_1.default.header }, { children: "Settings" }), void 0),
                            jsx_runtime_1.jsxs("div", __assign({ className: SettingsPanel_module_css_1.default.settings }, { children: [jsx_runtime_1.jsxs(Button_1.Button, __assign({ onClick: toggleLock }, { children: [speechMode === atoms_1.SpeechMode.Locked ? 'Unlock' : 'Lock', " Voodoo"] }), void 0),
                                    jsx_runtime_1.jsx("div", __assign({ className: SettingsPanel_module_css_1.default.description }, { children: "Stops all speech recognition. Useful if you notice Voodoo keeps awakening when you don't want it to." }), void 0),
                                    jsx_runtime_1.jsxs("div", __assign({ className: SettingsPanel_module_css_1.default.group }, { children: [jsx_runtime_1.jsx(Button_1.Button, __assign({ isBusy: isBusy, isMuted: dexterity[0] === 'right', onClick: function () { return setEvokeHand('left'); } }, { children: "Left" }), void 0),
                                            jsx_runtime_1.jsx(Button_1.Button, __assign({ isBusy: isBusy, isMuted: dexterity[0] === 'left', onClick: function () { return setEvokeHand('right'); } }, { children: "Right" }), void 0)] }), void 0),
                                    jsx_runtime_1.jsx("div", __assign({ className: SettingsPanel_module_css_1.default.description }, { children: "Sets preferred \"main hand\" for casting spells. Some spells also use your \"off-hand\", as described in their spell description." }), void 0),
                                    jsx_runtime_1.jsxs("div", __assign({ className: SettingsPanel_module_css_1.default.group }, { children: [jsx_runtime_1.jsx(Button_1.Button, __assign({ isBusy: isBusy, isMuted: dexterity[1] === 'palm', onClick: function () { return setEvokeAngle('index'); } }, { children: "Finger" }), void 0),
                                            jsx_runtime_1.jsx(Button_1.Button, __assign({ isBusy: isBusy, isMuted: dexterity[1] === 'index', onClick: function () { return setEvokeAngle('palm'); } }, { children: "Palm" }), void 0)] }), void 0),
                                    jsx_runtime_1.jsx("div", __assign({ className: SettingsPanel_module_css_1.default.description }, { children: "Most spells cast from your hand palm regardless of this setting so you can easily grab what you cast. However, some projectile spells must be aimed. You can choose to evoke these from your hand palm or index finger." }), void 0),
                                    jsx_runtime_1.jsx(Button_1.Button, __assign({ onClick: openResetModal }, { children: "Reset upgrades" }), void 0),
                                    jsx_runtime_1.jsxs("div", __assign({ className: SettingsPanel_module_css_1.default.description }, { children: ["Resets all your spell upgrades for the cost of reducing your XP total by 10%. You currently have", ' ', hasFreeResets ? freeResets : 'no', " free reset", freeResets === 1 ? '' : 's', " that allow", freeResets === 1 ? 's' : '', " you to avoid paying this cost."] }), void 0),
                                    jsx_runtime_1.jsx(Button_1.Button, __assign({ onClick: toggleDebug }, { children: "Toggle debugging" }), void 0),
                                    jsx_runtime_1.jsx("div", __assign({ className: SettingsPanel_module_css_1.default.description }, { children: "Opens a \"developer tools\" window which can assist with troubleshooting problems." }), void 0)] }), void 0)] }, void 0),
                    jsx_runtime_1.jsx("div", __assign({ className: SettingsPanel_module_css_1.default.close }, { children: jsx_runtime_1.jsx("button", __assign({ onClick: closePanel }, { children: "< Close" }), void 0) }), void 0)] }), void 0),
            isResetModalOpen && jsx_runtime_1.jsx(ResetModal_1.ResetModal, { onClose: closeResetModal, onComplete: closeResetModal }, void 0)] }, void 0));
};
exports.SettingsPanel = SettingsPanel;

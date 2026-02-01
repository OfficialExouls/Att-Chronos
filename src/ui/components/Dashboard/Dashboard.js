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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var electron_1 = require("electron");
var jotai_1 = require("jotai");
var utils_1 = require("jotai/utils");
var atoms_1 = require("@/atoms");
var Dock_1 = require("@/components/Dock");
var SpellTrigger_1 = require("@/components/SpellTrigger");
var SettingsPanel_1 = require("../SettingsPanel");
var SpellbookPanel_1 = require("../SpellbookPanel");
var Dashboard_module_css_1 = __importDefault(require("./Dashboard.module.css"));
var chime_wav_1 = __importDefault(require("./chime.wav"));
var ping_wav_1 = __importDefault(require("./ping.wav"));
var dock_wav_1 = __importDefault(require("./dock.wav"));
var cast_wav_1 = __importDefault(require("./cast.wav"));
var drone_wav_1 = __importDefault(require("./drone.wav"));
var PREPARED_SPELLS_CONFIG = {
    min: 10,
    max: 25,
    constant: 0.0000343
};
var calcPreparedSpells = function (xpTotal, patreonTier) {
    var min = PREPARED_SPELLS_CONFIG.min, max = PREPARED_SPELLS_CONFIG.max, constant = PREPARED_SPELLS_CONFIG.constant;
    var preparedSpells = max - (max - min) * Math.exp(-constant * xpTotal);
    return Math.round(preparedSpells) + patreonTier * 5;
};
var VOLUME_EXPONENT = 3; /* Linear volume adjustments are evil! */
var chimeAudio = new Audio(chime_wav_1.default);
chimeAudio.volume = Math.pow(0.6, VOLUME_EXPONENT);
var pingAudio = new Audio(ping_wav_1.default);
pingAudio.volume = Math.pow(0.6, VOLUME_EXPONENT);
var dockAudio = new Audio(dock_wav_1.default);
dockAudio.volume = Math.pow(0.6, VOLUME_EXPONENT);
dockAudio.playbackRate = 1.25;
var castAudio = new Audio(cast_wav_1.default);
castAudio.volume = Math.pow(0.5, VOLUME_EXPONENT);
castAudio.playbackRate = 2.5;
var droneAudio = new Audio(drone_wav_1.default);
droneAudio.volume = Math.pow(0.6, VOLUME_EXPONENT);
droneAudio.playbackRate = 1.5;
var Mode;
(function (Mode) {
    Mode[Mode["Locked"] = 0] = "Locked";
    Mode[Mode["Suppressed"] = 1] = "Suppressed";
    Mode[Mode["Ready"] = 2] = "Ready";
    Mode[Mode["Attuning"] = 3] = "Attuning";
    Mode[Mode["Energizing"] = 4] = "Energizing";
    Mode[Mode["Conjuring"] = 5] = "Conjuring";
})(Mode || (Mode = {}));
var Dashboard = function () {
    var _a = jotai_1.useAtom(atoms_1.speechModeAtom), speechMode = _a[0], setSpeechMode = _a[1];
    var _b = jotai_1.useAtom(atoms_1.activeServerAtom), activeServer = _b[0], setActiveServer = _b[1];
    var _c = jotai_1.useAtom(atoms_1.appStageAtom), setAppStage = _c[1];
    var accessToken = jotai_1.useAtom(atoms_1.accessTokenAtom)[0];
    var _d = jotai_1.useAtom(atoms_1.incantationsAtom), currentIncantations = _d[0], setIncantations = _d[1];
    var _e = jotai_1.useAtom(atoms_1.preparedSpellsAtom), preparedSpells = _e[0], setPreparedSpells = _e[1];
    var _f = jotai_1.useAtom(atoms_1.experienceAtom), experience = _f[0], setExperience = _f[1];
    var _g = jotai_1.useAtom(atoms_1.dexterityAtom), setDexterity = _g[1];
    var _h = jotai_1.useAtom(atoms_1.patreonTierAtom), patreonTier = _h[0], setPatreonTier = _h[1];
    var spellbook = jotai_1.useAtom(atoms_1.spellbookAtom)[0];
    var studying = jotai_1.useAtom(atoms_1.studyingAtom)[0];
    var _j = jotai_1.useAtom(atoms_1.panelAtom), panel = _j[0], setPanel = _j[1];
    var _k = react_1.useState(true), shouldClearIncantations = _k[0], setShouldClearIncantations = _k[1];
    var openSettingsPanel = function () {
        setPanel(atoms_1.Panel.Settings);
    };
    var openSpellbookPanel = function () {
        setPanel(atoms_1.Panel.Spellbook);
    };
    var handleUpdateServers = react_1.useCallback(function (_, _a) {
        var playerJoined = _a.playerJoined;
        setActiveServer(playerJoined);
    }, [setActiveServer]);
    var handleVoodooSuppressed = react_1.useCallback(function () {
        setSpeechMode(atoms_1.SpeechMode.Suppressed);
        pingAudio.currentTime = 0;
        pingAudio.play();
    }, [setSpeechMode]);
    var handleVoodooAwake = utils_1.useAtomCallback(react_1.useCallback(function (get) {
        var speechMode = get(atoms_1.speechModeAtom);
        if (speechMode === atoms_1.SpeechMode.Suppressed) {
            pingAudio.currentTime = 0;
            pingAudio.play();
        }
        setSpeechMode(atoms_1.SpeechMode.Awake);
    }, [setSpeechMode]));
    var handleVoodooIncanting = react_1.useCallback(function () {
        if (shouldClearIncantations)
            setIncantations([]);
        setSpeechMode(atoms_1.SpeechMode.Incanting);
        chimeAudio.currentTime = 0;
        chimeAudio.play();
    }, [shouldClearIncantations, setIncantations, setSpeechMode]);
    var handleVoodooEnergizing = react_1.useCallback(function () {
        if (shouldClearIncantations)
            setIncantations([]);
        setSpeechMode(atoms_1.SpeechMode.Energizing);
        chimeAudio.currentTime = 0;
        chimeAudio.play();
    }, [shouldClearIncantations, setIncantations, setSpeechMode]);
    var handleVoodooPreparedSpellTriggered = react_1.useCallback(function (_, newExperience, preparedSpells) {
        setExperience(newExperience);
        setPreparedSpells(preparedSpells);
        castAudio.currentTime = 0;
        castAudio.play();
    }, [setExperience, setPreparedSpells]);
    var handleVoodooIncantationAborted = react_1.useCallback(function (_, incantations) {
        setIncantations(incantations);
        setShouldClearIncantations(true);
        droneAudio.currentTime = 0;
        droneAudio.play();
    }, [setIncantations]);
    var handleVoodooIncantationConfirmed = react_1.useCallback(function (_, newExperience, incantations, preparedSpells, isCastingHeartfruit) {
        setExperience(newExperience);
        setIncantations(incantations);
        setShouldClearIncantations(true);
        if (preparedSpells)
            setPreparedSpells(preparedSpells);
        if (isCastingHeartfruit)
            setSpeechMode(atoms_1.SpeechMode.Conjuring);
        castAudio.currentTime = 0;
        castAudio.play();
    }, [setExperience, setIncantations, setPreparedSpells, setSpeechMode]);
    var handleVoodooIncantation = react_1.useCallback(function (_, incantations, preparedSpells) {
        setIncantations(incantations);
        setShouldClearIncantations(false);
        if (preparedSpells)
            setPreparedSpells(preparedSpells);
        dockAudio.currentTime = 0;
        dockAudio.play();
    }, [setIncantations, setPreparedSpells]);
    var handleVoodooConjureHeartfruit = react_1.useCallback(function (_, ok, passphrase) {
        setIncantations(__spreadArray(__spreadArray([], currentIncantations), passphrase.map(function (word) { return [word, '', undefined]; })));
        if (ok) {
            castAudio.currentTime = 0;
            castAudio.play();
        }
        else {
            droneAudio.currentTime = 0;
            droneAudio.play();
        }
        setSpeechMode(atoms_1.SpeechMode.Awake);
    }, [currentIncantations, setIncantations, setSpeechMode]);
    react_1.useEffect(function () {
        electron_1.ipcRenderer.on('update-servers', handleUpdateServers);
        electron_1.ipcRenderer.on('voodoo-suppressed', handleVoodooSuppressed);
        electron_1.ipcRenderer.on('voodoo-awake', handleVoodooAwake);
        electron_1.ipcRenderer.on('voodoo-incanting', handleVoodooIncanting);
        electron_1.ipcRenderer.on('voodoo-energizing', handleVoodooEnergizing);
        electron_1.ipcRenderer.on('voodoo-prepared-spell-triggered', handleVoodooPreparedSpellTriggered);
        electron_1.ipcRenderer.on('voodoo-incantation-aborted', handleVoodooIncantationAborted);
        electron_1.ipcRenderer.on('voodoo-incantation-confirmed', handleVoodooIncantationConfirmed);
        electron_1.ipcRenderer.on('voodoo-incantation', handleVoodooIncantation);
        electron_1.ipcRenderer.on('voodoo-conjure-heartfruit', handleVoodooConjureHeartfruit);
        electron_1.ipcRenderer
            .invoke('update-player', { accessToken: accessToken })
            .then(function (response) {
            var _a;
            if (response.ok) {
                setPreparedSpells(response.result.preparedSpells);
                setExperience(response.result.experience);
                setDexterity(response.result.dexterity.split('Hand/'));
                setPatreonTier((_a = response.result.patreonTier) !== null && _a !== void 0 ? _a : 0);
            }
            else {
                console.error(response.error);
            }
        })
            .catch(function (error) {
            console.error(error.message);
        });
        return function () {
            electron_1.ipcRenderer.removeListener('update-servers', handleUpdateServers);
            electron_1.ipcRenderer.removeListener('voodoo-suppressed', handleVoodooSuppressed);
            electron_1.ipcRenderer.removeListener('voodoo-awake', handleVoodooAwake);
            electron_1.ipcRenderer.removeListener('voodoo-incanting', handleVoodooIncanting);
            electron_1.ipcRenderer.removeListener('voodoo-energizing', handleVoodooEnergizing);
            electron_1.ipcRenderer.removeListener('voodoo-prepared-spell-triggered', handleVoodooPreparedSpellTriggered);
            electron_1.ipcRenderer.removeListener('voodoo-incantation-aborted', handleVoodooIncantationAborted);
            electron_1.ipcRenderer.removeListener('voodoo-incantation-confirmed', handleVoodooIncantationConfirmed);
            electron_1.ipcRenderer.removeListener('voodoo-incantation', handleVoodooIncantation);
            electron_1.ipcRenderer.removeListener('voodoo-conjure-heartfruit', handleVoodooConjureHeartfruit);
        };
    }, [
        accessToken,
        handleUpdateServers,
        handleVoodooSuppressed,
        handleVoodooAwake,
        handleVoodooIncanting,
        handleVoodooEnergizing,
        handleVoodooPreparedSpellTriggered,
        handleVoodooIncantationAborted,
        handleVoodooIncantationConfirmed,
        handleVoodooIncantation,
        handleVoodooConjureHeartfruit,
        setPreparedSpells,
        setExperience,
        setDexterity,
        setPatreonTier
    ]);
    react_1.useEffect(function () {
        if (activeServer === null) {
            setPreparedSpells([]);
            setAppStage(atoms_1.AppStage.WaitingForServer);
        }
    }, [activeServer, setAppStage, setPreparedSpells]);
    var conjurationXpTotal = experience.conjurationXpTotal, evocationXpTotal = experience.evocationXpTotal, transmutationXpTotal = experience.transmutationXpTotal;
    var xpTotal = conjurationXpTotal + evocationXpTotal + transmutationXpTotal;
    var modeStyle = atoms_1.SpeechMode[speechMode].toLowerCase();
    var isPanelOpen = panel !== atoms_1.Panel.None;
    var studyingSpellName = studying && spellbook[studying].name;
    var rootStyle = speechMode === atoms_1.SpeechMode.Conjuring || speechMode === atoms_1.SpeechMode.Energizing ? Dashboard_module_css_1.default.sanguinem : Dashboard_module_css_1.default.root;
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsxs("div", __assign({ className: isPanelOpen ? Dashboard_module_css_1.default.blur : rootStyle }, { children: [jsx_runtime_1.jsx("div", __assign({ className: Dashboard_module_css_1.default[modeStyle] }, { children: Mode[speechMode] }), void 0),
                    jsx_runtime_1.jsxs("div", __assign({ className: Dashboard_module_css_1.default.incantations, style: {
                            paddingTop: studying ? '16px' : 0,
                            '--studying': studying && "'" + studyingSpellName + "'"
                        } }, { children: [jsx_runtime_1.jsx(Dock_1.Dock, { slot: 0, studying: studying }, void 0),
                            jsx_runtime_1.jsx(Dock_1.Dock, { slot: 1, studying: studying }, void 0),
                            jsx_runtime_1.jsx(Dock_1.Dock, { slot: 2, studying: studying }, void 0),
                            jsx_runtime_1.jsx(Dock_1.Dock, { slot: 3, studying: studying }, void 0)] }), void 0),
                    jsx_runtime_1.jsxs("div", __assign({ className: Dashboard_module_css_1.default.spellsHeader }, { children: ["Prepared Spells", ' ', jsx_runtime_1.jsxs("span", __assign({ className: Dashboard_module_css_1.default.spellSlots }, { children: [preparedSpells.length, "/", calcPreparedSpells(xpTotal, patreonTier)] }), void 0)] }), void 0),
                    jsx_runtime_1.jsx("div", __assign({ className: Dashboard_module_css_1.default.spells }, { children: preparedSpells.map(function (spell, index) { return (jsx_runtime_1.jsx(SpellTrigger_1.SpellTrigger, { spell: spell }, "spell-" + index)); }) }), void 0),
                    jsx_runtime_1.jsxs("div", __assign({ className: Dashboard_module_css_1.default.actionsHeader }, { children: [jsx_runtime_1.jsx("button", __assign({ className: Dashboard_module_css_1.default.action, onClick: openSettingsPanel }, { children: "Settings" }), void 0),
                            jsx_runtime_1.jsx("button", __assign({ className: Dashboard_module_css_1.default.action, onClick: openSpellbookPanel }, { children: "Spellbook" }), void 0)] }), void 0)] }), void 0),
            jsx_runtime_1.jsx(SettingsPanel_1.SettingsPanel, {}, void 0),
            jsx_runtime_1.jsx(SpellbookPanel_1.SpellbookPanel, {}, void 0)] }, void 0));
};
exports.Dashboard = Dashboard;

"use strict";
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
exports.handleSpeech = void 0;
var electron_1 = require("electron");
var voodooDelete_1 = require("./voodooDelete");
var voodooGet_1 = require("./voodooGet");
var voodooPost_1 = require("./voodooPost");
var getMaterialComponents_1 = require("./getMaterialComponents");
var config_1 = __importDefault(require("../config"));
var StudyFeedback;
(function (StudyFeedback) {
    StudyFeedback["Match"] = "MATCH";
    StudyFeedback["Partial"] = "PARTIAL";
    StudyFeedback["Mismatch"] = "MISMATCH";
})(StudyFeedback || (StudyFeedback = {}));
var MODES = {
    AWAKE: 'AWAKE',
    INCANTING: 'INCANTING',
    CONJURING: 'CONJURING',
    ENERGIZING: 'ENERGIZING',
    SUPPRESSED: 'SUPPRESSED'
};
var PHRASES = {
    AWAKEN: 'awaken voodoo',
    INCANTATION: {
        START: 'attune voodoo',
        CONFIRM: 'seal',
        ABORT: 'nullify'
    },
    ENERGIZE: {
        START: 'sanguinem magicae',
        ABORT: 'nullify'
    },
    SUPPRESS: 'suppress voodoo',
    TRIGGER: 'evoke',
    BLOOD_TRIGGER: 'excio'
};
var hasServerConnection = false;
electron_1.ipcMain.handle('server-connected', function () {
    hasServerConnection = true;
});
electron_1.ipcMain.handle('server-disconnected', function () {
    hasServerConnection = false;
});
var isLocked = false;
/* Handle speech recognition lock. */
electron_1.ipcMain.handle('speech-lock', function (_, state) {
    isLocked = state;
});
var mode = MODES.SUPPRESSED;
var experience;
var incantations = [];
var preparedSpells = [];
var isCastingHeartfruit = false;
var studiedSpellKey = null;
electron_1.ipcMain.handle('study-spell', function (_, spellKey) {
    studiedSpellKey = spellKey;
});
var handleSpeech = function (ui, speech, accessToken, logger) { return __awaiter(void 0, void 0, void 0, function () {
    var isAwakenPhrase, isTriggerPhrase, isBloodTriggerPhrase, _a, _b, response, verbalTrigger, response, _c, response, response, response, _d, response, response, _e, response, passphrase, response;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (isLocked) {
                    mode = MODES.SUPPRESSED;
                    return [2 /*return*/];
                }
                if (!hasServerConnection) {
                    mode = MODES.SUPPRESSED;
                    ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-suppressed');
                    return [2 /*return*/];
                }
                isAwakenPhrase = speech === PHRASES.AWAKEN;
                isTriggerPhrase = speech.split(' ')[0] === PHRASES.TRIGGER;
                isBloodTriggerPhrase = speech.split(' ')[0] === PHRASES.BLOOD_TRIGGER;
                _a = mode;
                switch (_a) {
                    case MODES.SUPPRESSED: return [3 /*break*/, 1];
                    case MODES.AWAKE: return [3 /*break*/, 2];
                    case MODES.INCANTING: return [3 /*break*/, 10];
                    case MODES.ENERGIZING: return [3 /*break*/, 19];
                    case MODES.CONJURING: return [3 /*break*/, 26];
                }
                return [3 /*break*/, 31];
            case 1:
                {
                    if (isAwakenPhrase) {
                        mode = MODES.AWAKE;
                        ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-awake');
                        logger({ mode: mode });
                    }
                    return [3 /*break*/, 31];
                }
                _f.label = 2;
            case 2:
                _b = speech;
                switch (_b) {
                    case PHRASES.SUPPRESS: return [3 /*break*/, 3];
                    case PHRASES.INCANTATION.START: return [3 /*break*/, 4];
                    case PHRASES.ENERGIZE.START: return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 3:
                {
                    mode = MODES.SUPPRESSED;
                    ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-suppressed');
                    logger({ mode: mode });
                    return [3 /*break*/, 9];
                }
                _f.label = 4;
            case 4:
                {
                    mode = MODES.INCANTING;
                    ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-incanting');
                    logger({ mode: mode });
                    return [3 /*break*/, 9];
                }
                _f.label = 5;
            case 5: return [4 /*yield*/, voodooGet_1.voodooGet(accessToken, config_1.default.API_ENDPOINTS.BLOOD_INCANTATION)];
            case 6:
                response = _f.sent();
                if (response.ok && response.result) {
                    mode = MODES.ENERGIZING;
                    ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-energizing');
                    logger({ mode: mode });
                }
                else {
                    logger(response.error);
                }
                return [3 /*break*/, 9];
            case 7:
                if (!(isTriggerPhrase || isBloodTriggerPhrase)) return [3 /*break*/, 9];
                verbalTrigger = speech.replace(PHRASES.TRIGGER + " ", '').replace(PHRASES.BLOOD_TRIGGER + " ", '');
                return [4 /*yield*/, voodooPost_1.voodooPost(accessToken, config_1.default.API_ENDPOINTS.TRIGGER, [verbalTrigger])];
            case 8:
                response = _f.sent();
                if (response.ok) {
                    experience = response.result.experience;
                    preparedSpells = response.result.preparedSpells;
                    ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-prepared-spell-triggered', experience, preparedSpells);
                    logger({ experience: experience, preparedSpells: preparedSpells });
                }
                else {
                    logger(response.error);
                }
                _f.label = 9;
            case 9: return [3 /*break*/, 31];
            case 10:
                _c = speech;
                switch (_c) {
                    case PHRASES.SUPPRESS: return [3 /*break*/, 11];
                    case PHRASES.INCANTATION.ABORT: return [3 /*break*/, 12];
                    case PHRASES.INCANTATION.CONFIRM: return [3 /*break*/, 14];
                }
                return [3 /*break*/, 16];
            case 11:
                {
                    mode = MODES.SUPPRESSED;
                    ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-suppressed');
                    logger({ mode: mode });
                    return [3 /*break*/, 18];
                }
                _f.label = 12;
            case 12:
                mode = MODES.AWAKE;
                ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-awake');
                logger({ mode: mode });
                return [4 /*yield*/, voodooDelete_1.voodooDelete(accessToken, config_1.default.API_ENDPOINTS.INCANTATION)];
            case 13:
                response = _f.sent();
                if (response.ok) {
                    incantations = response.result;
                    ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-incantation-aborted', incantations);
                    logger({ incantations: incantations });
                }
                else {
                    logger(response.error);
                }
                return [3 /*break*/, 18];
            case 14: return [4 /*yield*/, voodooGet_1.voodooGet(accessToken, config_1.default.API_ENDPOINTS.SEAL)];
            case 15:
                response = _f.sent();
                if (response.ok) {
                    experience = response.result.experience;
                    incantations = response.result.incantations;
                    preparedSpells = response.result.preparedSpells;
                    isCastingHeartfruit = response.result.isCastingHeartfruit;
                    if (isCastingHeartfruit) {
                        mode = MODES.CONJURING;
                    }
                    else {
                        mode = MODES.AWAKE;
                        ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-awake');
                    }
                    ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-incantation-confirmed', experience, incantations, preparedSpells, isCastingHeartfruit);
                    logger({ experience: experience, incantations: incantations, preparedSpells: preparedSpells, isCastingHeartfruit: isCastingHeartfruit });
                }
                else {
                    mode = MODES.AWAKE;
                    ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-awake');
                    logger(response.error);
                }
                logger({ mode: mode });
                return [3 /*break*/, 18];
            case 16:
                if (!(!isAwakenPhrase && !isTriggerPhrase && !isBloodTriggerPhrase)) return [3 /*break*/, 18];
                return [4 /*yield*/, voodooPost_1.voodooPost(accessToken, config_1.default.API_ENDPOINTS.INCANTATION, [
                        speech,
                        getMaterialComponents_1.getMaterialComponents(speech),
                        studiedSpellKey
                    ])];
            case 17:
                response = _f.sent();
                if (response.ok) {
                    experience = response.result.experience;
                    incantations = response.result.incantations;
                    preparedSpells = response.result.preparedSpells;
                    if (response.result.incantations.length === 4) {
                        mode = MODES.AWAKE;
                        ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-incantation-confirmed', experience, incantations, preparedSpells);
                        ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-awake');
                        logger({ mode: mode });
                    }
                    else {
                        ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-incantation', incantations, preparedSpells);
                    }
                    logger({ experience: experience, incantations: incantations, preparedSpells: preparedSpells });
                }
                else {
                    logger(response.error);
                }
                _f.label = 18;
            case 18: return [3 /*break*/, 31];
            case 19:
                _d = speech;
                switch (_d) {
                    case PHRASES.SUPPRESS: return [3 /*break*/, 20];
                    case PHRASES.ENERGIZE.ABORT: return [3 /*break*/, 21];
                }
                return [3 /*break*/, 23];
            case 20:
                {
                    mode = MODES.SUPPRESSED;
                    ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-suppressed');
                    logger({ mode: mode });
                    return [3 /*break*/, 25];
                }
                _f.label = 21;
            case 21:
                mode = MODES.AWAKE;
                ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-awake');
                logger({ mode: mode });
                return [4 /*yield*/, voodooDelete_1.voodooDelete(accessToken, config_1.default.API_ENDPOINTS.BLOOD_INCANTATION)];
            case 22:
                response = _f.sent();
                if (response.ok) {
                    incantations = response.result;
                    ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-incantation-aborted', incantations);
                    logger({ incantations: incantations });
                }
                else {
                    logger(response.error);
                }
                return [3 /*break*/, 25];
            case 23:
                if (!(!isAwakenPhrase && !isTriggerPhrase && !isBloodTriggerPhrase)) return [3 /*break*/, 25];
                return [4 /*yield*/, voodooPost_1.voodooPost(accessToken, config_1.default.API_ENDPOINTS.BLOOD_INCANTATION, [speech])];
            case 24:
                response = _f.sent();
                if (response.ok) {
                    experience = response.result.experience;
                    incantations = response.result.incantations;
                    preparedSpells = response.result.preparedSpells;
                    if (response.result.incantations.length === 4) {
                        mode = MODES.AWAKE;
                        ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-incantation-confirmed', experience, incantations, preparedSpells);
                        ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-awake');
                        logger({ mode: mode });
                    }
                    else {
                        ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-incantation', incantations, preparedSpells);
                    }
                    logger({ experience: experience, incantations: incantations, preparedSpells: preparedSpells });
                }
                else {
                    logger(response.error);
                }
                _f.label = 25;
            case 25: return [3 /*break*/, 31];
            case 26:
                _e = speech;
                switch (_e) {
                    case PHRASES.INCANTATION.ABORT: return [3 /*break*/, 27];
                }
                return [3 /*break*/, 29];
            case 27:
                mode = MODES.AWAKE;
                ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-awake');
                logger({ mode: mode });
                return [4 /*yield*/, voodooDelete_1.voodooDelete(accessToken, config_1.default.API_ENDPOINTS.INCANTATION)];
            case 28:
                response = _f.sent();
                if (response.ok) {
                    incantations = response.result;
                    ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-incantation-aborted', incantations);
                    logger({ incantations: incantations });
                }
                else {
                    logger(response.error);
                }
                return [3 /*break*/, 31];
            case 29:
                passphrase = speech.split(' ');
                if (passphrase.length !== 3)
                    return [2 /*return*/];
                return [4 /*yield*/, voodooPost_1.voodooPost(accessToken, config_1.default.API_ENDPOINTS.HEARTFRUIT, passphrase)];
            case 30:
                response = _f.sent();
                mode = MODES.AWAKE;
                ui === null || ui === void 0 ? void 0 : ui.webContents.send('voodoo-conjure-heartfruit', response.ok, passphrase);
                logger({ mode: mode });
                if (!response.ok) {
                    logger(response.error);
                }
                return [3 /*break*/, 31];
            case 31: return [2 /*return*/];
        }
    });
}); };
exports.handleSpeech = handleSpeech;

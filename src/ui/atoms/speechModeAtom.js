"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.speechModeAtom = exports.SpeechMode = void 0;
var jotai_1 = require("jotai");
var SpeechMode;
(function (SpeechMode) {
    SpeechMode[SpeechMode["Locked"] = 0] = "Locked";
    SpeechMode[SpeechMode["Suppressed"] = 1] = "Suppressed";
    SpeechMode[SpeechMode["Awake"] = 2] = "Awake";
    SpeechMode[SpeechMode["Incanting"] = 3] = "Incanting";
    SpeechMode[SpeechMode["Energizing"] = 4] = "Energizing";
    SpeechMode[SpeechMode["Conjuring"] = 5] = "Conjuring";
})(SpeechMode = exports.SpeechMode || (exports.SpeechMode = {}));
exports.speechModeAtom = jotai_1.atom(SpeechMode.Suppressed);

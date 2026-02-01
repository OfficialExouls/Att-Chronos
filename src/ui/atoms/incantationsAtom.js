"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incantationsAtom = exports.StudyFeedback = void 0;
var jotai_1 = require("jotai");
var StudyFeedback;
(function (StudyFeedback) {
    StudyFeedback["Match"] = "MATCH";
    StudyFeedback["Partial"] = "PARTIAL";
    StudyFeedback["Mismatch"] = "MISMATCH";
})(StudyFeedback = exports.StudyFeedback || (exports.StudyFeedback = {}));
exports.incantationsAtom = jotai_1.atom([]);

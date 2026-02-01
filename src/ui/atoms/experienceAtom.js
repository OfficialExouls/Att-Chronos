"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceAtom = void 0;
var jotai_1 = require("jotai");
exports.experienceAtom = jotai_1.atom({
    freeResets: 0,
    upgrades: {},
    abjurationXpTotal: 0,
    abjurationXpSpent: 0,
    conjurationXpTotal: 0,
    conjurationXpSpent: 0,
    evocationXpTotal: 0,
    evocationXpSpent: 0,
    transmutationXpTotal: 0,
    transmutationXpSpent: 0
});

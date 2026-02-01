"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appStageAtom = exports.AppStage = void 0;
var jotai_1 = require("jotai");
var AppStage;
(function (AppStage) {
    AppStage[AppStage["Loading"] = 0] = "Loading";
    AppStage[AppStage["Splash"] = 1] = "Splash";
    AppStage[AppStage["Ready"] = 2] = "Ready";
    AppStage[AppStage["Authenticating"] = 3] = "Authenticating";
    AppStage[AppStage["WaitingForServer"] = 4] = "WaitingForServer";
    AppStage[AppStage["Connected"] = 5] = "Connected";
})(AppStage = exports.AppStage || (exports.AppStage = {}));
exports.appStageAtom = jotai_1.atom(AppStage.Loading);

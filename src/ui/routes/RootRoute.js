"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRoute = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var jotai_1 = require("jotai");
var atoms_1 = require("@/atoms");
var LoginScreen_1 = require("@/components/LoginScreen");
var Authenticating_1 = require("@/components/Authenticating");
var ServersScreen_1 = require("@/components/ServersScreen");
var Dashboard_1 = require("@/components/Dashboard");
var RootRoute = function () {
    var appStage = jotai_1.useAtom(atoms_1.appStageAtom)[0];
    switch (appStage) {
        case atoms_1.AppStage.Connected:
            return jsx_runtime_1.jsx(Dashboard_1.Dashboard, {}, void 0);
        case atoms_1.AppStage.WaitingForServer:
            return jsx_runtime_1.jsx(ServersScreen_1.ServersScreen, {}, void 0);
        case atoms_1.AppStage.Authenticating:
            return jsx_runtime_1.jsx(Authenticating_1.Authenticating, { stage: Authenticating_1.AuthenticatingStage.Authenticating }, void 0);
        case atoms_1.AppStage.Ready:
        case atoms_1.AppStage.Splash:
        case atoms_1.AppStage.Loading:
            return jsx_runtime_1.jsx(LoginScreen_1.LoginScreen, {}, void 0);
    }
};
exports.RootRoute = RootRoute;

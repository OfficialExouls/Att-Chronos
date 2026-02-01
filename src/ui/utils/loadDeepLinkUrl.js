"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDeepLinkUrl = void 0;
var config_1 = __importDefault(require("../config"));
var loadDeepLinkUrl = function (ui) { return function (deeplink) {
    var url = deeplink === null || deeplink === void 0 ? void 0 : deeplink.replace('att-voodoo://', '');
    var loadURL = config_1.default.APP_URL + "/" + url;
    setTimeout(function () {
        ui === null || ui === void 0 ? void 0 : ui.loadURL(loadURL);
    }, 1000);
}; };
exports.loadDeepLinkUrl = loadDeepLinkUrl;

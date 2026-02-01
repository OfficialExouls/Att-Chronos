"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMacOSSecondInstance = void 0;
var loadDeepLinkUrl_1 = require("./loadDeepLinkUrl");
var handleMacOSSecondInstance = function (ui) { return function (event, url) {
    if (url.startsWith('att-voodoo://')) {
        var loadUrl = loadDeepLinkUrl_1.loadDeepLinkUrl(ui);
        loadUrl(url);
    }
}; };
exports.handleMacOSSecondInstance = handleMacOSSecondInstance;

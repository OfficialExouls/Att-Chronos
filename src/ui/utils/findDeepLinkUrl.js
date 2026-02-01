"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDeepLinkUrl = void 0;
var findDeepLinkUrl = function (deeplink) { return deeplink.find(function (arg) { return arg.startsWith('att-voodoo://'); }); };
exports.findDeepLinkUrl = findDeepLinkUrl;

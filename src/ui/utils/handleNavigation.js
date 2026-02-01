"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNavigation = void 0;
var handleNavigation = function (shell) { return function (event, url) {
    if (url.startsWith('alta://') ||
        url.startsWith('https://accounts.townshiptale.com/') ||
        url === 'https://discord.gg/THy2AVBPHX' ||
        url === 'https://twitter.com/ubizozo') {
        event.preventDefault();
        shell.openExternal(url);
    }
}; };
exports.handleNavigation = handleNavigation;

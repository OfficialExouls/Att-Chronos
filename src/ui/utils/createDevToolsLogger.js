"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDevToolsLogger = void 0;
var createDevToolsLogger = function (win) { return function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, args);
    (_a = win === null || win === void 0 ? void 0 : win.webContents) === null || _a === void 0 ? void 0 : _a.executeJavaScript("console.log(..." + JSON.stringify(args) + ")");
}; };
exports.createDevToolsLogger = createDevToolsLogger;

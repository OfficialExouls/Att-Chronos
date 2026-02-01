"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleInstanceLock = void 0;
var singleInstanceLock = function (app) {
    var hasInstanceLock = app.requestSingleInstanceLock();
    if (!hasInstanceLock) {
        app.quit();
    }
};
exports.singleInstanceLock = singleInstanceLock;

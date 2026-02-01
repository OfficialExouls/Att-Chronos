"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUriScheme = void 0;
var path_1 = __importDefault(require("path"));
var setUriScheme = function (app) {
    app.removeAsDefaultProtocolClient('att-voodoo');
    if (process.env.NODE_ENV === 'development' && process.platform === 'win32') {
        app.setAsDefaultProtocolClient('att-voodoo', process.execPath, [path_1.default.resolve(process.argv[1])]);
    }
    else {
        app.setAsDefaultProtocolClient('att-voodoo');
    }
};
exports.setUriScheme = setUriScheme;

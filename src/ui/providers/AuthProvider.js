"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var AltaAuth_1 = require("@/components/AltaAuth");
var config = {
    // client_id: process.env.ALTA_CLIENT_ID,
    client_id: 'client_30dd429d-6d00-4d83-98c1-c159f5ec2b92',
    scope: 'openid',
    redirect_uri: 'att-voodoo://auth-callback'
};
var AuthProvider = function (_a) {
    var children = _a.children;
    return jsx_runtime_1.jsx(AltaAuth_1.AuthProvider, __assign({ config: config }, { children: children }), void 0);
};
exports.AuthProvider = AuthProvider;

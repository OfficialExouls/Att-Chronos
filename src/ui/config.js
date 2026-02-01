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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var electron_is_dev_1 = __importDefault(require("electron-is-dev"));
var development = {
    VOODOO_EXE_PATH: path_1.default.resolve(__dirname, '../../build/speech/VoodooListener.exe'),
    VOODOO_GRAMMAR_PATH: path_1.default.resolve(__dirname, '../../build/speech/grammar.xml'),
    APP_URL: 'http://localhost:9001/#',
    API_ENDPOINTS: {
        SESSION: 'http://localhost:3000/session',
        PLAYER: 'http://localhost:3000/player',
        SETTINGS: 'http://localhost:3000/settings',
        SPELLBOOK: 'http://localhost:3000/spellbook',
        UPGRADE: 'http://localhost:3000/upgrade',
        HEARTBEAT: 'http://localhost:3000/heartbeat',
        INCANTATION: 'http://localhost:3000/incantation',
        BLOOD_INCANTATION: 'http://localhost:3000/blood-incantation',
        HEARTFRUIT: 'http://localhost:3000/heartfruit',
        SEAL: 'http://localhost:3000/seal',
        TRIGGER: 'http://localhost:3000/trigger'
    },
    INTERVALS: {
        current: 15000,
        SERVER_WAIT: 15000,
        HEARTBEAT: 60000
    }
};
var production = {
    VOODOO_EXE_PATH: path_1.default.resolve(process.resourcesPath, 'speech/VoodooListener.exe'),
    VOODOO_GRAMMAR_PATH: path_1.default.resolve(process.resourcesPath, 'speech/grammar.xml'),
    APP_URL: "file://" + path_1.default.resolve(__dirname, '../../build/ui/index.html') + "#",
    API_ENDPOINTS: {
        SESSION: 'https://att-voodoo-server.herokuapp.com/session',
        PLAYER: 'https://att-voodoo-server.herokuapp.com/player',
        SETTINGS: 'https://att-voodoo-server.herokuapp.com/settings',
        SPELLBOOK: 'https://att-voodoo-server.herokuapp.com/spellbook',
        UPGRADE: 'https://att-voodoo-server.herokuapp.com/upgrade',
        HEARTBEAT: 'https://att-voodoo-server.herokuapp.com/heartbeat',
        INCANTATION: 'https://att-voodoo-server.herokuapp.com/incantation',
        BLOOD_INCANTATION: 'https://att-voodoo-server.herokuapp.com/blood-incantation',
        HEARTFRUIT: 'https://att-voodoo-server.herokuapp.com/heartfruit',
        SEAL: 'https://att-voodoo-server.herokuapp.com/seal',
        TRIGGER: 'https://att-voodoo-server.herokuapp.com/trigger'
    },
    INTERVALS: {
        current: 15000,
        SERVER_WAIT: 15000,
        HEARTBEAT: 60000
    }
};
var config = {
    development: development,
    production: production
};
var environment = electron_is_dev_1.default ? 'development' : 'production';
exports.default = __assign({}, config[environment]);

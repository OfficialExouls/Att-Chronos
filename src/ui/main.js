"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var electron_is_dev_1 = __importDefault(require("electron-is-dev"));
var dotenv_1 = require("dotenv");
var utils_1 = require("./utils");
var config_1 = __importDefault(require("./config"));
/* Configure application instance. */
dotenv_1.config();
utils_1.singleInstanceLock(electron_1.app);
utils_1.setUriScheme(electron_1.app);
/* Initialise application. */
var initialiseApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    var speech, ui, psb, terminateProcesses, logger;
    return __generator(this, function (_a) {
        speech = null;
        ui = new electron_1.BrowserWindow({
            title: 'Voodoo',
            width: 360,
            height: 640,
            useContentSize: true,
            resizable: false,
            maximizable: false,
            fullscreenable: false,
            backgroundColor: '#062724',
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true,
                backgroundThrottling: false
            },
            show: false
        });
        psb = electron_1.powerSaveBlocker.start('prevent-app-suspension');
        terminateProcesses = function () {
            ui = null;
            speech === null || speech === void 0 ? void 0 : speech.kill();
            speech = null;
            electron_1.powerSaveBlocker.stop(psb);
        };
        /* Prevent window refesh. */
        if (!electron_is_dev_1.default) {
            if (process.platform === 'win32')
                ui.removeMenu(); // Windows
            if (process.platform === 'darwin')
                electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate([]));
        }
        /* On application quit, terminate processes. */
        ui.on('closed', terminateProcesses);
        /* Handle att-voodoo:// deep links. */
        electron_1.app.on('open-url', utils_1.handleMacOSSecondInstance(ui));
        electron_1.app.on('second-instance', utils_1.handleWindowsSecondInstance(ui));
        ui.webContents.on('will-navigate', utils_1.handleNavigation(electron_1.shell));
        /* Display UI window when finished loading. */
        ui.on('show', function () { return setTimeout(function () { return ui === null || ui === void 0 ? void 0 : ui.focus(); }, 200); });
        ui.once('ready-to-show', function () { return ui === null || ui === void 0 ? void 0 : ui.show(); });
        logger = utils_1.createDevToolsLogger(ui);
        /* Load the application and setup inter-process communication. */
        ui.loadURL(config_1.default.APP_URL).then(function () { return utils_1.setupIPC(ui, speech, logger); });
        /* Open DevTools window. */
        if (electron_is_dev_1.default) {
            ui.webContents.openDevTools({ mode: 'detach', activate: true });
        }
        return [2 /*return*/];
    });
}); };
/* Bootstrap application. */
electron_1.app.on('ready', initialiseApp);

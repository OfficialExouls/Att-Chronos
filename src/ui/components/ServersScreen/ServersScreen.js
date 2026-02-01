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
exports.ServersScreen = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var electron_1 = require("electron");
var react_1 = require("react");
var jotai_1 = require("jotai");
var atoms_1 = require("@/atoms");
var ServersScreen_module_css_1 = __importDefault(require("./ServersScreen.module.css"));
var intervalHandle;
var LauncherLink = function (_a) {
    var groupId = _a.groupId, children = _a.children;
    if (groupId === 0)
        return jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: children }, void 0);
    return jsx_runtime_1.jsx("a", __assign({ href: "alta://social/group/" + groupId }, { children: children }), void 0);
};
var ServersScreen = function () {
    var _a = react_1.useState(-3), timeLeft = _a[0], setTimeLeft = _a[1];
    var _b = jotai_1.useAtom(atoms_1.serversAtom), servers = _b[0], setServers = _b[1];
    var _c = jotai_1.useAtom(atoms_1.activeServerAtom), setActiveServer = _c[1];
    var _d = jotai_1.useAtom(atoms_1.appStageAtom), setAppStage = _d[1];
    var _e = jotai_1.useAtom(atoms_1.speechModeAtom), setSpeechMode = _e[1];
    var handleUpdateServers = react_1.useCallback(function (_, _a) {
        var playerJoined = _a.playerJoined, updatedServers = _a.servers;
        setServers(updatedServers);
        if (playerJoined) {
            setActiveServer(playerJoined);
            electron_1.ipcRenderer.invoke('server-connected');
            setAppStage(atoms_1.AppStage.Connected);
        }
    }, [setServers, setActiveServer, setAppStage]);
    var handleVoodooSuppressed = react_1.useCallback(function () {
        setSpeechMode(atoms_1.SpeechMode.Suppressed);
    }, [setSpeechMode]);
    react_1.useEffect(function () {
        electron_1.ipcRenderer.invoke('server-disconnected');
        electron_1.ipcRenderer.on('update-servers', handleUpdateServers);
        electron_1.ipcRenderer.on('voodoo-suppressed', handleVoodooSuppressed);
        return function () {
            electron_1.ipcRenderer.removeListener('update-server', handleUpdateServers);
            electron_1.ipcRenderer.removeListener('voodoo-suppressed', handleVoodooSuppressed);
        };
    }, [handleUpdateServers, handleVoodooSuppressed]);
    react_1.useEffect(function () {
        setTimeLeft(function (t) { return Math.min(15, t + 15); });
        intervalHandle = window.setInterval(function () {
            setTimeLeft(function (t) { return (t > 0 ? t - 1 : 0); });
        }, 980);
        return function () {
            clearInterval(intervalHandle);
        };
    }, [servers]);
    var timer = timeLeft ? timeLeft + "s" : jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: "refreshing\u2026" }, void 0);
    return (jsx_runtime_1.jsxs("div", __assign({ className: ServersScreen_module_css_1.default.root }, { children: [jsx_runtime_1.jsx("span", __assign({ className: ServersScreen_module_css_1.default.message }, { children: "Waiting for server\u2026" }), void 0),
            jsx_runtime_1.jsxs("small", __assign({ className: ServersScreen_module_css_1.default.instructions }, { children: [jsx_runtime_1.jsx("br", {}, void 0), "Voodoo will automatically connect to the same server you join in-game if that server supports Voodoo.", jsx_runtime_1.jsx("br", {}, void 0),
                    jsx_runtime_1.jsx("br", {}, void 0), "Click a server to open in launcher"] }), void 0),
            jsx_runtime_1.jsx("br", {}, void 0),
            jsx_runtime_1.jsxs("table", __assign({ className: ServersScreen_module_css_1.default.servers, cellPadding: 0, cellSpacing: 0 }, { children: [jsx_runtime_1.jsx("thead", { children: jsx_runtime_1.jsxs("tr", { children: [jsx_runtime_1.jsxs("th", __assign({ align: 'left' }, { children: ["Voodoo Servers (", timer, ")"] }), void 0),
                                jsx_runtime_1.jsx("th", __assign({ align: 'right' }, { children: jsx_runtime_1.jsx("abbr", __assign({ title: 'Players online' }, { children: "#" }), void 0) }), void 0)] }, void 0) }, void 0),
                    jsx_runtime_1.jsx("tbody", { children: servers.length ? (servers
                            .sort(function (a, b) { return (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1); })
                            .sort(function (a, b) { return b.players - a.players; })
                            .sort(function (a, b) { return Number(b.online) - Number(a.online); })
                            .map(function (server, index) { return (jsx_runtime_1.jsxs("tr", __assign({ className: !server.online ? ServersScreen_module_css_1.default.offline : undefined }, { children: [jsx_runtime_1.jsx("td", __assign({ align: 'left' }, { children: jsx_runtime_1.jsx(LauncherLink, __assign({ groupId: server.groupId }, { children: server.name }), void 0) }), void 0),
                                jsx_runtime_1.jsx("td", __assign({ align: 'right' }, { children: server.players }), void 0)] }), index)); })) : (jsx_runtime_1.jsx("tr", { children: jsx_runtime_1.jsx("td", __assign({ className: ServersScreen_module_css_1.default.noServers, colSpan: 2 }, { children: "No servers online" }), void 0) }, void 0)) }, void 0)] }), void 0)] }), void 0));
};
exports.ServersScreen = ServersScreen;

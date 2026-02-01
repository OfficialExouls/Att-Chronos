"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCallbackRoute = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var electron_1 = require("electron");
var react_1 = require("react");
var jotai_1 = require("jotai");
var react_router_dom_1 = require("react-router-dom");
var atoms_1 = require("@/atoms");
var AltaAuth_1 = require("@/components/AltaAuth");
var Authenticating_1 = require("@/components/Authenticating");
var AuthCallbackRoute = function () {
    var _a, _b, _c;
    var history = react_router_dom_1.useHistory();
    var auth = AltaAuth_1.useAuth();
    var timeout = react_1.useRef(null);
    var isFetching = react_1.useRef(false);
    var _d = react_1.useState(null), accountId = _d[0], setAccountId = _d[1];
    var _e = react_1.useState(null), fatalError = _e[0], setFatalError = _e[1];
    var _f = jotai_1.useAtom(atoms_1.appStageAtom), appStage = _f[0], setAppStage = _f[1];
    var _g = jotai_1.useAtom(atoms_1.activeServerAtom), setActiveServer = _g[1];
    var _h = jotai_1.useAtom(atoms_1.serversAtom), setServers = _h[1];
    var _j = jotai_1.useAtom(atoms_1.hasSessionAtom), hasSession = _j[0], setHasSession = _j[1];
    var _k = jotai_1.useAtom(atoms_1.accessTokenAtom), setAccessToken = _k[1];
    var _l = jotai_1.useAtom(atoms_1.spellbookAtom), setSpellbook = _l[1];
    /* Call Alta auth library. */
    react_1.useEffect(function () {
        if (hasSession) {
            history.replace('/');
        }
        else {
            electron_1.ipcRenderer.invoke('focus');
            window.altaApi.oidc.signinCallback();
        }
    }, [hasSession, history]);
    /* Automatically redirect shortly after completing auth flow. */
    react_1.useEffect(function () {
        if (accountId && appStage > atoms_1.AppStage.Authenticating && !timeout.current) {
            timeout.current = setTimeout(function () {
                history.replace('/');
            }, 2700);
        }
    }, [accountId, appStage]);
    if (fatalError)
        return jsx_runtime_1.jsx(Authenticating_1.Authenticating, { stage: Authenticating_1.AuthenticatingStage.FatalError, error: fatalError }, void 0);
    if (appStage > atoms_1.AppStage.Authenticating)
        return jsx_runtime_1.jsx(Authenticating_1.Authenticating, { stage: Authenticating_1.AuthenticatingStage.Ready }, void 0);
    if (accountId)
        return jsx_runtime_1.jsx(Authenticating_1.Authenticating, { stage: Authenticating_1.AuthenticatingStage.CreatingSession }, void 0);
    if ((auth === null || auth === void 0 ? void 0 : auth.userData) && !isFetching.current) {
        isFetching.current = true;
        electron_1.ipcRenderer
            .invoke('session', {
            accountId: (_b = (_a = auth.userData) === null || _a === void 0 ? void 0 : _a.profile) === null || _b === void 0 ? void 0 : _b.sub,
            accessToken: (_c = auth.userData) === null || _c === void 0 ? void 0 : _c.access_token
        })
            .then(function (_a) {
            var _b, _c, _d, _e, _f;
            var session = _a.session, spellbook = _a.spellbook;
            if (session.ok) {
                setHasSession(true);
                setAccessToken((_c = (_b = auth.userData) === null || _b === void 0 ? void 0 : _b.access_token) !== null && _c !== void 0 ? _c : null);
                setAccountId(Number((_f = (_e = (_d = auth.userData) === null || _d === void 0 ? void 0 : _d.profile) === null || _e === void 0 ? void 0 : _e.sub) !== null && _f !== void 0 ? _f : 0));
                setServers(session.result.servers);
                if (spellbook.ok) {
                    setSpellbook(spellbook.result);
                    if (session.result.playerJoined) {
                        electron_1.ipcRenderer.invoke('server-connected');
                        setActiveServer(session.result.playerJoined);
                        setAppStage(atoms_1.AppStage.Connected);
                    }
                    else {
                        setAppStage(atoms_1.AppStage.WaitingForServer);
                    }
                }
                else {
                    console.error(spellbook.error);
                    setFatalError(spellbook.error);
                }
            }
            else {
                console.error(session.error);
                setFatalError(session.error);
            }
        })
            .catch(function (error) {
            console.error(error);
            setFatalError(error);
        });
    }
    if (auth === null || auth === void 0 ? void 0 : auth.userData)
        return jsx_runtime_1.jsx(Authenticating_1.Authenticating, { stage: Authenticating_1.AuthenticatingStage.ExchangingToken }, void 0);
    return jsx_runtime_1.jsx(Authenticating_1.Authenticating, { stage: Authenticating_1.AuthenticatingStage.Authenticating }, void 0);
};
exports.AuthCallbackRoute = AuthCallbackRoute;

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
exports.LoginButton = exports.RequireAuth = exports.withAuth = exports.useAuth = exports.AuthProvider = exports.AuthConsumer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var jotai_1 = require("jotai");
var atoms_1 = require("@/atoms");
function loadScript(callback) {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://accounts.townshiptale.com/includes/altastyle.css';
    document.head.appendChild(style);
    var element = document.createElement('script');
    element.setAttribute('src', 'https://accounts.townshiptale.com/includes/altaapi.js');
    document.head.appendChild(element);
    element.onload = callback;
}
var AuthContext = react_1.default.createContext(null);
exports.AuthConsumer = AuthContext.Consumer;
var AuthProvider = function (_a) {
    var config = _a.config, children = _a.children, _b = _a.configureManager, configureManager = _b === void 0 ? undefined : _b, _c = _a.location, location = _c === void 0 ? window.location : _c, _d = _a.autoSignIn, autoSignIn = _d === void 0 ? false : _d;
    var _e = react_1.default.useState(false), loaded = _e[0], setLoaded = _e[1];
    var _f = react_1.default.useState(null), userData = _f[0], setUserData = _f[1];
    var _g = jotai_1.useAtom(atoms_1.appStageAtom), appStage = _g[0], setAppStage = _g[1];
    react_1.default.useEffect(function () {
        if (loaded)
            setAppStage(atoms_1.AppStage.Splash);
    }, [loaded]);
    react_1.default.useEffect(function () {
        loadScript(function () {
            window.altaApi.signIn = function () { return window.altaApi.oidc.signinRedirect(); };
            window.altaApi.init(config, function () {
                configureManager && configureManager(window.altaApi.oidc);
                window.altaApi.oidc.events.addUserLoaded(function (user) {
                    // console.log('User loaded');
                    // console.log({ user });
                    setUserData(user);
                });
                window.altaApi.oidc.events.addUserUnloaded(function () {
                    // console.log('User unloaded');
                    setUserData(null);
                });
                window.altaApi.checkSignInCallback(location);
                setLoaded(true);
            });
        });
    }, []);
    react_1.default.useEffect(function () {
        if (!!window.altaApi) {
            if (window.altaApi.checkSignInCallback(location)) {
                return;
            }
            var getUser = function () { return __awaiter(void 0, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, window.altaApi.getUser()];
                        case 1:
                            user = _a.sent();
                            if (!!user && !user.expired && !userData) {
                                setUserData(user);
                            }
                            else if ((!user || user.expired) && autoSignIn) {
                                // console.log('SIGNIN');
                                // console.log({ user });
                                window.altaApi
                                    .signIn()
                                    // .then((result: any) => console.log({ result }))
                                    .catch(function (error) { return console.error({ error: error }); });
                            }
                            return [2 /*return*/];
                    }
                });
            }); };
            getUser();
        }
    }, [location, !!window.altaApi]);
    return (jsx_runtime_1.jsx(AuthContext.Provider, __assign({ value: !!window.altaApi ? __assign(__assign({}, window.altaApi), { userData: userData }) : undefined }, { children: children }), void 0));
};
exports.AuthProvider = AuthProvider;
var useAuth = function () { return react_1.default.useContext(AuthContext); };
exports.useAuth = useAuth;
/**
 * A public higher-order component to access the imperative API
 */
function withAuth(Component) {
    var displayName = "withAuth(" + (Component.displayName || Component.name) + ")";
    var C = function (props) {
        var auth = exports.useAuth();
        return jsx_runtime_1.jsx(Component, __assign({}, props, auth), void 0);
    };
    C.displayName = displayName;
    return C;
}
exports.withAuth = withAuth;
var RequireAuth = function (_a) {
    var LoggingInComponent = _a.LoggingInComponent, children = _a.children;
    var auth = exports.useAuth();
    react_1.default.useEffect(function () {
        if (!!(auth === null || auth === void 0 ? void 0 : auth.oidc) && !auth.userData) {
            auth === null || auth === void 0 ? void 0 : auth.signIn().catch(function (error) { return console.error({ useEffectError: error }); });
        }
    }, [!!(auth === null || auth === void 0 ? void 0 : auth.oidc), auth === null || auth === void 0 ? void 0 : auth.userData]);
    if (!(auth === null || auth === void 0 ? void 0 : auth.userData)) {
        if (!!LoggingInComponent) {
            var Component = LoggingInComponent;
            return jsx_runtime_1.jsx(Component, { retry: function () { return auth === null || auth === void 0 ? void 0 : auth.signIn(); } }, void 0);
        }
        else {
            return (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("h1", { children: "Showing login in popup." }, void 0),
                    jsx_runtime_1.jsx("button", __assign({ onClick: function () {
                            return auth === null || auth === void 0 ? void 0 : auth.signIn().catch(function (error) { return console.error({ buttonClickError: error }); });
                        } }, { children: "Click here if it doesn't appear." }), void 0)] }, void 0));
        }
    }
    return jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: children }, void 0);
};
exports.RequireAuth = RequireAuth;
var LoginButton = function (_a) {
    var _b, _c, _d, _e, _f;
    var _g = _a.small, small = _g === void 0 ? false : _g, style = _a.style, _h = _a.type, type = _h === void 0 ? 'auto' : _h;
    var _j = jotai_1.useAtom(atoms_1.appStageAtom), appStage = _j[0], setAppStage = _j[1];
    var auth = exports.useAuth();
    var isLogin = type === 'auto' ? !(auth === null || auth === void 0 ? void 0 : auth.userData) : type === 'login';
    var username = (_d = (_c = (_b = auth === null || auth === void 0 ? void 0 : auth.userData) === null || _b === void 0 ? void 0 : _b.profile) === null || _c === void 0 ? void 0 : _c.Username) !== null && _d !== void 0 ? _d : (_f = (_e = auth === null || auth === void 0 ? void 0 : auth.userData) === null || _e === void 0 ? void 0 : _e.profile) === null || _f === void 0 ? void 0 : _f.sub;
    var onClick = function () {
        if (!(auth === null || auth === void 0 ? void 0 : auth.oidc)) {
            console.error("Can't login until alta login library is loaded.");
            return;
        }
        setAppStage(atoms_1.AppStage.Authenticating);
        var login = isLogin ? auth.signIn : auth.signOut;
        login().catch(console.error);
    };
    var className = isLogin ? 'alta_loginWithAlta' : 'alta_loginWithAlta alta_loggedIn';
    return (jsx_runtime_1.jsx("div", __assign({ className: className, style: style }, { children: jsx_runtime_1.jsxs("button", __assign({ onClick: onClick, style: { WebkitFontSmoothing: 'initial' } }, { children: [jsx_runtime_1.jsx("img", { alt: 'icon1', src: 'https://accounts.townshiptale.com/icon.svg' }, void 0),
                jsx_runtime_1.jsx("img", { alt: 'icon2', src: 'https://accounts.townshiptale.com/icon.svg' }, void 0),
                jsx_runtime_1.jsx("span", __assign({ className: 'alta_noHover' }, { children: isLogin ? (small ? 'Login' : 'Login with Alta') : username }), void 0),
                jsx_runtime_1.jsx("span", __assign({ className: 'alta_hover' }, { children: isLogin ? (small ? 'Login' : 'Login with Alta') : 'Logout' }), void 0)] }), void 0) }), void 0));
};
exports.LoginButton = LoginButton;

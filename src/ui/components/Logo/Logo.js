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
exports.Logo = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Logo_module_css_1 = __importDefault(require("./Logo.module.css"));
var Voodoo_png_1 = __importDefault(require("@/images/Voodoo.png"));
var small_gem_1_png_1 = __importDefault(require("@/images/small-gem-1.png"));
var small_gem_2_png_1 = __importDefault(require("@/images/small-gem-2.png"));
var glow_png_1 = __importDefault(require("@/images/glow.png"));
var particles_png_1 = __importDefault(require("@/images/particles.png"));
var reveal = function (_a) {
    var currentTarget = _a.currentTarget;
    return (currentTarget.style.opacity = '1');
};
var Logo = function () { return (jsx_runtime_1.jsxs("div", __assign({ className: Logo_module_css_1.default.root }, { children: [jsx_runtime_1.jsx("div", __assign({ className: Logo_module_css_1.default.illumination }, { children: jsx_runtime_1.jsx("div", { className: Logo_module_css_1.default.shadow }, void 0) }), void 0),
        jsx_runtime_1.jsxs("div", __assign({ className: Logo_module_css_1.default.pivot }, { children: [jsx_runtime_1.jsxs("div", __assign({ className: Logo_module_css_1.default.gems }, { children: [jsx_runtime_1.jsx("img", { className: Logo_module_css_1.default.smallGem1, src: small_gem_1_png_1.default, alt: '', onLoad: reveal }, void 0),
                        jsx_runtime_1.jsx("img", { className: Logo_module_css_1.default.smallGem2, src: small_gem_2_png_1.default, alt: '', onLoad: reveal }, void 0)] }), void 0),
                jsx_runtime_1.jsx("img", { className: Logo_module_css_1.default.logo, src: Voodoo_png_1.default, alt: 'Voodoo logo', onLoad: reveal }, void 0),
                jsx_runtime_1.jsx("img", { className: Logo_module_css_1.default.glow, src: glow_png_1.default, alt: '', onLoad: reveal }, void 0),
                jsx_runtime_1.jsxs("div", __assign({ className: Logo_module_css_1.default.particles }, { children: [jsx_runtime_1.jsx("img", { src: particles_png_1.default, alt: '', onLoad: reveal }, void 0),
                        jsx_runtime_1.jsx("img", { src: particles_png_1.default, alt: '', onLoad: reveal }, void 0),
                        jsx_runtime_1.jsx("img", { src: particles_png_1.default, alt: '', onLoad: reveal }, void 0),
                        jsx_runtime_1.jsx("img", { src: particles_png_1.default, alt: '', onLoad: reveal }, void 0)] }), void 0)] }), void 0)] }), void 0)); };
exports.Logo = Logo;

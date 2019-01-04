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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var classnames_1 = __importDefault(require("classnames"));
var Responsive_1 = __importDefault(require("./Responsive"));
var AppBarMobile_1 = __importDefault(require("./AppBarMobile"));
/**
 * @deprecated
 */
var ViewTitle = function (_a) {
    var className = _a.className, title = _a.title, rest = __rest(_a, ["className", "title"]);
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('<ViewTitle> is deprecated, please use <Title> instead');
    }
    return (react_1.default.createElement(Responsive_1.default, { xsmall: react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(AppBarMobile_1.default, __assign({ className: classnames_1.default('title', className), title: title }, rest)),
            react_1.default.createElement("span", null, " ")), medium: react_1.default.createElement(CardContent_1.default, __assign({ className: classnames_1.default('title', className) }, rest),
            react_1.default.createElement(Typography_1.default, { variant: "title" }, title)) }));
};
ViewTitle.propTypes = {
    className: prop_types_1.default.string,
    title: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.element])
        .isRequired,
};
exports.default = ViewTitle;

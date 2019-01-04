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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var ViewTitle_1 = __importDefault(require("./ViewTitle"));
var styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};
/**
 * @deprecated
 */
exports.Header = function (_a) {
    var classes = _a.classes, className = _a.className, title = _a.title, actions = _a.actions, actionProps = _a.actionProps, rest = __rest(_a, ["classes", "className", "title", "actions", "actionProps"]);
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('<Header> is deprecated, please use <Title> directly instead');
    }
    return (react_1.default.createElement("div", __assign({ className: classnames_1.default(classes.root, className) }, rest),
        react_1.default.createElement(ViewTitle_1.default, { title: title }),
        actions && react_1.default.cloneElement(actions, actionProps)));
};
exports.Header.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    title: prop_types_1.default.any,
    actions: prop_types_1.default.element,
    actionProps: prop_types_1.default.object,
};
exports.default = styles_1.withStyles(styles)(exports.Header);

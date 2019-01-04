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
var classnames_1 = __importDefault(require("classnames"));
var react_router_dom_1 = require("react-router-dom");
var styles_1 = require("@material-ui/core/styles");
var styles = function (theme) { return ({
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
    },
}); };
/**
 * @deprecated Use react-router-dom's Link instead
 */
var Link = function (_a) {
    var to = _a.to, children = _a.children, className = _a.className, classes = _a.classes, rest = __rest(_a, ["to", "children", "className", "classes"]);
    return (react_1.default.createElement(react_router_dom_1.Link, __assign({ to: to, className: classnames_1.default(classes.link, className) }, rest), children));
};
Link.propTypes = {
    className: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    children: prop_types_1.default.node,
    to: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.object]),
};
exports.default = styles_1.withStyles(styles)(Link);

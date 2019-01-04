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
var LinearProgress_1 = __importDefault(require("@material-ui/core/LinearProgress"));
var prop_types_1 = __importDefault(require("prop-types"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var styles = function (theme) { return ({
    root: {
        margin: theme.spacing.unit + "px 0",
        width: theme.spacing.unit * 20 + "px",
    },
}); };
/**
 * Progress bar formatted to replace an input or a field in a form layout
 *
 * Avoids visual jumps when replaced by value or form input
 *
 * @see ReferenceField
 * @see ReferenceInput
 *
 * @param {object} classes CSS class names injected by withStyles
 */
exports.LinearProgress = function (_a) {
    var classes = _a.classes, className = _a.className, rest = __rest(_a, ["classes", "className"]);
    return (react_1.default.createElement(LinearProgress_1.default, __assign({ className: classnames_1.default(classes.root, className) }, rest)));
};
exports.LinearProgress.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
};
// wat? TypeScript looses the displayName if we don't set it explicitly
exports.LinearProgress.displayName = 'LinearProgress';
exports.default = styles_1.withStyles(styles)(exports.LinearProgress);

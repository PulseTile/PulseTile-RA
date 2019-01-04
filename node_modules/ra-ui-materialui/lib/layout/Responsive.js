"use strict";
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
var withWidth_1 = __importDefault(require("@material-ui/core/withWidth"));
exports.Responsive = function (_a) {
    var xsmall = _a.xsmall, small = _a.small, medium = _a.medium, large = _a.large, width = _a.width, rest = __rest(_a, ["xsmall", "small", "medium", "large", "width"]);
    var element;
    switch (width) {
        case 'xs':
            element =
                typeof xsmall !== 'undefined'
                    ? xsmall
                    : typeof small !== 'undefined'
                        ? small
                        : typeof medium !== 'undefined'
                            ? medium
                            : large;
            break;
        case 'sm':
            element =
                typeof small !== 'undefined'
                    ? small
                    : typeof medium !== 'undefined'
                        ? medium
                        : large;
            break;
        case 'md':
            element =
                typeof medium !== 'undefined'
                    ? medium
                    : typeof large !== 'undefined'
                        ? large
                        : small;
            break;
        case 'lg':
        case 'xl':
            element =
                typeof large !== 'undefined'
                    ? large
                    : typeof medium !== 'undefined'
                        ? medium
                        : small;
            break;
        default:
            throw new Error("Unknown width " + width);
    }
    return element ? react_1.default.cloneElement(element, rest) : null;
};
exports.Responsive.propTypes = {
    xsmall: prop_types_1.default.element,
    small: prop_types_1.default.element,
    medium: prop_types_1.default.element,
    large: prop_types_1.default.element,
    width: prop_types_1.default.string,
};
exports.default = withWidth_1.default()(exports.Responsive);

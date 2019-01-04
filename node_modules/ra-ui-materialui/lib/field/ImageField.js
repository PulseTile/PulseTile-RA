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
var get_1 = __importDefault(require("lodash/get"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
var styles = {
    list: {
        display: 'flex',
        listStyleType: 'none',
    },
    image: {
        margin: '0.5rem',
        maxHeight: '10rem',
    },
};
exports.ImageField = function (_a) {
    var className = _a.className, _b = _a.classes, classes = _b === void 0 ? {} : _b, record = _a.record, source = _a.source, src = _a.src, title = _a.title, rest = __rest(_a, ["className", "classes", "record", "source", "src", "title"]);
    var sourceValue = get_1.default(record, source);
    if (!sourceValue) {
        return react_1.default.createElement("div", __assign({ className: className }, sanitizeRestProps_1.default(rest)));
    }
    if (Array.isArray(sourceValue)) {
        return (react_1.default.createElement("ul", __assign({ className: classnames_1.default(classes.list, className) }, sanitizeRestProps_1.default(rest)), sourceValue.map(function (file, index) {
            var titleValue = get_1.default(file, title) || title;
            var srcValue = get_1.default(file, src) || title;
            return (react_1.default.createElement("li", { key: index },
                react_1.default.createElement("img", { alt: titleValue, title: titleValue, src: srcValue, className: classes.image })));
        })));
    }
    var titleValue = get_1.default(record, title) || title;
    return (react_1.default.createElement("div", __assign({ className: className }, sanitizeRestProps_1.default(rest)),
        react_1.default.createElement("img", { title: titleValue, alt: titleValue, src: sourceValue, className: classes.image })));
};
exports.ImageField.propTypes = {
    addLabel: prop_types_1.default.bool,
    basePath: prop_types_1.default.string,
    className: prop_types_1.default.string,
    cellClassName: prop_types_1.default.string,
    headerClassName: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    record: prop_types_1.default.object,
    sortBy: prop_types_1.default.string,
    source: prop_types_1.default.string.isRequired,
    src: prop_types_1.default.string,
    title: prop_types_1.default.string,
};
// wat? TypeScript looses the displayName if we don't set it explicitly
exports.ImageField.displayName = 'ImageField';
exports.default = styles_1.withStyles(styles)(exports.ImageField);

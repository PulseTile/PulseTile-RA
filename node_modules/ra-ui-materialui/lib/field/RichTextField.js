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
var pure_1 = __importDefault(require("recompose/pure"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
exports.removeTags = function (input) {
    return input ? input.replace(/<[^>]+>/gm, '') : '';
};
var RichTextField = function (_a) {
    var className = _a.className, source = _a.source, _b = _a.record, record = _b === void 0 ? {} : _b, stripTags = _a.stripTags, rest = __rest(_a, ["className", "source", "record", "stripTags"]);
    var value = get_1.default(record, source);
    if (stripTags) {
        return (react_1.default.createElement(Typography_1.default, __assign({ className: className, component: "span" }, sanitizeRestProps_1.default(rest)), exports.removeTags(value)));
    }
    return (react_1.default.createElement(Typography_1.default, __assign({ className: className, component: "span" }, sanitizeRestProps_1.default(rest)),
        react_1.default.createElement("span", { dangerouslySetInnerHTML: { __html: value } })));
};
RichTextField.propTypes = {
    addLabel: prop_types_1.default.bool,
    basePath: prop_types_1.default.string,
    className: prop_types_1.default.string,
    cellClassName: prop_types_1.default.string,
    headerClassName: prop_types_1.default.string,
    label: prop_types_1.default.string,
    record: prop_types_1.default.object,
    sortBy: prop_types_1.default.string,
    source: prop_types_1.default.string.isRequired,
    stripTags: prop_types_1.default.bool,
};
var PureRichTextField = pure_1.default(RichTextField);
PureRichTextField.defaultProps = {
    addLabel: true,
    stripTags: false,
};
exports.default = PureRichTextField;

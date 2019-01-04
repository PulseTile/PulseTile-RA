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
var ra_core_1 = require("ra-core");
/**
 * @deprecated Use Title instead
 */
var Title = function (_a) {
    var className = _a.className, defaultTitle = _a.defaultTitle, record = _a.record, title = _a.title, translate = _a.translate, rest = __rest(_a, ["className", "defaultTitle", "record", "title", "translate"]);
    if (!title) {
        return (react_1.default.createElement("span", __assign({ className: className }, rest), defaultTitle));
    }
    if (typeof title === 'string') {
        return (react_1.default.createElement("span", __assign({ className: className }, rest), translate(title, { _: title })));
    }
    return react_1.default.cloneElement(title, __assign({ className: className, record: record }, rest));
};
Title.propTypes = {
    defaultTitle: prop_types_1.default.string.isRequired,
    className: prop_types_1.default.string,
    record: prop_types_1.default.object,
    translate: prop_types_1.default.func.isRequired,
    title: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.element]),
};
exports.default = ra_core_1.translate(Title);

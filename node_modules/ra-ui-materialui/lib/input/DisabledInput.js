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
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var ra_core_1 = require("ra-core");
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
var DisabledInput = function (_a) {
    var classes = _a.classes, className = _a.className, record = _a.record, value = _a.input.value, label = _a.label, resource = _a.resource, source = _a.source, options = _a.options, rest = __rest(_a, ["classes", "className", "record", "input", "label", "resource", "source", "options"]);
    return (react_1.default.createElement(TextField_1.default, __assign({ disabled: true, margin: "normal", value: value, label: react_1.default.createElement(ra_core_1.FieldTitle, { label: label, source: source, resource: resource }), className: className, classes: classes }, options, sanitizeRestProps_1.default(rest))));
};
DisabledInput.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    label: prop_types_1.default.string,
    input: prop_types_1.default.object,
    options: prop_types_1.default.object,
    record: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    source: prop_types_1.default.string,
};
exports.default = ra_core_1.addField(DisabledInput);

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
var ResettableTextField_1 = __importDefault(require("./ResettableTextField"));
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
exports.LongTextInput = function (_a) {
    var className = _a.className, input = _a.input, meta = _a.meta, isRequired = _a.isRequired, label = _a.label, options = _a.options, source = _a.source, resource = _a.resource, rest = __rest(_a, ["className", "input", "meta", "isRequired", "label", "options", "source", "resource"]);
    if (typeof meta === 'undefined') {
        throw new Error("The LongTextInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
    }
    var touched = meta.touched, error = meta.error;
    return (react_1.default.createElement(ResettableTextField_1.default, __assign({}, input, { className: className, multiline: true, margin: "normal", label: react_1.default.createElement(ra_core_1.FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired }), error: !!(touched && error), helperText: touched && error }, sanitizeRestProps_1.default(rest), options)));
};
exports.LongTextInput.propTypes = {
    className: prop_types_1.default.string,
    input: prop_types_1.default.object,
    isRequired: prop_types_1.default.bool,
    label: prop_types_1.default.string,
    fullWidth: prop_types_1.default.bool,
    meta: prop_types_1.default.object,
    name: prop_types_1.default.string,
    options: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    source: prop_types_1.default.string,
    validate: prop_types_1.default.oneOfType([
        prop_types_1.default.func,
        prop_types_1.default.arrayOf(prop_types_1.default.func),
    ]),
};
var EnhancedLongTextInput = ra_core_1.addField(exports.LongTextInput);
EnhancedLongTextInput.defaultProps = {
    options: {},
    fullWidth: true,
};
exports.default = EnhancedLongTextInput;

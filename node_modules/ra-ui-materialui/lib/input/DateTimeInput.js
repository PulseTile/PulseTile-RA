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
var leftPad = function (nb) {
    if (nb === void 0) { nb = 2; }
    return function (value) { return ('0'.repeat(nb) + value).slice(-nb); };
};
var leftPad4 = leftPad(4);
var leftPad2 = leftPad(2);
/**
 * @param {Date} v value to convert
 * @returns {String} A standardized datetime (yyyy-MM-ddThh:mm), to be passed to an <input type="datetime-local" />
 */
var convertDateToString = function (v) {
    if (!(v instanceof Date) || isNaN(v))
        return '';
    var yyyy = leftPad4(v.getFullYear());
    var MM = leftPad2(v.getMonth() + 1);
    var dd = leftPad2(v.getDate());
    var hh = leftPad2(v.getHours());
    var mm = leftPad2(v.getMinutes());
    return yyyy + "-" + MM + "-" + dd + "T" + hh + ":" + mm;
};
// yyyy-MM-ddThh:mm
var dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
/**
 * Converts a date from the Redux store, with timezone, to a date string
 * without timezone for use in an <input type="datetime-local" />.
 *
 * @param {Mixed} value date string or object
 * @param {String} Date string, formatted as yyyy-MM-ddThh:mm
 */
var format = function (value) {
    // null, undefined and empty string values should not go through convertDateToString
    // otherwise, it returns undefined and will make the input an uncontrolled one.
    if (value == null || value === '') {
        return '';
    }
    // valid dates should not be converted
    if (dateTimeRegex.test(value)) {
        return value;
    }
    var finalValue = typeof value instanceof Date ? value : new Date(value);
    return convertDateToString(finalValue);
};
/**
 * Converts a datetime string without timezone to a date object
 * with timezone, using the browser timezone.
 *
 * @param {String} value Date string, formatted as yyyy-MM-ddThh:mm
 * @return {Date}
 */
var parse = function (value) { return new Date(value); };
/**
 * Input component for entering a date and a time with timezone, using the browser locale
 */
exports.DateTimeInput = function (_a) {
    var className = _a.className, _b = _a.meta, touched = _b.touched, error = _b.error, input = _a.input, isRequired = _a.isRequired, label = _a.label, options = _a.options, source = _a.source, resource = _a.resource, rest = __rest(_a, ["className", "meta", "input", "isRequired", "label", "options", "source", "resource"]);
    return (react_1.default.createElement(TextField_1.default, __assign({}, input, { className: className, type: "datetime-local", margin: "normal", error: !!(touched && error), helperText: touched && error, label: react_1.default.createElement(ra_core_1.FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired }), InputLabelProps: {
            shrink: true,
        } }, options, sanitizeRestProps_1.default(rest), { value: input.value })));
};
exports.DateTimeInput.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    input: prop_types_1.default.object,
    isRequired: prop_types_1.default.bool,
    label: prop_types_1.default.string,
    meta: prop_types_1.default.object,
    options: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    source: prop_types_1.default.string,
};
exports.DateTimeInput.defaultProps = {
    options: {},
};
exports.default = ra_core_1.addField(exports.DateTimeInput, { format: format, parse: parse });

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { addField, FieldTitle } from 'ra-core';
import sanitizeRestProps from './sanitizeRestProps';
/**
 * Convert Date object to String
 *
 * @param {Date} v value to convert
 * @returns {String} A standardized date (yyyy-MM-dd), to be passed to an <input type="date" />
 */
var dateFormatter = function (v) {
    if (!(v instanceof Date) || isNaN(v))
        return;
    var pad = '00';
    var yyyy = v.getFullYear().toString();
    var MM = (v.getMonth() + 1).toString();
    var dd = v.getDate().toString();
    return yyyy + "-" + (pad + MM).slice(-2) + "-" + (pad + dd).slice(-2);
};
var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
var sanitizeValue = function (value) {
    // null, undefined and empty string values should not go through dateFormatter
    // otherwise, it returns undefined and will make the input an uncontrolled one.
    if (value == null || value === '') {
        return '';
    }
    // valid dates should not be converted
    if (dateRegex.test(value)) {
        return value;
    }
    var finalValue = typeof value instanceof Date ? value : new Date(value);
    return dateFormatter(finalValue);
};
var DateInput = /** @class */ (function (_super) {
    __extends(DateInput, _super);
    function DateInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (event) {
            _this.props.input.onChange(event.target.value);
        };
        return _this;
    }
    DateInput.prototype.render = function () {
        var _a = this.props, className = _a.className, meta = _a.meta, input = _a.input, isRequired = _a.isRequired, label = _a.label, options = _a.options, source = _a.source, resource = _a.resource, rest = __rest(_a, ["className", "meta", "input", "isRequired", "label", "options", "source", "resource"]);
        if (typeof meta === 'undefined') {
            throw new Error("The DateInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
        }
        var touched = meta.touched, error = meta.error;
        var value = sanitizeValue(input.value);
        return (React.createElement(TextField, __assign({}, input, { className: className, type: "date", margin: "normal", error: !!(touched && error), helperText: touched && error, label: React.createElement(FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired }), InputLabelProps: {
                shrink: true,
            } }, options, sanitizeRestProps(rest), { value: value, onChange: this.onChange })));
    };
    return DateInput;
}(Component));
export { DateInput };
DateInput.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
};
DateInput.defaultProps = {
    options: {},
};
export default addField(DateInput);

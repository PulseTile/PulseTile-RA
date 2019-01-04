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
import React from 'react';
import PropTypes from 'prop-types';
import { addField, FieldTitle } from 'ra-core';
import ResettableTextField from './ResettableTextField';
import sanitizeRestProps from './sanitizeRestProps';
export var LongTextInput = function (_a) {
    var className = _a.className, input = _a.input, meta = _a.meta, isRequired = _a.isRequired, label = _a.label, options = _a.options, source = _a.source, resource = _a.resource, rest = __rest(_a, ["className", "input", "meta", "isRequired", "label", "options", "source", "resource"]);
    if (typeof meta === 'undefined') {
        throw new Error("The LongTextInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
    }
    var touched = meta.touched, error = meta.error;
    return (React.createElement(ResettableTextField, __assign({}, input, { className: className, multiline: true, margin: "normal", label: React.createElement(FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired }), error: !!(touched && error), helperText: touched && error }, sanitizeRestProps(rest), options)));
};
LongTextInput.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    fullWidth: PropTypes.bool,
    meta: PropTypes.object,
    name: PropTypes.string,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    validate: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func),
    ]),
};
var EnhancedLongTextInput = addField(LongTextInput);
EnhancedLongTextInput.defaultProps = {
    options: {},
    fullWidth: true,
};
export default EnhancedLongTextInput;

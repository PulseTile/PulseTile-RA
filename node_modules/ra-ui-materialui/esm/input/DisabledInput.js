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
import TextField from '@material-ui/core/TextField';
import { addField, FieldTitle } from 'ra-core';
import sanitizeRestProps from './sanitizeRestProps';
var DisabledInput = function (_a) {
    var classes = _a.classes, className = _a.className, record = _a.record, value = _a.input.value, label = _a.label, resource = _a.resource, source = _a.source, options = _a.options, rest = __rest(_a, ["classes", "className", "record", "input", "label", "resource", "source", "options"]);
    return (React.createElement(TextField, __assign({ disabled: true, margin: "normal", value: value, label: React.createElement(FieldTitle, { label: label, source: source, resource: resource }), className: className, classes: classes }, options, sanitizeRestProps(rest))));
};
DisabledInput.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.object,
    options: PropTypes.object,
    record: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
};
export default addField(DisabledInput);

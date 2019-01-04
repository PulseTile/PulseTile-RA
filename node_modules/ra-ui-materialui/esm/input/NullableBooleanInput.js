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
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { addField, translate, FieldTitle } from 'ra-core';
import sanitizeRestProps from './sanitizeRestProps';
var styles = function (theme) { return ({
    input: { width: theme.spacing.unit * 16 },
}); };
var NullableBooleanInput = /** @class */ (function (_super) {
    __extends(NullableBooleanInput, _super);
    function NullableBooleanInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: _this.props.input.value,
        };
        _this.handleChange = function (event) {
            _this.props.input.onChange(_this.getBooleanFromString(event.target.value));
            _this.setState({ value: event.target.value });
        };
        _this.getBooleanFromString = function (value) {
            if (value === 'true')
                return true;
            if (value === 'false')
                return false;
            return null;
        };
        _this.getStringFromBoolean = function (value) {
            if (value === true)
                return 'true';
            if (value === false)
                return 'false';
            return '';
        };
        return _this;
    }
    NullableBooleanInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.input.value !== this.props.input.value) {
            this.setState({ value: nextProps.input.value });
        }
    };
    NullableBooleanInput.prototype.render = function () {
        var _a = this.props, classes = _a.classes, className = _a.className, isRequired = _a.isRequired, label = _a.label, meta = _a.meta, options = _a.options, resource = _a.resource, source = _a.source, translate = _a.translate, rest = __rest(_a, ["classes", "className", "isRequired", "label", "meta", "options", "resource", "source", "translate"]);
        var touched = meta.touched, error = meta.error;
        return (React.createElement(TextField, __assign({ select: true, margin: "normal", value: this.getStringFromBoolean(this.state.value), label: React.createElement(FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired }), error: !!(touched && error), helperText: touched && error, className: classnames(classes.input, className) }, options, sanitizeRestProps(rest), { onChange: this.handleChange }),
            React.createElement(MenuItem, { value: "" }),
            React.createElement(MenuItem, { value: "false" }, translate('ra.boolean.false')),
            React.createElement(MenuItem, { value: "true" }, translate('ra.boolean.true'))));
    };
    return NullableBooleanInput;
}(Component));
export { NullableBooleanInput };
NullableBooleanInput.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    translate: PropTypes.func.isRequired,
};
var enhance = compose(addField, translate, withStyles(styles));
export default enhance(NullableBooleanInput);

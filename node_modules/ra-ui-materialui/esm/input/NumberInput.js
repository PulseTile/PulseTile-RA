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
 * An Input component for a number
 *
 * @example
 * <NumberInput source="nb_views" />
 *
 * You can customize the `step` props (which defaults to "any")
 * @example
 * <NumberInput source="nb_views" step={1} />
 *
 * The object passed as `options` props is passed to the material-ui <TextField> component
 */
var NumberInput = /** @class */ (function (_super) {
    __extends(NumberInput, _super);
    function NumberInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleBlur = function (event) {
            /**
             * Necessary because of a React bug on <input type="number">
             * @see https://github.com/facebook/react/issues/1425
             */
            var numericValue = isNaN(parseFloat(event.target.value))
                ? null
                : parseFloat(event.target.value);
            _this.props.onBlur(numericValue);
            _this.props.input.onBlur(numericValue);
        };
        _this.handleFocus = function (event) {
            _this.props.onFocus(event);
            _this.props.input.onFocus(event);
        };
        _this.handleChange = function (event) {
            /**
             * Necessary because of a React bug on <input type="number">
             * @see https://github.com/facebook/react/issues/1425
             */
            var numericValue = isNaN(parseFloat(event.target.value))
                ? null
                : parseFloat(event.target.value);
            _this.props.onChange(numericValue);
            _this.props.input.onChange(numericValue);
        };
        return _this;
    }
    NumberInput.prototype.render = function () {
        var _a = this.props, className = _a.className, input = _a.input, isRequired = _a.isRequired, label = _a.label, meta = _a.meta, options = _a.options, source = _a.source, step = _a.step, resource = _a.resource, rest = __rest(_a, ["className", "input", "isRequired", "label", "meta", "options", "source", "step", "resource"]);
        if (typeof meta === 'undefined') {
            throw new Error("The NumberInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
        }
        var touched = meta.touched, error = meta.error;
        return (React.createElement(TextField, __assign({ type: "number", margin: "normal", error: !!(touched && error), helperText: touched && error, step: step, label: React.createElement(FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired }), className: className }, options, sanitizeRestProps(rest), input, { onBlur: this.handleBlur, onFocus: this.handleFocus, onChange: this.handleChange })));
    };
    return NumberInput;
}(Component));
export { NumberInput };
NumberInput.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    validate: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func),
    ]),
};
NumberInput.defaultProps = {
    onBlur: function () { },
    onChange: function () { },
    onFocus: function () { },
    options: {},
    step: 'any',
    textAlign: 'right',
};
export var NumberInputWithField = addField(NumberInput);
NumberInputWithField.defaultProps = {
    textAlign: 'right',
};
export default NumberInputWithField;

"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var ra_core_1 = require("ra-core");
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
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
        return (react_1.default.createElement(TextField_1.default, __assign({ type: "number", margin: "normal", error: !!(touched && error), helperText: touched && error, step: step, label: react_1.default.createElement(ra_core_1.FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired }), className: className }, options, sanitizeRestProps_1.default(rest), input, { onBlur: this.handleBlur, onFocus: this.handleFocus, onChange: this.handleChange })));
    };
    return NumberInput;
}(react_1.Component));
exports.NumberInput = NumberInput;
NumberInput.propTypes = {
    className: prop_types_1.default.string,
    input: prop_types_1.default.object,
    isRequired: prop_types_1.default.bool,
    label: prop_types_1.default.string,
    meta: prop_types_1.default.object,
    name: prop_types_1.default.string,
    onBlur: prop_types_1.default.func,
    onChange: prop_types_1.default.func,
    onFocus: prop_types_1.default.func,
    options: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    source: prop_types_1.default.string,
    step: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.number]).isRequired,
    validate: prop_types_1.default.oneOfType([
        prop_types_1.default.func,
        prop_types_1.default.arrayOf(prop_types_1.default.func),
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
exports.NumberInputWithField = ra_core_1.addField(NumberInput);
exports.NumberInputWithField.defaultProps = {
    textAlign: 'right',
};
exports.default = exports.NumberInputWithField;

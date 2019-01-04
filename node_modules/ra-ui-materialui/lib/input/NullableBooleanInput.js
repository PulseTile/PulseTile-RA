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
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var styles_1 = require("@material-ui/core/styles");
var compose_1 = __importDefault(require("recompose/compose"));
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
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
        return (react_1.default.createElement(TextField_1.default, __assign({ select: true, margin: "normal", value: this.getStringFromBoolean(this.state.value), label: react_1.default.createElement(ra_core_1.FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired }), error: !!(touched && error), helperText: touched && error, className: classnames_1.default(classes.input, className) }, options, sanitizeRestProps_1.default(rest), { onChange: this.handleChange }),
            react_1.default.createElement(MenuItem_1.default, { value: "" }),
            react_1.default.createElement(MenuItem_1.default, { value: "false" }, translate('ra.boolean.false')),
            react_1.default.createElement(MenuItem_1.default, { value: "true" }, translate('ra.boolean.true'))));
    };
    return NullableBooleanInput;
}(react_1.Component));
exports.NullableBooleanInput = NullableBooleanInput;
NullableBooleanInput.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    input: prop_types_1.default.object,
    isRequired: prop_types_1.default.bool,
    label: prop_types_1.default.string,
    meta: prop_types_1.default.object,
    options: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    source: prop_types_1.default.string,
    translate: prop_types_1.default.func.isRequired,
};
var enhance = compose_1.default(ra_core_1.addField, ra_core_1.translate, styles_1.withStyles(styles));
exports.default = enhance(NullableBooleanInput);

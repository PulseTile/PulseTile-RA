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
var InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
var FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var styles = function (theme) { return ({
    label: {
        position: 'relative',
    },
    value: {
        fontFamily: theme.typography.fontFamily,
        color: 'currentColor',
        padding: theme.spacing.unit + "px 0 " + theme.spacing.unit / 2 + "px",
        border: 0,
        boxSizing: 'content-box',
        verticalAlign: 'middle',
        background: 'none',
        margin: 0,
        display: 'block',
        width: '100%',
    },
}); };
/**
 * Use any component as read-only Input, labeled just like other Inputs.
 *
 * Useful to use a Field in the Edit or Create components.
 * The child component will receive the current record.
 *
 * This component name doesn't have a typo. We had to choose between
 * the American English "Labeled", and the British English "Labelled".
 * We flipped a coin.
 *
 * @example
 * <Labeled label="Comments">
 *     <FooComponent source="title" />
 * </Labeled>
 */
exports.Labeled = function (_a) {
    var children = _a.children, classes = _a.classes, className = _a.className, fullWidth = _a.fullWidth, id = _a.id, input = _a.input, isRequired = _a.isRequired, label = _a.label, meta = _a.meta, resource = _a.resource, source = _a.source, rest = __rest(_a, ["children", "classes", "className", "fullWidth", "id", "input", "isRequired", "label", "meta", "resource", "source"]);
    if (!label && !source) {
        throw new Error("Cannot create label for component <" + (children &&
            children.type &&
            children.type
                .name) + ">: You must set either the label or source props. You can also disable automated label insertion by setting 'addLabel: false' in the component default props");
    }
    var restProps = fullWidth ? __assign({}, rest, { fullWidth: fullWidth }) : rest;
    return (react_1.default.createElement(FormControl_1.default, { className: className, margin: "normal", fullWidth: fullWidth, error: meta && meta.touched && !!meta.error },
        react_1.default.createElement(InputLabel_1.default, { htmlFor: id, shrink: true, className: classes.label },
            react_1.default.createElement(ra_core_1.FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired })),
        react_1.default.createElement("div", { className: classes.value }, children && typeof children.type !== 'string'
            ? react_1.default.cloneElement(children, __assign({ input: input,
                resource: resource }, restProps))
            : children)));
};
exports.Labeled.propTypes = {
    basePath: prop_types_1.default.string,
    children: prop_types_1.default.element,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    fullWidth: prop_types_1.default.bool,
    id: prop_types_1.default.string,
    input: prop_types_1.default.object,
    isRequired: prop_types_1.default.bool,
    label: prop_types_1.default.string,
    meta: prop_types_1.default.object,
    onChange: prop_types_1.default.func,
    record: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    source: prop_types_1.default.string,
    labelStyle: prop_types_1.default.object,
};
exports.default = styles_1.withStyles(styles)(exports.Labeled);

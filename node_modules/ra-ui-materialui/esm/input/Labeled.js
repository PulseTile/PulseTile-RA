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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { FieldTitle } from 'ra-core';
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
export var Labeled = function (_a) {
    var children = _a.children, classes = _a.classes, className = _a.className, fullWidth = _a.fullWidth, id = _a.id, input = _a.input, isRequired = _a.isRequired, label = _a.label, meta = _a.meta, resource = _a.resource, source = _a.source, rest = __rest(_a, ["children", "classes", "className", "fullWidth", "id", "input", "isRequired", "label", "meta", "resource", "source"]);
    if (!label && !source) {
        throw new Error("Cannot create label for component <" + (children &&
            children.type &&
            children.type
                .name) + ">: You must set either the label or source props. You can also disable automated label insertion by setting 'addLabel: false' in the component default props");
    }
    var restProps = fullWidth ? __assign({}, rest, { fullWidth: fullWidth }) : rest;
    return (React.createElement(FormControl, { className: className, margin: "normal", fullWidth: fullWidth, error: meta && meta.touched && !!meta.error },
        React.createElement(InputLabel, { htmlFor: id, shrink: true, className: classes.label },
            React.createElement(FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired })),
        React.createElement("div", { className: classes.value }, children && typeof children.type !== 'string'
            ? React.cloneElement(children, __assign({ input: input,
                resource: resource }, restProps))
            : children)));
};
Labeled.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    id: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    onChange: PropTypes.func,
    record: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelStyle: PropTypes.object,
};
export default withStyles(styles)(Labeled);

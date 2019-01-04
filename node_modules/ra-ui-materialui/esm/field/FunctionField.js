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
import pure from 'recompose/pure';
import Typography from '@material-ui/core/Typography';
import sanitizeRestProps from './sanitizeRestProps';
/**
 * @example
 * <FunctionField source="last_name" label="Name" render={record => `${record.first_name} ${record.last_name}`} />
 */
var FunctionField = function (_a) {
    var className = _a.className, _b = _a.record, record = _b === void 0 ? {} : _b, source = _a.source, render = _a.render, rest = __rest(_a, ["className", "record", "source", "render"]);
    return record ? (React.createElement(Typography, __assign({ component: "span", body1: "body1", className: className }, sanitizeRestProps(rest)), render(record, source))) : null;
};
FunctionField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    label: PropTypes.string,
    render: PropTypes.func.isRequired,
    record: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string,
};
var PureFunctionField = pure(FunctionField);
PureFunctionField.defaultProps = {
    addLabel: true,
};
export default PureFunctionField;

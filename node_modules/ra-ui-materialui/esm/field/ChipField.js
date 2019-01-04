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
import get from 'lodash/get';
import pure from 'recompose/pure';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import sanitizeRestProps from './sanitizeRestProps';
var styles = {
    chip: { margin: 4 },
};
export var ChipField = function (_a) {
    var className = _a.className, _b = _a.classes, classes = _b === void 0 ? {} : _b, source = _a.source, _c = _a.record, record = _c === void 0 ? {} : _c, rest = __rest(_a, ["className", "classes", "source", "record"]);
    return (React.createElement(Chip, __assign({ className: classnames(classes.chip, className), label: get(record, source) }, sanitizeRestProps(rest))));
};
ChipField.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    elStyle: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    record: PropTypes.object,
};
// wat? TypeScript looses the displayName if we don't set it explicitly
ChipField.displayName = 'ChipField';
var PureChipField = withStyles(styles)(pure(ChipField));
export default PureChipField;

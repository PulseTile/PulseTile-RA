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
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import sanitizeRestProps from './sanitizeRestProps';
var styles = {
    list: {
        display: 'flex',
        listStyleType: 'none',
    },
    image: {
        margin: '0.5rem',
        maxHeight: '10rem',
    },
};
export var ImageField = function (_a) {
    var className = _a.className, _b = _a.classes, classes = _b === void 0 ? {} : _b, record = _a.record, source = _a.source, src = _a.src, title = _a.title, rest = __rest(_a, ["className", "classes", "record", "source", "src", "title"]);
    var sourceValue = get(record, source);
    if (!sourceValue) {
        return React.createElement("div", __assign({ className: className }, sanitizeRestProps(rest)));
    }
    if (Array.isArray(sourceValue)) {
        return (React.createElement("ul", __assign({ className: classnames(classes.list, className) }, sanitizeRestProps(rest)), sourceValue.map(function (file, index) {
            var titleValue = get(file, title) || title;
            var srcValue = get(file, src) || title;
            return (React.createElement("li", { key: index },
                React.createElement("img", { alt: titleValue, title: titleValue, src: srcValue, className: classes.image })));
        })));
    }
    var titleValue = get(record, title) || title;
    return (React.createElement("div", __assign({ className: className }, sanitizeRestProps(rest)),
        React.createElement("img", { title: titleValue, alt: titleValue, src: sourceValue, className: classes.image })));
};
ImageField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    classes: PropTypes.object,
    record: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    src: PropTypes.string,
    title: PropTypes.string,
};
// wat? TypeScript looses the displayName if we don't set it explicitly
ImageField.displayName = 'ImageField';
export default withStyles(styles)(ImageField);

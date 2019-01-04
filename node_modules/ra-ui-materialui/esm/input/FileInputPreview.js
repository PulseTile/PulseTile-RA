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
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { translate } from 'ra-core';
var styles = function (theme) { return ({
    removeButton: {},
    removeIcon: {
        color: theme.palette.accent1Color,
    },
}); };
var FileInputPreview = /** @class */ (function (_super) {
    __extends(FileInputPreview, _super);
    function FileInputPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileInputPreview.prototype.componentWillUnmount = function () {
        var _a = this.props, file = _a.file, revokeObjectURL = _a.revokeObjectURL;
        if (file.preview) {
            revokeObjectURL
                ? revokeObjectURL(file.preview)
                : window.URL.revokeObjectURL(file.preview);
        }
    };
    FileInputPreview.prototype.render = function () {
        var _a = this.props, children = _a.children, _b = _a.classes, classes = _b === void 0 ? {} : _b, className = _a.className, onRemove = _a.onRemove, revokeObjectURL = _a.revokeObjectURL, file = _a.file, translate = _a.translate, rest = __rest(_a, ["children", "classes", "className", "onRemove", "revokeObjectURL", "file", "translate"]);
        return (React.createElement("div", __assign({ className: className }, rest),
            React.createElement(IconButton, { className: classes.removeButton, onClick: onRemove, title: translate('ra.action.delete') },
                React.createElement(RemoveCircle, { className: classes.removeIcon })),
            children));
    };
    FileInputPreview.propTypes = {
        children: PropTypes.element.isRequired,
        classes: PropTypes.object,
        className: PropTypes.string,
        file: PropTypes.object,
        onRemove: PropTypes.func.isRequired,
        revokeObjectURL: PropTypes.func,
    };
    FileInputPreview.defaultProps = {
        file: undefined,
        translate: function (id) { return id; },
    };
    return FileInputPreview;
}(Component));
export { FileInputPreview };
export default compose(withStyles(styles), translate)(FileInputPreview);

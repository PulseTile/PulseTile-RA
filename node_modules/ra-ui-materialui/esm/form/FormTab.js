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
import { Link } from 'react-router-dom';
import MuiTab from '@material-ui/core/Tab';
import classnames from 'classnames';
import { translate } from 'ra-core';
import FormInput from './FormInput';
var sanitizeRestProps = function (_a) {
    var label = _a.label, icon = _a.icon, value = _a.value, translate = _a.translate, rest = __rest(_a, ["label", "icon", "value", "translate"]);
    return rest;
};
var hiddenStyle = { display: 'none' };
var FormTab = /** @class */ (function (_super) {
    __extends(FormTab, _super);
    function FormTab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderHeader = function (_a) {
            var className = _a.className, label = _a.label, icon = _a.icon, value = _a.value, translate = _a.translate, rest = __rest(_a, ["className", "label", "icon", "value", "translate"]);
            var to = { pathname: value, state: { skipFormReset: true } };
            return (React.createElement(MuiTab, __assign({ key: label, label: translate(label, { _: label }), value: value, icon: icon, className: classnames('form-tab', className), component: Link, to: to }, sanitizeRestProps(rest))));
        };
        _this.renderContent = function (_a) {
            var children = _a.children, hidden = _a.hidden, basePath = _a.basePath, record = _a.record, resource = _a.resource;
            return (React.createElement("span", { style: hidden ? hiddenStyle : null }, React.Children.map(children, function (input) {
                return input && (React.createElement(FormInput, { basePath: basePath, input: input, record: record, resource: resource }));
            })));
        };
        return _this;
    }
    FormTab.prototype.render = function () {
        var _a = this.props, children = _a.children, context = _a.context, rest = __rest(_a, ["children", "context"]);
        return context === 'header'
            ? this.renderHeader(rest)
            : this.renderContent(__assign({ children: children }, rest));
    };
    return FormTab;
}(Component));
FormTab.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    context: PropTypes.oneOf(['header', 'content']),
    hidden: PropTypes.bool,
    icon: PropTypes.element,
    label: PropTypes.string.isRequired,
    path: PropTypes.string,
    translate: PropTypes.func.isRequired,
    value: PropTypes.string,
};
FormTab.displayName = 'FormTab';
export default translate(FormTab);

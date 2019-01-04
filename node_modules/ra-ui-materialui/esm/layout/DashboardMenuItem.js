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
import DashboardIcon from '@material-ui/icons/Dashboard';
import { translate } from 'ra-core';
import MenuItemLink from './MenuItemLink';
var DashboardMenuItem = function (_a) {
    var className = _a.className, onClick = _a.onClick, translate = _a.translate, props = __rest(_a, ["className", "onClick", "translate"]);
    return (React.createElement(MenuItemLink, __assign({ onClick: onClick, to: "/", primaryText: translate('ra.page.dashboard'), leftIcon: React.createElement(DashboardIcon, null), exact: true }, props)));
};
DashboardMenuItem.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
    translate: PropTypes.func.isRequired,
};
export default translate(DashboardMenuItem);

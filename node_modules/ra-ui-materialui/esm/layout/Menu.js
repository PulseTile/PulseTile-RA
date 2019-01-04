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
import { connect } from 'react-redux';
import inflection from 'inflection';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { getResources, translate } from 'ra-core';
import DefaultIcon from '@material-ui/icons/ViewList';
import DashboardMenuItem from './DashboardMenuItem';
import MenuItemLink from './MenuItemLink';
import Responsive from '../layout/Responsive';
var styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
};
var translatedResourceName = function (resource, translate) {
    return translate("resources." + resource.name + ".name", {
        smart_count: 2,
        _: resource.options && resource.options.label
            ? translate(resource.options.label, {
                smart_count: 2,
                _: resource.options.label,
            })
            : inflection.humanize(inflection.pluralize(resource.name)),
    });
};
var Menu = function (_a) {
    var classes = _a.classes, className = _a.className, dense = _a.dense, hasDashboard = _a.hasDashboard, onMenuClick = _a.onMenuClick, open = _a.open, pathname = _a.pathname, resources = _a.resources, translate = _a.translate, logout = _a.logout, rest = __rest(_a, ["classes", "className", "dense", "hasDashboard", "onMenuClick", "open", "pathname", "resources", "translate", "logout"]);
    return (React.createElement("div", __assign({ className: classnames(classes.main, className) }, rest),
        hasDashboard && React.createElement(DashboardMenuItem, { onClick: onMenuClick }),
        resources
            .filter(function (r) { return r.hasList; })
            .map(function (resource) { return (React.createElement(MenuItemLink, { key: resource.name, to: "/" + resource.name, primaryText: translatedResourceName(resource, translate), leftIcon: resource.icon ? React.createElement(resource.icon, null) : React.createElement(DefaultIcon, null), onClick: onMenuClick, dense: dense })); }),
        React.createElement(Responsive, { xsmall: logout, medium: null })));
};
Menu.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    dense: PropTypes.bool,
    hasDashboard: PropTypes.bool,
    logout: PropTypes.element,
    onMenuClick: PropTypes.func,
    open: PropTypes.bool,
    pathname: PropTypes.string,
    resources: PropTypes.array.isRequired,
    translate: PropTypes.func.isRequired,
};
Menu.defaultProps = {
    onMenuClick: function () { return null; },
};
var mapStateToProps = function (state) { return ({
    open: state.admin.ui.sidebarOpen,
    resources: getResources(state),
    pathname: state.router.location.pathname,
}); };
var enhance = compose(translate, connect(mapStateToProps, {}, // Avoid connect passing dispatch in props,
null, {
    areStatePropsEqual: function (prev, next) {
        return prev.resources.every(function (value, index) { return value === next.resources[index]; } // shallow compare resources
        ) &&
            prev.pathname == next.pathname &&
            prev.open == next.open;
    },
}), withStyles(styles));
export default enhance(Menu);

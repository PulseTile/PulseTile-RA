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
import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { translate, sanitizeListRestProps } from 'ra-core';
import CardActions from '../layout/CardActions';
var styles = function (theme) { return ({
    toolbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        color: theme.palette.type === 'light'
            ? theme.palette.primary.main
            : theme.palette.text.primary,
        justifyContent: 'space-between',
        backgroundColor: theme.palette.type === 'light'
            ? lighten(theme.palette.primary.light, 0.85)
            : theme.palette.primary.dark,
        minHeight: 64,
        height: 64,
        transition: theme.transitions.create('height') + ", " + theme.transitions.create('min-height'),
    },
    toolbarCollapsed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        minHeight: 0,
        height: 0,
        overflowY: 'hidden',
        transition: theme.transitions.create('all'),
    },
    title: {
        flex: '0 0 auto',
    },
}); };
var BulkActionsToolbar = function (_a) {
    var classes = _a.classes, basePath = _a.basePath, filterValues = _a.filterValues, label = _a.label, resource = _a.resource, selectedIds = _a.selectedIds, translate = _a.translate, children = _a.children, rest = __rest(_a, ["classes", "basePath", "filterValues", "label", "resource", "selectedIds", "translate", "children"]);
    return selectedIds.length > 0 ? (React.createElement(Toolbar, __assign({ "data-test": "bulk-actions-toolbar", className: classes.toolbar }, sanitizeListRestProps(rest)),
        React.createElement("div", { className: classes.title },
            React.createElement(Typography, { color: "inherit", variant: "subheading" }, translate(label, {
                _: label,
                smart_count: selectedIds.length,
            }))),
        React.createElement(CardActions, null, Children.map(children, function (child) {
            return cloneElement(child, {
                basePath: basePath,
                filterValues: filterValues,
                resource: resource,
                selectedIds: selectedIds,
            });
        })))) : (React.createElement(Toolbar, { className: classes.toolbarCollapsed }));
};
BulkActionsToolbar.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    basePath: PropTypes.string,
    filterValues: PropTypes.object,
    label: PropTypes.string,
    resource: PropTypes.string,
    selectedIds: PropTypes.array,
    translate: PropTypes.func.isRequired,
};
BulkActionsToolbar.defaultProps = {
    label: 'ra.action.bulk_actions',
};
var enhance = compose(translate, withStyles(styles));
export default enhance(BulkActionsToolbar);

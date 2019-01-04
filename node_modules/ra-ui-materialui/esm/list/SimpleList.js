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
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { linkToRecord, sanitizeListRestProps } from 'ra-core';
var styles = {
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    tertiary: { float: 'right', opacity: 0.541176 },
};
var LinkOrNot = withStyles(styles)(function (_a) {
    var classes = _a.classes, linkType = _a.linkType, basePath = _a.basePath, id = _a.id, children = _a.children;
    return linkType === 'edit' || linkType === true ? (React.createElement(Link, { to: linkToRecord(basePath, id), className: classes.link }, children)) : linkType === 'show' ? (React.createElement(Link, { to: linkToRecord(basePath, id) + "/show", className: classes.link }, children)) : (React.createElement("span", null, children));
});
var SimpleList = function (_a) {
    var basePath = _a.basePath, _b = _a.classes, classes = _b === void 0 ? {} : _b, className = _a.className, data = _a.data, hasBulkActions = _a.hasBulkActions, ids = _a.ids, isLoading = _a.isLoading, leftAvatar = _a.leftAvatar, leftIcon = _a.leftIcon, linkType = _a.linkType, onToggleItem = _a.onToggleItem, primaryText = _a.primaryText, rightAvatar = _a.rightAvatar, rightIcon = _a.rightIcon, secondaryText = _a.secondaryText, selectedIds = _a.selectedIds, tertiaryText = _a.tertiaryText, total = _a.total, rest = __rest(_a, ["basePath", "classes", "className", "data", "hasBulkActions", "ids", "isLoading", "leftAvatar", "leftIcon", "linkType", "onToggleItem", "primaryText", "rightAvatar", "rightIcon", "secondaryText", "selectedIds", "tertiaryText", "total"]);
    return (isLoading || total > 0) && (React.createElement(List, __assign({ className: className }, sanitizeListRestProps(rest)), ids.map(function (id) { return (React.createElement(LinkOrNot, { linkType: linkType, basePath: basePath, id: id, key: id },
        React.createElement(ListItem, { button: true },
            leftIcon && (React.createElement(ListItemIcon, null, leftIcon(data[id], id))),
            leftAvatar && (React.createElement(ListItemAvatar, null,
                React.createElement(Avatar, null, leftAvatar(data[id], id)))),
            React.createElement(ListItemText, { primary: React.createElement("div", null,
                    primaryText(data[id], id),
                    tertiaryText && (React.createElement("span", { className: classes.tertiary }, tertiaryText(data[id], id)))), secondary: secondaryText && secondaryText(data[id], id) }),
            (rightAvatar || rightIcon) && (React.createElement(ListItemSecondaryAction, null,
                rightAvatar && (React.createElement(Avatar, null, rightAvatar(data[id], id))),
                rightIcon && (React.createElement(ListItemIcon, null, rightIcon(data[id], id)))))))); })));
};
SimpleList.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    data: PropTypes.object,
    hasBulkActions: PropTypes.bool.isRequired,
    ids: PropTypes.array,
    leftAvatar: PropTypes.func,
    leftIcon: PropTypes.func,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        .isRequired,
    onToggleItem: PropTypes.func,
    primaryText: PropTypes.func,
    rightAvatar: PropTypes.func,
    rightIcon: PropTypes.func,
    secondaryText: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    tertiaryText: PropTypes.func,
};
SimpleList.defaultProps = {
    linkType: 'edit',
    hasBulkActions: false,
    selectedIds: [],
};
export default withStyles(styles)(SimpleList);

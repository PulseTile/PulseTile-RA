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
import React, { cloneElement, Children, Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { translate } from 'ra-core';
import Button from '../button/Button';
import BulkDeleteAction from './BulkDeleteAction';
var styles = function (theme) { return ({
    bulkActionsButton: {
        opacity: 1,
        transition: theme.transitions.create('opacity', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        '&.fade-enter': {
            opacity: 0,
        },
        '&.fade-enter-done': {
            opacity: 1,
        },
        '&.fade-exit': {
            opacity: 0,
        },
        '&.fade-exit-done': {
            opacity: 0,
        },
    },
    icon: {
        marginRight: theme.spacing.unit,
    },
}); };
var timeoutDurations = {
    enter: 0,
    exit: 300,
};
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, classes = _a.classes, filterValues = _a.filterValues, resource = _a.resource, onUnselectItems = _a.onUnselectItems, rest = __rest(_a, ["basePath", "classes", "filterValues", "resource", "onUnselectItems"]);
    return rest;
};
/**
 * @deprecated pass a Fragment with button children as bulkActionButtons props instead
 */
var BulkActions = /** @class */ (function (_super) {
    __extends(BulkActions, _super);
    function BulkActions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
            activeAction: null,
        };
        _this.storeButtonRef = function (node) {
            _this.anchorElement = node;
        };
        _this.handleClick = function () {
            _this.setState({ isOpen: true });
        };
        _this.handleClose = function () {
            _this.setState({ isOpen: false });
        };
        _this.handleLaunchAction = function (action) {
            _this.setState({ activeAction: action, isOpen: false });
        };
        _this.handleExitAction = function () {
            _this.setState({ activeAction: null });
        };
        return _this;
    }
    BulkActions.prototype.componentDidMount = function () {
        if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn('<BulkActions> is deprecated. Use the bulkActionButtons prop instead.');
        }
    };
    BulkActions.prototype.render = function () {
        var _this = this;
        var _a = this.props, basePath = _a.basePath, classes = _a.classes, children = _a.children, className = _a.className, filterValues = _a.filterValues, label = _a.label, resource = _a.resource, selectedIds = _a.selectedIds, translate = _a.translate, rest = __rest(_a, ["basePath", "classes", "children", "className", "filterValues", "label", "resource", "selectedIds", "translate"]);
        var isOpen = this.state.isOpen;
        return (React.createElement(CSSTransition, { in: selectedIds.length > 0, timeout: timeoutDurations, mountOnEnter: true, unmountOnExit: true, classNames: "fade" },
            React.createElement("div", { className: classes.bulkActionsButton },
                React.createElement(Button, __assign({ buttonRef: this.storeButtonRef, className: classnames('bulk-actions-button', className), alignIcon: "left", "aria-owns": isOpen ? 'bulk-actions-menu' : null, "aria-haspopup": "true", onClick: this.handleClick }, sanitizeRestProps(rest), { label: translate(label, {
                        _: label,
                        smart_count: selectedIds.length,
                    }) }),
                    React.createElement(FilterNoneIcon, { className: classes.icon })),
                React.createElement(Menu, { id: "bulk-actions-menu", anchorEl: this.anchorElement, onClose: this.handleClose, open: isOpen }, Children.map(children, function (child, index) { return (React.createElement(MenuItem, __assign({ key: index, className: classnames('bulk-actions-menu-item', child.props.className), onClick: function () { return _this.handleLaunchAction(index); } }, sanitizeRestProps(rest)), translate(child.props.label))); })),
                Children.map(children, function (child, index) {
                    return _this.state.activeAction === index &&
                        cloneElement(child, {
                            basePath: basePath,
                            filterValues: filterValues,
                            onExit: _this.handleExitAction,
                            resource: resource,
                            selectedIds: selectedIds,
                        });
                }))));
    };
    return BulkActions;
}(Component));
BulkActions.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    filterValues: PropTypes.object,
    label: PropTypes.string,
    resource: PropTypes.string,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    translate: PropTypes.func.isRequired,
};
BulkActions.defaultProps = {
    children: React.createElement(BulkDeleteAction, null),
    label: 'ra.action.bulk_actions',
    selectedIds: [],
};
var EnhancedButton = compose(withStyles(styles), translate)(BulkActions);
export default EnhancedButton;

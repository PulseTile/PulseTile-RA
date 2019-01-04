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
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { setSidebarVisibility } from 'ra-core';
import Responsive from './Responsive';
export var DRAWER_WIDTH = 240;
export var CLOSED_DRAWER_WIDTH = 55;
var styles = function (theme) {
    var _a;
    return ({
        drawerPaper: (_a = {
                position: 'relative',
                height: 'auto',
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                backgroundColor: 'transparent',
                marginTop: '0.5em',
                borderRight: 'none'
            },
            _a[theme.breakpoints.only('xs')] = {
                marginTop: 0,
                height: '100vh',
                position: 'inherit',
                backgroundColor: theme.palette.background.default,
            },
            _a[theme.breakpoints.up('md')] = {
                border: 'none',
                marginTop: '1.5em',
            },
            _a),
    });
};
// We shouldn't need PureComponent here as it's connected
// but for some reason it keeps rendering even though mapStateToProps returns the same object
var Sidebar = /** @class */ (function (_super) {
    __extends(Sidebar, _super);
    function Sidebar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClose = function () { return _this.props.setSidebarVisibility(false); };
        _this.toggleSidebar = function () { return _this.props.setSidebarVisibility(!_this.props.open); };
        return _this;
    }
    Sidebar.prototype.componentWillMount = function () {
        var _a = this.props, width = _a.width, setSidebarVisibility = _a.setSidebarVisibility;
        if (width !== 'xs' && width !== 'sm') {
            setSidebarVisibility(true);
        }
    };
    Sidebar.prototype.render = function () {
        var _a = this.props, children = _a.children, classes = _a.classes, closedSize = _a.closedSize, open = _a.open, setSidebarVisibility = _a.setSidebarVisibility, size = _a.size, width = _a.width, rest = __rest(_a, ["children", "classes", "closedSize", "open", "setSidebarVisibility", "size", "width"]);
        return (React.createElement(Responsive, { xsmall: React.createElement(Drawer, __assign({ variant: "temporary", open: open, PaperProps: {
                    className: classes.drawerPaper,
                    style: { width: size },
                }, onClose: this.toggleSidebar }, rest), React.cloneElement(children, {
                onMenuClick: this.handleClose,
            })), small: React.createElement(Drawer, __assign({ variant: "permanent", open: open, PaperProps: {
                    className: classes.drawerPaper,
                    style: {
                        width: open ? size : closedSize,
                    },
                }, onClose: this.toggleSidebar }, rest), React.cloneElement(children, {
                dense: true,
                onMenuClick: this.handleClose,
            })), medium: React.createElement(Drawer, __assign({ variant: "permanent", open: open, PaperProps: {
                    className: classes.drawerPaper,
                    style: {
                        width: open ? size : closedSize,
                    },
                }, onClose: this.toggleSidebar }, rest), React.cloneElement(children, { dense: true })) }));
    };
    return Sidebar;
}(PureComponent));
Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object,
    closedSize: PropTypes.number,
    open: PropTypes.bool.isRequired,
    setSidebarVisibility: PropTypes.func.isRequired,
    size: PropTypes.number,
    width: PropTypes.string,
};
Sidebar.defaultProps = {
    size: DRAWER_WIDTH,
    closedSize: CLOSED_DRAWER_WIDTH,
};
var mapStateToProps = function (state) { return ({
    open: state.admin.ui.sidebarOpen,
    locale: state.locale,
}); };
export default compose(connect(mapStateToProps, { setSidebarVisibility: setSidebarVisibility }), withStyles(styles), withWidth({ resizeInterval: Infinity }) // used to initialize the visibility on first render
)(Sidebar);

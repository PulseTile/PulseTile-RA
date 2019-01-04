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
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import compose from 'recompose/compose';
import { toggleSidebar } from 'ra-core';
import LoadingIndicator from './LoadingIndicator';
var styles = {
    title: {
        fontSize: '1.25em',
        lineHeight: '2.5em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        paddingRight: '1.5em',
    },
    icon: {
        marginTop: 0,
        marginRight: 0,
        marginLeft: '-12px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    },
};
/**
 * @deprecated
 */
var AppBarMobile = function (_a) {
    var classes = _a.classes, className = _a.className, title = _a.title, toggleSidebar = _a.toggleSidebar, rest = __rest(_a, ["classes", "className", "title", "toggleSidebar"]);
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('<AppBarMobile> is deprecated, please use <AppBar>, which is now responsive');
    }
    return (React.createElement(MuiAppBar, __assign({ className: className, color: "secondary", position: "fixed" }, rest),
        React.createElement(Toolbar, null,
            React.createElement(IconButton, { color: "inherit", "aria-label": "open drawer", onClick: toggleSidebar, className: classes.icon },
                React.createElement(MenuIcon, null)),
            React.createElement(Typography, { className: classes.title, variant: "title", color: "inherit" }, title),
            React.createElement(LoadingIndicator, null))));
};
AppBarMobile.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};
var enhance = compose(connect(null, { toggleSidebar: toggleSidebar }), withStyles(styles));
export default enhance(AppBarMobile);

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
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Report';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import History from '@material-ui/icons/History';
import Title from './Title';
import { translate } from 'ra-core';
var styles = function (theme) {
    var _a;
    return ({
        container: (_a = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            },
            _a[theme.breakpoints.down('sm')] = {
                padding: '1em',
            },
            _a.fontFamily = 'Roboto, sans-serif',
            _a.opacity = 0.5,
            _a),
        title: {
            display: 'flex',
            alignItems: 'center',
        },
        icon: {
            width: '2em',
            height: '2em',
            marginRight: '0.5em',
        },
        panel: {
            marginTop: '1em',
        },
        panelDetails: {
            whiteSpace: 'pre-wrap',
        },
        toolbar: {
            marginTop: '2em',
        },
    });
};
function goBack() {
    history.go(-1);
}
var Error = function (_a) {
    var error = _a.error, errorInfo = _a.errorInfo, classes = _a.classes, className = _a.className, title = _a.title, translate = _a.translate, rest = __rest(_a, ["error", "errorInfo", "classes", "className", "title", "translate"]);
    return (React.createElement(Fragment, null,
        React.createElement(Title, { defaultTitle: title }),
        React.createElement("div", __assign({ className: classnames(classes.container, className) }, rest),
            React.createElement("h1", { className: classes.title, role: "alert" },
                React.createElement(ErrorIcon, { className: classes.icon }),
                translate('ra.page.error')),
            React.createElement("div", null, translate('ra.message.error')),
            process.env.NODE_ENV !== 'production' && (React.createElement(ExpansionPanel, { className: classes.panel },
                React.createElement(ExpansionPanelSummary, { expandIcon: React.createElement(ExpandMoreIcon, null) }, translate('ra.message.details')),
                React.createElement(ExpansionPanelDetails, { className: classes.panelDetails },
                    React.createElement("div", null,
                        React.createElement("h2", null, translate(error.toString())),
                        errorInfo.componentStack)))),
            React.createElement("div", { className: classes.toolbar },
                React.createElement(Button, { variant: "raised", icon: React.createElement(History, null), onClick: goBack }, translate('ra.action.back'))))));
};
Error.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    error: PropTypes.object.isRequired,
    errorInfo: PropTypes.object,
    translate: PropTypes.func.isRequired,
    title: PropTypes.string,
};
var enhance = compose(withStyles(styles), translate);
export default enhance(Error);

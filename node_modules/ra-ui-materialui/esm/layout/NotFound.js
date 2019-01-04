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
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import HotTub from '@material-ui/icons/HotTub';
import History from '@material-ui/icons/History';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { translate } from 'ra-core';
import Title from './Title';
var styles = function (theme) {
    var _a;
    return ({
        container: (_a = {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            },
            _a[theme.breakpoints.up('md')] = {
                height: '100%',
            },
            _a[theme.breakpoints.down('sm')] = {
                height: '100vh',
                marginTop: '-3em',
            },
            _a),
        icon: {
            width: '9em',
            height: '9em',
        },
        message: {
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
            opacity: 0.5,
            margin: '0 1em',
        },
        toolbar: {
            textAlign: 'center',
            marginTop: '2em',
        },
    });
};
function goBack() {
    history.go(-1);
}
var NotFound = function (_a) {
    var classes = _a.classes, className = _a.className, translate = _a.translate, title = _a.title, rest = __rest(_a, ["classes", "className", "translate", "title"]);
    return (React.createElement("div", __assign({ className: classnames(classes.container, className) }, rest),
        React.createElement(Title, { defaultTitle: title }),
        React.createElement("div", { className: classes.message },
            React.createElement(HotTub, { className: classes.icon }),
            React.createElement("h1", null, translate('ra.page.not_found')),
            React.createElement("div", null,
                translate('ra.message.not_found'),
                ".")),
        React.createElement("div", { className: classes.toolbar },
            React.createElement(Button, { variant: "raised", icon: React.createElement(History, null), onClick: goBack }, translate('ra.action.back')))));
};
NotFound.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    title: PropTypes.string,
    translate: PropTypes.func.isRequired,
};
var enhance = compose(withStyles(styles), translate);
export default enhance(NotFound);

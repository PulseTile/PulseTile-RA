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
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import Responsive from './Responsive';
import AppBarMobile from './AppBarMobile';
/**
 * @deprecated
 */
var ViewTitle = function (_a) {
    var className = _a.className, title = _a.title, rest = __rest(_a, ["className", "title"]);
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('<ViewTitle> is deprecated, please use <Title> instead');
    }
    return (React.createElement(Responsive, { xsmall: React.createElement(Fragment, null,
            React.createElement(AppBarMobile, __assign({ className: classnames('title', className), title: title }, rest)),
            React.createElement("span", null, " ")), medium: React.createElement(CardContent, __assign({ className: classnames('title', className) }, rest),
            React.createElement(Typography, { variant: "title" }, title)) }));
};
ViewTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
};
export default ViewTitle;

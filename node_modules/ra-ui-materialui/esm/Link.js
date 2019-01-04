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
import classNames from 'classnames';
import { Link as RRLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
var styles = function (theme) { return ({
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
    },
}); };
/**
 * @deprecated Use react-router-dom's Link instead
 */
var Link = function (_a) {
    var to = _a.to, children = _a.children, className = _a.className, classes = _a.classes, rest = __rest(_a, ["to", "children", "className", "classes"]);
    return (React.createElement(RRLink, __assign({ to: to, className: classNames(classes.link, className) }, rest), children));
};
Link.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    children: PropTypes.node,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
export default withStyles(styles)(Link);

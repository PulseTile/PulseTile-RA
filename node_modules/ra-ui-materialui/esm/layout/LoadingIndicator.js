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
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import compose from 'recompose/compose';
import RefreshIconButton from '../button/RefreshIconButton';
var styles = {
    loader: {
        margin: 14,
    },
};
export var LoadingIndicator = function (_a) {
    var classes = _a.classes, className = _a.className, isLoading = _a.isLoading, rest = __rest(_a, ["classes", "className", "isLoading"]);
    return isLoading ? (React.createElement(CircularProgress, __assign({ className: classNames('app-loader', classes.loader, className), color: "inherit", size: 18, thickness: 5 }, rest))) : (React.createElement(RefreshIconButton, null));
};
LoadingIndicator.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    width: PropTypes.string,
};
var mapStateToProps = function (state) { return ({
    isLoading: state.admin.loading > 0,
}); };
export default compose(connect(mapStateToProps, {} // Avoid connect passing dispatch in props
), withStyles(styles))(LoadingIndicator);

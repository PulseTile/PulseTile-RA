import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import classnames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { translate } from 'ra-core';
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
    });
};
var Loading = function (_a) {
    var classes = _a.classes, className = _a.className, translate = _a.translate, _b = _a.loadingPrimary, loadingPrimary = _b === void 0 ? 'ra.page.loading' : _b, _c = _a.loadingSecondary, loadingSecondary = _c === void 0 ? 'ra.message.loading' : _c;
    return (React.createElement("div", { className: classnames(classes.container, className) },
        React.createElement("div", { className: classes.message },
            React.createElement(CircularProgress, { className: classes.icon, color: "primary" }),
            React.createElement("h1", null, translate(loadingPrimary)),
            React.createElement("div", null,
                translate(loadingSecondary),
                "."))));
};
Loading.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    translate: PropTypes.func.isRequired,
    loadingPrimary: PropTypes.string,
    loadingSecondary: PropTypes.string,
};
Loading.defaultProps = {
    loadingPrimary: 'ra.page.loading',
    loadingSecondary: 'ra.message.loading',
};
var enhance = compose(withStyles(styles), translate);
export default enhance(Loading);

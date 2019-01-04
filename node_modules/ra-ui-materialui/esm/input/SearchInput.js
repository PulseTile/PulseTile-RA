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
import compose from 'recompose/compose';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'ra-core';
import TextInput from './TextInput';
var searchFilterStyles = {
    input: {
        marginTop: 32,
    },
};
var SearchInput = function (_a) {
    var classes = _a.classes, translate = _a.translate, props = __rest(_a, ["classes", "translate"]);
    return (React.createElement(TextInput, __assign({ label: false, placeholder: translate('ra.action.search'), InputProps: {
            endAdornment: (React.createElement(InputAdornment, { position: "end" },
                React.createElement(SearchIcon, { color: "disabled" }))),
        }, className: classes.input }, props)));
};
SearchInput.propTypes = {
    classes: PropTypes.object,
    translate: PropTypes.func,
};
var enhance = compose(translate, withStyles(searchFilterStyles));
export default enhance(SearchInput);

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
import { Field } from 'redux-form';
import IconButton from '@material-ui/core/IconButton';
import ActionHide from '@material-ui/icons/HighlightOff';
import classnames from 'classnames';
import { translate } from 'ra-core';
var emptyRecord = {};
var sanitizeRestProps = function (_a) {
    var alwaysOn = _a.alwaysOn, props = __rest(_a, ["alwaysOn"]);
    return props;
};
var FilterFormInput = function (_a) {
    var filterElement = _a.filterElement, handleHide = _a.handleHide, classes = _a.classes, resource = _a.resource, translate = _a.translate;
    return (React.createElement("div", { "data-source": filterElement.props.source, className: classnames('filter-field', classes.body) },
        !filterElement.props.alwaysOn && (React.createElement(IconButton, { className: "hide-filter", onClick: handleHide, "data-key": filterElement.props.source, tooltip: translate('ra.action.remove_filter') },
            React.createElement(ActionHide, null))),
        React.createElement(Field, __assign({ allowEmpty: true }, sanitizeRestProps(filterElement.props), { name: filterElement.props.source, component: filterElement.type, resource: resource, record: emptyRecord })),
        React.createElement("div", { className: classes.spacer }, "\u00A0")));
};
FilterFormInput.propTypes = {
    filterElement: PropTypes.node,
    handleHide: PropTypes.func,
    classes: PropTypes.object,
    resource: PropTypes.string,
    translate: PropTypes.func,
};
export default translate(FilterFormInput);

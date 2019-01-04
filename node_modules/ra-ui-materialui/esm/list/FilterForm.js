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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import lodashSet from 'lodash/set';
import FilterFormInput from './FilterFormInput';
var styles = function (_a) {
    var primary1Color = _a.palette.primary1Color;
    return ({
        form: {
            marginTop: '-10px',
            paddingTop: 0,
            display: 'flex',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
        },
        body: { display: 'flex', alignItems: 'flex-end' },
        spacer: { width: '1em' },
        icon: { color: primary1Color || '#00bcd4', paddingBottom: 0 },
        clearFix: { clear: 'right' },
    });
};
var sanitizeRestProps = function (_a) {
    var anyTouched = _a.anyTouched, asyncValidate = _a.asyncValidate, asyncValidating = _a.asyncValidating, autofill = _a.autofill, blur = _a.blur, change = _a.change, clearAsyncError = _a.clearAsyncError, clearFields = _a.clearFields, clearSubmit = _a.clearSubmit, clearSubmitErrors = _a.clearSubmitErrors, destroy = _a.destroy, dirty = _a.dirty, dispatch = _a.dispatch, displayedFilters = _a.displayedFilters, filterValues = _a.filterValues, handleSubmit = _a.handleSubmit, hideFilter = _a.hideFilter, initialize = _a.initialize, initialized = _a.initialized, initialValues = _a.initialValues, invalid = _a.invalid, pristine = _a.pristine, pure = _a.pure, reset = _a.reset, resetSection = _a.resetSection, save = _a.save, setFilter = _a.setFilter, setFilters = _a.setFilters, submit = _a.submit, submitFailed = _a.submitFailed, submitSucceeded = _a.submitSucceeded, submitting = _a.submitting, touch = _a.touch, triggerSubmit = _a.triggerSubmit, untouch = _a.untouch, valid = _a.valid, validate = _a.validate, props = __rest(_a, ["anyTouched", "asyncValidate", "asyncValidating", "autofill", "blur", "change", "clearAsyncError", "clearFields", "clearSubmit", "clearSubmitErrors", "destroy", "dirty", "dispatch", "displayedFilters", "filterValues", "handleSubmit", "hideFilter", "initialize", "initialized", "initialValues", "invalid", "pristine", "pure", "reset", "resetSection", "save", "setFilter", "setFilters", "submit", "submitFailed", "submitSucceeded", "submitting", "touch", "triggerSubmit", "untouch", "valid", "validate"]);
    return props;
};
var FilterForm = /** @class */ (function (_super) {
    __extends(FilterForm, _super);
    function FilterForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleHide = function (event) {
            return _this.props.hideFilter(event.currentTarget.dataset.key);
        };
        return _this;
    }
    FilterForm.prototype.componentDidMount = function () {
        this.props.filters.forEach(function (filter) {
            if (filter.props.alwaysOn && filter.props.defaultValue) {
                throw new Error('Cannot use alwaysOn and defaultValue on a filter input. Please set the filterDefaultValues props on the <List> element instead.');
            }
        });
    };
    FilterForm.prototype.getShownFilters = function () {
        var _a = this.props, filters = _a.filters, displayedFilters = _a.displayedFilters, initialValues = _a.initialValues;
        return filters.filter(function (filterElement) {
            return filterElement.props.alwaysOn ||
                displayedFilters[filterElement.props.source] ||
                typeof initialValues[filterElement.props.source] !== 'undefined';
        });
    };
    FilterForm.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.classes, classes = _b === void 0 ? {} : _b, className = _a.className, resource = _a.resource, rest = __rest(_a, ["classes", "className", "resource"]);
        return (React.createElement("div", __assign({ className: classnames(className, classes.form) }, sanitizeRestProps(rest)),
            this.getShownFilters().map(function (filterElement) { return (React.createElement(FilterFormInput, { key: filterElement.props.source, filterElement: filterElement, handleHide: _this.handleHide, classes: classes, resource: resource })); }),
            React.createElement("div", { className: classes.clearFix })));
    };
    return FilterForm;
}(Component));
export { FilterForm };
FilterForm.propTypes = {
    resource: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.node).isRequired,
    displayedFilters: PropTypes.object.isRequired,
    hideFilter: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    classes: PropTypes.object,
    className: PropTypes.string,
};
export var mergeInitialValuesWithDefaultValues = function (_a) {
    var initialValues = _a.initialValues, filters = _a.filters;
    return ({
        initialValues: __assign({}, filters
            .filter(function (filterElement) {
            return filterElement.props.alwaysOn &&
                filterElement.props.defaultValue;
        })
            .reduce(function (acc, filterElement) {
            return lodashSet(__assign({}, acc), filterElement.props.source, filterElement.props.defaultValue);
        }, {}), initialValues),
    });
};
var enhance = compose(withStyles(styles), withProps(mergeInitialValuesWithDefaultValues), reduxForm({
    form: 'filterForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
    onChange: function (values, dispatch, props) {
        return props && props.setFilters(values);
    },
}));
export default enhance(FilterForm);

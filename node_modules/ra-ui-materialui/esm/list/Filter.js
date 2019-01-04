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
import { withStyles } from '@material-ui/core/styles';
import { sanitizeListRestProps } from 'ra-core';
import FilterForm from './FilterForm';
import FilterButton from './FilterButton';
var styles = {
    button: {},
    form: {},
};
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter(props) {
        return _super.call(this, props) || this;
    }
    Filter.prototype.renderButton = function () {
        var _a = this.props, _b = _a.classes, classes = _b === void 0 ? {} : _b, context = _a.context, debounce = _a.debounce, resource = _a.resource, children = _a.children, showFilter = _a.showFilter, hideFilter = _a.hideFilter, displayedFilters = _a.displayedFilters, filterValues = _a.filterValues, rest = __rest(_a, ["classes", "context", "debounce", "resource", "children", "showFilter", "hideFilter", "displayedFilters", "filterValues"]);
        return (React.createElement(FilterButton, __assign({ className: classes.button, resource: resource, filters: React.Children.toArray(children), showFilter: showFilter, displayedFilters: displayedFilters, filterValues: filterValues }, sanitizeListRestProps(rest))));
    };
    Filter.prototype.renderForm = function () {
        var _a = this.props, _b = _a.classes, classes = _b === void 0 ? {} : _b, context = _a.context, debounce = _a.debounce, resource = _a.resource, children = _a.children, hideFilter = _a.hideFilter, displayedFilters = _a.displayedFilters, showFilter = _a.showFilter, filterValues = _a.filterValues, setFilters = _a.setFilters, rest = __rest(_a, ["classes", "context", "debounce", "resource", "children", "hideFilter", "displayedFilters", "showFilter", "filterValues", "setFilters"]);
        return (React.createElement(FilterForm, __assign({ className: classes.form, resource: resource, filters: React.Children.toArray(children), hideFilter: hideFilter, displayedFilters: displayedFilters, initialValues: filterValues, setFilters: setFilters }, sanitizeListRestProps(rest))));
    };
    Filter.prototype.render = function () {
        return this.props.context === 'button'
            ? this.renderButton()
            : this.renderForm();
    };
    return Filter;
}(Component));
export { Filter };
Filter.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    context: PropTypes.oneOf(['form', 'button']),
    debounce: PropTypes.number.isRequired,
    displayedFilters: PropTypes.object,
    filterValues: PropTypes.object,
    hideFilter: PropTypes.func,
    setFilters: PropTypes.func,
    showFilter: PropTypes.func,
    resource: PropTypes.string.isRequired,
};
Filter.defaultProps = {
    debounce: 500,
};
export default withStyles(styles)(Filter);

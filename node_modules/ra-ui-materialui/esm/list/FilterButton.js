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
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import ContentFilter from '@material-ui/icons/FilterList';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { translate } from 'ra-core';
import FilterButtonMenuItem from './FilterButtonMenuItem';
import Button from '../button/Button';
var styles = {
    root: { display: 'inline-block' },
};
var FilterButton = /** @class */ (function (_super) {
    __extends(FilterButton, _super);
    function FilterButton(props) {
        var _this = _super.call(this, props) || this;
        _this.button = null;
        _this.state = {
            open: false,
        };
        _this.handleClickButton = _this.handleClickButton.bind(_this);
        _this.handleRequestClose = _this.handleRequestClose.bind(_this);
        _this.handleShow = _this.handleShow.bind(_this);
        return _this;
    }
    FilterButton.prototype.getHiddenFilters = function () {
        var _a = this.props, filters = _a.filters, displayedFilters = _a.displayedFilters, filterValues = _a.filterValues;
        return filters.filter(function (filterElement) {
            return !filterElement.props.alwaysOn &&
                !displayedFilters[filterElement.props.source] &&
                !filterValues[filterElement.props.source];
        });
    };
    FilterButton.prototype.handleClickButton = function (event) {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: findDOMNode(this.button),
        });
    };
    FilterButton.prototype.handleRequestClose = function () {
        this.setState({
            open: false,
        });
    };
    FilterButton.prototype.handleShow = function (_a) {
        var source = _a.source, defaultValue = _a.defaultValue;
        this.props.showFilter(source, defaultValue);
        this.setState({
            open: false,
        });
    };
    FilterButton.prototype.render = function () {
        var _this = this;
        var hiddenFilters = this.getHiddenFilters();
        var _a = this.props, _b = _a.classes, classes = _b === void 0 ? {} : _b, className = _a.className, resource = _a.resource, showFilter = _a.showFilter, displayedFilters = _a.displayedFilters, filterValues = _a.filterValues, translate = _a.translate, rest = __rest(_a, ["classes", "className", "resource", "showFilter", "displayedFilters", "filterValues", "translate"]);
        var _c = this.state, open = _c.open, anchorEl = _c.anchorEl;
        return (hiddenFilters.length > 0 && (React.createElement("div", __assign({ className: classnames(classes.root, className) }, rest),
            React.createElement(Button, { ref: function (node) {
                    _this.button = node;
                }, className: "add-filter", label: "ra.action.add_filter", onClick: this.handleClickButton },
                React.createElement(ContentFilter, null)),
            React.createElement(Menu, { open: open, anchorEl: anchorEl, onClose: this.handleRequestClose }, hiddenFilters.map(function (filterElement) { return (React.createElement(FilterButtonMenuItem, { key: filterElement.props.source, filter: filterElement.props, resource: resource, onShow: _this.handleShow })); })))));
    };
    return FilterButton;
}(Component));
export { FilterButton };
FilterButton.propTypes = {
    resource: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.node).isRequired,
    displayedFilters: PropTypes.object.isRequired,
    filterValues: PropTypes.object.isRequired,
    showFilter: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
};
export default compose(translate, withStyles(styles))(FilterButton);

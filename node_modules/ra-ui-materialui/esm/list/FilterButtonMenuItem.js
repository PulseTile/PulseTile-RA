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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { FieldTitle } from 'ra-core';
var FilterButtonMenuItem = /** @class */ (function (_super) {
    __extends(FilterButtonMenuItem, _super);
    function FilterButtonMenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleShow = function () {
            var _a = _this.props, filter = _a.filter, onShow = _a.onShow;
            onShow({ source: filter.source, defaultValue: filter.defaultValue });
        };
        return _this;
    }
    FilterButtonMenuItem.prototype.render = function () {
        var _a = this.props, filter = _a.filter, resource = _a.resource;
        return (React.createElement(MenuItem, { className: "new-filter-item", "data-key": filter.source, "data-default-value": filter.defaultValue, key: filter.source, onClick: this.handleShow },
            React.createElement(FieldTitle, { label: filter.label, source: filter.source, resource: resource })));
    };
    FilterButtonMenuItem.propTypes = {
        filter: PropTypes.object.isRequired,
        onShow: PropTypes.func.isRequired,
        resource: PropTypes.string.isRequired,
    };
    return FilterButtonMenuItem;
}(Component));
export default FilterButtonMenuItem;

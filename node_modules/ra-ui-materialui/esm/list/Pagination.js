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
import pure from 'recompose/pure';
import TablePagination from '@material-ui/core/TablePagination';
import compose from 'recompose/compose';
import { translate, sanitizeListRestProps } from 'ra-core';
import PaginationActions from './PaginationActions';
import PaginationLimit from './PaginationLimit';
import Responsive from '../layout/Responsive';
var emptyArray = [];
var Pagination = /** @class */ (function (_super) {
    __extends(Pagination, _super);
    function Pagination() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getNbPages = function () { return Math.ceil(_this.props.total / _this.props.perPage) || 1; };
        /**
         * Warning: material-ui's page is 0-based
         */
        _this.handlePageChange = function (event, page) {
            event && event.stopPropagation();
            if (page < 0 || page > _this.getNbPages() - 1) {
                throw new Error(_this.props.translate('ra.navigation.page_out_of_boundaries', {
                    page: page + 1,
                }));
            }
            _this.props.setPage(page + 1);
        };
        _this.handlePerPageChange = function (event) {
            _this.props.setPerPage(event.target.value);
        };
        _this.labelDisplayedRows = function (_a) {
            var from = _a.from, to = _a.to, count = _a.count;
            var translate = _this.props.translate;
            return translate('ra.navigation.page_range_info', {
                offsetBegin: from,
                offsetEnd: to,
                total: count,
            });
        };
        return _this;
    }
    Pagination.prototype.componentDidUpdate = function () {
        if (this.props.page < 1 || isNaN(this.props.page)) {
            this.props.setPage(1);
        }
    };
    Pagination.prototype.render = function () {
        var _a = this.props, isLoading = _a.isLoading, page = _a.page, perPage = _a.perPage, rowsPerPageOptions = _a.rowsPerPageOptions, total = _a.total, translate = _a.translate, rest = __rest(_a, ["isLoading", "page", "perPage", "rowsPerPageOptions", "total", "translate"]);
        if (!isLoading && total === 0) {
            return React.createElement(PaginationLimit, null);
        }
        return (React.createElement(Responsive, { small: React.createElement(TablePagination, __assign({ count: total, rowsPerPage: perPage, page: page - 1, onChangePage: this.handlePageChange, rowsPerPageOptions: emptyArray, component: "span", labelDisplayedRows: this.labelDisplayedRows }, sanitizeListRestProps(rest))), medium: React.createElement(TablePagination, __assign({ count: total, rowsPerPage: perPage, page: page - 1, onChangePage: this.handlePageChange, onChangeRowsPerPage: this.handlePerPageChange, ActionsComponent: PaginationActions, component: "span", labelRowsPerPage: translate('ra.navigation.page_rows_per_page'), labelDisplayedRows: this.labelDisplayedRows, rowsPerPageOptions: rowsPerPageOptions }, sanitizeListRestProps(rest))) }));
    };
    return Pagination;
}(Component));
export { Pagination };
Pagination.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    ids: PropTypes.array,
    isLoading: PropTypes.bool,
    page: PropTypes.number,
    perPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    setPage: PropTypes.func,
    setPerPage: PropTypes.func,
    translate: PropTypes.func.isRequired,
    total: PropTypes.number,
};
Pagination.defaultProps = {
    rowsPerPageOptions: [5, 10, 25],
};
var enhance = compose(pure, translate);
export default enhance(Pagination);

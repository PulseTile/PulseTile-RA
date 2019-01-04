"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var pure_1 = __importDefault(require("recompose/pure"));
var TablePagination_1 = __importDefault(require("@material-ui/core/TablePagination"));
var compose_1 = __importDefault(require("recompose/compose"));
var ra_core_1 = require("ra-core");
var PaginationActions_1 = __importDefault(require("./PaginationActions"));
var PaginationLimit_1 = __importDefault(require("./PaginationLimit"));
var Responsive_1 = __importDefault(require("../layout/Responsive"));
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
            return react_1.default.createElement(PaginationLimit_1.default, null);
        }
        return (react_1.default.createElement(Responsive_1.default, { small: react_1.default.createElement(TablePagination_1.default, __assign({ count: total, rowsPerPage: perPage, page: page - 1, onChangePage: this.handlePageChange, rowsPerPageOptions: emptyArray, component: "span", labelDisplayedRows: this.labelDisplayedRows }, ra_core_1.sanitizeListRestProps(rest))), medium: react_1.default.createElement(TablePagination_1.default, __assign({ count: total, rowsPerPage: perPage, page: page - 1, onChangePage: this.handlePageChange, onChangeRowsPerPage: this.handlePerPageChange, ActionsComponent: PaginationActions_1.default, component: "span", labelRowsPerPage: translate('ra.navigation.page_rows_per_page'), labelDisplayedRows: this.labelDisplayedRows, rowsPerPageOptions: rowsPerPageOptions }, ra_core_1.sanitizeListRestProps(rest))) }));
    };
    return Pagination;
}(react_1.Component));
exports.Pagination = Pagination;
Pagination.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    ids: prop_types_1.default.array,
    isLoading: prop_types_1.default.bool,
    page: prop_types_1.default.number,
    perPage: prop_types_1.default.number,
    rowsPerPageOptions: prop_types_1.default.arrayOf(prop_types_1.default.number),
    setPage: prop_types_1.default.func,
    setPerPage: prop_types_1.default.func,
    translate: prop_types_1.default.func.isRequired,
    total: prop_types_1.default.number,
};
Pagination.defaultProps = {
    rowsPerPageOptions: [5, 10, 25],
};
var enhance = compose_1.default(pure_1.default, ra_core_1.translate);
exports.default = enhance(Pagination);

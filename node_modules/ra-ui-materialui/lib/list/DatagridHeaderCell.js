"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var classnames_1 = __importDefault(require("classnames"));
var shouldUpdate_1 = __importDefault(require("recompose/shouldUpdate"));
var compose_1 = __importDefault(require("recompose/compose"));
var TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
var TableSortLabel_1 = __importDefault(require("@material-ui/core/TableSortLabel"));
var Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
// remove the sort icons when not active
var styles = {
    icon: {
        display: 'none',
    },
    active: {
        '& $icon': {
            display: 'inline',
        },
    },
};
exports.DatagridHeaderCell = function (_a) {
    var classes = _a.classes, className = _a.className, field = _a.field, currentSort = _a.currentSort, updateSort = _a.updateSort, resource = _a.resource, isSorting = _a.isSorting, translate = _a.translate, rest = __rest(_a, ["classes", "className", "field", "currentSort", "updateSort", "resource", "isSorting", "translate"]);
    return (react_1.default.createElement(TableCell_1.default, __assign({ className: classnames_1.default(className, field.props.headerClassName), numeric: field.props.textAlign === 'right', padding: "none", variant: "head" }, rest), field.props.sortable !== false &&
        (field.props.sortBy || field.props.source) ? (react_1.default.createElement(Tooltip_1.default, { title: translate('ra.action.sort'), placement: field.props.textAlign === 'right'
            ? 'bottom-end'
            : 'bottom-start', enterDelay: 300 },
        react_1.default.createElement(TableSortLabel_1.default, { active: currentSort.field ===
                (field.props.sortBy || field.props.source), direction: currentSort.order === 'ASC' ? 'asc' : 'desc', "data-sort": field.props.sortBy || field.props.source, onClick: updateSort, classes: classes },
            react_1.default.createElement(ra_core_1.FieldTitle, { label: field.props.label, source: field.props.source, resource: resource })))) : (react_1.default.createElement(ra_core_1.FieldTitle, { label: field.props.label, source: field.props.source, resource: resource }))));
};
exports.DatagridHeaderCell.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    field: prop_types_1.default.element,
    currentSort: prop_types_1.default.shape({
        sort: prop_types_1.default.string,
        order: prop_types_1.default.string,
    }).isRequired,
    isSorting: prop_types_1.default.bool,
    sortable: prop_types_1.default.bool,
    resource: prop_types_1.default.string,
    translate: prop_types_1.default.func.isRequired,
    updateSort: prop_types_1.default.func.isRequired,
};
var enhance = compose_1.default(shouldUpdate_1.default(function (props, nextProps) {
    return props.isSorting !== nextProps.isSorting ||
        (nextProps.isSorting &&
            props.currentSort.order !== nextProps.currentSort.order);
}), ra_core_1.translate, styles_1.withStyles(styles));
exports.default = enhance(exports.DatagridHeaderCell);

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
import classnames from 'classnames';
import shouldUpdate from 'recompose/shouldUpdate';
import compose from 'recompose/compose';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { FieldTitle, translate } from 'ra-core';
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
export var DatagridHeaderCell = function (_a) {
    var classes = _a.classes, className = _a.className, field = _a.field, currentSort = _a.currentSort, updateSort = _a.updateSort, resource = _a.resource, isSorting = _a.isSorting, translate = _a.translate, rest = __rest(_a, ["classes", "className", "field", "currentSort", "updateSort", "resource", "isSorting", "translate"]);
    return (React.createElement(TableCell, __assign({ className: classnames(className, field.props.headerClassName), numeric: field.props.textAlign === 'right', padding: "none", variant: "head" }, rest), field.props.sortable !== false &&
        (field.props.sortBy || field.props.source) ? (React.createElement(Tooltip, { title: translate('ra.action.sort'), placement: field.props.textAlign === 'right'
            ? 'bottom-end'
            : 'bottom-start', enterDelay: 300 },
        React.createElement(TableSortLabel, { active: currentSort.field ===
                (field.props.sortBy || field.props.source), direction: currentSort.order === 'ASC' ? 'asc' : 'desc', "data-sort": field.props.sortBy || field.props.source, onClick: updateSort, classes: classes },
            React.createElement(FieldTitle, { label: field.props.label, source: field.props.source, resource: resource })))) : (React.createElement(FieldTitle, { label: field.props.label, source: field.props.source, resource: resource }))));
};
DatagridHeaderCell.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    field: PropTypes.element,
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string,
    }).isRequired,
    isSorting: PropTypes.bool,
    sortable: PropTypes.bool,
    resource: PropTypes.string,
    translate: PropTypes.func.isRequired,
    updateSort: PropTypes.func.isRequired,
};
var enhance = compose(shouldUpdate(function (props, nextProps) {
    return props.isSorting !== nextProps.isSorting ||
        (nextProps.isSorting &&
            props.currentSort.order !== nextProps.currentSort.order);
}), translate, withStyles(styles));
export default enhance(DatagridHeaderCell);

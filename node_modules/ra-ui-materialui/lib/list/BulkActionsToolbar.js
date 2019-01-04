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
var compose_1 = __importDefault(require("recompose/compose"));
var Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var styles_1 = require("@material-ui/core/styles");
var colorManipulator_1 = require("@material-ui/core/styles/colorManipulator");
var ra_core_1 = require("ra-core");
var CardActions_1 = __importDefault(require("../layout/CardActions"));
var styles = function (theme) { return ({
    toolbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        color: theme.palette.type === 'light'
            ? theme.palette.primary.main
            : theme.palette.text.primary,
        justifyContent: 'space-between',
        backgroundColor: theme.palette.type === 'light'
            ? colorManipulator_1.lighten(theme.palette.primary.light, 0.85)
            : theme.palette.primary.dark,
        minHeight: 64,
        height: 64,
        transition: theme.transitions.create('height') + ", " + theme.transitions.create('min-height'),
    },
    toolbarCollapsed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        minHeight: 0,
        height: 0,
        overflowY: 'hidden',
        transition: theme.transitions.create('all'),
    },
    title: {
        flex: '0 0 auto',
    },
}); };
var BulkActionsToolbar = function (_a) {
    var classes = _a.classes, basePath = _a.basePath, filterValues = _a.filterValues, label = _a.label, resource = _a.resource, selectedIds = _a.selectedIds, translate = _a.translate, children = _a.children, rest = __rest(_a, ["classes", "basePath", "filterValues", "label", "resource", "selectedIds", "translate", "children"]);
    return selectedIds.length > 0 ? (react_1.default.createElement(Toolbar_1.default, __assign({ "data-test": "bulk-actions-toolbar", className: classes.toolbar }, ra_core_1.sanitizeListRestProps(rest)),
        react_1.default.createElement("div", { className: classes.title },
            react_1.default.createElement(Typography_1.default, { color: "inherit", variant: "subheading" }, translate(label, {
                _: label,
                smart_count: selectedIds.length,
            }))),
        react_1.default.createElement(CardActions_1.default, null, react_1.Children.map(children, function (child) {
            return react_1.cloneElement(child, {
                basePath: basePath,
                filterValues: filterValues,
                resource: resource,
                selectedIds: selectedIds,
            });
        })))) : (react_1.default.createElement(Toolbar_1.default, { className: classes.toolbarCollapsed }));
};
BulkActionsToolbar.propTypes = {
    children: prop_types_1.default.node,
    classes: prop_types_1.default.object,
    basePath: prop_types_1.default.string,
    filterValues: prop_types_1.default.object,
    label: prop_types_1.default.string,
    resource: prop_types_1.default.string,
    selectedIds: prop_types_1.default.array,
    translate: prop_types_1.default.func.isRequired,
};
BulkActionsToolbar.defaultProps = {
    label: 'ra.action.bulk_actions',
};
var enhance = compose_1.default(ra_core_1.translate, styles_1.withStyles(styles));
exports.default = enhance(BulkActionsToolbar);

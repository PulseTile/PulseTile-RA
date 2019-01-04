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
var Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
var List_1 = __importDefault(require("@material-ui/core/List"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var ListItemAvatar_1 = __importDefault(require("@material-ui/core/ListItemAvatar"));
var ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
var ListItemSecondaryAction_1 = __importDefault(require("@material-ui/core/ListItemSecondaryAction"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var styles_1 = require("@material-ui/core/styles");
var react_router_dom_1 = require("react-router-dom");
var ra_core_1 = require("ra-core");
var styles = {
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    tertiary: { float: 'right', opacity: 0.541176 },
};
var LinkOrNot = styles_1.withStyles(styles)(function (_a) {
    var classes = _a.classes, linkType = _a.linkType, basePath = _a.basePath, id = _a.id, children = _a.children;
    return linkType === 'edit' || linkType === true ? (react_1.default.createElement(react_router_dom_1.Link, { to: ra_core_1.linkToRecord(basePath, id), className: classes.link }, children)) : linkType === 'show' ? (react_1.default.createElement(react_router_dom_1.Link, { to: ra_core_1.linkToRecord(basePath, id) + "/show", className: classes.link }, children)) : (react_1.default.createElement("span", null, children));
});
var SimpleList = function (_a) {
    var basePath = _a.basePath, _b = _a.classes, classes = _b === void 0 ? {} : _b, className = _a.className, data = _a.data, hasBulkActions = _a.hasBulkActions, ids = _a.ids, isLoading = _a.isLoading, leftAvatar = _a.leftAvatar, leftIcon = _a.leftIcon, linkType = _a.linkType, onToggleItem = _a.onToggleItem, primaryText = _a.primaryText, rightAvatar = _a.rightAvatar, rightIcon = _a.rightIcon, secondaryText = _a.secondaryText, selectedIds = _a.selectedIds, tertiaryText = _a.tertiaryText, total = _a.total, rest = __rest(_a, ["basePath", "classes", "className", "data", "hasBulkActions", "ids", "isLoading", "leftAvatar", "leftIcon", "linkType", "onToggleItem", "primaryText", "rightAvatar", "rightIcon", "secondaryText", "selectedIds", "tertiaryText", "total"]);
    return (isLoading || total > 0) && (react_1.default.createElement(List_1.default, __assign({ className: className }, ra_core_1.sanitizeListRestProps(rest)), ids.map(function (id) { return (react_1.default.createElement(LinkOrNot, { linkType: linkType, basePath: basePath, id: id, key: id },
        react_1.default.createElement(ListItem_1.default, { button: true },
            leftIcon && (react_1.default.createElement(ListItemIcon_1.default, null, leftIcon(data[id], id))),
            leftAvatar && (react_1.default.createElement(ListItemAvatar_1.default, null,
                react_1.default.createElement(Avatar_1.default, null, leftAvatar(data[id], id)))),
            react_1.default.createElement(ListItemText_1.default, { primary: react_1.default.createElement("div", null,
                    primaryText(data[id], id),
                    tertiaryText && (react_1.default.createElement("span", { className: classes.tertiary }, tertiaryText(data[id], id)))), secondary: secondaryText && secondaryText(data[id], id) }),
            (rightAvatar || rightIcon) && (react_1.default.createElement(ListItemSecondaryAction_1.default, null,
                rightAvatar && (react_1.default.createElement(Avatar_1.default, null, rightAvatar(data[id], id))),
                rightIcon && (react_1.default.createElement(ListItemIcon_1.default, null, rightIcon(data[id], id)))))))); })));
};
SimpleList.propTypes = {
    basePath: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    data: prop_types_1.default.object,
    hasBulkActions: prop_types_1.default.bool.isRequired,
    ids: prop_types_1.default.array,
    leftAvatar: prop_types_1.default.func,
    leftIcon: prop_types_1.default.func,
    linkType: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.bool])
        .isRequired,
    onToggleItem: prop_types_1.default.func,
    primaryText: prop_types_1.default.func,
    rightAvatar: prop_types_1.default.func,
    rightIcon: prop_types_1.default.func,
    secondaryText: prop_types_1.default.func,
    selectedIds: prop_types_1.default.arrayOf(prop_types_1.default.any).isRequired,
    tertiaryText: prop_types_1.default.func,
};
SimpleList.defaultProps = {
    linkType: 'edit',
    hasBulkActions: false,
    selectedIds: [],
};
exports.default = styles_1.withStyles(styles)(SimpleList);

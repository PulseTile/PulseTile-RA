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
var react_redux_1 = require("react-redux");
var inflection_1 = __importDefault(require("inflection"));
var compose_1 = __importDefault(require("recompose/compose"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var ViewList_1 = __importDefault(require("@material-ui/icons/ViewList"));
var DashboardMenuItem_1 = __importDefault(require("./DashboardMenuItem"));
var MenuItemLink_1 = __importDefault(require("./MenuItemLink"));
var Responsive_1 = __importDefault(require("../layout/Responsive"));
var styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
};
var translatedResourceName = function (resource, translate) {
    return translate("resources." + resource.name + ".name", {
        smart_count: 2,
        _: resource.options && resource.options.label
            ? translate(resource.options.label, {
                smart_count: 2,
                _: resource.options.label,
            })
            : inflection_1.default.humanize(inflection_1.default.pluralize(resource.name)),
    });
};
var Menu = function (_a) {
    var classes = _a.classes, className = _a.className, dense = _a.dense, hasDashboard = _a.hasDashboard, onMenuClick = _a.onMenuClick, open = _a.open, pathname = _a.pathname, resources = _a.resources, translate = _a.translate, logout = _a.logout, rest = __rest(_a, ["classes", "className", "dense", "hasDashboard", "onMenuClick", "open", "pathname", "resources", "translate", "logout"]);
    return (react_1.default.createElement("div", __assign({ className: classnames_1.default(classes.main, className) }, rest),
        hasDashboard && react_1.default.createElement(DashboardMenuItem_1.default, { onClick: onMenuClick }),
        resources
            .filter(function (r) { return r.hasList; })
            .map(function (resource) { return (react_1.default.createElement(MenuItemLink_1.default, { key: resource.name, to: "/" + resource.name, primaryText: translatedResourceName(resource, translate), leftIcon: resource.icon ? react_1.default.createElement(resource.icon, null) : react_1.default.createElement(ViewList_1.default, null), onClick: onMenuClick, dense: dense })); }),
        react_1.default.createElement(Responsive_1.default, { xsmall: logout, medium: null })));
};
Menu.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    dense: prop_types_1.default.bool,
    hasDashboard: prop_types_1.default.bool,
    logout: prop_types_1.default.element,
    onMenuClick: prop_types_1.default.func,
    open: prop_types_1.default.bool,
    pathname: prop_types_1.default.string,
    resources: prop_types_1.default.array.isRequired,
    translate: prop_types_1.default.func.isRequired,
};
Menu.defaultProps = {
    onMenuClick: function () { return null; },
};
var mapStateToProps = function (state) { return ({
    open: state.admin.ui.sidebarOpen,
    resources: ra_core_1.getResources(state),
    pathname: state.router.location.pathname,
}); };
var enhance = compose_1.default(ra_core_1.translate, react_redux_1.connect(mapStateToProps, {}, // Avoid connect passing dispatch in props,
null, {
    areStatePropsEqual: function (prev, next) {
        return prev.resources.every(function (value, index) { return value === next.resources[index]; } // shallow compare resources
        ) &&
            prev.pathname == next.pathname &&
            prev.open == next.open;
    },
}), styles_1.withStyles(styles));
exports.default = enhance(Menu);

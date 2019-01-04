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
var compose_1 = __importDefault(require("recompose/compose"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var styles_1 = require("@material-ui/core/styles");
var PowerSettingsNew_1 = __importDefault(require("@material-ui/icons/PowerSettingsNew"));
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var styles = function (theme) { return ({
    menuItem: {
        color: theme.palette.text.secondary,
    },
    iconMenuPaddingStyle: {
        paddingRight: '1.2em',
    },
    iconPaddingStyle: {
        paddingRight: theme.spacing.unit,
    },
}); };
var sanitizeRestProps = function (_a) {
    var classes = _a.classes, className = _a.className, translate = _a.translate, userLogout = _a.userLogout, locale = _a.locale, redirectTo = _a.redirectTo, rest = __rest(_a, ["classes", "className", "translate", "userLogout", "locale", "redirectTo"]);
    return rest;
};
/**
 * Logout button component, to be passed to the Admin component
 *
 * Used for the Logout Menu item in the sidebar
 */
var Logout = function (_a) {
    var classes = _a.classes, className = _a.className, translate = _a.translate, userLogout = _a.userLogout, rest = __rest(_a, ["classes", "className", "translate", "userLogout"]);
    return (react_1.default.createElement(MenuItem_1.default, __assign({ className: classnames_1.default('logout', classes.menuItem, className), onClick: userLogout }, sanitizeRestProps(rest)),
        react_1.default.createElement("span", { className: classes.iconMenuPaddingStyle },
            react_1.default.createElement(PowerSettingsNew_1.default, null)),
        translate('ra.auth.logout')));
};
Logout.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    translate: prop_types_1.default.func,
    userLogout: prop_types_1.default.func,
    redirectTo: prop_types_1.default.string,
};
var mapStateToProps = function (state) { return ({
    theme: state.theme,
}); };
var mapDispatchToProps = function (dispatch, _a) {
    var redirectTo = _a.redirectTo;
    return ({
        userLogout: function () { return dispatch(ra_core_1.userLogout(redirectTo)); },
    });
};
var enhance = compose_1.default(ra_core_1.translate, react_redux_1.connect(mapStateToProps, mapDispatchToProps), styles_1.withStyles(styles));
exports.default = enhance(Logout);

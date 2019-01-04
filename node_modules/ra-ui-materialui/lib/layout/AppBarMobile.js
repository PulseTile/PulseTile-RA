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
var AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
var Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var styles_1 = require("@material-ui/core/styles");
var Menu_1 = __importDefault(require("@material-ui/icons/Menu"));
var compose_1 = __importDefault(require("recompose/compose"));
var ra_core_1 = require("ra-core");
var LoadingIndicator_1 = __importDefault(require("./LoadingIndicator"));
var styles = {
    title: {
        fontSize: '1.25em',
        lineHeight: '2.5em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        paddingRight: '1.5em',
    },
    icon: {
        marginTop: 0,
        marginRight: 0,
        marginLeft: '-12px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    },
};
/**
 * @deprecated
 */
var AppBarMobile = function (_a) {
    var classes = _a.classes, className = _a.className, title = _a.title, toggleSidebar = _a.toggleSidebar, rest = __rest(_a, ["classes", "className", "title", "toggleSidebar"]);
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('<AppBarMobile> is deprecated, please use <AppBar>, which is now responsive');
    }
    return (react_1.default.createElement(AppBar_1.default, __assign({ className: className, color: "secondary", position: "fixed" }, rest),
        react_1.default.createElement(Toolbar_1.default, null,
            react_1.default.createElement(IconButton_1.default, { color: "inherit", "aria-label": "open drawer", onClick: toggleSidebar, className: classes.icon },
                react_1.default.createElement(Menu_1.default, null)),
            react_1.default.createElement(Typography_1.default, { className: classes.title, variant: "title", color: "inherit" }, title),
            react_1.default.createElement(LoadingIndicator_1.default, null))));
};
AppBarMobile.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    title: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.element])
        .isRequired,
    toggleSidebar: prop_types_1.default.func.isRequired,
};
var enhance = compose_1.default(react_redux_1.connect(null, { toggleSidebar: ra_core_1.toggleSidebar }), styles_1.withStyles(styles));
exports.default = enhance(AppBarMobile);

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
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var styles_1 = require("@material-ui/core/styles");
var HotTub_1 = __importDefault(require("@material-ui/icons/HotTub"));
var History_1 = __importDefault(require("@material-ui/icons/History"));
var compose_1 = __importDefault(require("recompose/compose"));
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var Title_1 = __importDefault(require("./Title"));
var styles = function (theme) {
    var _a;
    return ({
        container: (_a = {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            },
            _a[theme.breakpoints.up('md')] = {
                height: '100%',
            },
            _a[theme.breakpoints.down('sm')] = {
                height: '100vh',
                marginTop: '-3em',
            },
            _a),
        icon: {
            width: '9em',
            height: '9em',
        },
        message: {
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
            opacity: 0.5,
            margin: '0 1em',
        },
        toolbar: {
            textAlign: 'center',
            marginTop: '2em',
        },
    });
};
function goBack() {
    history.go(-1);
}
var NotFound = function (_a) {
    var classes = _a.classes, className = _a.className, translate = _a.translate, title = _a.title, rest = __rest(_a, ["classes", "className", "translate", "title"]);
    return (react_1.default.createElement("div", __assign({ className: classnames_1.default(classes.container, className) }, rest),
        react_1.default.createElement(Title_1.default, { defaultTitle: title }),
        react_1.default.createElement("div", { className: classes.message },
            react_1.default.createElement(HotTub_1.default, { className: classes.icon }),
            react_1.default.createElement("h1", null, translate('ra.page.not_found')),
            react_1.default.createElement("div", null,
                translate('ra.message.not_found'),
                ".")),
        react_1.default.createElement("div", { className: classes.toolbar },
            react_1.default.createElement(Button_1.default, { variant: "raised", icon: react_1.default.createElement(History_1.default, null), onClick: goBack }, translate('ra.action.back')))));
};
NotFound.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    title: prop_types_1.default.string,
    translate: prop_types_1.default.func.isRequired,
};
var enhance = compose_1.default(styles_1.withStyles(styles), ra_core_1.translate);
exports.default = enhance(NotFound);

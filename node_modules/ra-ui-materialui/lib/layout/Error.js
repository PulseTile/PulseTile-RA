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
var classnames_1 = __importDefault(require("classnames"));
var compose_1 = __importDefault(require("recompose/compose"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var ExpansionPanel_1 = __importDefault(require("@material-ui/core/ExpansionPanel"));
var ExpansionPanelDetails_1 = __importDefault(require("@material-ui/core/ExpansionPanelDetails"));
var ExpansionPanelSummary_1 = __importDefault(require("@material-ui/core/ExpansionPanelSummary"));
var styles_1 = require("@material-ui/core/styles");
var Report_1 = __importDefault(require("@material-ui/icons/Report"));
var ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
var History_1 = __importDefault(require("@material-ui/icons/History"));
var Title_1 = __importDefault(require("./Title"));
var ra_core_1 = require("ra-core");
var styles = function (theme) {
    var _a;
    return ({
        container: (_a = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            },
            _a[theme.breakpoints.down('sm')] = {
                padding: '1em',
            },
            _a.fontFamily = 'Roboto, sans-serif',
            _a.opacity = 0.5,
            _a),
        title: {
            display: 'flex',
            alignItems: 'center',
        },
        icon: {
            width: '2em',
            height: '2em',
            marginRight: '0.5em',
        },
        panel: {
            marginTop: '1em',
        },
        panelDetails: {
            whiteSpace: 'pre-wrap',
        },
        toolbar: {
            marginTop: '2em',
        },
    });
};
function goBack() {
    history.go(-1);
}
var Error = function (_a) {
    var error = _a.error, errorInfo = _a.errorInfo, classes = _a.classes, className = _a.className, title = _a.title, translate = _a.translate, rest = __rest(_a, ["error", "errorInfo", "classes", "className", "title", "translate"]);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(Title_1.default, { defaultTitle: title }),
        react_1.default.createElement("div", __assign({ className: classnames_1.default(classes.container, className) }, rest),
            react_1.default.createElement("h1", { className: classes.title, role: "alert" },
                react_1.default.createElement(Report_1.default, { className: classes.icon }),
                translate('ra.page.error')),
            react_1.default.createElement("div", null, translate('ra.message.error')),
            process.env.NODE_ENV !== 'production' && (react_1.default.createElement(ExpansionPanel_1.default, { className: classes.panel },
                react_1.default.createElement(ExpansionPanelSummary_1.default, { expandIcon: react_1.default.createElement(ExpandMore_1.default, null) }, translate('ra.message.details')),
                react_1.default.createElement(ExpansionPanelDetails_1.default, { className: classes.panelDetails },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h2", null, translate(error.toString())),
                        errorInfo.componentStack)))),
            react_1.default.createElement("div", { className: classes.toolbar },
                react_1.default.createElement(Button_1.default, { variant: "raised", icon: react_1.default.createElement(History_1.default, null), onClick: goBack }, translate('ra.action.back'))))));
};
Error.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    error: prop_types_1.default.object.isRequired,
    errorInfo: prop_types_1.default.object,
    translate: prop_types_1.default.func.isRequired,
    title: prop_types_1.default.string,
};
var enhance = compose_1.default(styles_1.withStyles(styles), ra_core_1.translate);
exports.default = enhance(Error);

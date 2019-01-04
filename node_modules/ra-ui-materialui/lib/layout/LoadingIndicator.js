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
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var compose_1 = __importDefault(require("recompose/compose"));
var RefreshIconButton_1 = __importDefault(require("../button/RefreshIconButton"));
var styles = {
    loader: {
        margin: 14,
    },
};
exports.LoadingIndicator = function (_a) {
    var classes = _a.classes, className = _a.className, isLoading = _a.isLoading, rest = __rest(_a, ["classes", "className", "isLoading"]);
    return isLoading ? (react_1.default.createElement(CircularProgress_1.default, __assign({ className: classnames_1.default('app-loader', classes.loader, className), color: "inherit", size: 18, thickness: 5 }, rest))) : (react_1.default.createElement(RefreshIconButton_1.default, null));
};
exports.LoadingIndicator.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    isLoading: prop_types_1.default.bool,
    width: prop_types_1.default.string,
};
var mapStateToProps = function (state) { return ({
    isLoading: state.admin.loading > 0,
}); };
exports.default = compose_1.default(react_redux_1.connect(mapStateToProps, {} // Avoid connect passing dispatch in props
), styles_1.withStyles(styles))(exports.LoadingIndicator);

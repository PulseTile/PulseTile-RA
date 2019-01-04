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
var List_1 = __importDefault(require("@material-ui/icons/List"));
var react_router_dom_1 = require("react-router-dom");
var Button_1 = __importDefault(require("./Button"));
var ListButton = function (_a) {
    var _b = _a.basePath, basePath = _b === void 0 ? '' : _b, _c = _a.label, label = _c === void 0 ? 'ra.action.list' : _c, icon = _a.icon, rest = __rest(_a, ["basePath", "label", "icon"]);
    return (react_1.default.createElement(Button_1.default, __assign({ component: react_router_dom_1.Link, to: basePath, label: label }, rest), icon));
};
ListButton.propTypes = {
    basePath: prop_types_1.default.string,
    label: prop_types_1.default.string,
    icon: prop_types_1.default.element,
};
ListButton.defaultProps = {
    icon: react_1.default.createElement(List_1.default, null),
};
exports.default = ListButton;

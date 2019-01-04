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
var Dashboard_1 = __importDefault(require("@material-ui/icons/Dashboard"));
var ra_core_1 = require("ra-core");
var MenuItemLink_1 = __importDefault(require("./MenuItemLink"));
var DashboardMenuItem = function (_a) {
    var className = _a.className, onClick = _a.onClick, translate = _a.translate, props = __rest(_a, ["className", "onClick", "translate"]);
    return (react_1.default.createElement(MenuItemLink_1.default, __assign({ onClick: onClick, to: "/", primaryText: translate('ra.page.dashboard'), leftIcon: react_1.default.createElement(Dashboard_1.default, null), exact: true }, props)));
};
DashboardMenuItem.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    onClick: prop_types_1.default.func,
    translate: prop_types_1.default.func.isRequired,
};
exports.default = ra_core_1.translate(DashboardMenuItem);

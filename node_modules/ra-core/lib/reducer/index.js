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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_form_1 = require("redux-form");
var react_router_redux_1 = require("react-router-redux");
var admin_1 = __importStar(require("./admin"));
var notifications_1 = require("./admin/notifications");
exports.getNotification = notifications_1.getNotification;
var i18n_1 = __importStar(require("./i18n"));
exports.default = (function (customReducers, locale, messages) {
    return redux_1.combineReducers(__assign({ admin: admin_1.default, i18n: i18n_1.default(locale, messages), form: redux_form_1.reducer, router: react_router_redux_1.routerReducer }, customReducers));
});
exports.getPossibleReferenceValues = function (state, props) {
    return admin_1.getPossibleReferenceValues(state.admin, props);
};
exports.getResources = function (state) { return admin_1.getResources(state.admin); };
exports.getReferenceResource = function (state, props) {
    return admin_1.getReferenceResource(state.admin, props);
};
exports.isLoggedIn = function (state) { return admin_1.isLoggedIn(state.admin); };
exports.getLocale = function (state) { return i18n_1.getLocale(state.i18n); };
var admin_2 = require("./admin");
exports.getPossibleReferences = admin_2.getPossibleReferences;

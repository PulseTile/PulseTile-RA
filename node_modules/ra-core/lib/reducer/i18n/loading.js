"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localeActions_1 = require("../../actions/localeActions");
var loadingReducer = function (loading, action) {
    if (loading === void 0) { loading = false; }
    switch (action.type) {
        case localeActions_1.CHANGE_LOCALE:
            return true;
        case localeActions_1.CHANGE_LOCALE_SUCCESS:
        case localeActions_1.CHANGE_LOCALE_FAILURE:
            return false;
        default:
            return loading;
    }
};
exports.default = loadingReducer;

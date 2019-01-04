"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../i18n/index");
var localeActions_1 = require("../../actions/localeActions");
exports.default = (function (initialLocale) {
    if (initialLocale === void 0) { initialLocale = index_1.DEFAULT_LOCALE; }
    return function (previousLocale, action) {
        if (previousLocale === void 0) { previousLocale = initialLocale; }
        switch (action.type) {
            case localeActions_1.CHANGE_LOCALE_SUCCESS:
                return action.payload.locale;
            default:
                return previousLocale;
        }
    };
});

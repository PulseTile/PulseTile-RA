"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var locale_1 = __importDefault(require("./locale"));
var messages_1 = __importDefault(require("./messages"));
var loading_1 = __importDefault(require("./loading"));
exports.default = (function (initialLocale, defaultMessages) {
    return redux_1.combineReducers({
        locale: locale_1.default(initialLocale),
        messages: messages_1.default(defaultMessages),
        loading: loading_1.default,
    });
});
exports.getLocale = function (state) { return state.locale; };

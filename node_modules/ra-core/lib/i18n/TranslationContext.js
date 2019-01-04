"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
exports.TranslationContext = react_1.createContext({
    locale: 'en',
    translate: function (id) { return id; },
});

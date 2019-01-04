"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../actions/index");
exports.default = (function (defaultMessages) {
    return function (previousState, action) {
        if (previousState === void 0) { previousState = defaultMessages; }
        switch (action.type) {
            case index_1.CHANGE_LOCALE_SUCCESS:
                return action.payload.messages;
            default:
                return previousState;
        }
    };
});

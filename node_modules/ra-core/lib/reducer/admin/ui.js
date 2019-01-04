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
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var defaultState = {
    sidebarOpen: false,
    optimistic: false,
    viewVersion: 0,
};
var uiReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = defaultState; }
    switch (action.type) {
        case actions_1.TOGGLE_SIDEBAR:
            return __assign({}, previousState, { sidebarOpen: !previousState.sidebarOpen });
        case actions_1.SET_SIDEBAR_VISIBILITY:
            return __assign({}, previousState, { sidebarOpen: action.payload });
        case actions_1.REFRESH_VIEW:
            return __assign({}, previousState, { viewVersion: previousState.viewVersion + 1 });
        case actions_1.START_OPTIMISTIC_MODE:
            return __assign({}, previousState, { optimistic: true });
        case actions_1.STOP_OPTIMISTIC_MODE:
            return __assign({}, previousState, { optimistic: false });
        default:
            return previousState;
    }
};
exports.default = uiReducer;

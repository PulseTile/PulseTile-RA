"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notificationActions_1 = require("../../actions/notificationActions");
var undoActions_1 = require("../../actions/undoActions");
var notificationsReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = []; }
    switch (action.type) {
        case notificationActions_1.SHOW_NOTIFICATION:
            return previousState.concat(action.payload);
        case notificationActions_1.HIDE_NOTIFICATION:
        case undoActions_1.UNDO:
            return previousState.slice(1);
        default:
            return previousState;
    }
};
exports.default = notificationsReducer;
/**
 * Returns the first available notification to show
 * @param {Object} state - Redux state
 */
exports.getNotification = function (state) { return state.admin.notifications[0]; };

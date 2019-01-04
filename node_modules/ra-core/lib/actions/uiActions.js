"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOGGLE_SIDEBAR = 'RA/TOGGLE_SIDEBAR';
exports.toggleSidebar = function () { return ({
    type: exports.TOGGLE_SIDEBAR,
}); };
exports.SET_SIDEBAR_VISIBILITY = 'RA/SET_SIDEBAR_VISIBILITY';
exports.setSidebarVisibility = function (isOpen) { return ({
    type: exports.SET_SIDEBAR_VISIBILITY,
    payload: isOpen,
}); };
exports.REFRESH_VIEW = 'RA/REFRESH_VIEW';
exports.refreshView = function () { return ({
    type: exports.REFRESH_VIEW,
}); };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUD_CHANGE_LIST_PARAMS = 'RA/CRUD_CHANGE_LIST_PARAMS';
exports.changeListParams = function (resource, params) { return ({
    type: exports.CRUD_CHANGE_LIST_PARAMS,
    payload: params,
    meta: { resource: resource },
}); };
exports.SET_LIST_SELECTED_IDS = 'RA/SET_LIST_SELECTED_IDS';
exports.setListSelectedIds = function (resource, ids) { return ({
    type: exports.SET_LIST_SELECTED_IDS,
    payload: ids,
    meta: { resource: resource },
}); };
exports.TOGGLE_LIST_ITEM = 'RA/TOGGLE_LIST_ITEM';
exports.toggleListItem = function (resource, id) { return ({
    type: exports.TOGGLE_LIST_ITEM,
    payload: id,
    meta: { resource: resource },
}); };

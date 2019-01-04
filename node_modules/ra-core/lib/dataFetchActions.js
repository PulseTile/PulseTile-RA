"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_LIST = 'GET_LIST';
exports.GET_ONE = 'GET_ONE';
exports.GET_MANY = 'GET_MANY';
exports.GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
exports.CREATE = 'CREATE';
exports.UPDATE = 'UPDATE';
exports.UPDATE_MANY = 'UPDATE_MANY';
exports.DELETE = 'DELETE';
exports.DELETE_MANY = 'DELETE_MANY';
exports.fetchActionsWithRecordResponse = [exports.GET_ONE, exports.CREATE, exports.UPDATE, exports.DELETE];
exports.fetchActionsWithArrayOfIdentifiedRecordsResponse = [
    exports.GET_LIST,
    exports.GET_MANY,
    exports.GET_MANY_REFERENCE,
];
exports.fetchActionsWithArrayOfRecordsResponse = exports.fetchActionsWithArrayOfIdentifiedRecordsResponse.concat([
    exports.UPDATE_MANY,
    exports.DELETE_MANY,
]);
exports.fetchActionsWithTotalResponse = [exports.GET_LIST, exports.GET_MANY_REFERENCE];

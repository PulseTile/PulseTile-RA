"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INITIALIZE_FORM = 'RA/INITIALIZE_FORM';
exports.initializeForm = function (initialValues) { return ({
    type: exports.INITIALIZE_FORM,
    payload: initialValues,
}); };
exports.RESET_FORM = 'RA/RESET_FORM';
exports.resetForm = function () { return ({ type: exports.RESET_FORM }); };
exports.BEFORE_LOCATION_CHANGE = 'RA/BEFORE_LOCATION_CHANGE';
exports.beforeLocationChange = function (_a) {
    var payload = _a.payload, meta = _a.meta;
    return ({
        type: exports.BEFORE_LOCATION_CHANGE,
        payload: payload,
        meta: meta,
    });
};

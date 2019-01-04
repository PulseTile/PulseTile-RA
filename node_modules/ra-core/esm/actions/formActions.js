export var INITIALIZE_FORM = 'RA/INITIALIZE_FORM';
export var initializeForm = function (initialValues) { return ({
    type: INITIALIZE_FORM,
    payload: initialValues,
}); };
export var RESET_FORM = 'RA/RESET_FORM';
export var resetForm = function () { return ({ type: RESET_FORM }); };
export var BEFORE_LOCATION_CHANGE = 'RA/BEFORE_LOCATION_CHANGE';
export var beforeLocationChange = function (_a) {
    var payload = _a.payload, meta = _a.meta;
    return ({
        type: BEFORE_LOCATION_CHANGE,
        payload: payload,
        meta: meta,
    });
};

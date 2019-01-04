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
import { createSelector } from 'reselect';
var getDefaultValues = function (data, defaultValue, defaultValues) {
    if (data === void 0) { data = {}; }
    if (defaultValue === void 0) { defaultValue = {}; }
    if (defaultValues === void 0) { defaultValues = {}; }
    var globalDefaultValue = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    return __assign({}, globalDefaultValue, defaultValues, data);
};
var getRecord = function (state, props) { return props.record; };
var getDefaultValue = function (state, props) { return props.defaultValue; };
var getDefaultValuesFromState = function (state) { return state.admin.record; };
export default createSelector(getRecord, getDefaultValue, getDefaultValuesFromState, function (record, defaultValue, defaultValues) {
    return getDefaultValues(record, defaultValue, defaultValues);
});

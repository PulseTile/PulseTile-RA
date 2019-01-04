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
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import admin, { getResources as adminGetResources, getReferenceResource as adminGetReferenceResource, getPossibleReferenceValues as adminGetPossibleReferenceValues, isLoggedIn as adminIsLoggedIn, } from './admin';
export { getNotification } from './admin/notifications';
import i18nReducer, { getLocale as adminGetLocale } from './i18n';
export default (function (customReducers, locale, messages) {
    return combineReducers(__assign({ admin: admin, i18n: i18nReducer(locale, messages), form: formReducer, router: routerReducer }, customReducers));
});
export var getPossibleReferenceValues = function (state, props) {
    return adminGetPossibleReferenceValues(state.admin, props);
};
export var getResources = function (state) { return adminGetResources(state.admin); };
export var getReferenceResource = function (state, props) {
    return adminGetReferenceResource(state.admin, props);
};
export var isLoggedIn = function (state) { return adminIsLoggedIn(state.admin); };
export var getLocale = function (state) { return adminGetLocale(state.i18n); };
export { getPossibleReferences } from './admin';

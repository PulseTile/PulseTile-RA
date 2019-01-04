import { combineReducers } from 'redux';
import localeReducer from './locale';
import messagedReducer from './messages';
import loading from './loading';
export default (function (initialLocale, defaultMessages) {
    return combineReducers({
        locale: localeReducer(initialLocale),
        messages: messagedReducer(defaultMessages),
        loading: loading,
    });
});
export var getLocale = function (state) { return state.locale; };

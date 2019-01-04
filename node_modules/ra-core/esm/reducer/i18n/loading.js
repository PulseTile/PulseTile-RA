import { CHANGE_LOCALE, CHANGE_LOCALE_SUCCESS, CHANGE_LOCALE_FAILURE, } from '../../actions/localeActions';
var loadingReducer = function (loading, action) {
    if (loading === void 0) { loading = false; }
    switch (action.type) {
        case CHANGE_LOCALE:
            return true;
        case CHANGE_LOCALE_SUCCESS:
        case CHANGE_LOCALE_FAILURE:
            return false;
        default:
            return loading;
    }
};
export default loadingReducer;

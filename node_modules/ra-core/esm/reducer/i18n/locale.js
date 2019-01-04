import { DEFAULT_LOCALE } from '../../i18n/index';
import { CHANGE_LOCALE_SUCCESS, } from '../../actions/localeActions';
export default (function (initialLocale) {
    if (initialLocale === void 0) { initialLocale = DEFAULT_LOCALE; }
    return function (previousLocale, action) {
        if (previousLocale === void 0) { previousLocale = initialLocale; }
        switch (action.type) {
            case CHANGE_LOCALE_SUCCESS:
                return action.payload.locale;
            default:
                return previousLocale;
        }
    };
});

import { CHANGE_LOCALE_SUCCESS, } from '../../actions/index';
export default (function (defaultMessages) {
    return function (previousState, action) {
        if (previousState === void 0) { previousState = defaultMessages; }
        switch (action.type) {
            case CHANGE_LOCALE_SUCCESS:
                return action.payload.messages;
            default:
                return previousState;
        }
    };
});

import get from "lodash/get";
import { USER_INFO_ACTION } from "../actions/userInfoAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_INFO_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_INFO_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, "data", null),
            };
        case USER_INFO_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
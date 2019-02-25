import get from "lodash/get";

import { RESPECT_PERSONAL_DETAILS } from "../actions/respectPersonalDetails";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {



    switch (action.type) {
        case RESPECT_PERSONAL_DETAILS.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case RESPECT_PERSONAL_DETAILS.CREATE:
            console.log('action', action);

            return {
                ...state,
                loading: false,
                data: action.data
            };
        case RESPECT_PERSONAL_DETAILS.SUCCESS:
            return {
                ...state,
                loading: false,
                data: {...action.data}
            };
        case RESPECT_PERSONAL_DETAILS.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
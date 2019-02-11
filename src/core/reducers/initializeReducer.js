import { get } from "lodash";
import { INITIALIZE_ACTION } from "../actions/initializeAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case INITIALIZE_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, "data", null),
            };
        case INITIALIZE_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
import get from "lodash/get";

import { VITALS_ACTION } from "../actions/vitalsAction";

const initialState = {
    data: false,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case VITALS_ACTION.CREATE:
            return {
                ...state,
                loading: true,
                data: state,
            };
        case VITALS_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, 'data', []),
            };
        case VITALS_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
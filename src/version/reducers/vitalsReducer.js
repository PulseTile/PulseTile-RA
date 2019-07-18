import get from "lodash/get";
import { VITALS_ACTION } from "../actions/vitalsAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
    current: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case VITALS_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
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
        case VITALS_ACTION.CURRENT:
            return {
                ...state,
                loading: false,
                current: get(action, "data", null),
            };
        default:
            return state;
    }
}
import get from "lodash/get";

import { PATIENTS_COUNT_ACTION } from "../actions/patientsCountAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PATIENTS_COUNT_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PATIENTS_COUNT_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: {...action.data}
            };
        case PATIENTS_COUNT_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
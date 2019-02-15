import get from "lodash/get";
import { PATIENTS_STATISTIC } from "../actions/patientsStatisticAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PATIENTS_STATISTIC.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PATIENTS_STATISTIC.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, "data", []),
            };
        case PATIENTS_STATISTIC.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
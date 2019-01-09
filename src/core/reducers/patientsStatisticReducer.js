import { get } from "lodash";
import { patientsStatisticAction } from "../actions/patientsAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case patientsStatisticAction.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case patientsStatisticAction.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(payload, "patients", []),
            };
        case patientsStatisticAction.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
}
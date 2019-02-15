import get from "lodash/get";
import { PATIENT_INFO } from "../actions/patientInfoAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PATIENT_INFO.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PATIENT_INFO.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, "data", null),
            };
        case PATIENT_INFO.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
import { CURRENT_PATIENT_ACTION } from "../actions/currentPatientAction";

const initialState = {
    data: false,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_PATIENT_ACTION.UPDATE:
            return {
                ...state,
                loading: false,
                data: action.data,
            };
        default:
            return state;
    }
}
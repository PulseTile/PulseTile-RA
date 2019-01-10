import { get } from "lodash";
import { patientInfoAction } from "../actions/patientInfoAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case patientInfoAction.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case patientInfoAction.SUCCESS:

            console.log('REDUCER-SUCCESS------------------------------------------------------')
            console.log(payload)

            return {
                ...state,
                loading: false,
                data: get(payload, "patients", []),
            };
        case patientInfoAction.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
}
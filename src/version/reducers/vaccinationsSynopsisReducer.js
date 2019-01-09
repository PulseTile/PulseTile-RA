import { get } from "lodash";
import { vaccinationsSynopsisAction } from "../actions/synopsisActions";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case vaccinationsSynopsisAction.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case vaccinationsSynopsisAction.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(payload, "synopsis", []),
            };
        case vaccinationsSynopsisAction.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
}
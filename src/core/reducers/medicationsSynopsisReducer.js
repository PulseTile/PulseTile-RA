import { get } from "lodash";
import { medicationsSynopsisAction } from "../actions/synopsisActions";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case medicationsSynopsisAction.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case medicationsSynopsisAction.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(payload, "synopsis", []),
            };
        case medicationsSynopsisAction.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
}
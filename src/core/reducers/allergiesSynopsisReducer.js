import { get } from "lodash";
import { allergiesSynopsisAction } from "../actions/synopsisActions";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case allergiesSynopsisAction.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case allergiesSynopsisAction.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(payload, "synopsis", []),
            };
        case allergiesSynopsisAction.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
}
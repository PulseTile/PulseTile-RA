import { get } from "lodash";
import { contactsSynopsisAction } from "../actions/synopsisActions";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case contactsSynopsisAction.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case contactsSynopsisAction.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(payload, "synopsis", []),
            };
        case contactsSynopsisAction.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
}
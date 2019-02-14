import { get } from "lodash";
import { SYNOPSIS_MEDICATIONS_ACTION } from "../actions/synopsisActions";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SYNOPSIS_MEDICATIONS_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SYNOPSIS_MEDICATIONS_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, "data.synopsis", []),
            };
        case SYNOPSIS_MEDICATIONS_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
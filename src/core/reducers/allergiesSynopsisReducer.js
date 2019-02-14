import { get } from "lodash";
import { SYNOPSIS_ALLERGIES_ACTION } from "../actions/synopsisActions";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SYNOPSIS_ALLERGIES_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SYNOPSIS_ALLERGIES_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, "data.synopsis", []),
            };
        case SYNOPSIS_ALLERGIES_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
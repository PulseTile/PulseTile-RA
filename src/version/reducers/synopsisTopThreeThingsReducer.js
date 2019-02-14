import { get } from "lodash";
import { SYNOPSIS_TOP_THREE_THINGS_ACTION } from "../actions/synopsisTopThreeThingsAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SYNOPSIS_TOP_THREE_THINGS_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SYNOPSIS_TOP_THREE_THINGS_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, "data.synopsis", []),
            };
        case SYNOPSIS_TOP_THREE_THINGS_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
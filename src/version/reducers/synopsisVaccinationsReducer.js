import { get } from "lodash";
import { SYNOPSIS_VACCINATIONS_ACTION } from "../actions/synopsisVaccinationsAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SYNOPSIS_VACCINATIONS_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SYNOPSIS_VACCINATIONS_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, "data.synopsis", []),
            };
        case SYNOPSIS_VACCINATIONS_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
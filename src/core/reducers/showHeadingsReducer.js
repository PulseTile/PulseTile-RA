import get from "lodash/get";

import { SHOW_HEADINGS_ACTION } from "../actions/showHeadingsAction";
import { getHeadingsLists } from "../pages/PatientSummary/config";

const initialState = {
    data: getHeadingsLists(),
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_HEADINGS_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SHOW_HEADINGS_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: {...action.data}
            };
        case SHOW_HEADINGS_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
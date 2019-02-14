import { get } from "lodash";
import { DEMOGRAPHICS_ACTION } from "../actions/demographocsAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DEMOGRAPHICS_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DEMOGRAPHICS_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, "data.demographics", null),
            };
        case DEMOGRAPHICS_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
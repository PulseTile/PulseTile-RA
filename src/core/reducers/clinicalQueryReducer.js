import { CLINICAL_QUERY_ACTION } from "../actions/clinicalQueryAction";

const initialState = {
    data: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CLINICAL_QUERY_ACTION.CREATE:
            return {
                ...state,
                data: action.data,
            };
        case CLINICAL_QUERY_ACTION.REMOVE:
            return {
                ...state,
                data: null,
            };
        default:
            return state;
    }
}
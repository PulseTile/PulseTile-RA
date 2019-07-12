import { ADVANCED_SEARCH_ACTION } from "../actions/advancedSearchAction";

const initialState = {
    data: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADVANCED_SEARCH_ACTION.CREATE:
            return {
                ...state,
                data: action.data,
            };
        case ADVANCED_SEARCH_ACTION.REMOVE:
            return {
                ...state,
                data: null,
            };
        default:
            return state;
    }
}
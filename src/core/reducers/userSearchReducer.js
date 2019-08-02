import get from "lodash/get";
import { USER_SEARCH_ACTION } from "../actions/userSearchAction";

const initialState = {
    data: false,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_SEARCH_ACTION.REQUEST:
            return {
                ...state,
                loading: false,
                data: action.data,
            };
        case USER_SEARCH_ACTION.REQUEST_ID:
            return {
                ...state,
                loading: false,
                id: action.data,
            };
        case USER_SEARCH_ACTION.SEARCH_BY:
            return  {
                ...state,
                loading: false,
                type: get(action, 'searchType', null),
                value: get(action, 'value', null),
            };
        case USER_SEARCH_ACTION.REMOVE:
            return {
                ...state,
                loading: false,
                data: null,
                id: null,
                type: null,
                value: null,
            };
        default:
            return state;
    }
}
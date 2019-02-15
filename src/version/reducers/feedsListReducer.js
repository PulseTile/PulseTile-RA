import get from "lodash/get";

import { FEEDS_LIST_ACTION } from "../actions/feedsListAction";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

/**
 * This component returns reducer for Feeds list action
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} state
 * @param {shape} action
 * @return {shape}
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case FEEDS_LIST_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FEEDS_LIST_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, "data", []),
            };
        case FEEDS_LIST_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
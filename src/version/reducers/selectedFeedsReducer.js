import { get } from "lodash";

import { SET_SELECTED_FEEDS_ACTION } from "../actions/setSelectedFeedsAction";

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
        case SET_SELECTED_FEEDS_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SET_SELECTED_FEEDS_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, "data", []),
            };
        case SET_SELECTED_FEEDS_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
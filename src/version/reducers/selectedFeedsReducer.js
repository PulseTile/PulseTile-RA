import get from "lodash/get";

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
        case SET_SELECTED_FEEDS_ACTION:
            return {
                ...state,
                loading: false,
                data: get(action, "data", []),
            };
        default:
            return state;
    }
}
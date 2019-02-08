import { get } from "lodash";

import { FEEDS_RSS_ACTION } from "../actions/feedsRssAction";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

/**
 * This component returns reducer for RSS getting
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} state
 * @param {shape} action
 * @return {shape}
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case FEEDS_RSS_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FEEDS_RSS_ACTION.SUCCESS:

            console.log('SUCCESS', action );

            return {
                ...state,
                loading: false,
                data: get(action, "data", []),
            };
        case FEEDS_RSS_ACTION.FAILURE:


            console.log('FAILURE', action);

            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
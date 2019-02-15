import get from "lodash/get";

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
    const currentRss = get(state, 'data', {});
    switch (action.type) {

        case FEEDS_RSS_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };

        case FEEDS_RSS_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: Object.assign({}, currentRss, get(action, "data", [])),
            };

        case FEEDS_RSS_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
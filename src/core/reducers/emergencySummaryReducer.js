import get from "lodash/get";

import { EMERGENCY_SUMMARY_ACTION } from "../actions/emergencySummaryAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

/**
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} state
 * @param {shape} action
 * @return {shape}
 */
export default (state = initialState, action) => {
    const currentData = get(state, 'data', {});
    switch (action.type) {
        case EMERGENCY_SUMMARY_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case EMERGENCY_SUMMARY_ACTION.SUCCESS:
            const resource = get(action, 'data.resource', null);
            const data = get(action, 'data.data', [])
            return {
                ...state,
                loading: false,
                data: Object.assign({}, currentData, {
                    [resource]: data
                }),
            };
        case EMERGENCY_SUMMARY_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}
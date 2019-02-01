import { createRequestTypes } from "../../core/actions/functions";

export const SET_SELECTED_FEEDS_ACTION = createRequestTypes('SET_SELECTED_FEEDS_ACTION');

export const setSelectedFeedsAction = {
    request: data => ({ type: SET_SELECTED_FEEDS_ACTION.REQUEST, data }),
    success: data => ({ type: SET_SELECTED_FEEDS_ACTION.SUCCESS, data }),
    error:   error => ({ type: SET_SELECTED_FEEDS_ACTION.FAILURE, error }),
};

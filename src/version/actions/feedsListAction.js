import { createRequestTypes } from "../../core/actions/functions";

export const FEEDS_LIST_ACTION = createRequestTypes('FEEDS_LIST_ACTION');

export const feedsListAction = {
    request: data => ({ type: FEEDS_LIST_ACTION.REQUEST, data }),
    success: data => ({ type: FEEDS_LIST_ACTION.SUCCESS, data }),
    error:   error => ({ type: FEEDS_LIST_ACTION.FAILURE, error }),
};

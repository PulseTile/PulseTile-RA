import { createRequestTypes } from "../../core/actions/functions";

export const FEEDS_RSS_ACTION = createRequestTypes('FEEDS_RSS_ACTION');

export const feedsRssAction = {
    request: data => ({ type: FEEDS_RSS_ACTION.REQUEST, data }),
    success: data => ({ type: FEEDS_RSS_ACTION.SUCCESS, data }),
    error:   error => ({ type: FEEDS_RSS_ACTION.FAILURE, error }),
};

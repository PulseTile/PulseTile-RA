import { createRequestTypes } from "../../core/actions/functions";

export const FEEDS_RSS_ACTION = createRequestTypes('FEEDS_RSS_ACTION');

export const feedsRssAction = {
    request: (sourceId, rssFeedUrl) => ({ type: FEEDS_RSS_ACTION.REQUEST, sourceId, rssFeedUrl }),
    success: data => ({ type: FEEDS_RSS_ACTION.SUCCESS, data }),
    error:   error => ({ type: FEEDS_RSS_ACTION.FAILURE, error }),
};

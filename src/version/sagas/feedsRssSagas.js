import { takeEvery, put } from 'redux-saga/effects';

import { FEEDS_RSS_ACTION, feedsRssAction } from "../actions/feedsRssAction";
import { getRssFeedsListFromXML } from "../plugins/Feeds/rss-helper";

export default takeEvery(FEEDS_RSS_ACTION.REQUEST, function*(action) {
    const feedsUrl = action.rssFeedUrl;
    const sourceId = action.sourceId;
    const url = "https://cors-anywhere.herokuapp.com/" + encodeURI(feedsUrl);
    try {
        const result = yield fetch(url)
            .then(res => res.text())
            .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
            .then(responseData => getRssFeedsListFromXML(responseData));
        yield put(feedsRssAction.success({
            [sourceId]: result,
        }))
    } catch(e) {
        yield put(feedsRssAction.error(e))
    }
});
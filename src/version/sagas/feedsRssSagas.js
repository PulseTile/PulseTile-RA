import { takeEvery, put } from 'redux-saga/effects';

import { FEEDS_RSS_ACTION, feedsRssAction } from "../actions/feedsRssAction";
import { getRssFeedsListFromXML } from "../plugins/Feeds/rss-helper";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

export default takeEvery(FEEDS_RSS_ACTION.REQUEST, function*(action) {
    const feedsUrl = action.rssFeedUrl;
    const sourceId = action.sourceId;
    const url = CORS_PROXY + feedsUrl.replace("http://", "").replace("https://", "");
    try {
        const result = yield fetch(url)
            .then(res => res.text())
            .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
            .then(responseData => getRssFeedsListFromXML(responseData))
            .then(res => res);
        yield put(feedsRssAction.success({
            [sourceId]: result,
        }))
    } catch(e) {
        yield put(feedsRssAction.error(e))
    }
});

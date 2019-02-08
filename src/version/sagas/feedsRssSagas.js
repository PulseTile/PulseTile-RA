import { takeEvery, put } from 'redux-saga/effects';
import { createServer } from 'cors-anywhere';
import RSSParser from "rss-parser";

import { FEEDS_RSS_ACTION, feedsRssAction } from "../actions/feedsRssAction";

export default takeEvery(FEEDS_RSS_ACTION.REQUEST, function*(action) {
    const data = action.data;
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    const url = CORS_PROXY + data.replace("http://", "").replace("https://", "");

    console.log('url', url);

    try {
        let parser = new RSSParser();
        const result = parser.parseURL(url, (err, feed) => {
            let rss = [];
            feed.items.forEach(function(entry) {
                rss.push({
                    title: entry.title,
                    link: entry.link,
                });
            });
            return rss;
        });

        console.log('result', result);

        yield put(feedsRssAction.success(result))
    } catch(e) {
        yield put(feedsRssAction.error(e))
    }
});

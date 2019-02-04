import { takeEvery, put } from 'redux-saga/effects';
import { get } from "lodash";
import * as rssParser from 'react-native-rss-parser';

import { FEEDS_RSS_ACTION, feedsRssAction } from "../actions/feedsRssAction";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const FEEDS_NUMBER = 4;

export default takeEvery(FEEDS_RSS_ACTION.REQUEST, function*(action) {
    const feedsUrl = action.rssFeedUrl;
    const sourceId = action.sourceId;
    const url = CORS_PROXY + feedsUrl.replace("http://", "").replace("https://", "");
    try {
        const result = yield fetch(url)
            .then(res => res.text())
            .then(responseData => rssParser.parse(responseData))
            .then(res => {
                const { items } = res;
                let feeds = [];
                for (let i = 0; i < FEEDS_NUMBER; i++) {
                    let item = items[i];
                    feeds.push({
                        title: get(item, 'title', null),
                        link: get(item, 'id', null),
                    })
                }
                return feeds;
            });
        yield put(feedsRssAction.success({
            [sourceId]: result,
        }))
    } catch(e) {
        yield put(feedsRssAction.error(e))
    }
});

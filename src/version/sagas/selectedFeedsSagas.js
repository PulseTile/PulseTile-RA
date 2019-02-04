import { takeEvery, put } from 'redux-saga/effects';
import { get } from "lodash";

import { SET_SELECTED_FEEDS_ACTION, setSelectedFeedsAction } from "../actions/setSelectedFeedsAction";

export default takeEvery(SET_SELECTED_FEEDS_ACTION.REQUEST, function*(action) {
    const feeds = get(action, 'data', null);
    try {
        yield put(setSelectedFeedsAction.success(feeds))
    } catch(e) {
        yield put(setSelectedFeedsAction.error(e))
    }
});

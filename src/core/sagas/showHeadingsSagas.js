import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { SHOW_HEADINGS_ACTION, showHeadingsAction } from "../actions/showHeadingsAction";

export default takeEvery(SHOW_HEADINGS_ACTION.REQUEST, function*(action) {
    const headingsArray = get(action, 'data', null);
    try {
        yield put(showHeadingsAction.success(headingsArray))
    } catch(e) {
        yield put(showHeadingsAction.error(e))
    }
});

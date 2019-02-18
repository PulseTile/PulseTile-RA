import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { SHOW_MODE_ACTION, showModeAction } from "../actions/showModeAction";

export default takeEvery(SHOW_MODE_ACTION.REQUEST, function*(action) {
    const mode = get(action, 'data', null);
    try {
        yield put(showModeAction.success(mode))
    } catch(e) {
        yield put(showModeAction.error(e))
    }
});

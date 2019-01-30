import { takeEvery, put } from 'redux-saga/effects';
import { get } from "lodash";

import { CONTRAST_MODE_ACTION, contrastModeAction } from "../actions/contrastModeAction";

export default takeEvery(CONTRAST_MODE_ACTION.REQUEST, function*(action) {
    const mode = get(action, 'data', null);
    try {
        yield put(contrastModeAction.success(mode))
    } catch(e) {
        yield put(contrastModeAction.error(e))
    }
});

import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { token, domainName } from "../token";
import { SYNOPSIS_PROBLEMS_ACTION, synopsisProblemsAction } from "../actions/synopsisActions";

export default takeEvery(SYNOPSIS_PROBLEMS_ACTION.REQUEST, function*(action) {
    const userId = get(action, 'data', null);
    const url = domainName + '/api/patients/' + userId + '/synopsis/problems';
    let options = {};
    options.method = "GET";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
        'X-Requested-With': "XMLHttpRequest",
    };
    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(synopsisProblemsAction.success(result))
    } catch(e) {
        yield put(synopsisProblemsAction.error(e))
    }
});
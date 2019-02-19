import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { domainName } from "../token";
import { DEMOGRAPHICS_ACTION, demographicsAction } from "../actions/demographicsAction";

export default takeEvery(DEMOGRAPHICS_ACTION.REQUEST, function*(action) {
    const userId = get(action, 'data', null);
    const url = domainName + '/api/demographics/' + userId;
    let options = {};
    options.method = "GET";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        'X-Requested-With': "XMLHttpRequest",
    };
    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(demographicsAction.success(result))
    } catch(e) {
        yield put(demographicsAction.error(e))
    }
});
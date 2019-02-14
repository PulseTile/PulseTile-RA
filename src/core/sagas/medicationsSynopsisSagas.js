import { takeEvery, put } from 'redux-saga/effects';
import  { get } from "lodash";

import { token, domainName } from "../token";
import { SYNOPSIS_MEDICATIONS_ACTION, synopsisMedicationsAction } from "../actions/synopsisActions";

export default takeEvery(SYNOPSIS_MEDICATIONS_ACTION.REQUEST, function*(action) {
    const userId = get(action, 'data', null);
    const url = domainName + '/api/patients/' + userId + '/synopsis/medications';
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
        yield put(synopsisMedicationsAction.success(result))
    } catch(e) {
        yield put(synopsisMedicationsAction.error(e))
    }
});
import { takeEvery, put } from 'redux-saga/effects';
import  { get } from "lodash";

import { token, domainName } from "../../core/token";
import { SYNOPSIS_TOP_THREE_THINGS_ACTION, synopsisTopThreeThingsAction } from "../actions/synopsisTopThreeThingsAction";

export default takeEvery(SYNOPSIS_TOP_THREE_THINGS_ACTION.REQUEST, function*(action) {
    const userId = get(action, 'data', null);
    const url = domainName + '/api/patients/' + userId + '/synopsis/top3Things';
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
        yield put(synopsisTopThreeThingsAction.success(result))
    } catch(e) {
        yield put(synopsisTopThreeThingsAction.error(e))
    }
});
import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { token, domainName } from "../../core/token";
import { SYNOPSIS_VACCINATIONS_ACTION, synopsisVaccinationsAction } from "../actions/synopsisActions";

export default takeEvery(SYNOPSIS_VACCINATIONS_ACTION.REQUEST, function*(action) {
    const userId = get(action, 'data', null);
    const url = domainName + '/api/patients/' + userId + '/synopsis/vaccinations';
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
        yield put(synopsisVaccinationsAction.success(result))
    } catch(e) {
        yield put(synopsisVaccinationsAction.error(e))
    }
});
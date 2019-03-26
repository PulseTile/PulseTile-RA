import { takeEvery, put } from 'redux-saga/effects';

import { domainName } from "../token";
import { DEMOGRAPHICS_ACTION, demographicsAction } from "../actions/demographicsAction";

const patientID = localStorage.getItem('patientId') ? localStorage.getItem('patientId') : localStorage.getItem('userId');

export default takeEvery(DEMOGRAPHICS_ACTION.REQUEST, function*(action) {
    const url = domainName + '/api/demographics/' + patientID;
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